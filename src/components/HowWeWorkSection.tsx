import React from 'react';
import { HOW_WE_WORK_STEPS } from '../data/studioData';
import { PenTool, Crosshair, Users, Sparkles, ArrowRight } from 'lucide-react';

interface HowWeWorkSectionProps {
  onStartProject: () => void;
}

export const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({ onStartProject }) => {
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <PenTool className="w-5 h-5 text-[#ff833b]" />;
      case 1:
        return <Crosshair className="w-5 h-5 text-[#ff833b]" />;
      case 2:
        return <Users className="w-5 h-5 text-[#ff833b]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#ff833b]" />;
    }
  };

  return (
    <section id="how-we-work" className="py-28 bg-[#0e1014] relative border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#ff833b] mb-4">
            <span>Operating Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            How We Work
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Three non-negotiable principles that prevent technology from suffocating the story.
          </p>
        </div>

        {/* 3 Large Structural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_WE_WORK_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="rounded-2xl bg-[#111317] border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition-all group hover:-translate-y-1 shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono font-bold text-neutral-600 group-hover:text-[#ff833b] transition-colors">
                    {step.step}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {getStepIcon(idx)}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-white font-sans group-hover:text-[#ff833b] transition-colors">
                  {step.title}
                </h3>
                <h4 className="text-xs font-mono text-[#ff833b] mt-1.5 font-medium tracking-wide">
                  {step.subtitle}
                </h4>

                {/* Exact description from prompt */}
                <p className="mt-4 text-sm text-neutral-300 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              {/* Quote / Principle Footer */}
              <div className="mt-8 pt-5 border-t border-white/10">
                <p className="text-xs font-mono italic text-neutral-400">
                  {step.quote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Workflow Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white font-sans">
              Have a project deadline and budget in mind?
            </h4>
            <p className="text-xs font-mono text-neutral-400">
              We determine shot distribution within 48 hours of reading your script or initial brief.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="shrink-0 flex items-center gap-2 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider px-5 py-3 rounded-md font-bold transition-all shadow-md"
          >
            <span>Discuss your script</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
