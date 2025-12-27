import { useEffect } from 'react';
import { toast } from 'sonner';
import { Outlet, useParams, NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useProjectStore } from '@/store/projectStore';
import { MessageSquare, BarChart3, Settings } from 'lucide-react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { cn } from '@/utils/cn';

export function ProjectDetailLayout() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const project = useProjectStore((state) => state.getProjectById(projectId!));

    useEffect(() => {
        if (!project) {
            toast.error("Project not found. It may have been deleted.", {
                id: 'project-not-found'
            });
            navigate('/dashboard/projects', { replace: true });
        }
    }, [project, navigate]);

    if (!project) return null;

    const navItems = [
        { icon: MessageSquare, label: 'Feedbacks', path: `/dashboard/projects/${projectId}`, end: true },
        { icon: BarChart3, label: 'Analytics', path: `/dashboard/projects/${projectId}/analytics`, end: false },
        { icon: Settings, label: 'Settings', path: `/dashboard/projects/${projectId}/settings`, end: false },
    ];

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedComponent = searchParams.get('component');

    const breadcrumbItems: { label: string; onClick?: () => void; active?: boolean }[] = [
        { label: 'Projects', onClick: () => navigate('/dashboard/projects') },
        { label: project.name, onClick: () => navigate(`/dashboard/projects/${projectId}`) },
    ];

    // Determine current view
    if (location.pathname.endsWith('/settings')) {
        breadcrumbItems.push({ label: 'Settings', active: true });
    } else if (location.pathname.endsWith('/analytics')) {
        breadcrumbItems.push({ label: 'Analytics', active: true });
    } else {
        // Feedbacks view (default)
        if (selectedComponent) {
            breadcrumbItems.push({
                label: 'Feedbacks',
                onClick: () => setSearchParams({}) // Clear component param
            });
            breadcrumbItems.push({ label: selectedComponent, active: true });
        } else {
            breadcrumbItems.push({ label: 'Feedbacks', active: true });
        }
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <DashboardHeader breadcrumbItems={breadcrumbItems} className="mb-4" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-purple-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/10 dark:ring-white/10 shrink-0">
                        <span className="text-lg sm:text-xl font-bold">{project.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{project.name}</h1>
                            {project.isLocal && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/40 text-xs font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
                                    Local • Port : {project.localPort || '3000'}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm truncate">{project.url}</p>
                    </div>
                </div>

                {/* Sub Navigation */}
                <div className="flex gap-1 border-b border-gray-200 dark:border-white/10 overflow-x-auto scrollbar-hide">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-2 px-3 sm:px-4 py-2 font-medium transition-all relative text-xs sm:text-sm whitespace-nowrap",
                                    isActive
                                        ? "text-gray-900 dark:text-white"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className="w-4 h-4 shrink-0" />
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div>
                <Outlet />
            </div>
        </div>
    );
}
