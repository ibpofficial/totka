import React, { useState, useEffect } from 'react';
import { 
  X, User, Package, ShieldCheck, MapPin, Phone, 
  LogIn, LogOut, Truck, Clock, Sparkles, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { audioFX } from '../utils/audio';

const DEFAULT_ORDERS = [
  {
    id: 'TOTKA-AKHADA-8120',
    date: '24 Oct 2026',
    items: [
      {
        id: 'totka-01',
        name: 'Buri Nazar Waale Pump Cover (Mineral Charcoal)',
        selectedSize: 'XL',
        gsm: 260,
        price: 1499,
        quantity: 1,
        image: '/totka-tshirt-main.png'
      }
    ],
    subtotal: 1499,
    discount: 150,
    total: 1349,
    paymentMethod: 'UPI (GPAY)',
    status: 'In Transit',
    estimatedDelivery: 'Tomorrow, by 4:00 PM',
    blessing: 'Fresh Lemon-Needle Ward',
    address: {
      name: 'Rohan Sharma',
      city: 'New Delhi',
      pincode: '110006'
    }
  }
];

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  onOpenTrackingForOrder 
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'profile', 'login'
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('totka_user');
      return saved ? JSON.parse(saved) : {
        isLoggedIn: true,
        name: 'Rohan Sharma',
        phone: '9876543210',
        email: 'rohan.lifter@gmail.com',
        lifterHandle: 'Rohan (210kg Deadlift)',
        akhada: 'North Delhi Iron Akhada',
        coins: 650,
        nazarShieldLevel: 'MAX (Level 99)'
      };
    } catch {
      return { isLoggedIn: false };
    }
  });

  const [orders, setOrders] = useState([]);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Load orders on open
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('totka_orders') || '[]');
        if (stored.length > 0) {
          setOrders(stored);
        } else {
          setOrders(DEFAULT_ORDERS);
        }
      } catch {
        setOrders(DEFAULT_ORDERS);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!loginPhone) return;
    audioFX.playFlick();
    setOtpSent(true);
    setLoginOtp('7860');
  };

  const handleVerifyLogin = (e) => {
    e.preventDefault();
    audioFX.playDhishum();
    const loggedUser = {
      isLoggedIn: true,
      name: 'Lifter ' + loginPhone.slice(-4),
      phone: loginPhone,
      email: `lifter_${loginPhone.slice(-4)}@akhada.in`,
      lifterHandle: 'Iron Pehalwan',
      akhada: 'Old Delhi Powerhouse',
      coins: 300,
      nazarShieldLevel: 'Active (Level 50)'
    };
    setUser(loggedUser);
    localStorage.setItem('totka_user', JSON.stringify(loggedUser));
    setActiveTab('orders');
  };

  const handleLogout = () => {
    audioFX.playFlick();
    const blank = { isLoggedIn: false };
    setUser(blank);
    localStorage.removeItem('totka_user');
    setActiveTab('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border-4 border-black rounded-2xl shadow-[10px_10px_0_#000] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#FFB800] px-5 py-3.5 border-b-3 border-black flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black text-[#FFB800] border border-black flex items-center justify-center font-black">
              ⚡
            </div>
            <div>
              <h2 className="font-heading text-lg font-black text-black tracking-tight uppercase leading-tight">
                AKHADA LIFTER PROFILE & DISPATCH
              </h2>
              <p className="text-[10px] font-mono-street font-bold text-black/80 uppercase">
                {user.isLoggedIn ? `MEMBER: ${user.name}` : 'GUEST / LOGIN REQUIRED'}
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

        {/* Tab Navigation */}
        <div className="bg-[#EFECE3] border-b-2 border-black/20 px-5 py-2 flex items-center gap-2 text-xs font-mono-street font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-black text-[#FFB800] border-black neo-shadow-sm'
                : 'bg-white text-black border-black/30 hover:border-black'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>MY ORDERS & DISPATCH ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-black text-[#FFB800] border-black neo-shadow-sm'
                : 'bg-white text-black border-black/30 hover:border-black'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>LIFTER DOSSIER</span>
          </button>

          {!user.isLoggedIn && (
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-black text-[#FFB800] border-black neo-shadow-sm'
                  : 'bg-[#FF3B1D] text-white border-black'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>QUICK LOGIN</span>
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar space-y-5">
          
          {/* ================= TAB 1: ORDERS & TRACKING ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-black text-black uppercase tracking-wide flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#FF3B1D]" />
                  ACTIVE ORDERS & PARCEL LOG
                </h3>
                <span className="text-[10px] font-mono-street bg-[#FFB800] text-black px-2 py-0.5 rounded border border-black font-bold">
                  LIVE STATUS
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border-2 border-black text-center space-y-2">
                  <p className="text-2xl">📦</p>
                  <h4 className="font-heading text-sm font-black text-black uppercase">NO ORDERS FOUND YET</h4>
                  <p className="text-xs text-[#666] font-mono-street">Pick your heavy pump cover from Drop 01 or craft your custom tee!</p>
                </div>
              ) : (
                orders.map((ord, idx) => (
                  <div 
                    key={ord.id || idx}
                    className="bg-white p-4 rounded-xl border-2 border-black neo-shadow-sm space-y-3"
                  >
                    {/* Top Order Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-black/10">
                      <div>
                        <span className="font-heading text-xs font-black text-black">
                          {ord.id}
                        </span>
                        <span className="text-[10px] text-[#777] font-mono-street ml-2">
                          Ordered on {ord.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/40 text-[10px] font-mono-street font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {ord.status || 'Dispatched'}
                        </span>
                        <span className="font-heading text-xs font-black text-black">
                          ₹{ord.total}
                        </span>
                      </div>
                    </div>

                    {/* Items in this order */}
                    <div className="space-y-2">
                      {ord.items && ord.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img 
                            src={item.image || '/totka-tshirt-main.png'} 
                            alt={item.name}
                            className="w-11 h-13 object-cover rounded bg-[#EFECE3] border border-black/20 shrink-0" 
                          />
                          <div className="flex-1 min-w-0 text-xs font-mono-street">
                            <h5 className="font-heading text-xs font-bold text-black truncate">{item.name}</h5>
                            <p className="text-[10px] text-[#666]">
                              Size: <strong>{item.selectedSize}</strong> • {item.gsm} GSM Terry • Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-2 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="text-[10px] font-mono-street text-[#666]">
                        <span>Protection: </span>
                        <strong className="text-black">{ord.blessing || 'Nimbu-Mirchi Ward Sealed'}</strong>
                      </div>

                      <button
                        onClick={() => {
                          audioFX.playFlick();
                          onClose();
                          if (onOpenTrackingForOrder) {
                            onOpenTrackingForOrder(ord);
                          }
                        }}
                        className="bg-[#FFB800] hover:bg-[#FFA500] text-black border border-black px-3 py-1.5 rounded text-xs font-mono-street font-bold uppercase flex items-center gap-1 neo-shadow-sm active:translate-y-0.5"
                      >
                        <Truck className="w-3.5 h-3.5 text-black" />
                        <span>LIVE DISPATCH TRACKING</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {/* ================= TAB 2: LIFTER DOSSIER ================= */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-black neo-shadow space-y-4">
                <div className="flex items-center gap-3.5 pb-3 border-b-2 border-black/10">
                  <div className="w-14 h-14 rounded-xl bg-[#FFB800] border-2 border-black flex items-center justify-center font-heading text-2xl font-black">
                    💪
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-black text-black">
                      {user.name || 'Anonymous Lifter'}
                    </h4>
                    <p className="text-xs text-[#555] font-mono-street">
                      {user.lifterHandle || 'Official Totka Enthusiast'}
                    </p>
                    <span className="inline-block mt-1 bg-black text-[#FFB800] px-2 py-0.2 rounded text-[9px] font-mono-street font-bold">
                      VERIFIED AKHADA MEMBER
                    </span>
                  </div>
                </div>

                {/* Nazar & Lifter Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-black text-center">
                    <span className="text-[10px] font-mono-street text-[#777] block uppercase">Totka Coins</span>
                    <span className="font-heading text-base font-black text-black">🪙 {user.coins || 450}</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-black text-center">
                    <span className="text-[10px] font-mono-street text-[#777] block uppercase">Nazar Ward</span>
                    <span className="font-heading text-base font-black text-[#2E7D32]">100% SHIELD</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-black text-center col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-mono-street text-[#777] block uppercase">Home Akhada</span>
                    <span className="font-heading text-xs font-black text-black truncate block">{user.akhada || 'Old Delhi Hub'}</span>
                  </div>
                </div>

                {/* Contact details */}
                <div className="space-y-2 text-xs font-mono-street bg-[#FAF8F5] p-3 rounded-lg border border-black/20">
                  <div className="flex justify-between">
                    <span className="text-[#666]">Phone / WhatsApp:</span>
                    <span className="font-bold text-black">+91 {user.phone || '9876543210'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Email ID:</span>
                    <span className="font-bold text-black">{user.email || 'rohan.lifter@gmail.com'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Primary Dispatch:</span>
                    <span className="font-bold text-black">New Delhi (110006)</span>
                  </div>
                </div>

                {user.isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="text-xs font-mono-street font-bold text-[#FF3B1D] hover:underline flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out of Profile</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 3: LOGIN / OTP ================= */}
          {activeTab === 'login' && (
            <div className="bg-white p-5 rounded-xl border-2 border-black neo-shadow space-y-4">
              <div className="space-y-1">
                <h4 className="font-heading text-base font-black text-black uppercase">
                  ENTER AKHADA WITH MOBILE NUMBER
                </h4>
                <p className="text-xs text-[#666] font-mono-street">
                  We'll send a 4-digit talisman OTP to link your orders, track parcels, and protect your PRs.
                </p>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono-street font-bold text-black uppercase">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-mono-street font-bold text-[#777]">+91</span>
                      <input
                        type="tel"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full bg-[#FAF8F5] border-2 border-black rounded-lg pl-11 pr-3 py-2 text-xs font-mono-street outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFB800] hover:bg-[#FFA500] text-black border-2 border-black py-2.5 rounded font-mono-street text-xs font-bold uppercase tracking-wider neo-shadow-sm"
                  >
                    Send Nazar-Proof OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyLogin} className="space-y-3">
                  <div className="bg-[#FFFDE6] p-2.5 rounded border border-black/30 text-xs font-mono-street">
                    Demo OTP sent: <strong className="text-black">7860</strong>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono-street font-bold text-black uppercase">
                      Enter 4-Digit OTP
                    </label>
                    <input
                      type="text"
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      maxLength={4}
                      className="w-full bg-[#FAF8F5] border-2 border-black rounded-lg px-3 py-2 text-center text-lg font-heading tracking-widest font-black outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFB800] hover:bg-[#FFA500] text-black border-2 border-black py-2.5 rounded font-mono-street text-xs font-bold uppercase tracking-wider neo-shadow-sm"
                  >
                    Verify & Enter Akhada
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#FAF8F5] p-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-mono-street text-[#666]">
          <span>Protected by 256-Bit Totka Encryption</span>
          <button onClick={onClose} className="font-bold text-black hover:underline">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
