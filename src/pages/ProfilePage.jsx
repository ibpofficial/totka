import React, { useState, useEffect } from 'react';
import { 
  User, Package, ShieldCheck, MapPin, Phone, 
  LogIn, LogOut, Truck, Clock, Sparkles, ChevronRight, CheckCircle2, Award, Edit3, Save, Check 
} from 'lucide-react';
import LiquidGlass from '../components/LiquidGlass';
import { StoreService } from '../services/store';
import { audioFX } from '../utils/audio';

export default function ProfilePage({ onNavigate, onSelectOrderToTrack }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'dossier' | 'login'
  const [user, setUser] = useState(StoreService.getUser());
  const [orders, setOrders] = useState([]);

  // Live PR editing state
  const [editingPRs, setEditingPRs] = useState(false);
  const [prDeadlift, setPrDeadlift] = useState(user.stats?.deadlift || '210 kg');
  const [prSquat, setPrSquat] = useState(user.stats?.squat || '180 kg');
  const [prBench, setPrBench] = useState(user.stats?.bench || '135 kg');
  const [prSavedAlert, setPrSavedAlert] = useState(false);

  // Login states
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    setOrders(StoreService.getOrders());
    const currUser = StoreService.getUser();
    setUser(currUser);
    setPrDeadlift(currUser.stats?.deadlift || '210 kg');
    setPrSquat(currUser.stats?.squat || '180 kg');
    setPrBench(currUser.stats?.bench || '135 kg');
  }, []);

  const handleSavePRs = (e) => {
    e.preventDefault();
    audioFX.playDhishum();
    const updated = {
      ...user,
      stats: {
        deadlift: prDeadlift.trim(),
        squat: prSquat.trim(),
        bench: prBench.trim(),
      },
      coins: (user.coins || 650) + 50, // Reward 50 Totka coins for logging a new PR!
    };
    StoreService.saveUser(updated);
    setUser(updated);
    setEditingPRs(false);
    setPrSavedAlert(true);
    setTimeout(() => setPrSavedAlert(false), 2500);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!loginPhone.trim()) return;
    audioFX.playFlick();
    setOtpSent(true);
    setLoginOtp('7860');
  };

  const handleVerifyLogin = (e) => {
    e.preventDefault();
    audioFX.playDhishum();
    const loggedUser = {
      isLoggedIn: true,
      name: 'Pehalwan ' + loginPhone.slice(-4),
      phone: loginPhone,
      email: `lifter_${loginPhone.slice(-4)}@akhada.in`,
      lifterHandle: 'Iron Pehalwan',
      akhada: 'North Delhi Iron Akhada',
      coins: 450,
      stats: {
        deadlift: '210 kg',
        squat: '180 kg',
        bench: '135 kg',
      },
      nazarShieldLevel: 'Active (Level 75)',
    };
    StoreService.saveUser(loggedUser);
    setUser(loggedUser);
    setActiveTab('orders');
  };

  const handleLogout = () => {
    audioFX.playFlick();
    const blank = { isLoggedIn: false };
    StoreService.saveUser(blank);
    setUser(blank);
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#0E100F] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono-street text-neutral-500 uppercase tracking-widest">
              <button onClick={() => onNavigate('home')} className="hover:text-black cursor-pointer">HOME</button>
              <span>/</span>
              <span className="text-black font-bold">CLIENT DOSSIER</span>
              <span>/</span>
              <span className="text-[#E03115] font-bold">LIFTER ACCOUNT</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              {user.isLoggedIn ? user.name : 'AKHADA MEMBER LOGIN'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl font-mono-street">
              Manage your commissioned armor, review past drops, check parcel tracking logs, and update your personal PR records.
            </p>
          </div>

          {user.isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-white/80 hover:bg-white text-neutral-900 border border-black/15 px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-[#E03115]" />
              <span>LOGOUT</span>
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-black/10 pb-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#0E100F] text-[#FFB800] shadow-xs'
                : 'bg-white/80 text-neutral-700 hover:text-black border border-black/10'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>MY COMMISSIONS & ORDERS ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'dossier'
                ? 'bg-[#0E100F] text-[#FFB800] shadow-xs'
                : 'bg-white/80 text-neutral-700 hover:text-black border border-black/10'
            }`}
          >
            <User className="w-4 h-4" />
            <span>LIFTER DOSSIER & PR BENCHMARKS</span>
          </button>

          {!user.isLoggedIn && (
            <button
              onClick={() => setActiveTab('login')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-[#0E100F] text-[#FFB800] shadow-xs'
                  : 'bg-[#E03115] text-white shadow-xs'
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
              <div className="bg-white p-12 rounded-3xl border border-black/10 text-center space-y-3">
                <span className="text-3xl">📦</span>
                <h3 className="font-heading text-lg font-black text-black uppercase">NO ORDERS REGISTERED YET</h3>
                <p className="text-xs text-neutral-600 font-mono-street max-w-sm mx-auto">
                  Commission your first heavy pump cover from Drop 01 or craft your custom armor in the Bespoke Atelier.
                </p>
                <button
                  onClick={() => onNavigate('home')}
                  className="mt-2 bg-[#0E100F] text-[#FFB800] px-5 py-2.5 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider cursor-pointer"
                >
                  Explore Drop 01
                </button>
              </div>
            ) : (
              orders.map((ord, idx) => (
                <div 
                  key={ord.id || idx}
                  className="bg-white p-5 sm:p-6 rounded-3xl border border-black/10 shadow-xs space-y-4 transition-all hover:border-black/30"
                >
                  {/* Top Order Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10">
                    <div>
                      <span className="font-heading text-base font-black text-black">
                        {ord.id}
                      </span>
                      <span className="text-xs font-mono-street text-neutral-500 ml-2">
                        Commissioned on {ord.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono-street font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                        ord.status === 'Delivered to Akhada'
                          ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30'
                          : 'bg-[#FFFDE6] text-[#B78103] border border-[#B78103]/30'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
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
                          className="w-14 h-16 object-cover object-top rounded-xl bg-[#FAF8F5] border border-black/10 shrink-0" 
                        />
                        <div className="flex-1 min-w-0 text-xs font-mono-street">
                          <h4 className="font-heading text-sm font-bold text-black truncate">{item.name}</h4>
                          <p className="text-[11px] text-neutral-600 mt-0.5">
                            Size: <strong className="text-black">{item.selectedSize}</strong> • {item.gsm} GSM • Qty: {item.quantity}
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
                    <span className="text-xs font-mono-street text-neutral-600">
                      Destination: <strong className="text-black">{ord.address?.city || 'New Delhi'}</strong> ({ord.paymentMethod})
                    </span>

                    <button
                      onClick={() => {
                        audioFX.playFlick();
                        if (onSelectOrderToTrack) onSelectOrderToTrack(ord);
                        onNavigate('track');
                      }}
                      className="bg-[#0E100F] hover:bg-black text-[#FFB800] px-4 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
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

        {/* TAB 2: LIFTER DOSSIER & PR STATS */}
        {activeTab === 'dossier' && (
          <div className="space-y-6">
            
            {/* Dossier Card with Liquid Glass Accents */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-black/10 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#0E100F] text-[#FFB800] border border-black flex items-center justify-center font-heading text-2xl font-black shadow-md">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-black text-black">{user.name}</h3>
                    <p className="text-xs font-mono-street text-neutral-500">{user.lifterHandle}</p>
                    <span className="inline-block mt-1 bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono-street font-bold">
                      VERIFIED AKHADA LIFTER // BHARAT
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#FAF8F5] border border-black/10 px-4 py-2.5 rounded-2xl text-center">
                    <span className="text-[10px] font-mono-street text-neutral-500 uppercase block font-bold">Totka Coins</span>
                    <span className="font-heading text-lg font-black text-black">🪙 {user.coins || 650}</span>
                  </div>
                </div>
              </div>

              {/* Editable Verified PR Benchmarks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#E03115]" />
                    <span>RECORDED LIFTER BENCHMARKS</span>
                  </h4>

                  {!editingPRs ? (
                    <button
                      onClick={() => {
                        audioFX.playFlick();
                        setEditingPRs(true);
                      }}
                      className="text-xs font-mono-street text-[#E03115] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>UPDATE BENCHMARKS</span>
                    </button>
                  ) : null}
                </div>

                {prSavedAlert && (
                  <div className="bg-[#E8F5E9] text-[#2E7D32] p-2.5 rounded-xl border border-[#2E7D32]/30 text-xs font-mono-street font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>NEW PR BENCHMARKS REGISTERED! +50 TOTKA REWARD COINS ADDED.</span>
                  </div>
                )}

                {editingPRs ? (
                  <form onSubmit={handleSavePRs} className="bg-[#FAF8F5] p-4 rounded-2xl border border-black/15 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-mono-street font-bold text-neutral-600 uppercase block mb-1">
                          Deadlift
                        </label>
                        <input
                          type="text"
                          value={prDeadlift}
                          onChange={(e) => setPrDeadlift(e.target.value)}
                          className="w-full bg-white border border-black/20 rounded-xl px-3 py-1.5 text-xs font-mono-street font-bold text-black outline-none focus:border-black"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono-street font-bold text-neutral-600 uppercase block mb-1">
                          Barbell Squat
                        </label>
                        <input
                          type="text"
                          value={prSquat}
                          onChange={(e) => setPrSquat(e.target.value)}
                          className="w-full bg-white border border-black/20 rounded-xl px-3 py-1.5 text-xs font-mono-street font-bold text-black outline-none focus:border-black"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono-street font-bold text-neutral-600 uppercase block mb-1">
                          Flat Bench Press
                        </label>
                        <input
                          type="text"
                          value={prBench}
                          onChange={(e) => setPrBench(e.target.value)}
                          className="w-full bg-white border border-black/20 rounded-xl px-3 py-1.5 text-xs font-mono-street font-bold text-black outline-none focus:border-black"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingPRs(false)}
                        className="px-3 py-1 rounded-lg text-xs font-mono-street border border-black/20 hover:bg-neutral-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#0E100F] hover:bg-black text-[#FFB800] px-4 py-1.5 rounded-lg text-xs font-mono-street font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>SAVE BENCHMARKS</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-black/10 text-center">
                      <span className="text-[10px] font-mono-street text-neutral-500 uppercase block">Deadlift</span>
                      <span className="font-heading text-xl font-black text-black">{user.stats?.deadlift || '210 kg'}</span>
                    </div>
                    <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-black/10 text-center">
                      <span className="text-[10px] font-mono-street text-neutral-500 uppercase block">Barbell Squat</span>
                      <span className="font-heading text-xl font-black text-black">{user.stats?.squat || '180 kg'}</span>
                    </div>
                    <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-black/10 text-center">
                      <span className="text-[10px] font-mono-street text-neutral-500 uppercase block">Flat Bench Press</span>
                      <span className="font-heading text-xl font-black text-black">{user.stats?.bench || '135 kg'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Akhada & Contact */}
              <div className="space-y-2 pt-2">
                <h4 className="font-heading text-xs font-black text-black uppercase tracking-wider">
                  PRIMARY DISPATCH AKHADA
                </h4>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-black/10 text-xs font-mono-street space-y-1">
                  <p className="font-bold text-black">{user.akhada || 'North Delhi Iron Akhada'}</p>
                  <p className="text-neutral-600">Phone / WhatsApp: +91 {user.phone}</p>
                  <p className="text-neutral-600">Email ID: {user.email}</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: SIGN IN / OTP */}
        {activeTab === 'login' && (
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-black/10 shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-black text-black uppercase">
                ENTER AKHADA PORTAL
              </h3>
              <p className="text-xs text-neutral-600 font-mono-street">
                We'll transmit a secure 4-digit talisman OTP to link your orders, saved addresses, and protect your records.
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono-street font-bold text-black uppercase">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-mono-street font-bold text-neutral-400">+91</span>
                    <input
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl pl-11 pr-3 py-2.5 text-xs font-mono-street text-black outline-none focus:bg-white focus:border-black"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0E100F] hover:bg-black text-[#FFB800] py-3 rounded-xl font-mono-street text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  Send Nazar-Proof OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyLogin} className="space-y-3">
                <div className="bg-[#FFFDE6] p-2.5 rounded-xl border border-black/15 text-xs font-mono-street text-[#7A5B02]">
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
                    className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl px-3 py-2.5 text-center text-xl font-heading tracking-widest font-black outline-none focus:bg-white focus:border-black"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0E100F] hover:bg-black text-[#FFB800] py-3 rounded-xl font-mono-street text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
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
