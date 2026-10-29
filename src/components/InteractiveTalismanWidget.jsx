import React, { useState } from 'react';
import { Shield, Sparkles, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

export default function InteractiveTalismanWidget() {
  const [swaying, setSwaying] = useState(false);
  const [blessing, setBlessing] = useState(null);
  const [count, setCount] = useState(0);

  const blessings = [
    "Evil eye deflected! +5 KG added to your deadlift PR.",
    "Buri nazar absorbed! Your pre-workout kicks in 2x faster.",
    "Tapri chai blessing active: Zero shoulder impingement today.",
    "Totka confirmed: Unsolicited gym advice deflects back to source.",
    "Akhada protection: Leg day recovery time cut in half."
  ];

  const handleTap = () => {
    audioFX.playNazarWard();
    setSwaying(true);
    const newCount = count + 1;
    setCount(newCount);
    setBlessing(blessings[newCount % blessings.length]);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { x: 0.9, y: 0.85 },
      colors: ['#FFC01D', '#FF4625', '#FAF7EE']
    });

    setTimeout(() => {
      setSwaying(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none">
      
      {/* Toast Popup when tapped */}
      {blessing && (
        <div className="pointer-events-auto mb-2 max-w-xs bg-[#0D1411]/95 backdrop-blur-md border border-[#FFC01D]/40 text-[#FAF7EE] p-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 flex items-start gap-2.5">
          <span className="text-base">🍋</span>
          <div className="flex-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#FFC01D] font-bold block">
              TOTKA ACTIVE (#{count})
            </span>
            <p className="text-xs text-[#FAF7EE]/90 font-medium leading-snug">
              {blessing}
            </p>
          </div>
          <button 
            onClick={() => setBlessing(null)}
            className="text-[#FAF7EE]/40 hover:text-[#FAF7EE] text-xs p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Talisman Button */}
      <div 
        onClick={handleTap}
        className="pointer-events-auto cursor-pointer group flex items-center gap-2 bg-[#121C18]/90 hover:bg-[#182420] backdrop-blur-md border border-[#FFC01D]/30 hover:border-[#FFC01D] px-3 py-2 rounded-full shadow-xl transition-all duration-200 select-none"
        title="Tap to ward off evil eye!"
      >
        {/* Hanging Miniature Nimbu Mirchi */}
        <div className={`relative w-6 h-8 ${swaying ? 'animate-pendulum-wild' : 'animate-pendulum'}`}>
          <img 
            src="/nimbu-mirchi.png" 
            alt="Talisman Charm" 
            className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          />
        </div>

        <div className="text-left pr-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#FFC01D] font-bold block leading-none">
            NAZAR SHIELD
          </span>
          <span className="text-[10px] text-[#FAF7EE]/70 font-mono">
            {count > 0 ? `${count} Warded` : 'Tap Charm'}
          </span>
        </div>
      </div>

    </div>
  );
}

