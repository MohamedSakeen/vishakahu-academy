'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [kanjiDrops, setKanjiDrops] = useState<Array<{ id: number, text: string, left: string, delay: number, duration: number }>>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate Kanji Rain
    const kanjiChars = ['道', '空', '手', '心', '一', '流'];
    const drops = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      text: kanjiChars[Math.floor(Math.random() * kanjiChars.length)],
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }));
    setKanjiDrops(drops);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-ink z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(192,57,43,0.2)_0%,transparent_70%)] border border-dashed border-gold/40 z-20 pointer-events-none" />
      </div>

      {/* Kanji Rain */}
      {mounted && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-20">
          {kanjiDrops.map(drop => (
            <motion.div
              key={drop.id}
              className="absolute top-[-50px] font-jp text-2xl text-gold"
              style={{ left: drop.left }}
              animate={{ y: ['0vh', '120vh'] }}
              transition={{
                duration: drop.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: drop.delay,
              }}
            >
              {drop.text}
            </motion.div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="text-crimson/80 font-jp text-[120px] leading-none select-none tracking-widest absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] opacity-20 blur-sm">
            一心流
          </div>
          <h2 className="text-gold font-serif text-sm tracking-[0.5em] uppercase mb-4">
            ヴィシャカフ道場
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white-off uppercase tracking-widest text-shadow-xl mt-4">
            Vishakahu
            <span className="block text-3xl md:text-5xl lg:text-6xl text-paper/80 mt-4 tracking-[0.3em]">
              Academy
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl font-serif text-white-off/50 max-w-2xl font-light uppercase tracking-[0.2em] mb-12"
        >
          The Path of Discipline
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a href="#enroll" className="px-10 py-4 bg-crimson text-white font-serif tracking-[0.2em] text-xs font-bold uppercase transition-all interactive clip-elegant hover:bg-deep-red">
            Begin Your Journey
          </a>
          <a href="#classes" className="px-10 py-4 bg-transparent text-gold font-serif tracking-[0.2em] text-xs font-bold uppercase border border-gold/50 transition-all interactive clip-elegant hover:bg-gold/10">
            Explore Classes
          </a>
        </motion.div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent z-30" />
    </section>
  );
}
