'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Vishakahu from '../app/uploads/Vishakahu.png';

const ANNOTATIONS = [
  { id: 'card-1',  target: 'logo-text-top',    side: 'left',  color: 'gold',    title: 'VI · SHA',      desc: "'VI' denotes Hussaini's Disciple (Vishnu). 'SHA' denotes Disciple's Mother (Shanmugavalli)." },
  { id: 'card-2',  target: 'logo-text-top',    side: 'left', color: 'gold',    title: 'KA · HU',       desc: "'KA' denotes Disciple's Father (Kathirvel). 'HU' denotes Shihan Hussaini, God father of Isshinryu Karate and Vishnu's Guru." },
  { id: 'card-3',  target: 'logo-stars',       side: 'left',  color: 'crimson', title: 'Four Stars',    desc: "Four stars symbolise the importance of Madha, Pidha, Guru and Dev in our entire life." },
  { id: 'card-4',  target: 'logo-red-circle',  side: 'left', color: 'crimson', title: 'Red Circle',    desc: "The Red Circle signifies the true Enlightenment attained by the amazing art of Karate." },
  { id: 'card-5',  target: 'logo-fist',        side: 'left',  color: 'gold',    title: 'Clenched Fist', desc: "Clenched fist is the indication of Empty Hand Weapon." },
  { id: 'card-6',  target: 'logo-open-hand',   side: 'right', color: 'gold',    title: 'Open Hand',     desc: "The Open Hand manifests no to violence." },
  { id: 'card-7',  target: 'logo-figure',      side: 'right', color: 'crimson', title: 'The Figure',    desc: "Isshinryu style Goddess 'Mizugami' seated on the ocean is replaced by 'Buddha' seated on bloomed lotus." },
  { id: 'card-8',  target: 'logo-lotus',       side: 'right',  color: 'gold',    title: 'Bloomed Lotus', desc: "The Bloomed Lotus stands for the development of the Mind, Body and Spirit." },
  { id: 'card-9',  target: 'logo-text-bottom', side: 'right',  color: 'crimson', title: 'Style Name',    desc: "Represents particular Style of Karate." },
  { id: 'card-10', target: 'logo-text-bottom', side: 'right', color: 'crimson', title: 'Art Form',      desc: "Represents the name particular Art form." },
];

export default function LogoAnatomy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsActive(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;
    document.querySelectorAll('.la-card').forEach(c => c.classList.add('visible'));
  }, [isActive]);

  const handleInteraction = (cardId: string, targetId: string) => {
    document.querySelectorAll('.la-card').forEach(el => {
      if (el.id !== cardId) el.classList.add('dimmed');
    });
    document.getElementById(cardId)?.classList.add('active');
    document.getElementById(targetId)?.classList.add('highlighted');
  };

  const handleLeave = () => {
    document.querySelectorAll('.la-card').forEach(el => el.classList.remove('dimmed', 'active'));
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
  };

  return (
    <>
      <div
        className="divider-brush"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #C0392B 20%, #D4A017 50%, #C0392B 80%, transparent 100%)',
          position: 'relative',
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4A017] text-[10px]">◆</div>
      </div>

      <style suppressHydrationWarning>{`
        /* ── Section shell ── */
        #logo-anatomy {
          height: 100vh;
          max-height: 100vh;
          background: #060305;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        @media (max-width: 1200px) {
          #logo-anatomy { height: auto; max-height: none; overflow-y: visible; }
        }

        /* ── Header ── */
        .la-header {
          flex-shrink: 0;
          padding: 20px 60px 0;
          text-align: center;
          position: relative;
          z-index: 20;
          opacity: 0;
        }
        #logo-anatomy.section-active .la-header {
          animation: header-drop 0.6s ease forwards 0.2s;
        }

        /* ── Canvas ── */
        .la-canvas {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        @media (max-width: 1200px) {
          .la-canvas { flex-direction: column; padding-bottom: 60px; }
        }

        /* ── Logo ── */
        .la-logo-wrap {
          position: relative;
          z-index: 5;
          opacity: 0;
        }
        #logo-anatomy.section-active .la-logo-wrap {
          animation: logo-enter 0.8s ease-out forwards 0.5s, logo-breathe 3s ease-in-out infinite 1.3s;
        }
        .la-logo-svg {
          height: min(58vh, 400px);
          width: auto;
          transition: filter 0.4s ease;
        }
        @media (max-width: 1200px) {
          .la-logo-svg { height: 35vh; margin: 40px 0; }
        }

        /* ── Columns ── */
        .la-col-left, .la-col-right {
          position: absolute;
          top: 0; bottom: 0;
          width: calc(50% - 140px);
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          z-index: 10;
        }
        .la-col-left  { left: 0;  padding: 20px 20px 20px 40px; }
        .la-col-right { right: 0; padding: 20px 40px 20px 20px; align-items: flex-end; }

        @media (max-width: 1200px) {
          .la-col-left, .la-col-right {
            position: relative;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            padding: 10px 20px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          #logo-anatomy { height: 100vh; max-height: 100vh; overflow: hidden; }
          .la-header { padding-top: 80px; }
          .la-canvas {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            overflow-y: auto;
            align-items: stretch;
            padding-bottom: 40px;
          }
          .la-logo-wrap { order: -1; margin: 0 auto 20px auto; max-height: 250px; }
          .la-logo-svg  { height: 250px; margin: 0; }
          .la-col-left, .la-col-right {
            position: static;
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 12px;
            padding: 0 20px;
          }
          .la-col-left { margin-bottom: 12px; padding-bottom: 0; }
        }

        /* ── Cards ── */
        .la-card {
          position: relative;
          background: rgba(6,3,5,0.85);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 10px 14px;
          max-width: 200px;
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s ease,
                      box-shadow 0.3s ease, border-color 0.3s ease;
          backdrop-filter: blur(6px);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        /* Left-side card: accent on left, text left-aligned */
        .la-card[data-side="left"] {
          border-left: 2px solid var(--card-color);
          transform: translateX(-30px);
          text-align: left;
        }

        /* Right-side card: accent on right, title right-aligned, desc left-aligned */
        .la-card[data-side="right"] {
          border-right: 2px solid var(--card-color);
          transform: translateX(30px);
          align-self: flex-end;
          text-align: left;
        }
        .la-card[data-side="right"] .la-card-title {
          text-align: right;
        }

        @media (max-width: 1200px) {
          .la-card {
            max-width: none;
            border-left: 2px solid var(--card-color) !important;
            border-right: 1px solid rgba(255,255,255,0.06) !important;
            align-self: auto !important;
            text-align: left !important;
            transform: translateY(20px) !important;
          }
          .la-card[data-side="right"] .la-card-title { text-align: left !important; }
        }

        .la-card.visible {
          opacity: 1;
          transform: translateX(0) !important;
        }
        @media (max-width: 1200px) {
          .la-card.visible { transform: translateY(0) !important; }
        }

        .la-card.active,
        .la-card:hover {
          background: rgba(192,57,43,0.08);
          border-color: var(--card-color) !important;
          box-shadow: 0 0 20px rgba(192,57,43,0.2);
          transform: scale(1.02) translateX(0) !important;
          z-index: 100;
        }
        .la-card.dimmed { opacity: 0.35 !important; }

        /* ── Card text ── */
        .la-card-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.68rem, 0.9vw, 0.85rem);
          letter-spacing: 2px;
          color: var(--card-color);
          text-transform: uppercase;
          margin: 0;
          font-weight: 700;
          line-height: 1.3;
        }
        .la-card-desc {
          font-family: 'Noto Sans', sans-serif;
          font-size: clamp(0.65rem, 0.78vw, 0.78rem);
          color: rgba(253,250,244,0.72);
          line-height: 1.6;
          margin: 0;
          text-align: left !important;
        }

        /* ── Kanji watermark ── */
        .la-kanji-bg {
          position: absolute;
          top: 50%; right: 40px;
          transform: translateY(-50%);
          font-size: 20vw;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.03);
          opacity: 0.03;
          user-select: none;
          pointer-events: none;
          animation: kanji-bg-float 8s infinite alternate ease-in-out;
          line-height: 1;
        }

        /* ── Corner brackets ── */
        .corner-bracket {
          position: absolute;
          width: 30px; height: 30px;
          border-color: rgba(212,160,23,0.15);
          border-radius: 2px;
          opacity: 0;
        }
        #logo-anatomy.section-active .corner-bracket {
          animation: bracket-appear 0.6s forwards 0.8s;
        }

        /* ── Hotspots ── */
        .la-svg-group {
          pointer-events: all;
          cursor: crosshair;
        }
        .highlighted {
          outline: 1px dashed rgba(212,160,23,0.35);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* ── Keyframes ── */
        @keyframes header-drop {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logo-enter {
          from { opacity: 0; transform: scale(0.85); filter: drop-shadow(0 0 0px transparent); }
          to   { opacity: 1; transform: scale(1);    filter: drop-shadow(0 0 40px rgba(192,57,43,0.25)); }
        }
        @keyframes logo-breathe {
          0%,100% { filter: drop-shadow(0 0 20px rgba(192,57,43,0.2)); transform: scale(1); }
          50%     { filter: drop-shadow(0 0 40px rgba(192,57,43,0.45)); transform: scale(1.015); }
        }
        @keyframes kanji-bg-float {
          from { transform: translateY(-50%) translateY(0); }
          to   { transform: translateY(-50%) translateY(-15px); }
        }
        @keyframes bracket-appear {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <section id="logo-anatomy" ref={sectionRef} className={isActive ? 'section-active' : ''}>
        {/* Kanji watermark */}
        <div className="la-kanji-bg font-jp">紋</div>

        {/* Corner brackets */}
        <div className="corner-bracket top-[20px]    left-[20px]  border-t border-l" />
        <div className="corner-bracket top-[20px]    right-[20px] border-t border-r" />
        <div className="corner-bracket bottom-[20px] left-[20px]  border-b border-l" />
        <div className="corner-bracket bottom-[20px] right-[20px] border-b border-r" />

        <header className="la-header">
          <span className="font-jp text-[0.6rem] text-[#C0392B] tracking-[4px] uppercase block mb-3">
            The Emblem · 紋章
          </span>
          <h2
            className="font-serif font-bold text-white uppercase m-0 leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
          >
            Soul of the <span className="text-[#D4A017]">Emblem</span>
          </h2>
          <p className="font-sans text-[0.72rem] text-white/40 tracking-[1px] mt-2">
            Every element carries meaning. Every symbol tells a story.
          </p>
        </header>

        <div className="la-canvas">
          {/* Left column — cards 1–5 */}
          <div className="la-col-left">
            {ANNOTATIONS.slice(0, 5).map(ann => (
              <div
                key={ann.id}
                id={ann.id}
                className="la-card"
                data-side={ann.side}
                data-target={ann.target}
                style={{ '--card-color': ann.color === 'gold' ? '#D4A017' : '#C0392B' } as React.CSSProperties}
                onMouseEnter={() => handleInteraction(ann.id, ann.target)}
                onMouseLeave={handleLeave}
                onClick={() => handleInteraction(ann.id, ann.target)}
              >
                <p className="la-card-title">{ann.title}</p>
                <p className="la-card-desc">{ann.desc}</p>
              </div>
            ))}
          </div>

          {/* Centre — logo image with hotspots */}
          <div
            className="la-logo-wrap"
            style={{ width: 'min(400px, 100%)', aspectRatio: '400/520', margin: '0 auto', position: 'relative' }}
          >
            <Image
              src={Vishakahu}
              alt="Vishakahu Academy Logo"
              fill
              className="la-logo-svg object-contain"
              style={{ cursor: 'crosshair' }}
              referrerPolicy="no-referrer"
            />

            {/* Hotspots */}
            <div
              id="logo-text-top"
              className="la-svg-group absolute top-[4%] left-[10%] right-[10%] h-[15%] rounded-[50%_50%_0_0]"
              onMouseEnter={() => { handleInteraction('card-1', 'logo-text-top'); handleInteraction('card-2', 'logo-text-top'); }}
              onMouseLeave={handleLeave}
            />
            <div
              id="logo-stars"
              className="la-svg-group absolute top-[18%] left-[25%] right-[25%] h-[12%] rounded-full"
              onMouseEnter={() => handleInteraction('card-3', 'logo-stars')}
              onMouseLeave={handleLeave}
            />
            <div
              id="logo-red-circle"
              className="la-svg-group absolute top-[23%] left-[28%] right-[28%] aspect-square rounded-full"
              onMouseEnter={() => handleInteraction('card-4', 'logo-red-circle')}
              onMouseLeave={handleLeave}
            />
            <div
              id="logo-text-bottom"
              className="la-svg-group absolute bottom-[4%] left-[10%] right-[10%] h-[15%] rounded-[0_0_50%_50%]"
              onMouseEnter={() => { handleInteraction('card-9', 'logo-text-bottom'); handleInteraction('card-10', 'logo-text-bottom'); }}
              onMouseLeave={handleLeave}
            />
          </div>

          {/* Right column — cards 6–10 */}
          <div className="la-col-right">
            {ANNOTATIONS.slice(5).map(ann => (
              <div
                key={ann.id}
                id={ann.id}
                className="la-card"
                data-side={ann.side}
                data-target={ann.target}
                style={{ '--card-color': ann.color === 'gold' ? '#D4A017' : '#C0392B' } as React.CSSProperties}
                onMouseEnter={() => handleInteraction(ann.id, ann.target)}
                onMouseLeave={handleLeave}
                onClick={() => handleInteraction(ann.id, ann.target)}
              >
                <p className="la-card-title">{ann.title}</p>
                <p className="la-card-desc">{ann.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}