import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Video, ArrowUpRight } from 'lucide-react';
import { STUDIO_META } from '../data/studioData';
import { GroovintoLogo } from './GroovintoLogo';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bengaluruTime, setBengaluruTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setBengaluruTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'What We Do', href: '#what-we-do' },
    { label: 'Courses', href: '#courses' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Why Us', href: '#why-groovinto' },
    { label: 'Work', href: '#work' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0c0e]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-[#0b0c0e]/60 backdrop-blur-sm py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo - Official GROOVINTO with Eyeballs and Guide. Gain. Grow */}
        <a
          href="#"
          className="flex items-center gap-3.5 group py-1 mr-6 sm:mr-8 lg:mr-10 shrink-0"
          id="brand-logo-link"
          aria-label="GROOVINTO Home"
        >
          <div className="group-hover:scale-105 transition-transform origin-left">
            <GroovintoLogo size="md" showTagline={true} />
          </div>
          <div className="hidden xl:block pl-3 border-l border-white/10">
            <p className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Bengaluru, IN · {bengaluruTime || 'IST'}
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-7 text-xs font-medium text-neutral-300 shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`hover:text-[#ff7824] transition-colors relative py-1 uppercase tracking-wider font-mono text-[11px] lg:text-xs whitespace-nowrap ${
                link.label === 'Courses'
                  ? 'text-emerald-400 font-semibold flex items-center gap-1.5'
                  : ''
              }`}
            >
              {link.label === 'Courses' && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Action (No email beside contact as requested) */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            id="nav-start-project-btn"
            onClick={onOpenInquiry}
            className="flex items-center gap-2 bg-[#e65c00] hover:bg-[#ff6d19] text-white text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded-md font-semibold transition-all duration-200 shadow-lg shadow-[#e65c00]/20 hover:shadow-[#e65c00]/40 hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start a project</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-200 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#0e1014] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex flex-col space-y-3 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-300 hover:text-[#ff7824] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </a>
            ))}
          </div>
          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#e65c00] hover:bg-[#ff6d19] text-white text-xs font-mono uppercase tracking-wider py-3 rounded-md font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start a project</span>
            </button>
            <p className="text-center font-mono text-xs text-neutral-500">
              Direct: {STUDIO_META.email}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
