'use client';

import { motion } from 'motion/react';

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-32 relative bg-deep-red/10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-[300px] font-jp opacity-[0.03] kanji-watermark pointer-events-none whitespace-nowrap">
        空手道
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <span className="text-gold text-4xl mb-6 block">"</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white-off leading-relaxed mb-8">
            The ultimate aim of Karate lies not in victory or defeat, but in the perfection of the character of the participant.
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="text-white-off/70 font-sans tracking-widest uppercase text-sm">
            Gichin Funakoshi
          </p>
        </motion.div>
      </div>
    </section>
  );
}
