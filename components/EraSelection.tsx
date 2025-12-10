import React from 'react';
import { ERAS } from '../constants';
import { EraData } from '../types';
import { History, ChevronLeft } from 'lucide-react';

interface EraSelectionProps {
  onSelectEra: (era: EraData) => void;
  onBack: () => void;
}

export const EraSelection: React.FC<EraSelectionProps> = ({ onSelectEra, onBack }) => {
  return (
    <div className="h-full w-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="flex-none pt-8 pb-4 px-6 z-10 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent sticky top-0 flex items-center">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-300 hover:text-white transition-colors mr-2"
          aria-label="Back to Splash Screen"
        >
          <ChevronLeft size={28} />
        </button>
        <div>
            <h2 className="text-2xl font-bold text-white brand-font tracking-wide">
              Choose Era
            </h2>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-light">Select your destination</p>
        </div>
      </div>

      {/* Grid Layout (Portrait Friendly) */}
      <div className="flex-grow overflow-y-auto px-4 pb-12">
        <div className="grid grid-cols-2 gap-4">
            {ERAS.map((era, index) => (
            <div 
                key={era.id}
                onClick={() => onSelectEra(era)}
                className="group relative w-full aspect-[3/5] rounded-xl overflow-hidden cursor-pointer border-2 border-slate-800 hover:border-yellow-500 transition-all duration-300 shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={era.previewImage} 
                        alt={era.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                        <History size={12} />
                        <span className="text-[9px] font-bold tracking-widest uppercase">Era {index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight brand-font mb-1">{era.name}</h3>
                </div>
                
                {/* Selected Indicator/Ring (simulating reference) */}
                <div className="absolute inset-0 border-4 border-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};