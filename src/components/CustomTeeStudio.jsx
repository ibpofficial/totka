import React, { useState } from 'react';
import { X, Wand2, Eye, Check, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

export default function CustomTeeStudio({ isOpen, onClose, onAddToCart }) {
  if (!isOpen) return null;

  // Configuration States
  const [silhouette, setSilhouette] = useState('260-pump');
  const [color, setColor] = useState('midnight');
  const [viewSide, setViewSide] = useState('front'); // 'front' | 'back'
  const [chestBadge, setChestBadge] = useState('demon-mask');
  const [backprint, setBackprint] = useState('weight-drop');
  const [customText, setCustomText] = useState('BHAI 200KG');
  const [customCollarTag, setCustomCollarTag] = useState(false);
  const [customCollarName, setCustomCollarName] = useState('PR PROTECTOR');
  const [contrastStitch, setContrastStitch] = useState(true);
  const [miniHemTag, setMiniHemTag] = useState(false);
  const [selectedSize, setSelectedSize] = useState('L');
  const [added, setAdded] = useState(false);

  // Silhouettes & Base Pricing
  const SILHOUETTES = {
    '260-pump': { name: '260 GSM Mineral Acid-Washed Pump Cover', gsm: 260, basePrice: 1499, desc: 'Heavyweight boxy drop-shoulder cut, vintage washed.' },
    '240-tee': { name: '240 GSM Everyday Comfort Drop Tee', gsm: 240, basePrice: 1399, desc: 'Boxy streetwear drape, super-combed cotton.' },
    '280-terry': { name: '280 GSM French Terry Boxy Tee', gsm: 280, basePrice: 1699, desc: 'Ultra-heavy looped cotton, ultimate durability.' },
    '220-tank': { name: '220 GSM Akhada Muscle Tank', gsm: 220, basePrice: 1199, desc: 'Raw edge armholes for full mobility.' }
  };

  // Colors
  const COLORS = {
    'midnight': { name: 'Mineral Washed Charcoal', hex: '#252928' },
    'yellow': { name: 'Haldi Marigold Yellow', hex: '#FFB800' },
    'offwhite': { name: 'Vintage Akhada Off-White', hex: '#F7F4EE' },
    'chilli': { name: 'Chilli Warning Orange', hex: '#FF3B1D' },
    'tar': { name: 'Tar Iron Black', hex: '#0B100E' }
  };

  // Front Badges
  const FRONT_BADGES = {
    'demon-mask': { name: 'Intricate Demon Rakshas Mask', price: 0, tag: 'Signature', desc: 'Hand-drawn talisman mask with lemon-chilli chain.' },
    'nazar-battu': { name: 'Minimalist Nazar Battu Eye', price: 0, tag: 'Included', desc: 'Hand-drawn evil eye staring down bad vibes.' },
    'nimbu-chain': { name: 'Lemon-Chilli Talisman Chain', price: 149, tag: '+₹149', desc: 'Dangling talisman chain over chest.' },
    'hazard-tape': { name: 'KHABARDAR Caution Tape', price: 99, tag: '+₹99', desc: 'Hazard yellow & black caution box.' }
  };

  // Backprints
  const BACKPRINTS = {
    'weight-drop': { name: 'Buri Nazar Waale, Tera Weight Drop', price: 249, tag: '+₹249', headline: 'BURI NAZAR WAALE, TERA WEIGHT DROP.' },
    'bakchodi-sets': { name: '4 Sets of Bakchodi + 1 Set of PR', price: 249, tag: '+₹249', headline: '4 SETS BAKCHODI + 1 SET PR' },
    'dhyaan-se': { name: 'Dhyaan Se: Nazar Lag Jayegi', price: 249, tag: '+₹249', headline: 'DHYAAN SE: NAZAR LAG JAYEGI' },
    'custom-name': { name: 'Custom Gym Handle / Slogan', price: 349, tag: '+₹349', headline: customText.toUpperCase() || 'YOUR NAME' }
  };

  // Dynamic Price Calculation
  const base = SILHOUETTES[silhouette].basePrice;
  const badgeAddon = FRONT_BADGES[chestBadge].price;
  const backAddon = BACKPRINTS[backprint].price;
  const collarAddon = customCollarTag ? 149 : 0;
  const stitchAddon = contrastStitch ? 99 : 0;
  const hemAddon = miniHemTag ? 149 : 0;
  const totalPrice = base + badgeAddon + backAddon + collarAddon + stitchAddon + hemAddon;

  const handleAddCustomToBag = () => {
    audioFX.playDhishum();
    setAdded(true);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FFB800', '#FF3B1D', '#0A0D0C']
    });

    const customProduct = {
      id: `custom-totka-${Date.now()}`,
      name: `Custom Totka: ${SILHOUETTES[silhouette].name}`,
      category: 'Custom Studio Armor',
      tagline: `Color: ${COLORS[color].name} • ${BACKPRINTS[backprint].name}`,
      price: totalPrice,
      originalPrice: totalPrice + 800,
      gsm: SILHOUETTES[silhouette].gsm,
      fit: 'Custom Drop-Shoulder Fit',
      badge: 'CUSTOM BESPOKE',
      badgeColor: 'gold',
      colorName: COLORS[color].name,
      colorHex: COLORS[color].hex,
      frontGraphic: FRONT_BADGES[chestBadge].name,
      backGraphic: BACKPRINTS[backprint].headline,
      innerCollarTag: customCollarTag ? `CUSTOM KHABARDAR: ${customCollarName.toUpperCase()}` : 'KHABARDAR: Pure Totka Armor.',
      nazarShieldRating: '100% Bespoke Protection',
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
      selectedSize,
      image: '/totka-tshirt-main.png'
    };

    onAddToCart(customProduct);

    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] border-4 border-black rounded-2xl p-5 sm:p-7 neo-shadow-lg max-h-[92vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-lg bg-black text-white hover:bg-[#FF3B1D] transition-colors shadow-md border-2 border-black"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Studio Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b-2 border-black/10 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black text-[#FFB800] text-[10px] font-mono-street uppercase tracking-widest mb-1 font-bold">
              ★ MAIN USP: BESPOKE ARMOR STUDIO
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-black text-black tracking-tight">
              CUSTOMISE YOUR <span className="bg-[#FFB800] px-1 border border-black inline-block">TOTKA TEE</span>
            </h2>
          </div>

          {/* Dynamic Price Callout */}
          <div className="bg-white px-4 py-1.5 rounded-xl border-2 border-black neo-shadow-sm flex items-center gap-3">
            <div>
              <span className="text-[9px] text-[#666] uppercase font-mono-street block font-bold">LIVE PRICE</span>
              <span className="font-heading text-xl font-black text-black leading-none">
                ₹{totalPrice}
              </span>
            </div>
            <span className="text-[9px] bg-[#FF3B1D] text-white font-mono-street px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
              DYNAMIC
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-5">
          
          {/* Left Column: Live T-Shirt Visual Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* View Switcher */}
            <div className="flex items-center gap-2 mb-3 bg-white p-1 rounded-lg border-2 border-black">
              <button
                onClick={() => {
                  audioFX.playFlick();
                  setViewSide('front');
                }}
                className={`px-3 py-1 text-xs font-mono-street font-bold uppercase tracking-wider rounded transition-colors ${
                  viewSide === 'front' ? 'bg-black text-white' : 'text-black/60'
                }`}
              >
                FRONT VIEW
              </button>
              <button
                onClick={() => {
                  audioFX.playFlick();
                  setViewSide('back');
                }}
                className={`px-3 py-1 text-xs font-mono-street font-bold uppercase tracking-wider rounded transition-colors ${
                  viewSide === 'back' ? 'bg-black text-white' : 'text-black/60'
                }`}
              >
                BACK VIEW
              </button>
            </div>

            {/* T-Shirt Canvas Mockup */}
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-xl bg-[#EFECE3] border-3 border-black p-4 flex items-center justify-center overflow-hidden">
              
              <div 
                className="relative w-60 h-72 rounded-t-[30px] rounded-b-xl border-2 border-black shadow-xl transition-colors duration-500 flex flex-col justify-between p-3.5"
                style={{ backgroundColor: COLORS[color].hex }}
              >
                {/* Collar */}
                <div className="w-22 h-6 mx-auto -mt-3.5 bg-[#EFECE3] rounded-b-full border border-black flex items-center justify-center">
                  {customCollarTag && (
                    <span className="text-[7px] font-mono-street text-[#FFB800] bg-black px-1 rounded font-bold">
                      {customCollarName.slice(0, 10)}
                    </span>
                  )}
                </div>

                {/* FRONT VIEW */}
                {viewSide === 'front' && (
                  <div className="relative h-full flex flex-col justify-between py-2 items-center text-center">
                    <div className="mt-1 w-full p-2 rounded-lg bg-black/40 border border-white/20">
                      {chestBadge === 'demon-mask' && (
                        <div className="space-y-1">
                          <img src="/totka-tshirt-graphic.png" alt="Demon Graphic" className="h-24 w-auto mx-auto object-contain rounded" />
                          <span className="text-[8px] font-mono-street text-[#FFB800] block font-bold">DEMON TALISMAN CREST</span>
                        </div>
                      )}
                      {chestBadge === 'nazar-battu' && (
                        <div className="flex flex-col items-center gap-1 text-white py-3">
                          <Eye className="w-7 h-7 text-[#FFB800]" />
                          <span className="font-mono-street text-[8px] uppercase tracking-wider font-bold">NAZAR BATTU CREST</span>
                        </div>
                      )}
                      {chestBadge === 'nimbu-chain' && (
                        <div className="flex flex-col items-center gap-1 text-white py-3">
                          <span className="text-xl">🍋🌶️</span>
                          <span className="font-mono-street text-[8px] uppercase tracking-wider font-bold">TALISMAN CHAIN</span>
                        </div>
                      )}
                      {chestBadge === 'hazard-tape' && (
                        <div className="bg-[#FFB800] text-black px-2 py-0.5 rounded font-mono-street text-[8px] font-bold my-3">
                          ⚠️ KHABARDAR SURAKSHA
                        </div>
                      )}
                    </div>

                    {/* Bottom Trims */}
                    <div className="w-full flex justify-between items-end text-[8px] font-mono-street text-white font-bold">
                      {miniHemTag && <span className="bg-[#FF3B1D] text-white px-1 rounded">🌶️ HEM TAG</span>}
                      {contrastStitch && <span className="text-[#FFB800] ml-auto">=== CONTRAST STITCH ===</span>}
                    </div>
                  </div>
                )}

                {/* BACK VIEW */}
                {viewSide === 'back' && (
                  <div className="relative h-full flex flex-col items-center justify-center p-3 text-center">
                    <div className="p-2.5 bg-black/70 rounded-lg border border-white/20 w-full space-y-1">
                      <div className="font-heading text-xs font-black text-[#FFB800] uppercase leading-tight tracking-wide">
                        {BACKPRINTS[backprint].headline}
                      </div>
                      <div className="text-[7px] font-mono-street text-white/70 uppercase tracking-widest font-bold">
                        TOTKA ACTIVEWEAR AUTHENTIC
                      </div>
                    </div>

                    <div className="mt-auto font-mono-street text-[8px] text-white/60 font-bold">
                      {SILHOUETTES[silhouette].gsm} GSM HEAVYWEAR
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Config Specs Pill */}
            <div className="mt-2.5 w-full max-w-sm bg-white p-2.5 rounded-lg border-2 border-black text-[10px] font-mono-street space-y-0.5 neo-shadow-sm">
              <div className="flex justify-between">
                <span className="text-[#666]">Silhouette:</span>
                <span className="text-black font-bold truncate max-w-[170px]">{SILHOUETTES[silhouette].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">Color:</span>
                <span className="text-black font-bold">{COLORS[color].name}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Refined Options Selector */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* 1. Silhouette */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono-street uppercase tracking-widest text-[#666] font-bold block">
                1. SILHOUETTE & GSM
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {Object.entries(SILHOUETTES).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      audioFX.playFlick();
                      setSilhouette(key);
                    }}
                    className={`p-2.5 rounded-lg border-2 text-left transition-colors ${
                      silhouette === key
                        ? 'bg-[#FFB800] border-black text-black font-bold neo-shadow-sm'
                        : 'bg-white border-black/20 text-[#333] hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="font-heading truncate">{item.name}</span>
                      <span className="font-mono-street text-black font-black">₹{item.basePrice}</span>
                    </div>
                    <p className="text-[10px] text-[#666] mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Colorway */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono-street uppercase tracking-widest text-[#666] font-bold block">
                2. GARMENT COLOR
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(COLORS).map(([key, col]) => (
                  <button
                    key={key}
                    onClick={() => {
                      audioFX.playFlick();
                      setColor(key);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border-2 text-xs font-bold font-mono-street transition-colors ${
                      color === key ? 'border-black bg-black text-white' : 'border-black/30 bg-white text-black'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-black/40" style={{ backgroundColor: col.hex }}></span>
                    <span className="text-[11px]">{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Front Graphic */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono-street uppercase tracking-widest text-[#666] font-bold block">
                3. FRONT CHEST TALISMAN
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(FRONT_BADGES).map(([key, badge]) => (
                  <button
                    key={key}
                    onClick={() => {
                      audioFX.playFlick();
                      setChestBadge(key);
                    }}
                    className={`p-2 rounded-lg border-2 text-left transition-colors ${
                      chestBadge === key ? 'bg-[#FFB800] border-black text-black font-bold neo-shadow-sm' : 'bg-white border-black/20 text-[#333]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="truncate text-[11px]">{badge.name}</span>
                      <span className="text-black font-mono-street text-[9px] shrink-0 ml-1 font-black">{badge.tag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Backprint */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono-street uppercase tracking-widest text-[#666] font-bold block">
                4. COMIC BACKPRINT SLOGAN
              </span>
              <div className="space-y-1">
                {Object.entries(BACKPRINTS).map(([key, print]) => (
                  <button
                    key={key}
                    onClick={() => {
                      audioFX.playFlick();
                      setBackprint(key);
                    }}
                    className={`w-full p-2 rounded-lg border-2 text-left transition-colors flex items-center justify-between text-xs ${
                      backprint === key ? 'bg-[#FFB800] border-black text-black font-bold neo-shadow-sm' : 'bg-white border-black/20 text-[#333]'
                    }`}
                  >
                    <span className="font-bold truncate text-[11px]">"{print.name}"</span>
                    <span className="text-black font-mono-street shrink-0 ml-2 text-[10px] font-black">{print.tag}</span>
                  </button>
                ))}

                {backprint === 'custom-name' && (
                  <div className="pt-1">
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                      maxLength={18}
                      placeholder="ENTER NICKNAME (E.G. BHAI 200KG)"
                      className="w-full bg-white border-2 border-black rounded-lg px-2.5 py-1.5 text-xs text-black font-mono-street font-bold outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 5. Add-ons */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono-street uppercase tracking-widest text-[#666] font-bold block">
                5. BESPOKE TRIMS
              </span>
              <div className="space-y-1">
                <div 
                  onClick={() => {
                    audioFX.playFlick();
                    setCustomCollarTag(!customCollarTag);
                  }}
                  className={`p-2 rounded-lg border-2 cursor-pointer flex items-center justify-between transition-colors ${
                    customCollarTag ? 'bg-[#FFB800] border-black' : 'bg-white border-black/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border border-black ${customCollarTag ? 'bg-black text-white' : 'bg-white'}`}>
                      {customCollarTag && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="text-[11px] text-black font-bold">Custom "Khabardar" Inner Collar Label</span>
                  </div>
                  <span className="text-[11px] text-black font-mono-street font-bold">+₹149</span>
                </div>

                <div 
                  onClick={() => {
                    audioFX.playFlick();
                    setContrastStitch(!contrastStitch);
                  }}
                  className={`p-2 rounded-lg border-2 cursor-pointer flex items-center justify-between transition-colors ${
                    contrastStitch ? 'bg-[#FFB800] border-black' : 'bg-white border-black/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border border-black ${contrastStitch ? 'bg-black text-white' : 'bg-white'}`}>
                      {contrastStitch && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="text-[11px] text-black font-bold">Reinforced Haldi Contrast Bar-tacks</span>
                  </div>
                  <span className="text-[11px] text-black font-mono-street font-bold">+₹99</span>
                </div>
              </div>
            </div>

            {/* 6. Size */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono-street uppercase tracking-widest text-[#666] font-bold block">
                6. SELECT SIZE
              </span>
              <div className="grid grid-cols-6 gap-1.5">
                {['S', 'M', 'L', 'XL', 'XXL', '3XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      audioFX.playFlick();
                      setSelectedSize(size);
                    }}
                    className={`py-1.5 rounded text-xs font-mono-street font-bold transition-colors border-2 border-black ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-[#EFECE3]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Button */}
            <div className="pt-2 border-t-2 border-black/10">
              <button
                onClick={handleAddCustomToBag}
                disabled={added}
                className={`w-full py-3 rounded-lg text-xs font-mono-street font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-2 border-black ${
                  added ? 'bg-emerald-500 text-black' : 'bg-[#FFB800] hover:bg-[#FFA500] text-black neo-shadow active:translate-y-0.5'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>CUSTOM ARMOR ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ORDER CUSTOM TOTKA TEE • ₹{totalPrice}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
