'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ["All", "Tournaments", "Grading", "Seminars", "Dojo Training", "Ceremony"];

// Generate 100+ random items
const generateItems = () => {
  const categoriesExcludingAll = CATEGORIES.slice(1);
  return Array.from({ length: 110 }, (_, i) => {
    const category = categoriesExcludingAll[Math.floor(Math.random() * categoriesExcludingAll.length)];
    // Randomly assign different aspect ratios
    const aspectClasses = ['aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[16/9]', 'aspect-[9/16]'];
    const aspectClass = aspectClasses[Math.floor(Math.random() * aspectClasses.length)];
    
    return {
      id: i,
      category,
      seed: `karate-${category.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      aspectClass
    };
  });
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const items = useMemo(() => generateItems(), []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter(item => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <div className="min-h-screen bg-[#060305] text-white selection:bg-crimson">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-10 text-[20rem] font-jp opacity-[0.02] text-white-off select-none">栄</div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 pt-12 pb-6 px-6 lg:px-12 border-b border-white/[0.05] bg-[#060305]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link 
              href="/#gallery" 
              className="inline-flex items-center text-gold/60 hover:text-gold text-xs tracking-[0.2em] uppercase font-serif mb-6 transition-colors group"
            >
              <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-serif text-paper uppercase tracking-widest">
              Gallery <span className="text-crimson">of Prouds</span>
            </h1>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-serif tracking-[0.15em] uppercase border transition-all duration-300 ${
                  activeCategory === category 
                    ? 'border-gold text-gold bg-gold/10' 
                    : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={`group relative overflow-hidden bg-white-off/5 break-inside-avoid w-full ${item.aspectClass}`}
              >
                {/* Note: using pattern blocks since actual photos aren't accessible */}
                <div className="absolute inset-0 bg-gradient-to-br from-ink to-[#1a1a1a] grayscale group-hover:grayscale-0 transition-all duration-700">
                  <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                       style={{ backgroundImage: `url('https://api.dicebear.com/9.x/shapes/svg?seed=${item.seed}')`}}>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-white/40 font-jp tracking-widest text-sm">No items found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
