'use client';

import React from 'react';
import Image from 'next/image';
import iwkaCert from '../public/certs/IWKA_cert.jpeg';
import judoCert from '../public/certs/Judo_cert.jpeg';
import senseiHussaini from '../public/certs/sensei_hussaini.png';
import tkdCert from '../public/certs/tkd_cert.jpeg';

const CERTIFICATES = [
  { id: '1', src: iwkaCert, alt: 'IWKA Certificate' },
  { id: '2', src: judoCert, alt: 'Judo Certificate' },
  { id: '3', src: senseiHussaini, alt: 'Sensei Hussaini' },
  { id: '4', src: tkdCert, alt: 'Taekwondo Certificate' },
];

export default function CertificatesMarquee() {
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
        <div className="py-4 flex animate-marquee space-x-6 px-4 items-center">
          {[...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES].map((cert, index) => (
            <div 
              key={`${cert.id}-${index}`} 
              className="relative shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 rounded-sm overflow-hidden shadow-lg border border-white/5 bg-white-off/5"
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                className="h-40 sm:h-56 w-auto object-contain"
                placeholder="blur"
              />
            </div>
          ))}
        </div>
      </div>

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
