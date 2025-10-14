import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import AOS from 'aos';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    AOS.refresh();
    const el = document.querySelector(hash) as HTMLElement | null;
    if (el) {
      const originalTransform = el.style.transform;
      el.style.transform = 'none';

      const finalTop = el.offsetTop;

      el.style.transform = originalTransform;

      window.scrollTo({
        top: finalTop,
        behavior: 'smooth'
      });
      setTimeout(() => AOS.refreshHard(), 600);
    }
  };

  return <nav className="fixed w-full z-50 py-4 px-6 backdrop-blur-md bg-black/50 border-b border-white/10">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="text-xl md:text-2xl font-bold gradient-text">
        Tagtics
      </div>
      <div className={`md:flex space-x-8 ${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-black/90 p-6 space-y-4 space-x-0' : 'hidden'}`}>
        <a href="#demo-section" aria-label='Link to Early Access Section' className="text-white/80 hover:text-white transition-colors duration-300" onClick={(e) => handleClick(e, '#demo-section')}>
          Demo
        </a>
                {/* Early Access with Elegant Glow for Dark UI */}
        <a
          href="#early-access"
          onClick={(e) => handleClick(e, '#early-access')}
          className="relative flex items-center gap-2 font-semibold transition-all duration-300 hover:scale-[1.05] group"
        >
          <span className="relative">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,200,100,0.4)]">
              Early Access
            </span>
            {/* Animated underline glow */}
            <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-full shadow-[0_0_8px_rgba(255,180,100,0.6)] transition-all duration-500 group-hover:w-full"></span>
          </span>

          {/* Soft glowing pulse orb */}
          <span className="relative w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 shadow-[0_0_8px_rgba(255,180,100,0.8)] animate-pulse-slow after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-br after:from-yellow-400/40 after:to-pink-500/40 after:blur-md after:animate-ping-slow"></span>
        </a>

        <a href="#features" aria-label='Link to Features Section' className="text-white/80 hover:text-white transition-colors duration-300" onClick={(e) => handleClick(e, '#features')}>
          Features
        </a>
        <a href="#how-it-works" aria-label='Link to How it Works Section' className="text-white/80 hover:text-white transition-colors duration-300" onClick={(e) => handleClick(e, '#how-it-works')}>
          How It Works
        </a>
      </div>
      <button aria-label="Navbar" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <XIcon className="text-white" /> : <MenuIcon className="text-white" />}
      </button>
    </div>
  </nav>;
};