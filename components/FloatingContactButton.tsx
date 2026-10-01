'use client';

import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after scrolling down a bit
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('enroll');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without causing a jump
      window.history.pushState(null, '', '#enroll');
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={handleClick}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-xl shadow-orange-500/20 transition-transform hover:scale-110 active:scale-95 group relative flex items-center justify-center"
        aria-label="Contact Us"
      >
        <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />
        
        <span className="absolute -top-12 right-0 bg-ink border border-orange-500/30 text-white text-xs font-serif tracking-wider uppercase px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          Contact Us
        </span>
      </button>
    </div>
  );
}
