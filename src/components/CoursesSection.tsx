import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Brain,
  Video,
  Clock,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  BookOpen,
  Tag,
  Percent,
  X,
  Send,
  Check,
  Calendar,
  PlayCircle
} from 'lucide-react';
import { COURSES } from '../data/studioData';
import { CourseItem } from '../types';

interface CoursesSectionProps {
  onSelectCourseForInquiry: (courseTitle: string) => void;
  onOpenCoursePayment: (course: CourseItem) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectCourseForInquiry,
  onOpenCoursePayment
}) => {
  const [activeCourseId, setActiveCourseId] = useState<string>('ai-video-production');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'ai-video-production-0': true,
    'mind-training-0': true
  });

  // Quick Enrollment Modal State
  const [enrollingCourse, setEnrollingCourse] = useState<CourseItem | null>(null);
  const [enrollForm, setEnrollForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);

  const activeCourse: CourseItem =
    COURSES.find((c) => c.id === activeCourseId) || COURSES[0];

  const toggleModule = (moduleKey: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  const handleOpenEnrollModal = (course: CourseItem) => {
    onOpenCoursePayment(course);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollSubmitted(true);
    setTimeout(() => {
      if (enrollingCourse) {
        onSelectCourseForInquiry(
          `Enrollment Confirmed: ${enrollingCourse.title} (Offer Fee: ${enrollingCourse.pricing.currencySymbol}${enrollingCourse.pricing.offerPrice.toLocaleString('en-IN')}) - Student: ${enrollForm.name || 'Enrollee'}`
        );
      }
    }, 1200);
  };

  return (
    <section
      id="courses"
      className="py-24 sm:py-32 bg-[#090a0d] relative overflow-hidden border-t border-neutral-800/80 scroll-mt-16"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#e65c00]/10 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Groovinto Academy · Studio Training & Mentorship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Master the Craft:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6d19] via-amber-400 to-emerald-400">
              AI Video Production
            </span>{' '}
            & Mind Training
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
            We do not just make films at Groovinto — we train the next wave of creators,
            directors, and storytellers. Learn our actual commercial studio workflows or
            train the psychological operating system required to create under high stakes.
          </p>
        </div>

        {/* Course Selector Cards with Prominent Pricing & Math Discount Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {COURSES.map((course) => {
            const isSelected = course.id === activeCourseId;
            const isAi = course.category === 'ai-video';
            const pricing = course.pricing;

            return (
              <div
                key={course.id}
                onClick={() => setActiveCourseId(course.id)}
                id={`course-tab-${course.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveCourseId(course.id)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 transition-all duration-300 text-left relative overflow-hidden border flex flex-col justify-between ${
                  isSelected
                    ? isAi
                      ? 'bg-gradient-to-b from-[#1c140e] to-[#121316] border-[#ff5500]/70 shadow-2xl shadow-[#ff5500]/15 ring-1 ring-[#ff5500]/40'
                      : 'bg-gradient-to-b from-[#0e1c15] to-[#121316] border-emerald-500/70 shadow-2xl shadow-emerald-500/15 ring-1 ring-emerald-500/40'
                    : 'bg-[#111317]/85 hover:bg-[#15171d] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Active Indicator Top Pill */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold ${
                        isAi
                          ? 'bg-[#ff5500]/15 text-[#ff7824] border border-[#ff5500]/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {isAi ? <Video className="w-3.5 h-3.5" /> : <Brain className="w-3.5 h-3.5" />}
                      <span>{course.badge}</span>
                    </span>

                    <span className="text-xs font-mono text-neutral-300 flex items-center gap-1.5 font-semibold">
                      {isAi ? (
                        <>
                          <Calendar className="w-3.5 h-3.5 text-[#ff7824]" />
                          <span>2 Days Live Workshop</span>
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Pre-Recorded Course</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-5 line-clamp-2">
                    {course.subtitle}
                  </p>
                </div>

                {/* PRICING & MATH CALCULATION BOX */}
                <div className="pt-4 border-t border-white/10">
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/80 border border-white/15 mb-4 shadow-inner">
                    {/* Top Row: Original Price Struck-Through & Discount Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                          Regular:
                        </span>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black font-mono line-through text-red-400/90 decoration-red-500 decoration-[3px]">
                          {pricing.currencySymbol}{pricing.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs sm:text-sm font-mono font-black tracking-wider shadow-md ${
                          isAi
                            ? 'bg-[#ff5500]/25 text-[#ff7824] border border-[#ff5500]/50'
                            : 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/50'
                        }`}
                      >
                        <Percent className="w-3.5 h-3.5" />
                        <span>{pricing.discountPercentage}% OFF</span>
                      </span>
                    </div>

                    {/* Middle Row: Massive Offer Price (4999 / 399) */}
                    <div className="my-2">
                      <div className="flex flex-wrap items-baseline gap-2.5">
                        <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)]">
                          {pricing.currencySymbol}{pricing.offerPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-emerald-400 font-bold">
                          (Save {pricing.currencySymbol}{pricing.savings.toLocaleString('en-IN')}!)
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 mt-1">
                        All-inclusive tuition fee · Direct mentorship
                      </div>
                    </div>

                    {/* Calculated math explanation & limited seats */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                      <span className="flex items-center gap-1.5 text-[#ff833b] font-semibold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{pricing.priceNote}</span>
                      </span>
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                        <span>Limited Seats</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">
                      Format: <span className="text-neutral-200">{course.format.split('+')[0].split(',')[0]}</span>
                    </span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isSelected ? (isAi ? 'text-[#ff7824]' : 'text-emerald-400') : 'text-neutral-400'
                      }`}
                    >
                      {isSelected ? 'Viewing Details' : 'View Syllabus & Enroll'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Course Syllabus, Pricing & Overview Panel */}
        <div
          id="active-course-detail-view"
          className="bg-[#121418] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative"
        >
          {/* Top Banner with Embedded Pricing Card */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-white/10">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-semibold ${
                    activeCourse.category === 'ai-video'
                      ? 'bg-[#ff5500]/20 text-[#ff7824] border border-[#ff5500]/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}
                >
                  {activeCourse.title}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 text-neutral-300 border border-white/10">
                  {activeCourse.level}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 text-neutral-200 border border-white/10 flex items-center gap-1.5">
                  {activeCourse.category === 'ai-video' ? (
                    <>
                      <Calendar className="w-3.5 h-3.5 text-[#ff7824]" />
                      <span>2-Day Live Studio Bootcamp</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pre-Recorded Video Course · Watch Anytime</span>
                    </>
                  )}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {activeCourse.subtitle}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
                {activeCourse.summary}
              </p>
            </div>

            {/* High-Impact Pricing & Enrollment Action Card */}
            <div className="lg:w-88 shrink-0 p-6 rounded-2xl bg-black/85 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-neutral-400 uppercase tracking-wider font-semibold">
                  {activeCourse.category === 'ai-video' ? '2-Day Workshop Fee' : 'Pre-Recorded Course Fee'}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/25 text-emerald-400 font-black text-xs border border-emerald-500/40 animate-pulse">
                  {activeCourse.pricing.discountPercentage}% OFF
                </span>
              </div>

              {/* Price Figures with Massive Font (20000 / 5000 -> 4999 / 399) */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2.5 mb-1.5">
                  <span className="text-xs font-mono uppercase text-neutral-400 font-semibold">Regular:</span>
                  <span className="text-2xl sm:text-3xl font-black font-mono line-through text-red-400/90 decoration-red-500 decoration-[3px]">
                    {activeCourse.pricing.currencySymbol}{activeCourse.pricing.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
                    {activeCourse.pricing.currencySymbol}{activeCourse.pricing.offerPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">only</span>
                </div>
                <div className="text-sm font-mono text-emerald-400 mt-2 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You Save {activeCourse.pricing.currencySymbol}{activeCourse.pricing.savings.toLocaleString('en-IN')} Instantly!</span>
                </div>
              </div>

              {/* Math breakdown row */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Regular Tuition:</span>
                  <span className="line-through text-red-400 font-bold">{activeCourse.pricing.currencySymbol}{activeCourse.pricing.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Groovinto Scholarship ({activeCourse.pricing.discountPercentage}%):</span>
                  <span>-{activeCourse.pricing.currencySymbol}{activeCourse.pricing.savings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-black pt-2 border-t border-white/15 text-base text-white">
                  <span>Payable Now:</span>
                  <span className="text-[#ff833b]">{activeCourse.pricing.currencySymbol}{activeCourse.pricing.offerPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Primary Enrollment CTA Button */}
              <button
                id="enroll-course-primary-btn"
                onClick={() => handleOpenEnrollModal(activeCourse)}
                className={`w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-white font-mono text-sm uppercase tracking-wider font-black transition-all shadow-xl hover:-translate-y-0.5 mb-3 ${
                  activeCourse.category === 'ai-video'
                    ? 'bg-[#e65c00] hover:bg-[#ff6d19] shadow-[#e65c00]/40'
                    : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/40'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {activeCourse.category === 'ai-video'
                    ? `Claim 2-Day Workshop Seat at ${activeCourse.pricing.currencySymbol}${activeCourse.pricing.offerPrice.toLocaleString('en-IN')}`
                    : `Get Instant Access at ${activeCourse.pricing.currencySymbol}${activeCourse.pricing.offerPrice.toLocaleString('en-IN')}`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                <span>Limited Seats Available</span>
              </div>
            </div>
          </div>

          {/* Key Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-white/10">
            {/* Format & Mentorship */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-sm font-semibold">
                <Users className="w-4 h-4 text-[#ff7824]" />
                <span>Delivery & Mentorship</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {activeCourse.format}. Direct code-level and creative reviews with Groovinto film directors.
              </p>
            </div>

            {/* Tools or Methods Covered */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-sm font-semibold">
                {activeCourse.category === 'ai-video' ? (
                  <Cpu className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Brain className="w-4 h-4 text-emerald-400" />
                )}
                <span>
                  {activeCourse.category === 'ai-video' ? 'Toolchain & Engines' : 'Core Protocols'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeCourse.toolsOrMethods.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Who is it for */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-sm font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Who This Is For</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {activeCourse.idealFor}
              </p>
            </div>
          </div>

          {/* Curriculum Modules Accordion */}
          <div className="pt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h4 className="text-lg font-bold text-white tracking-wide">
                  Complete Curriculum & Modules
                </h4>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {activeCourse.curriculum.length} Core Modules
              </span>
            </div>

            <div className="space-y-3">
              {activeCourse.curriculum.map((moduleItem, idx) => {
                const key = `${activeCourse.id}-${idx}`;
                const isExpanded = !!expandedModules[key];

                return (
                  <div
                    key={moduleItem.module}
                    className="border border-white/5 rounded-xl bg-white/[0.02] overflow-hidden transition-colors hover:border-white/15"
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(key)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono flex items-center justify-center text-neutral-300 shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-white">
                          {moduleItem.module}
                        </span>
                      </div>
                      <div className="text-neutral-400 shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 border-t border-white/5 bg-black/20">
                        <ul className="space-y-2.5">
                          {moduleItem.topics.map((topic, tIdx) => (
                            <li
                              key={tIdx}
                              className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7824] mt-2 shrink-0" />
                              <span className="leading-relaxed">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concrete Outcomes Checklist */}
          <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10">
            <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 font-semibold flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Measurable Outcomes You Walk Away With</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeCourse.outcomes.map((outcome, oIdx) => (
                <div key={oIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Dual Callout Bar with Pricing Reassurance */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-[#0b0c0e] border border-white/10">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-[#ff7824]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Corporate & Agency Team Training Available
                </p>
                <p className="text-xs text-neutral-400">
                  Custom 3-day bootcamps for studio teams at special enterprise pricing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleOpenEnrollModal(activeCourse)}
                className={`w-full sm:w-auto px-5 py-3 rounded-lg text-white font-mono text-xs uppercase tracking-wider font-black whitespace-nowrap transition-all shadow-md hover:-translate-y-0.5 ${
                  activeCourse.category === 'ai-video'
                    ? 'bg-[#e65c00] hover:bg-[#ff6d19] shadow-[#e65c00]/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                }`}
              >
                {activeCourse.category === 'ai-video'
                  ? `Claim 2-Day Seat at ${activeCourse.pricing.currencySymbol}${activeCourse.pricing.offerPrice.toLocaleString('en-IN')}`
                  : `Get Instant Access at ${activeCourse.pricing.currencySymbol}${activeCourse.pricing.offerPrice.toLocaleString('en-IN')}`}
              </button>
              <button
                onClick={() => onSelectCourseForInquiry(`Corporate/Custom Training Inquiry: ${activeCourse.title}`)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-md border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors"
              >
                Inquire for Teams
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ENROLLMENT MODAL WITH PRICING SUMMARY */}
      {enrollingCourse && (
        <div
          id="course-enrollment-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setEnrollingCourse(null)}
        >
          <div
            id="course-enrollment-card"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#121418] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setEnrollingCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {enrollSubmitted ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-sans">
                  Enrollment Request Received!
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{enrollForm.name || 'Creator'}</strong>. Our academy team has reserved your seat for <strong className="text-[#ff833b]">{enrollingCourse.title}</strong> at the special offer fee of <strong className="text-white">{enrollingCourse.pricing.currencySymbol}{enrollingCourse.pricing.offerPrice.toLocaleString('en-IN')}</strong>.
                </p>
                <p className="text-xs font-mono text-neutral-400">
                  Payment instructions & orientation schedule have been dispatched to your email.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setEnrollingCourse(null)}
                    className="px-6 py-2.5 rounded-lg bg-[#e65c00] hover:bg-[#ff6d19] text-white font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-[#e65c00]/20 text-[#ff833b] border border-[#e65c00]/40 mb-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Groovinto Academy Admission</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white font-sans">
                    Enroll in {enrollingCourse.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    {enrollingCourse.subtitle}
                  </p>
                </div>

                {/* Mathematical Price Breakdown Card inside modal */}
                <div className="p-5 rounded-xl bg-black/80 border border-white/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 uppercase font-semibold">Regular Tuition:</span>
                    <span className="text-xl sm:text-2xl font-black font-mono line-through text-red-400/90 decoration-red-500 decoration-2">
                      {enrollingCourse.pricing.currencySymbol}{enrollingCourse.pricing.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-emerald-400 font-bold">
                    <span>Special Scholarship ({enrollingCourse.pricing.discountPercentage}% OFF):</span>
                    <span>
                      -{enrollingCourse.pricing.currencySymbol}{enrollingCourse.pricing.savings.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-white/15 flex items-baseline justify-between font-mono">
                    <div>
                      <span className="text-xs text-white uppercase font-bold tracking-wider block">Final Payable:</span>
                      <span className="text-xs text-emerald-400 font-semibold">Save {enrollingCourse.pricing.currencySymbol}{enrollingCourse.pricing.savings.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {enrollingCourse.pricing.currencySymbol}{enrollingCourse.pricing.offerPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-center">
                    <span className="text-xs font-mono text-amber-400 font-bold flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                      <span>Limited Seats Available</span>
                    </span>
                  </div>
                </div>

                {/* Student Details Fields */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enrollForm.name}
                      onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-black/50 border border-white/20 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={enrollForm.email}
                        onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                        placeholder="name@gmail.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-black/50 border border-white/20 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={enrollForm.phone}
                        onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-black/50 border border-white/20 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                      Current Background / Goals (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={enrollForm.notes}
                      onChange={(e) => setEnrollForm({ ...enrollForm, notes: e.target.value })}
                      placeholder="e.g. Video editor looking to master Kling & Runway AI / Creator seeking focus protocols"
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-black/50 border border-white/20 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setEnrollingCourse(null)}
                    className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#e65c00] hover:bg-[#ff6d19] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#e65c00]/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {enrollingCourse.category === 'ai-video'
                        ? `Confirm 2-Day Seat at ${enrollingCourse.pricing.currencySymbol}${enrollingCourse.pricing.offerPrice.toLocaleString('en-IN')}`
                        : `Instant Access to Course at ${enrollingCourse.pricing.currencySymbol}${enrollingCourse.pricing.offerPrice.toLocaleString('en-IN')}`}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
