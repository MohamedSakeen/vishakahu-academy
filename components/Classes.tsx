'use client';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';

const PROGRAMS = [
  {
    title: 'Kids Karate',
    age: '5 – 12 Years',
    desc: 'Confidence, coordination, fun fundamentals.',
    bg: 'bg-gradient-to-br from-ink to-ink/80',
    kanji: '子供'
  },
  {
    title: 'Youth Warriors',
    age: '13 – 17 Years',
    desc: 'Kata, competition prep, character building.',
    bg: 'bg-gradient-to-br from-deep-red/40 to-ink',
    kanji: '若者'
  },
  {
    title: 'Adult Karate',
    age: '18+ Years',
    desc: 'Kihon, Kata, Kumite — beginner to advanced.',
    bg: 'bg-gradient-to-br from-ink to-ink/90',
    kanji: '大人'
  },
  {
    title: "Women's Self-Defense",
    age: 'All Ages',
    desc: 'Empowerment, practical techniques.',
    bg: 'bg-gradient-to-br from-deep-red/40 to-ink',
    kanji: '護身'
  },
  {
    title: 'Competition Training',
    age: 'By Selection',
    desc: 'State/national/international prep.',
    bg: 'bg-gradient-to-br from-ink to-ink/80',
    kanji: '競技'
  },
  {
    title: 'Black Belt Program',
    age: 'Full Journey',
    desc: 'White to Shodan, philosophy of Budo.',
    bg: 'bg-gradient-to-br from-ink to-gold/10',
    kanji: '黒帯'
  }
];

function TiltCard({ program, index }: { program: typeof PROGRAMS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const rY = ((mouseX / width) - 0.5) * 20;
    const rX = ((mouseY / height) - 0.5) * -20;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="relative w-full h-80 cursor-pointer interactive"
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`w-full h-full rounded-sm border border-white-off/10 p-8 flex flex-col justify-between overflow-hidden shadow-xl ${program.bg}`}
      >
        <div 
          className="absolute -right-4 -bottom-8 text-[120px] font-jp text-white-off/[0.03] select-none pointer-events-none"
          style={{ transform: 'translateZ(-50px)' }}
        >
          {program.kanji}
        </div>
        
        <div style={{ transform: 'translateZ(30px)' }}>
          <span className="text-gold font-serif text-xs tracking-[0.2em] uppercase block mb-2">
            {program.age}
          </span>
          <h3 className="text-2xl font-serif text-paper tracking-wider mb-4 border-b border-white-off/10 pb-4">
            {program.title}
          </h3>
          <p className="text-white-off/60 text-[0.75rem] font-sans leading-relaxed">
            {program.desc}
          </p>
        </div>
        
        <div style={{ transform: 'translateZ(40px)' }}>
          <div className="text-crimson border border-crimson/30 self-start inline-block px-2 py-1 uppercase tracking-tighter text-[0.6rem]">
            Learn More
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Classes() {
  return (
    <section id="classes" className="py-32 relative bg-ink">
      <div className="absolute top-10 right-10 text-[200px] font-jp opacity-[0.02] kanji-watermark pointer-events-none">
        武道
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-gold font-serif text-sm tracking-[0.3em] uppercase block mb-4">
            Training Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-paper uppercase tracking-widest">
            Disciplines
          </h2>
          <div className="relative z-20 flex justify-center mt-8 mb-6">
            <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-4 text-[0.6rem] text-gold">◆</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program, index) => (
            <TiltCard key={program.title} program={program} index={index} />
          ))}
        </div>
      </div>
      
      {/* Bottom fade line */}
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />
    </section>
  );
}
