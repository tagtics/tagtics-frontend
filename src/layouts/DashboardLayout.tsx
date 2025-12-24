import { useState } from 'react';
import { useOutlet } from 'react-router-dom';
import { Sidebar } from '@components/dashboard/Sidebar';
import { AnimatedBackground } from '@components/home/AnimatedBackground';
import { DashboardTransition } from '@components/layout/DashboardTransition';
import { cn } from '@utils/cn';

export function DashboardLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const outlet = useOutlet();

    return (
        <div className="flex min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative font-space-grotesk selection:bg-blue-500/30">
            {/* Background Reuse */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatedBackground />
                <div className="absolute inset-0 bg-white/60 dark:bg-black/70 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 flex flex-col w-full min-h-screen">
                {/* Mobile Top Navigation Bar */}
                <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 text-sm">T</div>
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Tagtics</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-1 lg:mt-0 mt-16"> {/* Add top margin on mobile for nav bar */}
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
                        <div className="p-4 md:p-6 pb-16 max-w-[1400px] mx-auto">
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
