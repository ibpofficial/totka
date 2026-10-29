import React, { useState, useEffect } from 'react';
import { 
  Truck, Check, Clock, Package, MapPin, Search, 
  ShieldCheck, AlertCircle, Sparkles, Copy, ChevronRight 
} from 'lucide-react';
import { audioFX } from '../utils/audio';

const DEFAULT_ACTIVE_ORDER = {
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
  courier: 'BlueDart Air Express (Waybill: #BD-789021)',
  status: 'In Transit via Express Cargo',
  estimatedDelivery: 'Tomorrow, by 5:00 PM',
  blessing: 'Fresh Lemon-Needle Ward Attached',
  address: {
    name: 'Rohan Sharma',
    phone: '9876543210',
    street: 'Plot 42, Gali No. 4, Near Akhada Gym',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110006'
  }
};

export default function TrackOrderPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState(DEFAULT_ACTIVE_ORDER);
  const [trackingStep, setTrackingStep] = useState(3); // 1 to 5
  const [copied, setCopied] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('totka_orders') || '[]');
      if (stored.length > 0) {
        setActiveOrder(stored[0]);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    audioFX.playFlick();

    try {
      const stored = JSON.parse(localStorage.getItem('totka_orders') || '[]');
      const match = stored.find(
        (o) => o.id.toLowerCase() === searchQuery.trim().toLowerCase()
      );
      if (match) {
        setActiveOrder(match);
      } else {
        // Mock custom query
        setActiveOrder({
          ...DEFAULT_ACTIVE_ORDER,
          id: searchQuery.trim().toUpperCase()
        });
      }
    } catch {
      setActiveOrder({
        ...DEFAULT_ACTIVE_ORDER,
        id: searchQuery.trim().toUpperCase()
      });
    }
  };

  const handleCopyTrackingId = () => {
    navigator.clipboard.writeText(activeOrder.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateStep = () => {
    audioFX.playFlick();
    setTrackingStep((prev) => (prev < 5 ? prev + 1 : 1));
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#121212] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="space-y-1.5 border-b border-black/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono-street text-[#666] uppercase tracking-widest">
            <button onClick={() => onNavigate('home')} className="hover:text-black">HOME</button>
            <span>/</span>
            <span className="text-black font-bold">LOGISTICS & DISPATCH</span>
            <span>/</span>
            <span className="text-[#E03115] font-bold">LIVE PARCEL TRACKER</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
            AKHADA DISPATCH TRACKER
          </h1>
          <p className="text-xs sm:text-sm text-[#555] max-w-xl font-mono-street">
            Real-time transit updates for your heavyweight activewear, talisman-sealed packaging, and courier waybill tracking.
          </p>
        </div>

        {/* Order ID Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-2.5 rounded-2xl border border-black/15 shadow-sm flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="w-4 h-4 text-[#888] absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your Totka Order ID (e.g. TOTKA-AKHADA-9482)"
              className="w-full bg-[#FAF8F5] border border-black/15 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono-street uppercase text-black font-bold outline-none focus:bg-white focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="bg-[#121212] hover:bg-black text-[#FFB800] px-6 py-2.5 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all"
          >
            Track Parcel
          </button>
        </form>

        {/* Active Order Overview Card */}
        <div className="bg-white rounded-2xl border border-black/15 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#121212] text-[#FFB800] text-[10px] font-mono-street font-bold px-2.5 py-0.5 rounded">
                  WAYBILL VERIFIED
                </span>
                <span className="text-xs font-mono-street text-[#777]">
                  Ordered on {activeOrder.date}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <h2 className="font-heading text-xl sm:text-2xl font-black text-black tracking-tight">
                  {activeOrder.id}
                </h2>
                <button
                  onClick={handleCopyTrackingId}
                  className="p-1 text-black/50 hover:text-black transition-colors"
                  title="Copy Tracking ID"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:items-end">
              <span className="text-[10px] font-mono-street text-[#777] uppercase">Delivery Partner</span>
              <span className="font-heading text-sm font-bold text-black">{activeOrder.courier || 'BlueDart Air Express'}</span>
              <span className="text-[11px] font-mono-street text-[#2E7D32] font-bold mt-0.5">
                ETA: {activeOrder.estimatedDelivery || 'Within 2-3 Business Days'}
              </span>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-black text-black uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E03115]" />
                TRANSIT TIMELINE & WAYPOINT LOG
              </h3>

              <button
                onClick={handleSimulateStep}
                className="bg-[#FAF8F5] hover:bg-[#EFECE3] text-black border border-black/20 px-3 py-1.5 rounded-lg text-xs font-mono-street font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>⚡ ADVANCE TRANSIT STOP</span>
              </button>
            </div>

            <div className="pt-2 space-y-5">
              {[
                {
                  step: 1,
                  title: 'Order Placed & Talisman Ritual Verified',
                  desc: 'Garment specs logged. Nimbu-Mirchi transit talisman assigned to box.',
                  hub: 'Totka Central Terminal, New Delhi',
                  time: '28 Oct, 02:30 PM'
                },
                {
                  step: 2,
                  title: '260 GSM Terry Inspected & Sealed',
                  desc: 'Drop-shoulder silhouette steamed, collar warning tag checked, folded.',
                  hub: 'Old Delhi Akhada Facility, Hub #3',
                  time: '28 Oct, 05:15 PM'
                },
                {
                  step: 3,
                  title: 'Dispatched in Hazard-Taped Craft Box',
                  desc: 'Sealed with custom packing tape, free keychain, handed to courier.',
                  hub: 'Delhi Central Express Cargo Center',
                  time: '29 Oct, 08:45 AM'
                },
                {
                  step: 4,
                  title: 'In Transit via BlueDart Air Cargo',
                  desc: 'En-route to the regional distribution center closest to destination.',
                  hub: 'Interstate Air Cargo Line #7',
                  time: 'In Flight / Highway Transit'
                },
                {
                  step: 5,
                  title: 'Out for Akhada Doorstep Delivery',
                  desc: 'Delivery runner assigned for final mile handover.',
                  hub: `${activeOrder.address.city} Akhada Terminal`,
                  time: 'Expected Tomorrow'
                }
              ].map((item) => {
                const isPassed = trackingStep >= item.step;
                const isCurrent = trackingStep === item.step;

                return (
                  <div key={item.step} className="flex gap-4 relative">
                    {/* Vertical connecting line */}
                    {item.step < 5 && (
                      <div 
                        className={`absolute left-4 top-8 w-0.5 h-12 -ml-[1px] transition-colors duration-300 ${
                          trackingStep > item.step ? 'bg-black' : 'bg-black/15'
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div 
                      className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shrink-0 z-10 transition-all ${
                        isCurrent
                          ? 'bg-[#FFB800] ring-4 ring-[#FFB800]/25 scale-110'
                          : isPassed
                          ? 'bg-[#121212] text-white'
                          : 'bg-white text-black/30'
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 pb-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className={`font-heading text-xs sm:text-sm font-bold ${isCurrent ? 'text-black font-black' : isPassed ? 'text-black' : 'text-[#888]'}`}>
                          {item.title}
                          {isCurrent && (
                            <span className="ml-2 bg-[#E03115] text-white text-[9px] font-mono-street px-1.5 py-0.2 rounded font-bold uppercase inline-block">
                              CURRENT STATUS
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] font-mono-street text-[#777]">{item.time}</span>
                      </div>
                      <p className="text-xs text-[#555] font-mono-street mt-0.5">{item.desc}</p>
                      <span className="text-[11px] text-black font-mono-street font-bold block mt-1">
                        📍 {item.hub}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Parcel Items & Destination Grid */}
          <div className="pt-6 border-t border-black/10 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Garment Details */}
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-black/15 space-y-3">
              <span className="text-[10px] font-mono-street uppercase text-[#777] font-bold block">
                PARCEL CONTENTS (1 ITEM)
              </span>

              {activeOrder.items && activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img 
                    src={item.image || '/totka-tshirt-main.png'} 
                    alt={item.name}
                    className="w-14 h-16 object-cover object-top rounded-lg bg-white border border-black/20 shrink-0" 
                  />
                  <div className="flex-1 min-w-0 text-xs font-mono-street">
                    <h5 className="font-heading text-sm font-bold text-black truncate">{item.name}</h5>
                    <p className="text-[11px] text-[#666] mt-0.5">
                      Size: <strong>{item.selectedSize}</strong> • {item.gsm} GSM Terry • Qty: {item.quantity}
                    </p>
                    <span className="text-[#2E7D32] text-[10px] font-bold block mt-0.5">
                      ★ {activeOrder.blessing || 'Sealed with Nimbu-Mirchi Talisman'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Destination Address */}
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-black/15 space-y-1.5 text-xs font-mono-street">
              <span className="text-[10px] uppercase text-[#777] font-bold block">
                DELIVERY AKHADA DESTINATION
              </span>
              <p className="font-heading text-sm font-bold text-black">
                {activeOrder.address.name} (+91 {activeOrder.address.phone})
              </p>
              <p className="text-[#555]">{activeOrder.address.street}</p>
              <p className="text-[#555]">{activeOrder.address.city}, {activeOrder.address.state} - {activeOrder.address.pincode}</p>
              <div className="pt-1 text-[#2E7D32] font-bold text-[10px]">
                Paid via {activeOrder.paymentMethod} • Net Amount: ₹{activeOrder.total}
              </div>
            </div>

          </div>

        </div>

        {/* Dispatch Guarantee Banner */}
        <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/15 text-xl">
              🛡️
            </div>
            <div>
              <h4 className="font-heading text-sm font-black text-black uppercase">
                100% TRANSIT PROTECTION & SIZE GUARANTEE
              </h4>
              <p className="text-xs text-[#666] font-mono-street">
                If the size does not fit your pump, we offer 7-day doorstep replacement with zero return fee.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="shrink-0 bg-black text-white hover:bg-neutral-800 px-5 py-2 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all"
          >
            Explore More Drops
          </button>
        </div>

      </div>
    </div>
  );
}

