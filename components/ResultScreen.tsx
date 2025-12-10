import React, { useMemo } from 'react';
import { EraData, FaceDetectionResult } from '../types';
import { Download, RotateCcw, Share2, Bug } from 'lucide-react';
import eraFacts from '../data/facts.json';

interface ResultScreenProps {
  imageSrc: string;
  era: EraData;
  faceData: FaceDetectionResult | null;
  onRestart: () => void;
  onUpdateImage: (newImage: string) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ imageSrc, era, faceData, onRestart, onUpdateImage }) => {
  const randomFact = useMemo(() => {
    // @ts-ignore - JSON import might not be strictly typed without config
    const list = eraFacts[era.id];
    if (list && Array.isArray(list) && list.length > 0) {
      return list[Math.floor(Math.random() * list.length)];
    }
    return era.funFact;
  }, [era.id, era.funFact]);


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `chronolens-${era.id}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <div className="h-full w-full flex flex-col bg-slate-900">
      {/* 1. Image Area - Takes priority */}
      <div className="relative flex-grow bg-black w-full overflow-hidden flex items-center justify-center">
        {/* Background Blur Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover opacity-60 blur-2xl scale-110"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>



        {/* Main Image */}
        <img
          src={imageSrc}
          alt="Generated Portrait"
          className="relative z-10 w-full h-full object-contain animate-fade-in drop-shadow-2xl"
        />

        {/* Floating Actions on Image */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-20">
          <button
            onClick={handleDownload}
            className="p-3 bg-black/30 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-yellow-500 hover:text-black transition-colors transform hover:scale-110 active:scale-95 animate-slide-in-bottom"
            style={{ animationDelay: '0.2s' }}
          >
            <Download size={20} />
          </button>
          <button
            className="p-3 bg-black/30 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-yellow-500 hover:text-black transition-colors transform hover:scale-110 active:scale-95 animate-slide-in-bottom"
            style={{ animationDelay: '0.3s' }}
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* 2. Controls & Info Area - Slide up sheet style with Animation */}
      <style>{`
        @keyframes slide-up-sheet {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
      `}</style>
      <div
        className="flex-none bg-slate-900 rounded-t-3xl -mt-6 relative z-10 px-6 pt-8 pb-8 flex flex-col gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-slate-800"
        style={{ animation: 'slide-up-sheet 1s cubic-bezier(0.19, 1, 0.22, 1) forwards' }}
      >

        {/* Era Title & Fact */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-yellow-500 brand-font">{era.name}</h2>
            <span className="text-xs text-slate-500 border border-slate-700 px-2 py-1 rounded-full">AI Generated</span>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <p className="text-slate-300 text-sm italic leading-relaxed">
              "{randomFact}"
            </p>
          </div>
        </div>

        {/* Edit Controls */}
        <div>
          <div className="flex justify-center gap-4">
            <button
              onClick={onRestart}
              className="w-full py-4 border border-slate-700 text-slate-300 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-slate-800 transition-colors"
              style={{ maxWidth: '200px' }}
            >
              <RotateCcw size={16} className="mr-2" /> Restart
            </button>
          </div>
        </div>

        {/* Debug Info */}
        {faceData && (
          <div className="pt-4 border-t border-slate-800/50 flex items-center justify-center gap-2 text-xs text-slate-600 font-mono">
            <Bug size={12} />
            <span>Detected: Male: {faceData.maleCount}, Female: {faceData.femaleCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};