import React, { useState, useEffect } from 'react';
import { SHOWCASE_PROJECTS } from '../data/studioData';
import { ProjectItem } from '../types';
import {
  Film,
  Cpu,
  Clock,
  Eye,
  Play,
  Sparkles,
  Youtube,
  Link2,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Maximize2,
  X
} from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeWatchUrl } from '../utils/youtube';

interface WorkShowcaseSectionProps {
  onStartProjectWithContext: (contextTitle: string) => void;
}

const STORAGE_KEY = 'groovinto_custom_youtube_urls';
const GROOVINTO_CHANNEL_URL = 'https://www.youtube.com/@groovinto-1';

export const WorkShowcaseSection: React.FC<WorkShowcaseSectionProps> = ({
  onStartProjectWithContext
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalMode, setModalMode] = useState<'video' | 'stills'>('video');
  const [customUrls, setCustomUrls] = useState<Record<string, string>>({});
  const [activeAttachId, setActiveAttachId] = useState<string | null>(null);
  const [attachInput, setAttachInput] = useState('');
  const [quickSaved, setQuickSaved] = useState<string | null>(null);
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);

  // Load any user-customized YouTube URLs from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCustomUrls(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUpdateYouTubeUrl = (projectId: string, newUrl: string) => {
    const updated = { ...customUrls, [projectId]: newUrl };
    setCustomUrls(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Update currently selected project if open
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject({
        ...selectedProject,
        youtubeUrl: newUrl,
        youtubeId: extractYouTubeId(newUrl) || selectedProject.youtubeId
      });
    }
  };

  const handleQuickAttach = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAttachId(projectId);
    setAttachInput(customUrls[projectId] || '');
  };

  const handleQuickSave = (projectId: string, e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (attachInput.trim()) {
      handleUpdateYouTubeUrl(projectId, attachInput.trim());
      setQuickSaved(projectId);
      setTimeout(() => {
        setQuickSaved(null);
        setActiveAttachId(null);
      }, 1400);
    }
  };

  const categories = [
    { id: 'all', label: 'All Work (9)' },
    { id: 'videos', label: 'Videos & Films (6)' },
    { id: 'shorts', label: 'YouTube Shorts (9:16) (3)' },
    { id: 'commercial', label: 'Commercials (2)' },
    { id: 'brand-doc', label: 'Brand Doc (1)' },
    { id: 'narrative', label: 'Series & Trailers (3)' }
  ];

  // Merge projects with customized YouTube URLs
  const projectsWithOverrides = SHOWCASE_PROJECTS.map((p) => {
    const overrideUrl = customUrls[p.id];
    if (overrideUrl) {
      return {
        ...p,
        youtubeUrl: overrideUrl,
        youtubeId: extractYouTubeId(overrideUrl) || p.youtubeId
      };
    }
    return p;
  });

  const filteredProjects = projectsWithOverrides.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'videos') return !p.isShort;
    if (activeFilter === 'shorts') return p.isShort || p.category === 'shorts';
    if (activeFilter === 'commercial') return p.category === 'commercial';
    if (activeFilter === 'brand-doc') return p.category === 'brand-doc';
    if (activeFilter === 'narrative') return p.category === 'narrative' || p.category === 'episodic';
    return p.category === activeFilter;
  });

  const openProjectModal = (project: ProjectItem, mode: 'video' | 'stills' = 'video') => {
    setSelectedProject(project);
    setModalMode(mode);
  };

  return (
    <section id="work" className="py-28 bg-[#0b0c0e] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Channel Banner Highlight */}
        <div className="mb-10 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#161313] to-neutral-900/60 border border-red-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 shrink-0">
              <Youtube className="w-7 h-7 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-base sm:text-lg font-sans">
                  Official YouTube Channel: @groovinto-1
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-mono border border-red-500/30">
                  Official Stream
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Every video and vertical short below streams directly from YouTube itself. Play in-place or in the theater player.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={GROOVINTO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-semibold shadow-md shadow-red-600/30 transition-all w-full sm:w-auto"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Visit @groovinto-1 on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#ff833b] mb-4">
              <span>Showcase & Films</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
              Selected Work
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base">
              Original commercials, documentary films, episodic thrillers, and viral 9:16 Shorts produced by Groovinto.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
              <Film className="w-3.5 h-3.5 text-[#ff833b]" />
              <span>6 Landscape Films</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
              <Smartphone className="w-3.5 h-3.5 text-red-400" />
              <span>3 Shorts (9:16)</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                activeFilter === cat.id
                  ? 'bg-[#e65c00] text-white font-semibold shadow-md shadow-[#e65c00]/25'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isPlayingInline = inlinePlayingId === project.id;
            const embedUrl = getYouTubeEmbedUrl(project.youtubeId || project.youtubeUrl, true);
            const watchUrl = getYouTubeWatchUrl(project.youtubeId || project.youtubeUrl, project.isShort);

            return (
              <div
                key={project.id}
                className={`group rounded-2xl bg-[#111317] border overflow-hidden transition-all flex flex-col justify-between shadow-xl ${
                  isPlayingInline
                    ? 'border-red-500/60 ring-2 ring-red-500/20'
                    : 'border-white/10 hover:border-[#ff833b]/50 hover:-translate-y-1'
                }`}
              >
                {/* Card Media Header / Inline Player Container */}
                <div className={`relative overflow-hidden bg-black ${project.isShort ? 'aspect-[9/10] sm:aspect-[9/11]' : 'aspect-[16/10]'}`}>
                  {isPlayingInline && embedUrl ? (
                    <div className="relative w-full h-full bg-black flex flex-col justify-between">
                      {/* Top bar during inline play */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20 pointer-events-auto">
                        <span className="px-2.5 py-1 rounded bg-black/85 text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow backdrop-blur-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Streaming from YouTube</span>
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openProjectModal(project, 'video')}
                            className="p-1.5 rounded bg-black/85 hover:bg-black text-white text-xs border border-white/20 shadow backdrop-blur-sm"
                            title="Open in Full Theater"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setInlinePlayingId(null)}
                            className="p-1.5 rounded bg-red-600/90 hover:bg-red-600 text-white text-xs shadow backdrop-blur-sm"
                            title="Close Player"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Responsive iframe */}
                      <div className="w-full h-full flex items-center justify-center bg-black">
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
                    /* Thumbnail View with Play Click Handlers */
                    <div
                      onClick={() => openProjectModal(project, 'video')}
                      className="relative w-full h-full cursor-pointer group"
                    >
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      {/* Badges on Thumbnail */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-10">
                        <div className="flex items-center gap-1.5">
                          {project.isShort ? (
                            <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold flex items-center gap-1 shadow">
                              <Smartphone className="w-3 h-3" />
                              <span>Short 9:16</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-black/75 text-white border border-white/15 backdrop-blur-sm">
                              {project.aspectRatio}
                            </span>
                          )}
                          {project.client && (
                            <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10 backdrop-blur-sm text-[10px] hidden sm:inline">
                              {project.client}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-red-600/90 text-white font-mono flex items-center gap-1 shadow">
                            <Youtube className="w-3 h-3 text-white fill-white" />
                            <span>YouTube</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#e65c00] text-white font-bold">
                            {project.duration}
                          </span>
                        </div>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 border-2 border-white/30 backdrop-blur-sm">
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </div>
                      </div>

                      {/* Bottom Quick Controls on Hover */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-95 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInlinePlayingId(project.id);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 hover:bg-white text-black text-xs font-mono font-bold shadow-lg transition-transform hover:scale-105"
                          title="Play right here on this card"
                        >
                          <Play className="w-3 h-3 text-red-600 fill-red-600" />
                          <span>Play Inline</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectModal(project, 'video');
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black text-white text-[11px] font-mono border border-white/20 transition-colors shadow"
                            title="Open theater view"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Theater</span>
                          </button>

                          <a
                            href={watchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/80 hover:bg-red-600 text-white text-[11px] font-mono border border-white/20 transition-colors shadow"
                            title="Watch directly on YouTube"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Meta & Breakdown */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono text-[#ff833b] uppercase tracking-wider font-semibold">
                        {project.categoryLabel}
                      </span>

                      <button
                        onClick={(e) => handleQuickAttach(project.id, e)}
                        className="text-[10px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                        title="Attach custom YouTube link"
                      >
                        <Link2 className="w-2.5 h-2.5 text-[#ff833b]" />
                        <span>Attach URL</span>
                      </button>
                    </div>

                    <h3
                      onClick={() => openProjectModal(project, 'video')}
                      className="text-xl font-bold text-white font-sans group-hover:text-[#ff833b] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Inline Quick Attach Input Box if toggled */}
                    {activeAttachId === project.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 p-2.5 rounded-lg bg-black/80 border border-[#ff833b]/40 animate-in fade-in"
                      >
                        <div className="text-[10px] font-mono text-neutral-300 mb-1 flex items-center gap-1">
                          <Youtube className="w-3 h-3 text-red-500" />
                          <span>Paste YouTube URL:</span>
                        </div>
                        <form
                          onSubmit={(e) => handleQuickSave(project.id, e)}
                          className="flex gap-1.5"
                        >
                          <input
                            type="text"
                            value={attachInput}
                            onChange={(e) => setAttachInput(e.target.value)}
                            placeholder="https://youtube.com/..."
                            className="flex-1 px-2 py-1 text-xs rounded bg-white/10 text-white font-mono border border-white/20 focus:outline-none focus:border-[#ff833b]"
                          />
                          <button
                            type="submit"
                            className="px-2.5 py-1 rounded bg-[#e65c00] text-white text-[10px] font-mono font-bold hover:bg-[#ff6d19]"
                          >
                            {quickSaved === project.id ? (
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            ) : (
                              'Set'
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveAttachId(null);
                            }}
                            className="px-2 py-1 rounded bg-white/10 text-neutral-400 text-[10px] font-mono"
                          >
                            ✕
                          </button>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Pipeline Split Bar */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Film className="w-3 h-3 text-blue-400" />
                        <span>Live {project.pipeline.liveRatio}%</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-3 h-3 text-[#ff833b]" />
                        <span>AI {project.pipeline.aiRatio}%</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${project.pipeline.liveRatio}%` }}
                        className="bg-blue-500 h-full"
                      />
                      <div
                        style={{ width: `${project.pipeline.aiRatio}%` }}
                        className="bg-[#e65c00] h-full"
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for In-Website Video Playback & Project Detail */}
        <ProjectModal
          project={selectedProject}
          initialMode={modalMode}
          onClose={() => setSelectedProject(null)}
          onUpdateProjectYouTubeUrl={handleUpdateYouTubeUrl}
          onInquire={(title) => {
            setSelectedProject(null);
            onStartProjectWithContext(title);
          }}
        />

      </div>
    </section>
  );
};
