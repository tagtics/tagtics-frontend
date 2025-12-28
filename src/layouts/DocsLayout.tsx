
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DocsNavbar } from '@/components/docs/DocsNavbar';
import { CommandPalette } from '@/components/CommandPalette';
import { AnimatedBackground } from '@/components/home/AnimatedBackground';
import Snowfall from 'react-snowfall';
import { useEffect, useState } from 'react';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocsBreadcrumbs } from '@/components/docs/DocsBreadcrumbs';

export function DocsLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Theme check logic
    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkTheme();
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    checkTheme();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative font-space-grotesk selection:bg-blue-500/30">
            {/* Background Re-used */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatedBackground />
                <div className="absolute inset-0 bg-white/60 dark:bg-black/70 backdrop-blur-[2px]"></div>
                <Snowfall
                    color={isDark ? "white" : "#111827"}
                    snowflakeCount={50}
                    style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: 1 }}
                />
            </div>

            <CommandPalette />

            <div className="relative z-10 flex w-full min-h-screen">
                {/* Mobile Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Sidebar Container */}
                <div className={`
                    fixed inset-y-0 z-[60] transition-transform duration-300
                    left-0 lg:sticky lg:top-0 lg:h-screen
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}>
                    <DocsSidebar
                        isCollapsed={isCollapsed}
                        onToggle={() => setIsCollapsed(!isCollapsed)}
                        onMobileClose={() => setIsMobileMenuOpen(false)}
                        isMobileMenuOpen={isMobileMenuOpen}
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
                    <DocsNavbar />
                    <DocsBreadcrumbs onMobileToggle={() => setIsMobileMenuOpen(true)} />

                    <main className="flex-1 flex flex-col overflow-y-auto w-full h-full custom-scrollbar">
                        <div className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={location.pathname}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none prose dark:prose-invert max-w-none min-h-[calc(100vh-200px)]"
                                >
                                    <Outlet />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
