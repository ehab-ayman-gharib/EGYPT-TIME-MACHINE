import React, { useMemo, useState, useEffect } from 'react';
import { EraData, FaceDetectionResult } from '../types';
import { Download, RotateCcw, Share2, Bug, QrCode, Loader2 } from 'lucide-react';
import eraFacts from '../data/facts.json';

interface ResultScreenProps {
  imageSrc: string;
  era: EraData;
  faceData: FaceDetectionResult | null;
  onRestart: () => void;
  onUpdateImage: (newImage: string) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ imageSrc, era, faceData, onRestart, onUpdateImage }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const randomFact = useMemo(() => {
    // @ts-ignore - JSON import might not be strictly typed without config
    const list = eraFacts[era.id];
    if (list && Array.isArray(list) && list.length > 0) {
      return list[Math.floor(Math.random() * list.length)];
    }
    return era.funFact;
  }, [era.id, era.funFact]);

  useEffect(() => {
    const uploadImage = async () => {
      if (!imageSrc) return;
      setIsUploading(true);
      try {
        let blob: Blob;
        if (imageSrc.startsWith('data:')) {
          const response = await fetch(imageSrc);
          blob = await response.blob();
        } else {
          const response = await fetch(imageSrc);
          blob = await response.blob();
        }

        const formData = new FormData();
        formData.append('image', blob, 'result.png');

        const response = await fetch('https://splendid-mermaid-198666.netlify.app/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        setQrCodeUrl(data.qrCodeUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    };

    uploadImage();
  }, [imageSrc]);

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
            onClick={() => qrCodeUrl && window.open(qrCodeUrl, '_blank')}
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
        {/* Era Title, Fact & QR Code Row */}
        <div className="flex gap-4 items-start">
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-yellow-500 brand-font">{era.name}</h2>
              <span className="text-xs text-slate-500 border border-slate-700 px-2 py-1 rounded-full uppercase tracking-wider">AI Generated</span>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 min-h-[80px] flex items-center">
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "{randomFact}"
              </p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex-none flex flex-col items-center gap-2">
            <div className="w-28 h-28 bg-white/10 rounded-xl border border-white/5 backdrop-blur-sm flex items-center justify-center p-2 relative group overflow-hidden">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-yellow-500" size={24} />
                  <span className="text-[10px] text-slate-400 font-medium">UPLOADING...</span>
                </div>
              ) : qrCodeUrl ? (
                <div className="relative w-full h-full animate-fade-in">
                  <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain rounded-lg shadow-lg" />
                  <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <QrCode className="text-slate-400" size={24} />
                  <span className="text-[10px] text-slate-500 font-medium uppercase">QR CODE</span>
                </div>
              )}
            </div>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">Scan to share</span>
          </div>
        </div>

        {/* Edit Controls */}
        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="w-full py-4 bg-slate-800 border border-slate-700 text-yellow-500 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-slate-700 hover:border-yellow-500/50 transition-all transform active:scale-95 shadow-xl"
            style={{ maxWidth: '400px' }}
          >
            <RotateCcw size={16} className="mr-2" /> New Adventure
          </button>
        </div>

        {/* Debug Info */}
        {faceData && (
          <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-mono uppercase tracking-tighter">
            <Bug size={10} />
            <span>Detection: {faceData.maleCount}M | {faceData.femaleCount}F</span>
          </div>
        )}
      </div>
    </div>
  );
};