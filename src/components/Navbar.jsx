import React, { useState } from 'react';
import { ShoppingBag, Shield, Menu, X, Wand2, User, Truck } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenCustomStudio,
  onOpenProfile,
  onOpenTracking
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    audioFX.playFlick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b-3 border-[#0A0D0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with clean transparency */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center group">
              <img 
                src="/totka-logo.png" 
                alt="TOTKA Activewear & Athletics" 
                className="h-11 md:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </a>
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFECE3] border border-black/40 text-black font-mono">
              <Shield className="w-3 h-3 text-[#FFB800]" /> 100% NAZAR-PROOF
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wider uppercase font-mono-street text-[#0A0D0C]">
            <button 
              onClick={() => scrollTo('drops')} 
              className="hover:text-[#FF3B1D] transition-colors"
            >
              The Drops
            </button>
            <button 
              onClick={() => scrollTo('totka-look')} 
              className="hover:text-[#FF3B1D] transition-colors"
            >
              The Totka Look
            </button>
            <button 
              onClick={() => scrollTo('unboxing')} 
              className="hover:text-[#FF3B1D] transition-colors"
            >
              The Box
            </button>
            <button 
              onClick={() => scrollTo('street-lore')} 
              className="hover:text-[#FF3B1D] transition-colors"
            >
              Akhada Lore
            </button>
            <button 
              onClick={() => scrollTo('contact')} 
              className="hover:text-[#FF3B1D] transition-colors flex items-center gap-1"
            >
              Contact
            </button>

            {/* Track Order Direct Button */}
            <button 
              onClick={() => {
                audioFX.playFlick();
                if (onOpenTracking) onOpenTracking();
              }}
              className="hover:text-[#FF3B1D] transition-colors flex items-center gap-1 text-[#444]"
              title="Track Active Parcel"
            >
              <Truck className="w-3.5 h-3.5 text-[#FF3B1D]" />
              <span>TRACK ORDER</span>
            </button>

            {/* Main USP Custom Lab Button */}
            <button 
              onClick={() => {
                audioFX.playFlick();
                onOpenCustomStudio();
              }}
              className="flex items-center gap-1.5 text-black bg-[#FFB800] hover:bg-[#FFA500] px-3 py-1.5 border-2 border-black rounded-lg neo-shadow-sm font-bold text-xs transition-transform active:translate-y-0.5"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#FF3B1D]" />
              <span>CUSTOM LAB</span>
              <span className="bg-black text-white text-[9px] px-1 py-0.2 rounded font-mono">USP</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* User Profile / Login Button */}
            <button
              onClick={() => {
                audioFX.playFlick();
                if (onOpenProfile) onOpenProfile();
              }}
              className="flex items-center gap-1.5 bg-white text-[#0A0D0C] border-2 border-black font-bold px-2.5 sm:px-3 py-1.5 rounded-lg text-xs neo-shadow-sm font-mono-street hover:bg-[#EFECE3] transition-colors"
              title="Akhada Profile & Order History"
            >
              <User className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">PROFILE</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => {
                audioFX.playFlick();
                onOpenCart();
              }}
              className="relative flex items-center gap-1.5 bg-white text-[#0A0D0C] border-2 border-black font-bold px-3 py-1.5 rounded-lg text-xs neo-shadow-sm font-mono-street hover:bg-[#FFB800] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BAG</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 bg-[#FF3B1D] text-white text-[10px] rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-[#FF3B1D]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b-3 border-black px-4 pt-3 pb-6 space-y-3 font-mono-street text-sm font-bold animate-in slide-in-from-top-2">
          <button 
            onClick={() => scrollTo('drops')} 
            className="block w-full text-left py-1 text-black hover:text-[#FF3B1D]"
          >
            The Drops (Drop 01)
          </button>
          <button 
            onClick={() => scrollTo('totka-look')} 
            className="block w-full text-left py-1 text-black hover:text-[#FF3B1D]"
          >
            The Totka Look & Trims
          </button>
          <button 
            onClick={() => scrollTo('unboxing')} 
            className="block w-full text-left py-1 text-black hover:text-[#FF3B1D]"
          >
            The Totka Mystery Box
          </button>
          <button 
            onClick={() => scrollTo('street-lore')} 
            className="block w-full text-left py-1 text-black hover:text-[#FF3B1D]"
          >
            Akhada & Tapri Lore
          </button>
          <button 
            onClick={() => scrollTo('contact')} 
            className="block w-full text-left py-1 text-black hover:text-[#FF3B1D]"
          >
            Contact Tapri Desk
          </button>

          <div className="pt-2 border-t border-black/20 flex gap-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTracking) onOpenTracking();
              }} 
              className="flex-1 bg-white text-black border-2 border-black py-2 rounded-lg text-xs font-mono-street font-bold flex items-center justify-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-[#FF3B1D]" />
              <span>Track Orders</span>
            </button>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProfile) onOpenProfile();
              }} 
              className="flex-1 bg-white text-black border-2 border-black py-2 rounded-lg text-xs font-mono-street font-bold flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-black" />
              <span>Lifter Profile</span>
            </button>
          </div>

          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCustomStudio();
            }} 
            className="w-full text-center text-xs font-bold bg-[#FFB800] border-2 border-black py-2.5 rounded-lg neo-shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <Wand2 className="w-4 h-4 text-[#FF3B1D]" />
            <span>CUSTOMISE YOUR TOTKA TEE (MAIN USP)</span>
          </button>
        </div>
      )}
    </header>
  );
}
