import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Plus, Minus, ArrowRight, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
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
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full flex flex-col justify-between border-l-4 border-black shadow-2xl p-5 overflow-hidden">
        
        {/* Top Bar */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-black text-black tracking-tight uppercase">
                TOTKA BAG
              </span>
              <span className="bg-[#FFB800] text-black border border-black text-[10px] font-mono-street font-bold px-2 py-0.5 rounded">
                {cart.reduce((a, b) => a + b.quantity, 0)} ITEMS
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded bg-black text-white hover:bg-[#FF3B1D] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nazar Protection Status */}
          <div className="mt-3 bg-white p-2.5 rounded-lg border-2 border-black neo-shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF3B1D]" />
              <div>
                <p className="font-mono-street text-[11px] text-black font-bold">100% NAZAR-PROOF TRANSIT</p>
                <p className="text-[10px] text-[#666]">Packed in buri-nazar proof craft box</p>
              </div>
            </div>
            <span className="text-[10px] font-mono-street font-bold text-black bg-[#FFB800] px-2 py-0.5 rounded border border-black">ACTIVE</span>
          </div>

          {/* Free Gift Unlock Bar */}
          <div className="mt-2.5 bg-[#EFECE3] p-2.5 rounded-lg border border-black flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#FF3B1D] shrink-0" />
            <div className="text-[11px] text-black font-mono-street flex-1 font-medium">
              {eligibleForFreeGift ? (
                <span className="text-black font-bold">
                  ★ FREE 3D Lemon-Chilli Keychain Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#FF3B1D]">₹{1999 - subtotal}</strong> more for Free Keychain
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 no-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <div className="text-3xl">🍋🌶️</div>
              <h4 className="font-heading text-base font-black text-black tracking-wide uppercase">
                YOUR BAG IS EMPTY
              </h4>
              <p className="text-[11px] text-[#666] max-w-xs mx-auto font-mono-street">
                No heavyweight drop-shoulder armor added yet. Explore Drop 01 or craft your custom tee.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={`${item.id}-${item.selectedSize}-${idx}`}
                className="bg-white p-3 rounded-lg border-2 border-black flex gap-3 items-center neo-shadow-sm"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-14 h-16 object-cover rounded bg-[#EFECE3] shrink-0 object-top border border-black/20"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-sm font-bold text-black truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-[#666] mt-0.5 font-mono-street font-bold">
                    <span>Size: <strong className="text-black">{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span>{item.gsm} GSM</span>
                  </div>
                  <div className="font-heading text-sm font-black text-black mt-1">
                    ₹{item.price * item.quantity}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-1.5">
                  <button
                    onClick={() => onRemoveItem(item.id, item.selectedSize)}
                    className="text-black/50 hover:text-[#FF3B1D] transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-[#EFECE3] rounded px-2 py-0.5 border border-black">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="text-[11px] text-black hover:text-[#FF3B1D] font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono-street text-xs font-bold text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="text-[11px] text-black hover:text-[#FF3B1D] font-bold"
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
        <div className="pt-3 border-t-2 border-black/10 space-y-2.5">
          <div className="space-y-1 text-xs text-[#555] font-mono-street">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-black">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-black">
              <span>Totka Shipping & Protection</span>
              <span className="font-bold">FREE</span>
            </div>
            {eligibleForFreeGift && (
              <div className="flex justify-between text-[#FF3B1D] font-bold">
                <span>Free Lemon-Chilli Keychain</span>
                <span>₹0</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-heading font-black text-black pt-1.5 border-t-2 border-black/10">
              <span className="uppercase">Total Amount</span>
              <span className="text-black text-lg font-black">₹{subtotal}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-[#FFB800] hover:bg-[#FFA500] disabled:opacity-40 text-black border-2 border-black font-mono-street text-xs font-bold py-3 rounded uppercase tracking-wider transition-all flex items-center justify-center gap-2 neo-shadow active:translate-y-0.5"
          >
            <span>PROCEED TO SECURE CHECKOUT (COD / UPI)</span>
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
