import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import AOS from 'aos';
import { isAuthenticated } from '@utils/auth';
import { ThemeToggle } from '@common/ThemeToggle';

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

  return <nav className="fixed w-full z-50 py-4 px-6 backdrop-blur-md bg-white/50 dark:bg-black/50 border-b border-gray-200 dark:border-white/10">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="text-xl md:text-2xl font-bold gradient-text">
        Tagtics
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <div className={`md:flex md:space-x-8 md:items-center ${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white/95 dark:bg-black/90 p-6 space-y-4 space-x-0 border-b border-gray-200 dark:border-white/10 shadow-lg' : 'hidden'}`}>
          <a
            href="/dashboard"
            className="px-5 py-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 transition-all duration-300 backdrop-blur-sm text-sm font-medium block w-fit text-gray-900 dark:text-white"
          >
            {isAuthenticated ? 'Dashboard' : 'Login'}
          </a>
          <a href="#demo-section" aria-label='Link to Demo Section' className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 block" onClick={(e) => handleClick(e, '#demo-section')}>
            Demo
          </a>
          <a href="#features" aria-label='Link to Features Section' className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 block" onClick={(e) => handleClick(e, '#features')}>
            Features
          </a>
          <a href="#how-it-works" aria-label='Link to How it Works Section' className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 block" onClick={(e) => handleClick(e, '#how-it-works')}>
            How It Works
          </a>
        </div>
      </div>
      <button aria-label="Navbar" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <XIcon className="text-gray-900 dark:text-white" /> : <MenuIcon className="text-gray-900 dark:text-white" />}
      </button>
    </div >
  </nav >;
};