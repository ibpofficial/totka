import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function HazardTicker() {
  const tickerItems = [
    'HOSHIYAR: BURI NAZAR-PROOF HEAVYWEIGHT ACTIVEWEAR',
    '240+ TO 280 GSM COMBED COTTON LOOPBACK TERRY',
    'MINERAL ACID WASH & DROP-SHOULDER STRUCTURE',
    'FREE 3D LEMON-CHILLI KEYCHAIN ON ORDERS ABOVE ₹1999',
    'DESIGNED FOR STREETS & SQUATS ACROSS BHARAT',
    'ZERO CRACKING WATER-BASED WATERMARK INKING',
    'PAN-INDIA COD & 7-DAY HASSLE-FREE REPLACEMENTS'
  ];

  return (
    <div className="relative bg-[#121212] text-[#FAF8F5] border-b border-white/10 overflow-hidden py-2 font-mono-street text-[11px] tracking-widest select-none z-50">
      <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap gap-10 font-bold uppercase">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="bg-[#FFB800] text-black px-2 py-0.2 rounded text-[9px] font-black flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5 text-[#E03115]" /> KHABARDAR
            </span>
            <span className="text-[11px] tracking-wider text-neutral-300">{item}</span>
            <span className="text-[#E03115]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
