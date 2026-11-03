import React, { useState, useEffect } from 'react';
import { Play, Pause, Sparkles, Film, Volume2, VolumeX, Eye, ArrowDown, Camera, Sliders } from 'lucide-react';
import { STUDIO_META } from '../data/studioData';

interface HeroProps {
  onSeeWork: () => void;
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSeeWork, onStartProject }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeViewMode, setActiveViewMode] = useState<'hybrid' | 'camera' | 'generative'>('hybrid');
  const [timecode, setTimecode] = useState('00:01:24:18');

  // Simulated live camera timecode runner
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const frames = Math.floor((now.getMilliseconds() / 1000) * 24);
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ff = String(frames).padStart(2, '0');
      setTimecode(`${hours}:${mins}:${secs}:${ff}`);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const reelBackgrounds = {
    hybrid:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    camera:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
    generative:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop'
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex flex-col justify-between overflow-hidden bg-[#0b0c0e]">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#e65c00]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Copy */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Studio Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-neutral-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#e65c00] animate-ping" />
              <span className="text-[#ff833b] font-semibold">HYBRID STUDIO</span>
              <span className="text-neutral-500">|</span>
              <span>AI VIDEO</span>
              <span className="text-neutral-600">·</span>
              <span>UGC CREATOR</span>
              <span className="text-neutral-600">·</span>
              <span>SOCIAL CONTENT</span>
              <span className="text-neutral-600">·</span>
              <span>FILMS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
              We make films — <br />
              <span className="text-neutral-400 font-light">with cameras,</span>{' '}
              <span className="text-white font-medium">with AI,</span>{' '}
              <br />
              <span className="text-[#ff833b]">and with everything in between.</span>
            </h1>

            {/* Exact Paragraph from User */}
            <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-2xl">
              <strong className="text-white font-semibold">Groovinto</strong> is a Bengaluru-based content studio building cinematic video for brands and storytellers. We shoot when a story needs a set, a face, a real place. We generate when a story needs a world that doesn’t exist yet. Most of the time, we do both — in the same project.
            </p>

            {/* CTAs Requested: [See our work] [Start a project] */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-see-work-btn"
                onClick={onSeeWork}
                className="group flex items-center gap-3 bg-white text-black hover:bg-neutral-200 text-sm font-mono uppercase tracking-wider px-6 py-3.5 rounded-md font-bold transition-all duration-200 shadow-xl shadow-white/5 hover:scale-[1.02]"
              >
                <Eye className="w-4 h-4 text-neutral-800 group-hover:text-black" />
                <span>See our work</span>
              </button>

              <button
                id="hero-start-project-btn"
                onClick={onStartProject}
                className="group flex items-center gap-3 bg-[#e65c00] hover:bg-[#ff6d19] text-white text-sm font-mono uppercase tracking-wider px-6 py-3.5 rounded-md font-bold transition-all duration-200 shadow-xl shadow-[#e65c00]/30 hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a project</span>
              </button>
            </div>

            {/* Micro proof points */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 font-mono text-xs text-neutral-400">
              <div>
                <div className="text-white text-base font-bold font-sans">100%</div>
                <div className="text-[11px] text-neutral-400">Story-First Scripts</div>
              </div>
              <div>
                <div className="text-white text-base font-bold font-sans">Unified</div>
                <div className="text-[11px] text-neutral-400">Directing + AI Pipeline</div>
              </div>
              <div>
                <div className="text-white text-base font-bold font-sans">Bengaluru</div>
                <div className="text-[11px] text-neutral-400">In-House Production</div>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Camera Viewfinder HUD */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl group">
              {/* Aspect Ratio 2.39:1 Cinema Frame Container */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                
                {/* Background Visual Stills */}
                <img
                  src={reelBackgrounds[activeViewMode]}
                  alt="Groovinto Cinema Reel Preview"
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    isPlaying ? 'scale-105' : 'scale-100 grayscale-[20%]'
                  }`}
                />

                {/* Film Grain & Letterbox Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />

                {/* Viewfinder Reticle / Crosshair */}
                <div className="absolute inset-4 pointer-events-none border border-white/20 rounded-lg">
                  {/* Four Corner Marks */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#ff833b]" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#ff833b]" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#ff833b]" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#ff833b]" />
                  
                  {/* Center Target */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#ff833b] rounded-full" />
                  </div>
                </div>

                {/* Top Viewfinder HUD */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono tracking-wider text-white">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold text-red-400">REC</span>
                    <span className="text-neutral-400">|</span>
                    <span>24.000 FPS</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-neutral-300">
                    TC {timecode}
                  </div>
                </div>

                {/* Bottom Viewfinder Info */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-white">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-neutral-300">
                    <span className="text-[#ff833b]">SCOPE 2.39:1</span>
                    <span>·</span>
                    <span>ISO 800</span>
                    <span>·</span>
                    <span>5600K</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded bg-black/70 hover:bg-[#e65c00] text-white border border-white/10 transition-colors"
                      aria-label="Play/Pause reel preview"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded bg-black/70 hover:bg-[#e65c00] text-white border border-white/10 transition-colors"
                      aria-label="Toggle sound preview"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Viewfinder Mode Switcher: Live vs AI vs Hybrid */}
              <div className="p-3 bg-[#111317] border-t border-white/10 flex items-center justify-between gap-2">
                <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#ff833b]" />
                  <span>Interactive Pipeline Switch:</span>
                </div>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-md border border-white/5 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveViewMode('camera')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeViewMode === 'camera'
                        ? 'bg-white text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Camera Set
                  </button>
                  <button
                    onClick={() => setActiveViewMode('generative')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeViewMode === 'generative'
                        ? 'bg-white text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    AI World
                  </button>
                  <button
                    onClick={() => setActiveViewMode('hybrid')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeViewMode === 'hybrid'
                        ? 'bg-[#e65c00] text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Hybrid Master
                  </button>
                </div>
              </div>
            </div>

            {/* Caption underneath reel HUD */}
            <p className="text-center text-[12px] font-mono text-neutral-500 mt-3 flex items-center justify-center gap-2">
              <Camera className="w-3.5 h-3.5 text-[#ff833b]" />
              <span>Optics meet Neural Weights — Seamless In-House Bengaluru Grade</span>
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-4 w-full pt-8 flex items-center justify-between text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff833b]" />
          <span>CINEMA REEL 2025/26</span>
        </div>
        <a
          href="#about"
          className="flex items-center gap-2 hover:text-[#ff833b] transition-colors py-1"
        >
          <span>Scroll to explore philosophy</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
