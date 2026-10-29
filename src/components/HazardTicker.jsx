import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function HazardTicker() {
  const tickerItems = [
    'HOSHIYAR: BURI NAZAR-PROOF ACTIVEWEAR',
    '240+ TO 280 GSM HEAVYWEIGHT COTTON TEES',
    'BAKCHODI NAHI RUKNI CHAHIYE',
    'MINERAL ACID WASH & HEAVY COMBED TERRY',
    'UNBOXING AT YOUR OWN RISK: 100% DESI SURAKSHA',
    'FORGED IN RUSTY AKHADAS & POST-GYM CHAI TAPRIS',
    'FREE LEMON-CHILLI KEYCHAIN ON ORDERS ABOVE ₹1999',
  ];

  return (
    <div className="relative bg-[#FFB800] text-[#0A0D0C] border-b-3 border-[#0A0D0C] overflow-hidden py-2 font-mono-street text-xs tracking-wider select-none z-50">
      <div className="flex animate-[marquee_26s_linear_infinite] whitespace-nowrap gap-8 font-black uppercase">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="bg-[#0A0D0C] text-[#FFB800] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-[#FF3B1D]" /> KHABARDAR
            </span>
            <span className="text-xs font-bold tracking-wide">{item}</span>
            <span className="text-[#FF3B1D] font-bold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
