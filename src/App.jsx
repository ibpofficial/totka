import React, { useState } from 'react';
import HazardTicker from './components/HazardTicker';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CustomTeeStudio from './components/CustomTeeStudio';
import TheTotkaLook from './components/TheTotkaLook';
import TotkaBoxUnboxing from './components/TotkaBoxUnboxing';
import StreetLore from './components/StreetLore';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import CollarTagModal from './components/CollarTagModal';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { Flame, Star, ShieldCheck, Wand2, ArrowRight } from 'lucide-react';
import { audioFX } from './utils/audio';

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customStudioOpen, setCustomStudioOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [inspectedProduct, setInspectedProduct] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  // Add to cart handler
  const handleAddToCart = (productWithSelection) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === productWithSelection.id && item.selectedSize === productWithSelection.selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === productWithSelection.id && item.selectedSize === productWithSelection.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...productWithSelection, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    audioFX.playFlick();
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  const handleAddBoxToCart = () => {
    const boxProduct = PRODUCTS.find((p) => p.id === 'totka-06');
    if (boxProduct) {
      handleAddToCart({
        ...boxProduct,
        selectedSize: 'L'
      });
      setCartOpen(true);
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'TEES') return p.category.includes('Tee') || p.category.includes('Pump');
    if (selectedFilter === 'SHORTS') return p.category.includes('Shorts');
    if (selectedFilter === 'BOX') return p.category.includes('Pack') || p.category.includes('Performance');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0A0D0C] flex flex-col font-sans selection:bg-[#FFB800] selection:text-black">
      
      {/* 1. Top Hazard Bar */}
      <HazardTicker />

      {/* 2. Sticky Brand Header with Transparent Logo & Custom Lab link */}
      <Navbar 
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenCustomStudio={() => setCustomStudioOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Section - Single Frame with Direct Model Image + Normal Pendulum */}
        <Hero 
          onShopClick={() => {
            const el = document.getElementById('drops');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onUnboxingClick={() => {
            const el = document.getElementById('unboxing');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCustomStudio={() => setCustomStudioOpen(true)}
        />

        {/* 4. The Drops: Akhada to Tapri Edition */}
        <section id="drops" className="py-14 bg-white relative border-b-3 border-[#0A0D0C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 bg-[#EFECE3] px-3 py-1 rounded-full border border-black/30 text-black text-[10px] font-mono-street uppercase tracking-widest font-bold">
                  <Flame className="w-3 h-3 text-[#FF3B1D]" />
                  CURRENT ACTIVE DROP
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
                  DROP 01: <span className="bg-[#FFB800] px-2 border-2 border-black inline-block rotate-[-0.7deg]">AKHADA TO TAPRI</span>
                </h2>
                <p className="text-[#555] text-xs sm:text-sm max-w-xl">
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-street tracking-wider border-2 border-black transition-all ${
                      selectedFilter === tab.value
                        ? 'bg-[#FFB800] text-black font-bold neo-shadow-sm'
                        : 'bg-white text-black hover:bg-[#EFECE3]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid: Balanced, compact, clear at a glance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onOpenDetail={(p) => setSelectedProductDetail(p)}
                  onInspectTrims={(p) => setInspectedProduct(p)}
                />
              ))}
            </div>

            {/* In-Between USP Banner */}
            <div className="mt-12 bg-[#FAF8F5] border-3 border-black rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 neo-shadow wabi-sabi-1">
              <div className="space-y-1 text-center md:text-left">
                <span className="bg-[#FF3B1D] text-white text-[9px] font-mono-street px-2 py-0.5 border border-black uppercase font-bold tracking-wider">
                  BESPOKE ARMOR
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-black text-black">
                  WANT A CUSTOM CHEST BADGE OR YOUR NICKNAME PRINTED?
                </h3>
                <p className="text-xs text-[#555] max-w-lg">
                  Use our live Custom Studio to pick your GSM, front talisman crest, comic backprint, and custom nickname. Dynamic live pricing!
                </p>
              </div>

              <button
                onClick={() => {
                  audioFX.playDhishum();
                  setCustomStudioOpen(true);
                }}
                className="shrink-0 bg-[#FFB800] hover:bg-[#FFA500] text-black text-xs font-mono-street font-bold px-5 py-2.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5 border-2 border-black neo-shadow-sm active:translate-y-0.5"
              >
                <Wand2 className="w-3.5 h-3.5 text-[#FF3B1D]" />
                <span>OPEN CUSTOM LAB</span>
              </button>
            </div>

          </div>
        </section>

        {/* 5. The Totka Look: Anatomical Trims & Fabric Exploded View */}
        <TheTotkaLook />

        {/* 6. The Totka Box: Premium-Sarcastic Packaging & Unboxing */}
        <TotkaBoxUnboxing onAddBoxToCart={handleAddBoxToCart} />

        {/* 7. Authentic Indian Akhada & Tapri Street Lore */}
        <StreetLore />

        {/* 8. Verified Reviews */}
        <section className="py-14 bg-white relative border-b-3 border-[#0A0D0C] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto space-y-1.5 mb-10">
              <span className="text-[10px] font-mono-street uppercase tracking-widest text-black font-bold">
                ★ 100% VERIFIED NAZAR SURVIVORS ★
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-black tracking-tight">
                TESTED UNDER MAXIMUM BURI NAZAR
              </h3>
              <p className="text-xs text-[#666]">
                What happens when you swap generic thin polyester for 260 GSM Indian armor:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  className={`bg-[#FAF8F5] p-4 rounded-xl border-2 border-black space-y-2.5 flex flex-col justify-between neo-shadow-sm ${
                    idx === 0 ? 'wabi-sabi-1' : idx === 1 ? 'wabi-sabi-2' : 'wabi-sabi-3'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#FFB800] gap-0.5">
                        {[...Array(item.stars)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono-street text-white bg-black px-2 py-0.5 rounded font-bold">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-xs text-[#222] leading-relaxed italic font-medium">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                    <div>
                      <span className="font-heading text-xs font-black text-black block">
                        {item.author}
                      </span>
                      <span className="text-[9px] text-[#777] font-mono-street">{item.city}</span>
                    </div>
                    <ShieldCheck className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 9. Dedicated Contact Section with User's Neo-Brutalist Uiverse Card */}
        <ContactSection />

      </main>

      {/* 10. High-Vibe Truck Art Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Detailed Cloth View Modal with hidden scrollbars */}
      <ProductDetailModal 
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* MAIN USP: Custom T-Shirt Studio Modal */}
      <CustomTeeStudio 
        isOpen={customStudioOpen}
        onClose={() => setCustomStudioOpen(false)}
        onAddToCart={(configuredProduct) => {
          handleAddToCart(configuredProduct);
          setCartOpen(true);
        }}
      />

      {/* Collar Tag Inspector Modal */}
      <CollarTagModal 
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
      />

    </div>
  );
}
