'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', program: 'Kids Karate' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', program: 'Kids Karate' });
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
                <p className="text-paper text-lg font-serif">Kyoshi Vishnwarthan</p>
              </div>
              
              <div>
                <h4 className="text-gold font-serif text-sm uppercase tracking-widest mb-1">Phone</h4>
                <a href="tel:+919629368936" className="text-paper text-lg hover:text-crimson transition-colors border-b border-transparent hover:border-crimson inline-block">
                  +91 96293 68936
                </a>
              </div>

              <div>
                <h4 className="text-gold font-serif text-sm uppercase tracking-widest mb-1">Email</h4>
                <a href="mailto:Vishnu.judo@gmail.com" className="text-paper text-lg hover:text-crimson transition-colors border-b border-transparent hover:border-crimson inline-block">
                  Vishnu.judo@gmail.com
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gold mb-2 font-serif">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white-off/20 py-3 text-paper focus:outline-none focus:border-crimson transition-colors font-sans"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gold mb-2 font-serif">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white-off/20 py-3 text-paper focus:outline-none focus:border-crimson transition-colors font-sans"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-xs uppercase tracking-widest text-gold mb-2 font-serif">Interested Program</label>
                  <select 
                    id="program"
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full bg-transparent border-b border-white-off/20 py-3 text-paper focus:outline-none focus:border-crimson transition-colors font-sans appearance-none rounded-none"
                  >
                    <option value="Kids Karate" className="bg-ink text-paper">Kids Karate (5-12)</option>
                    <option value="Youth Warriors" className="bg-ink text-paper">Youth Warriors (13-17)</option>
                    <option value="Adult Karate" className="bg-ink text-paper">Adult Karate (18+)</option>
                    <option value="Women's Self-Defense" className="bg-ink text-paper">Women's Self-Defense</option>
                    <option value="Competition Training" className="bg-ink text-paper">Competition Training</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-4 bg-crimson text-white hover:bg-deep-red font-serif tracking-[0.2em] font-bold text-xs uppercase transition-colors interactive clip-elegant">
                    Submit Application
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
