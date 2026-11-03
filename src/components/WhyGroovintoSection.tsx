import React from 'react';
import { WHY_GROOVINTO } from '../data/studioData';
import { Feather, Layers, Scale, Check, X, Sparkles } from 'lucide-react';

export const WhyGroovintoSection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Feather className="w-5 h-5 text-[#ff833b]" />;
      case 1:
        return <Layers className="w-5 h-5 text-[#ff833b]" />;
      case 2:
        return <Scale className="w-5 h-5 text-[#ff833b]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#ff833b]" />;
    }
  };

  return (
    <section id="why-groovinto" className="py-28 bg-[#0b0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#ff833b] mb-4">
            <span>Competitive Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            Why Groovinto
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Most studios are trapped on one side of the fence. We dismantled the fence entirely.
          </p>
        </div>

        {/* 3 Core Differentials from Prompt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {WHY_GROOVINTO.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-2xl bg-[#111317] border border-white/10 p-8 flex flex-col justify-between hover:border-[#ff833b]/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff833b] bg-[#e65c00]/10 px-2.5 py-1 rounded border border-[#e65c00]/20 font-semibold">
                    {item.badge}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {getIcon(idx)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-sans mb-3 group-hover:text-[#ff833b] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-neutral-500">
                Pillar 0{idx + 1} · Groovinto Core
              </div>
            </div>
          ))}
        </div>

        {/* Comparative Matrix: Traditional Agency vs Pure AI Agency vs Groovinto */}
        <div className="rounded-2xl bg-[#0e1014] border border-white/15 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white font-sans">
              The Production Landscape: A Direct Comparison
            </h3>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              Why picking the right model matters for your story and budget.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-neutral-400">
                  <th className="p-4 sm:px-6">Studio Capability</th>
                  <th className="p-4 text-neutral-400">Traditional House</th>
                  <th className="p-4 text-neutral-400">Pure &ldquo;AI Prompt&rdquo; Shop</th>
                  <th className="p-4 text-[#ff833b] font-bold bg-[#e65c00]/10">Groovinto Hybrid Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 sm:px-6 font-semibold text-white">Original Screenwriting & Directing</td>
                  <td className="p-4"><Check className="w-4 h-4 text-emerald-400 inline" /> Strong heritage</td>
                  <td className="p-4 text-neutral-500"><X className="w-4 h-4 text-neutral-600 inline" /> Often prompt-only</td>
                  <td className="p-4 bg-[#e65c00]/5 text-white font-bold"><Check className="w-4 h-4 text-[#ff833b] inline" /> Multi-genre writers room</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 sm:px-6 font-semibold text-white">Physical Location & Crew Capabilities</td>
                  <td className="p-4"><Check className="w-4 h-4 text-emerald-400 inline" /> Yes (Expensive)</td>
                  <td className="p-4 text-neutral-500"><X className="w-4 h-4 text-neutral-600 inline" /> None (Virtual only)</td>
                  <td className="p-4 bg-[#e65c00]/5 text-white font-bold"><Check className="w-4 h-4 text-[#ff833b] inline" /> Bengaluru studio + PAN India crew</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 sm:px-6 font-semibold text-white">Impossible / Speculative World Building</td>
                  <td className="p-4 text-neutral-500"><X className="w-4 h-4 text-neutral-600 inline" /> Prohibitive VFX budget</td>
                  <td className="p-4"><Check className="w-4 h-4 text-emerald-400 inline" /> Yes (Inconsistent)</td>
                  <td className="p-4 bg-[#e65c00]/5 text-white font-bold"><Check className="w-4 h-4 text-[#ff833b] inline" /> Photoreal LoRAs & virtual sets</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 sm:px-6 font-semibold text-white">Character & Face Consistency</td>
                  <td className="p-4"><Check className="w-4 h-4 text-emerald-400 inline" /> Real actors</td>
                  <td className="p-4 text-neutral-500"><X className="w-4 h-4 text-red-400 inline" /> High drift / artifacts</td>
                  <td className="p-4 bg-[#e65c00]/5 text-white font-bold"><Check className="w-4 h-4 text-[#ff833b] inline" /> Real actors or custom neural weights</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 sm:px-6 font-semibold text-white">Budget Efficiency</td>
                  <td className="p-4 text-neutral-500"><X className="w-4 h-4 text-neutral-600 inline" /> 8-figure requirements</td>
                  <td className="p-4"><Check className="w-4 h-4 text-emerald-400 inline" /> Low (Lacks soul)</td>
                  <td className="p-4 bg-[#e65c00]/5 text-[#ff833b] font-bold"><Check className="w-4 h-4 text-[#ff833b] inline" /> Cinematic scale on balanced budget</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
