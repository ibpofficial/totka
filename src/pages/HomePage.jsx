import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import TheTotkaLook from '../components/TheTotkaLook';
import TotkaBoxUnboxing from '../components/TotkaBoxUnboxing';
import StreetLore from '../components/StreetLore';
import ContactSection from '../components/ContactSection';
import LiquidGlass from '../components/LiquidGlass';
import { PRODUCTS } from '../data/products';
import { StoreService } from '../services/store';
import { Flame, Star, ShieldCheck, Wand2, ArrowRight, MessageSquarePlus, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

export default function HomePage({ 
  onAddToCart, 
  onOpenProductDetail, 
  onAddBoxToCart, 
  onNavigate 
}) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Review Form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newPR, setNewPR] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newStars, setNewStars] = useState(5);

  useEffect(() => {
    setReviews(StoreService.getReviews());
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newQuote.trim()) return;

    audioFX.playDhishum();
    const created = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      pr: newPR.trim() || 'Lifter PR',
      city: newCity.trim() || 'New Delhi',
      stars: newStars,
      verified: true,
      tag: 'VERIFIED PEHALWAN',
      productName: 'Drop 01 Activewear',
      quote: newQuote.trim(),
      date: 'Just now',
    };

    const updated = StoreService.addReview(created);
    setReviews(updated);
    setReviewSubmitted(true);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFB800', '#FF3B1D', '#0E100F'],
    });

    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
      setNewAuthor('');
      setNewPR('');
      setNewCity('');
      setNewQuote('');
    }, 2000);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'TEES') return p.category.includes('Tee') || p.category.includes('Pump');
    if (selectedFilter === 'SHORTS') return p.category.includes('Shorts');
    if (selectedFilter === 'BOX') return p.category.includes('Pack') || p.category.includes('Performance');
    return true;
  });

  return (
    <div className="space-y-0">
      
      {/* 1. Refined Minimal Hero Section with Liquid Glass Accents */}
      <Hero 
        onShopClick={() => {
          const el = document.getElementById('drops');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigate={onNavigate}
      />

      {/* 2. Drop 01: Akhada to Tapri Edition */}
      <section id="drops" className="py-16 bg-white border-b border-black/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-1 rounded-full border border-black/10 text-neutral-900 text-[10px] font-mono-street uppercase tracking-widest font-bold shadow-xs">
                <Flame className="w-3.5 h-3.5 text-[#E03115]" />
                <span>OFFICIAL DROP 01 // AUTUMN 2026</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
                DROP 01: AKHADA TO TAPRI
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm max-w-xl font-mono-street">
                Heavyweight 240+ to 280 GSM silhouettes engineered for durability, drop-shoulder structure, and street comfort.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100/70 rounded-2xl border border-black/5">
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-street tracking-wider transition-all cursor-pointer ${
                    selectedFilter === tab.value
                      ? 'bg-[#0E100F] text-[#FAF8F5] font-bold shadow-xs'
                      : 'text-neutral-600 hover:text-black hover:bg-white/60'
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

          {/* Bespoke Atelier Liquid Glass Banner */}
          <LiquidGlass
            variant="light"
            className="mt-14 p-6 sm:p-8 border-white/80 shadow-[0_14px_44px_-10px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-1.5 text-center md:text-left">
              <span className="bg-[#E03115] text-white text-[9px] font-mono-street px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider inline-block">
                BESPOKE ATELIER // MAIN USP
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                WANT A CUSTOM CHEST BADGE OR EMBROIDERED LIFTER NAME?
              </h3>
              <p className="text-xs text-neutral-600 font-mono-street max-w-xl">
                Open our dedicated full-screen Bespoke Atelier to select your GSM density, talisman emblem, comic backprint, and custom nickname with live dynamic pricing.
              </p>
            </div>

            <button
              onClick={() => {
                audioFX.playDhishum();
                onNavigate('custom');
              }}
              className="shrink-0 bg-[#0E100F] hover:bg-black text-[#FFB800] text-xs font-mono-street font-bold px-6 py-3 rounded-xl uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-[#FFB800]" />
              <span>OPEN BESPOKE ATELIER</span>
            </button>
          </LiquidGlass>

        </div>
      </section>

      {/* 3. The Totka Look: Anatomical Trims & Fabric Exploded View */}
      <TheTotkaLook />

      {/* 4. The Totka Box: Premium Packaging & Unboxing */}
      <TotkaBoxUnboxing onAddBoxToCart={onAddBoxToCart} />

      {/* 5. Authentic Indian Akhada & Tapri Street Lore */}
      <StreetLore />

      {/* 6. Real Verified Reviews & Interactive Review Logger */}
      <section className="py-16 bg-white border-b border-black/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono-street uppercase tracking-[0.2em] text-[#E03115] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMUNITY LIFTER DOSSIERS</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
                TESTED UNDER MAXIMUM BURI NAZAR
              </h3>
              <p className="text-xs text-neutral-600 font-mono-street">
                Real gym stories and heavy PR logs from verified lifters wearing 260+ GSM Totka armor:
              </p>
            </div>

            <button
              onClick={() => {
                audioFX.playFlick();
                setShowReviewForm(!showReviewForm);
              }}
              className="bg-[#0E100F] hover:bg-black text-[#FFB800] px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{showReviewForm ? 'CLOSE FORM' : '+ LOG YOUR PR REVIEW'}</span>
            </button>
          </div>

          {/* Interactive Review Submission Form */}
          {showReviewForm && (
            <LiquidGlass
              variant="light"
              className="p-6 rounded-2xl mb-8 border-white/80 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)] animate-in fade-in duration-300"
            >
              {reviewSubmitted ? (
                <div className="p-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading text-base font-black text-black uppercase">
                    PR REVIEW SEALED & VERIFIED!
                  </h4>
                  <p className="text-xs text-neutral-600 font-mono-street">
                    Your feedback has been logged into the community dossier. Keep lifting heavy.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <h4 className="font-heading text-sm font-black text-black uppercase tracking-wider">
                      SHARE YOUR LIFTER LOG
                    </h4>
                    <span className="text-[10px] font-mono-street text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded font-bold">
                      VERIFIED BADGE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-street font-bold text-black uppercase">Your Name *</label>
                      <input
                        type="text"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full bg-white/90 border border-black/15 rounded-xl px-3 py-2 text-xs font-mono-street text-black outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-street font-bold text-black uppercase">Current PR *</label>
                      <input
                        type="text"
                        value={newPR}
                        onChange={(e) => setNewPR(e.target.value)}
                        placeholder="e.g. Deadlift 220 kg"
                        className="w-full bg-white/90 border border-black/15 rounded-xl px-3 py-2 text-xs font-mono-street text-black outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-street font-bold text-black uppercase">City</label>
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="e.g. Delhi / Bengaluru"
                        className="w-full bg-white/90 border border-black/15 rounded-xl px-3 py-2 text-xs font-mono-street text-black outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono-street font-bold text-black uppercase">Your Experience & Feedback *</label>
                    <textarea
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      rows={3}
                      placeholder="How did the 260 GSM fabric hold up under your heaviest lifts or post-workout banter?"
                      className="w-full bg-white/90 border border-black/15 rounded-xl p-3 text-xs font-mono-street text-black outline-none focus:border-black resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewStars(star)}
                          className="p-1 text-[#FFB800] hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${star <= newStars ? 'fill-current' : 'text-neutral-300'}`} />
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="bg-[#0E100F] hover:bg-black text-[#FFB800] px-5 py-2.5 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                    >
                      SUBMIT TO DOSSIER
                    </button>
                  </div>
                </form>
              )}
            </LiquidGlass>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((item, idx) => (
              <div 
                key={item.id || idx}
                className="bg-[#FAF8F5] p-5 rounded-2xl border border-black/15 space-y-3.5 flex flex-col justify-between shadow-xs transition-all hover:border-black/30"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#FFB800] gap-0.5">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono-street text-white bg-black px-2 py-0.5 rounded-full font-bold">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-800 leading-relaxed italic font-medium">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <span className="font-heading text-xs font-black text-black block">
                      {item.author} ({item.pr})
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono-street">{item.city} • {item.date}</span>
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
