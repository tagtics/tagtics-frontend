import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProjectStore, Project } from '@store/projectStore';
import { ExternalLink, Plus, FolderPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { AddProjectModal } from '@components/dashboard/AddProjectModal';
import { DashboardHeader } from '@components/common/DashboardHeader';
import SEO from '@components/common/SEO';
import { toast } from 'sonner';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Projects() {
    const navigate = useNavigate();
    const location = useLocation();
    const projects = useProjectStore((state) => state.projects);
    const deleteProject = useProjectStore((state) => state.deleteProject);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        if (location.state?.deleteProjectId) {
            deleteProject(location.state.deleteProjectId);
            toast.success("Project deleted successfully", { id: 'project-deleted' });
            // Clear state to prevent multiple deletes on refresh (though harmless as idempotent usually)
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, deleteProject, navigate, location.pathname]);

    const handleProjectCreated = (project: Project) => {
        setIsAddModalOpen(false); // Close add modal
        // Navigate to the new project's page
        navigate(`/dashboard/projects/${project.id}`);
    };

    return (
        <div className="space-y-6">
            <SEO title="Projects" description="Manage your Tagtics projects and integrations." />
            <DashboardHeader
                breadcrumbItems={[{ label: 'Dashboard', onClick: () => window.location.href = '/dashboard' }, { label: 'Projects', active: true }]}
                className="mb-0"
            >
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5 text-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden md:inline">New </span>Project
                </button>
            </DashboardHeader>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">Projects</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your connected applications</p>
                </div>
            </div>

            {projects.length === 0 ? (
                // Empty State
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 px-4 text-center"
                >
                    <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-gray-100 dark:border-white/10">
                        <FolderPlus className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                        Create your first project to start collecting feedback from your website visitors.
                    </p>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create First Project
                    </button>
                </motion.div>
            ) : (
                // Project Grid
                <motion.div
                    variants={container}
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    {projects.map((project) => (
                        <motion.div
                            variants={item}
                            key={project.id}
                            onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                            className="group cursor-pointer p-5 rounded-2xl border border-gray-100 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-purple-500/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/10 dark:ring-white/10">
                                    <span className="text-lg font-bold">{project.name.charAt(0)}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{project.name}</h3>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors relative z-10 flex items-center gap-1 line-clamp-1"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {project.url}
                                    <ExternalLink className="w-3 h-3 shrink-0" />
                                </a>
                            </div>

                            {/* Developer Info */}
                            <div className="mb-4 text-xs text-gray-400">
                                <span className="font-medium">Developer:</span> {project.devName}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'active' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-gray-500'}`}></span>
                                    <span className="text-xs text-gray-400 capitalize font-medium">{project.status}</span>
                                    {project.isLocal && (
                                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 font-medium flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse"></span>
                                            Testing{project.localPort ? `:${project.localPort}` : ''}
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-400">
                                    {project.feedbackCount}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Modals */}
            <AddProjectModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onProjectCreated={handleProjectCreated}
            />
        </div>
    );
}
