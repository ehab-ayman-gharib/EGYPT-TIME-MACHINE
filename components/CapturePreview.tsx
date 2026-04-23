import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { EraData, FaceDetectionResult } from '../types';

interface CapturePreviewProps {
  image: string;
  faceData: FaceDetectionResult | null;
  era: EraData | null;
  onConfirm: () => void;
  onRetake: () => void;
}

export const CapturePreview: React.FC<CapturePreviewProps> = ({
  image,
  faceData,
  era,
  onConfirm,
  onRetake
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      onConfirm();
      return;
    }
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, onConfirm]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070b14] p-2 overflow-hidden">
      {/* 1. Main Preview Container - Maximized size */}
      <div className="relative w-[95vw] max-w-[800px] aspect-[9/16] max-h-[82vh] rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.7)] border-[12px] border-[#1e293b]">
        <img src={image} alt="Preview" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* 2. Countdown Badge - Scaled Up */}
      <div className="mt-8 mb-5">
        <div className="px-8 py-3 bg-[#1e293b]/90 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 shadow-2xl">
          <span className="text-white/70 text-[13px] font-black tracking-[0.08em] uppercase">
            Starting AI in
          </span>
          <span className="text-white text-base font-black min-w-[1.8rem] text-center">
            {countdown} s
          </span>
        </div>
      </div>

      {/* 3. Retake Button - Scaled Up */}
      <button
        onClick={onRetake}
        className="group relative px-14 py-6 bg-[#2563eb] hover:bg-[#3b82f6] rounded-[2.5rem] text-white font-black tracking-[0.15em] text-base flex items-center justify-center gap-5 transition-all duration-300 active:scale-95 shadow-[0_15px_40px_rgba(37,99,235,0.45)]"
      >
        <RefreshCw size={26} className={`transition-transform duration-700 group-hover:rotate-180 ${countdown === 0 ? 'animate-spin' : ''}`} />
        <span className="uppercase">Retake Photo</span>
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 pointer-events-none" />
      </button>
    </div>
  );
};
