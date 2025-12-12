import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectStore } from '../../store/projectStore';
import { Eye, EyeOff, RefreshCw, Trash2, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function ProjectSettings() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const project = useProjectStore((state) => state.getProjectById(projectId!));
    const updateProject = useProjectStore((state) => state.updateProject);
    const deleteProject = useProjectStore((state) => state.deleteProject);
    const regenerateApiKey = useProjectStore((state) => state.regenerateApiKey);

    const [formData, setFormData] = useState({
        name: '',
        url: '',
        localPort: '',
        devName: '',
        isLocal: false
    });

    const [showApiKey, setShowApiKey] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                url: project.url,
                localPort: project.localPort || '',
                devName: project.devName,
                isLocal: project.isLocal
            });
        }
    }, [project]);

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

    const handleSave = () => {
        updateProject(project.id, formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleRegenerate = () => {
        regenerateApiKey(project.id);
        setShowRegenerateConfirm(false);
        setShowApiKey(true);
    };

    const handleDelete = () => {
        deleteProject(project.id);
        navigate('/dashboard/projects');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(project.apiKey);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto w-full">
            {/* Left Column: Project Details Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md space-y-4"
            >
                <h2 className="text-base font-bold text-white mb-4">Project Details</h2>

                {/* Project Name */}
                <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Project Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 focus:border-blue-500 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-all"
                    />
                </div>

                {/* Website URL */}
                <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Website URL
                    </label>
                    <input
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 focus:border-blue-500 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-all"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">
                        Enter your production website URL
                    </p>
                </div>

                {/* Local Testing Configuration */}
                <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "w-2 h-2 rounded-full transition-colors",
                                formData.isLocal ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" : "bg-gray-500"
                            )}></div>
                            <label className="text-xs font-medium text-gray-300">
                                Local Testing Mode
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, isLocal: !formData.isLocal })}
                            className={cn(
                                "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                                formData.isLocal ? "bg-blue-600" : "bg-gray-600"
                            )}
                        >
                            <span
                                className={cn(
                                    "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                                    formData.isLocal ? "translate-x-5" : "translate-x-0.5"
                                )}
                            />
                        </button>
                    </div>

                    {formData.isLocal && (
                        <div className="space-y-2 pt-2 border-t border-white/10">
                            <label className="block text-xs font-medium text-gray-300">
                                Localhost Port
                            </label>
                            <input
                                type="text"
                                value={formData.localPort || ''}
                                onChange={(e) => setFormData({ ...formData, localPort: e.target.value })}
                                placeholder="3000"
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 focus:border-blue-500 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-all"
                            />
                            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <p className="text-[10px] text-blue-400 leading-relaxed">
                                    📍 Testing URL: <span className="font-mono">http://localhost:{formData.localPort || '3000'}</span>
                                </p>
                                <p className="text-[10px] text-gray-500 mt-1">
                                    Widget will load on localhost, but data comes from: {formData.url || 'production URL'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Developer Name */}
                <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Developer Name
                    </label>
                    <input
                        type="text"
                        value={formData.devName}
                        onChange={(e) => setFormData({ ...formData, devName: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 focus:border-blue-500 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-all"
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className={cn(
                        "w-full px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm",
                        isSaved
                            ? "bg-green-600 text-white"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20"
                    )}
                >
                    {isSaved ? (
                        <>✓ Saved</>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </>
                    )}
                </button>
            </motion.div>

            {/* Right Column: API Key & Danger Zone */}
            <div className="space-y-4">
                {/* API Key Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md space-y-4"
                >
                    <h2 className="text-base font-bold text-white mb-4">API Key</h2>

                    <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400 font-medium">Your API Key</span>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                    title={showApiKey ? "Hide API Key" : "Show API Key"}
                                >
                                    {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="px-2 py-1.5 rounded text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                        <code className="text-xs text-gray-300 font-mono break-all block">
                            {showApiKey ? project.apiKey : `${project.apiKey.slice(0, 8)}${'•'.repeat(24)}`}
                        </code>
                    </div>

                    {/* Regenerate API Key */}
                    {!showRegenerateConfirm ? (
                        <button
                            onClick={() => setShowRegenerateConfirm(true)}
                            className="w-full px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-lg text-orange-400 font-medium transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Regenerate API Key
                        </button>
                    ) : (
                        <div className="p-3 bg-orange-600/10 border border-orange-500/30 rounded-lg">
                            <p className="text-orange-400 text-xs mb-3">
                                ⚠️ This will invalidate your current API key. Are you sure?
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowRegenerateConfirm(false)}
                                    className="flex-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white text-xs transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRegenerate}
                                    className="flex-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-500 rounded text-white font-medium text-xs transition-all"
                                >
                                    Yes, Regenerate
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-5 rounded-2xl border border-red-500/30 bg-red-600/5 backdrop-blur-md space-y-4"
                >
                    <h2 className="text-base font-bold text-red-400 mb-4">Danger Zone</h2>

                    {!showDeleteConfirm ? (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 font-medium transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Project
                        </button>
                    ) : (
                        <div className="p-3 bg-red-600/10 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-xs mb-3">
                                ⚠️ This action cannot be undone. All feedback data will be lost.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white text-xs transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded text-white font-medium text-xs transition-all"
                                >
                                    Yes, Delete Forever
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
