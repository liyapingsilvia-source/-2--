/**
 * Extracts the dominant color using K-Means clustering.
 * This is much more robust for finding representative colors in complex images.
 */
export async function extractDominantColor(imageSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Downsample for performance
      const size = 64;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size).data;
      let pixels: number[][] = [];

      const extractPixels = (useFilters: boolean) => {
        const result: number[][] = [];
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];

          if (a < 128) continue;

          if (useFilters) {
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const delta = max - min;
            const avg = (r + g + b) / 3;

            if (avg > 220 && delta < 30) continue;
            if (delta < 15) continue;
            if (avg < 20) continue;
          }

          result.push([r, g, b]);
        }
        return result;
      };

      pixels = extractPixels(true);
      if (pixels.length === 0) {
        console.warn("No pixels passed filters, falling back to all pixels");
        pixels = extractPixels(false);
      }

      if (pixels.length === 0) {
        resolve("rgb(128, 128, 128)");
        return;
      }

      // K-Means with K up to 4
      const k = Math.min(4, pixels.length);
      let centroids = pixels.slice(0, k).map(p => [...p]);
      const assignments = new Array(pixels.length).fill(0);

      // Max 10 iterations for speed
      for (let iter = 0; iter < 10; iter++) {
        let changed = false;

        // Assign
        for (let i = 0; i < pixels.length; i++) {
          let minDist = Infinity;
          let bestK = 0;
          for (let j = 0; j < k; j++) {
            const dist = Math.pow(pixels[i][0] - centroids[j][0], 2) +
                         Math.pow(pixels[i][1] - centroids[j][1], 2) +
                         Math.pow(pixels[i][2] - centroids[j][2], 2);
            if (dist < minDist) {
              minDist = dist;
              bestK = j;
            }
          }
          if (assignments[i] !== bestK) {
            assignments[i] = bestK;
            changed = true;
          }
        }

        if (!changed) break;

        // Update
        const newCentroids = Array.from({ length: k }, () => [0, 0, 0, 0]);
        for (let i = 0; i < pixels.length; i++) {
          const ki = assignments[i];
          newCentroids[ki][0] += pixels[i][0];
          newCentroids[ki][1] += pixels[i][1];
          newCentroids[ki][2] += pixels[i][2];
          newCentroids[ki][3]++;
        }

        for (let j = 0; j < k; j++) {
          if (newCentroids[j][3] > 0) {
            centroids[j][0] = newCentroids[j][0] / newCentroids[j][3];
            centroids[j][1] = newCentroids[j][1] / newCentroids[j][3];
            centroids[j][2] = newCentroids[j][2] / newCentroids[j][3];
          }
        }
      }

      // Pick the "best" centroid
      let bestCentroid = centroids[0];
      let maxScore = -Infinity;

      const counts = new Array(k).fill(0);
      assignments.forEach(ki => counts[ki]++);

      for (let j = 0; j < k; j++) {
        const [r, g, b] = centroids[j];
        
        // Calculate HSB (HSV) values
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        
        const s = max === 0 ? 0 : delta / max; // Saturation (0-1)
        const v = max / 255;                   // Brightness (0-1)
        
        // Base score from frequency (Percentage of pixels in this cluster)
        const frequency = counts[j] / pixels.length;
        let score = frequency * 200; // Increase frequency weight
        
        // 1. Saturation Scoring (Target: 30% - 95%)
        // We want vibrant colors, but not pure neon or gray.
        if (s >= 0.25 && s <= 0.95) {
          score += 80; 
        } else if (s < 0.25) {
          score -= (0.25 - s) * 300; // Strong penalty for gray
        }
        
        // 2. Brightness Scoring (Target: 25% - 95%)
        if (v >= 0.25 && v <= 0.90) {
          score += 50;
        } else if (v < 0.25) {
          score -= (0.25 - v) * 1000; // Much stronger penalty for black
        } else if (v > 0.90) {
          score -= (v - 0.90) * 1000; // Much stronger penalty for white
        }

        // 3. Vibrancy Bonus
        // S * V is a good measure of "colorfulness"
        score += (s * v) * 100;

        if (score > maxScore) {
          maxScore = score;
          bestCentroid = centroids[j];
        }
      }

      const finalColor = `rgb(${Math.round(bestCentroid[0])}, ${Math.round(bestCentroid[1])}, ${Math.round(bestCentroid[2])})`;
      console.log("Extracted dominant color:", finalColor, "Score:", maxScore);
      resolve(finalColor);
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
}

export async function extractPalette(imageSrc: string, count: number = 5): Promise<string[]> {
  return [await extractDominantColor(imageSrc)];
}
