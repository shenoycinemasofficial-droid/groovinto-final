import React, { useState, useEffect } from 'react';
import { Send, Sparkles, Mail, MapPin, CheckCircle2, Copy, Check, MessageSquare } from 'lucide-react';
import { STUDIO_META } from '../data/studioData';
import { readRazorpayApiResponse } from '../utils/razorpayApi';

interface ContactSectionProps {
  initialContext?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialContext }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    category: 'Narrative & Brand Films',
    approach: 'hybrid',
    budget: '₹5L - ₹15L (or $7k - $20k)',
    timeline: 'Within 1 Month',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    if (initialContext) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? prev.message : `Regarding project / format: ${initialContext}`
      }));
    }
  }, [initialContext]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(STUDIO_META.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setPaymentStatus('Preparing secure checkout...');

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay checkout could not be loaded.');
      }

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: 'project_deposit' })
      });
      const orderData = await readRazorpayApiResponse<{
        order_id: string;
        amount: number;
        currency: string;
        key_id: string;
      }>(orderResponse);

      const Razorpay = (window as Window & {
        Razorpay?: new (options: Record<string, unknown>) => {
          open: () => void;
          on: (event: string, callback: (response: { error?: { description?: string; reason?: string } }) => void) => void;
        };
      }).Razorpay;
      if (!Razorpay) {
        throw new Error('Razorpay checkout is unavailable.');
      }

      const checkout = new Razorpay({
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Groovinto',
        description: 'Groovinto project deposit test payment',
        order_id: orderData.order_id,
        prefill: { name: formData.name, email: formData.email },
        theme: { color: '#e65c00' },
        handler: async (response: Record<string, string>) => {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });
            await readRazorpayApiResponse<{ success: boolean }>(verifyResponse);
            setPaymentStatus('Payment verified successfully.');
          } catch (error) {
            setPaymentStatus(error instanceof Error ? error.message : 'Payment verification failed.');
          }
        },
        modal: {
          ondismiss: () => setPaymentStatus('Payment cancelled.')
        }
      });

      checkout.on('payment.failed', (response) => {
        setPaymentStatus(response.error?.description || response.error?.reason || 'Payment failed. Please try again.');
      });
      checkout.open();
    } catch (error) {
      setPaymentStatus(error instanceof Error ? error.message : 'Payment could not be started.');
    }
  };

  const mailtoUrl = `mailto:${STUDIO_META.email}?subject=${encodeURIComponent(
    `[Story Inquiry] ${formData.category} - ${formData.name || 'New Project'}`
  )}&body=${encodeURIComponent(
    `Hi Groovinto Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nFormat: ${formData.category}\nApproach: ${formData.approach}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\n\nStory Brief:\n${formData.message}\n\nLooking forward to hearing how we can shoot or build this.`
  )}`;

  return (
    <section id="contact" className="py-28 bg-[#0b0c0e] relative border-t border-white/10">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#e65c00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#ff833b] mb-4">
            <span>Contact & Inquiries</span>
          </div>
          
          {/* Exact CTA Headline from User Prompt */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-sans leading-tight">
            Have a story? <br className="hidden sm:inline" />
            <span className="text-[#ff833b]">Let’s figure out how to shoot it — or build it.</span>
          </h2>
          
          <p className="mt-4 text-neutral-400 text-base sm:text-lg max-w-xl mx-auto">
            Tell us about your script, your brand vision, or your concept. We’ll map the shot distribution and budget within 48 hours.
          </p>
        </div>

        {/* Two-Column Layout: Studio Info & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left: Studio Direct Channel Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#111317] border border-white/10 p-7 space-y-6">
              <h3 className="text-xl font-bold text-white font-sans">
                Direct Studio Desk
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Every inquiry is reviewed directly by our directors and writers room. No intermediary sales reps.
              </p>

              <div className="space-y-4 pt-2 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="text-neutral-500 uppercase flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#ff833b]" />
                    <span>Direct Studio Email</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={`mailto:${STUDIO_META.email}`}
                      className="text-white hover:text-[#ff833b] font-medium text-sm transition-colors"
                    >
                      {STUDIO_META.email}
                    </a>
                    <button
                      onClick={copyEmail}
                      className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="text-neutral-500 uppercase flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#ff833b]" />
                    <span>Physical Production Base</span>
                  </div>
                  <div className="text-neutral-200 text-sm font-medium pt-1 font-sans">
                    Bengaluru, Karnataka, India
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    PAN-India shoot crew & worldwide virtual pipeline
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono text-neutral-400 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NDAs signed before script review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Shot-by-shot budget breakdown included</span>
                </div>
              </div>
            </div>

            {/* Quick Mailto Action */}
            <a
              id="direct-mailto-cta"
              href={mailtoUrl}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <Mail className="w-4 h-4 text-[#ff833b]" />
              <span>Or open directly in your mail app</span>
            </a>
          </div>

          {/* Right: Intake / Creative Brief Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111317] border border-white/15 p-7 sm:p-9 shadow-2xl relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    Story Brief Received
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name || 'Storyteller'}</strong>. Our directors will examine your brief and reply to <strong className="text-[#ff833b]">{formData.email}</strong> within 48 hours.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="px-5 py-2.5 rounded bg-[#e65c00] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-lg"
                    >
                      Send confirmation copy via email
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 rounded bg-white/5 hover:bg-white/10 text-neutral-300 font-mono text-xs"
                    >
                      Submit another brief
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-white font-sans">
                      Start a Project / Pitch Your Story
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-1">
                      Fill out this quick form or email us directly.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikram Rao"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Brand/Company & Format */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Brand / Company (Optional)
                      </label>
                      <input
                        id="contact-company-input"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Studio, Brand or Creator"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Project Format
                      </label>
                      <select
                        id="contact-category-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#e65c00] text-sm font-sans"
                      >
                        <option value="UGC Ads & Creator-Style Videos">UGC Ads & Creator-Style Videos</option>
                        <option value="Social Media Content & Growth Engine">Social Media Content & Growth Engine</option>
                        <option value="Narrative & Brand Films">Narrative & Brand Films</option>
                        <option value="AI-Assisted Production">AI-Assisted Production</option>
                        <option value="Traditional Shoots & Commercials">Traditional Shoots & Commercials</option>
                        <option value="Series & Episodic Content">Series & Episodic Content</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Toolset Approach */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Preferred Production Approach
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                      {[
                        { id: 'hybrid', label: 'Hybrid (Live + AI)' },
                        { id: 'live-shoot', label: 'Live Shoot Only' },
                        { id: 'ai-assisted', label: 'AI Virtual Only' },
                        { id: 'undecided', label: 'Advise Me' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, approach: opt.id })}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            formData.approach === opt.id
                              ? 'bg-[#e65c00] text-white border-[#e65c00] font-semibold'
                              : 'bg-black/30 text-neutral-400 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Target Budget Bracket
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#e65c00] text-sm font-sans"
                      >
                        <option value="Under ₹5L (under $6k)">Under ₹5L (&lt; $6k)</option>
                        <option value="₹5L - ₹15L (or $7k - $20k)">₹5L - ₹15L ($7k - $20k)</option>
                        <option value="₹15L - ₹35L ($20k - $45k)">₹15L - ₹35L ($20k - $45k)</option>
                        <option value="₹35L+ ($45k+)">₹35L+ ($45k+)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Target Delivery Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#e65c00] text-sm font-sans"
                      >
                        <option value="Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
                        <option value="Within 1 Month">Within 1 Month</option>
                        <option value="2 - 3 Months">2 - 3 Months</option>
                        <option value="Flexible / In Ideation">Flexible / In Ideation</option>
                      </select>
                    </div>
                  </div>

                  {/* Story Summary / Brief */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Story Brief or Concept Notes *
                    </label>
                    <textarea
                      id="contact-message-input"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Give us a sentence or two about your story, characters, product, or mood..."
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-brief-btn"
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-[#e65c00] hover:bg-[#ff6d19] text-white text-sm font-mono uppercase tracking-wider py-4 rounded-lg font-bold transition-all shadow-xl shadow-[#e65c00]/30 hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get in touch — Let’s build your film</span>
                  </button>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      id="pay-project-deposit-btn"
                      type="button"
                      onClick={handlePayment}
                      className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white text-sm font-mono uppercase tracking-wider py-3.5 rounded-lg font-bold transition-all border border-white/15"
                    >
                      <span>Pay ₹100 test deposit</span>
                    </button>
                    {paymentStatus && (
                      <p className="mt-3 text-center text-xs font-mono text-neutral-400" role="status">
                        {paymentStatus}
                      </p>
                    )}
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
