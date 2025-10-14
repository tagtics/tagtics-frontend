import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const AnimatedBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadVanta = async () => {
      if (!isMounted || vantaEffect.current || !vantaRef.current) return;

      const GLOBE = (await import("vanta/dist/vanta.globe.min")).default;

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
        color: 0x8b5cf6,
        backgroundColor: 0x000000, // <-- black bg maintained
        size: 1.0,
      });
    };

    loadVanta();

    return () => {
      isMounted = false;
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
