'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  src: string;          // Full original high-res image URL
  thumbnailSrc?: string; // Lightweight WebP template thumbnail URL (~40KB)
  title: string;
  filename: string;
}

let galleryCache: GalleryItem[] | null = null;

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(galleryCache || []);
  const [loading, setLoading] = useState(!galleryCache);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (galleryCache && galleryCache.length > 0) {
      setLoading(false);
      return;
    }

    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          const list = data.items || [];
          galleryCache = list;
          setItems(list);
        }
      } catch (err) {
        console.error("Failed to load gallery images:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const handlePreloadOriginal = (src: string) => {
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = src;
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && items.length > 0) {
      setSelectedImageIndex((selectedImageIndex + 1) % items.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && items.length > 0) {
      setSelectedImageIndex((selectedImageIndex - 1 + items.length) % items.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, items.length]);

  return (
    <div className="min-h-screen bg-[#060305] text-white selection:bg-crimson">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-10 text-[20rem] font-jp opacity-[0.02] text-white-off select-none">栄</div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 pt-12 pb-6 px-6 lg:px-12 border-b border-white/[0.05] bg-[#060305]/95 backdrop-blur-md">
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
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
            <p className="text-white/40 font-serif tracking-widest text-sm uppercase">Loading Gallery Photos...</p>
          </div>
        ) : items.length > 0 ? (
          <motion.div 
            layout
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => {
                    handlePreloadOriginal(item.src);
                    setSelectedImageIndex(idx);
                  }}
                  onMouseEnter={() => handlePreloadOriginal(item.src)}
                  className="group relative overflow-hidden bg-white-off/5 break-inside-avoid w-full mb-4 cursor-pointer border border-white/5 hover:border-gold/40 transition-colors duration-300 rounded-sm"
                >
                  <img
                    src={item.thumbnailSrc || item.src}
                    alt={item.title || "Academy Photo"}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink/60 border border-white/20 flex items-center justify-center text-white/80 group-hover:text-gold transition-colors">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-white/40 font-jp tracking-widest text-sm">No photos found.</p>
          </div>
        )}
      </main>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && items[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center z-10">
              <div>
                <span className="text-gold text-xs font-serif tracking-[0.2em] uppercase block">
                  Photo ({selectedImageIndex + 1} / {items.length})
                </span>
              </div>
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="p-3 text-white/70 hover:text-gold hover:bg-white/10 rounded-full transition-all border border-white/10"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Image Display */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {items.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 md:left-6 z-20 p-3 text-white/70 hover:text-gold bg-ink/60 hover:bg-ink border border-white/10 rounded-full transition-all"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <motion.img
                key={items[selectedImageIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={items[selectedImageIndex].src}
                alt={items[selectedImageIndex].title || "Academy Photo"}
                className="max-h-[80vh] max-w-[90vw] w-auto h-auto object-contain shadow-2xl rounded-sm"
              />

              {items.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 md:right-6 z-20 p-3 text-white/70 hover:text-gold bg-ink/60 hover:bg-ink border border-white/10 rounded-full transition-all"
                  aria-label="Next Image"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="text-center text-xs text-white/40 font-serif tracking-widest uppercase z-10">
              Press ESC to exit • Arrow keys to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
