import React, { useState } from 'react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { EraData, FaceDetectionResult } from '../types';

interface CameraCaptureProps {
  era: EraData | null;
  onCapture: (image: string, faceData: FaceDetectionResult) => void;
  onBack: () => void;
  isProcessing?: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ era, onCapture, onBack, isProcessing = false }) => {
  const [maleCount, setMaleCount] = useState(1);
  const [femaleCount, setFemaleCount] = useState(0);

  const handleGenerate = () => {
    const faceData: FaceDetectionResult = {
      maleCount,
      femaleCount,
      childCount: 0,
      totalPeople: maleCount + femaleCount
    };
    // Send empty string for image as it's no longer used for generation
    onCapture('', faceData);
  };

  if (isProcessing) return null;

  return (
    <div className="h-full w-full bg-[#0a0a0c] relative flex flex-col items-center justify-center p-6">
      {/* Background Aesthetic */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/20 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-8 z-20 flex items-center">
        <button
          onClick={onBack}
          className="w-14 h-14 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl text-white hover:bg-white/10 transition-all border border-white/10 active:scale-90"
        >
          <ChevronLeft size={28} />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-12 animate-fade-in-up">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold brand-font text-white tracking-tight">
            WHO IS <span className="text-gold-500">TRAVELING?</span>
          </h2>
          <p className="text-slate-400 text-lg">Select the number of travelers for your historical portrait.</p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 gap-6 w-full">
          {/* Male Counter */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
            <div className="flex flex-col">
              <span className="text-blue-400 text-xs font-bold brand-font tracking-widest uppercase">MALE</span>
              <span className="text-white text-2xl font-bold">Gentlemen</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setMaleCount(Math.max(0, maleCount - 1))}
                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 border border-white/5"
              >-</button>
              <span className="text-white text-4xl font-bold w-8 text-center tabular-nums">{maleCount}</span>
              <button 
                onClick={() => setMaleCount(Math.min(4, maleCount + 1))}
                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 border border-white/5"
              >+</button>
            </div>
          </div>

          {/* Female Counter */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
            <div className="flex flex-col">
              <span className="text-pink-400 text-xs font-bold brand-font tracking-widest uppercase">FEMALE</span>
              <span className="text-white text-2xl font-bold">Ladies</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setFemaleCount(Math.max(0, femaleCount - 1))}
                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 border border-white/5"
              >-</button>
              <span className="text-white text-4xl font-bold w-8 text-center tabular-nums">{femaleCount}</span>
              <button 
                onClick={() => setFemaleCount(Math.min(4, femaleCount + 1))}
                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 border border-white/5"
              >+</button>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={maleCount === 0 && femaleCount === 0}
          className="w-full py-6 bg-gold-500 hover:bg-gold-600 disabled:bg-slate-800 disabled:text-slate-500 text-black font-bold text-xl rounded-3xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(234,179,8,0.2)] active:scale-95 group"
        >
          <Sparkles className={`w-6 h-6 ${maleCount === 0 && femaleCount === 0 ? '' : 'animate-pulse'}`} />
          GENERATE PORTRAIT
        </button>

        <p className="text-slate-500 text-sm font-mono uppercase tracking-[0.2em]">
          Destination: {era?.name}
        </p>
      </div>
    </div>
  );
};