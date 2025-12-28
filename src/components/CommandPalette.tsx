import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Home, ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchStore } from '@/store/searchStore';

type RecentSearch = {
    id: string;
    label: string;
    path: string;
    type: 'home' | 'docs' | 'page';
};

export function CommandPalette() {
    const { isOpen: open, setOpen, toggle } = useSearchStore();
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

    useEffect(() => {
        // Load recent searches from localStorage
        const saved = localStorage.getItem('tagtics-recent-searches');
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse recent searches', e);
            }
        }
    }, []);

    const saveRecentSearch = (item: Omit<RecentSearch, 'id'>) => {
        const newSearch = { ...item, id: Math.random().toString(36).substring(7) };
        const updated = [newSearch, ...recentSearches.filter(r => r.path !== item.path)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('tagtics-recent-searches', JSON.stringify(updated));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('tagtics-recent-searches');
    };

    // Reconstruct actions based on stored data
    const getAction = (path: string) => () => navigate(path);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [toggle]);

    const runCommand = (command: () => void, item?: { label: string, path: string, type: 'home' | 'docs' | 'page' }) => {
        if (item) {
            saveRecentSearch(item);
        }
        setOpen(false);
        command();
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 dark:bg-black/80 dark:border-white/10"
                    >
                        <Command
                            label="Global Search"
                            className="w-full bg-transparent text-white"
                            shouldFilter={true}
                            loop
                        >
                            <div className="flex items-center border-b border-white/10 px-4">
                                <Search className="mr-2 h-5 w-5 shrink-0 text-white/50" />
                                <Command.Input
                                    autoFocus
                                    placeholder="Search documentation..."
                                    className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-white/40 text-white"
                                    onValueChange={setQuery}
                                />
                                <div className="flex items-center gap-1">
                                    <kbd className="hidden rounded bg-white/10 px-2 py-0.5 text-xs text-white/50 md:block">ESC</kbd>
                                </div>
                            </div>

                            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
                                {!query && (
                                    <>
                                        {recentSearches.length === 0 ? (
                                            <div className="py-12 text-center">
                                                <p className="text-sm text-white/40">No recent searches</p>
                                            </div>
                                        ) : (
                                            <Command.Group heading={
                                                <div className="flex items-center justify-between">
                                                    <span>Recent Searches</span>
                                                    <button onClick={(e) => { e.stopPropagation(); clearRecentSearches(); }} className="text-[10px] text-white/40 hover:text-white">Clear</button>
                                                </div>
                                            } className="px-2 py-1.5 text-xs font-medium text-white/40 mb-2">
                                                {recentSearches.map((item) => (
                                                    <Command.Item
                                                        key={item.id}
                                                        onSelect={() => runCommand(getAction(item.path))}
                                                        className="group flex cursor-pointer items-center rounded-lg px-2 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 aria-selected:bg-white/10"
                                                    >
                                                        <Clock className="mr-2 h-4 w-4 text-white/40 group-hover:text-blue-400" />
                                                        {item.label}
                                                    </Command.Item>
                                                ))}
                                            </Command.Group>
                                        )}
                                    </>
                                )}

                                {query && (
                                    <>
                                        <Command.Empty className="py-6 text-center text-sm text-white/40">
                                            No results found.
                                        </Command.Empty>

                                        <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-white/40 mb-2">
                                            <Command.Item
                                                onSelect={() => runCommand(() => navigate('/'), { label: 'Home', path: '/', type: 'home' })}
                                                className="group flex cursor-pointer items-center rounded-lg px-2 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 aria-selected:bg-white/10"
                                            >
                                                <Home className="mr-2 h-4 w-4 text-white/40 transition-colors group-hover:text-blue-400" />
                                                Home
                                                <ArrowRight className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Command.Item>
                                            <Command.Item
                                                onSelect={() => runCommand(() => navigate('/docs'), { label: 'Documentation Home', path: '/docs', type: 'docs' })}
                                                className="group flex cursor-pointer items-center rounded-lg px-2 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 aria-selected:bg-white/10"
                                            >
                                                <FileText className="mr-2 h-4 w-4 text-white/40 transition-colors group-hover:text-blue-400" />
                                                Documentation Home
                                                <ArrowRight className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Command.Item>
                                        </Command.Group>

                                        <Command.Group heading="Documentation" className="px-2 py-1.5 text-xs font-medium text-white/40 mb-2">
                                            <Command.Item
                                                onSelect={() => runCommand(() => navigate('/docs/overview'), { label: 'Overview', path: '/docs/overview', type: 'page' })}
                                                className="group flex cursor-pointer items-center rounded-lg px-2 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 aria-selected:bg-white/10"
                                            >
                                                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] text-white/60">1</div>
                                                Overview
                                                <ArrowRight className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Command.Item>
                                            <Command.Item
                                                onSelect={() => runCommand(() => navigate('/docs/implementation'), { label: 'Implementation Guides', path: '/docs/implementation', type: 'page' })}
                                                className="group flex cursor-pointer items-center rounded-lg px-2 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 aria-selected:bg-white/10"
                                            >
                                                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] text-white/60">2</div>
                                                Implementation Guides
                                                <ArrowRight className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Command.Item>
                                        </Command.Group>
                                    </>
                                )}
                            </Command.List>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
