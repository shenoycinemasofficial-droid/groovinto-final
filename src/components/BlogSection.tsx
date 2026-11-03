import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Film,
  Layers,
  TrendingUp,
  Cpu,
  Video,
  ExternalLink
} from 'lucide-react';
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  BlogPost,
  BlogCategory
} from '../data/blogData';
import { BlogReaderModal } from './BlogReaderModal';

interface BlogSectionProps {
  onNavigateToSection: (sectionId: string) => void;
}

const ITEMS_PER_PAGE = 9;

export const BlogSection: React.FC<BlogSectionProps> = ({ onNavigateToSection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: BLOG_POSTS.length };
    BLOG_POSTS.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered posts based on query and category
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return BLOG_POSTS.filter((post) => {
      const matchCat = selectedCategory === 'all' || post.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.seoKeywords.some((k) => k.toLowerCase().includes(q)) ||
        (post.faqQuestion && post.faqQuestion.toLowerCase().includes(q)) ||
        post.author.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  // Reset pagination when filter changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const featuredPost = BLOG_POSTS[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'what-we-do':
        return <Film className="w-3.5 h-3.5" />;
      case 'why-necessary':
        return <TrendingUp className="w-3.5 h-3.5" />;
      case 'faqs':
        return <HelpCircle className="w-3.5 h-3.5" />;
      case 'ugc-creator':
        return <Video className="w-3.5 h-3.5" />;
      case 'hybrid-tech':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'roi-strategy':
        return <Layers className="w-3.5 h-3.5" />;
      default:
        return <BookOpen className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="blog" className="py-24 bg-[#0d0e12] border-t border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e65c00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* JSON-LD Schema for Blog Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Groovinto Content AI Studio Knowledge Engine',
            description:
              '100 in-depth guides covering what a content AI studio does, why hybrid video production is necessary, and answers to top filmmaking questions.',
            url: 'https://groovinto.com/#blog',
            numberOfPosts: BLOG_POSTS.length,
            publisher: {
              '@type': 'Organization',
              name: 'Groovinto Studio',
              logo: 'https://groovinto.com/logo.png',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bengaluru',
                addressCountry: 'IN'
              }
            }
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e65c00]/10 border border-[#e65c00]/30 text-xs font-mono uppercase tracking-wider text-[#ff833b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100 Comprehensive AI Studio Guides · SEO & Technical Index</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            The Content AI Studio <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff833b] via-[#ffa066] to-white">
              Knowledge Engine
            </span>
          </h2>

          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans">
            Everything you need to know about hybrid commercial filmmaking: what we do on set and in post-production, why AI video studios are essential for brand velocity, mostly asked questions with honest technical answers, and how Premiere Pro editing unifies physical camera glass with generative latent space.
          </p>
        </div>

        {/* Featured Editorial Guide (Displayed when no active search or on page 1 of all) */}
        {!searchQuery && selectedCategory === 'all' && currentPage === 1 && featuredPost && (
          <div className="mb-14 rounded-2xl bg-gradient-to-br from-[#15171d] via-[#101217] to-[#0d0e12] border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#e65c00]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#e65c00]/20 transition-all duration-700" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-md bg-[#e65c00] text-black text-xs font-mono font-bold uppercase tracking-wider">
                    Featured Master Guide #01
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                    {featuredPost.categoryLabel}
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ff833b]" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedPost(featuredPost)}
                  className="text-2xl sm:text-3xl font-bold text-white hover:text-[#ff833b] cursor-pointer transition-colors leading-tight font-sans"
                >
                  {featuredPost.title}
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Key takeaways bullet preview */}
                <div className="space-y-1.5 pt-2">
                  {featuredPost.takeaways.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff833b]" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Backlinks preview pill */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400">Featured Backlinks:</span>
                  {featuredPost.backlinks.map((bl, i) => (
                    <button
                      key={i}
                      onClick={() => onNavigateToSection(bl.targetUrl.replace('#', ''))}
                      className="px-2.5 py-1 rounded bg-black/40 hover:bg-[#e65c00]/20 border border-white/10 text-[11px] font-mono text-[#ff833b] flex items-center gap-1 transition-colors"
                    >
                      <span>{bl.keyword}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => setSelectedPost(featuredPost)}
                    className="px-6 py-3 rounded-lg bg-[#e65c00] hover:bg-[#ff6d19] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span>Read Complete 100-Guide Index</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono text-neutral-400">
                    By {featuredPost.author} · {featuredPost.publishDate}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  onClick={() => setSelectedPost(featuredPost)}
                  className="relative rounded-xl overflow-hidden aspect-[16/10] border border-white/15 cursor-pointer group/img shadow-xl"
                >
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                      Commercial Production Blueprint
                    </span>
                    <span className="text-[#ff833b] flex items-center gap-1">
                      Read Guide →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Category Filters Bar */}
        <div className="space-y-6 mb-10">
          {/* Search Input Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search across 100 guides: topics, Premiere Pro, copyright, UGC, pricing, FAQs..."
              className="w-full pl-10 pr-24 py-3 rounded-xl bg-[#13151b] border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#e65c00] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute inset-y-0 right-2 px-3 py-1 my-auto text-xs font-mono text-neutral-400 hover:text-white bg-white/5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-[#e65c00] text-white font-bold shadow-md'
                  : 'bg-[#14161c] hover:bg-[#1c1f27] text-neutral-300 border border-white/10'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>All Guides ({categoryCounts.all || 100})</span>
            </button>

            {BLOG_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#e65c00] text-white font-bold shadow-md'
                      : 'bg-[#14161c] hover:bg-[#1c1f27] text-neutral-300 border border-white/10'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{cat.label}</span>
                  <span className="text-[11px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Filter Status Summary */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-b border-white/10 pb-4">
            <div>
              Showing <span className="text-white font-semibold">{filteredPosts.length}</span> of 100 commercial guides
              {selectedCategory !== 'all' && (
                <span> in <span className="text-[#ff833b]">{BLOG_CATEGORIES.find(c => c.id === selectedCategory)?.label}</span></span>
              )}
              {searchQuery && <span> matching "{searchQuery}"</span>}
            </div>

            <div>
              Page <span className="text-white">{currentPage}</span> of {totalPages}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {paginatedPosts.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-[#13151a] rounded-2xl border border-white/10 p-8">
            <BookOpen className="w-8 h-8 text-neutral-500 mx-auto" />
            <div className="text-base font-bold text-white">No matching guides found</div>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              We couldn't find an article matching "{searchQuery}". Try searching for broader terms like "Premiere Pro", "UGC", "Camera", "Cost", or "FAQ".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors mt-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl bg-[#111317] border border-white/10 hover:border-[#e65c00]/50 transition-all duration-300 flex flex-col overflow-hidden group shadow-lg hover:shadow-orange-950/20"
            >
              {/* Cover Image & Category Pill */}
              <div
                onClick={() => setSelectedPost(post)}
                className="relative aspect-[16/9] overflow-hidden cursor-pointer bg-black/40"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#ff833b]">
                    {post.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#ff833b]" />
                    {post.readTime}
                  </span>
                  <span>{post.publishDate}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-[#ff833b] cursor-pointer transition-colors leading-snug line-clamp-2 font-sans"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* FAQ Snippet if available */}
                {post.faqQuestion && (
                  <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-[#ff833b] flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      <span>Key Question Answered:</span>
                    </div>
                    <div className="text-[11px] text-neutral-200 line-clamp-1 italic">
                      "{post.faqQuestion}"
                    </div>
                  </div>
                )}

                {/* Contextual Backlink Pills */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-neutral-500">Backlinks:</span>
                  {post.backlinks.slice(0, 2).map((bl, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToSection(bl.targetUrl.replace('#', ''));
                      }}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#e65c00]/20 border border-white/10 text-[10px] font-mono text-neutral-300 hover:text-[#ff833b] transition-colors"
                      title={bl.context}
                    >
                      {bl.keyword}
                    </button>
                  ))}
                </div>

                {/* Card Action Button */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400">
                    {post.author}
                  </span>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#ff833b] group-hover:text-[#ffa066] font-semibold transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-neutral-400">
              Showing page <span className="text-white font-semibold">{currentPage}</span> of {totalPages} ({filteredPosts.length} guides)
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  const el = document.getElementById('blog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-2 rounded-lg bg-[#14161c] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first, last, and within 2 of current page
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 2
                    );
                  })
                  .map((page, idx, arr) => {
                    const prev = arr[idx - 1];
                    return (
                      <React.Fragment key={page}>
                        {prev && page - prev > 1 && (
                          <span className="px-1 text-xs text-neutral-600 font-mono">...</span>
                        )}
                        <button
                          onClick={() => {
                            setCurrentPage(page);
                            const el = document.getElementById('blog');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors ${
                            currentPage === page
                              ? 'bg-[#e65c00] text-white font-bold'
                              : 'bg-[#14161c] border border-white/10 text-neutral-300 hover:bg-white/10'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  const el = document.getElementById('blog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-2 rounded-lg bg-[#14161c] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Quick Backlink Hub Banner at Bottom of Blog Section */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#12141a] via-[#171922] to-[#12141a] border border-white/15 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="text-xs font-mono uppercase tracking-wider text-[#ff833b] font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Need Custom Hybrid Video Production?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                Explore Groovinto's Studio Services & Live AI Training
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
                Ready to put these insights to work? Hire our Bengaluru directors for your next commercial campaign, master our tools in our 2-day live bootcamp, or explore our selected portfolio films.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateToSection('what-we-do')}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-colors"
              >
                What We Do (5 Formats)
              </button>
              <button
                onClick={() => onNavigateToSection('courses')}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-colors"
              >
                AI Video Bootcamp
              </button>
              <button
                onClick={() => onNavigateToSection('contact')}
                className="px-5 py-2.5 rounded-lg bg-[#e65c00] hover:bg-[#ff6d19] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md"
              >
                Direct Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <BlogReaderModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onNavigateToSection={onNavigateToSection}
          onSelectRelatedPost={(p) => setSelectedPost(p)}
          allPosts={BLOG_POSTS}
        />
      )}
    </section>
  );
};
