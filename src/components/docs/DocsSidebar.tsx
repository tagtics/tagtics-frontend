import { Link } from 'react-router-dom';
import { PrefetchLink } from '@/components/common/PrefetchLink';
import { RouteLoaderKey } from '@/config/routeLoaders';
import { Layers, Box, Cpu, PanelLeftClose, PanelLeftOpen, X, Monitor } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

// Custom Framework Icons
const ReactIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.5">
            <ellipse rx="10" ry="4.5" transform="rotate(0 12 12)" cx="12" cy="12" />
            <ellipse rx="10" ry="4.5" transform="rotate(60 12 12)" cx="12" cy="12" />
            <ellipse rx="10" ry="4.5" transform="rotate(120 12 12)" cx="12" cy="12" />
        </g>
    </svg>
);

const VueIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 20.5L2 3.5h3l7 12 7-12h3L12 20.5z" fill="currentColor" />
        <path d="M12 14L6.5 4.5h3L12 9l2.5-4.5h3L12 14z" fill="currentColor" fillOpacity="0.5" />
    </svg>
);

const AngularIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 2L2 5.5l1.5 13L12 22l8.5-3.5 1.5-13L12 2zM12 4.5l5.5 12h-2l-1.5-3.5h-4L8.5 16.5h-2L12 4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const SvelteIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 15h-7c-1.1 0-2-.9-2-2s.9-2 2-2h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4v-2h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4c-1.1 0-2 .9-2 2s.9 2 2 2h4v2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SolidIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M15.5 4h-7A3.5 3.5 0 005 7.5v1A3.5 3.5 0 008.5 12H13a1 1 0 011 1v2a1 1 0 01-1 1H5m3.5 4h7A3.5 3.5 0 0019 16.5v-1A3.5 3.5 0 0015.5 11H11a1 1 0 01-1-1V8a1 1 0 011-1h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const JSIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 17c0-1.5.5-2.5 2-2.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13.5 17c1 0 1.5-.5 1.5-1.5s-1-1.5-1.5-1.5c-1 0-1.5.5-1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);


type SidebarItemType = {
    label: string;
    href?: string;
    icon?: any;
    items?: SidebarItemType[];
    prefetchKey?: RouteLoaderKey;
};

const docsLinks: { title: string; items: SidebarItemType[] }[] = [
    {
        title: 'Overview',
        items: [
            { label: 'Introduction', href: '/docs/overview/intro', icon: Layers, prefetchKey: 'DocsOverview' },
            { label: 'Features', href: '/docs/overview/features', icon: Box, prefetchKey: 'DocsOverview' },
            { label: 'Tech Stack', href: '/docs/overview/tech-stack', icon: Cpu, prefetchKey: 'DocsOverview' },
        ],
    },
    {
        title: 'Implementations',
        items: [
            { label: 'Client Overview', href: '/docs/implementation/overview', icon: Monitor, prefetchKey: 'DocsImplementation' },
            { label: 'React / Next.js', href: '/docs/implementation/react', icon: ReactIcon, prefetchKey: 'DocsImplementation' },
            { label: 'Vue 3', href: '/docs/implementation/vue', icon: VueIcon, prefetchKey: 'DocsImplementation' },
            { label: 'Angular', href: '/docs/implementation/angular', icon: AngularIcon, prefetchKey: 'DocsImplementation' },
            { label: 'Svelte', href: '/docs/implementation/svelte', icon: SvelteIcon, prefetchKey: 'DocsImplementation' },
            { label: 'Solid.js', href: '/docs/implementation/solid', icon: SolidIcon, prefetchKey: 'DocsImplementation' },
            { label: 'Vanilla JS / HTML', href: '/docs/implementation/script', icon: JSIcon, prefetchKey: 'DocsImplementation' },
        ],
    },
];

interface DocsSidebarProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
    onMobileClose?: () => void;
    isMobileMenuOpen?: boolean;
}

export function DocsSidebar({ isCollapsed = false, onToggle, onMobileClose, isMobileMenuOpen }: DocsSidebarProps) {
    return (
        <nav className={cn(
            "h-screen p-3 flex flex-col bg-white dark:bg-black/20 shadow-xl dark:shadow-none backdrop-blur-xl border-r border-gray-100 dark:border-white/5 transition-all duration-300 ease-in-out",
            isCollapsed ? "w-20" : "w-64"
        )}>
            {/* Brand & Toggle */}
            <div className={cn(
                "px-2 py-4 mb-4 flex transition-all duration-300",
                isCollapsed ? "flex-col items-center gap-3" : "flex-row items-center justify-between"
            )}>
                <Link
                    to="/"
                    className="flex items-center overflow-hidden hover:opacity-80 transition-opacity"
                    title="Go to Home"
                >
                    <div className="min-w-[32px] flex justify-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 text-sm">T</div>
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.h1
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-xl font-bold font-space-grotesk tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent ml-3 whitespace-nowrap"
                            >
                                Tagtics
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </Link>

                {/* Desktop: Collapse button, Mobile: Close button */}
                <button
                    onClick={() => {
                        if (isMobileMenuOpen && onMobileClose) {
                            onMobileClose();
                        } else if (onToggle) {
                            onToggle();
                        }
                    }}
                    className={cn(
                        "p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all hover:scale-110 active:scale-95",
                        isMobileMenuOpen ? "block lg:hidden" : "hidden lg:block"
                    )}
                    title={isMobileMenuOpen ? "Close Menu" : (isCollapsed ? "Expand Sidebar" : "Collapse Sidebar")}
                >
                    {isMobileMenuOpen ? (
                        <X className="w-4 h-4" />
                    ) : (
                        isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />
                    )}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                {docsLinks.map((section) => (
                    <div key={section.title} className={cn(isCollapsed ? "text-center" : "")}>
                        {!isCollapsed && (
                            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 animate-fade-in">
                                {section.title}
                            </h3>
                        )}
                        <ul className="space-y-1">
                            {section.items.map((item, index) => (
                                <SidebarItem
                                    key={index}
                                    item={item}
                                    isCollapsed={isCollapsed}
                                    onExpand={onToggle}
                                    onMobileClose={onMobileClose}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </nav>
    );
}

function SidebarItem({ item, isCollapsed, onExpand, onMobileClose }: { item: SidebarItemType, isCollapsed: boolean, onExpand?: () => void, onMobileClose?: () => void }) {
    const handleClick = () => {
        onMobileClose?.();
        if (isCollapsed) onExpand?.();
    };

    return (
        <li>
            <PrefetchLink
                to={item.href!}
                prefetchKey={item.prefetchKey}
                onClick={handleClick}
                className={({ isActive }) =>
                    clsx(
                        'group flex items-center gap-3 rounded-xl px-3 py-2 font-medium transition-colors',
                        isActive
                            ? 'bg-blue-50 dark:bg-white/10 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                        isCollapsed ? "justify-center px-1" : ""
                    )
                }
            >
                {item.icon && <item.icon className={clsx("h-5 w-5 shrink-0 transition-all", isCollapsed ? "mr-0" : "")} />}
                {!isCollapsed && <span>{item.label}</span>}
            </PrefetchLink>
        </li>
    );
}
