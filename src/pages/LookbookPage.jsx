import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Layers } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function LookbookPage({ onNavigate, onOpenProductDetail }) {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#121212] py-8 sm:py-14 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono-street text-[#666] uppercase tracking-[0.25em]">
            <span>EDITORIAL 01</span>
            <span>•</span>
            <span className="text-[#E03115] font-bold">AKHADA TO TAPRI</span>
            <span>•</span>
            <span>AUTUMN / WINTER 2026</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-black text-black tracking-tight uppercase">
            BURI NAZAR WAALE, <br />TERA WEIGHT DROP.
          </h1>
          <p className="text-xs sm:text-sm text-[#555] font-mono-street leading-relaxed">
            A visual dissertation on subverting fear. Where Indian street superstitions are transmuted into heavyweight 260 GSM physical and psychological armor.
          </p>
        </div>

        {/* Feature Editorial Spread 01 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-black/15 p-6 sm:p-10 shadow-sm">
          <div className="lg:col-span-7 overflow-hidden rounded-2xl bg-[#EFECE3] border border-black/10">
            <img 
              src="/totka-tshirt-main.png" 
              alt="Buri Nazar Waale Pump Cover" 
              className="w-full h-[450px] sm:h-[550px] object-cover object-top hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="bg-[#121212] text-white text-[9px] font-mono-street uppercase tracking-wider px-2.5 py-0.5 rounded font-bold">
              PLATE 01 // MINERAL WASHED CHARCOAL
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              THE DEMON CREST PUMP COVER
            </h2>
            <p className="text-xs text-[#555] font-mono-street leading-relaxed">
              Knitted from 260 GSM combed cotton loopback French terry. Soaked in a proprietary mineral enzyme bath to achieve natural vintage patina without fabric breakdown. Engineered with an aggressive drop-shoulder that hugs your traps and flows over the lats.
            </p>

            <div className="pt-2 border-t border-black/10 space-y-1.5 text-xs font-mono-street">
              <div className="flex justify-between">
                <span className="text-[#777]">Fabric Weight:</span>
                <span className="font-bold text-black">260 GSM Pure Terry</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777]">Cut & Drape:</span>
                <span className="font-bold text-black">Oversized Box Cut</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777]">Talisman Lore:</span>
                <span className="font-bold text-[#E03115]">100% Nazar-Immune</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  audioFX.playDhishum();
                  onNavigate('home');
                }}
                className="bg-[#121212] hover:bg-black text-[#FFB800] px-6 py-2.5 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              >
                <span>COMMISSION THIS PIECE (₹1,499)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Editorial Spread 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-black/15 p-6 sm:p-10 shadow-sm">
          <div className="lg:col-span-5 space-y-4 text-left order-2 lg:order-1">
            <span className="bg-[#121212] text-white text-[9px] font-mono-street uppercase tracking-wider px-2.5 py-0.5 rounded font-bold">
              PLATE 02 // VINTAGE OFF-WHITE
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              THE NIMBU TOTKA RITUAL TEE
            </h2>
            <p className="text-xs text-[#555] font-mono-street leading-relaxed">
              A high-density 280 GSM pure combed cotton tee featuring photorealistic needle-pierced ritual lemons and chili garland. High-resolution screenprint cured with water-based inking that breathes during 500-lb deadlifts.
            </p>

            <div className="pt-2 border-t border-black/10 space-y-1.5 text-xs font-mono-street">
              <div className="flex justify-between">
                <span className="text-[#777]">Fabric Weight:</span>
                <span className="font-bold text-black">280 GSM Dense Combed Terry</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777]">Collar Rib:</span>
                <span className="font-bold text-black">1.25" Heavy Spandex Rib (Zero Sag)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777]">Finishing:</span>
                <span className="font-bold text-[#E03115]">Pre-Shrunk Cold Washed</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  audioFX.playDhishum();
                  onNavigate('home');
                }}
                className="bg-[#121212] hover:bg-black text-[#FFB800] px-6 py-2.5 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              >
                <span>COMMISSION THIS PIECE (₹1,599)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-2xl bg-[#EFECE3] border border-black/10 order-1 lg:order-2">
            <img 
              src="/totka-tshirt-white.png" 
              alt="Nimbu Totka Ritual Tee" 
              className="w-full h-[450px] sm:h-[550px] object-cover object-top hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </div>

        {/* Macro Detail Grid */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="font-heading text-xl sm:text-2xl font-black text-black uppercase">
              ANATOMICAL MACRO TRIMS
            </h3>
            <p className="text-xs text-[#666] font-mono-street">
              Every detail is engineered to outlast chalk dust, barbells, and washer cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-black/15 space-y-3">
              <img 
                src="/totka-tshirt-collar.png" 
                alt="Collar Rib Detail" 
                className="w-full h-48 object-cover rounded-xl bg-[#FAF8F5] border border-black/10"
              />
              <div>
                <h4 className="font-heading text-sm font-bold text-black uppercase">Reinforced 1.25" Collar Rib</h4>
                <p className="text-xs text-[#555] font-mono-street mt-0.5">
                  Internal cotton herringbone tape prevents collar stretching even when violently peeled off after max PRs.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/15 space-y-3">
              <img 
                src="/totka-tshirt-graphic.png" 
                alt="Graphic Inking Detail" 
                className="w-full h-48 object-cover rounded-xl bg-[#FAF8F5] border border-black/10"
              />
              <div>
                <h4 className="font-heading text-sm font-bold text-black uppercase">High-Definition Plastisol Inking</h4>
                <p className="text-xs text-[#555] font-mono-street mt-0.5">
                  Micro-screened multi-layer print that moves with the fabric without cracking under bar friction.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/15 space-y-3">
              <img 
                src="/totka-white-collar.png" 
                alt="Talisman Tag Detail" 
                className="w-full h-48 object-cover rounded-xl bg-[#FAF8F5] border border-black/10"
              />
              <div>
                <h4 className="font-heading text-sm font-bold text-black uppercase">Internal Collar Talisman Warning</h4>
                <p className="text-xs text-[#555] font-mono-street mt-0.5">
                  Sarcastic laundry instructions and buri nazar warding runes stitched inside the neck tag.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Custom Studio */}
        <div className="bg-[#121212] text-white p-8 sm:p-12 rounded-3xl border border-black text-center space-y-4">
          <span className="text-xs font-mono-street text-[#FFB800] uppercase tracking-widest font-bold block">
            UNLEASH YOUR CREATIVE INSTINCTS
          </span>
          <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight">
            LOOKBOOK PIECES ARE JUST THE BEGINNING.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-mono-street max-w-xl mx-auto">
            Step into the Bespoke Atelier to customize your base colorway, GSM density, talisman emblem, and custom lifter name.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                audioFX.playDhishum();
                onNavigate('custom');
              }}
              className="bg-[#FFB800] hover:bg-[#FFA500] text-black px-7 py-3 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider shadow-lg transition-all"
            >
              Enter Bespoke Atelier
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

