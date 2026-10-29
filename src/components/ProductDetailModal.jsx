import React, { useState } from 'react';
import { X, ShoppingBag, Check, Ruler } from 'lucide-react';
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

  const measurements = product.measurements?.[selectedSize] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border-4 border-black rounded-2xl p-5 sm:p-7 neo-shadow-lg max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black text-white hover:bg-[#FF3B1D] transition-colors shadow-md border-2 border-black"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Clear High-Res Image Gallery */}
          <div className="md:col-span-5 space-y-3">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#EFECE3] border-3 border-black flex items-center justify-center">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover object-top"
              />

              {/* GSM Stamp */}
              <div className="absolute top-3 left-3 bg-black text-[#FFB800] px-2.5 py-0.5 rounded text-[9px] font-mono-street font-bold uppercase tracking-wider">
                {product.gsm} GSM • {product.fit}
              </div>

              {/* Protection badge */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md py-1.5 px-2.5 rounded border border-black text-center">
                <span className="text-[10px] font-mono-street text-black font-bold">
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
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === imgUrl ? 'border-black neo-shadow-sm scale-105' : 'border-black/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Angle preview" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Detailed Product Specs & Sizing */}
          <div className="md:col-span-7 space-y-4">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono-street uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded font-bold">
                  {product.badge}
                </span>
                <span className="text-[11px] font-mono-street text-[#666] uppercase font-bold">
                  {product.colorName}
                </span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-black text-black tracking-tight leading-snug">
                {product.name}
              </h2>

              <p className="text-xs text-[#444] font-medium font-mono-street">
                {product.tagline}
              </p>
            </div>

            {/* Price Line */}
            <div className="flex items-baseline gap-2.5 pb-2 border-b-2 border-black/10">
              <span className="font-heading text-2xl font-black text-black">
                ₹{product.price}
              </span>
              <span className="text-xs text-[#888] line-through font-mono-street">
                ₹{product.originalPrice}
              </span>
              <span className="text-[10px] font-mono-street bg-[#FF3B1D] text-white px-2 py-0.5 rounded font-bold">
                SAVE 35%
              </span>
            </div>

            {/* Fabric & Fit Specs */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-street uppercase tracking-wider text-[#666] font-bold block">
                FABRIC & FINISH:
              </span>
              <div className="space-y-1">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#333]">
                    <Check className="w-3.5 h-3.5 text-[#FF3B1D] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Woven Warning Tag */}
            <div className="p-3 bg-white rounded-lg border-2 border-black neo-shadow-sm space-y-0.5">
              <span className="text-[9px] font-mono-street uppercase tracking-wider text-[#FF3B1D] font-bold block">
                WOVEN INNER COLLAR WARNING:
              </span>
              <p className="text-xs text-black italic font-medium">
                "{product.innerCollarTag}"
              </p>
            </div>

            {/* Sizing Chart Measurements */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-xs font-medium text-[#444]">
                <span className="flex items-center gap-1.5 font-mono-street text-[11px] font-bold text-black">
                  <Ruler className="w-3.5 h-3.5 text-[#FFB800]" /> STREET FIT SPECS
                </span>
                {measurements && (
                  <span className="text-black font-mono-street font-bold text-[10px]">
                    Chest: {measurements.chest || measurements.tee} • Length: {measurements.length || measurements.shorts}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      audioFX.playFlick();
                      setSelectedSize(size);
                    }}
                    className={`py-1.5 rounded-md text-xs font-mono-street font-bold transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-[#EFECE3] border border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag CTA */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                disabled={added}
                className={`w-full py-3 rounded-lg text-xs font-bold font-mono-street uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-2 border-black ${
                  added
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#FFB800] hover:bg-[#FFA500] text-black neo-shadow active:translate-y-0.5'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO TOTKA BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG • ₹{product.price}</span>
                  </>
                )}
              </button>

              <div className="mt-2.5 flex items-center justify-center gap-3 text-[10px] text-[#666] font-mono-street font-medium">
                <span>CASH ON DELIVERY PAN-INDIA</span>
                <span>•</span>
                <span>CRAFT BOX PACKAGING</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
