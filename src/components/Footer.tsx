import React from 'react';
import { ArrowUp, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { STUDIO_META } from '../data/studioData';
import { GroovintoLogo } from './GroovintoLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-[#07080a] border-t border-white/10 pt-16 pb-12 text-neutral-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <GroovintoLogo size="md" showTagline={true} />
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                BENGALURU
              </span>
            </div>

            <p className="text-sm text-neutral-300 font-sans max-w-md leading-relaxed">
              &ldquo;{STUDIO_META.tagline}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-neutral-400 pt-2 text-[11px]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ff833b]" />
                <span>{STUDIO_META.location}</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <a
                href={`mailto:${STUDIO_META.email}`}
                className="flex items-center gap-1.5 text-neutral-300 hover:text-[#ff833b] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#ff833b]" />
                <span>{STUDIO_META.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/groovinto_/"
                target="_blank"
                rel="noreferrer"
                aria-label="Groovinto on Instagram"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#ff833b] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/109300947/admin/page-posts/published/"
                target="_blank"
                rel="noreferrer"
                aria-label="Groovinto on LinkedIn"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#ff833b] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Studio Navigation
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Philosophy</a></li>
              <li><a href="#what-we-do" className="hover:text-white transition-colors">What We Do (5 Formats)</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors text-emerald-400">Courses (AI & Mind Training)</a></li>
              <li><a href="#how-we-work" className="hover:text-white transition-colors">How We Work (3 Pillars)</a></li>
              <li><a href="#why-groovinto" className="hover:text-white transition-colors">Why Groovinto</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Selected Work</a></li>
              <li><a href="#blog" className="hover:text-[#ff833b] transition-colors text-[#ff833b] font-medium">Blog (100 AI Studio Guides)</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Start a Project</a></li>
            </ul>
          </div>

          {/* Technical Pipeline Manifesto */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Toolkit Standard
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              Screenplays written with character stakes. Shot with optical cinema glass. Augmented with custom neural embeddings. Mastered in 4K DCI & Dolby Atmos.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-[11px] text-neutral-400 hover:text-white border border-white/10 px-3 py-1.5 rounded bg-white/5 transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Copyright & Signoff */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Groovinto Content Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Cameras · AI · Bengaluru</span>
            <span>·</span>
            <a
              href={`mailto:${STUDIO_META.email}`}
              className="text-[#ff833b] hover:underline"
            >
              {STUDIO_META.email}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
