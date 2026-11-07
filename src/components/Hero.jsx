import React, { useState } from 'react';
import { ArrowRight, Wand2, Shield, Sparkles, Eye, Check, Flame } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function Hero({ onShopClick, onNavigate }) {
  const [activeShirt, setActiveShirt] = useState(0); // 0: Charcoal, 1: White
  const [swayWild, setSwayWild] = useState(false);
  const [showMacroLens, setShowMacroLens] = useState(false);

  const shirts = [
    {
      id: 'totka-01',
      name: 'Buri Nazar Waale Pump Cover',
      color: '260 GSM Mineral Acid-Washed Charcoal',
      image: '/totka-tshirt-main.png',
      detailImage: '/totka-tshirt-graphic.png',
      collarImage: '/totka-tshirt-collar.png',
      price: '₹1,499',
      fabric: '100% Combed Loopback French Terry',
      weightBadge: '260 GSM HEAVYWEIGHT',
    },
    {
      id: 'totka-02',
      name: 'Nimbu Totka Ritual Oversized Tee',
      color: '280 GSM Vintage Off-White French Terry',
      image: '/totka-tshirt-white.png',
      detailImage: '/totka-white-graphic.png',
      collarImage: '/totka-white-collar.png',
      price: '₹1,599',
      fabric: '280 GSM Heavy Combed Cotton',
      weightBadge: '280 GSM COMBAT TERRY',
    },
  ];

  const handlePendulumTap = () => {
    audioFX.playNazarWard();
    setSwayWild(true);
    setTimeout(() => setSwayWild(false), 1400);
  };

  const current = shirts[activeShirt];

  return (
    <section className="relative overflow-hidden py-10 lg:py-16 min-h-[calc(100vh-120px)] flex items-center">
      
      {/* Background Subtle Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: High-Fashion Streetwear Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Minimalist Micro Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 liquid-glass-pill rounded-full text-[10px] font-mono-street font-bold tracking-[0.2em] uppercase text-neutral-900 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#E03115]" />
              <span>DROP 01 // 260-280 GSM PURE TERRY // BHARAT</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.94] text-[#0E100F] font-black uppercase">
                BURI NAZAR WAALE, <br />
                <span className="relative inline-block text-black">
                  TERA WEIGHT DROP.
                  <span className="absolute bottom-1.5 left-0 w-full h-3 bg-[#FFB800]/30 -z-10 -rotate-1 rounded-sm" />
                </span>
              </h1>
            </div>

            {/* Subtitle Description */}
            <p className="text-neutral-700 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              A high-precision Indian activewear and comfort-wear label merging street-smart culture with protective superstition. Heavyweight <strong className="text-black font-bold">240+ to 280 GSM oversized silhouettes</strong> engineered to outlast the heaviest deadlifts and post-workout tapri banter.
            </p>

            {/* Bespoke Atelier Liquid Glass Accent Card */}
            <div className="liquid-glass-card rounded-3xl p-5 border-white/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono-street font-bold bg-[#E03115] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    MAIN USP
                  </span>
                  <span className="font-heading text-sm sm:text-base text-black font-black uppercase tracking-tight">
                    BESPOKE ATELIER STUDIO
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 font-mono-street max-w-sm">
                  Customize your GSM density, talisman crest, comic backprint & stitch your personal lifter handle live.
                </p>
              </div>

              <button
                onClick={() => {
                  audioFX.playDhishum();
                  if (onNavigate) onNavigate('custom');
                }}
                className="shrink-0 bg-[#0E100F] hover:bg-black text-[#FFB800] px-5 py-2.5 rounded-2xl text-xs font-bold font-mono-street tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
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
                className="bg-[#FFB800] hover:bg-[#FFA500] text-black border border-black/20 px-6 py-3.5 rounded-2xl font-mono-street text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>EXPLORE DROP 01</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  audioFX.playFlick();
                  if (onNavigate) onNavigate('lookbook');
                }}
                className="liquid-glass-pill hover:bg-white text-neutral-900 px-5 py-3.5 rounded-2xl font-mono-street text-xs font-bold tracking-wider uppercase transition-all shadow-2xs cursor-pointer"
              >
                EDITORIAL LOOKBOOK
              </button>
            </div>

            {/* Micro Specs Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono-street text-neutral-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                <span>260+ GSM Pure Terry</span>
              </span>
              <span>•</span>
              <span>Drop-Shoulder Box Cut</span>
              <span>•</span>
              <span>Zero-Sag Collar Rib</span>
              <span>•</span>
              <span className="text-black font-bold">Pan-India Express COD</span>
            </div>

          </div>

          {/* Right Column: Garment Visual & Interactive Talisman Pendulum */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* The Real Hanging Talisman Pendulum */}
            <div 
              onClick={handlePendulumTap}
              title="Tap to swing the protective talisman"
              className={`absolute -top-7 right-2 sm:right-6 z-30 cursor-pointer select-none origin-top transition-transform duration-300 ${
                swayWild 
                  ? 'animate-[wiggle_0.4s_ease-in-out_infinite] scale-105' 
                  : 'animate-[pendulum_4.2s_ease-in-out_infinite]'
              }`}
            >
              <div className="w-[1.5px] h-10 sm:h-14 bg-black/40 mx-auto" />
              <img 
                src="/nimbu-mirchi.png" 
                alt="Totka Nimbu Mirchi Talisman" 
                className="w-16 sm:w-20 h-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
              <div className="bg-[#0E100F]/90 backdrop-blur-sm text-[#FFB800] text-[8px] font-mono-street px-2 py-0.5 rounded-full text-center font-bold tracking-wider uppercase mt-0.5 border border-white/10 shadow-xs">
                TAP TO WARD
              </div>
            </div>

            {/* Liquid Glass Model Stage */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] liquid-glass-card rounded-3xl p-3 sm:p-4 border-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] flex flex-col justify-between">
              
              {/* Product Visual Container with Interactive Inking Magnifier */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#EFECE3] border border-black/10">
                <img 
                  key={showMacroLens ? current.detailImage : current.image}
                  src={showMacroLens ? current.detailImage : current.image} 
                  alt={current.name} 
                  className="w-full h-full object-cover object-top transition-all duration-500 animate-in fade-in"
                />

                {/* Macro Inspection Toggle Pill */}
                <button
                  onClick={() => {
                    audioFX.playFlick();
                    setShowMacroLens(!showMacroLens);
                  }}
                  className="absolute top-3.5 right-3.5 liquid-glass-pill hover:bg-white px-3 py-1.5 rounded-full text-[10px] font-mono-street font-bold text-neutral-900 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#E03115]" />
                  <span>{showMacroLens ? 'VIEW FULL MODEL' : 'INSPECT INKING'}</span>
                </button>

                {/* Garment Details Liquid Overlay */}
                <div className="absolute bottom-3 left-3 right-3 liquid-glass-pill px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs">
                  <div>
                    <h4 className="font-heading text-xs sm:text-sm font-black text-black leading-tight">
                      {current.name}
                    </h4>
                    <p className="text-[10px] text-neutral-600 font-mono-street mt-0.5">
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
                      setShowMacroLens(false);
                    }}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-[10px] font-mono-street font-bold transition-all truncate border cursor-pointer ${
                      activeShirt === idx
                        ? 'bg-[#0E100F] text-[#FFB800] border-black shadow-2xs'
                        : 'bg-white/70 text-neutral-800 border-black/10 hover:border-black/30'
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
