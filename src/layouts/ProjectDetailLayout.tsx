import { Outlet, useParams, NavLink, useNavigate } from 'react-router-dom';
import { useProjectStore } from '@/store/projectStore';
import { ArrowLeft, MessageSquare, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';

export function ProjectDetailLayout() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const project = useProjectStore((state) => state.getProjectById(projectId!));

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
                    <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/dashboard/projects')}
                        className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    const navItems = [
        { icon: MessageSquare, label: 'Feedbacks', path: `/dashboard/projects/${projectId}`, end: true },
        { icon: BarChart3, label: 'Analytics', path: `/dashboard/projects/${projectId}/analytics`, end: false },
        { icon: Settings, label: 'Settings', path: `/dashboard/projects/${projectId}/settings`, end: false },
    ];

    return (
        <div className="space-y-4">

            {/* Header */}
            <div>
                <button
                    onClick={() => navigate('/dashboard/projects')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Projects</span>
                    <span className="sm:hidden">Back</span>
                </button>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 ring-1 ring-white/10 shrink-0">
                        <span className="text-lg sm:text-xl font-bold">{project.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{project.name}</h1>
                            {project.isLocal && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                    Testing Mode • Port {project.localPort || '3000'}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm truncate">{project.url}</p>
                    </div>
                </div>

                {/* Sub Navigation */}
                <div className="flex gap-1 border-b border-white/10 overflow-x-auto scrollbar-hide">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-2 px-3 sm:px-4 py-2 font-medium transition-all relative text-xs sm:text-sm whitespace-nowrap",
                                    isActive
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
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
