import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const scrollToTop = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (start <= 0) return;

    // Temporarily set scrollBehavior to auto so RAF ticks don't conflict with CSS smooth scroll
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    // Tailored duration (750ms - 1100ms) for a silky, calm glide
    const duration = Math.min(Math.max(start * 0.12, 750), 1100);
    let startTime = null;
    let isCancelled = false;

    const stopAnimation = () => {
      isCancelled = true;
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
      window.removeEventListener('wheel', stopAnimation);
      window.removeEventListener('touchmove', stopAnimation);
    };

    window.addEventListener('wheel', stopAnimation, { passive: true, once: true });
    window.addEventListener('touchmove', stopAnimation, { passive: true, once: true });

    // Buttery ease-in-out cubic curve
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime) => {
      if (isCancelled) return;
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      const targetY = Math.round(start * (1 - easedProgress));
      window.scrollTo(0, targetY);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animateScroll);
      } else {
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
        window.removeEventListener('wheel', stopAnimation);
        window.removeEventListener('touchmove', stopAnimation);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animateScroll);
  };

  return (
    <button
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
