import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, Camera, Image as ImageIcon, Check } from 'lucide-react';

interface BackgroundEditorProps {
  onSave: (imageData: string) => void;
  onClose: () => void;
}

export function BackgroundEditor({ onSave, onClose }: BackgroundEditorProps) {
  const [step, setStep] = useState<'actionSheet' | 'picker' | 'crop'>('actionSheet');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setStep('crop');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none"
      style={{ width: 390, height: 844 }}
    >
      <AnimatePresence mode="wait">
        {step === 'actionSheet' && (
          <motion.div
            key="actionSheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 pointer-events-auto flex items-end justify-center pb-8"
            style={{ width: 390, height: 844 }}
            onClick={onClose}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-[350px] bg-white rounded-[20px] overflow-hidden flex flex-col mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="w-full h-[56px] flex items-center justify-center text-[17px] font-medium text-black border-b border-gray-100 active:bg-gray-50"
                onClick={() => setStep('picker')}
              >
                Upload photo
              </button>
              <button
                className="w-full h-[56px] flex items-center justify-center text-[17px] font-medium text-black border-b border-gray-100 active:bg-gray-50"
                onClick={() => setStep('picker')}
              >
                Select from public posts
              </button>
              <button
                className="w-full h-[56px] flex items-center justify-center text-[17px] font-medium text-gray-400 active:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
            </motion.div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </motion.div>
        )}

        {step === 'picker' && (
          <motion.div
            key="picker"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute inset-0 bg-white pointer-events-auto flex flex-col"
            style={{ width: 390, height: 844 }}
          >
            <div className="h-[56px] flex items-center justify-between px-4 border-b border-gray-100">
              <button onClick={() => setStep('actionSheet')} className="text-black">
                <ChevronLeft size={24} />
              </button>
              <span className="text-[17px] font-bold">Recents</span>
              <div className="w-6" />
            </div>
            <div className="flex-1 overflow-y-auto p-1 grid grid-cols-3 gap-1">
              {/* User requested image */}
              <div
                className="aspect-square bg-gray-100 cursor-pointer active:opacity-80"
                onClick={() => {
                  setSelectedImage(`https://picui.ogmua.cn/s1/2026/03/05/69a8e99278eea.webp`);
                  setStep('crop');
                }}
              >
                <img
                  src={`https://picui.ogmua.cn/s1/2026/03/05/69a8e99278eea.webp`}
                  alt=""
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Mock public posts */}
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 cursor-pointer active:opacity-80"
                  onClick={() => {
                    setSelectedImage(`https://picsum.photos/seed/${i + 100}/400/600`);
                    setStep('crop');
                  }}
                >
                  <img
                    src={`https://picsum.photos/seed/${i + 100}/400/600`}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'crop' && selectedImage && (
          <CropView
            image={selectedImage}
            onSave={onSave}
            onCancel={() => setStep('actionSheet')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CropView({ image, onSave, onCancel }: { image: string; onSave: (img: string) => void; onCancel: () => void }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSave = () => {
    onSave(image);
  };

  return (
    <motion.div
      key="crop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black pointer-events-auto flex flex-col"
      style={{ width: 390, height: 844 }}
    >
      <div className="h-[56px] flex items-center justify-center px-4 text-white relative">
        <span className="text-[17px] font-bold">Crop</span>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden" ref={containerRef}>
        {/* Crop Area Guide - 390x238 */}
        <div 
          className="absolute z-10 border border-white/30 pointer-events-none"
          style={{ width: 390, height: 238 }}
        />
        
        {/* Dimmed areas */}
        <div className="absolute top-0 left-0 right-0 bg-black/70 z-5" style={{ bottom: 'calc(50% + 119px)' }} />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 z-5" style={{ top: 'calc(50% + 119px)' }} />

        <motion.img
          ref={imageRef}
          src={image}
          alt=""
          className="max-w-none cursor-move"
          style={{ scale }}
          drag
          dragConstraints={containerRef}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="h-[120px] flex items-center justify-center px-6 gap-4 pb-8">
        <button
          onClick={onCancel}
          className="flex-1 h-[50px] rounded-full bg-white/10 text-white font-bold active:bg-white/20 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 h-[50px] rounded-full bg-[#FE2C55] text-white font-bold active:opacity-90 transition-opacity"
        >
          Save
        </button>
      </div>
    </motion.div>
  );
}
