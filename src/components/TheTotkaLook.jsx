import React, { useState } from 'react';
import { Eye, Tag, CheckCircle2, Scissors, Shirt, Sparkles } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function TheTotkaLook() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: '260-280 GSM Mineral Terry Cut',
      subtitle: 'The Heavyweight Akhada Fit',
      icon: Shirt,
      description: 'Engineered for pump covers that don’t cling, sag, or lose their structure after brutal deadlift days. Made with thick, premium 100% combed cotton French terry that breathes while holding that boxy, relaxed street silhouette.',
      highlights: [
        'Drop-shoulder seam engineered for enhanced deltoid width',
        '240 to 280 GSM heavyweight density — zero transparency',
        'Reinforced thick neck rib that never turns into "bacon collar"',
        'Slouchy elbow-length sleeves designed for effortless swagger'
      ],
      quote: '“It’s not just an oversized tee. It’s personal space protection in a crowded gym.”'
    },
    {
      title: 'Demon Rakshas Talisman Crest',
      subtitle: 'Superstition Redesigned as Streetwear',
      icon: Eye,
      description: 'The ancient Indian talisman reimagined as an aggressive, stylish athletic crest. Featuring an intricate demon face and dangling lemon-chilli chain that glares down ego lifters and bad advice.',
      highlights: [
        'High-density discharge screenprint that gets softer with wash',
        'Traditional protective iconography merged with modern streetwear',
        'Paired with lemon-chilli talisman accents on the hem',
        'Self-certified 99.9% evil eye reflection rate'
      ],
      quote: '“Buri nazar can ruin your PR. The Totka crest makes sure the barbell stays heavy and the vibes stay pure.”'
    },
    {
      title: 'Khabardar Inner Collar Tags',
      subtitle: 'Woven Cautionary Damask Labels',
      icon: Tag,
      description: 'We abolished boring corporate wash tags. Every piece features our signature woven warning tape stitched straight into the inner collar, reminding you of the sacred akhada code.',
      highlights: [
        'Woven label: "KHABARDAR: Machine wash cold. Nazar utaar ke pehanna."',
        'Zero scratchy synthetic edges — 100% soft damask thread',
        'Includes witty care guidelines: "No Excuses. Bakchodi Nahi Rukni Chahiye."',
        'Contrast Haldi-yellow bar-tack security stitch'
      ],
      quote: '“Wash cold, hang dry, and don’t let anyone who skips leg day borrow it.”'
    },
    {
      title: 'Street Lore & Comic Detailing',
      subtitle: 'Retro Sarcasm & Bold Street Typography',
      icon: Sparkles,
      description: 'Bold, vintage Indian truck-art inspired warnings fused with American golden-era comic book illustrations. Chunky lettering, high-impact caution stripes, and witty desi gym banter.',
      highlights: [
        'Artwork: "Buri Nazar Waale, Tera Weight Drop" typography',
        'Breathable water-based discharge screenprints that won\'t crack',
        'Pre-shrunk terry weave tested in dusty iron gyms',
        'Guaranteed conversation starter at the post-workout tapri'
      ],
      quote: '“Why wear a boring plain tee when you can educate the entire squat rack behind you?”'
    }
  ];

  const current = pillars[activeTab];

  return (
    <section id="totka-look" className="py-16 bg-[#F7F4EE] relative border-b-3 border-[#0A0D0C] overflow-hidden bg-raw-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-black text-[10px] font-mono-street uppercase tracking-widest font-bold neo-shadow-sm wabi-sabi-1">
              <Scissors className="w-3 h-3 text-[#FF3B1D]" />
              ANATOMY OF THE TOTKA FIT
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              HEAVYWEIGHT COMFORT. <span className="bg-[#FFB800] px-2 border-2 border-black inline-block rotate-[-1deg]">ZERO DHOKHA.</span>
            </h2>
            <p className="text-[#444] text-sm">
              We tore up the playbook of generic, flimsy gym polyester. Here is how we engineered the heaviest, wittiest comfort-wear in India.
            </p>
          </div>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  audioFX.playFlick();
                  setActiveTab(idx);
                }}
                className={`p-3.5 rounded-xl border-3 text-left transition-all ${
                  isActive
                    ? 'bg-[#FFB800] border-black neo-shadow text-black'
                    : 'bg-white border-black/30 hover:border-black text-[#555]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className="w-4 h-4 text-black" />
                  <span className="font-mono-street text-[10px] font-bold text-black/50">0{idx + 1}</span>
                </div>
                <h4 className={`font-heading text-sm font-black tracking-tight leading-snug ${isActive ? 'text-black' : 'text-[#333]'}`}>
                  {pillar.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Feature Stage */}
        <div className="bg-white rounded-2xl border-4 border-black p-5 sm:p-8 neo-shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Graphic Showcase */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-5 rounded-xl border-3 border-black relative overflow-hidden flex flex-col justify-between min-h-[300px] neo-shadow-sm">
              
              <div className="flex items-center justify-between relative z-10">
                <span className="bg-black text-[#FFB800] text-[10px] font-mono-street px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  {current.subtitle}
                </span>
                <span className="font-mono-street text-[10px] font-bold text-black/40">SPEC_0{activeTab + 1}</span>
              </div>

              {/* Graphic Icon */}
              <div className="my-auto py-6 text-center relative z-10">
                <div className="inline-flex p-4 rounded-full bg-[#FFB800] border-2 border-black shadow-md mb-3">
                  <current.icon className="w-10 h-10 text-black" />
                </div>
                <div className="font-heading text-xl font-black text-black tracking-tight">
                  {current.title}
                </div>
                <div className="text-[10px] font-mono-street text-[#FF3B1D] mt-1 font-bold">
                  100% AUTHENTIC TOTKA DETAILING
                </div>
              </div>

              {/* Quote */}
              <div className="relative z-10 bg-white p-2.5 rounded-lg border-2 border-black">
                <p className="text-xs text-black font-mono-street italic font-medium">
                  {current.quote}
                </p>
              </div>
            </div>

            {/* Description & Technical Points */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-[10px] font-mono-street uppercase tracking-widest text-[#FF3B1D] font-bold">
                  THE TOTKA CRAFT
                </span>
                <h3 className="font-heading text-2xl font-black text-black tracking-tight mt-1">
                  {current.title}
                </h3>
                <p className="text-[#444] text-sm leading-relaxed mt-2">
                  {current.description}
                </p>
              </div>

              {/* Highlight Bullets */}
              <div className="space-y-2 pt-1">
                {current.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-[#FAF8F5] p-2.5 rounded-lg border-2 border-black/10">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-[#222]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Brand Tagline */}
              <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-mono-street text-[#666]">
                <span>TOTKA ACTIVEWEAR &copy;</span>
                <span className="text-black font-bold">BUILT FOR HEAVY LIFTS & BANTER</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
