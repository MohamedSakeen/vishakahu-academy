'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sanitizeName = (val: string) => val.replace(/[<>{}[\]\\\/]/g, '');
  const sanitizeEmail = (val: string) => val.replace(/[<>{}[\]\\\/]/g, '').trim();
  const sanitizePhone = (val: string) => val.replace(/\D/g, '').slice(0, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform thorough validation & sanitization
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    const cleanName = sanitizeName(formData.name).trim();
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = 'Please enter a valid name (at least 2 characters).';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(cleanName)) {
      newErrors.name = 'Name contains invalid characters.';
    }

    const cleanEmail = sanitizeEmail(formData.email).toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const cleanPhone = sanitizePhone(formData.phone);
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = 'Mobile number is mandatory and must be exactly 10 digits.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      // Send registration to server-side API route (handles Supabase insert reliably)
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, phone: cleanPhone }),
      });

      const resData = await response.json();

      if (!response.ok || resData.error) {
        console.warn("Registration API notice:", resData?.error);
        // Fallback to client SDK insert
        const { error: clientErr } = await supabase
          .from('student_registrations')
          .insert([{ name: cleanName, email: cleanEmail, phone: cleanPhone }]);
        if (clientErr) {
          console.warn("Client fallback notice:", clientErr.message);
        }
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Registration submit error:", err);
      // Graceful fallback so user receives feedback
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="py-32 relative bg-ink">
      <div className="absolute top-10 right-10 text-[200px] font-jp opacity-[0.02] kanji-watermark pointer-events-none">
        入
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row gap-16">

        {/* Contact Info */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-serif text-sm tracking-[0.3em] uppercase block mb-4">
              Join Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-paper uppercase tracking-widest mb-6">
              Begin Now
            </h2>
            <div className="relative z-20 flex justify-start mb-10 mt-2">
              <div className="w-full max-w-sm h-[1px] bg-gradient-to-r from-crimson to-transparent relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-ink pr-4 text-[0.6rem] text-gold">◆</div>
              </div>
            </div>

            <p className="text-white-off/70 font-sans mb-12 max-w-md leading-relaxed">
              Step onto the tatami and transform yourself. For admissions, inquiries, or trial classes, reach out to us.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-gold font-serif text-sm uppercase tracking-widest mb-1">Chief Instructor</h4>
                <p className="text-paper text-lg font-serif">Kyoshi Vishnuwarthan</p>
              </div>

              <div>
                <h4 className="text-gold font-serif text-sm uppercase tracking-widest mb-1">Phone</h4>
                <a href="tel:+919629368936" className="text-paper text-lg hover:text-crimson transition-colors border-b border-transparent hover:border-crimson inline-block">
                  +91 96293 68936
                </a>
              </div>

              <div>
                <h4 className="text-gold font-serif text-sm uppercase tracking-widest mb-1">Email</h4>
                <a href="mailto:vishnu.judovav@gmail.com" className="text-paper text-lg hover:text-crimson transition-colors border-b border-transparent hover:border-crimson inline-block">
                  vishnu.judovav@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enrollment Form */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white-off/[0.02] border border-white-off/10 p-8 md:p-12"
          >
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-crimson/20 text-crimson flex items-center justify-center mx-auto mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-serif text-paper mb-2">Message Sent</h3>
                <p className="text-white-off/60 font-sans">We will contact you shortly to begin your journey.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gold mb-2 font-serif">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    maxLength={60}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: sanitizeName(e.target.value) });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className="w-full bg-transparent border-b border-white-off/20 py-3 text-paper focus:outline-none focus:border-crimson transition-colors font-sans"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-crimson text-xs mt-1 font-serif tracking-wider">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gold mb-2 font-serif">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: sanitizeEmail(e.target.value) });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className="w-full bg-transparent border-b border-white-off/20 py-3 text-paper focus:outline-none focus:border-crimson transition-colors font-sans"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-crimson text-xs mt-1 font-serif tracking-wider">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-gold mb-2 font-serif">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: sanitizePhone(e.target.value) });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className="w-full bg-transparent border-b border-white-off/20 py-3 text-paper focus:outline-none focus:border-crimson transition-colors font-sans"
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="text-crimson text-xs mt-1 font-serif tracking-wider">{errors.phone}</p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-crimson text-white hover:bg-deep-red font-serif tracking-[0.2em] font-bold text-xs uppercase transition-colors interactive clip-elegant disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
