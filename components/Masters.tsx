'use client';

import React, { useEffect, useRef, useState } from 'react';
import ShihanHussainiImg from '../public/masters/Shihan_hussaini.jpg';
import TatsoShimabukuImg from '../public/masters/Tatso_shimbabuko.jpg';
import AngiUezuImg from '../public/masters/Angi-Uzeu.jpg';
import KichiroShimabukuImg from '../public/masters/Kichiro_shimbabuko.jpg';
import Sellapandiyan from '../public/masters/sellapandian_hanshi.jpg';

const MASTERS_DATA = [
  {
    nameEN: 'Tatsuo Shimabuku',
    era: '1908 – 1975',
    title: 'Sōke · Grand Founder',
    rank: '10th Dan · Hanshi',
    kanji: '龍',
    accent: '#C0392B',
    accentRGB: '192,57,43',
    bio: 'Born in 1908 in Okinawa, Shimabuku synthesised Shorin-ryu, Goju-ryu and Kobudo into one art. On January 15, 1956, he named it "Isshinryu" — One Heart Way. He passed away May 30, 1975. His legacy spans the globe.',
    image: TatsoShimabukuImg.src
  },
  {
    nameEN: 'Kichiro Shimabuku',
    era: '1939 - Present',
    title: 'Kancho · IWKA President',
    rank: '10th Dan · Hanshi',
    kanji: '継',
    accent: '#D4A017',
    accentRGB: '212,160,23',
    bio: 'Eldest son of Tatsuo Shimabuku, Kichiro inherited the headship of Isshinryu upon his father\'s retirement. As President of the IWKA, he has sustained the authentic lineage and promoted the art globally for over 50 years.',
    image: KichiroShimabukuImg.src
  },
  {
    nameEN: 'Angi Uezu',
    era: '1935 – 2024',
    title: 'Hanshi · O.I.K.K.A. Founder',
    rank: '10th Dan · Hanshi',
    kanji: '義',
    accent: '#F5C842',
    accentRGB: '245,200,66',
    bio: 'Son-in-law of Tatsuo Shimabuku, Uezu became one of Isshinryu\'s greatest ambassadors. He travelled the world representing the art, founded the O.I.K.K.A. in 1987, and was universally mourned upon his passing in 2024.',
    image: AngiUezuImg.src
  },
  {
    nameEN: 'Shihan Hussaini',
    era: 'Active 20th–21st century',
    title: 'Hanshi · India Pioneer',
    rank: '10th Dan · Hanshi',
    kanji: '道',
    accent: '#F5C842',
    accentRGB: '245,200,66',
    bio: 'Shihan Hussaini is the founding pioneer who introduced authentic Isshinryu to India, who also known as Father of Isshinyu Karate India. Trained more than 100000+ students across India ',
    image: ShihanHussainiImg.src  
  },
  {
    nameEN: 'Hanshi Sella Pandiyan',
    era: 'Active present day',
    title: 'Hanshi · India Head',
    rank: '10th Dan · Hanshi',
    kanji: '師',
    accent: '#D4A017',
    accentRGB: '212,160,23',
    bio: 'Current Head of Isshinryu Karate India, Hanshi Sella Pandiyan has built upon the legacy of Shihan Hussaini to grow the art. Under his national leadership, hundreds carry the One Heart Way forward.',
    image: Sellapandiyan.src
  }
];

export default function Masters() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardInteraction = (idx: number) => {
    if (window.innerWidth < 768) {
      setActiveIdx(activeIdx === idx ? null : idx);
    }
  };

  return (
    <section id="masters" ref={sectionRef} className={`w-full bg-[#060305] relative flex flex-col py-16 md:py-24 lg:py-32 overflow-hidden ${isVisible ? 'section-visible' : ''}`}>
      
      <style suppressHydrationWarning>{`
        #masters .master-card {
          opacity: 0;
          transform: translateY(30px);
        }
        #masters.section-visible .master-card {
           opacity: 1;
           transform: translateY(0);
        }
        @keyframes shine {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0.8); }
        }
        .dimmed {
          opacity: 0.55;
          filter: brightness(0.7);
        }
      `}</style>
      
      <div className="absolute top-10 right-10 text-[24rem] font-jp opacity-[0.02] text-white-off select-none pointer-events-none">
        師
      </div>

      <header className="w-full max-w-5xl mx-auto mb-10 lg:mb-16 relative z-10 text-center px-4">
        <span className="font-jp text-[0.65rem] text-crimson tracking-[4px] uppercase block mb-3">
          The Lineage · 継承
        </span>
        <h2 className="font-serif font-bold text-white uppercase m-0 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
          Masters of <span className="text-gold">Isshinryu</span>
        </h2>
      </header>

      <div className="w-[calc(100%-40px)] sm:w-[calc(100%-80px)] max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">        
        {MASTERS_DATA.map((master, idx) => {
          const isActive = activeIdx === idx;
          const isDimmed = activeIdx !== null && activeIdx !== idx;
          
          return (
            <div 
              key={idx}
              className={`master-card group relative cursor-pointer border border-white/[0.08] bg-white/[0.02] flex flex-row md:flex-col p-3 md:p-0 gap-3.5 md:gap-0 h-auto md:h-[420px] lg:h-[470px] rounded-xl md:rounded-none transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${isDimmed ? 'dimmed' : ''} ${isActive ? 'z-10' : ''}`}
              style={{ 
                transitionDelay: isVisible ? `${idx * 0.12}s` : '0s',
                ...(isActive ? {
                  transform: 'translateY(-6px) scale(1.02)',
                  borderColor: 'rgba(212,160,23,0.45)',
                  boxShadow: `0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(${master.accentRGB}, 0.25)`,
                  zIndex: 10
                } : {})
              }}
              onMouseEnter={() => { setActiveIdx(idx); }}
              onMouseLeave={() => { setActiveIdx(null); }}
              onClick={() => handleCardInteraction(idx)}
            >
              
              <div 
                className="absolute top-0 left-0 h-[3px] bg-gradient-to-r transition-all duration-1000 ease-out z-20 rounded-t-xl md:rounded-none"
                style={{
                  width: isVisible ? '100%' : '0%',
                  transitionDelay: `${(idx * 0.12) + 0.3}s`,
                  backgroundImage: `linear-gradient(to right, ${master.accent}, rgba(255,255,255,0.2))`
                }} 
              />

              {/* Master Image */}
              <div className="w-24 sm:w-32 md:w-full shrink-0 md:shrink md:flex-1 relative overflow-hidden rounded-lg md:rounded-none pointer-events-none aspect-[3/4] md:aspect-auto min-h-0 border border-white/10 md:border-none">
                {master.image ? (
                  <img
                    src={master.image}
                    alt={master.nameEN}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                ) : null}

                <div className="hidden md:block absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#060305] via-[#060305]/40 to-transparent z-10 pointer-events-none" />
              </div>

              {/* Mobile Details (Visible only on mobile screens < md) */}
              <div className="flex-1 flex flex-col justify-center md:hidden min-w-0 pr-1 z-10">
                <h3 className="font-serif text-sm sm:text-base text-white tracking-wider uppercase font-semibold leading-tight mb-1">
                  {master.nameEN}
                </h3>
                
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.62rem] sm:text-[0.68rem] mb-1.5">
                  <span className="font-serif text-gold opacity-90">{master.era}</span>
                  <span className="text-white/30">•</span>
                  <span className="font-jp uppercase tracking-wider" style={{ color: master.accent }}>{master.rank}</span>
                </div>
                
                <div className="w-8 h-[1px] mb-2 bg-gradient-to-r from-crimson to-gold" />
                
                <p className="font-sans text-[0.68rem] sm:text-[0.74rem] text-white/75 leading-[1.5] line-clamp-4 sm:line-clamp-none">
                  {master.bio}
                </p>
              </div>

              {/* Desktop Title Bar (Visible only on desktop md and up) */}
              <div className={`hidden md:block absolute bottom-6 left-0 w-full text-center z-10 transition-all duration-300 ease-out group-hover:-translate-y-2 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className="font-serif text-[0.9rem] lg:text-[0.95rem] text-white tracking-[2px] uppercase font-semibold">
                  {master.nameEN}
                </h3>
                <p className="font-jp text-[0.65rem] tracking-[2px] uppercase mt-1" style={{ color: master.accent }}>
                  {master.title}
                </p>
              </div>

              {/* Desktop Hover Reveal Drawer (Visible only on desktop md and up) */}
              <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none z-20 rounded-[inherit]">
                <div 
                  className={`master-reveal absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060305] via-[#060305]/95 to-transparent px-5 pb-6 pt-16 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-[2px] xl:group-hover:translate-y-0 flex flex-col justify-end pointer-events-auto ${isActive ? 'translate-y-0' : 'translate-y-full'}`}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: master.accent }} />
                  
                  <h4 className="font-serif text-[1.1rem] text-white uppercase tracking-wider mb-1 leading-tight">
                    {master.nameEN}
                  </h4>
                  <div className="font-serif text-[0.75rem] text-gold tracking-widest mb-1 opacity-80">
                    {master.era}
                  </div>
                  <div className="font-jp text-[0.65rem] text-crimson uppercase tracking-widest mb-3">
                    {master.rank}
                  </div>
                  
                  <div className="w-[35px] h-[1px] mb-3 bg-gradient-to-r from-crimson to-gold" />
                  
                  <p className="font-sans text-[0.75rem] text-white/75 leading-[1.6]">
                    {master.bio}
                  </p>
                </div>
              </div>

              {idx < MASTERS_DATA.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-[13px] w-0 h-0 z-30 pointer-events-none items-center justify-center">
                  <div className="w-[12px] h-[1px] bg-gold/30 absolute" />
                  <div className="text-[0.45rem] text-gold absolute" style={{ animation: `shine 2s infinite ${idx * 0.15 + 1}s` }}>◆</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    </section>
  );
}
