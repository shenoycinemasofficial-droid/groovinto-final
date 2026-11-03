import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { HybridLensInteractive } from './components/HybridLensInteractive';
import { WhatWeDoSection } from './components/WhatWeDoSection';
import { CoursesSection } from './components/CoursesSection';
import { HowWeWorkSection } from './components/HowWeWorkSection';
import { WhyGroovintoSection } from './components/WhyGroovintoSection';
import { WorkShowcaseSection } from './components/WorkShowcaseSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CoursePaymentPage } from './components/CoursePaymentPage';
import { CourseItem } from './types';

export default function App() {
  const [inquiryContext, setInquiryContext] = useState<string>('');
  const [paymentCourse, setPaymentCourse] = useState<CourseItem | null>(null);

  if (paymentCourse) {
    return (
      <CoursePaymentPage
        course={paymentCourse}
        onBack={() => setPaymentCourse(null)}
      />
    );
  }

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProjectWithContext = (context: string) => {
    setInquiryContext(context);
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e3e4e8] font-sans selection:bg-[#e65c00] selection:text-white flex flex-col">
      {/* Fixed Navigation */}
      <Navbar onOpenInquiry={() => handleScrollToSection('contact')} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onSeeWork={() => handleScrollToSection('work')}
          onStartProject={() => handleScrollToSection('contact')}
        />

        {/* About Section */}
        <AboutSection />

        {/* Hybrid Lens Interactive Demonstrator */}
        <HybridLensInteractive />

        {/* What We Do Section (5 Formats) */}
        <WhatWeDoSection
          onSelectServiceForInquiry={(serviceTitle) =>
            handleStartProjectWithContext(`Service format: ${serviceTitle}`)
          }
        />

        {/* Courses Section (AI Video Production & Mind Training) */}
        <CoursesSection
          onOpenCoursePayment={setPaymentCourse}
          onSelectCourseForInquiry={(courseTitle) =>
            handleStartProjectWithContext(courseTitle)
          }
        />

        {/* How We Work Section (3 Pillars) */}
        <HowWeWorkSection onStartProject={() => handleScrollToSection('contact')} />

        {/* Why Groovinto Section (3 Core Differentiators) */}
        <WhyGroovintoSection />

        {/* Work Showcase Section */}
        <WorkShowcaseSection
          onStartProjectWithContext={(title) =>
            handleStartProjectWithContext(`Project reference: ${title}`)
          }
        />

        {/* Blog & Knowledge Engine (100 Guides on Content AI Studio) */}
        <BlogSection onNavigateToSection={handleScrollToSection} />

        {/* Contact & CTA Section */}
        <ContactSection initialContext={inquiryContext} />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
