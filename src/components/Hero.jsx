import React, { useState } from 'react';
import { ArrowRight, Wand2, Shield, Sparkles } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function Hero({ onShopClick, onOpenCustomStudio, onNavigate }) {
  const [activeShirt, setActiveShirt] = useState(0); // 0: Charcoal, 1: White
  const [swayWild, setSwayWild] = useState(false);

  const shirts = [
    {
      name: 'Buri Nazar Waale Tee',
      color: '260 GSM Mineral Washed Charcoal',
      image: '/totka-tshirt-main.png',
      price: '₹1,499'
    },
    {
      name: 'Nimbu Totka Ritual Tee',
      color: '280 GSM Vintage Off-White',
      image: '/totka-tshirt-white.png',
      price: '₹1,599'
    }
  ];

  const handlePendulumTap = () => {
    audioFX.playNazarWard();
    setSwayWild(true);
    setTimeout(() => setSwayWild(false), 1400);
  };

  const current = shirts[activeShirt];

  return (
    <section className="relative overflow-hidden bg-[#F7F6F2] border-b border-black/15 py-8 lg:py-12 min-h-[calc(100vh-100px)] flex items-center">
      
      {/* Editorial Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Refined Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Minimalist Micro Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/20 text-black text-[10px] font-mono-street font-bold tracking-[0.2em] uppercase rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E03115]" />
              <span>DROP 01: AKHADA TO TAPRI • 260-280 GSM PURE TERRY</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-[#121212] font-black uppercase">
                BURI NAZAR WAALE, <br />
                <span className="relative inline-block text-black">
                  TERA WEIGHT DROP.
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFB800]/40 -z-10 -rotate-1 rounded" />
                </span>
              </h1>
            </div>

            {/* Subtitle Description */}
            <p className="text-[#444] text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              A high-precision Indian activewear and comfort-wear label merging street-smart culture with protective superstition. Heavyweight <strong className="text-black font-bold">240+ to 280 GSM oversized silhouettes</strong> engineered to outlast the heaviest deadlifts and post-workout tapri banter.
            </p>

            {/* Bespoke Studio Mini-Card */}
            <div className="bg-white border border-black/20 p-4 sm:p-5 rounded-2xl shadow-sm transition-all hover:border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono-street font-bold bg-[#E03115] text-white px-2 py-0.5 rounded uppercase tracking-wider">
                    BESPOKE ATELIER
                  </span>
                  <span className="font-heading text-sm sm:text-base text-black font-black uppercase tracking-tight">
                    CUSTOM TOTKA STUDIO
                  </span>
                </div>
                <p className="text-[11px] text-[#666] font-mono-street max-w-sm">
                  Choose your GSM grade, demon crest, comic backprint & stitch your personal lifter handle.
                </p>
              </div>

              <button
                onClick={() => {
                  audioFX.playDhishum();
                  if (onNavigate) {
                    onNavigate('custom');
                  } else if (onOpenCustomStudio) {
                    onOpenCustomStudio();
                  }
                }}
                className="shrink-0 bg-[#121212] hover:bg-black text-[#FFB800] px-4 py-2.5 rounded-xl text-xs font-bold font-mono-street tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all active:translate-y-0.5"
              >
                <Wand2 className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>ENTER ATELIER</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  audioFX.playDhishum();
                  onShopClick();
                }}
                className="bg-[#FFB800] hover:bg-[#FFA500] text-black border border-black/30 px-6 py-3 rounded-xl font-mono-street text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-sm transition-all active:translate-y-0.5"
              >
                <span>EXPLORE DROP 01</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  audioFX.playFlick();
                  if (onNavigate) onNavigate('lookbook');
                }}
                className="bg-white hover:bg-neutral-100 text-black border border-black/20 px-5 py-3 rounded-xl font-mono-street text-xs font-bold tracking-wider uppercase transition-all shadow-sm"
              >
                VIEW EDITORIAL LOOKBOOK
              </button>
            </div>

            {/* Micro Specs Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-street text-[#666]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                <span>260+ GSM Terry</span>
              </span>
              <span>•</span>
              <span>100% Cotton Loopback</span>
              <span>•</span>
              <span>Drop-Shoulder Box Cut</span>
              <span>•</span>
              <span className="text-black font-bold">Pan-India COD Available</span>
            </div>

          </div>

          {/* Right Column: Garment Visual & Interactive Talisman Pendulum */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* The Real Hanging Talisman Pendulum with realistic physics */}
            <div 
              onClick={handlePendulumTap}
              title="Tap to swing the protective talisman"
              className={`absolute -top-6 sm:-top-8 right-1 sm:right-6 z-30 cursor-pointer select-none origin-top transition-transform duration-300 ${
                swayWild 
                  ? 'animate-[wiggle_0.4s_ease-in-out_infinite] scale-105' 
                  : 'animate-[pendulum_4s_ease-in-out_infinite]'
              }`}
            >
              <div className="w-[1.5px] h-10 sm:h-14 bg-black/40 mx-auto" />
              <img 
                src="/nimbu-mirchi.png" 
                alt="Totka Nimbu Mirchi Talisman" 
                className="w-16 sm:w-20 h-auto object-contain drop-shadow-lg hover:scale-105 transition-transform"
              />
              <div className="bg-black/80 backdrop-blur-sm text-[#FFB800] text-[8px] font-mono-street px-1.5 py-0.5 rounded text-center font-bold tracking-wider uppercase mt-0.5 border border-black/20">
                TAP TO WARD
              </div>
            </div>

            {/* Direct Model Garment Stage (Minimal & Elevated) */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] bg-white rounded-3xl border border-black/15 p-3 sm:p-4 shadow-sm overflow-hidden flex flex-col justify-between">
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#F4F1EA]">
                <img 
                  key={current.image}
                  src={current.image} 
                  alt={current.name} 
                  className="w-full h-full object-cover object-top transition-all duration-500 animate-in fade-in"
                />

                {/* Garment Details Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/15 flex items-center justify-between shadow-sm">
                  <div>
                    <h4 className="font-heading text-xs sm:text-sm font-black text-black leading-tight">
                      {current.name}
                    </h4>
                    <p className="text-[10px] text-[#666] font-mono-street mt-0.5">
                      {current.color}
                    </p>
                  </div>
                  <span className="font-heading text-sm font-black text-black">
                    {current.price}
                  </span>
                </div>
              </div>

              {/* Garment Switcher Pills */}
              <div className="pt-3 flex gap-2 w-full">
                {shirts.map((shirt, idx) => (
                  <button
                    key={shirt.name}
                    onClick={() => {
                      audioFX.playFlick();
                      setActiveShirt(idx);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono-street font-bold transition-all truncate border ${
                      activeShirt === idx
                        ? 'bg-[#121212] text-[#FFB800] border-black shadow-sm'
                        : 'bg-[#FAF8F5] text-black border-black/15 hover:border-black'
                    }`}
                  >
                    {idx === 0 ? 'CHARCOAL (260 GSM)' : 'OFF-WHITE (280 GSM)'}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
