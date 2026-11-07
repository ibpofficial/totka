import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, CreditCard, QrCode, Check, 
  ArrowLeft, ArrowRight, Lock, MapPin, Sparkles, Tag, AlertCircle 
} from 'lucide-react';
import LiquidGlass from '../components/LiquidGlass';
import { StoreService } from '../services/store';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

const PAYMENT_OPTIONS = [
  {
    id: 'upi',
    name: 'Instant UPI / Dynamic QR Code',
    badge: 'POPULAR & INSTANT',
    desc: 'Google Pay, PhonePe, Paytm, CRED & BHIM',
    icon: QrCode
  },
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    badge: 'PAY AT DOORSTEP',
    desc: 'Pay cash or UPI upon delivery at your akhada',
    icon: Truck
  },
  {
    id: 'card',
    name: 'Debit & Credit Card',
    badge: 'ALL INDIAN BANKS',
    desc: 'RuPay, Visa, Mastercard with 256-Bit SSL',
    icon: CreditCard
  }
];

export default function CheckoutPage({ cart = [], onOrderPlaced, onNavigate }) {
  const user = StoreService.getUser();
  const [address, setAddress] = useState({
    name: user.savedAddress?.name || user.name || 'Rohan Sharma',
    phone: user.savedAddress?.phone || user.phone || '9876543210',
    email: user.email || 'rohan.lifter@gmail.com',
    street: user.savedAddress?.street || 'Plot 42, Gali No. 4, Near Iron Akhada',
    landmark: user.savedAddress?.landmark || 'Opposite Tapri Chai Corner',
    city: user.savedAddress?.city || 'New Delhi',
    state: user.savedAddress?.state || 'Delhi',
    pincode: user.savedAddress?.pincode || '110006',
    lifterHandle: user.lifterHandle || 'Rohan (210kg Deadlift)'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiApp, setUpiApp] = useState('gpay');
  const [talisman, setTalisman] = useState('nimbu'); // 'nimbu' | 'dhaga'
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Fallback demo item if cart was empty
  const activeItems = cart.length > 0 ? cart : [
    {
      id: 'totka-01',
      name: 'Buri Nazar Waale, Tera Weight Drop (260 GSM)',
      price: 1499,
      quantity: 1,
      selectedSize: 'XL',
      gsm: 260,
      image: '/totka-tshirt-main.png'
    }
  ];

  const subtotal = activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const netTotal = Math.max(0, subtotal - discount);

  // Real scannable UPI QR link
  const upiUrl = `upi://pay?pa=totka@okhdfcbank&pn=TotkaActivewear&am=${netTotal}&cu=INR`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}&margin=8`;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === 'TOTKA150' || code === 'BURINAZAR' || code === 'AKHADA') {
      audioFX.playDhishum();
      setCouponApplied(true);
      setDiscount(150);
    } else {
      audioFX.playFlick();
      alert('Invalid coupon! Try "TOTKA150" or "BURINAZAR" for ₹150 off.');
    }
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    audioFX.playDhishum();

    const orderId = `TOTKA-AKHADA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: activeItems,
      subtotal,
      discount,
      total: netTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      courier: 'BlueDart Air Express (Waybill: #BD-789021)',
      currentStep: 2,
      status: 'Sealed & Dispatched from Hub #3',
      estimatedDelivery: 'Within 2-3 Business Days',
      blessing: talisman === 'nimbu' ? 'Fresh Lemon-Needle Ward Attached' : 'Blessed Kala Dhaga Wristband',
      address: { ...address }
    };

    // Save to centralized store
    StoreService.saveOrder(newOrder);
    StoreService.saveCart([]);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFB800', '#FF3B1D', '#0E100F']
    });

    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }

    if (onNavigate) {
      onNavigate('track');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#0E100F] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-street text-neutral-500 uppercase tracking-widest">
              <button onClick={() => onNavigate('home')} className="hover:text-black cursor-pointer">HOME</button>
              <span>/</span>
              <span className="text-black font-bold">BAG</span>
              <span>/</span>
              <span className="text-[#E03115] font-bold">SECURE AKHADA CHECKOUT</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
              COMMISSION YOUR DROP
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-street text-neutral-600 bg-white/80 px-3 py-1.5 rounded-full border border-black/10">
            <Lock className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>256-Bit SSL Encrypted Verification</span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Customer Address & Payment Selection */}
          <form onSubmit={handleConfirmOrder} className="lg:col-span-7 space-y-6">
            
            {/* 1. Address Section */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-black/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E03115]" />
                  1. Delivery Destination & Akhada
                </h3>
                <span className="text-[10px] font-mono-street bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30 px-2.5 py-0.5 rounded-full font-bold">
                  FREE PAN-INDIA EXPRESS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl px-3.5 py-2.5 text-xs font-mono-street text-black outline-none focus:bg-white focus:border-black"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    WhatsApp / Mobile *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-mono-street font-bold text-neutral-400">+91</span>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl pl-11 pr-3.5 py-2.5 text-xs font-mono-street text-black outline-none focus:bg-white focus:border-black"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    Street Address / Flat / Gym Name *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl px-3.5 py-2.5 text-xs font-mono-street text-black outline-none focus:bg-white focus:border-black"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    City *
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl px-3.5 py-2.5 text-xs font-mono-street text-black outline-none focus:bg-white focus:border-black"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl px-3.5 py-2.5 text-xs font-mono-street text-black outline-none focus:bg-white focus:border-black"
                    required
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase flex items-center justify-between">
                    <span>Lifter Handle (Custom Stamped on Craft Box)</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={address.lifterHandle}
                    onChange={(e) => setAddress({ ...address, lifterHandle: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl px-3.5 py-2.5 text-xs font-mono-street text-black outline-none focus:bg-white focus:border-black"
                    placeholder="e.g. Rohan '200kg Squat'"
                  />
                </div>
              </div>
            </div>

            {/* 2. Free Transit Talisman Selection */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-black/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFB800]" />
                  2. Choose Complimentary Transit Talisman
                </h3>
                <span className="text-[10px] font-mono-street font-bold text-[#E03115]">100% FREE</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTalisman('nimbu')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    talisman === 'nimbu'
                      ? 'border-black bg-[#FAF8F5] ring-2 ring-black/10'
                      : 'border-black/10 hover:border-black/30'
                  }`}
                >
                  <span className="text-xs font-mono-street font-bold text-black block">🍋 Fresh Lemon-Needle Talisman</span>
                  <span className="text-[10px] text-neutral-500 font-mono-street mt-0.5 block">Bound to outside of craft box</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTalisman('dhaga')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    talisman === 'dhaga'
                      ? 'border-black bg-[#FAF8F5] ring-2 ring-black/10'
                      : 'border-black/10 hover:border-black/30'
                  }`}
                >
                  <span className="text-xs font-mono-street font-bold text-black block">🧵 Blessed Kala Dhaga Band</span>
                  <span className="text-[10px] text-neutral-500 font-mono-street mt-0.5 block">Protective wristband enclosed inside</span>
                </button>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-black/10 shadow-xs space-y-4">
              <h3 className="font-heading text-sm font-black text-black uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-black" />
                3. Accepted Payment Options
              </h3>

              <div className="space-y-3">
                {PAYMENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = paymentMethod === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-black bg-[#FAF8F5] ring-2 ring-black/10'
                          : 'border-black/10 hover:border-black/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl border border-black/15 ${isSelected ? 'bg-[#0E100F] text-[#FFB800]' : 'bg-white text-black'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-heading text-sm font-bold text-black">{opt.name}</span>
                              <span className="text-[9px] font-mono-street bg-[#EFECE3] px-2 py-0.2 rounded font-bold">
                                {opt.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 font-mono-street">{opt.desc}</p>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border-2 border-black flex items-center justify-center ${isSelected ? 'bg-black' : 'bg-white'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full" />}
                        </div>
                      </div>

                      {/* Scannable Real Dynamic UPI QR Code Section */}
                      {isSelected && opt.id === 'upi' && (
                        <div className="mt-4 pt-4 border-t border-black/10 space-y-3 animate-in fade-in">
                          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-black/10">
                            
                            {/* The Real Scannable QR Image */}
                            <div className="shrink-0 p-2 bg-white rounded-xl border border-black/15 shadow-xs">
                              <img 
                                src={qrCodeImageUrl} 
                                alt="Totka UPI Payment QR" 
                                className="w-32 h-32 object-contain"
                              />
                            </div>

                            <div className="space-y-1.5 text-center sm:text-left flex-1">
                              <span className="bg-[#E8F5E9] text-[#2E7D32] text-[9px] font-mono-street font-bold px-2 py-0.5 rounded-full uppercase">
                                VERIFIED UPI VPA: totka@okhdfcbank
                              </span>
                              <h5 className="font-heading text-xs font-black text-black">
                                SCAN WITH ANY UPI APP (₹{netTotal})
                              </h5>
                              <p className="text-[11px] text-neutral-600 font-mono-street">
                                Scan with Google Pay, PhonePe, Paytm, or CRED. Or click below to simulate instant payment verification.
                              </p>

                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {['gpay', 'phonepe', 'paytm', 'cred'].map((app) => (
                                  <button
                                    key={app}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setUpiApp(app);
                                    }}
                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-street font-bold border transition-all cursor-pointer ${
                                      upiApp === app
                                        ? 'bg-[#0E100F] text-[#FFB800] border-black'
                                        : 'bg-white text-black border-black/15 hover:border-black'
                                    }`}
                                  >
                                    {app.toUpperCase()}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* COD Info */}
                      {isSelected && opt.id === 'cod' && (
                        <div className="mt-3 pt-3 border-t border-black/10 text-xs font-mono-street text-neutral-700 bg-[#FFFDE6] p-3 rounded-xl border border-black/10">
                          📦 <strong>Zero Prepayment Required:</strong> Inspect the hazard-taped craft box at your doorstep, then pay via Cash or any UPI scanner to the courier runner.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0E100F] hover:bg-black text-[#FFB800] py-3.5 rounded-2xl font-mono-street text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>PLACE COMMISSION & GENERATE WAYBILL (₹{netTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </form>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            
            <LiquidGlass variant="light" className="p-6 sm:p-7 border-white/80 shadow-xs space-y-4">
              <h3 className="font-heading text-sm font-black text-black uppercase tracking-wider pb-3 border-b border-black/10">
                COMMISSION SUMMARY ({activeItems.length} ITEM)
              </h3>

              {/* Items List */}
              <div className="space-y-3.5">
                {activeItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-16 object-cover object-top rounded-xl bg-white border border-black/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs font-mono-street">
                      <h4 className="font-heading text-xs font-bold text-black truncate">{item.name}</h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Size: <strong className="text-black">{item.selectedSize}</strong> • {item.gsm} GSM • Qty: {item.quantity}
                      </p>
                      <span className="font-heading text-sm font-black text-black block mt-1">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="pt-3 border-t border-black/10 space-y-2">
                <label className="text-xs font-mono-street font-bold text-black uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#E03115]" />
                    <span>Totka Coupon Code</span>
                  </span>
                  <span className="text-[10px] text-neutral-500">Try "TOTKA150"</span>
                </label>

                {couponApplied ? (
                  <div className="flex items-center justify-between bg-[#E8F5E9] border border-[#2E7D32]/30 px-3 py-2 rounded-xl text-xs font-mono-street text-[#2E7D32] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      ₹150 TOTKA CODE APPLIED!
                    </span>
                    <button 
                      type="button"
                      onClick={() => {
                        setCouponApplied(false);
                        setDiscount(0);
                      }}
                      className="text-xs text-red-600 underline font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="e.g. TOTKA150"
                      className="flex-1 bg-white/90 border border-black/15 rounded-xl px-3 py-2 text-xs font-mono-street uppercase text-black font-bold outline-none focus:bg-white focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="bg-[#0E100F] text-[#FFB800] px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="pt-3 border-t border-black/10 space-y-2 text-xs font-mono-street">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Nazar-Proof Craft Packaging</span>
                  <span className="font-bold text-[#2E7D32]">FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Pan-India BlueDart Dispatch</span>
                  <span className="font-bold text-[#2E7D32]">FREE (₹0)</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#E03115] font-bold">
                    <span>Totka Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-heading font-black text-black pt-3 border-t border-black/10">
                  <span className="uppercase">Net Payable</span>
                  <span className="text-xl">₹{netTotal}</span>
                </div>
              </div>

            </LiquidGlass>

            {/* Return & Security Note */}
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-black/10 text-xs font-mono-street space-y-1 text-neutral-600">
              <span className="font-bold text-black block">★ 7-Day Hassle-Free Size Replacement</span>
              <p>If you need a roomier box cut or different colorway, our team will pick it up from your akhada at zero return charge.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
