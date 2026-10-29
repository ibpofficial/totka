import React, { useState } from 'react';
import { 
  ShieldCheck, Check, Share2, MessageCircle, Globe, 
  CreditCard, Truck, RefreshCw, Lock, Sparkles, ArrowRight, Shield 
} from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    audioFX.playNazarWard();
    setSubscribed(true);
  };

  const handleNav = (page) => {
    audioFX.playFlick();
    if (onNavigate) onNavigate(page);
  };

  return (
    <footer className="bg-[#FAF8F5] text-black border-t border-black/15 relative overflow-hidden">
      
      {/* 1. Sarcastic Warning Banner (Refined Streetwear Style) */}
      <div className="bg-[#121212] text-white py-3.5 px-4 font-heading font-black text-xs sm:text-sm tracking-[0.15em] uppercase text-center flex items-center justify-center gap-3">
        <span>🌶️ BURI NAZAR WAALE TERA WEIGHT DROP...</span>
        <span className="hidden sm:inline bg-[#FFB800] text-black px-2 py-0.5 rounded font-mono-street text-[10px] font-bold">
          100% CERTIFIED TOTKA
        </span>
        <span>AUR HAMARA TEE BANGER! 🍋</span>
      </div>

      {/* 2. Trust Badges Strip */}
      <div className="border-b border-black/10 bg-white py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/15 shrink-0">
              <Lock className="w-4 h-4 text-black" />
            </div>
            <div>
              <h5 className="font-heading text-xs font-black text-black uppercase">256-Bit SSL Secured</h5>
              <p className="text-[10px] text-[#666] font-mono-street">Bank-grade encryption on all UPI & cards</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/15 shrink-0">
              <Truck className="w-4 h-4 text-[#E03115]" />
            </div>
            <div>
              <h5 className="font-heading text-xs font-black text-black uppercase">Pan-India Express Dispatch</h5>
              <p className="text-[10px] text-[#666] font-mono-street">Air courier via BlueDart & Delhivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/15 shrink-0">
              <RefreshCw className="w-4 h-4 text-black" />
            </div>
            <div>
              <h5 className="font-heading text-xs font-black text-black uppercase">7-Day Akhada Replacement</h5>
              <p className="text-[10px] text-[#666] font-mono-street">Hassle-free size exchange at zero cost</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/15 shrink-0">
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
            
            <p className="text-xs text-[#555] max-w-sm leading-relaxed font-mono-street">
              Vibrant, comic, and premium Indian activewear & comfort-wear. Heavyweight 240+ to 280 GSM silhouettes rooted in desi superstition, iron akhadas, and witty banter.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button 
                onClick={() => handleNav('track')}
                className="bg-[#121212] hover:bg-black text-[#FFB800] px-3.5 py-2 rounded-xl text-xs font-mono-street font-bold uppercase flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Truck className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Track My Parcel</span>
              </button>

              <button 
                onClick={() => handleNav('profile')}
                className="bg-white hover:bg-neutral-100 text-black border border-black/20 px-3.5 py-2 rounded-xl text-xs font-mono-street font-bold uppercase shadow-sm transition-all"
              >
                Lifter Account
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a href="#" title="Share" className="p-2.5 rounded-xl bg-white text-black hover:bg-neutral-100 border border-black/15 transition-colors shadow-sm">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#contact" title="WhatsApp Tapri" className="p-2.5 rounded-xl bg-white text-black hover:bg-neutral-100 border border-black/15 transition-colors shadow-sm">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" title="Website" className="p-2.5 rounded-xl bg-white text-black hover:bg-neutral-100 border border-black/15 transition-colors shadow-sm">
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
              <li><button onClick={() => handleNav('home')} className="hover:text-black hover:underline text-left">Drop 01: Akhada Edition</button></li>
              <li><button onClick={() => handleNav('home')} className="hover:text-black hover:underline text-left">260 GSM Pump Covers</button></li>
              <li><button onClick={() => handleNav('home')} className="hover:text-black hover:underline text-left">Nimbu-Mirchi Mesh Shorts</button></li>
              <li><button onClick={() => handleNav('lookbook')} className="hover:text-black hover:underline text-left">Editorial Lookbook</button></li>
              <li>
                <button 
                  onClick={() => handleNav('custom')}
                  className="text-black font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>Bespoke Atelier</span>
                  <span className="text-[9px] bg-[#E03115] text-white px-1.5 rounded">USP</span>
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
                  onClick={() => handleNav('track')}
                  className="text-black font-bold hover:underline flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                  <span>Live Parcel Dispatch Tracker</span>
                </button>
              </li>
              <li><button onClick={() => handleNav('profile')} className="hover:text-black hover:underline text-left">Lifter Dossier & Orders</button></li>
              <li><a href="#contact" className="hover:text-black hover:underline">Contact Tapri Desk</a></li>
              <li><a href="#contact" className="hover:text-black hover:underline">Size & GSM Selection Guide</a></li>
              <li><a href="#contact" className="hover:text-black hover:underline">7-Day Replacement Policy</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Discount */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-black text-black tracking-wider uppercase">
              NAZAR-PROOF LIFTER CLUB
            </h4>
            <p className="text-xs text-[#555] leading-relaxed font-mono-street">
              Get secret drops, comic sticker alerts, and ₹150 off code for your next PR pump cover.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-[#FFFDE6] border border-[#B78103]/40 rounded-xl text-black font-mono-street text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-600" />
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
                  className="flex-1 bg-white border border-black/20 text-xs px-3 py-2.5 rounded-xl text-black outline-none font-mono-street focus:border-black"
                />
                <button
                  type="submit"
                  className="bg-[#121212] hover:bg-black text-[#FFB800] font-mono-street px-4 py-2.5 rounded-xl uppercase text-xs font-bold transition-all shadow-sm"
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

        {/* 4. Accepted Payment Gateways */}
        <div className="mt-10 pt-6 border-t border-black/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
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

            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-white border border-black/20 rounded-lg px-2.5 py-1 text-[11px] font-mono-street font-bold text-black flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                <span>UPI / QR</span>
              </div>

              <div className="bg-white border border-black/20 rounded-lg px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#4285F4] shadow-sm">
                Google Pay
              </div>

              <div className="bg-white border border-black/20 rounded-lg px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#5f259f] shadow-sm">
                PhonePe
              </div>

              <div className="bg-white border border-black/20 rounded-lg px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#00b9f5] shadow-sm">
                Paytm
              </div>

              <div className="bg-white border border-black/20 rounded-lg px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#097939] shadow-sm">
                RuPay
              </div>

              <div className="bg-white border border-black/20 rounded-lg px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#1A1F71] shadow-sm">
                VISA
              </div>

              <div className="bg-white border border-black/20 rounded-lg px-2.5 py-1 text-[11px] font-mono-street font-bold text-[#EB001B] shadow-sm">
                Mastercard
              </div>

              <div className="bg-[#FAF8F5] border border-black/25 rounded-lg px-2.5 py-1 text-[11px] font-mono-street font-bold text-black shadow-sm">
                Cash on Delivery (COD)
              </div>
            </div>

          </div>
        </div>

        {/* 5. Copyright Bar */}
        <div className="mt-8 pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777] font-mono-street gap-2 font-medium">
          <p>
            &copy; {new Date().getFullYear()} TOTKA ACTIVEWEAR & ATHLETICS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-black font-bold">
            HAND-CRAFTED FOR STREETS & SQUATS ACROSS BHARAT 🇮🇳
          </p>
        </div>

      </div>

    </footer>
  );
}
