import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, Key, Check, AlertCircle } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('REMOVE_BG_API_KEY');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('REMOVE_BG_API_KEY', apiKey.trim());
    } else {
      localStorage.removeItem('REMOVE_BG_API_KEY');
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Settings</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Key size={16} className="text-indigo-500" />
              Remove.bg API Key
            </label>
            <p className="text-xs text-gray-500">
              Enter your API key to enable high-quality cloud background removal.
              Without a key, the app will use a slower local fallback.
            </p>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API Key (e.g. QRQQ...)"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm font-mono"
              />
            </div>
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-blue-700 text-xs">
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              <p>
                Get a free key at <a href="https://www.remove.bg/api" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-800">remove.bg/api</a>.
                Your key is stored locally on your device.
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              isSaved 
                ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                : 'bg-black text-white shadow-lg shadow-gray-200 active:scale-95'
            }`}
          >
            {isSaved ? (
              <>
                <Check size={18} />
                Saved Successfully
              </>
            ) : (
              'Save Configuration'
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
