import React, { useState } from 'react';
import { 
  ShieldCheck, Check, Share2, MessageCircle, Globe, 
  CreditCard, Truck, RefreshCw, Lock, Sparkles, ArrowRight, Shield 
} from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function Footer({ onOpenTracking, onOpenProfile, onOpenCustomStudio }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    audioFX.playNazarWard();
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#FAF8F5] text-black border-t-4 border-black relative overflow-hidden">
      
      {/* 1. Truck Art Warning Banner */}
      <div className="bg-[#FFB800] text-black py-3 px-4 border-b-3 border-black font-heading font-black text-sm sm:text-base tracking-wider uppercase text-center flex items-center justify-center gap-3">
        <span>🌶️ BURI NAZAR WAALE TERA WEIGHT DROP...</span>
        <span className="hidden sm:inline bg-black text-[#FFB800] px-2 py-0.5 rounded font-mono-street text-[10px] font-bold">
          100% CERTIFIED TOTKA
        </span>
        <span>AUR HAMARA TEE BANGER! 🍋</span>
      </div>

      {/* 2. Trust Badges Strip */}
      <div className="border-b-2 border-black/15 bg-white py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#FAF8F5] border border-black shrink-0">
              <Lock className="w-4 h-4 text-black" />
            </div>
            <div>
              <h5 className="font-heading text-xs font-black text-black uppercase">256-Bit SSL Secured</h5>
              <p className="text-[10px] text-[#666] font-mono-street">Bank-grade encryption on all UPI & cards</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#FAF8F5] border border-black shrink-0">
              <Truck className="w-4 h-4 text-[#FF3B1D]" />
            </div>
            <div>
              <h5 className="font-heading text-xs font-black text-black uppercase">Pan-India Express Dispatch</h5>
              <p className="text-[10px] text-[#666] font-mono-street">Air courier via BlueDart & Delhivery</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#FAF8F5] border border-black shrink-0">
              <RefreshCw className="w-4 h-4 text-black" />
            </div>
            <div>
              <h5 className="font-heading text-xs font-black text-black uppercase">7-Day Akhada Replacement</h5>
              <p className="text-[10px] text-[#666] font-mono-street">Hassle-free size exchange at zero cost</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#FAF8F5] border border-black shrink-0">
              <Sparkles className="w-4 h-4 text-[#FFB800]" />
            </div>
            <div>
              <h5 className="font-heading text-xs font-black text-black uppercase">Nazar-Proof Packaging</h5>
              <p className="text-[10px] text-[#666] font-mono-street">Sealed with craft box & complimentary talisman</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/totka-logo.png" 
                alt="Totka Activewear Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            <p className="text-xs text-[#555] max-w-sm leading-relaxed">
              Vibrant, comic, and premium Indian activewear & comfort-wear. Heavyweight 240+ to 280 GSM silhouettes rooted in desi superstition, iron akhadas, and witty bakchodi.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button 
                onClick={() => {
                  audioFX.playFlick();
                  if (onOpenTracking) onOpenTracking();
                }}
                className="bg-[#FFB800] hover:bg-[#FFA500] text-black border-2 border-black px-3 py-1.5 rounded text-xs font-mono-street font-bold uppercase flex items-center gap-1.5 neo-shadow-sm active:translate-y-0.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Track My Parcel</span>
              </button>

              <button 
                onClick={() => {
                  audioFX.playFlick();
                  if (onOpenProfile) onOpenProfile();
                }}
                className="bg-white hover:bg-[#EFECE3] text-black border-2 border-black px-3 py-1.5 rounded text-xs font-mono-street font-bold uppercase neo-shadow-sm"
              >
                Lifter Profile
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a href="#" title="Share" className="p-2 rounded bg-white text-black hover:bg-[#FFB800] border-2 border-black transition-colors neo-shadow-sm">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#contact" title="WhatsApp Tapri" className="p-2 rounded bg-white text-black hover:bg-[#FFB800] border-2 border-black transition-colors neo-shadow-sm">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" title="Website" className="p-2 rounded bg-white text-black hover:bg-[#FFB800] border-2 border-black transition-colors neo-shadow-sm">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: The Arsenal Links */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="font-heading text-xs font-black text-black tracking-wider uppercase">
              THE ARSENAL
            </h4>
            <ul className="space-y-1.5 text-xs text-[#555] font-mono-street font-medium">
              <li><a href="#drops" className="hover:text-black hover:underline">Drop 01: Akhada Edition</a></li>
              <li><a href="#drops" className="hover:text-black hover:underline">260 GSM Pump Covers</a></li>
              <li><a href="#drops" className="hover:text-black hover:underline">Nimbu-Mirchi Mesh Shorts</a></li>
              <li><a href="#unboxing" className="hover:text-black hover:underline">The Totka Mystery Box</a></li>
              <li>
                <button 
                  onClick={() => {
                    audioFX.playFlick();
                    if (onOpenCustomStudio) onOpenCustomStudio();
                  }}
                  className="text-black font-bold hover:underline flex items-center gap-1"
                >
                  <span>Bespoke Custom Lab</span>
                  <span className="text-[9px] bg-[#FF3B1D] text-white px-1 rounded">USP</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Tracking */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-heading text-xs font-black text-black tracking-wider uppercase">
              CUSTOMER CARE & ORDERS
            </h4>
            <ul className="space-y-1.5 text-xs text-[#555] font-mono-street font-medium">
              <li>
                <button 
                  onClick={() => {
                    audioFX.playFlick();
                    if (onOpenTracking) onOpenTracking();
                  }}
                  className="text-black font-bold hover:underline flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                  <span>Live Parcel Dispatch Tracker</span>
                </button>
              </li>
              <li><a href="#contact" className="hover:text-black hover:underline">Contact Tapri Desk</a></li>
              <li><a href="#contact" className="hover:text-black hover:underline">Size & GSM Selection Guide</a></li>
              <li><a href="#contact" className="hover:text-black hover:underline">Shipping & Dispatch Timelines</a></li>
              <li><a href="#contact" className="hover:text-black hover:underline">7-Day Replacement Policy</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Discount */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-black text-black tracking-wider uppercase">
              NAZAR-PROOF LIFTER CLUB
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              Get secret drops, comic sticker alerts, and ₹150 off code for your next PR pump cover.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-[#FFB800] border-2 border-black rounded text-black font-mono-street text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>You're protected! Use code <strong>TOTKA150</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter lifter email..."
                  required
                  className="flex-1 bg-white border-2 border-black text-xs px-3 py-2 rounded text-black outline-none font-mono-street"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-[#222] text-[#FFB800] font-mono-street px-3 py-2 rounded uppercase text-xs font-bold border-2 border-black neo-shadow-sm active:translate-y-0.5"
                >
                  JOIN
                </button>
              </form>
            )}

            <div className="font-mono-street text-[10px] text-[#777] flex items-center gap-1.5 font-medium">
              <Shield className="w-3.5 h-3.5 text-black" /> 100% Spam Free • Self-Certified Good Luck
            </div>
          </div>

        </div>

        {/* 4. Detailed Payment Methods & Gateways Grid */}
        <div className="mt-10 pt-6 border-t-2 border-black/15">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Payment Details Text */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-black" />
                <h5 className="font-heading text-xs font-black text-black uppercase tracking-wider">
                  ACCEPTED PAYMENT METHODS & DISPATCH GATEWAYS
                </h5>
              </div>
              <p className="text-[11px] text-[#666] font-mono-street max-w-xl">
                100% encrypted transactions. Instant UPI verification, all major credit & debit cards, and Cash on Delivery (COD) across 19,000+ Indian pincodes.
              </p>
            </div>

            {/* Badges / Logos */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-white border border-black/30 rounded px-2.5 py-1 text-[11px] font-mono-street font-bold text-black flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                <span>UPI / QR</span>
              </div>

              <div className="bg-white border border-black/30 rounded px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#4285F4] shadow-sm">
                Google Pay
              </div>

              <div className="bg-white border border-black/30 rounded px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#5f259f] shadow-sm">
                PhonePe
              </div>

              <div className="bg-white border border-black/30 rounded px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#00b9f5] shadow-sm">
                Paytm
              </div>

              <div className="bg-white border border-black/30 rounded px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#097939] shadow-sm">
                RuPay
              </div>

              <div className="bg-white border border-black/30 rounded px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#1A1F71] shadow-sm">
                VISA
              </div>

              <div className="bg-white border border-black/30 rounded px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#EB001B] shadow-sm">
                Mastercard
              </div>

              <div className="bg-[#FFB800] border border-black rounded px-2.5 py-1 text-[11px] font-mono-street font-bold text-black shadow-sm">
                Cash on Delivery (COD)
              </div>
            </div>

          </div>
        </div>

        {/* 5. Bottom Copyright Bar */}
        <div className="mt-8 pt-4 border-t-2 border-black/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666] font-mono-street gap-2 font-medium">
          <p>
            &copy; {new Date().getFullYear()} TOTKA ACTIVEWEAR & ATHLETICS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-black font-bold">
              HAND-CRAFTED FOR STREETS & SQUATS ACROSS BHARAT 🇮🇳
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
}
