import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import AOS from 'aos';
import { isAuthenticated } from '../utils/auth';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Reset menu when viewport changes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div className={`md:flex md:space-x-8 md:items-center ${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-black/90 p-6 space-y-4 space-x-0' : 'hidden'}`}>
        {/* Early Access with Elegant Glow for Dark UI */}

        <a
          href="/dashboard"
          className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 backdrop-blur-sm text-sm font-medium"
        >
          {isAuthenticated ? 'Dashboard' : 'Login'}
        </a>
        <a href="#demo-section" aria-label='Link to Demo Section' className="text-white/80 hover:text-white transition-colors duration-300" onClick={(e) => handleClick(e, '#demo-section')}>
          Demo
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