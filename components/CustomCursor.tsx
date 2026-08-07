'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobilePhone, setIsMobilePhone] = useState(false);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for instant hardware-accelerated positioning without React re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-stiffness, low-mass spring for smooth, responsive outer ring trailing
  const ringX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.15 });
  const ringY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.15 });

  useEffect(() => {
    // Detect touch device or mobile user agent
    const checkMobilePhone = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTouchOnly = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
      setIsMobilePhone(isMobileUA || isTouchOnly);
    };

    checkMobilePhone();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasMouseMoved) setHasMouseMoved(true);
      if (!isVisible) setIsVisible(true);
      if (!document.documentElement.classList.contains('custom-cursor-active')) {
        document.documentElement.classList.add('custom-cursor-active');
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = Boolean(
        target.closest('a, button, .interactive, input, textarea, select, [role="button"]')
      );
      setIsHovering((prev) => (prev !== interactive ? interactive : prev));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleWindowBlur = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [mouseX, mouseY, hasMouseMoved, isVisible]);

  useEffect(() => {
    if (!isMobilePhone && hasMouseMoved && isVisible) {
      document.documentElement.classList.add('custom-cursor-active');
    } else {
      document.documentElement.classList.remove('custom-cursor-active');
    }
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isMobilePhone, hasMouseMoved, isVisible]);

  // Hide on mobile devices or before mouse move
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
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden z-[9999] transition-opacity duration-150"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {/* Outer Ring - Follows with smooth, responsive spring physics */}
        <motion.div
          className="fixed top-0 left-0 w-5 h-5 rounded-full border border-gold pointer-events-none z-[9999]"
          style={{
            x: ringX,
            y: ringY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovering ? 1.6 : 1,
            opacity: isHovering ? 0.35 : 0.85,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />

        {/* Inner Dot - Instant, zero-lag positioning directly tracking mouse coordinates */}
        <motion.div
          className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-crimson pointer-events-none z-[9999] shadow-[0_0_10px_rgba(192,57,43,0.9)]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </div>
    </>
  );
}




