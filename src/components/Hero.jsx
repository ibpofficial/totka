import React, { useState } from 'react';
import { ArrowRight, Wand2 } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function Hero({ onShopClick, onUnboxingClick, onOpenCustomStudio }) {
  const [activeShirt, setActiveShirt] = useState(0); // 0: Charcoal, 1: White
  const [swayWild, setSwayWild] = useState(false);

  const shirts = [
    {
      name: 'Buri Nazar Waale Tee',
      color: '260 GSM Washed Charcoal',
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
    <section className="relative overflow-hidden bg-[#F7F4EE] bg-raw-canvas border-b-3 border-[#0A0D0C] py-6 lg:py-8 min-h-[calc(100vh-120px)] flex items-center">
      {/* Subtle Imperfection Paper Stamp in Background */}
      <div className="absolute top-4 right-1/3 w-32 h-6 bg-[#FFB800] opacity-40 rotate-[3deg] pointer-events-none hidden md:block border border-black/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Bold Organic Typography & Main USP */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            {/* Minimalist Micro Tag with Natural Imperfection */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-black text-[10px] font-mono-street font-bold tracking-widest uppercase neo-shadow-sm wabi-sabi-1">
              <span className="w-2 h-2 rounded-full bg-[#FF3B1D]"></span>
              DROP 01: AKHADA TO TAPRI • 260-280 GSM PURE TERRY
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-[#0A0D0C] font-black uppercase">
                BURI NAZAR WAALE, <br />
                <span className="bg-[#FFB800] px-2 py-0.5 border-2 border-black inline-block mt-1 wabi-sabi-3">
                  TERA WEIGHT DROP.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[#333] text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              A high-precision Indian activewear and comfort-wear label merging street-smart culture with protective superstition. Heavyweight <span className="text-black font-bold underline decoration-[#FF3B1D] underline-offset-4">240+ to 280 GSM oversized tees</span> engineered to outlast the heaviest deadlifts and post-workout tapri banter.
            </p>

            {/* MAIN USP: CUSTOM LAB (Compact Neo-Brutalist Banner) */}
            <div className="bg-white border-3 border-black p-4 rounded-xl neo-shadow transition-transform hover:-translate-y-0.5 wabi-sabi-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono-street font-bold bg-[#FF3B1D] text-white px-2 py-0.5 border border-black uppercase tracking-wider">
                      MAIN USP
                    </span>
                    <span className="font-heading text-sm sm:text-base text-black font-black tracking-tight">
                      CUSTOM TOTKA STUDIO
                    </span>
                  </div>
                  <p className="text-[11px] text-[#555] max-w-sm">
                    Customize your silhouette, demon crest, comic backprint & print your gym handle live.
                  </p>
                </div>

                <button
                  onClick={() => {
                    audioFX.playDhishum();
                    onOpenCustomStudio();
                  }}
                  className="shrink-0 bg-[#FFB800] hover:bg-[#FFA500] text-black border-2 border-black px-4 py-2 rounded-lg text-xs font-bold font-mono-street tracking-wider uppercase flex items-center justify-center gap-1.5 neo-shadow-sm active:translate-y-0.5"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#FF3B1D]" />
                  <span>DESIGN YOUR ARMOR</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  audioFX.playDhishum();
                  onShopClick();
                }}
                className="bg-black hover:bg-[#222] text-white border-2 border-black px-5 py-2.5 rounded-lg font-heading text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 neo-shadow active:translate-y-0.5"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFB800]" />
              </button>

              <button
                onClick={() => {
                  audioFX.playFlick();
                  onUnboxingClick();
                }}
                className="bg-white hover:bg-[#EFECE3] text-black border-2 border-black px-4 py-2.5 rounded-lg text-xs font-heading font-bold tracking-wide uppercase transition-colors"
              >
                <span>EXPLORE PACKAGING</span>
              </button>
            </div>

            {/* Minimal Metric Badges */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t-2 border-black/10 font-mono-street">
              <div>
                <span className="text-base text-[#0A0D0C] font-black block">260-280</span>
                <span className="text-[9px] text-[#666] uppercase tracking-wider">GSM Terry</span>
              </div>
              <div>
                <span className="text-base text-[#FF3B1D] font-black block">TALISMAN</span>
                <span className="text-[9px] text-[#666] uppercase tracking-wider">Demon Armor</span>
              </div>
              <div>
                <span className="text-base text-[#0A0D0C] font-black block">KHABARDAR</span>
                <span className="text-[9px] text-[#666] uppercase tracking-wider">Collar Tag</span>
              </div>
              <div>
                <span className="text-base text-[#FFB800] font-black block">AKHADA</span>
                <span className="text-[9px] text-[#666] uppercase tracking-wider">Heavy Lifts</span>
              </div>
            </div>

          </div>

          {/* Right Column: DIRECT SHIRT PHOTO + NORMAL HANGING PENDULUM */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Direct Model Photo with Clean Border & Offset Shadow */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] h-[400px] sm:h-[450px] rounded-2xl overflow-hidden border-4 border-black neo-shadow-lg flex items-center justify-center bg-white wabi-sabi-2">
              <img 
                src={current.image} 
                alt={current.name}
                className="w-full h-full object-cover object-top filter contrast-105 transition-all duration-300" 
              />

              {/* Minimal Clean Switcher Tabs at top left */}
              <div className="absolute top-3 left-3 flex gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-lg border-2 border-black z-20">
                <button
                  onClick={() => setActiveShirt(0)}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono-street transition-colors ${
                    activeShirt === 0 ? 'bg-black text-white font-bold' : 'text-black/60 hover:text-black font-medium'
                  }`}
                >
                  Charcoal
                </button>
                <button
                  onClick={() => setActiveShirt(1)}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono-street transition-colors ${
                    activeShirt === 1 ? 'bg-black text-white font-bold' : 'text-black/60 hover:text-black font-medium'
                  }`}
                >
                  Off-White
                </button>
              </div>

              {/* Bottom Label in Neo-brutalist style */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md py-2 px-3 border-2 border-black rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="font-heading font-black text-black block text-xs">{current.name}</span>
                  <span className="text-[10px] text-[#666] font-mono-street">{current.color}</span>
                </div>
                <button
                  onClick={() => {
                    audioFX.playDhishum();
                    onShopClick();
                  }}
                  className="bg-[#FFB800] hover:bg-[#FFA500] text-black border border-black px-2.5 py-1 rounded text-[10px] font-mono-street font-bold uppercase neo-shadow-sm active:translate-y-0.5"
                >
                  SHOP {current.price}
                </button>
              </div>
            </div>

            {/* NORMAL, CLEAN HANGING NIMBU-MIRCHI PENDULUM (NATURAL SWAY, NO EXTRA GIMMICKS) */}
            <div 
              onClick={handlePendulumTap}
              className={`absolute -top-4 right-2 sm:right-6 cursor-pointer select-none z-30 ${
                swayWild ? 'animate-pendulum-wild' : 'animate-pendulum'
              }`}
              title="Hanging Totka Talisman"
            >
              <img 
                src="/nimbu-mirchi.png" 
                alt="Authentic Hanging Nimbu Mirchi Talisman"
                className="h-44 sm:h-52 w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform" 
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
