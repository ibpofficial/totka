import React, { useState } from 'react';
import { ShoppingBag, Shield, Menu, X, Wand2, User, Truck, BookOpen } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function Navbar({ 
  currentPage = 'home',
  onNavigate,
  cartCount, 
  onOpenCart 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    setMobileMenuOpen(false);
    audioFX.playFlick();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-black/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with clean transparency */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNav('home')} 
              className="flex items-center group text-left cursor-pointer"
            >
              <img 
                src="/totka-logo.png" 
                alt="TOTKA Activewear & Athletics" 
                className="h-11 md:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFECE3] border border-black/20 text-black font-mono">
              <Shield className="w-3 h-3 text-[#FFB800]" /> 100% NAZAR-PROOF
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wider uppercase font-mono-street text-[#121212]">
            <button 
              onClick={() => handleNav('home')} 
              className={`transition-colors relative py-1 ${
                currentPage === 'home' ? 'text-black font-black' : 'text-neutral-600 hover:text-black'
              }`}
            >
              <span>COLLECTION</span>
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded" />
              )}
            </button>

            {/* Bespoke Studio (Main USP) */}
            <button 
              onClick={() => handleNav('custom')} 
              className={`transition-colors relative py-1 flex items-center gap-1.5 ${
                currentPage === 'custom' ? 'text-black font-black' : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-[#E03115]" />
              <span>BESPOKE ATELIER</span>
              <span className="bg-[#121212] text-[#FFB800] text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
                USP
              </span>
              {currentPage === 'custom' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded" />
              )}
            </button>

            {/* Lookbook */}
            <button 
              onClick={() => handleNav('lookbook')} 
              className={`transition-colors relative py-1 flex items-center gap-1.5 ${
                currentPage === 'lookbook' ? 'text-black font-black' : 'text-neutral-600 hover:text-black'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-black" />
              <span>EDITORIAL LOOKBOOK</span>
              {currentPage === 'lookbook' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded" />
              )}
            </button>

            {/* Track Order Direct Button */}
            <button 
              onClick={() => handleNav('track')} 
              className={`transition-colors relative py-1 flex items-center gap-1.5 ${
                currentPage === 'track' ? 'text-black font-black' : 'text-neutral-600 hover:text-black'
              }`}
              title="Track Active Parcel"
            >
              <Truck className="w-3.5 h-3.5 text-[#E03115]" />
              <span>PARCEL DISPATCH</span>
              {currentPage === 'track' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded" />
              )}
            </button>

            {/* Lifter Profile */}
            <button 
              onClick={() => handleNav('profile')} 
              className={`transition-colors relative py-1 flex items-center gap-1.5 ${
                currentPage === 'profile' ? 'text-black font-black' : 'text-neutral-600 hover:text-black'
              }`}
            >
              <User className="w-3.5 h-3.5 text-black" />
              <span>LIFTER ACCOUNT</span>
              {currentPage === 'profile' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded" />
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Lifter Profile Quick Button */}
            <button
              onClick={() => handleNav('profile')}
              className="hidden sm:flex items-center gap-1.5 bg-white text-[#121212] border border-black/20 font-bold px-3 py-2 rounded-xl text-xs font-mono-street hover:bg-neutral-100 transition-colors shadow-sm"
              title="Lifter Dossier & Orders"
            >
              <User className="w-4 h-4 text-black" />
              <span>DOSSIER</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => {
                audioFX.playFlick();
                onOpenCart();
              }}
              className="relative flex items-center gap-2 bg-[#121212] hover:bg-black text-[#FFB800] border border-black font-bold px-3.5 py-2 rounded-xl text-xs font-mono-street transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFB800]" />
              <span className="hidden sm:inline">TOTKA BAG</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 bg-[#E03115] text-white text-[10px] rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-[#E03115]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-black/20 px-4 pt-3 pb-6 space-y-2 font-mono-street text-xs font-bold animate-in slide-in-from-top-2">
          <button 
            onClick={() => handleNav('home')} 
            className="block w-full text-left py-2 text-black hover:text-[#E03115] border-b border-black/10"
          >
            COLLECTION (DROP 01)
          </button>
          <button 
            onClick={() => handleNav('custom')} 
            className="w-full text-left py-2 text-black hover:text-[#E03115] border-b border-black/10 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-[#E03115]" />
              <span>BESPOKE ATELIER</span>
            </span>
            <span className="bg-[#121212] text-[#FFB800] text-[9px] px-1.5 py-0.5 rounded">USP</span>
          </button>
          <button 
            onClick={() => handleNav('lookbook')} 
            className="block w-full text-left py-2 text-black hover:text-[#E03115] border-b border-black/10"
          >
            EDITORIAL LOOKBOOK & CRAFT
          </button>
          <button 
            onClick={() => handleNav('track')} 
            className="block w-full text-left py-2 text-black hover:text-[#E03115] border-b border-black/10 flex items-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#E03115]" />
            <span>PARCEL DISPATCH & WAYBILL</span>
          </button>
          <button 
            onClick={() => handleNav('profile')} 
            className="block w-full text-left py-2 text-black hover:text-[#E03115] flex items-center gap-2"
          >
            <User className="w-4 h-4 text-black" />
            <span>LIFTER ACCOUNT & ORDERS</span>
          </button>
        </div>
      )}
    </header>
  );
}
