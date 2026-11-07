import React, { useState } from 'react';
import { ShoppingBag, Check, ArrowUpRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

export default function ProductCard({ product, onAddToCart, onOpenDetail }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    audioFX.playDhishum();
    setAdded(true);
    
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
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

  return (
    <div 
      onClick={() => {
        audioFX.playFlick();
        onOpenDetail(product);
      }}
      className="group cursor-pointer relative bg-white rounded-3xl border border-black/10 hover:border-black/30 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg"
    >
      
      {/* Product Image Stage */}
      <div className="relative h-64 sm:h-72 w-full bg-[#EFECE3] overflow-hidden flex items-center justify-center border-b border-black/10">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Minimal Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-[#0E100F] text-white text-[9px] font-mono-street uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold">
            {product.badge}
          </span>
          <span className="liquid-glass-pill text-black text-[9px] font-mono-street font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
            {product.gsm} GSM
          </span>
        </div>

        {/* Subtle Quick Inspect Liquid Glass Overlay */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="liquid-glass-dark text-white text-[11px] py-2 px-3.5 rounded-2xl flex items-center justify-between font-mono-street font-bold shadow-md">
            <span>INSPECT FABRIC & TRIMS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FFB800]" />
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono-street uppercase tracking-wider text-neutral-500">
            <span>{product.category}</span>
            <span className="text-[#E03115] font-bold">{product.fit}</span>
          </div>

          <h3 className="font-heading text-base font-black text-black leading-snug group-hover:text-[#E03115] transition-colors truncate">
            {product.name}
          </h3>

          <p className="text-[11px] text-neutral-600 truncate font-mono-street">
            {product.frontGraphic}
          </p>
        </div>

        {/* Size Selector */}
        <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[10px] text-neutral-500 font-medium font-mono-street">
            <span>STREET CUT</span>
            <span className="text-black font-bold">BOX FIT</span>
          </div>

          <div className="flex gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  audioFX.playFlick();
                  setSelectedSize(size);
                }}
                className={`flex-1 py-1.5 text-[11px] font-mono-street rounded-xl transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-[#0E100F] text-[#FAF8F5] font-bold shadow-2xs'
                    : 'bg-[#FAF8F5] text-neutral-800 hover:bg-neutral-100 border border-black/10'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing and Action Bar */}
        <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-lg font-black text-black">
              ₹{product.price}
            </span>
            <span className="text-[11px] text-neutral-400 line-through font-mono-street">
              ₹{product.originalPrice}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={added}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-street uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 border border-black cursor-pointer ${
              added
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-[#0E100F] hover:bg-black text-[#FFB800] shadow-2xs active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-white">ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>COMMISSION</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
