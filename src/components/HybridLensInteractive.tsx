import React, { useState } from 'react';
import { Camera, Sparkles, Sliders, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import { HYBRID_COMPARISON_SLICES } from '../data/studioData';

export const HybridLensInteractive: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(2); // default to Unified Cinematic Grade
  const current = HYBRID_COMPARISON_SLICES[activeStageIndex];

  return (
    <section className="py-20 bg-[#0b0c0e] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e65c00]/10 border border-[#e65c00]/30 text-xs font-mono text-[#ff833b] mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Lens Inspector</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Look Through the Hybrid Lens
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            See how optical camera craft and synthetic world-building converge into a single finished frame.
          </p>
        </div>

        {/* Interactive Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs max-w-full overflow-x-auto">
            {HYBRID_COMPARISON_SLICES.map((slice, idx) => (
              <button
                key={slice.label}
                onClick={() => setActiveStageIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeStageIndex === idx
                    ? 'bg-[#e65c00] text-white shadow-lg shadow-[#e65c00]/30 font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{`0${idx + 1}.`}</span>
                <span>{slice.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Comparison Stage */}
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl relative">
          
          {/* Main Stage Image */}
          <div className="relative aspect-[21/9] sm:aspect-[2.39/1] w-full overflow-hidden bg-neutral-900">
            <img
              src={current.image}
              alt={current.label}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

            {/* Stage Indicator Badge in corner */}
            <div className="absolute top-4 left-4 font-mono text-xs flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/15 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ff833b]" />
              <span className="font-bold text-[#ff833b] uppercase tracking-wider">{current.tag}</span>
              <span className="text-neutral-400">|</span>
              <span>STAGE {activeStageIndex + 1} OF 3</span>
            </div>

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                  {current.label}
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm mt-1 leading-relaxed">
                  {current.description}
                </p>
                <div className="mt-2 text-[11px] font-mono text-[#ff833b] flex items-center gap-2">
                  <span>Tools:</span>
                  <span className="text-neutral-200">{current.tools}</span>
                </div>
              </div>

              {/* Step Navigation Pill */}
              <div className="flex items-center gap-2 font-mono text-xs">
                {activeStageIndex < 2 ? (
                  <button
                    onClick={() => setActiveStageIndex((prev) => (prev + 1) % 3)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveStageIndex(0)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#e65c00]/20 hover:bg-[#e65c00]/30 text-[#ff833b] transition-colors border border-[#e65c00]/30"
                  >
                    <span>Inspect from Camera Start</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Quick 3-Stage Progress Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-[#0d0f13] text-xs font-mono">
            {HYBRID_COMPARISON_SLICES.map((slice, i) => (
              <div
                key={slice.label}
                onClick={() => setActiveStageIndex(i)}
                className={`p-4 cursor-pointer transition-colors ${
                  activeStageIndex === i ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-neutral-400">PHASE 0{i + 1}</span>
                  {activeStageIndex === i && <span className="text-[#ff833b] font-bold">ACTIVE</span>}
                </div>
                <div className="text-white font-semibold">{slice.label}</div>
                <div className="text-[11px] text-neutral-400 truncate mt-1">{slice.tools}</div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
