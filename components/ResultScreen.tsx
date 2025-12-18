import React, { useState, useEffect } from 'react';
import { EraData, FaceDetectionResult } from '../types';
import { Download, RotateCcw, Share2, QrCode, Loader2 } from 'lucide-react';

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
    <div className="h-full w-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* 1. Background Image */}
      <img
        src="/Result-Screen.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 blur-sm"
      />
      <div className="absolute inset-0 bg-black/10 z-[1]" />

      {/* 2. Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-6 px-4">

        {/* Main Generated Image Display */}
        <div className="relative w-[98%] md:w-[85%] lg:w-[65%] h-[85%] flex items-center justify-center animate-scale-in">
          <div className="absolute inset-0 bg-yellow-600/5 blur-1xl rounded-full" />
          <div className="relative w-full h-full border border-yellow-500/10 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] bg-black/40">
            <img
              src={imageSrc}
              alt="Generated Portrait"
              className="w-full h-full object-contain scale-[1.02]"
            />
          </div>
        </div>

        {/* Footer Actions & QR */}
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center justify-center gap-10 w-full max-w-2xl px-4">

            {/* Download/Share Actions */}
            <div className="flex flex-col gap-4 animate-slide-in-bottom" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={handleDownload}
                className="flex items-center gap-3 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all shadow-lg active:scale-95 group"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                <span className="text-sm uppercase tracking-wider">Download</span>
              </button>

              <button
                onClick={onRestart}
                className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all active:scale-95"
              >
                <RotateCcw size={18} />
                <span className="text-sm uppercase tracking-wider">New Adventure</span>
              </button>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center gap-2 animate-slide-in-bottom" style={{ animationDelay: '0.6s' }}>
              <div className="w-32 h-32 bg-white rounded-xl shadow-2xl p-2 relative group flex items-center justify-center border-4 border-yellow-600/50">
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-yellow-600" size={32} />
                    <span className="text-[10px] text-slate-600 font-bold uppercase">Uploading</span>
                  </div>
                ) : qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
                ) : (
                  <QrCode className="text-slate-400 opacity-20" size={48} />
                )}
              </div>
              <span className="text-[10px] text-yellow-500 font-black tracking-widest uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Scan to Share</span>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};