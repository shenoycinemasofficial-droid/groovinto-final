import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Clock,
  Film,
  Cpu,
  Check,
  Sparkles,
  Youtube,
  Link2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { ProjectItem } from '../types';
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeWatchUrl } from '../utils/youtube';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
  onUpdateProjectYouTubeUrl?: (projectId: string, newUrl: string) => void;
  initialMode?: 'video' | 'stills';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquire,
  onUpdateProjectYouTubeUrl,
  initialMode = 'video'
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'stills'>('video');
  const [showUrlEditor, setShowUrlEditor] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (project) {
      setActiveTab(initialMode);
      setInputUrl(project.youtubeUrl || '');
      setShowUrlEditor(false);
      setSaveSuccess(false);
      setErrorMessage('');
    }
  }, [project, initialMode]);

  if (!project) return null;

  const currentYouTubeId = project.youtubeId || extractYouTubeId(project.youtubeUrl);
  const embedUrl = currentYouTubeId ? getYouTubeEmbedUrl(currentYouTubeId, true) : null;

  const handleSaveYouTubeUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const extracted = extractYouTubeId(inputUrl);

    if (!extracted) {
      setErrorMessage('Please enter a valid YouTube URL or 11-character video ID');
      return;
    }

    if (onUpdateProjectYouTubeUrl) {
      onUpdateProjectYouTubeUrl(project.id, inputUrl);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowUrlEditor(false);
    }, 1500);
  };

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="project-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#101216] border border-white/20 rounded-2xl overflow-hidden shadow-2xl my-6 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Control Bar with Close Button and View Switcher */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/75 hover:bg-[#e65c00] text-white border border-white/20 transition-colors shadow-lg"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Screen Header Area */}
        <div className="relative w-full bg-black border-b border-white/10">
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0b0d] border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'video'
                    ? 'bg-[#e65c00] text-white font-semibold shadow'
                    : 'text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                <Youtube className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>Watch on Website</span>
              </button>

              <button
                onClick={() => setActiveTab('stills')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'stills'
                    ? 'bg-white/20 text-white font-semibold shadow'
                    : 'text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Production Stills</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {currentYouTubeId && (
                <a
                  href={getYouTubeWatchUrl(currentYouTubeId, project.isShort || project.aspectRatio === '9:16')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white px-2.5 py-1 rounded bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 transition-colors"
                  title="Open this video directly on YouTube"
                >
                  <ExternalLink className="w-3 h-3 text-red-400" />
                  <span className="hidden sm:inline">Open on YouTube</span>
                  <span className="sm:hidden">YouTube</span>
                </a>
              )}

              <button
                onClick={() => setShowUrlEditor(!showUrlEditor)}
                className="flex items-center gap-1 text-[11px] text-[#ff833b] hover:text-white px-2.5 py-1 rounded bg-[#e65c00]/10 hover:bg-[#e65c00]/20 border border-[#e65c00]/30 transition-colors"
                title="Attach your own YouTube link to this work"
              >
                <Link2 className="w-3 h-3" />
                <span className="hidden sm:inline">Attach Link</span>
              </button>
            </div>
          </div>

          {/* Quick YouTube Link Editor Form (Toggleable) */}
          {showUrlEditor && (
            <form
              onSubmit={handleSaveYouTubeUrl}
              className="px-4 py-3 bg-[#15181e] border-b border-white/15 flex flex-col sm:flex-row items-center gap-3 animate-in slide-in-from-top-2 duration-200"
            >
              <div className="flex-1 w-full relative">
                <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-neutral-300">
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>Attach YouTube URL (video plays inside website):</span>
                </div>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=... or shorts URL"
                  className="w-full px-3 py-2 text-xs rounded-md bg-black/70 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff833b] font-mono"
                />
                {errorMessage && (
                  <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errorMessage}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto self-end sm:self-auto">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-[#e65c00] hover:bg-[#ff6d19] text-white text-xs font-mono font-semibold transition-all shadow flex items-center justify-center gap-1"
                >
                  {saveSuccess ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Save & Play</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlEditor(false)}
                  className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-mono"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Main Media Player or Image Container */}
          <div className="relative w-full">
            {activeTab === 'video' ? (
              embedUrl ? (
                <div className="relative w-full bg-black">
                  {/* Container with appropriate aspect ratio */}
                  {project.aspectRatio === '9:16' ? (
                    <div className="w-full flex justify-center bg-neutral-950 py-2">
                      <div className="w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                        <iframe
                          src={embedUrl}
                          title={project.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full">
                      <iframe
                        src={embedUrl}
                        title={project.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Notification badge inside player area */}
                  <div className="px-4 py-2 bg-black/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Playing inside Groovinto embedded theater</span>
                    </span>
                    <span className="text-neutral-500">ID: {currentYouTubeId}</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-[16/9] w-full flex flex-col items-center justify-center p-8 text-center bg-black/60">
                  <Youtube className="w-12 h-12 text-red-500 mb-3" />
                  <p className="text-sm text-neutral-300 font-sans mb-3">
                    No YouTube link attached to this project yet.
                  </p>
                  <button
                    onClick={() => setShowUrlEditor(true)}
                    className="px-4 py-2 rounded-md bg-[#e65c00] hover:bg-[#ff6d19] text-white text-xs font-mono flex items-center gap-2"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Attach YouTube Link Now</span>
                  </button>
                </div>
              )
            ) : (
              /* Stills Mode */
              <div className="relative aspect-[21/9] sm:aspect-[2.39/1] w-full overflow-hidden bg-black">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-black/40 to-transparent" />
                
                {/* Badges on Visual */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-[#e65c00] text-white font-bold tracking-wider uppercase">
                    {project.categoryLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/60 text-neutral-300 border border-white/10 backdrop-blur-md">
                    {project.aspectRatio}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/60 text-neutral-300 border border-white/10 backdrop-blur-md flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {project.duration}
                  </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
                    {project.title}
                  </h2>
                  <p className="text-[#ff833b] font-mono text-xs sm:text-sm mt-1">
                    {project.tagline}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title Header if in Video mode */}
          {activeTab === 'video' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#e65c00] text-white font-bold tracking-wider uppercase">
                  {project.categoryLabel}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10">
                  {project.aspectRatio}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {project.duration}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                {project.title}
              </h2>
              <p className="text-[#ff833b] font-mono text-xs sm:text-sm mt-1">
                {project.tagline}
              </p>
            </div>
          )}

          {/* Pipeline Meter */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="flex items-center gap-2 text-white font-semibold">
                <Film className="w-4 h-4 text-blue-400" />
                <span>Live Set: {project.pipeline.liveRatio}%</span>
              </span>
              <span className="flex items-center gap-2 text-[#ff833b] font-semibold">
                <Cpu className="w-4 h-4 text-[#ff833b]" />
                <span>AI Pipeline: {project.pipeline.aiRatio}%</span>
              </span>
            </div>

            {/* Visual ratio bar */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${project.pipeline.liveRatio}%` }}
                className="bg-blue-500 h-full"
              />
              <div
                style={{ width: `${project.pipeline.aiRatio}%` }}
                className="bg-[#e65c00] h-full"
              />
            </div>

            {/* Gear & Toolchains */}
            <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono">
              {project.pipeline.cameraGear && (
                <div>
                  <span className="text-neutral-500 block">PRODUCTION HARDWARE / SETUP:</span>
                  <span className="text-neutral-300">{project.pipeline.cameraGear.join(' · ')}</span>
                </div>
              )}
              {project.pipeline.aiToolchain && (
                <div>
                  <span className="text-neutral-500 block">CREATIVE & NEURAL PIPELINE:</span>
                  <span className="text-neutral-300">{project.pipeline.aiToolchain.join(' · ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Project Overview & Strategy
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Breakdown: Challenge vs Hybrid Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <h5 className="text-xs font-mono text-[#ff833b] uppercase mb-1 font-semibold">
                Story / Performance Challenge
              </h5>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {project.breakdown.storyChallenge}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <h5 className="text-xs font-mono text-emerald-400 uppercase mb-1 font-semibold">
                Groovinto Hybrid Solution
              </h5>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {project.breakdown.hybridSolution}
              </p>
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Deliverables Produced
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.breakdown.deliverables.map((deliv) => (
                <span
                  key={deliv}
                  className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-[#ff833b]" />
                  {deliv}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-neutral-400">
              Need UGC videos, creator content, or a cinematic film like this?
            </div>
            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#e65c00] hover:bg-[#ff6d19] text-white text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-md font-semibold transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Inquire about a production like this</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
