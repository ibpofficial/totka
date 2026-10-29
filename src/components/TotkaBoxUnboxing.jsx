import React, { useState } from 'react';
import { ShieldAlert, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

export default function TotkaBoxUnboxing({ onAddBoxToCart }) {
  const [activeItem, setActiveItem] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  const boxContents = [
    {
      id: 'keychain',
      title: 'Real Lemon-Chilli Silicone Keychain',
      tagline: 'Portable 24/7 Nazar Deflection',
      description: 'Durable, waterproof 3D silicone lemon-chilli bunch with solid brass ring. Clip it to your gym duffel, bike keys, or lifting belt to scare away bad vibes and missed lifts.',
      icon: '🍋🌶️'
    },
    {
      id: 'stickers',
      title: 'Gym Caricature Sticker Bomb Pack',
      tagline: '6x Waterproof Comic Vinyl Stickers',
      description: 'Features hilarious gym personalities: "The Mirror Posing Pandit", "The Pre-Workout Overdoser", "Buri Nazar Wala Trainer", and "The Adrak Chai Enthusiast". Sticks on shakers and squat racks.',
      icon: '💥🎨'
    },
    {
      id: 'postcard',
      title: 'The "Nazar Utaar Ke Pehanna" Postcard',
      tagline: 'Gold Foil Certified Good Luck',
      description: 'A heavy 350 GSM craft postcard reading: "Your luck just got 10x better. Nazar utaar ke pehanna. In case of PR failure, blame buri nazar and drink tapri chai."',
      icon: '✉️✨'
    },
    {
      id: 'tape',
      title: 'Hazard "Khabardar" Packaging Tape',
      tagline: 'Buri-Nazar Proof Craft Cardboard Box',
      description: 'Heavy reinforced corrugated craft cardboard sealed with warning caution patterns. Unboxing this at your doorstep immediately alerts the neighborhood that a heavyweight lifter has arrived.',
      icon: '📦⚠️'
    }
  ];

  const handleOpenBox = () => {
    audioFX.playNazarWard();
    setIsOpened(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB800', '#FF3B1D', '#0A0D0C']
    });
  };

  return (
    <section id="unboxing" className="py-20 bg-[#FAF8F5] relative border-b-3 border-[#0A0D0C] overflow-hidden bg-raw-canvas">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-14">
          <div className="inline-flex items-center gap-2 bg-[#FF3B1D] text-white border-2 border-black px-3 py-0.5 rounded-full text-xs font-mono-street font-bold uppercase tracking-wider neo-shadow-sm wabi-sabi-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            UNBOXING AT YOUR OWN RISK
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-black tracking-tight uppercase">
            THE <span className="bg-[#FFB800] px-2 border-2 border-black inline-block rotate-[-1deg]">"TOTKA" BOX</span> EXPERIENCE
          </h2>
          <p className="text-[#555] text-sm sm:text-base">
            No cheap plastic polybags. Every order is encased in traditional craft packaging wrapped in hazard warning tape to ward off envious eyes from transit to doorstep.
          </p>
        </div>

        {/* Unboxing Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: The Craft Box Visual Experience */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative w-full max-w-md bg-[#DDB892] rounded-2xl p-6 sm:p-8 border-4 border-black neo-shadow-lg text-black wabi-sabi-1">
              
              {/* Hazard Caution Tape Stamped Across Box */}
              <div className="bg-hazard-stripes py-2.5 px-4 -mx-6 sm:-mx-8 border-y-3 border-black text-black text-sm tracking-wider uppercase flex items-center justify-between font-black font-mono-street shadow-md">
                <span>⚠️ HOSHIYAR, KHABARDAR</span>
                <span className="bg-black text-[#FFB800] px-2 py-0.5 rounded text-[10px] font-bold">BURI NAZAR PROOF</span>
                <span>DO NOT TAMPER ⚠️</span>
              </div>

              {/* Box Center Stamp */}
              <div className="my-8 text-center space-y-1.5">
                <div className="w-18 h-18 mx-auto rounded-full bg-white border-3 border-black flex items-center justify-center shadow-md">
                  <span className="font-heading text-2xl font-black text-black">TOTKA</span>
                </div>
                <h3 className="font-heading text-2xl text-black tracking-tight font-black uppercase">
                  NAZAR-DEFLECTING CARGO
                </h3>
                <p className="text-xs text-[#442b15] font-mono-street max-w-xs mx-auto font-medium">
                  Caution: Contents may cause sudden deadlift PRs and uncontrollable street swagger.
                </p>
              </div>

              {/* Bottom Stamp */}
              <div className="pt-3 border-t-2 border-black/30 flex items-center justify-between font-mono-street text-[10px] font-bold text-black">
                <span>BATCH: AKHADA-2026</span>
                <span>SEAL NO: 786-TOTKA</span>
              </div>

              {/* Unbox Trigger Button */}
              <div className="mt-5 text-center">
                <button
                  onClick={handleOpenBox}
                  className="w-full bg-black hover:bg-[#222] text-[#FFB800] font-heading font-black text-sm py-3 rounded-lg border-2 border-black neo-shadow flex items-center justify-center gap-2 uppercase tracking-wider active:translate-y-0.5"
                >
                  <Gift className="w-4 h-4 text-[#FF3B1D]" />
                  <span>{isOpened ? '✨ TOTKA UNBOXED (BURST ACTIVE)' : 'TEAR HAZARD TAPE & EXPLORE'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right: Quirky Inserts Carousel */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono-street uppercase tracking-widest text-[#FF3B1D] font-bold block">
                FREE QUIRKY INSERTS INSIDE
              </span>
              <h3 className="font-heading text-2xl font-black text-black tracking-tight uppercase">
                WHAT ROLLS OUT OF THE TOTKA BOX?
              </h3>
            </div>

            {/* List of 4 Inserts */}
            <div className="space-y-2.5">
              {boxContents.map((item, idx) => {
                const isSelected = activeItem === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      audioFX.playFlick();
                      setActiveItem(idx);
                    }}
                    className={`cursor-pointer p-3.5 rounded-xl border-3 transition-all ${
                      isSelected
                        ? 'bg-[#FFB800] border-black neo-shadow text-black'
                        : 'bg-white border-black/20 hover:border-black text-[#555]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="text-2xl shrink-0 p-1.5 rounded-lg bg-[#FAF8F5] border-2 border-black">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading text-base font-black text-black uppercase">
                            {item.title}
                          </h4>
                          <span className="font-mono-street text-[10px] font-bold text-black/70">
                            {item.tagline}
                          </span>
                        </div>
                        <p className="text-xs text-[#333] mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Complete Box Purchase CTA */}
            <div className="pt-2 flex items-center justify-between bg-white p-3.5 rounded-xl border-3 border-black neo-shadow-sm">
              <div>
                <span className="font-heading text-lg font-black text-black block">
                  THE TOTKA STARTER PACK: ₹2,499
                </span>
                <span className="text-[11px] text-[#666] font-mono-street">
                  Includes 1x Heavy Tee + 1x Shorts + All 4 Inserts
                </span>
              </div>
              <button
                onClick={() => {
                  audioFX.playDhishum();
                  onAddBoxToCart();
                }}
                className="bg-black hover:bg-[#222] text-white font-mono-street px-4 py-2 rounded text-xs font-bold uppercase tracking-wider active:translate-y-0.5"
              >
                CLAIM THE BOX
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
