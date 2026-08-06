'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const GALLERY_ITEMS = [
  { title: "State Championship 2024", desc: "Champion", wide: true, seed: "karate-winner" },
  { title: "Kata Masters", desc: "District Gold", wide: false, seed: "karate-kata" },
  { title: "National Tournament 2023", desc: "National", wide: false, seed: "karate-national" },
  { title: "Junior Black Belt Ceremony", desc: "Ceremony", wide: false, seed: "karate-kids" },
  { title: "Women's Self-Defense Workshop", desc: "Empowerment", wide: true, seed: "karate-women" },
  { title: "Tameshiwari Demo", desc: "Board Breaking", wide: false, seed: "karate-breaking" },
  { title: "Annual Grading Ceremony", desc: "Grading", wide: false, seed: "karate-belts" },
  { title: "Inter-School Tournament Win", desc: "Victory", wide: false, seed: "karate-victory" },
];

export default function Gallery() {
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
            Achievements
          </h2>
          <div className="relative z-20 flex justify-center mt-8 mb-6">
            <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-4 text-[0.6rem] text-gold">◆</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative overflow-hidden group aspect-video ${item.wide ? 'md:col-span-2' : 'col-span-1'} bg-white-off/5 interactive`}
            >
              <div className="w-full h-full relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image 
                  src={`https://picsum.photos/seed/${item.seed}/800/600`}
                  alt={item.title}
                  fill
                  sizes={item.wide ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-gold text-xs font-serif tracking-[0.2em] uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.desc}
                </span>
                <h3 className="text-white text-lg font-serif tracking-widest uppercase">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a href="/gallery" className="inline-block relative px-8 py-4 font-serif text-gold text-sm tracking-[0.2em] uppercase transition-all duration-300 group overflow-hidden">
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
          </a>
        </div>
      </div>
      
      {/* Bottom fade line */}
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />
    </section>
  );
}
