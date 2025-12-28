import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
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

  return <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto md:min-w-[450px] max-w-7xl py-2 px-3 rounded-full backdrop-blur-md bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
    <div className="w-full flex justify-between items-center relative gap-2">
      <div className="text-xl md:text-2xl font-bold gradient-text pl-3 shrink-0 hover:brightness-125 transition-all duration-300">
        <a href="/">Tagtics</a>
      </div>

      <div className="flex items-center gap-2">
        {/* Desktop Menu - Right Aligned */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <nav className="flex items-center gap-1">
            <a href="/docs" className="text-sm font-medium text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300">
              Docs
            </a>
          </nav>
          <a
            href="/dashboard"
            className="px-5 py-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 transition-all duration-300 backdrop-blur-sm text-sm font-medium text-gray-900 dark:text-white shrink-0"
          >
            {isAuthenticated ? 'Dashboard' : 'Login'}
          </a>
        </div>

        {/* Mobile Toggle & Menu Button */}
        <div className="flex items-center gap-2 md:hidden pr-2">
          <ThemeToggle />
          <button aria-label="Navbar" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            {isMenuOpen ? <XIcon className="text-gray-900 dark:text-white" /> : <MenuIcon className="text-gray-900 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${isMenuOpen ? 'flex flex-col absolute top-full right-0 mt-4 w-64 bg-white/95 dark:bg-black/95 rounded-2xl border border-gray-200 dark:border-white/10 p-4 space-y-2 shadow-xl origin-top-right backdrop-blur-xl' : 'hidden'} md:hidden`}>
        <a
          href="/dashboard"
          className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 text-sm font-medium block w-full text-center text-gray-900 dark:text-white"
        >
          {isAuthenticated ? 'Dashboard' : 'Login'}
        </a>
        <a href="/docs" className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-5 py-3 rounded-xl transition-all duration-300 block text-center">
          Docs
        </a>
      </div>
    </div >
  </nav >;
};