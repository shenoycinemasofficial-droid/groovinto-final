import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { BlogPost } from '../data/blogData';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSelectRelatedPost: (post: BlogPost) => void;
  allPosts: BlogPost[];
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  onClose,
  onNavigateToSection,
  onSelectRelatedPost,
  allPosts
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#blog-${post.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBacklinkClick = (targetUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    const sectionId = targetUrl.replace('#', '');
    onClose();
    setTimeout(() => {
      onNavigateToSection(sectionId);
    }, 150);
  };

  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // Render content with interactive links
  const renderFormattedParagraphs = (content: string) => {
    const sections = content.split('\n\n');

    return sections.map((sec, idx) => {
      const trimmed = sec.trim();
      if (!trimmed) return null;

      // Heading 2
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-8 mb-4 pt-4 border-t border-white/10 font-sans flex items-center gap-2.5"
          >
            <span className="w-1.5 h-5 rounded-full bg-[#ff833b]" />
            <span>{trimmed.replace('## ', '')}</span>
          </h2>
        );
      }

      // Heading 3
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="text-base sm:text-lg font-semibold text-neutral-200 mt-6 mb-3 font-sans"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Blockquote / FAQ Callout
      if (trimmed.startsWith('> ')) {
        const quoteText = trimmed.replace(/> /g, '');
        return (
          <div
            key={idx}
            className="my-6 p-5 rounded-xl bg-gradient-to-r from-[#e65c00]/10 via-[#181a20] to-[#12141a] border-l-4 border-[#e65c00] border-t border-r border-b border-white/10"
          >
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#ff833b] shrink-0 mt-0.5" />
              <div className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                {quoteText}
              </div>
            </div>
          </div>
        );
      }

      // Bullet List
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n- ');
        return (
          <ul key={idx} className="my-4 space-y-2 text-sm sm:text-base text-neutral-300 pl-4 list-disc marker:text-[#ff833b]">
            {items.map((item, itemIdx) => {
              const cleaned = item.replace(/^- /, '');
              return (
                <li key={itemIdx} className="leading-relaxed">
                  {renderTextWithLinks(cleaned)}
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-sm sm:text-base text-neutral-300 leading-relaxed my-4 font-sans">
          {renderTextWithLinks(trimmed)}
        </p>
      );
    });
  };

  // Helper to replace markdown style links [Text](#section) with interactive clickable buttons
  const renderTextWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\((#[a-zA-Z0-9_-]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const label = match[1];
      const targetUrl = match[2];
      parts.push(
        <button
          key={match.index}
          onClick={(e) => handleBacklinkClick(targetUrl, e)}
          className="inline-flex items-center gap-1 font-semibold text-[#ff833b] hover:text-[#ffa066] underline underline-offset-4 decoration-[#ff833b]/40 hover:decoration-[#ff833b] transition-colors mx-0.5"
          title={`Jump to ${targetUrl} section on Groovinto`}
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 inline-block opacity-70" />
        </button>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#111317] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c0d10] sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded bg-[#e65c00]/15 border border-[#e65c00]/30 text-xs font-mono uppercase tracking-wider text-[#ff833b]">
              {post.categoryLabel}
            </span>
            <span className="text-neutral-500 hidden sm:inline">·</span>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 transition-colors"
              title="Copy shareable link to this guide"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 flex-1 space-y-8">
          {/* Article Hero */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
              {post.title}
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed border-l-2 border-[#e65c00] pl-4 italic">
              {post.excerpt}
            </p>

            {/* Author Meta */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-neutral-400 border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e65c00] to-orange-400 flex items-center justify-center text-white font-bold text-xs">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold">{post.author}</div>
                  <div className="text-[11px] text-neutral-500">{post.authorRole}</div>
                </div>
              </div>

              <span className="text-neutral-600 hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-neutral-400">
                <Calendar className="w-3.5 h-3.5 text-[#ff833b]" />
                <span>{post.publishDate}</span>
              </div>

              <span className="text-neutral-600 hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-[#ff833b]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative rounded-xl overflow-hidden aspect-[21/9] border border-white/10">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-mono text-neutral-300 bg-black/60 backdrop-blur-sm px-3 py-1 rounded">
                Groovinto Studio Research Desk · Bengaluru
              </div>
            </div>
          )}

          {/* Key Takeaways Box */}
          <div className="p-5 rounded-xl bg-[#161920] border border-white/15 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff833b] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Key Executive Takeaways</span>
            </div>
            <ul className="space-y-2 text-sm text-neutral-200">
              {post.takeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff833b] mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rendered Body Content */}
          <div className="article-body font-sans text-neutral-200">
            {renderFormattedParagraphs(post.content)}
          </div>

          {/* Direct Internal Backlinks Callout */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#1b1f27] to-[#12141a] border border-[#e65c00]/30 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff833b] font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Direct Studio Backlinks & Explore Points</span>
            </div>
            <p className="text-xs text-neutral-400">
              Jump directly into relevant production segments on our site to explore technical pipelines, view commercial case studies, or commission a project:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {post.backlinks.map((link, i) => (
                <button
                  key={i}
                  onClick={(e) => handleBacklinkClick(link.targetUrl, e)}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/40 hover:bg-[#e65c00]/15 border border-white/10 hover:border-[#e65c00]/40 text-left transition-all group"
                >
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#ff833b] transition-colors">
                      {link.keyword}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{link.context}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-[#ff833b] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* SEO Keywords Tags */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Target SEO Keywords & Categorical Index:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {post.seoKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Conversion Banner */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#e65c00] via-[#ff6d19] to-[#ff833b] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold font-sans">
                Ready to Produce Your Hybrid AI Commercial?
              </h3>
              <p className="text-xs text-orange-100 max-w-md">
                Talk directly with our Bengaluru hybrid directors. We shoot live camera footage, composite with generative models in Premiere Pro, and deliver in 5-10 days.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => onNavigateToSection('contact'), 150);
              }}
              className="px-6 py-3 rounded-lg bg-black text-white hover:bg-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Direct Studio Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
                Related Guides in {post.categoryLabel}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.slug}
                    onClick={() => onSelectRelatedPost(rel)}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff833b]/40 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="text-[11px] font-mono text-[#ff833b]">{rel.readTime}</div>
                    <div className="text-xs font-bold text-white group-hover:text-[#ff833b] line-clamp-2 leading-snug">
                      {rel.title}
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
