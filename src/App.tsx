import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

// Import new profile components
import { StatusBar } from './components/profile/StatusBar';
import { NavBar } from './components/profile/NavBar';
import { ProfileHeader } from './components/profile/ProfileHeader';
import { BioLinks } from './components/profile/BioLinks';
import { IconTabBar } from './components/profile/IconTabBar';
import { VideoGrid } from './components/profile/VideoGrid';
import { BottomNavBar } from './components/profile/BottomNavBar';
import { SettingsModal } from './components/SettingsModal';
import { BackgroundEditor } from './components/profile/BackgroundEditor';
import { extractDominantColor } from './services/colorService';

// --- Types ---
interface Post {
  id: number;
  imageUrl: string;
  views?: string;
  label?: string;
  isDraft?: boolean;
  isPinned?: boolean;
}

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showBackgroundEditor, setShowBackgroundEditor] = useState(false);
  const [profileBackground, setProfileBackground] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const targetHeight = 844 + 40; // 844px + some margin
      const targetWidth = 390 + 40;
      
      const scaleH = viewportHeight / targetHeight;
      const scaleW = viewportWidth / targetWidth;
      
      setScale(Math.min(1, scaleH, scaleW));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaveBackground = async (imageData: string) => {
    setProfileBackground(imageData);
    setShowBackgroundEditor(false);
    
    // Extract color using the new robust logic
    try {
      const color = await extractDominantColor(imageData);
      console.log("App: Extracted color:", color);
      setBackgroundColor(color);
    } catch (error) {
      console.error("Robust color extraction failed, falling back to simple sampling:", error);
      console.log("App: Using fallback color extraction for:", imageData);
      // Simple fallback logic
      const img = new Image();
      img.crossOrigin = "Anonymous";
      const cacheBuster = imageData.startsWith('data:') ? '' : (imageData.includes('?') ? '&' : '?') + 'cv=' + Date.now();
      img.src = imageData + cacheBuster;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = 10; canvas.height = 10;
        ctx.drawImage(img, 0, 0, 10, 10);
        const data = ctx.getImageData(0, 0, 10, 10).data;
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]; g += data[i+1]; b += data[i+2];
        }
        const count = data.length / 4;
        setBackgroundColor(`rgb(${Math.round(r/count)}, ${Math.round(g/count)}, ${Math.round(b/count)})`);
      };
    }
  };
  
  // ... rest of the component

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f0f0] overflow-hidden">
      {/* iPhone frame - 390x844 from Figma */}
      <div
        className="relative flex flex-col overflow-hidden bg-white shadow-2xl origin-center transition-transform duration-300"
        style={{ 
          width: 390, 
          height: 844, 
          backgroundColor,
          transform: `scale(${scale})`
        }}
      >
        <AnimatePresence>
          {showSettings && (
            <SettingsModal onClose={() => setShowSettings(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBackgroundEditor && (
            <BackgroundEditor 
              onSave={handleSaveBackground} 
              onClose={() => setShowBackgroundEditor(false)} 
            />
          )}
        </AnimatePresence>

        <div className="flex flex-col flex-1 relative">
          {/* Profile Background - 390x238 at the very top, bottom layer */}
          {profileBackground && (
            <div 
              className="absolute top-0 left-0 right-0 z-0 overflow-hidden"
              style={{ height: 238 }}
            >
              <img 
                src={profileBackground} 
                alt="" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Gradient to blend with background color */}
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(to bottom, transparent 0%, ${backgroundColor} 100%)` 
                }}
              />
            </div>
          )}

          {/* UI Layer */}
          <div className="relative z-10 flex flex-col flex-1">
            {/* Status Bar + Nav Bar group */}
            <StatusBar lightMode={!!profileBackground} />
            <NavBar 
              onOpenSettings={() => setShowSettings(true)} 
              lightMode={!!profileBackground}
            />

            {/* Scrollable content area */}
            <LayoutGroup>
              <div className="flex-1 overflow-y-auto relative">
                <div className="relative z-20">
                  {/* Profile Header with Avatar, Name, Stats */}
                  <div 
                    className="cursor-pointer"
                    style={{ 
                      textShadow: profileBackground ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                      color: profileBackground ? 'white' : 'inherit'
                    }}
                    onClick={() => setShowBackgroundEditor(true)}
                  >
                    <ProfileHeader />
                  </div>

                  {/* White background section starting from Bio area */}
                  <div 
                    className={`bg-white rounded-t-[20px] pt-4 pb-32 min-h-[1000px] relative ${
                      profileBackground 
                        ? 'mt-[-20px] shadow-[0_-8px_30px_rgba(0,0,0,0.04)]' 
                        : 'mt-[-36px]'
                    }`}
                  >
                    {/* Bio & Links */}
                    <BioLinks lightMode={false} />

                    {/* Content section */}
                    <motion.div 
                      layout
                      transition={{ 
                        layout: { duration: 0.25, ease: "easeOut" } 
                      }}
                      className="flex flex-col items-center mt-2" 
                      style={{ gap: 1 }}
                    >
                      {/* Tab bar */}
                      <IconTabBar lightMode={false} />

                      {/* Video post grid */}
                      <VideoGrid />
                    </motion.div>
                  </div>
                </div>
              </div>
            </LayoutGroup>
          </div>

          {/* Bottom Nav Bar - fixed at bottom */}
          <div className="relative z-20">
            <BottomNavBar />
          </div>
        </div>
      </div>
    </div>
  );
}

