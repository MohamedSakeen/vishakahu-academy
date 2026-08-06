'use client';

import React, { useEffect, useRef, useState } from 'react';
import ShihanHussainiImg from '../public/masters/Shihan_hussaini.jpg';
import TatsoShimabukuImg from '../public/masters/Tatso_shimbabuko.jpg';
import AngiUezuImg from '../public/masters/Angi-Uzeu.jpg';
import KichiroShimabukuImg from '../public/masters/Kichiro_shimbabuko.jpg';

const MASTERS_DATA = [
  {
    nameEN: 'Tatsuo Shimabuku',
    nameJP: '島袋 龍夫',
    era: '1908 – 1975',
    title: 'Sōke · Grand Founder',
    rank: '10th Dan · Hanshi',
    kanji: '龍',
    accent: '#C0392B',
    accentRGB: '192,57,43',
    bio: 'Born in 1908 in Okinawa, Shimabuku synthesised Shorin-ryu, Goju-ryu and Kobudo into one art. On January 15, 1956, he named it "Isshinryu" — One Heart Way. He passed away May 30, 1975. His legacy spans the globe.',
    achievements: [
      'Founded Isshinryu Karate — Jan 15, 1956',
      'Trained under 4 eminent Grand Masters',
      'First Isshinryu Hall of Fame inductee'
    ],
    quote: 'Because all things begin with one.',
    gen: 'GEN 01 · OKINAWA 1956',
    image: TatsoShimabukuImg.src
  },
  {
    nameEN: 'Kichiro Shimabuku',
    nameJP: '島袋 清吉',
    era: 'b. circa 1940s',
    title: 'Kancho · IWKA President',
    rank: '10th Dan · Hanshi',
    kanji: '継',
    accent: '#D4A017',
    accentRGB: '212,160,23',
    bio: 'Eldest son of Tatsuo Shimabuku, Kichiro inherited the headship of Isshinryu upon his father\'s retirement. As President of the IWKA, he has sustained the authentic lineage and promoted the art globally for over 50 years.',
    achievements: [
      'Inherited Isshinryu from Tatsuo',
      'President of the IWKA',
      'Steward of authentic roots for 50+ years'
    ],
    quote: 'Tradition is not the preservation of ashes, but the passing of the flame.',
    gen: 'GEN 02 · OKINAWA 1975',
    image: KichiroShimabukuImg.src
  },
  {
    nameEN: 'Angi Uezu',
    nameJP: '上江洲 安儀',
    era: '1935 – 2024',
    title: 'Hanshi · O.I.K.K.A. Founder',
    rank: '10th Dan · Hanshi',
    kanji: '義',
    accent: '#F5C842',
    accentRGB: '245,200,66',
    bio: 'Son-in-law of Tatsuo Shimabuku, Uezu became one of Isshinryu\'s greatest ambassadors. He travelled the world representing the art, founded the O.I.K.K.A. in 1987, and was universally mourned upon his passing in 2024.',
    achievements: [
      'Founded the O.I.K.K.A. in 1987',
      'First designated intl. representative',
      'Inducted into Hall of Fame (1997)'
    ],
    quote: 'Karate is not simply self-defense — it is a lifelong path of personal development.',
    gen: 'GEN 02 · OKINAWA 1967',
    image: AngiUezuImg.src
  },
  {
    nameEN: 'Shihan Hussaini',
    nameJP: 'フセイニ師範',
    era: 'Active 20th–21st century',
    title: 'Shihan · India Pioneer',
    rank: 'Shihan',
    kanji: '道',
    accent: '#C0392B',
    accentRGB: '192,57,43',
    bio: 'Shihan Hussaini is the founding pioneer who introduced authentic Isshinryu to India. Carrying the direct lineage from Okinawa, he trained hundreds and established India\'s place in the global family.',
    achievements: [
      'First to introduce Isshinryu to India',
      'Trained the founding Indian generation',
      'Bridge between Okinawa and India'
    ],
    quote: 'The art does not stop at borders. The heart has no geography.',
    gen: 'GEN 03 · INDIA',
    image: ShihanHussainiImg.src  
  },
  {
    nameEN: 'Hanshi Sellapandiyan',
    nameJP: 'セラパンディアン範士',
    era: 'Active present day',
    title: 'Hanshi · India Head',
    rank: 'Hanshi',
    kanji: '師',
    accent: '#D4A017',
    accentRGB: '212,160,23',
    bio: 'Current Head of Isshinryu Karate India, Hanshi Sellapandiyan has built upon the legacy of Shihan Hussaini to grow the art. Under his national leadership, hundreds carry the One Heart Way forward.',
    achievements: [
      'National Head of Isshinryu India',
      'Directly guides Vishakahu Academy',
      'Connects India to global legacy'
    ],
    quote: 'Discipline is the bridge between the student you are and the master you will become.',
    gen: 'GEN 04 · INDIA · PRESENT',
    // fallback to the available Indian portrait image
    image: ShihanHussainiImg.src
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
    <section id="masters" ref={sectionRef} className={`w-full bg-[#060305] relative flex flex-col min-h-screen xl:h-screen xl:max-h-screen overflow-hidden pt-12 pb-6 xl:pt-16 xl:pb-8 ${isVisible ? 'section-visible' : ''}`}>
      
      <style suppressHydrationWarning>{`
        #masters .master-card {
          opacity: 0;
          transform: translateY(30px);
        }
        #masters.section-visible .master-card {
           opacity: 1;
           transform: translateY(0);
        }
        @keyframes kanji-drift {
          0%   { transform: translate(-50%, -50%) rotate(0deg) scale(1.0); }
          33%  { transform: translate(-50%, -50%) rotate(5deg) scale(1.04); }
          66%  { transform: translate(-50%, -50%) rotate(-3deg) scale(0.97); }
          100% { transform: translate(-50%, -50%) rotate(0deg) scale(1.0); }
        }
        @keyframes portrait-glow {
          0%,100% { box-shadow: inset 0 0 30px rgba(0,0,0,0); }
          50%     { box-shadow: inset 0 0 30px var(--glow); }
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
      
      <div className="absolute top-10 right-10 text-[20rem] font-jp opacity-[0.02] text-white-off select-none pointer-events-none">
        師
      </div>

      <header className="flex-shrink-0 px-8 lg:px-16 mb-8 lg:mb-12 relative z-10 text-center xl:text-left">
        <span className="font-jp text-[0.6rem] text-crimson tracking-[4px] uppercase block mb-3">
          The Lineage · 継承
        </span>
        <h2 className="font-serif font-bold text-white uppercase m-0 leading-tight" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
          Masters of <span className="text-gold">Isshinryu</span>
        </h2>
        <p className="font-sans text-[0.72rem] text-white/40 tracking-[1px] mt-2">
          Five pillars of a living tradition — Okinawa to India
        </p>
      </header>

      <div className="flex-1 min-h-0 w-full px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4 overflow-x-hidden overflow-y-auto xl:overflow-hidden">
        
        {MASTERS_DATA.map((master, idx) => {
          const isActive = activeIdx === idx;
          const isDimmed = activeIdx !== null && activeIdx !== idx;
          
          return (
            <div 
              key={idx}
              className={`master-card group relative cursor-pointer border border-white/[0.06] bg-white/[0.02] flex flex-col h-[55vh] md:h-auto min-h-[400px] xl:min-h-0 xl:h-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${isDimmed ? 'dimmed' : ''} ${isActive ? 'h-[60vh] xl:h-full z-10' : ''}`}
              style={{ 
                transitionDelay: isVisible ? `${idx * 0.12}s` : '0s',
                ...(isActive ? {
                  transform: 'translateY(-6px) scale(1.01)',
                  borderColor: 'rgba(212,160,23,0.35)',
                  boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(${master.accentRGB}, 0.2)`,
                  zIndex: 10
                } : {})
              }}
              onMouseEnter={() => { setActiveIdx(idx); }}
              onMouseLeave={() => { setActiveIdx(null); }}
              onClick={() => handleCardInteraction(idx)}
            >
              
              <div 
                className="absolute top-0 left-0 h-[3px] bg-gradient-to-r transition-all duration-1000 ease-out z-20"
                style={{
                  width: isVisible ? '100%' : '0%',
                  transitionDelay: `${(idx * 0.12) + 0.3}s`,
                  backgroundImage: `linear-gradient(to right, ${master.accent}, rgba(255,255,255,0.2))`
                }} 
              />
              
              <div className="absolute top-3 right-0 w-full text-center z-10 pointer-events-none">
                <span className="font-jp text-[0.45rem] tracking-[2px] uppercase bg-ink/70 px-2 py-[2px]" style={{ color: `rgba(${master.accentRGB}, 0.6)` }}>
                  {master.gen}
                </span>
              </div>

              <div 
                className="flex-1 relative overflow-hidden pointer-events-none flex items-center justify-center pt-8"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(123,0,0,0.4) 0%, transparent 80%)',
                  '--glow': `rgba(${master.accentRGB},0.12)`
                } as any}
              >
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-jp opacity-5 select-none transition-transform duration-700 pointer-events-none"
                  style={{ color: master.accent, animation: `kanji-drift ${12 + idx * 3}s ease-in-out infinite` }}
                >
                  {master.kanji}
                </div>
                
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ animation: `portrait-glow 3s infinite ${idx * 0.5}s` }}></div>

                <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                  {master.image ? (
                    <img
                      src={master.image}
                      alt={master.nameEN}
                      loading="lazy"
                      className="object-cover rounded-full w-[65%] h-[65%] mx-auto"
                      style={{ boxShadow: `inset 0 0 30px rgba(${master.accentRGB},0.06)` }}
                    />
                  ) : null}
                  <div 
                    className="absolute inset-0 rounded-full border border-white mx-auto my-auto w-[65%] h-[65%] pointer-events-none"
                    style={{ borderColor: `rgba(${master.accentRGB}, 0.2)`}}
                  />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#060305] to-transparent z-10 pointer-events-none" />
              </div>

              <div className={`absolute bottom-5 left-0 w-full text-center z-10 transition-all duration-300 ease-out group-hover:-translate-y-2 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className="font-serif text-[0.85rem] text-white tracking-[2px] uppercase">
                  {master.nameEN}
                </h3>
                <p className="font-jp text-[0.55rem] tracking-[2px] uppercase mt-1" style={{ color: master.accent }}>
                  {master.title}
                </p>
              </div>

              <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 rounded-[inherit]">
                <div 
                  className={`master-reveal absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060305] via-[#060305]/95 to-transparent px-4 pb-5 pt-16 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-[2px] xl:group-hover:translate-y-0 flex flex-col justify-end pointer-events-auto ${isActive ? 'translate-y-0' : 'translate-y-full'}`}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: master.accent }} />
                  
                  <h4 className="font-serif text-[1rem] text-white uppercase tracking-wider mb-1 leading-tight">
                    {master.nameEN}
                  </h4>
                  <div className="font-jp text-[0.7rem] text-gold tracking-widest mb-1 opacity-80">
                    {master.nameJP} <span className="opacity-50 text-[0.55rem] ml-1">{master.era}</span>
                  </div>
                  <div className="font-jp text-[0.6rem] text-crimson uppercase tracking-widest mb-3">
                    {master.rank}
                  </div>
                  
                  <div className="w-[30px] h-[1px] mb-3 bg-gradient-to-r from-crimson to-gold" />
                  
                  <p className="font-sans text-[0.7rem] text-white/75 leading-[1.6] mb-4">
                    {master.bio}
                  </p>
                  
                  <ul className="mb-4 space-y-[6px]">
                    {master.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="font-sans text-[0.65rem] text-gold/60 leading-tight flex items-start">
                        <span className="mr-2 text-[0.5rem] mt-[3px]">✦</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <blockquote className="font-sans italic text-[0.65rem] text-white/45 leading-[1.5] border-l border-white/10 pl-3">
                    「 {master.quote} 」
                  </blockquote>
                </div>
              </div>

              {idx < MASTERS_DATA.length - 1 && (
                <div className="hidden xl:flex absolute top-1/2 -right-[5px] w-0 h-0 z-30 pointer-events-none items-center justify-center">
                  <div className="w-[10px] h-[1px] bg-gold/30 absolute" />
                  <div className="text-[0.4rem] text-gold absolute" style={{ animation: `shine 2s infinite ${idx * 0.15 + 1}s` }}>◆</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    </section>
  );
}
