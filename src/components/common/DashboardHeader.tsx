import Breadcrumbs from './Breadcrumbs';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../../utils/cn';

interface DashboardHeaderProps {
    className?: string;
    breadcrumbItems: { label: string; onClick?: () => void; active?: boolean }[];
    children?: React.ReactNode;
}

export function DashboardHeader({ className, breadcrumbItems, children }: DashboardHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between mb-2", className)}>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex items-center gap-3">
                <ThemeToggle />
                {children}
            </div>
        </div>
    );
}
