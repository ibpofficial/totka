import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import TheTotkaLook from '../components/TheTotkaLook';
import TotkaBoxUnboxing from '../components/TotkaBoxUnboxing';
import StreetLore from '../components/StreetLore';
import ContactSection from '../components/ContactSection';
import { PRODUCTS } from '../data/products';
import { Flame, Star, ShieldCheck, Wand2, ArrowRight } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function HomePage({ 
  onAddToCart, 
  onOpenProductDetail, 
  onAddBoxToCart, 
  onNavigate 
}) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'TEES') return p.category.includes('Tee') || p.category.includes('Pump');
    if (selectedFilter === 'SHORTS') return p.category.includes('Shorts');
    if (selectedFilter === 'BOX') return p.category.includes('Pack') || p.category.includes('Performance');
    return true;
  });

  return (
    <div className="space-y-0">
      
      {/* 1. Refined Minimal Hero Section */}
      <Hero 
        onShopClick={() => {
          const el = document.getElementById('drops');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigate={onNavigate}
      />

      {/* 2. Drop 01: Akhada to Tapri Edition */}
      <section id="drops" className="py-16 bg-white border-b border-black/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-[#FAF8F5] px-3 py-1 rounded-full border border-black/15 text-black text-[10px] font-mono-street uppercase tracking-widest font-bold">
                <Flame className="w-3.5 h-3.5 text-[#E03115]" />
                <span>COMMISSION ACTIVE DROP</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
                DROP 01: AKHADA TO TAPRI
              </h2>
              <p className="text-[#666] text-xs sm:text-sm max-w-xl font-mono-street">
                Heavyweight 240+ to 280 GSM silhouettes engineered for durability, drop-shoulder structure, and street comfort.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'ALL GEAR', value: 'ALL' },
                { label: 'HEAVY TEES', value: 'TEES' },
                { label: 'SLOUCHY SHORTS', value: 'SHORTS' },
                { label: 'BOX & TANKS', value: 'BOX' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    audioFX.playFlick();
                    setSelectedFilter(tab.value);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-street tracking-wider border transition-all ${
                    selectedFilter === tab.value
                      ? 'bg-[#121212] text-[#FFB800] border-black font-bold shadow-sm'
                      : 'bg-white text-black border-black/20 hover:border-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenDetail={onOpenProductDetail}
              />
            ))}
          </div>

          {/* In-Between Bespoke Atelier Banner */}
          <div className="mt-14 bg-[#FAF8F5] border border-black/15 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="bg-[#E03115] text-white text-[9px] font-mono-street px-2.5 py-0.5 rounded uppercase font-bold tracking-wider inline-block">
                COMMISSION BESPOKE ARMOR
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-black uppercase">
                WANT A CUSTOM CHEST BADGE OR EMBROIDERED LIFTER NAME?
              </h3>
              <p className="text-xs text-[#666] font-mono-street max-w-xl">
                Open our dedicated full-screen Bespoke Atelier to select your GSM grade, talisman emblem, comic backprint, and custom nickname with dynamic live pricing.
              </p>
            </div>

            <button
              onClick={() => {
                audioFX.playDhishum();
                onNavigate('custom');
              }}
              className="shrink-0 bg-[#121212] hover:bg-black text-[#FFB800] text-xs font-mono-street font-bold px-6 py-3 rounded-xl uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all active:translate-y-0.5"
            >
              <Wand2 className="w-4 h-4 text-[#FFB800]" />
              <span>OPEN BESPOKE ATELIER</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. The Totka Look: Anatomical Trims & Fabric Exploded View */}
      <TheTotkaLook />

      {/* 4. The Totka Box: Premium Packaging & Unboxing */}
      <TotkaBoxUnboxing onAddBoxToCart={onAddBoxToCart} />

      {/* 5. Authentic Indian Akhada & Tapri Street Lore */}
      <StreetLore />

      {/* 6. Verified Reviews */}
      <section className="py-16 bg-white border-b border-black/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-[10px] font-mono-street uppercase tracking-[0.2em] text-[#E03115] font-bold">
              ★ 100% VERIFIED NAZAR SURVIVORS ★
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
              TESTED UNDER MAXIMUM BURI NAZAR
            </h3>
            <p className="text-xs text-[#666] font-mono-street">
              What happens when you swap thin generic polyester for 260 GSM Indian armor:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: "Wore the 'Buri Nazar Waale, Tera Weight Drop' pump cover to leg day. The trainer who always tells me 'form galat hai' dropped his own shaker bottle. 10/10 Totka works.",
                author: "Karan S. (Deadlift 210 kg)",
                city: "Varanasi",
                stars: 5,
                tag: "PUMP COVER SURVIVOR"
              },
              {
                quote: "The 260 GSM fabric is ridiculously thick. It holds structure like armor and doesn’t get sticky after 5 sets of bench. Plus the custom collar warning had my entire gym gang cracking up.",
                author: "Rohan & Aman",
                city: "New Delhi",
                stars: 5,
                tag: "TAPRI REGULARS"
              },
              {
                quote: "The craft cardboard unboxing is art. The fake lemon-chilli keychain is now attached to my motorcycle keys. Zero accidents, zero missed PRs. Bakchodi nahi rukni chahiye!",
                author: "Vikram R.",
                city: "Bengaluru",
                stars: 5,
                tag: "TOTKA BOX OWNER"
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF8F5] p-5 rounded-2xl border border-black/15 space-y-3 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#FFB800] gap-0.5">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono-street text-white bg-black px-2 py-0.5 rounded font-bold">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[#333] leading-relaxed italic font-medium">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <span className="font-heading text-xs font-black text-black block">
                      {item.author}
                    </span>
                    <span className="text-[10px] text-[#777] font-mono-street">{item.city}</span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-black" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Dedicated Contact Section with User's Neo-Brutalist Uiverse Card */}
      <ContactSection />

    </div>
  );
}

