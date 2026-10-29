import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

export default function CollarTagModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-md bg-[#FAF8F5] border-4 border-black rounded-2xl p-6 sm:p-7 neo-shadow-lg max-h-[85vh] overflow-y-auto no-scrollbar text-center space-y-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded bg-black text-white hover:bg-[#FF3B1D] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono-street text-[#FF3B1D] font-bold uppercase tracking-widest">
            ★ WOVEN DAMASK COLLAR TAG ★
          </span>
          <h3 className="font-heading text-xl font-black text-black uppercase">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#666] font-mono-street">
            {product.gsm} GSM • {product.colorName}
          </p>
        </div>

        {/* Woven Label Simulation */}
        <div className="relative mx-auto bg-white p-5 rounded-xl border-3 border-dashed border-black text-left space-y-3 neo-shadow-sm">
          
          <div className="flex justify-between items-center border-b-2 border-black/10 pb-2">
            <div className="flex items-center gap-1.5 font-mono-street text-[10px] text-black font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-[#FF3B1D]" />
              <span>KHABARDAR LABELS &copy;</span>
            </div>
            <span className="font-mono-street text-[9px] text-[#888]">RN #786-TOTKA</span>
          </div>

          <div className="space-y-1.5">
            <p className="font-heading text-sm font-bold text-black tracking-wide uppercase">
              "{product.innerCollarTag}"
            </p>
            <p className="text-[11px] text-[#444] leading-relaxed font-normal">
              100% Super-Combed Terry Cotton. Do not iron over superstitious prints. Do not let people who skip leg day borrow this armor.
            </p>
          </div>

          <div className="pt-2 border-t-2 border-black/10 grid grid-cols-2 gap-1.5 text-[10px] font-mono-street text-[#666] font-bold">
            <div>💧 Cold wash only</div>
            <div>🚫 No ego lifting</div>
            <div>⚡ Nazar utaar ke pehanna</div>
            <div>🌶️ 100% Cotton Terry</div>
          </div>

          <div className="bg-[#FFB800] p-1.5 rounded text-center font-mono-street text-[10px] text-black font-bold border border-black">
            SHIELD RATING: {product.nazarShieldRating}
          </div>

        </div>

        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-[#222] text-white text-xs font-mono-street font-bold py-2.5 rounded uppercase tracking-wider transition-colors neo-shadow-sm active:translate-y-0.5"
        >
          CLOSE INSPECTION
        </button>

      </div>
    </div>
  );
}
