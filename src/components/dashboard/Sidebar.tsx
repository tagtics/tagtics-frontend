import { LayoutDashboard, FolderKanban, Settings, LogOut, PanelLeftClose, PanelLeft, X, CreditCard } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    onMobileClose?: () => void;
    isMobileMenuOpen?: boolean;
}

export function Sidebar({ isCollapsed, onToggle, onMobileClose, isMobileMenuOpen }: SidebarProps) {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: FolderKanban, label: 'Projects', path: '/dashboard/projects' },
        { icon: CreditCard, label: 'Subscription', path: '/dashboard/subscription' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <aside
            className={cn(
                "h-screen p-3 flex flex-col bg-white dark:bg-black/20 shadow-xl dark:shadow-none backdrop-blur-xl border-r border-gray-100 dark:border-white/5 transition-all duration-300 ease-in-out",
                isCollapsed ? "w-20" : "w-72"
            )}
        >
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
                        // On mobile, close the sidebar
                        if (isMobileMenuOpen && onMobileClose) {
                            onMobileClose();
                        } else {
                            // On desktop, toggle collapse
                            onToggle();
                        }
                    }}
                    className={cn(
                        "p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all hover:scale-110 active:scale-95",
                        // Show X on mobile when open, collapse button on desktop
                        isMobileMenuOpen ? "block lg:hidden" : "hidden lg:block"
                    )}
                    title={isMobileMenuOpen ? "Close Menu" : (isCollapsed ? "Expand Sidebar" : "Collapse Sidebar")}
                >
                    {isMobileMenuOpen ? (
                        <X className="w-4 h-4" />
                    ) : (
                        isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 mt-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        title={isCollapsed ? item.label : undefined}
                        onClick={() => onMobileClose?.()}
                        className={({ isActive }) =>
                            cn(
                                "relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group overflow-hidden",
                                isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                                isCollapsed ? "justify-center" : ""
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/5 rounded-xl shadow-sm dark:shadow-none"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <item.icon
                                    className={cn(
                                        "w-5 h-5 relative z-10 transition-colors duration-300 shrink-0",
                                        isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-blue-500 dark:group-hover:text-blue-300"
                                    )}
                                />

                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="font-medium relative z-10 whitespace-nowrap overflow-hidden"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto space-y-2 px-2 pb-4">
                <button
                    className={cn(
                        "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all group overflow-hidden",
                        isCollapsed ? "justify-center px-2" : ""
                    )}
                    title={isCollapsed ? "Sign Out" : undefined}
                >
                    <LogOut className="w-5 h-5 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors shrink-0" />
                    {!isCollapsed && <span className="font-medium whitespace-nowrap">Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}

