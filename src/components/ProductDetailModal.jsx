import React, { useState } from 'react';
import { X, ShoppingBag, Check, Ruler, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.gallery ? product.gallery[0] : product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    audioFX.playDhishum();
    setAdded(true);

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#FFB800', '#FF3B1D', '#0E100F']
    });

    onAddToCart({
      ...product,
      selectedSize
    });

    setTimeout(() => {
      setAdded(false);
    }, 1300);
  };

  const measurements = product.measurements?.[selectedSize] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-in fade-in overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-3xl liquid-glass-card bg-[#F8F7F4]/95 rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto no-scrollbar border-white/80">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-900 border border-black/10 transition-colors shadow-2xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#EFECE3] border border-black/10 flex items-center justify-center shadow-xs">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover object-top"
              />

              <div className="absolute top-3 left-3 bg-[#0E100F] text-[#FFB800] px-3 py-1 rounded-full text-[9px] font-mono-street font-bold uppercase tracking-wider">
                {product.gsm} GSM • {product.fit}
              </div>

              <div className="absolute bottom-3 left-3 right-3 liquid-glass-pill py-2 px-3 rounded-2xl text-center shadow-2xs">
                <span className="text-[10px] font-mono-street text-neutral-900 font-bold">
                  ★ {product.nazarShieldRating}
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2">
                {product.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      audioFX.playFlick();
                      setActiveImage(imgUrl);
                    }}
                    className={`flex-1 aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      activeImage === imgUrl 
                        ? 'border-black ring-2 ring-black/20 scale-105' 
                        : 'border-black/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${i}`} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Garment Specs & Ordering */}
          <div className="md:col-span-7 space-y-4">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#0E100F] text-white text-[9px] font-mono-street px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">
                  {product.badge}
                </span>
                <span className="text-xs font-mono-street text-neutral-500 uppercase font-bold">
                  {product.category}
                </span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-black text-black leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2.5 pt-1">
                <span className="font-heading text-2xl font-black text-black">
                  ₹{product.price}
                </span>
                <span className="text-xs text-neutral-400 line-through font-mono-street">
                  ₹{product.originalPrice}
                </span>
                <span className="text-[10px] font-mono-street text-[#2E7D32] bg-[#E8F5E9] border border-[#2E7D32]/30 px-2 py-0.2 rounded-full font-bold">
                  SAVE ₹{product.originalPrice - product.price}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-700 font-mono-street leading-relaxed">
              {product.description || product.tagline}
            </p>

            {/* Fabric Specs Matrix */}
            <div className="bg-white/80 p-4 rounded-2xl border border-black/10 space-y-2 text-xs font-mono-street">
              <div className="flex justify-between">
                <span className="text-neutral-500">Fabric Composition:</span>
                <span className="font-bold text-black">{product.features?.[0] || '260 GSM French Terry'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Treatment:</span>
                <span className="font-bold text-black">Distressed Enzyme Wash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Collar Rib:</span>
                <span className="font-bold text-black">1.25" Heavy Spandex Rib (Zero Sag)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Inner Collar Tag:</span>
                <span className="font-bold text-[#E03115]">"{product.innerCollarTag || product.collarTag}"</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-street font-bold text-black">
                <span>CHOOSE STREET SIZE (BOX CUT)</span>
                <span className="text-neutral-500 font-normal flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5" />
                  Chest: {measurements?.chest || '48"'}
                </span>
              </div>

              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      audioFX.playFlick();
                      setSelectedSize(size);
                    }}
                    className={`flex-1 py-2 text-xs font-mono-street rounded-xl font-bold transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#0E100F] text-[#FAF8F5] shadow-xs'
                        : 'bg-white border border-black/15 text-black hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                disabled={added}
                className={`w-full py-3.5 rounded-2xl font-mono-street text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  added
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#0E100F] hover:bg-black text-[#FFB800] active:scale-95'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-white">ADDED TO TOTKA BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO TOTKA BAG (₹{product.price})</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[10px] text-center text-neutral-500 font-mono-street">
              PAN-INDIA COD • 7-DAY EASY REPLACEMENT • 100% NAZAR-PROOF PACKAGING
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
