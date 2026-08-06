'use client';
import { motion } from 'motion/react';

const BELTS = [
  { color: 'White', kanji: '白帯', type: 'Shiro-Obi', bg: 'bg-white', text: 'text-ink' },
  { color: 'Yellow', kanji: '黄帯', type: 'Ki-Obi', bg: 'bg-yellow-400', text: 'text-ink' },
  { color: 'Green', kanji: '緑帯', type: 'Midori-Obi', bg: 'bg-green-700', text: 'text-white' },
  { color: 'Blue', kanji: '青帯', type: 'Ao-Obi', bg: 'bg-blue-600', text: 'text-white' },
  { color: 'Purple I', kanji: '紫帯 I', type: 'Murasaki-Obi', bg: 'bg-purple-700', text: 'text-white' },
  { color: 'Purple II', kanji: '紫帯 II', type: 'Murasaki-Obi', bg: 'bg-purple-800', text: 'text-white' },
  { color: 'Brown I', kanji: '茶帯 I', type: 'Cha-Obi', bg: 'bg-amber-800', text: 'text-white' },
  { color: 'Brown II', kanji: '茶帯 II', type: 'Cha-Obi', bg: 'bg-amber-900', text: 'text-white' },
  { color: 'Brown III', kanji: '茶帯 III', type: 'Cha-Obi', bg: 'bg-amber-950', text: 'text-white' },
  { color: 'Black', kanji: '黒帯', type: 'Kuro-Obi', bg: 'bg-ink', text: 'text-white border border-white/20' },
];

export default function Journey() {
  return (
    <section id="journey" className="py-32 relative bg-ink">
      <div className="absolute top-10 left-10 text-[200px] font-jp opacity-[0.02] kanji-watermark pointer-events-none">
        段
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-gold font-serif text-sm tracking-[0.3em] uppercase block mb-4">
            Progression
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-paper uppercase tracking-widest">
            The Journey
          </h2>
          <div className="relative z-20 flex justify-center mt-8 mb-6">
            <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-4 text-[0.6rem] text-gold">◆</div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-white-off/10 md:-translate-x-1/2" />

          {BELTS.map((belt, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div 
                key={belt.color}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center mb-12 md:mb-8 last:mb-0 ${isLeft ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Center Node */}
                <div className="absolute left-[20px] md:left-1/2 w-3 h-3 bg-gold rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(212,160,23,0.5)]" />
                
                {/* Content */}
                <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <div className={`inline-block px-6 py-3 rounded-sm shadow-lg ${belt.bg} ${belt.text}`}>
                    <div className="font-serif tracking-widest text-lg uppercase mb-1">
                      {belt.color}
                    </div>
                    <div className="flex items-center gap-3 justify-start md:justify-center">
                       <span className="font-jp text-sm">{belt.kanji}</span>
                       <span className="text-xs opacity-70 tracking-widest uppercase">{belt.type}</span>
                    </div>
                  </div>
                  {belt.color === 'Black' && (
                    <div className="mt-4 text-gold font-serif tracking-[0.2em] text-sm uppercase">
                      Shodan 初段
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white-off/10 to-transparent" />
    </section>
  );
}
