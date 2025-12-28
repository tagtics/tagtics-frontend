import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon, Search } from 'lucide-react';
import { ThemeToggle } from '@common/ThemeToggle';
import { Link } from 'react-router-dom';
import { useSearchStore } from '@/store/searchStore';

export const DocsNavbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setOpen } = useSearchStore();

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

    const openSearch = () => {
        setOpen(true);
    };

    return <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Docs</span>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Button */}
                <button
                    onClick={openSearch}
                    className="flex w-full md:w-64 items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 transition-colors hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/20"
                >
                    <Search className="h-4 w-4" />
                    <span className="flex-1 text-left">Search...</span>
                    <kbd className="hidden rounded border border-gray-200 bg-white px-1.5 text-[10px] font-medium text-gray-400 dark:border-white/10 dark:bg-black md:inline-block">
                        Ctrl K
                    </kbd>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        Back to App
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button aria-label="Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <XIcon className="h-5 w-5 text-gray-900 dark:text-white" /> : <MenuIcon className="h-5 w-5 text-gray-900 dark:text-white" />}
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
            <div className="border-t border-gray-200 bg-white dark:border-white/10 dark:bg-black md:hidden">
                <div className="space-y-1 px-4 py-4">
                    <Link
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                    >
                        Back to App
                    </Link>
                </div>
            </div>
        )}
    </nav>;
};
