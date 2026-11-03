import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { CourseItem } from '../types';
import { readRazorpayApiResponse } from '../utils/razorpayApi';

interface CoursePaymentPageProps {
  course: CourseItem;
  onBack: () => void;
}

interface RazorpayCheckout {
  open: () => void;
  on: (event: string, callback: (response: { error?: { description?: string; reason?: string } }) => void) => void;
}

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayCheckout;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

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

export const CoursePaymentPage: React.FC<CoursePaymentPageProps> = ({ course, onBack }) => {
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [student, setStudent] = useState({
    name: '',
    whatsapp: '',
    city: '',
    state: '',
    sex: '',
    age: ''
  });
  const price = course.pricing.offerPrice;

  const handlePayNow = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setStatus('Opening secure payment...');

    try {
      if (!(await loadRazorpayScript())) {
        throw new Error('Payment gateway could not be loaded. Please try again.');
      }

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: course.id,
          receipt: `course_${course.id}_${Date.now()}`,
          notes: {
            course: course.title,
            student_name: student.name,
            whatsapp: student.whatsapp,
            city: student.city,
            state: student.state,
            sex: student.sex,
            age: student.age
          }
        })
      });
      const order = await readRazorpayApiResponse<{
        order_id: string;
        amount: number;
        currency: string;
        key_id: string;
      }>(orderResponse);
      if (!window.Razorpay) throw new Error('Payment gateway is unavailable.');

      const checkout = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Groovinto Academy',
        description: course.title,
        order_id: order.order_id,
        prefill: { name: student.name, contact: student.whatsapp },
        theme: { color: '#e65c00' },
        handler: async (response: Record<string, string>) => {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });
            await readRazorpayApiResponse<{ success: boolean }>(verifyResponse);
            setStatus('Payment verified. Your course enrollment is confirmed.');
          } catch (error) {
            setStatus(error instanceof Error ? error.message : 'Payment verification failed.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: { ondismiss: () => { setStatus('Payment cancelled.'); setIsProcessing(false); } }
      });

      checkout.on('payment.failed', (response) => {
        setStatus(response.error?.description || response.error?.reason || 'Payment failed. Please try again.');
        setIsProcessing(false);
      });
      checkout.open();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Payment could not be started.');
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-[#e3e4e8] px-4 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to courses
        </button>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <section className="pt-4">
            <p className="text-[#ff833b] font-mono text-xs uppercase tracking-[0.25em] mb-4">Groovinto Academy Admission</p>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-5">{course.title}</h1>
            <p className="text-lg text-neutral-300 leading-relaxed mb-8">{course.subtitle}</p>
            <div className="space-y-4">
              {[course.format, course.duration, 'Direct mentorship and course access'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[#121418] border border-white/15 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6">
              <Lock className="w-4 h-4 text-emerald-400" /> Secure checkout
            </div>
            <div className="border-b border-white/10 pb-6 mb-6">
              <p className="text-sm text-neutral-400 line-through">Regular fee {course.pricing.currencySymbol}{course.pricing.originalPrice.toLocaleString('en-IN')}</p>
              <p className="text-5xl font-black text-white mt-2">{course.pricing.currencySymbol}{price.toLocaleString('en-IN')}</p>
              <p className="text-sm text-emerald-400 font-mono mt-2">Offer price · {course.pricing.discountPercentage}% off</p>
            </div>
            <form onSubmit={handlePayNow} className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">Student details</p>
              <input
                required
                type="text"
                value={student.name}
                onChange={(event) => setStudent({ ...student, name: event.target.value })}
                placeholder="Full name"
                aria-label="Full name"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm"
              />
              <input
                required
                type="tel"
                pattern="[+]?[0-9 ()-]{8,20}"
                value={student.whatsapp}
                onChange={(event) => setStudent({ ...student, whatsapp: event.target.value })}
                placeholder="WhatsApp number"
                aria-label="WhatsApp number"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  value={student.city}
                  onChange={(event) => setStudent({ ...student, city: event.target.value })}
                  placeholder="City"
                  aria-label="City"
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm"
                />
                <input
                  required
                  type="text"
                  value={student.state}
                  onChange={(event) => setStudent({ ...student, state: event.target.value })}
                  placeholder="State"
                  aria-label="State"
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm"
                />
              </div>
              <select
                required
                value={student.sex}
                onChange={(event) => setStudent({ ...student, sex: event.target.value })}
                aria-label="Sex or gender"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-neutral-300 focus:outline-none focus:border-[#e65c00] text-sm"
              >
                <option value="" disabled>Sex / gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <input
                required
                type="number"
                min="13"
                max="100"
                value={student.age}
                onChange={(event) => setStudent({ ...student, age: event.target.value })}
                placeholder="Age"
                aria-label="Age"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e65c00] text-sm"
              />
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-[#e65c00] hover:bg-[#ff6d19] disabled:opacity-60 text-white font-mono text-sm uppercase tracking-wider font-bold transition-colors"
              >
                {isProcessing ? 'Opening payment...' : `Pay ${course.pricing.currencySymbol}${price.toLocaleString('en-IN')} now`}
              </button>
              <div className="flex items-center justify-center gap-2 mt-5 text-xs text-neutral-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Powered by Razorpay
              </div>
              {status && <p role="status" className="mt-5 text-center text-sm text-neutral-300">{status}</p>}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};
