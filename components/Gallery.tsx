'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  src: string;
  thumbnailSrc?: string;
  title: string;
  filename: string;
}

export default function Gallery() {
  const [previewItems, setPreviewItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleryPreview() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          setPreviewItems((data.items || []).slice(0, 8));
        }
      } catch (err) {
        console.error("Failed to load gallery preview:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleryPreview();
  }, []);

  return (
    <section id="gallery" className="py-32 relative bg-ink">
      <div className="absolute top-10 right-10 text-[200px] font-jp opacity-[0.02] kanji-watermark pointer-events-none">
        栄
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-gold font-serif text-sm tracking-[0.3em] uppercase block mb-4">
            Legacy
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-paper uppercase tracking-widest">
            Achievements & Moments
          </h2>
          <div className="relative z-20 flex justify-center mt-8 mb-6">
            <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-4 text-[0.6rem] text-gold">◆</div>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="py-12 text-center text-white/40 font-serif tracking-widest text-sm uppercase">
            Loading Academy Photos...
          </div>
        ) : previewItems.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {previewItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative overflow-hidden group bg-white-off/5 break-inside-avoid w-full border border-white/5 hover:border-gold/40 transition-all duration-300"
              >
                <Link href="/gallery">
                  <div className="w-full h-full relative transition-all duration-700">
                    <img 
                      src={item.thumbnailSrc || item.src}
                      alt="Academy Photo"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-white/40 font-serif tracking-widest text-sm uppercase">
            No Academy Photos Found
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/gallery" className="inline-block relative px-8 py-4 font-serif text-gold text-sm tracking-[0.2em] uppercase transition-all duration-300 group overflow-hidden">
            <span className="relative z-10">See All Prouds</span>
            <div className="absolute inset-0 border border-gold/30 group-hover:border-gold transition-colors duration-300"></div>
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold/50 group-hover:w-full transition-all duration-500 ease-out"></div>
            <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-gold/50 group-hover:w-full transition-all duration-500 ease-out"></div>
            <div className="absolute top-1/2 left-2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
              <span className="text-[10px]">◆</span>
            </div>
            <div className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
              <span className="text-[10px]">◆</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Bottom fade line */}
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />
    </section>
  );
}
