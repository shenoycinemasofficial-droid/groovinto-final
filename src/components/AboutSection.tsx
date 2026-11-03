import React from 'react';
import { FileText, Cpu, Film, CheckCircle2, Sparkles, SlidersHorizontal } from 'lucide-react';
import { STUDIO_META } from '../data/studioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-[#0e1014] relative border-t border-b border-white/10 overflow-hidden">
      {/* Subtle lighting accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e65c00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#ff833b] mb-4">
            <span>The Studio Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            Not an &ldquo;AI studio&rdquo;. <br />
            Not a &ldquo;production house&rdquo;.
          </h2>
        </div>

        {/* Core Layout: Manifesto Copy & Screenplay / Toolkit Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct User Copy */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-lg leading-relaxed font-normal">
            
            <p className="text-xl sm:text-2xl text-white font-medium leading-snug border-l-2 border-[#e65c00] pl-5">
              Groovinto isn’t an &ldquo;AI studio&rdquo; or a &ldquo;production house.&rdquo; It’s a content studio that treats both as the same toolkit.
            </p>

            <p>
              We come from screenwriting and traditional production, and we’ve spent the last few years building fluency in AI-assisted filmmaking — cinematic prompting, consistent characters, virtual sets, AI-voiced performances — without losing the instincts that make a story actually land: <span className="text-white font-semibold underline decoration-[#e65c00]/50 underline-offset-4">pacing, performance, sound, edit</span>.
            </p>

            <p>
              That combination is the point. A client doesn’t come to us asking for &ldquo;an AI video&rdquo; or &ldquo;a shoot.&rdquo; They come with a story, a budget, and a deadline — and we pick whichever tools (or mix of tools) gets it made at the quality it deserves.
            </p>

            {/* The 4 Studio Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#ff833b]" />
                  <span>Screenwriting Instincts</span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">
                  Scripts crafted with emotional stakes and dramatic pace before software touches the frame.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#ff833b]" />
                  <span>Cinematic Fluency</span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">
                  Virtual sets, character LoRAs, and neural performance without uncanny-valley compromises.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#ff833b]" />
                  <span>No Tool Dogma</span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">
                  Budget and story dictate the medium. Zero pressure to force live cameras or force AI.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#ff833b]" />
                  <span>Single Creative Room</span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">
                  Writing, DoP, prompt architecture, color grading, and final mix in one Bengaluru studio.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Screenplay Specimen */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#08090b] border border-white/15 p-6 shadow-2xl relative">
              
              {/* Slate Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e65c00]" />
                  <span className="text-white font-bold tracking-wider">GROOVINTO SCREENPLAY PIPELINE</span>
                </div>
                <span className="text-neutral-500">DRAFT 2.4 · FINAL</span>
              </div>

              {/* Screenplay Excerpt formatting */}
              <div className="font-mono text-xs leading-relaxed space-y-3 bg-[#0d0f13] p-5 rounded-lg border border-white/5 text-neutral-300">
                <div className="text-neutral-500">SCENE 14: EXT. BENGALURU SKIES - TWILIGHT</div>
                
                <div className="text-neutral-400 italic">
                  [DIRECTOR NOTE: Real rain on camera glass; background horizon extended via Neural Generative depth map.]
                </div>

                <div className="text-white font-bold tracking-wider text-center pt-2">
                  ARJUN
                </div>
                <div className="text-center text-neutral-300 max-w-xs mx-auto">
                  &ldquo;You don’t need an army of trucks to build an entire civilization anymore. You just need the right story to justify it.&rdquo;
                </div>

                <div className="text-neutral-400 italic pt-2">
                  The camera tracks backwards through physical wet pavement. The city behind Arjun blooms into a luminescent biosphere.
                </div>
              </div>

              {/* Behind The Shot: Toolkit Breakdown */}
              <div className="mt-5 space-y-3 pt-3 border-t border-white/10 font-mono text-xs">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                  <span>How This Shot Is Made:</span>
                  <span className="text-[#ff833b] font-bold">Hybrid 50 / 50</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <Film className="w-3.5 h-3.5 text-blue-400" />
                      <span>Physical Camera & Set</span>
                    </span>
                    <span className="text-neutral-400 text-[11px]">Actor, rain, key lighting</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Generative World Extension</span>
                    </span>
                    <span className="text-neutral-400 text-[11px]">Volumetric neon atmosphere</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff833b]" />
                      <span>Premiere Pro Editing</span>
                    </span>
                    <span className="text-neutral-400 text-[11px]">Seamless timeline mastering</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
