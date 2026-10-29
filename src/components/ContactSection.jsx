import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Check, Sparkles, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFX } from '../utils/audio';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    handle: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    audioFX.playDhishum();
    setSubmitted(true);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFB800', '#FF3B1D', '#0A0D0C']
    });

    setTimeout(() => {
      // Mock submit reset
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-[#EFECE3] border-b-3 border-[#0A0D0C] relative overflow-hidden bg-raw-canvas">
      
      {/* Background Imperfection Element */}
      <div className="absolute top-8 right-12 w-28 h-8 bg-[#FFB800] border-2 border-black rotate-[-4deg] opacity-60 pointer-events-none hidden md:block"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Natural Street Lore & Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-black text-xs font-mono font-bold tracking-wider uppercase neo-shadow-sm wabi-sabi-1">
              <span className="w-2 h-2 rounded-full bg-[#FF3B1D]"></span>
              KHABARDAR: TAPRI HELPDESK
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0A0D0C] tracking-tight uppercase leading-[0.95]">
                GOT QUESTIONS? <br />
                <span className="bg-[#FFB800] px-2 border-2 border-black inline-block mt-1 rotate-[-1deg]">
                  DROP A LINE.
                </span>
              </h2>
            </div>

            <p className="text-[#333] text-base leading-relaxed max-w-md">
              Need sizing advice for your oversized drop-shoulder fit? Bulk orders for your akhada or powerlifting crew? Or just want to debate deadlift form over cutting chai?
            </p>

            {/* Quick Contact Details */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 bg-white p-3.5 border-2 border-black neo-shadow-sm wabi-sabi-3">
                <MapPin className="w-5 h-5 text-[#FF3B1D] shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-black block">AKHADA HEADQUARTERS</span>
                  <span className="text-[#555]">Old Delhi Warehouse & Print Lab, Delhi 110006</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 border-2 border-black neo-shadow-sm">
                <Clock className="w-5 h-5 text-[#FFB800] shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-black block">DISPATCH HOURS</span>
                  <span className="text-[#555]">Mon - Sat: 10:00 AM – 8:00 PM (Orders ship within 24h)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 border-2 border-black neo-shadow-sm wabi-sabi-2">
                <Phone className="w-5 h-5 text-[#0A0D0C] shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-black block">WHATSAPP LIAISON</span>
                  <span className="text-[#555] font-mono">+91 98765 43210 (Direct Support)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Exact Neo-Brutalist Uiverse Card from User */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            
            <div className="uiverse-contact-card">
              
              {/* Rotating Top Banner from User Snippet */}
              <div className="uiverse-banner">
                <span className="uiverse-banner-text">TOTKA DISPATCH</span>
                <span className="uiverse-banner-text">DROP A LINE!</span>
              </div>

              {/* Card Title & Subtitle */}
              <span className="font-heading text-2xl font-black text-black uppercase pb-1 mb-2 block border-b-3 border-black w-3/4">
                GET IN TOUCH
              </span>
              <p className="text-sm text-[#444] mb-5 leading-snug">
                Fill the transmission below. We respond before your next rest day ends.
              </p>

              {/* Form Body */}
              {submitted ? (
                <div className="p-6 bg-[#FFB800] border-4 border-black text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-black text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h4 className="font-heading text-xl font-black uppercase">TRANSMISSION RECEIVED</h4>
                  <p className="text-xs font-mono font-bold">
                    Totka team is on it. Nazar utaar ke check your inbox soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="YOUR FULL NAME"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="uiverse-input w-full"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WHATSAPP / PHONE NUMBER"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="uiverse-input w-full"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="LIFTER HANDLE / PR GOAL (OPTIONAL)"
                      value={formData.handle}
                      onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                      className="uiverse-input w-full"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder="MESSAGE / ORDER INQUIRY..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="uiverse-input w-full resize-none"
                    />
                  </div>

                  <button type="submit" className="uiverse-btn mt-1">
                    TRANSMIT MESSAGE
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

