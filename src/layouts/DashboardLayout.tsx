import { useState } from 'react';
import { useOutlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@components/dashboard/Sidebar';
import { AnimatedBackground } from '@components/home/AnimatedBackground';
import { DashboardTransition } from '@components/layout/DashboardTransition';
import { cn } from '@utils/cn';

export function DashboardLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const outlet = useOutlet();
    const location = useLocation();
    const path = location.pathname;

    // Custom padding for mobile alignment
    const getMobilePadding = () => {
        // Tight padding for Overview and Settings to align with floating button
        if (path === '/dashboard' || path.includes('/dashboard/settings')) return 'pt-1';
        // More padding for Projects and Subscription
        if (path.includes('/dashboard/projects') || path.includes('/dashboard/subscription')) return 'pt-5';
        // Default
        return 'pt-3';
    };

    return (
        <div className="flex min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative font-space-grotesk selection:bg-blue-500/30">
            {/* Background Reuse */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatedBackground />
                <div className="absolute inset-0 bg-white/60 dark:bg-black/70 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 flex flex-col w-full min-h-screen">
                {/* Floating Mobile Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden fixed top-4 right-4 z-[60] p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-gray-900 dark:text-white shadow-lg"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex flex-1 lg:mt-0">
                    {/* Mobile Overlay - Click outside to close */}
                    {isMobileMenuOpen && (
                        <div
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    )}

                    {/* Sidebar - Right side on mobile, left side on desktop */}
                    <div className={cn(
                        "fixed inset-y-0 z-40 transition-transform duration-300",
                        // Mobile: right side, Desktop: left side  
                        "right-0 lg:right-auto lg:left-0",
                        // Desktop: always visible, relative positioning
                        "lg:relative lg:translate-x-0",
                        // Mobile: hide by default (slide right), show when menu open
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
                    )}>
                        <Sidebar
                            isCollapsed={isCollapsed}
                            onToggle={() => setIsCollapsed(!isCollapsed)}
                            onMobileClose={() => setIsMobileMenuOpen(false)}
                            isMobileMenuOpen={isMobileMenuOpen}
                        />
                    </div>

                    <main className="flex-1 relative transition-all duration-300 ease-in-out">
                        <div className={cn(
                            "px-4 pb-16 md:p-6 max-w-[1400px] mx-auto",
                            getMobilePadding()
                        )}>
                            <DashboardTransition>
                                {outlet}
                            </DashboardTransition>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
