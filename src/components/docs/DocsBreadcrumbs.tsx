import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, ChevronRight } from 'lucide-react';

interface DocsBreadcrumbsProps {
    onMobileToggle: () => void;
}

const routeMap: Record<string, string> = {
    'docs': 'Docs',
    'overview': 'Overview',
    'intro': 'Introduction',
    'features': 'Features',
    'tech-stack': 'Tech Stack',
    'implementation': 'Implementations',
    'client-overview': 'Client Overview',
    'react': 'React / Next.js',
    'vue': 'Vue 3',
    'angular': 'Angular',
    'svelte': 'Svelte',
    'solid': 'Solid.js',
    'script': 'Vanilla JS',
};

export const DocsBreadcrumbs: React.FC<DocsBreadcrumbsProps> = ({ onMobileToggle }) => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    // Filter out 'docs' for cleaner breadcrumbs
    const meaningfulSegments = pathSegments.filter(seg => seg !== 'docs');

    return (
        <div className="lg:hidden sticky top-[64px] z-40 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 h-12 flex items-center gap-3">
            <button
                onClick={onMobileToggle}
                className="p-1 -ml-1 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                aria-label="Open Sidebar"
            >
                <Menu className="w-5 h-5" />
            </button>
            <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />
            <div className="flex items-center gap-1 text-sm overflow-hidden whitespace-nowrap mask-linear-fade">
                {meaningfulSegments.map((segment, index) => {
                    const title = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
                    const isLast = index === meaningfulSegments.length - 1;

                    return (
                        <React.Fragment key={segment}>
                            <span className={isLast ? "font-semibold text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
                                {title}
                            </span>
                            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
