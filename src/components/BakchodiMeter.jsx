import React, { useState } from 'react';
import { X, Sparkles, Shield, AlertTriangle, RefreshCw, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOTKA_EXCUSES } from '../data/products';
import { audioFX } from '../utils/audio';

export default function BakchodiMeter({ isOpen, onClose }) {
  const [selectedExcuse, setSelectedExcuse] = useState(0);
  const [targetPR, setTargetPR] = useState('100');
  const [exercise, setExercise] = useState('Bench Press');
  const [isCalculating, setIsCalculating] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    audioFX.playHoshiyar();
    setIsCalculating(true);
    setPrescription(null);

    setTimeout(() => {
      audioFX.playNazarWard();
      setIsCalculating(false);
      setPrescription({
        title: `TOTKA PRESCRIPTION: FOR ${exercise.toUpperCase()} (${targetPR} KG)`,
        code: `NAZAR-SHIELD-#${Math.floor(100 + Math.random() * 900)}`,
        remedy: TOTKA_EXCUSES[selectedExcuse].totka,
        caution: 'WARNING: Wear a 240+ GSM oversized tee. Anyone staring at your form will drop their dumbbell on their foot.',
        blessing: 'Self-Certified 100% Nazar-Proof. Bakchodi Band, Rep Chalu!'
      });

      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.5 },
        colors: ['#FFC01D', '#FF4625', '#FAF7EE']
      });
    }, 900);
  };

  const handleCopy = () => {
    if (!prescription) return;
    navigator.clipboard.writeText(
      `⚡ ${prescription.title}\n🛡️ ${prescription.remedy}\n⚠️ ${prescription.caution}\n— via TOTKA Activewear`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#16241F] border-4 border-[#FFC01D] rounded-3xl p-6 sm:p-8 comic-shadow max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#121C18] text-[#FAF7EE] hover:text-[#FFC01D] border border-[#FAF7EE]/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121C18] border border-[#FFC01D] text-[#FFC01D] font-comic text-xs uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4625]" /> EVIL EYE DEFLECTOR ENGINE
          </div>
          <h3 className="font-impact text-3xl sm:text-4xl text-[#FAF7EE] tracking-wide uppercase">
            THE OFFICIAL <span className="text-[#FFC01D]">TOTKA DISPENSER</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF7EE]/70 font-medium">
            Feeling lazy? Struck by someone’s buri nazar? Enter your workout and generate your instant comic remedy.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          
          {/* Exercise & PR Target */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#FAF7EE]/80 mb-1 font-comic">
                EXERCISE IN DANGER
              </label>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full bg-[#121C18] border-2 border-[#1C2B25] focus:border-[#FFC01D] text-[#FAF7EE] rounded-xl px-3 py-2 text-sm font-semibold outline-none"
              >
                <option value="Bench Press">Bench Press</option>
                <option value="Deadlift">Akhada Deadlift</option>
                <option value="Barbell Squat">Heavy Squat</option>
                <option value="Shoulder Press">Shoulder Pump</option>
                <option value="Bicep Curls">Tapri Curls</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#FAF7EE]/80 mb-1 font-comic">
                TARGET WEIGHT (KG)
              </label>
              <input
                type="number"
                value={targetPR}
                onChange={(e) => setTargetPR(e.target.value)}
                className="w-full bg-[#121C18] border-2 border-[#1C2B25] focus:border-[#FFC01D] text-[#FFC01D] font-impact text-lg rounded-xl px-3 py-1.5 outline-none tracking-wider"
              />
            </div>
          </div>

          {/* Current Gym Excuse */}
          <div>
            <label className="block text-xs font-bold text-[#FAF7EE]/80 mb-1.5 font-comic">
              CURRENT BAKCHODI / EXCUSE
            </label>
            <div className="space-y-2">
              {TOTKA_EXCUSES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioFX.playFlick();
                    setSelectedExcuse(idx);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all border ${
                    selectedExcuse === idx
                      ? 'bg-[#1C2B25] border-[#FFC01D] text-[#FFC01D] font-bold comic-shadow-dark'
                      : 'bg-[#121C18] border-[#FAF7EE]/10 text-[#FAF7EE]/70 hover:bg-[#1E2E27]'
                  }`}
                >
                  "{item.excuse}"
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isCalculating}
            className="w-full bg-[#FFC01D] hover:bg-[#E6A800] text-[#121C18] font-impact text-xl py-3.5 rounded-xl uppercase tracking-wider comic-shadow-dark transition-all transform active:scale-95 flex items-center justify-center gap-2 font-bold"
          >
            {isCalculating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>DEFLECTING BURI NAZAR...</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>DISPENSE TOTKA REMEDY</span>
              </>
            )}
          </button>

          {/* Generated Result Card */}
          {prescription && (
            <div className="mt-4 p-5 rounded-2xl bg-[#121C18] border-3 border-[#FF4625] space-y-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between border-b border-[#FAF7EE]/10 pb-2">
                <span className="font-comic text-xs text-[#FF4625] font-black uppercase flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> {prescription.code}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-[#FFC01D] hover:underline flex items-center gap-1 font-comic"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Totka'}
                </button>
              </div>

              <div className="font-impact text-xl text-[#FFC01D] tracking-wide uppercase">
                {prescription.title}
              </div>

              <p className="text-sm text-[#FAF7EE] leading-relaxed font-semibold bg-[#16241F] p-3 rounded-lg border border-[#FAF7EE]/10">
                {prescription.remedy}
              </p>

              <div className="text-xs text-[#FAF7EE]/70 italic border-l-2 border-[#FF4625] pl-3 py-1">
                {prescription.caution}
              </div>

              <div className="text-center pt-2">
                <span className="font-comic text-xs text-[#FFC01D] uppercase tracking-wider">
                  ✦ {prescription.blessing} ✦
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

