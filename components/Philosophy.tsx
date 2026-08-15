'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';

interface PhilosophyItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  accent: string;
}

const PHILOSOPHIES: PhilosophyItem[] = [
  {
    id: 'hussaini',
    quote: "Never say 'Do or Die.' Always say 'Do or Do.'",
    author: "Shihan Hussaini",
    title: "Shihan · Father of Isshinryu Karate India",
    accent: "#C0392B"
  },
  {
    id: 'tatsuo',
    quote: "All things in the universe can be contained in one heart. When mind, body, and spirit unite, true mastery begins.",
    author: "Tatsuo Shimabuku",
    title: "Sōke · Founder of Isshinryu Karate",
    accent: "#D4A017"
  },
  {
    id: 'uezu',
    quote: "Karate is not merely about physical defense. It is the forging of an unshakeable spirit, humbleness of heart, and respect for all life.",
    author: "Angi Uezu",
    title: "10th Dan Hanshi · O.I.K.K.A. Founder",
    accent: "#F5C842"
  },
  {
    id: 'kichiro',
    quote: "Honor the roots of traditional heritage, preserve the authenticity of every kata with precision, and carry the torch of Isshinryu forward.",
    author: "Kichiro Shimabuku",
    title: "10th Dan Hanshi · IWKA President",
    accent: "#E74C3C"
  }
];

const DURATION_MS = 7000;

export default function Philosophy() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PHILOSOPHIES.length);
    }, DURATION_MS);

    return () => clearInterval(timer);
  }, []);

  const currentPhilosophy = PHILOSOPHIES[currentIndex];

  const fadeVariants = {
    initial: {
      opacity: 0,
      y: 20,
      filter: 'blur(6px)'
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(6px)',
      transition: {
        duration: 0.5,
        ease: [0.7, 0, 0.84, 0] as const
      }
    }
  };

  return (
    <section 
      id="philosophy" 
      className="py-24 md:py-32 relative bg-[#080406] overflow-hidden border-y border-white/5"
    >
      {/* Background Decorative Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${currentPhilosophy.accent}15 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="font-jp text-[0.65rem] md:text-xs text-crimson tracking-[4px] uppercase block mb-2">
            The Mindset & Spirit
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-white uppercase tracking-wider">
            Grandmaster <span className="text-gold">Philosophies</span>
          </h2>
        </div>

        {/* Quote Card Container */}
        <div className="relative min-h-[260px] md:min-h-[220px] flex flex-col justify-center items-center text-center">
          
          <Quote className="w-10 h-10 md:w-14 md:h-14 text-gold/30 mb-4 md:mb-6 select-none" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhilosophy.id}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              <blockquote className="text-xl md:text-3xl lg:text-4xl font-serif text-white-off leading-relaxed md:leading-relaxed mb-8 max-w-3xl px-2">
                &ldquo;{currentPhilosophy.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center">
                <div 
                  className="w-16 h-px mb-4 transition-colors duration-500" 
                  style={{ backgroundColor: currentPhilosophy.accent }}
                />
                
                <h3 className="text-white font-serif tracking-widest text-lg md:text-xl uppercase font-semibold">
                  {currentPhilosophy.author}
                </h3>
                
                <p className="text-gold/80 font-sans text-xs md:text-sm tracking-wider mt-1 uppercase">
                  {currentPhilosophy.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
