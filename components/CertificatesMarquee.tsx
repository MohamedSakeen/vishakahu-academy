'use client';

import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import iwkaCert from '../public/certs/IWKA_cert.jpeg';
import judoCert from '../public/certs/Judo_cert.jpeg';
import senseiHussaini from '../public/certs/sensei_hussaini.png';
import tkdCert from '../public/certs/tkd_cert.jpeg';

interface CertificateItem {
  id: string;
  src: StaticImageData;
  alt: string;
}

const CERTIFICATES: CertificateItem[] = [
  { id: '1', src: iwkaCert, alt: 'IWKA Certificate' },
  { id: '2', src: judoCert, alt: 'Judo Certificate' },
  { id: '3', src: senseiHussaini, alt: 'Sensei Hussaini' },
  { id: '4', src: tkdCert, alt: 'Taekwondo Certificate' },
];

export default function CertificatesMarquee() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <div className="w-full py-8 overflow-hidden bg-ink/20 border-t border-gold/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6 text-center">
        <h3 className="text-paper font-serif tracking-widest uppercase text-sm">
          Recognitions & Affiliations
        </h3>
        <div className="w-12 h-[3px] bg-gold/50 mx-auto mt-4" />
      </div>
    
      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        {/* We duplicate the certificates to create a seamless infinite loop */}
        <div 
          className="py-4 flex animate-marquee space-x-6 px-4 items-center"
          style={{ animationPlayState: selectedCert ? 'paused' : undefined }}
        >
          {[...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES].map((cert, index) => (
            <button
              type="button"
              key={`${cert.id}-${index}`}
              onClick={() => setSelectedCert(cert)}
              className="relative shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 active:grayscale-0 active:opacity-100 transition-all duration-300 rounded-sm overflow-hidden shadow-lg border border-white/5 hover:border-gold/40 active:border-gold/60 bg-white-off/5 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-gold/40"
              aria-label={`View ${cert.alt} in full color`}
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                className="h-40 sm:h-56 w-auto object-contain pointer-events-none"
                placeholder="blur"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/90 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-xl w-full bg-ink border border-gold/40 rounded-sm p-4 sm:p-6 shadow-2xl shadow-black/80 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-paper/70 hover:text-gold active:scale-95 transition-colors z-10 rounded-full bg-white-off/5 hover:bg-white-off/10"
                aria-label="Close certificate preview"
              >
                <X size={20} />
              </button>

              {/* Title Header */}
              <div className="mb-4 text-center pr-8 pl-2">
                <span className="text-[10px] text-gold font-serif tracking-[0.25em] uppercase block mb-1">
                  Official Recognition
                </span>
                <h4 className="text-paper font-serif tracking-widest uppercase text-base sm:text-lg">
                  {selectedCert.alt}
                </h4>
              </div>

              {/* Colored Certificate Image */}
              <div className="relative w-full flex justify-center items-center overflow-hidden rounded-sm border border-white/10 bg-white-off/5 p-2">
                <Image
                  src={selectedCert.src}
                  alt={selectedCert.alt}
                  className="max-h-[65vh] w-auto h-auto object-contain rounded-sm shadow-md"
                  priority
                />
              </div>

              {/* Footer CTA */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2 bg-crimson/90 hover:bg-crimson text-white font-serif tracking-[0.2em] text-[11px] font-bold uppercase transition-all clip-elegant active:scale-95"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
