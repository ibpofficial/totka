import React from 'react';
import { MapPin, Film } from 'lucide-react';
import { STREET_LORE } from '../data/products';

export default function StreetLore() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=900',
      caption: 'Rusty Iron Plates & Mud Mats',
      location: 'Shivaji Akhada, Varanasi'
    },
    {
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=900',
      caption: 'Post-Workout Tapri Debates',
      location: 'Tapri Behind The Sector 14 Gym'
    },
    {
      url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=900',
      caption: 'Drop-Shoulder Street Swagger',
      location: 'Chandni Chowk Alleys, Delhi'
    }
  ];

  return (
    <section id="street-lore" className="py-20 bg-[#F7F4EE] relative border-b-3 border-[#0A0D0C] overflow-hidden bg-raw-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-black text-[10px] font-mono-street font-bold uppercase tracking-widest neo-shadow-sm wabi-sabi-1">
              <Film className="w-3.5 h-3.5 text-[#FF3B1D]" />
              STREET & AKHADA LIFESTYLE
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-black tracking-tight uppercase">
              NO SANITISED STUDIOS. <br />
              <span className="bg-[#FFB800] px-2 border-2 border-black inline-block mt-1 rotate-[-1deg]">
                ONLY RUSTY IRON & ADRAK CHAI.
              </span>
            </h2>
            <p className="text-[#555] text-sm sm:text-base">
              Shot on 35mm film in real Indian akhadas, tapris, and bustling market streets. Genuine confidence doesn't need air conditioning.
            </p>
          </div>

          <div className="hidden lg:block bg-white p-4 rounded-xl border-3 border-black max-w-xs neo-shadow-sm wabi-sabi-2">
            <p className="font-mono-street text-xs text-black font-bold">
              "DUMBBELLS GANDHE HAIN, LEKIN IRADA SAFF HAI. TOTKA PEHEN KE AAO, NAZAR BAHAR CHHOD KE AAO."
            </p>
          </div>
        </div>

        {/* 3 Candid Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {images.map((item, idx) => (
            <div 
              key={idx}
              className={`bg-white p-3 rounded-xl border-3 border-black neo-shadow ${
                idx === 0 ? 'wabi-sabi-1' : idx === 1 ? 'wabi-sabi-2' : 'wabi-sabi-3'
              }`}
            >
              <div className="relative h-72 rounded-lg overflow-hidden bg-[#0A0D0C] border-2 border-black">
                <img 
                  src={item.url} 
                  alt={item.caption}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300" 
                />
                
                {/* Date Stamp */}
                <div className="absolute top-2.5 left-2.5 bg-black font-mono-street text-[9px] text-[#FFB800] px-2 py-0.5 rounded border border-white/20">
                  REC '26 35MM
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md p-2 rounded border border-black flex items-center justify-between text-black">
                  <span className="font-mono-street text-xs font-bold truncate">
                    {item.caption}
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-[#FF3B1D] shrink-0" />
                </div>
              </div>

              <div className="pt-2 px-1 text-[11px] text-[#666] font-mono-street flex items-center justify-between font-medium">
                <span>{item.location}</span>
                <span className="text-black font-bold">100% CANDID</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Street Lore Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STREET_LORE.map((lore, i) => (
            <div 
              key={i}
              className="bg-white p-5 rounded-xl border-3 border-black space-y-2.5 flex flex-col justify-between neo-shadow-sm"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#FF3B1D] font-mono-street mb-1 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lore.location}</span>
                </div>
                <h4 className="font-heading text-lg font-black text-black uppercase">
                  {lore.title}
                </h4>
                <p className="text-xs text-[#444] italic mt-1.5 font-medium leading-relaxed">
                  "{lore.quote}"
                </p>
              </div>

              <div className="pt-2 border-t-2 border-black/10 font-mono-street text-[10px] font-bold text-black/60">
                VIBE: {lore.vibe.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
