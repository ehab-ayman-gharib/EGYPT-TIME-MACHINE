import React, { useState, useMemo } from 'react';
import { EraData, FaceDetectionResult } from '../types';
import { Download, RotateCcw, Sparkles, Send, Share2, Bug } from 'lucide-react';
import { editGeneratedImage } from '../services/geminiService';
import eraFacts from '../data/facts.json';

interface ResultScreenProps {
  imageSrc: string;
  era: EraData;
  faceData: FaceDetectionResult | null;
  onRestart: () => void;
  onUpdateImage: (newImage: string) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ imageSrc, era, faceData, onRestart, onUpdateImage }) => {
  const [isEditing, setIsEditing] = useState(false);

  const randomFact = useMemo(() => {
    // @ts-ignore - JSON import might not be strictly typed without config
    const list = eraFacts[era.id];
    if (list && Array.isArray(list) && list.length > 0) {
      return list[Math.floor(Math.random() * list.length)];
    }
    return era.funFact;
  }, [era.id, era.funFact]);
  const [editPrompt, setEditPrompt] = useState("");
  const [isProcessingEdit, setIsProcessingEdit] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `chronolens-${era.id}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPrompt.trim()) return;

    setIsProcessingEdit(true);
    try {
      const newImage = await editGeneratedImage(imageSrc, editPrompt);
      onUpdateImage(newImage);
      setEditPrompt("");
      setIsEditing(false);
    } catch (error) {
      alert("Failed to edit image. Please try again.");
    } finally {
      setIsProcessingEdit(false);
    }
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

        {isProcessingEdit && (
          <div className="absolute inset-0 bg-black/70 z-30 flex items-center justify-center flex-col animate-fade-in">
            <Sparkles className="w-12 h-12 text-yellow-400 animate-spin mb-4" />
            <span className="text-white font-bold tracking-widest text-sm">REFINING HISTORY...</span>
          </div>
        )}

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
          {!isEditing ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={onRestart}
                className="w-full py-4 border border-slate-700 text-slate-300 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-slate-800 transition-colors"
                style={{ maxWidth: '200px' }} // Optional: Limit width so it doesn't stretch too wide
              >
                <RotateCcw size={16} className="mr-2" /> Restart
              </button>
            </div>
          ) : (
            <div className="animate-slide-in-bottom">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Describe change</label>
                <button onClick={() => setIsEditing(false)} className="text-xs text-slate-500 hover:text-white">Cancel</button>
              </div>
              <form onSubmit={handleEditSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="e.g. Make me smile, add a hat..."
                  className="flex-grow bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!editPrompt.trim() || isProcessingEdit}
                  className="p-3 bg-yellow-500 text-black rounded-xl font-bold disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          )}
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