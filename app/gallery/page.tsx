'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

interface GalleryItem {
  id: string;
  public_id: string;
  secure_url: string;
  category: string;
  created_at: string;
  is_pinned?: boolean;
}

let galleryCache: GalleryItem[] | null = null;

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(galleryCache || []);
  const [loading, setLoading] = useState(!galleryCache);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (galleryCache && galleryCache.length > 0) {
      return;
    }

    let isSubscribed = true;
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok && isSubscribed) {
          const data = await res.json();
          const list = data.items || [];
          galleryCache = list;
          setItems(list);
        }
      } catch (err) {
        console.error("Failed to load gallery images:", err);
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    }
    fetchGallery();

    return () => {
      isSubscribed = false;
    };
  }, []);

  const availableCategories = useMemo(() => {
    const cats = new Set(items.map(item => item.category || 'unlabeled'));
    return ['all', ...Array.from(cats)];
  }, [items]);

  const filteredItems = useMemo(() => {
    const pinnedItems = items.filter(item => item.is_pinned);
    const unpinnedItems = items.filter(item => !item.is_pinned);

    if (activeCategory !== 'all') {
      const activePinned = pinnedItems.filter(item => (item.category || 'unlabeled') === activeCategory);
      const activeUnpinned = unpinnedItems.filter(item => (item.category || 'unlabeled') === activeCategory);
      return [...activePinned, ...activeUnpinned];
    }

    // Interleave unpinned images evenly across categories
    const categoriesMap: Record<string, GalleryItem[]> = {};
    unpinnedItems.forEach(item => {
      const cat = item.category || 'unlabeled';
      if (!categoriesMap[cat]) categoriesMap[cat] = [];
      categoriesMap[cat].push(item);
    });

    const interleaved: GalleryItem[] = [];
    const catKeys = Object.keys(categoriesMap);
    let hasMore = true;
    let index = 0;

    while (hasMore) {
      hasMore = false;
      for (const cat of catKeys) {
        if (index < categoriesMap[cat].length) {
          interleaved.push(categoriesMap[cat][index]);
          hasMore = true;
        }
      }
      index++;
    }

    return [...pinnedItems, ...interleaved];
  }, [items, activeCategory]);

  const handlePreloadOriginal = (url: string) => {
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = url;
    }
  };

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev !== null && filteredItems.length > 0 ? (prev + 1) % filteredItems.length : null));
  }, [filteredItems.length]);

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev !== null && filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  }, [filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleNextImage, handlePrevImage]);

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

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-8 mb-2">
        <div className="inline-block relative">
          <label htmlFor="category-select" className="sr-only">Select Category</label>
          <select
            id="category-select"
            value={activeCategory}
            onChange={(e) => { setActiveCategory(e.target.value); setSelectedImageIndex(null); }}
            className="appearance-none bg-white-off/5 text-white border border-white/20 hover:border-gold/50 rounded-md pl-4 pr-10 py-2.5 text-xs font-serif uppercase tracking-widest focus:outline-none focus:border-gold cursor-pointer transition-colors"
          >
            {availableCategories.map(cat => (
              <option key={cat} value={cat} className="bg-ink text-white">
                {cat === 'all' ? 'All Galleries' : cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold/70">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
            <p className="text-white/40 font-serif tracking-widest text-sm uppercase">Loading Gallery Photos...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2.5 sm:gap-4 space-y-2.5 sm:space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => {
                    handlePreloadOriginal(item.secure_url);
                    setSelectedImageIndex(idx);
                  }}
                  onMouseEnter={() => handlePreloadOriginal(item.secure_url)}
                  className="group relative overflow-hidden bg-white-off/5 break-inside-avoid w-full mb-2.5 sm:mb-4 cursor-pointer border border-white/5 hover:border-gold/40 transition-colors duration-300 rounded-sm"
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo ${item.public_id || idx + 1} full size`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePreloadOriginal(item.secure_url);
                      setSelectedImageIndex(idx);
                    }
                  }}
                >
                  <CldImage
                    width="600"
                    height="600"
                    crop="limit"
                    src={item.public_id}
                    alt={item.category ? `Vishakahu Academy - ${item.category}` : "Vishakahu Academy gallery photograph"}
                    sizes="(max-width: 768px) 50vw, 33vw"
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
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center z-10">
              <div>
                <span className="text-gold text-xs font-serif tracking-[0.2em] uppercase block">
                  Photo ({selectedImageIndex + 1} / {filteredItems.length})
                </span>
                <span className="text-white/50 text-[10px] font-mono uppercase tracking-widest mt-1">
                  Category: {filteredItems[selectedImageIndex].category}
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
              {filteredItems.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 md:left-6 z-20 p-3 text-white/70 hover:text-gold bg-ink/60 hover:bg-ink border border-white/10 rounded-full transition-all"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <motion.div
                key={filteredItems[selectedImageIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-h-[80vh] max-w-[90vw] flex items-center justify-center shadow-2xl rounded-sm"
              >
                <CldImage
                  width="1920"
                  height="1080"
                  crop="limit"
                  src={filteredItems[selectedImageIndex].public_id}
                  alt="Gallery Full Image"
                  sizes="90vw"
                  className="w-auto h-auto max-h-[80vh] max-w-[90vw] object-contain"
                />
              </motion.div>

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
