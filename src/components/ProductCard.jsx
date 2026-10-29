import React, { useState } from 'react';
import { ShoppingBag, Check, ArrowUpRight } from 'lucide-react';
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
      colors: ['#FFB800', '#FF3B1D', '#0A0D0C']
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
      className="group cursor-pointer relative bg-white rounded-xl border-3 border-[#0A0D0C] transition-all duration-200 flex flex-col justify-between overflow-hidden neo-shadow"
    >
      
      {/* Compact Product Image Stage */}
      <div className="relative h-60 sm:h-64 w-full bg-[#EFECE3] overflow-hidden flex items-center justify-center border-b-2 border-black">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Minimal Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="bg-black text-white text-[9px] font-mono-street uppercase tracking-widest px-2 py-0.5 rounded font-bold">
            {product.badge}
          </span>
          <span className="bg-[#FFB800] text-black border border-black text-[9px] font-mono-street font-bold px-1.5 py-0.5 rounded">
            {product.gsm} GSM
          </span>
        </div>

        {/* Subtle Quick Inspect Overlay on bottom of image */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-md text-white text-[11px] py-1.5 px-2.5 rounded flex items-center justify-between font-mono-street font-bold">
            <span>INSPECT FABRIC & FIT</span>
            <ArrowUpRight className="w-3 h-3 text-[#FFB800]" />
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono-street uppercase tracking-wider text-[#666]">
            <span>{product.category}</span>
            <span className="text-[#FF3B1D] font-bold">{product.fit}</span>
          </div>

          <h3 className="font-heading text-base font-black text-black leading-snug group-hover:text-[#FF3B1D] transition-colors truncate">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#555] truncate font-mono-street">
            {product.frontGraphic}
          </p>
        </div>

        {/* Compact Size Selector */}
        <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[10px] text-[#666] font-medium font-mono-street">
            <span>STREET FIT</span>
            <span className="text-black font-bold">BOX CUT</span>
          </div>

          <div className="flex gap-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  audioFX.playFlick();
                  setSelectedSize(size);
                }}
                className={`flex-1 py-1 text-[11px] font-mono-street rounded transition-colors ${
                  selectedSize === size
                    ? 'bg-black text-white font-bold'
                    : 'bg-[#F2EDE4] text-black hover:bg-[#E5DFD3] border border-black/20'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing and Action Bar */}
        <div className="pt-2.5 border-t border-black/10 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-lg font-black text-black">
              ₹{product.price}
            </span>
            <span className="text-[11px] text-[#888] line-through font-mono-street">
              ₹{product.originalPrice}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={added}
            className={`px-3 py-1.5 rounded text-xs font-bold font-mono-street uppercase tracking-wider transition-all duration-150 flex items-center gap-1 border-2 border-black ${
              added
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-[#FFB800] hover:bg-[#FFA500] text-black neo-shadow-sm active:translate-y-0.5'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
