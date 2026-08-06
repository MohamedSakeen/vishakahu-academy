'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobilePhone, setIsMobilePhone] = useState(false);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);

  useEffect(() => {
    // Detect mobile phone user agent
    const checkMobilePhone = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobilePhone(isMobileUA);
    };

    checkMobilePhone();

    const handleMouseMove = (e: MouseEvent) => {
      setHasMouseMoved(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (!isMobilePhone && hasMouseMoved) {
      document.documentElement.classList.add('custom-cursor-active');
    } else {
      document.documentElement.classList.remove('custom-cursor-active');
    }
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isMobilePhone, hasMouseMoved]);

  // Hide on mobile phones or before mouse has moved
  if (isMobilePhone || !hasMouseMoved) return null;

  return (
    <>
      <style suppressHydrationWarning>{`
        html.custom-cursor-active,
        html.custom-cursor-active *,
        html.custom-cursor-active a,
        html.custom-cursor-active button,
        html.custom-cursor-active input {
          cursor: none !important;
        }
      `}</style>
      <div className="pointer-events-none z-[100]">
        <motion.div
          className="fixed top-0 left-0 w-4 h-4 rounded-full border border-gold pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.4 }}
        />
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-crimson pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(192,57,43,0.8)]"
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: isHovering ? 1.4 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.8 }}
        />
      </div>
    </>
  );
}



