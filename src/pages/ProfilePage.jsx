import React, { useState, useEffect } from 'react';
import { 
  User, Package, ShieldCheck, MapPin, Phone, 
  LogIn, LogOut, Truck, Clock, Sparkles, ChevronRight, CheckCircle2, Award 
} from 'lucide-react';
import { audioFX } from '../utils/audio';

const DEFAULT_ORDERS = [
  {
    id: 'TOTKA-AKHADA-9482',
    date: '28 Oct 2026',
    items: [
      {
        id: 'totka-01',
        name: 'Buri Nazar Waale Pump Cover (260 GSM)',
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
    estimatedDelivery: 'Tomorrow, by 5:00 PM',
    blessing: 'Fresh Lemon-Needle Ward Attached',
    address: {
      name: 'Rohan Sharma',
      city: 'New Delhi',
      pincode: '110006'
    }
  },
  {
    id: 'TOTKA-AKHADA-8120',
    date: '14 Oct 2026',
    items: [
      {
        id: 'totka-02',
        name: 'Nimbu Totka Ritual Tee (280 GSM)',
        selectedSize: 'L',
        gsm: 280,
        price: 1599,
        quantity: 1,
        image: '/totka-tshirt-white.png'
      }
    ],
    subtotal: 1599,
    discount: 0,
    total: 1599,
    paymentMethod: 'CASH ON DELIVERY (COD)',
    status: 'Delivered to Akhada',
    estimatedDelivery: 'Delivered',
    blessing: 'Kala Dhaga Wristband',
    address: {
      name: 'Rohan Sharma',
      city: 'New Delhi',
      pincode: '110006'
    }
  }
];

export default function ProfilePage({ onNavigate, onSelectOrderToTrack }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'dossier' | 'login'
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
        stats: {
          deadlift: '210 kg',
          squat: '180 kg',
          bench: '135 kg'
        },
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

  useEffect(() => {
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
  }, []);

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
      coins: 450,
      stats: {
        deadlift: '200 kg',
        squat: '170 kg',
        bench: '120 kg'
      },
      nazarShieldLevel: 'Active (Level 75)'
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
    <div className="min-h-screen bg-[#F7F6F2] text-[#121212] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono-street text-[#666] uppercase tracking-widest">
              <button onClick={() => onNavigate('home')} className="hover:text-black">HOME</button>
              <span>/</span>
              <span className="text-black font-bold">CLIENT DOSSIER</span>
              <span>/</span>
              <span className="text-[#E03115] font-bold">LIFTER ACCOUNT</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              {user.isLoggedIn ? user.name : 'AKHADA MEMBER LOGIN'}
            </h1>
            <p className="text-xs sm:text-sm text-[#555] max-w-xl font-mono-street">
              Manage your commissioned armor, review past drops, check parcel tracking logs, and monitor your personal PR statistics.
            </p>
          </div>

          {user.isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-neutral-100 text-black border border-black/20 px-4 py-2 rounded-lg text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
            >
              <LogOut className="w-3.5 h-3.5 text-[#E03115]" />
              <span>LOGOUT</span>
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-black/10 pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#121212] text-[#FFB800] shadow-sm'
                : 'bg-white text-black hover:bg-neutral-100 border border-black/15'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>MY COMMISSIONS & ORDERS ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'dossier'
                ? 'bg-[#121212] text-[#FFB800] shadow-sm'
                : 'bg-white text-black hover:bg-neutral-100 border border-black/15'
            }`}
          >
            <User className="w-4 h-4" />
            <span>LIFTER DOSSIER & PR STATS</span>
          </button>

          {!user.isLoggedIn && (
            <button
              onClick={() => setActiveTab('login')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'login'
                  ? 'bg-[#121212] text-[#FFB800] shadow-sm'
                  : 'bg-[#E03115] text-white shadow-sm'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>SIGN IN VIA OTP</span>
            </button>
          )}
        </div>

        {/* TAB 1: ORDERS LIST */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-black/15 text-center space-y-3">
                <span className="text-3xl">📦</span>
                <h3 className="font-heading text-lg font-black text-black uppercase">NO ORDERS REGISTERED YET</h3>
                <p className="text-xs text-[#666] font-mono-street max-w-sm mx-auto">
                  Commission your first heavy pump cover from Drop 01 or build your custom armor in the Bespoke Atelier.
                </p>
                <button
                  onClick={() => onNavigate('home')}
                  className="mt-2 bg-black text-[#FFB800] px-5 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              orders.map((ord, idx) => (
                <div 
                  key={ord.id || idx}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-black/15 shadow-sm space-y-4 transition-all hover:border-black/30"
                >
                  {/* Top Order Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10">
                    <div>
                      <span className="font-heading text-base font-black text-black">
                        {ord.id}
                      </span>
                      <span className="text-xs font-mono-street text-[#777] ml-2">
                        Commissioned on {ord.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono-street font-bold px-2.5 py-0.5 rounded flex items-center gap-1.5 ${
                        ord.status === 'Delivered to Akhada'
                          ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30'
                          : 'bg-[#FFFDE6] text-[#B78103] border border-[#B78103]/30'
                      }`}>
                        <span className="w-2 h-2 rounded-full bg-current" />
                        {ord.status || 'In Transit'}
                      </span>
                      <span className="font-heading text-base font-black text-black">
                        ₹{ord.total}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {ord.items && ord.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <img 
                          src={item.image || '/totka-tshirt-main.png'} 
                          alt={item.name}
                          className="w-14 h-16 object-cover object-top rounded-lg bg-[#FAF8F5] border border-black/15 shrink-0" 
                        />
                        <div className="flex-1 min-w-0 text-xs font-mono-street">
                          <h4 className="font-heading text-sm font-bold text-black truncate">{item.name}</h4>
                          <p className="text-[11px] text-[#666] mt-0.5">
                            Size: <strong className="text-black">{item.selectedSize}</strong> • {item.gsm} GSM Loopback Terry • Qty: {item.quantity}
                          </p>
                          <span className="text-[10px] text-[#2E7D32] font-bold block mt-0.5">
                            ★ {ord.blessing || 'Sealed with Nimbu-Mirchi Talisman'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Actions Strip */}
                  <div className="pt-3 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xs font-mono-street text-[#666]">
                      Delivery City: <strong className="text-black">{ord.address?.city || 'New Delhi'}</strong> ({ord.paymentMethod})
                    </span>

                    <button
                      onClick={() => {
                        audioFX.playFlick();
                        if (onSelectOrderToTrack) onSelectOrderToTrack(ord);
                        onNavigate('track');
                      }}
                      className="bg-[#121212] hover:bg-black text-[#FFB800] px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>TRACK LIVE WAYBILL</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: LIFTER DOSSIER */}
        {activeTab === 'dossier' && (
          <div className="space-y-6">
            
            {/* Dossier Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-black/15 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#121212] text-[#FFB800] border border-black flex items-center justify-center font-heading text-2xl font-black shadow-md">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-black text-black">{user.name}</h3>
                    <p className="text-xs font-mono-street text-[#555]">{user.lifterHandle}</p>
                    <span className="inline-block mt-1 bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30 px-2 py-0.2 rounded text-[10px] font-mono-street font-bold">
                      VERIFIED AKHADA LIFTER // BHARAT
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#FAF8F5] border border-black/15 px-3 py-2 rounded-xl text-center">
                    <span className="text-[10px] font-mono-street text-[#777] uppercase block">Totka Reward Coins</span>
                    <span className="font-heading text-lg font-black text-black">🪙 {user.coins || 650}</span>
                  </div>
                </div>
              </div>

              {/* Verified PR Statistics */}
              <div className="space-y-2">
                <h4 className="font-heading text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#E03115]" />
                  <span>RECORDED LIFTER BENCHMARKS</span>
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-black/15 text-center">
                    <span className="text-[10px] font-mono-street text-[#777] uppercase block">Conventional Deadlift</span>
                    <span className="font-heading text-xl font-black text-black">{user.stats?.deadlift || '210 kg'}</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-black/15 text-center">
                    <span className="text-[10px] font-mono-street text-[#777] uppercase block">Barbell Squat</span>
                    <span className="font-heading text-xl font-black text-black">{user.stats?.squat || '180 kg'}</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-black/15 text-center">
                    <span className="text-[10px] font-mono-street text-[#777] uppercase block">Flat Bench Press</span>
                    <span className="font-heading text-xl font-black text-black">{user.stats?.bench || '135 kg'}</span>
                  </div>
                </div>
              </div>

              {/* Primary Akhada & Contact */}
              <div className="space-y-2 pt-2">
                <h4 className="font-heading text-xs font-black text-black uppercase tracking-wider">
                  PRIMARY DISPATCH AKHADA
                </h4>
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-black/15 text-xs font-mono-street space-y-1">
                  <p className="font-bold text-black">{user.akhada || 'North Delhi Iron Akhada'}</p>
                  <p className="text-[#666]">Phone / WhatsApp: +91 {user.phone}</p>
                  <p className="text-[#666]">Email ID: {user.email}</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: SIGN IN / OTP */}
        {activeTab === 'login' && (
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-black/15 shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-black text-black uppercase">
                ENTER AKHADA PORTAL
              </h3>
              <p className="text-xs text-[#666] font-mono-street">
                We'll transmit a secure 4-digit talisman OTP to link your orders and protect your records.
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-mono-street font-bold text-[#777]">+91</span>
                    <input
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full bg-[#FAF8F5] border border-black/20 rounded-xl pl-11 pr-3 py-2.5 text-xs font-mono-street text-black outline-none focus:bg-white focus:border-black"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#121212] hover:bg-black text-[#FFB800] py-3 rounded-xl font-mono-street text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Send Nazar-Proof OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyLogin} className="space-y-3">
                <div className="bg-[#FFFDE6] p-2.5 rounded-xl border border-black/20 text-xs font-mono-street text-[#7A5B02]">
                  Demo OTP automatically dispatched: <strong className="text-black">7860</strong>
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
                    className="w-full bg-[#FAF8F5] border border-black/20 rounded-xl px-3 py-2.5 text-center text-xl font-heading tracking-widest font-black outline-none focus:bg-white focus:border-black"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#121212] hover:bg-black text-[#FFB800] py-3 rounded-xl font-mono-street text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Verify & Access Dossier
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

