import React, { useState, useRef } from 'react';

/**
 * LiquidGlass Component inspired by vue-web-liquid-glass and Apple VisionOS optics.
 * Provides physical specular reflections, chromatic border highlights, and real fluid glass optics
 * while adhering to Anti-Slop (R-10 dose-cap: used selectively on hero accents, nav dock, and inspection lens).
 */

export function LiquidGlassFilterDef() {
  return (
    <svg className="sr-only pointer-events-none absolute w-0 h-0" aria-hidden="true">
      <defs>
        {/* Subtle chromatic dispersion & refraction filter */}
        <filter id="totka-liquid-lens" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="0.4" result="blurred" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="blurred" opacity="0.6" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export default function LiquidGlass({
  children,
  className = '',
  variant = 'light', // 'light' | 'dark' | 'amber'
  lensEffect = false,
  onClick,
  style = {},
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return 'bg-[#0E100F]/80 text-[#FAF8F5] border-white/15 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.45)]';
      case 'amber':
        return 'bg-[#FFB800]/20 text-[#0E100F] border-[#FFB800]/40 shadow-[0_12px_36px_-6px_rgba(255,184,0,0.15)]';
      case 'light':
      default:
        return 'bg-white/75 text-[#0E100F] border-white/60 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.08)]';
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-xl ${getVariantStyles()} ${
        lensEffect ? 'filter-[url(#totka-liquid-lens)]' : ''
      } ${className}`}
    >
      {/* Specular Liquid Light Reflection that glides with mouse */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.45,
          background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, ${
            variant === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.65)'
          }, transparent 70%)`,
        }}
      />

      {/* Internal Prism Bevel highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/30"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

