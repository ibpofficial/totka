import React, { useState } from 'react';
import { ShoppingBag, Shield, Menu, X, Wand2, User, Truck, BookOpen, Flame } from 'lucide-react';
import LiquidGlass from './LiquidGlass';
import { audioFX } from '../utils/audio';

export default function Navbar({
  currentPage = 'home',
  onNavigate,
  cartCount,
  onOpenCart,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    setMobileMenuOpen(false);
    audioFX.playFlick();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const navItems = [
    { id: 'home', label: 'COLLECTION', icon: null },
    { id: 'custom', label: 'BESPOKE ATELIER', icon: Wand2, badge: 'USP' },
    { id: 'lookbook', label: 'LOOKBOOK', icon: BookOpen },
    { id: 'track', label: 'PARCEL DISPATCH', icon: Truck },
    { id: 'profile', label: 'LIFTER ACCOUNT', icon: User },
  ];

  return (
    <header className="sticky top-2 z-40 px-3 sm:px-6 w-full max-w-7xl mx-auto transition-all">
      {/* Floating Liquid Glass Navigation Capsule */}
      <LiquidGlass
        variant="light"
        className="px-4 sm:px-6 py-2.5 sm:py-3 border-white/70 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)]"
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Nazar Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 group text-left cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/totka-logo.png"
                alt="TOTKA Activewear"
                className="h-9 sm:h-11 w-auto object-contain drop-shadow-sm"
              />
            </button>

            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-street font-bold bg-white/80 border border-black/10 text-neutral-800 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E03115] animate-pulse" />
              <span>100% NAZAR-PROOF</span>
            </span>
          </div>

          {/* Desktop Navigation Links (Floating Glass Pill Tabs) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-neutral-200/40 rounded-full border border-black/5 text-xs font-mono-street font-bold tracking-wider">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#0E100F] text-[#FAF8F5] shadow-sm'
                      : 'text-neutral-700 hover:text-black hover:bg-white/60'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFB800]' : 'text-neutral-500'}`} />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-[#E03115] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Lifter Dossier & Cart Trigger */}
          <div className="flex items-center gap-2">
            
            {/* Quick Profile Pill */}
            <button
              onClick={() => handleNav('profile')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-street font-bold bg-white/80 hover:bg-white text-neutral-900 border border-black/10 shadow-xs transition-all cursor-pointer"
              title="Open Lifter Dossier & Order History"
            >
              <User className="w-3.5 h-3.5 text-neutral-700" />
              <span>DOSSIER</span>
            </button>

            {/* Totka Bag Pill with Live Count */}
            <button
              onClick={() => {
                audioFX.playFlick();
                onOpenCart();
              }}
              className="relative flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-mono-street font-bold bg-[#0E100F] hover:bg-black text-[#FFB800] border border-black shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FFB800]" />
              <span className="hidden sm:inline">TOTKA BAG</span>
              {cartCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#E03115] text-white text-[10px] rounded-full font-bold shadow-xs">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[10px] text-neutral-400 font-mono-street">0</span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-900 hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-black/10 space-y-1.5 font-mono-street text-xs font-bold animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-left flex items-center justify-between transition-colors ${
                    isActive ? 'bg-[#0E100F] text-[#FFB800]' : 'text-neutral-800 hover:bg-white/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="bg-[#E03115] text-white text-[9px] px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </LiquidGlass>
    </header>
  );
}
