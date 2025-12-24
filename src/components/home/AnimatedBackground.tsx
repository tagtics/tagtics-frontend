import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const AnimatedBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initVanta = async () => {
      if (!isMounted || !vantaRef.current) return;

      const isDark = document.documentElement.classList.contains('dark');
      const GLOBE = (await import("vanta/dist/vanta.globe.min")).default;

      // Destroy previous instance if exists
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }

      vantaEffect.current = GLOBE({
        el: vantaRef.current as HTMLElement,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: isDark ? 0xffffff : 0x000000,
        color2: isDark ? 0xffffff : 0x000000,
        backgroundColor: isDark ? 0x000000 : 0xffffff,
        size: 1.0,
      });
    };

    initVanta();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          initVanta();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      isMounted = false;
      observer.disconnect();
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0" // no negative z-index!
    />
  );
};
