'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function Sensei() {
  return (
    <section id="sensei" className="py-32 relative bg-ink">
      <div className="absolute top-10 right-10 text-[200px] font-jp opacity-[0.02] kanji-watermark pointer-events-none">
        師
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-gold font-serif text-sm tracking-[0.3em] uppercase block mb-4">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-paper uppercase tracking-widest">
            The Masters
          </h2>
          <div className="relative z-20 flex justify-center mt-8 mb-6">
            <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-4 text-[0.6rem] text-gold">◆</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sensei Profile Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-serif text-paper mb-2">
                Kyoshi Vishnwarthan
              </h3>
              <div className="text-gold font-serif tracking-[0.2em] mb-8 uppercase text-sm">
                Chief Instructor, Vishakahu Academy
              </div>
              
              <div className="space-y-6 text-white-off/70 font-sans leading-relaxed">
                <p>
                  Trained under the legendary India lineage founded by Hanshi Shihan Hussaini 
                  and currently led by Hanshi Sellapandiyan across Tamil Nadu.
                </p>
                <p>
                  Kyoshi Vishnwarthan embodies the spirit of Isshinryu—balancing the hard and 
                  soft elements of martial arts. He has founded multiple branches across 
                  Tirunelveli and Chennai, dedicating his life to shaping the next generation 
                  of warriors.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '20+', label: 'Years Exp' },
                  { value: '5', label: 'Dojos' },
                  { value: '500+', label: 'Students' },
                  { value: '1st', label: 'Place Wins' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 border border-white-off/10 bg-white-off/[0.02]">
                    <div className="text-gold font-serif text-2xl mb-1">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-white-off/50">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white-off/10">
                <h4 className="text-paper font-serif tracking-widest mb-6 uppercase text-sm">Assistant Instructors</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Sensei Mohamed Sakeen',
                      rank: '2nd Dan - IIWKA',
                      branch: 'Citilights Meadows Dojo',
                      lineClass: 'bg-crimson',
                      gradientClass: 'from-crimson/80',
                      image: 'https://images.unsplash.com/photo-1583468323330-f010c0e0f22f?w=400&h=400&fit=crop&q=80'
                    },
                    {
                      name: 'Sensei Muthu Akash',
                      rank: '2nd Dan - IIWKA',
                      branch: 'Suthamalli Dojo',
                      lineClass: 'bg-gold',
                      gradientClass: 'from-gold/80',
                      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80'
                    }
                  ].map((instructor, idx) => (
                    <div key={idx} className="group relative bg-white-off/[0.02] border border-white-off/10 overflow-hidden interactive cursor-pointer min-h-[140px]">
                      {/* Image that fades in on hover */}
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-ink">
                        <img 
                          src={instructor.image}
                          alt={instructor.name}
                          className="w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${instructor.gradientClass} via-ink/60 to-transparent mix-blend-multiply`} />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-6 flex flex-col h-full transform group-hover:-translate-y-1 transition-transform duration-500">
                        <div className={`w-8 h-[2px] ${instructor.lineClass} mb-4`} />
                        <h5 className="text-paper font-serif text-lg mb-1 group-hover:text-white transition-colors">{instructor.name}</h5>
                        <div className="text-gold text-xs tracking-widest uppercase mb-1">{instructor.rank}</div>
                        <div className="text-white-off/50 text-[0.65rem] tracking-widest uppercase mt-auto pt-4 flex items-center justify-between">
                          <span>{instructor.branch}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 -translate-x-2 text-gold">→</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          {/* Sensei Image Placeholder */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-10" />
              <div className="w-full h-full bg-white-off/5 flex items-center justify-center border border-white-off/10">
                <div className="text-white-off/20 font-jp text-6xl">師範</div>
              </div>
              
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-gold/30 z-0 hidden md:block" />
              <div className="absolute -top-6 -right-6 w-12 h-12 border-t border-r border-gold z-0 hidden md:block" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b border-l border-gold z-0 hidden md:block" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
