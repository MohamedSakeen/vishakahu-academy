'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Classes', href: '/#classes' },
  { label: 'Journey', href: '/journey' },
  { label: 'Philosophy', href: '/#philosophy' },
  { label: 'Sensei', href: '/#sensei' },
  { label: 'Masters', href: '/#masters' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-white-off/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          {/* <div className="w-10 h-10 rounded-full bg-crimson flex flex-col items-center justify-center text-xs font-jp font-bold text-paper border-2 border-gold shadow-[0_0_15px_rgba(212,160,23,0.3)] transition-transform group-hover:scale-105">
             空手
          </div> */}
          <div className="flex flex-col">
            <h1 className="font-serif text-lg tracking-widest text-paper uppercase group-hover:text-gold transition-colors">
              Vishakahu
            </h1>
            <span className="text-[10px] tracking-[0.25em] text-white-off/60 uppercase">
              Academy
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label}
              href={link.href}
              className="text-sm font-serif tracking-widest uppercase text-white-off/80 hover:text-gold transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link 
            href="/#enroll" 
            className="px-6 py-2 bg-crimson text-white hover:bg-deep-red font-serif tracking-[0.2em] font-bold text-xs uppercase transition-colors interactive clip-elegant"
          >
            Enroll Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-paper relative z-50 p-2 interactive"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-ink/95 backdrop-blur-lg border-b border-white-off/10 py-6 px-6 flex flex-col gap-6 md:hidden shadow-2xl"
            >
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href}
                  className="text-lg font-serif tracking-widest uppercase text-paper hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/#enroll" 
                className="w-full text-center px-6 py-4 bg-crimson text-white font-serif tracking-[0.2em] font-bold text-xs uppercase mt-4 clip-elegant"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enroll Now
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
