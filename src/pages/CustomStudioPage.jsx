import React, { useState } from 'react';
import { 
  Wand2, Check, Sparkles, Shield, ArrowRight, RotateCcw, 
  Layers, Palette, Tag, Eye, ShoppingBag 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

const BASE_COLORS = [
  { id: 'charcoal', name: 'Mineral Washed Charcoal', hex: '#1C1E20', textHex: '#FAF8F5', price: 0 },
  { id: 'offwhite', name: 'Vintage Off-White', hex: '#F4F1EA', textHex: '#121212', price: 50 },
  { id: 'akhada-olive', name: 'Akhada Clay Olive', hex: '#2A3027', textHex: '#FAF8F5', price: 100 },
  { id: 'rust', name: 'Tapri Terracotta', hex: '#3B231D', textHex: '#FAF8F5', price: 100 }
];

const FABRIC_GRADES = [
  { id: '240', gsm: 240, name: 'Street Terry (240 GSM)', desc: 'Breathable, structured all-day comfort', addPrice: 0 },
  { id: '260', gsm: 260, name: 'Heavy Akhada Terry (260 GSM)', desc: 'Drop-shoulder armor for heavy deadlifts', addPrice: 100 },
  { id: '280', gsm: 280, name: 'Combat Heavy Terry (280 GSM)', desc: 'Ultra-dense, zero shrink, unyielding drape', addPrice: 200 }
];

const TALISMAN_EMBLEMS = [
  { id: 'demon-mask', name: 'Buri Nazar Demon Crest', desc: 'Ferocious protective monster ward', icon: '👺', addPrice: 150 },
  { id: 'nimbu-mirchi', name: 'Hanging Lemon & 7 Chillies', desc: 'Classic Indian protective talisman', icon: '🍋', addPrice: 150 },
  { id: 'evil-eye', name: 'Third Eye Akhada Symbol', desc: 'Minimalist talisman ocular shield', icon: '🧿', addPrice: 120 },
  { id: 'gadha', name: 'Hanuman Iron Mace / Gadha', desc: 'Ancient strength & akhada discipline', icon: '🔱', addPrice: 150 }
];

const BACK_SLOGANS = [
  { id: 'slogan-1', text: 'BURI NAZAR WAALE, TERA WEIGHT DROP.', sub: 'Standard Akhada Law' },
  { id: 'slogan-2', text: 'NAZAR LAGANE SE PR NAHI RUKTI.', sub: 'Lifting Wisdom' },
  { id: 'slogan-3', text: 'HIGH GSM ARMOR • ZERO COMPROMISE.', sub: 'Technical Specification' },
  { id: 'slogan-4', text: '100% PROTECTED AGAINST GYM EXPERTS.', sub: 'Tapri Banter' }
];

export default function CustomStudioPage({ onAddToCart, onNavigate }) {
  const [view, setView] = useState('front'); // 'front' | 'back'
  const [selectedColor, setSelectedColor] = useState(BASE_COLORS[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRIC_GRADES[1]);
  const [selectedEmblem, setSelectedEmblem] = useState(TALISMAN_EMBLEMS[0]);
  const [selectedSlogan, setSelectedSlogan] = useState(BACK_SLOGANS[0]);
  const [customName, setCustomName] = useState('IRON PEHALWAN');
  const [selectedSize, setSelectedSize] = useState('XL');
  const [added, setAdded] = useState(false);

  // Price calculations
  const basePrice = 1499;
  const totalPrice = basePrice + selectedColor.price + selectedFabric.addPrice + selectedEmblem.addPrice;

  const handleAddCustomToCart = () => {
    audioFX.playDhishum();
    setAdded(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB800', '#FF3B1D', '#0A0D0C']
    });

    const customProduct = {
      id: `custom-tee-${Date.now()}`,
      name: `Custom Totka Bespoke Armor (${selectedFabric.gsm} GSM)`,
      price: totalPrice,
      category: 'Bespoke Atelier',
      gsm: selectedFabric.gsm,
      selectedSize,
      fit: 'Oversized Box Cut',
      image: selectedColor.id === 'offwhite' ? '/totka-tshirt-white.png' : '/totka-tshirt-main.png',
      isCustom: true,
      customDetails: {
        color: selectedColor.name,
        fabric: selectedFabric.name,
        emblem: selectedEmblem.name,
        slogan: selectedSlogan.text,
        lifterName: customName
      }
    };

    if (onAddToCart) {
      onAddToCart(customProduct);
    }

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleInstantCheckout = () => {
    handleAddCustomToCart();
    if (onNavigate) {
      onNavigate('checkout');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#121212] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono-street text-[#666] uppercase tracking-widest">
              <span className="text-black font-bold">ATELIER</span>
              <span>/</span>
              <span>BESPOKE ARMOR STUDIO</span>
              <span>/</span>
              <span className="text-[#E03115] font-bold">SPEC 2026</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              CRAFT YOUR TOTKA SILHOUETTE
            </h1>
            <p className="text-xs sm:text-sm text-[#555] max-w-xl font-mono-street">
              Every garment is individually cut from heavy 240+ GSM loopback French terry, enzyme-washed, and printed with your custom talisman & lifter crest.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                audioFX.playFlick();
                setView(view === 'front' ? 'back' : 'front');
              }}
              className="bg-white hover:bg-neutral-100 text-black border border-black/20 px-4 py-2 rounded-lg text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>FLIP TO {view === 'front' ? 'BACK VIEW' : 'FRONT VIEW'}</span>
            </button>
          </div>
        </div>

        {/* Studio Grid: Stage (Left) & Controls (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Garment Live Preview Stage (Sticky) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-black/15 p-6 sm:p-10 shadow-sm relative flex flex-col items-center justify-center min-h-[520px] sm:min-h-[600px] overflow-hidden">
            
            {/* Stage Indicators */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-[#121212] text-white text-[9px] font-mono-street uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                {view === 'front' ? 'FRONT: CHEST TALISMAN' : 'BACK: OVERSIZED COMIC PRINT'}
              </span>
              <span className="bg-[#FAF8F5] text-black border border-black/20 text-[9px] font-mono-street font-bold px-2 py-0.5 rounded">
                {selectedFabric.gsm} GSM
              </span>
            </div>

            <div className="absolute top-4 right-4 text-[10px] font-mono-street text-[#888]">
              VIEW: <strong className="text-black uppercase">{view}</strong>
            </div>

            {/* SVG Interactive T-Shirt Model */}
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center transition-all duration-300">
              
              {/* T-Shirt Silhouette SVG */}
              <svg 
                viewBox="0 0 500 560" 
                className="w-full h-full drop-shadow-xl transition-all duration-500"
                style={{ fill: selectedColor.hex }}
              >
                {/* T-Shirt Body Path */}
                <path 
                  d="M165 45 C190 65, 310 65, 335 45 L445 105 L400 230 L350 205 L350 515 C350 525, 340 535, 330 535 L170 535 C160 535, 150 525, 150 515 L150 205 L100 230 L55 105 Z" 
                  stroke="#121212" 
                  strokeWidth="6"
                  strokeLinejoin="round"
                />

                {/* Collar Rib */}
                <path 
                  d="M165 45 C195 85, 305 85, 335 45 C305 100, 195 100, 165 45 Z" 
                  fill={selectedColor.hex === '#F4F1EA' ? '#E5E0D5' : '#141517'}
                  stroke="#121212"
                  strokeWidth="4"
                />

                {/* Drop Shoulder Seams */}
                <path d="M150 205 L165 45" stroke="rgba(0,0,0,0.3)" strokeWidth="3" strokeDasharray="3 3" />
                <path d="M350 205 L335 45" stroke="rgba(0,0,0,0.3)" strokeWidth="3" strokeDasharray="3 3" />
                <path d="M100 230 L150 205" stroke="rgba(0,0,0,0.35)" strokeWidth="3" />
                <path d="M400 230 L350 205" stroke="rgba(0,0,0,0.35)" strokeWidth="3" />
              </svg>

              {/* Garment Graphic Content Layer */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-12">
                
                {/* FRONT VIEW CONTENT */}
                {view === 'front' ? (
                  <div className="flex flex-col items-center text-center space-y-3 -mt-10 animate-in fade-in duration-300">
                    
                    {/* Brand Micro Wordmark */}
                    <span 
                      className="text-[10px] font-mono-street font-black tracking-[0.25em] uppercase opacity-90"
                      style={{ color: selectedColor.textHex }}
                    >
                      TOTKA ATHLETICS
                    </span>

                    {/* Dynamic Crest Emblem */}
                    <div className="w-24 h-24 rounded-2xl bg-black/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-2 shadow-inner">
                      <span className="text-4xl">{selectedEmblem.icon}</span>
                      <span 
                        className="text-[8px] font-mono-street font-bold uppercase mt-1 tracking-wider"
                        style={{ color: selectedColor.textHex }}
                      >
                        {selectedEmblem.name.split(' ')[0]}
                      </span>
                    </div>

                    {/* Lifter Custom Name Tag */}
                    {customName.trim() && (
                      <div className="bg-black/25 px-3 py-1 rounded border border-white/20 backdrop-blur-sm">
                        <span 
                          className="font-mono-street text-[10px] font-black tracking-widest uppercase"
                          style={{ color: selectedColor.textHex }}
                        >
                          PROT // {customName.toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Weight Spec */}
                    <span 
                      className="text-[8px] font-mono-street opacity-60 tracking-wider"
                      style={{ color: selectedColor.textHex }}
                    >
                      HEAVYWEIGHT {selectedFabric.gsm} GSM • BURI NAZAR SHIELD
                    </span>
                  </div>
                ) : (
                  /* BACK VIEW CONTENT */
                  <div className="flex flex-col items-center text-center space-y-4 -mt-8 max-w-[240px] animate-in fade-in duration-300">
                    
                    {/* Oversized Brand Slogan */}
                    <div className="space-y-1">
                      <span 
                        className="text-[9px] font-mono-street uppercase tracking-[0.3em] font-bold opacity-80"
                        style={{ color: selectedColor.textHex }}
                      >
                        [ CHAPTER 01 / TAPRI LAW ]
                      </span>
                      <h3 
                        className="font-heading text-lg sm:text-xl font-black uppercase leading-tight tracking-tight"
                        style={{ color: selectedColor.textHex }}
                      >
                        {selectedSlogan.text}
                      </h3>
                    </div>

                    {/* Comic Nazar Box */}
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-white/30 flex items-center justify-center text-2xl">
                      🍋🌶️
                    </div>

                    {/* Custom Lifter Handle on Bottom Hem */}
                    <div className="pt-2 border-t border-white/20 w-full text-center">
                      <p 
                        className="font-mono-street text-[9px] tracking-widest font-black uppercase"
                        style={{ color: selectedColor.textHex }}
                      >
                        COMMISSIONED FOR: {customName.toUpperCase()}
                      </p>
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Quick Switch View Pill */}
            <div className="mt-6 flex items-center gap-2 bg-[#FAF8F5] p-1 rounded-xl border border-black/15">
              <button
                onClick={() => setView('front')}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono-street font-bold transition-all ${
                  view === 'front' 
                    ? 'bg-black text-[#FFB800] shadow-sm' 
                    : 'text-black/60 hover:text-black'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setView('back')}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono-street font-bold transition-all ${
                  view === 'back' 
                    ? 'bg-black text-[#FFB800] shadow-sm' 
                    : 'text-black/60 hover:text-black'
                }`}
              >
                Back View
              </button>
            </div>

          </div>

          {/* RIGHT: Bespoke Customization Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Base Fabric Color */}
            <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono-street font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#E03115]" />
                  <span>1. Base Colorway</span>
                </label>
                <span className="text-xs font-mono-street text-[#666] font-medium">{selectedColor.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {BASE_COLORS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      audioFX.playFlick();
                      setSelectedColor(col);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      selectedColor.id === col.id
                        ? 'border-black bg-neutral-50 ring-2 ring-black/10'
                        : 'border-black/15 hover:border-black/40'
                    }`}
                  >
                    <span 
                      className="w-5 h-5 rounded-full border border-black/30 shrink-0" 
                      style={{ backgroundColor: col.hex }}
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-mono-street font-bold block truncate">{col.name}</span>
                      <span className="text-[10px] text-[#777] font-mono-street">
                        {col.price === 0 ? 'Included' : `+₹${col.price}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fabric Weight / GSM */}
            <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono-street font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E03115]" />
                  <span>2. Heavyweight GSM Terry</span>
                </label>
                <span className="text-xs font-mono-street font-bold text-black">{selectedFabric.gsm} GSM</span>
              </div>

              <div className="space-y-2">
                {FABRIC_GRADES.map((fab) => (
                  <div
                    key={fab.id}
                    onClick={() => {
                      audioFX.playFlick();
                      setSelectedFabric(fab);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      selectedFabric.id === fab.id
                        ? 'border-black bg-[#FAF8F5] ring-2 ring-black/10'
                        : 'border-black/15 hover:border-black/30'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-mono-street font-bold text-black">{fab.name}</h4>
                      <p className="text-[11px] text-[#666] font-mono-street mt-0.5">{fab.desc}</p>
                    </div>
                    <span className="text-xs font-mono-street font-bold text-black">
                      {fab.addPrice === 0 ? 'Standard' : `+₹${fab.addPrice}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Front Talisman Emblem */}
            <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono-street font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#E03115]" />
                  <span>3. Front Talisman Emblem</span>
                </label>
                <span className="text-xs font-mono-street text-[#666]">{selectedEmblem.name.split(' ')[0]}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {TALISMAN_EMBLEMS.map((emb) => (
                  <button
                    key={emb.id}
                    onClick={() => {
                      audioFX.playFlick();
                      setSelectedEmblem(emb);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      selectedEmblem.id === emb.id
                        ? 'border-black bg-[#FAF8F5] ring-2 ring-black/10 font-bold'
                        : 'border-black/15 hover:border-black/30'
                    }`}
                  >
                    <span className="text-xl">{emb.icon}</span>
                    <div className="min-w-0">
                      <span className="text-xs font-mono-street block truncate">{emb.name}</span>
                      <span className="text-[10px] text-[#777] font-mono-street">+₹{emb.addPrice}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Lifter Name / Nickname Embroidered Tag */}
            <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm space-y-3">
              <label className="text-xs font-mono-street font-bold text-black uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#E03115]" />
                  <span>4. Embroidered Lifter Handle</span>
                </span>
                <span className="text-[10px] text-[#2E7D32] font-bold">100% INCLUDED</span>
              </label>

              <input
                type="text"
                value={customName}
                maxLength={20}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. ROHAN 210KG PR"
                className="w-full bg-[#FAF8F5] border border-black/20 rounded-xl px-3.5 py-2.5 text-xs font-mono-street uppercase text-black font-bold outline-none focus:border-black focus:bg-white"
              />
              <p className="text-[10px] text-[#777] font-mono-street">
                Stitched on the front lower hem and printed on the internal collar talisman tag.
              </p>
            </div>

            {/* 5. Back Graphic Slogan */}
            <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm space-y-3">
              <label className="text-xs font-mono-street font-bold text-black uppercase tracking-wider block">
                5. Comic Backprint Typography
              </label>

              <div className="space-y-1.5">
                {BACK_SLOGANS.map((slog) => (
                  <div
                    key={slog.id}
                    onClick={() => {
                      audioFX.playFlick();
                      setSelectedSlogan(slog);
                      setView('back');
                    }}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                      selectedSlogan.id === slog.id
                        ? 'border-black bg-black text-[#FFB800] font-bold'
                        : 'border-black/15 bg-[#FAF8F5] text-black hover:border-black/30'
                    }`}
                  >
                    <span className="text-xs font-mono-street block truncate">"{slog.text}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Size Selection & Summary */}
            <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm space-y-4">
              <div>
                <label className="text-xs font-mono-street font-bold text-black uppercase tracking-wider block mb-2">
                  Select Garment Size (Box Cut)
                </label>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        audioFX.playFlick();
                        setSelectedSize(sz);
                      }}
                      className={`flex-1 py-2 rounded-lg border text-xs font-mono-street font-bold transition-all ${
                        selectedSize === sz
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-[#FAF8F5] border-black/20 text-black hover:border-black'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Checkout CTA */}
              <div className="pt-3 border-t border-black/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono-street text-[#777] uppercase block">Net Bespoke Price</span>
                    <span className="font-heading text-2xl font-black text-black">₹{totalPrice}</span>
                  </div>
                  <span className="text-[10px] font-mono-street text-[#2E7D32] bg-[#E8F5E9] border border-[#2E7D32]/30 px-2 py-0.5 rounded font-bold">
                    FREE ALL-INDIA DISPATCH
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleAddCustomToCart}
                    className="w-full bg-white hover:bg-neutral-100 text-black border-2 border-black font-mono-street text-xs font-bold py-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>ADDED TO BAG!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleInstantCheckout}
                    className="w-full bg-[#121212] hover:bg-black text-[#FFB800] border-2 border-black font-mono-street text-xs font-bold py-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm active:translate-y-0.5"
                  >
                    <span>BUY BESPOKE NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

