import React, { useState } from 'react';
import {
  Clapperboard,
  Sparkles,
  Film,
  Tv,
  Smartphone,
  Check,
  ArrowRight,
  ChevronRight,
  Megaphone,
  Share2
} from 'lucide-react';
import { SERVICES } from '../data/studioData';
import { ServiceItem } from '../types';

interface WhatWeDoSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({ onSelectServiceForInquiry }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-[#ff833b]" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#ff833b]" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-[#ff833b]" />;
      case 'Clapperboard':
        return <Clapperboard className="w-5 h-5 text-[#ff833b]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#ff833b]" />;
      case 'Film':
        return <Film className="w-5 h-5 text-[#ff833b]" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#ff833b]" />;
      default:
        return <Film className="w-5 h-5 text-[#ff833b]" />;
    }
  };

  const activeService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  return (
    <section id="what-we-do" className="py-28 bg-[#0b0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#ff833b] mb-4">
            <span>Capabilities & Formats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            What We Do
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            From authentic UGC creator videos and viral social media content engines to cinematic narrative films and AI video pipelines — tailored to your growth goals and brand vision.
          </p>
        </div>

        {/* Desktop Dual-Pane & Mobile Stack Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: The 5 Services List */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((service, index) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-white/[0.07] border-[#e65c00] shadow-xl shadow-[#e65c00]/10 translate-x-1'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#e65c00]/20' : 'bg-white/5'}`}>
                        {getIcon(service.iconName)}
                      </div>
                      <div>
                        <div className="text-xs font-mono text-neutral-500">0{index + 1}</div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#ff833b] transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        isSelected ? 'text-[#ff833b] translate-x-1' : 'text-neutral-600'
                      }`}
                    />
                  </div>

                  <p className="mt-2 text-xs text-neutral-400 line-clamp-2 pl-11">
                    {service.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Detail Pane: Active Service Breakdown */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111317] border border-white/15 p-7 sm:p-9 shadow-2xl relative">
              
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#e65c00]/15 border border-[#e65c00]/30">
                    {getIcon(activeService.iconName)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#ff833b] uppercase tracking-widest font-semibold">
                      Service Breakdown
                    </span>
                    <h3 className="text-2xl font-bold text-white font-sans">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {activeService.pipelineTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Exact user text summary */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
                  Overview & Scope
                </h4>
                <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-sans">
                  {activeService.summary}
                </p>
              </div>

              {/* Ideal Context */}
              <div className="my-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-mono text-neutral-400 uppercase mb-1">
                  Ideal Story Context
                </div>
                <div className="text-sm text-neutral-300 font-medium">
                  {activeService.idealFor}
                </div>
              </div>

              {/* Deliverables checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Studio Deliverables & Pipeline Assets
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-xs font-mono text-neutral-300 bg-black/30 p-2.5 rounded-lg border border-white/5"
                    >
                      <Check className="w-4 h-4 text-[#ff833b] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-neutral-400 text-center sm:text-left">
                  Ready to evaluate this format for your brand or story?
                </div>
                <button
                  id={`plan-${activeService.id}-btn`}
                  onClick={() => onSelectServiceForInquiry(activeService.title)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#e65c00] hover:bg-[#ff6d19] text-white text-xs font-mono uppercase tracking-wider px-5 py-3 rounded-md font-semibold transition-all shadow-lg shadow-[#e65c00]/20"
                >
                  <span>Inquire for {activeService.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
