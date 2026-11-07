import React, { useState, useEffect } from 'react';
import { 
  Truck, Check, Clock, Package, MapPin, Search, 
  ShieldCheck, AlertCircle, Sparkles, Copy, ChevronRight, RefreshCw
} from 'lucide-react';
import LiquidGlass from '../components/LiquidGlass';
import { StoreService } from '../services/store';
import { audioFX } from '../utils/audio';

export default function TrackOrderPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const list = StoreService.getOrders();
    setOrders(list);
    if (list.length > 0) {
      setActiveOrder(list[0]);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    audioFX.playFlick();

    const match = orders.find(
      (o) => o.id.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (match) {
      setActiveOrder(match);
    } else {
      // Mock lookup with fallback
      setActiveOrder({
        ...orders[0],
        id: searchQuery.trim().toUpperCase(),
        status: 'Dispatched from Hub',
      });
    }
  };

  const handleCopyTrackingId = () => {
    if (!activeOrder) return;
    navigator.clipboard.writeText(activeOrder.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdvanceStep = () => {
    if (!activeOrder) return;
    audioFX.playFlick();
    const nextStep = activeOrder.currentStep < 5 ? activeOrder.currentStep + 1 : 1;
    const updated = StoreService.updateOrderStep(activeOrder.id, nextStep);
    setOrders(updated);
    const updatedActive = updated.find((o) => o.id === activeOrder.id);
    if (updatedActive) {
      setActiveOrder(updatedActive);
    }
  };

  if (!activeOrder) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] py-16 px-4 text-center">
        <p className="font-mono-street text-sm">Loading parcel dispatch logs...</p>
      </div>
    );
  }

  const timelineSteps = [
    {
      step: 1,
      title: 'Order Sealed & Ritual Verified',
      desc: 'Garment specs logged. Complimentary fresh Nimbu-Mirchi talisman bound to package.',
      hub: 'Totka Central Terminal, New Delhi',
      time: '28 Oct, 02:30 PM',
    },
    {
      step: 2,
      title: '260 GSM French Terry Inspected',
      desc: 'Drop-shoulder silhouette steamed, collar warning tag checked, folded in craft box.',
      hub: 'Old Delhi Akhada Facility, Hub #3',
      time: '28 Oct, 05:15 PM',
    },
    {
      step: 3,
      title: 'Dispatched in Hazard-Taped Craft Box',
      desc: 'Sealed with custom packing tape, free keychain enclosed, handed to BlueDart runner.',
      hub: 'Delhi Central Express Cargo Center',
      time: '29 Oct, 08:45 AM',
    },
    {
      step: 4,
      title: 'In Transit via BlueDart Express Cargo',
      desc: 'En-route to the regional sorting center closest to your delivery address.',
      hub: 'Interstate Air Cargo Line #7',
      time: 'Expected by Midnight',
    },
    {
      step: 5,
      title: 'Out for Akhada Doorstep Handover',
      desc: 'Delivery runner assigned for final mile handover with contactless verification.',
      hub: `${activeOrder.address?.city || 'Local'} Akhada Hub`,
      time: 'Tomorrow, by 5:00 PM',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#0E100F] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="space-y-1.5 border-b border-black/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono-street text-neutral-500 uppercase tracking-widest">
            <button onClick={() => onNavigate('home')} className="hover:text-black cursor-pointer">HOME</button>
            <span>/</span>
            <span className="text-black font-bold">LOGISTICS & DISPATCH</span>
            <span>/</span>
            <span className="text-[#E03115] font-bold">LIVE WAYBILL TRACKER</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
            AKHADA DISPATCH TRACKER
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl font-mono-street">
            Real-time transit telemetry for your heavyweight activewear, talisman-sealed packaging, and official courier waybill tracking.
          </p>
        </div>

        {/* Search Order Bar with Liquid Glass Accent */}
        <LiquidGlass variant="light" className="p-2 sm:p-2.5 border-white/80 shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative flex items-center">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID (e.g. TOTKA-AKHADA-9482)"
                className="w-full bg-white/80 border border-black/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono-street uppercase text-black font-bold outline-none focus:bg-white focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0E100F] hover:bg-black text-[#FFB800] px-6 py-2.5 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              TRACK PARCEL
            </button>
          </form>
        </LiquidGlass>

        {/* Active Order Overview Card */}
        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#0E100F] text-[#FFB800] text-[10px] font-mono-street font-bold px-2.5 py-0.5 rounded-full">
                  WAYBILL VERIFIED
                </span>
                <span className="text-xs font-mono-street text-neutral-500">
                  Commissioned on {activeOrder.date}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <h2 className="font-heading text-xl sm:text-2xl font-black text-black tracking-tight">
                  {activeOrder.id}
                </h2>
                <button
                  onClick={handleCopyTrackingId}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                  title="Copy Tracking ID"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:items-end">
              <span className="text-[10px] font-mono-street text-neutral-500 uppercase font-bold">Delivery Partner</span>
              <span className="font-heading text-sm font-bold text-black">{activeOrder.courier || 'BlueDart Air Express'}</span>
              <span className="text-[11px] font-mono-street text-[#2E7D32] font-bold mt-0.5">
                Status: {activeOrder.status}
              </span>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-black text-black uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E03115]" />
                TRANSIT TIMELINE & WAYPOINT TELEMETRY
              </h3>

              {/* Simulation button for demoing real state changes */}
              <button
                onClick={handleAdvanceStep}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-black/10 px-3 py-1.5 rounded-xl text-xs font-mono-street font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Click to simulate moving to the next transit stop"
              >
                <RefreshCw className="w-3 h-3 text-[#E03115]" />
                <span>ADVANCE TRANSIT STOP</span>
              </button>
            </div>

            <div className="pt-2 space-y-6">
              {timelineSteps.map((item) => {
                const isPassed = (activeOrder.currentStep || 3) >= item.step;
                const isCurrent = (activeOrder.currentStep || 3) === item.step;

                return (
                  <div key={item.step} className="flex gap-4 relative">
                    {/* Vertical connecting line */}
                    {item.step < 5 && (
                      <div 
                        className={`absolute left-4 top-8 w-0.5 h-14 -ml-[1px] transition-colors duration-300 ${
                          (activeOrder.currentStep || 3) > item.step ? 'bg-[#0E100F]' : 'bg-neutral-200'
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div 
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all ${
                        isCurrent
                          ? 'bg-[#FFB800] border-black ring-4 ring-[#FFB800]/25 scale-110 shadow-xs'
                          : isPassed
                          ? 'bg-[#0E100F] border-black text-white'
                          : 'bg-white border-neutral-300 text-neutral-400'
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
                        <h4 className={`font-heading text-xs sm:text-sm font-bold ${isCurrent ? 'text-black font-black' : isPassed ? 'text-black' : 'text-neutral-400'}`}>
                          {item.title}
                          {isCurrent && (
                            <span className="ml-2 bg-[#E03115] text-white text-[9px] font-mono-street px-2 py-0.5 rounded-full font-bold uppercase inline-block shadow-2xs">
                              LIVE WAYPOINT
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] font-mono-street text-neutral-500">{item.time}</span>
                      </div>
                      <p className="text-xs text-neutral-600 font-mono-street mt-0.5">{item.desc}</p>
                      <span className="text-[11px] text-neutral-900 font-mono-street font-bold block mt-1">
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
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-black/10 space-y-3">
              <span className="text-[10px] font-mono-street uppercase text-neutral-500 font-bold block">
                PARCEL CONTENTS ({activeOrder.items?.length || 1} ITEM)
              </span>

              {activeOrder.items && activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img 
                    src={item.image || '/totka-tshirt-main.png'} 
                    alt={item.name}
                    className="w-14 h-16 object-cover object-top rounded-xl bg-white border border-black/10 shrink-0" 
                  />
                  <div className="flex-1 min-w-0 text-xs font-mono-street">
                    <h5 className="font-heading text-sm font-bold text-black truncate">{item.name}</h5>
                    <p className="text-[11px] text-neutral-600 mt-0.5">
                      Size: <strong>{item.selectedSize}</strong> • {item.gsm} GSM • Qty: {item.quantity}
                    </p>
                    <span className="text-[#2E7D32] text-[10px] font-bold block mt-0.5">
                      ★ {activeOrder.blessing || 'Sealed with Nimbu-Mirchi Talisman'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Destination Address */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-black/10 space-y-1.5 text-xs font-mono-street">
              <span className="text-[10px] uppercase text-neutral-500 font-bold block">
                DELIVERY AKHADA DESTINATION
              </span>
              <p className="font-heading text-sm font-bold text-black">
                {activeOrder.address?.name} (+91 {activeOrder.address?.phone})
              </p>
              <p className="text-neutral-600">{activeOrder.address?.street}</p>
              <p className="text-neutral-600">{activeOrder.address?.city}, {activeOrder.address?.state} - {activeOrder.address?.pincode}</p>
              <div className="pt-1 text-[#2E7D32] font-bold text-[10px]">
                Paid via {activeOrder.paymentMethod} • Net Amount: ₹{activeOrder.total}
              </div>
            </div>

          </div>

        </div>

        {/* Dispatch Guarantee Banner */}
        <div className="bg-white p-5 rounded-3xl border border-black/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-black/10 text-xl">
              🛡️
            </div>
            <div>
              <h4 className="font-heading text-sm font-black text-black uppercase">
                100% TRANSIT PROTECTION & SIZE GUARANTEE
              </h4>
              <p className="text-xs text-neutral-600 font-mono-street">
                If the size does not fit your pump, we offer 7-day doorstep replacement with zero return fee.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="shrink-0 bg-[#0E100F] hover:bg-black text-[#FAF8F5] px-5 py-2.5 rounded-xl text-xs font-mono-street font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            Explore More Drops
          </button>
        </div>

      </div>
    </div>
  );
}
