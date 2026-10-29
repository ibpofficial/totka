import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, Truck, Package, CreditCard, 
  MapPin, Phone, ArrowRight, ArrowLeft, QrCode, Sparkles, 
  Clock, AlertCircle, Copy, ExternalLink, ChevronRight, Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

const PAYMENT_METHODS = [
  {
    id: 'upi',
    name: 'UPI / Instant QR',
    badge: 'FASTEST & POPULAR',
    desc: 'Google Pay, PhonePe, Paytm, CRED & BHIM',
    icon: QrCode
  },
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    badge: 'PAY AT AKHADA',
    desc: 'Pay cash or UPI upon delivery at doorstep',
    icon: Truck
  },
  {
    id: 'card',
    name: 'Credit / Debit Card',
    badge: 'ALL BANKS',
    desc: 'Visa, Mastercard, RuPay, Amex via 256-Bit SSL',
    icon: CreditCard
  }
];

export default function OrderCheckoutModal({ 
  isOpen, 
  onClose, 
  cart = [], 
  onOrderSuccess,
  initialTrackingOrder = null
}) {
  const [step, setStep] = useState(initialTrackingOrder ? 3 : 1); // 1: Address, 2: Payment, 3: Tracking
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [copiedId, setCopiedId] = useState(false);

  // Address details
  const [address, setAddress] = useState({
    name: 'Rohan Sharma',
    phone: '9876543210',
    email: 'rohan.lifter@gmail.com',
    street: 'Plot 42, Gali No. 4, Near Akhada Gym',
    landmark: 'Opposite Tapri Chai Corner',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110006',
    lifterHandle: 'Rohan (210kg Deadlift)'
  });

  // Payment selection
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiApp, setUpiApp] = useState('gpay');
  const [totkaBlessing, setTotkaBlessing] = useState('nimbu'); // nimbu or dhaga

  // Placed Order state
  const [activeOrder, setActiveOrder] = useState(initialTrackingOrder || null);
  const [trackingTimelineStep, setTrackingTimelineStep] = useState(2); // 1 to 5

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const subtotal = activeOrder ? activeOrder.subtotal : (rawSubtotal > 0 ? rawSubtotal : 1499);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === 'TOTKA150' || code === 'BURINAZAR' || code === 'AKHADA') {
      audioFX.playDhishum();
      setCouponApplied(true);
      setDiscountAmount(150);
    } else {
      audioFX.playFlick();
      alert('Invalid code! Try "TOTKA150" or "BURINAZAR" for ₹150 off.');
    }
  };

  const handlePlaceOrder = () => {
    audioFX.playDhishum();
    const orderId = `TOTKA-AKHADA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart.length > 0 ? cart : [
        {
          id: 'totka-01',
          name: 'Buri Nazar Waale Pump Cover',
          selectedSize: 'XL',
          gsm: 260,
          price: 1499,
          quantity: 1,
          image: '/totka-tshirt-main.png'
        }
      ],
      subtotal,
      discount: discountAmount,
      total: finalTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      address: { ...address },
      blessing: totkaBlessing === 'nimbu' ? 'Lemon-Needle Ward' : 'Kala Dhaga Wristband',
      status: 'Sealed & Dispatched',
      estimatedDelivery: 'Within 2-3 Business Days'
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('totka_orders') || '[]');
      localStorage.setItem('totka_orders', JSON.stringify([newOrder, ...existing]));
    } catch {
      // ignore storage errors
    }

    setActiveOrder(newOrder);
    setTrackingTimelineStep(2);
    setStep(3);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFB800', '#FF3B1D', '#0A0D0C']
    });

    if (onOrderSuccess) {
      onOrderSuccess(newOrder);
    }
  };

  const handleCopyOrderId = () => {
    if (!activeOrder) return;
    navigator.clipboard.writeText(activeOrder.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSimulateNextStep = () => {
    audioFX.playFlick();
    setTrackingTimelineStep((prev) => (prev < 5 ? prev + 1 : 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border-4 border-black rounded-2xl shadow-[10px_10px_0_#000] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-[#FFB800] px-5 py-3.5 border-b-3 border-black flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🍋🌶️</span>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-black text-black tracking-tight uppercase leading-tight">
                {step === 3 ? 'AKHADA DISPATCH TRACKER' : 'TOTKA SECURE CHECKOUT'}
              </h2>
              <p className="text-[10px] font-mono-street font-bold text-black/80 uppercase">
                {step === 1 && 'STEP 1 OF 2: AKHADA SHIPPING DETAILS'}
                {step === 2 && 'STEP 2 OF 2: PAYMENT & TOTKA PROTECTION'}
                {step === 3 && `TRACKING ORDER ID: ${activeOrder?.id || 'TOTKA-AKHADA-9482'}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black text-white hover:bg-[#FF3B1D] border border-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-step Breadcrumb */}
        {step !== 3 && (
          <div className="bg-[#EFECE3] border-b-2 border-black/20 px-5 py-2.5 flex items-center justify-between text-xs font-mono-street font-bold">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-black' : 'text-black/50'}`}>
              <span className={`w-5 h-5 rounded-full border border-black flex items-center justify-center text-[10px] ${step === 1 ? 'bg-black text-[#FFB800]' : 'bg-white'}`}>
                1
              </span>
              <span>1. Delivery Akhada</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-black/40" />
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-black' : 'text-black/50'}`}>
              <span className={`w-5 h-5 rounded-full border border-black flex items-center justify-center text-[10px] ${step === 2 ? 'bg-black text-[#FFB800]' : 'bg-white'}`}>
                2
              </span>
              <span>2. Payment & Blessing</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-black/40" />
            <div className="flex items-center gap-1.5 text-black/40">
              <span className="w-5 h-5 rounded-full border border-black/40 bg-white flex items-center justify-center text-[10px]">
                3
              </span>
              <span>3. Live Dispatch</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar space-y-6">

          {/* ================= STEP 1: SHIPPING & ADDRESS ================= */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-black text-black tracking-wide uppercase flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF3B1D]" />
                  WHERE SHOULD WE DISPATCH YOUR ARMOR?
                </h3>
                <span className="bg-[#FFB800] text-black text-[10px] font-mono-street font-bold px-2 py-0.5 rounded border border-black">
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
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono-street text-black outline-none focus:bg-[#FFFDE6]"
                    placeholder="e.g. Rohan Sharma"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-mono-street font-bold text-[#777]">+91</span>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full bg-white border-2 border-black rounded-lg pl-11 pr-3 py-2 text-xs font-mono-street text-black outline-none focus:bg-[#FFFDE6]"
                      placeholder="98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    Street Address / Flat / Akhada Name *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono-street text-black outline-none focus:bg-[#FFFDE6]"
                    placeholder="House / Flat no, Building name, Street, Gym name"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    Nearby Landmark
                  </label>
                  <input
                    type="text"
                    value={address.landmark}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono-street text-black outline-none focus:bg-[#FFFDE6]"
                    placeholder="Opposite chai tapri, metro pillar, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-mono-street font-bold text-black uppercase">
                      City *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono-street text-black outline-none focus:bg-[#FFFDE6]"
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
                      className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono-street text-black outline-none focus:bg-[#FFFDE6]"
                      placeholder="110001"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase flex items-center justify-between">
                    <span>Lifter Handle / Nickname (Printed on Totka Card)</span>
                    <span className="text-[10px] text-[#777] font-normal">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={address.lifterHandle}
                    onChange={(e) => setAddress({ ...address, lifterHandle: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono-street text-black outline-none focus:bg-[#FFFDE6]"
                    placeholder="e.g. Rohan '200kg Squat' Sharma"
                  />
                </div>
              </div>

              {/* Free Nazar Talisman Selection */}
              <div className="bg-white p-3.5 rounded-xl border-2 border-black neo-shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold text-black uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                    CHOOSE YOUR COMPLIMENTARY TRANSIT TALISMAN
                  </span>
                  <span className="text-[10px] font-mono-street font-bold text-[#FF3B1D]">100% FREE</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTotkaBlessing('nimbu')}
                    className={`p-2.5 rounded-lg border-2 text-left font-mono-street transition-all ${
                      totkaBlessing === 'nimbu'
                        ? 'border-black bg-[#FFB800]/25 neo-shadow-sm font-bold text-black'
                        : 'border-black/30 bg-[#FAF8F5] text-black/80'
                    }`}
                  >
                    <div className="text-xs">🍋 Fresh Lemon-Chilli Ward</div>
                    <div className="text-[10px] text-[#555] mt-0.5">Tied to the external craft package</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTotkaBlessing('dhaga')}
                    className={`p-2.5 rounded-lg border-2 text-left font-mono-street transition-all ${
                      totkaBlessing === 'dhaga'
                        ? 'border-black bg-[#FFB800]/25 neo-shadow-sm font-bold text-black'
                        : 'border-black/30 bg-[#FAF8F5] text-black/80'
                    }`}
                  >
                    <div className="text-xs">🧵 Blessed Kala Dhaga</div>
                    <div className="text-[10px] text-[#555] mt-0.5">Nazar-warding wristband inside box</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: PAYMENT & COUPON ================= */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Order Summary Strip */}
              <div className="bg-[#FAF8F5] p-3 rounded-xl border-2 border-black flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-street text-[#666] uppercase block">Shipping To</span>
                  <p className="font-heading text-xs font-bold text-black">{address.name} ({address.pincode}, {address.city})</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-mono-street font-bold text-black underline hover:text-[#FF3B1D]"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="text-xs font-mono-street font-bold text-black uppercase block">
                  Select Payment Method
                </label>
                
                <div className="space-y-2.5">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => {
                          audioFX.playFlick();
                          setPaymentMethod(method.id);
                        }}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-black bg-white neo-shadow font-bold'
                            : 'border-black/30 bg-[#FAF8F5] hover:border-black'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg border border-black ${isSelected ? 'bg-[#FFB800]' : 'bg-white'}`}>
                              <Icon className="w-4 h-4 text-black" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-heading text-sm font-bold text-black">{method.name}</span>
                                <span className="text-[9px] font-mono-street bg-[#EFECE3] border border-black/40 px-1.5 py-0.2 rounded font-bold">
                                  {method.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#666] font-mono-street">{method.desc}</p>
                            </div>
                          </div>

                          <div className={`w-4 h-4 rounded-full border-2 border-black flex items-center justify-center ${isSelected ? 'bg-black' : 'bg-white'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full" />}
                          </div>
                        </div>

                        {/* UPI Sub-options */}
                        {isSelected && method.id === 'upi' && (
                          <div className="mt-3 pt-3 border-t border-black/10 flex flex-wrap gap-2 animate-in fade-in">
                            {['gpay', 'phonepe', 'paytm', 'cred', 'qr'].map((app) => (
                              <button
                                key={app}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUpiApp(app);
                                }}
                                className={`px-2.5 py-1 rounded text-xs font-mono-street font-bold border ${
                                  upiApp === app
                                    ? 'bg-black text-[#FFB800] border-black'
                                    : 'bg-white text-black border-black/30 hover:border-black'
                                }`}
                              >
                                {app === 'qr' ? '📷 Scan Dynamic QR' : app.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Card Sub-options */}
                        {isSelected && method.id === 'card' && (
                          <div className="mt-3 pt-3 border-t border-black/10 space-y-2 animate-in fade-in">
                            <input
                              type="text"
                              placeholder="Card Number (4444 8888 2222 1111)"
                              className="w-full bg-white border border-black rounded px-3 py-1.5 text-xs font-mono-street outline-none"
                              defaultValue="4532 8901 2345 6789"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="MM / YY"
                                className="w-full bg-white border border-black rounded px-3 py-1.5 text-xs font-mono-street outline-none"
                                defaultValue="08/29"
                              />
                              <input
                                type="text"
                                placeholder="CVV (***)"
                                className="w-full bg-white border border-black rounded px-3 py-1.5 text-xs font-mono-street outline-none"
                                defaultValue="786"
                              />
                            </div>
                          </div>
                        )}

                        {/* COD Info */}
                        {isSelected && method.id === 'cod' && (
                          <div className="mt-3 pt-3 border-t border-black/10 text-[11px] font-mono-street text-[#444] bg-[#FFFDE6] p-2 rounded border border-black/20 animate-in fade-in">
                            📦 <strong>No Advance Required:</strong> Pay via Cash or UPI when the BlueDart/Delhivery runner arrives at your door.
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Totka Coupon Section */}
              <div className="bg-white p-3.5 rounded-xl border-2 border-black neo-shadow-sm space-y-2">
                <label className="text-xs font-mono-street font-bold text-black uppercase flex items-center justify-between">
                  <span>Totka Discount / Akhada Coupon</span>
                  <span className="text-[10px] text-[#555]">Use "TOTKA150"</span>
                </label>
                
                {couponApplied ? (
                  <div className="flex items-center justify-between bg-[#E8F5E9] border border-[#2E7D32] px-3 py-2 rounded text-xs font-mono-street text-[#2E7D32] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      ₹150 TOTKA DISCOUNT APPLIED!
                    </span>
                    <button 
                      onClick={() => {
                        setCouponApplied(false);
                        setDiscountAmount(0);
                      }}
                      className="text-xs text-red-600 underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter promo code (e.g. TOTKA150)"
                      className="flex-1 bg-[#FAF8F5] border-2 border-black rounded px-3 py-1.5 text-xs font-mono-street uppercase text-black outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-black hover:bg-[#222] text-[#FFB800] px-3 py-1.5 rounded font-mono-street text-xs font-bold uppercase border-2 border-black neo-shadow-sm"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#EFECE3] p-3.5 rounded-xl border-2 border-black space-y-1.5 font-mono-street text-xs">
                <div className="flex justify-between text-[#555]">
                  <span>Item Subtotal ({cart.length || 1} items)</span>
                  <span className="font-bold text-black">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#555]">
                  <span>100% Nazar-Proof Packaging</span>
                  <span className="font-bold text-[#2E7D32]">FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-[#555]">
                  <span>Express Akhada Dispatch</span>
                  <span className="font-bold text-[#2E7D32]">FREE (₹0)</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#FF3B1D] font-bold">
                    <span>Totka Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-heading font-black text-black pt-2 border-t-2 border-black/20">
                  <span className="uppercase">Net Payable Amount</span>
                  <span className="text-lg">₹{finalTotal}</span>
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 3: LIVE DISPATCH & TRACKING ================= */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Order Confirmation Banner */}
              <div className="bg-[#FFB800] p-4 rounded-xl border-3 border-black neo-shadow flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 bg-black text-[#FFB800] px-2.5 py-0.5 rounded font-mono-street text-[10px] font-bold">
                    <Check className="w-3 h-3 text-[#FFB800]" />
                    ORDER OFFICIALLY SEALED
                  </div>
                  <h3 className="font-heading text-lg font-black text-black tracking-tight">
                    DISPATCH PROCESS INITIALIZED!
                  </h3>
                  <p className="text-xs text-black/80 font-mono-street">
                    Your heavyweight activewear is being infused with positive vibes & talisman protection.
                  </p>
                </div>

                <div className="bg-white px-3 py-2 rounded-lg border-2 border-black text-center shrink-0">
                  <span className="text-[10px] text-[#777] font-mono-street uppercase block">Tracking ID</span>
                  <div className="flex items-center gap-1 font-heading text-sm font-black text-black">
                    <span>{activeOrder?.id || 'TOTKA-AKHADA-9482'}</span>
                    <button 
                      onClick={handleCopyOrderId}
                      className="p-1 text-black/60 hover:text-black"
                      title="Copy Tracking ID"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Timeline Tracker */}
              <div className="bg-white p-5 rounded-xl border-2 border-black neo-shadow space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
                  <div>
                    <h4 className="font-heading text-sm font-black text-black uppercase tracking-wide flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#FF3B1D]" />
                      LIVE AKHADA DISPATCH TIMELINE
                    </h4>
                    <p className="text-[11px] text-[#666] font-mono-street">
                      Estimated Delivery: <strong className="text-black">{activeOrder?.estimatedDelivery || 'Within 2-3 Business Days'}</strong>
                    </p>
                  </div>

                  {/* Simulation button to demonstrate live updates */}
                  <button
                    onClick={handleSimulateNextStep}
                    className="bg-[#EFECE3] hover:bg-[#FFB800] text-black border border-black px-2.5 py-1 rounded text-[10px] font-mono-street font-bold flex items-center gap-1 transition-colors"
                    title="Simulate dispatch courier movement"
                  >
                    <span>⚡ SIMULATE TRANSIT</span>
                  </button>
                </div>

                {/* Timeline Steps */}
                <div className="space-y-4 pt-1">
                  {[
                    {
                      step: 1,
                      title: 'Order Placed & Talisman Verified',
                      desc: 'Customer details received. Protective Nimbu-Mirchi ritual logged.',
                      location: 'Totka Central Terminal, New Delhi',
                      time: 'Today, 02:45 PM'
                    },
                    {
                      step: 2,
                      title: '260 GSM Terry Inspected & Sealed',
                      desc: 'Drop-shoulder silhouette steamed, collar warning tag verified, and packed.',
                      location: 'Old Delhi Akhada Facility, Hub #3',
                      time: 'Today, 04:15 PM'
                    },
                    {
                      step: 3,
                      title: 'Enclosed in Hazard-Taped Craft Box',
                      desc: 'Double-walled cardboard sealed with custom hazard tape & free keychain.',
                      location: 'Delhi Central Courier Hub',
                      time: 'Estimated Today 07:30 PM'
                    },
                    {
                      step: 4,
                      title: 'In Transit with Express Logistics (BlueDart)',
                      desc: 'Dispatched via express road transit directly towards delivery city.',
                      location: 'Interstate Transit Corridor',
                      time: 'Tomorrow, 09:00 AM'
                    },
                    {
                      step: 5,
                      title: 'Out for Akhada Doorstep Delivery',
                      desc: 'Delivery partner assigned. OTP / COD cash ready for handshake.',
                      location: `${address.city} Akhada Destination`,
                      time: 'Within 48-72 Hours'
                    }
                  ].map((item) => {
                    const isDone = trackingTimelineStep >= item.step;
                    const isCurrent = trackingTimelineStep === item.step;

                    return (
                      <div key={item.step} className="flex gap-3 relative">
                        {/* Vertical line */}
                        {item.step < 5 && (
                          <div 
                            className={`absolute left-4 top-7 w-0.5 h-10 -ml-[1px] transition-colors duration-300 ${
                              trackingTimelineStep > item.step ? 'bg-black' : 'bg-black/15'
                            }`}
                          />
                        )}

                        {/* Step Icon */}
                        <div 
                          className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shrink-0 z-10 transition-transform ${
                            isCurrent
                              ? 'bg-[#FFB800] ring-4 ring-[#FFB800]/30 scale-110'
                              : isDone
                              ? 'bg-black text-white'
                              : 'bg-white text-black/30'
                          }`}
                        >
                          {isDone ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 pb-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                            <h5 className={`font-heading text-xs font-bold ${isCurrent ? 'text-black font-black text-sm' : isDone ? 'text-black' : 'text-[#888]'}`}>
                              {item.title}
                              {isCurrent && (
                                <span className="ml-2 bg-[#FF3B1D] text-white text-[9px] font-mono-street px-1.5 py-0.2 rounded font-bold uppercase inline-block">
                                  LIVE NOW
                                </span>
                              )}
                            </h5>
                            <span className="text-[10px] font-mono-street text-[#777]">{item.time}</span>
                          </div>
                          <p className="text-[11px] text-[#555] font-mono-street mt-0.5">{item.desc}</p>
                          <span className="text-[10px] text-black font-mono-street font-bold block mt-0.5">
                            📍 {item.location}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#FAF8F5] p-3 rounded-lg border-2 border-black text-xs font-mono-street space-y-1">
                  <span className="text-[10px] text-[#777] uppercase font-bold block">Delivery Destination</span>
                  <p className="font-bold text-black">{address.name} ({address.phone})</p>
                  <p className="text-[#555]">{address.street}, {address.landmark}</p>
                  <p className="text-[#555]">{address.city}, {address.state} - {address.pincode}</p>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-lg border-2 border-black text-xs font-mono-street space-y-1">
                  <span className="text-[10px] text-[#777] uppercase font-bold block">Payment & Protection</span>
                  <p className="font-bold text-black">Mode: {activeOrder?.paymentMethod || paymentMethod.toUpperCase()}</p>
                  <p className="text-[#555]">Amount: ₹{finalTotal} (All Taxes Included)</p>
                  <p className="text-[#2E7D32] font-bold">Talisman: {activeOrder?.blessing || 'Nimbu-Mirchi Attached'}</p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-white p-4 border-t-3 border-black flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-xs font-mono-street font-bold text-black border-2 border-black rounded hover:bg-[#EFECE3]"
              >
                Back to Totka Bag
              </button>

              <button
                type="button"
                onClick={() => {
                  audioFX.playFlick();
                  setStep(2);
                }}
                className="w-full sm:w-auto bg-[#FFB800] hover:bg-[#FFA500] text-black border-2 border-black px-6 py-2.5 rounded font-mono-street text-xs font-bold uppercase tracking-wider neo-shadow-sm flex items-center justify-center gap-2 active:translate-y-0.5"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-mono-street font-bold text-black border-2 border-black rounded hover:bg-[#EFECE3] flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Address</span>
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full sm:w-auto bg-[#FFB800] hover:bg-[#FFA500] text-black border-2 border-black px-7 py-3 rounded font-mono-street text-xs font-bold uppercase tracking-wider neo-shadow flex items-center justify-center gap-2 active:translate-y-0.5"
              >
                <span>CONFIRM ORDER (₹{finalTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 3 && (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <span className="text-[11px] font-mono-street text-[#555] text-center sm:text-left">
                Updates sent via WhatsApp & SMS. Keep lifting heavy.
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto bg-black text-[#FFB800] hover:bg-[#222] border-2 border-black px-5 py-2.5 rounded font-mono-street text-xs font-bold uppercase neo-shadow-sm"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

