import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../../store/projectStore';
import { ExternalLink, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { AddProjectModal } from '../../components/dashboard/AddProjectModal';

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
    const projects = useProjectStore((state) => state.projects);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Projects</h1>
                    <p className="text-gray-400">Manage your connected applications</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all shadow-lg shadow-white/10 text-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Project</span>
                </button>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                {projects.map((project) => (
                    <motion.div
                        variants={item}
                        key={project.id}
                        onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                        className="group cursor-pointer p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 text-blue-400 ring-1 ring-white/10">
                                <span className="text-lg font-bold">{project.name.charAt(0)}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{project.name}</h3>
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

            {/* Add Project Modal */}
            <AddProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
