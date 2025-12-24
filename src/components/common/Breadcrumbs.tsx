import { cn } from '@/utils/cn';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
    active?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">

                {items.map((item, index) => (
                    <li key={item.label} className="flex items-center">
                        {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600 mx-2" />}
                        {item.onClick ? (
                            <button
                                onClick={item.onClick}
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span
                                className={cn(
                                    "text-sm font-medium",
                                    item.active ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                                )}
                            >
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
