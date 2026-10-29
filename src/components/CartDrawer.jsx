import React from 'react';
import { X, Trash2, ShieldCheck, Plus, Minus, ArrowRight, Gift } from 'lucide-react';
import { audioFX } from '../utils/audio';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart = [], 
  onUpdateQuantity, 
  onRemoveItem,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const eligibleForFreeGift = subtotal >= 1999;

  const handleCheckout = () => {
    audioFX.playDhishum();
    onClose();
    if (onProceedToCheckout) {
      onProceedToCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full flex flex-col justify-between border-l border-black/20 shadow-2xl p-5 sm:p-6 overflow-hidden">
        
        {/* Top Bar */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-black/10">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-black text-black tracking-tight uppercase">
                TOTKA BAG
              </span>
              <span className="bg-[#121212] text-[#FFB800] text-[10px] font-mono-street font-bold px-2 py-0.5 rounded">
                {cart.reduce((a, b) => a + b.quantity, 0)} ITEMS
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white hover:bg-neutral-100 text-black border border-black/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nazar Protection Status */}
          <div className="mt-3.5 bg-white p-3 rounded-xl border border-black/15 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#E03115]" />
              <div>
                <p className="font-mono-street text-[11px] text-black font-bold">100% NAZAR-PROOF TRANSIT</p>
                <p className="text-[10px] text-[#666] font-mono-street">Packed in double-walled craft box</p>
              </div>
            </div>
            <span className="text-[9px] font-mono-street font-bold text-black bg-[#E8F5E9] border border-[#2E7D32]/30 text-[#2E7D32] px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          {/* Free Gift Unlock Bar */}
          <div className="mt-2.5 bg-[#EFECE3] p-2.5 rounded-xl border border-black/10 flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#E03115] shrink-0" />
            <div className="text-[11px] text-black font-mono-street flex-1 font-medium">
              {eligibleForFreeGift ? (
                <span className="text-black font-bold">
                  ★ Complimentary 3D Lemon-Chilli Keychain Added!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#E03115]">₹{1999 - subtotal}</strong> more for Free Talisman Keychain
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 no-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <div className="text-3xl">🍋🌶️</div>
              <h4 className="font-heading text-sm font-black text-black tracking-wide uppercase">
                YOUR BAG IS CURRENTLY EMPTY
              </h4>
              <p className="text-[11px] text-[#666] max-w-xs mx-auto font-mono-street">
                No heavyweight drop-shoulder armor added yet. Explore Drop 01 or craft your custom armor.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={`${item.id}-${item.selectedSize}-${idx}`}
                className="bg-white p-3.5 rounded-2xl border border-black/15 flex gap-3.5 items-center shadow-sm"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-14 h-16 object-cover object-top rounded-xl bg-[#FAF8F5] shrink-0 border border-black/10"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-xs font-bold text-black truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-[#666] mt-0.5 font-mono-street">
                    <span>Size: <strong className="text-black">{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span>{item.gsm} GSM</span>
                  </div>
                  <div className="font-heading text-sm font-black text-black mt-1">
                    ₹{item.price * item.quantity}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(item.id, item.selectedSize)}
                    className="text-black/40 hover:text-[#E03115] transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-[#FAF8F5] rounded-lg px-2 py-0.5 border border-black/15">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="text-[11px] text-black hover:text-[#E03115] font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono-street text-xs font-bold text-black min-w-[14px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="text-[11px] text-black hover:text-[#E03115] font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        <div className="pt-3 border-t border-black/10 space-y-3">
          <div className="space-y-1 text-xs text-[#555] font-mono-street">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-black">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-black">
              <span>Pan-India BlueDart Dispatch</span>
              <span className="font-bold text-[#2E7D32]">FREE (₹0)</span>
            </div>
            {eligibleForFreeGift && (
              <div className="flex justify-between text-[#E03115] font-bold">
                <span>Free Lemon-Chilli Keychain</span>
                <span>₹0</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-heading font-black text-black pt-2 border-t border-black/10">
              <span className="uppercase">Net Amount</span>
              <span className="text-black text-lg font-black">₹{subtotal}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-[#121212] hover:bg-black disabled:opacity-40 text-[#FFB800] font-mono-street text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:translate-y-0.5"
          >
            <span>PROCEED TO SECURE CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-center text-[#777] font-mono-street">
            COD PAN-INDIA • 7-DAY EASY REPLACEMENTS
          </p>
        </div>

      </div>
    </div>
  );
}
