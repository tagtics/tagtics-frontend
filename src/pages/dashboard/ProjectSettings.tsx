import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectStore } from '@store/projectStore';
import { Eye, EyeOff, RefreshCw, Trash2, Save, Check, Copy, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';
import SEO from '@components/common/SEO';

import { toast } from 'sonner';

export default function ProjectSettings() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const project = useProjectStore((state) => state.getProjectById(projectId!));
    const updateProject = useProjectStore((state) => state.updateProject);
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
    const [hasCopied, setHasCopied] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                url: project.url,
                localPort: project.localPort || '',
                devName: project.devName,
                isLocal: project.isLocal
            });
            // Clear errors when project changes/resets
            setErrors({});
        }
    }, [project]);

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/dashboard/projects')}
                        className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required';
        }

        if (!formData.devName.trim()) {
            newErrors.devName = 'Developer name is required';
        }

        if (formData.isLocal && formData.localPort) {
            if (!/^\d+$/.test(formData.localPort)) {
                newErrors.localPort = 'Port must be a number';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        updateProject(project.id, formData);
        toast.success("Project updated successfully");
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleRegenerate = () => {
        regenerateApiKey(project.id);
        toast.success("API Key regenerated");
        setShowRegenerateConfirm(false);
        setShowApiKey(true);
    };

    const handleDelete = () => {
        // Navigate to projects page and trigger delete there to avoid race conditions/blank screens
        navigate('/dashboard/projects', {
            replace: true,
            state: { deleteProjectId: project.id }
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(project.apiKey);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for field
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto w-full">
            <SEO title="Project Settings" description="Manage project details and API keys." />
            {/* Left Column: Project Details Form */}
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md space-y-3"
            >
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Project Details</h2>

                {/* Project Name */}
                <div>
                    <div className="flex justify-between mb-1.5">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                            Project Name
                        </label>
                        <span className="text-[10px] text-gray-500">
                            {formData.name.length}/30
                        </span>
                    </div>
                    <input
                        type="text"
                        maxLength={30}
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={cn(
                            "w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all",
                            errors.name ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-blue-500"
                        )}
                    />
                    {errors.name && (
                        <p className="mt-1 text-[10px] text-red-400">{errors.name}</p>
                    )}
                </div>

                {/* Website URL */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                            Website URL
                        </label>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Read-only
                        </span>
                    </div>
                    <input
                        type="text"
                        value={formData.url}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-lg text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none font-mono"
                    />
                </div>

                {/* Local Testing Configuration */}
                <div className="space-y-2 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "w-2 h-2 rounded-full transition-colors",
                                formData.isLocal ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" : "bg-gray-400 dark:bg-gray-500"
                            )}></div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                Local Testing Mode
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleChange('isLocal', !formData.isLocal)}
                            className={cn(
                                "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                                formData.isLocal ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
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
                        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-white/10">
                            <div className="flex justify-between mb-1">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                                    Localhost Port
                                </label>
                                <span className="text-[10px] text-gray-500">
                                    {formData.localPort.length}/5
                                </span >
                            </div>
                            <input
                                type="text"
                                maxLength={5}
                                value={formData.localPort || ''}
                                onChange={(e) => handleChange('localPort', e.target.value)}
                                placeholder="3000"
                                className={cn(
                                    "w-full px-3 py-2 bg-white dark:bg-white/5 border rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all",
                                    errors.localPort ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-blue-500"
                                )}
                            />
                            {errors.localPort && (
                                <p className="text-[10px] text-red-400">{errors.localPort}</p>
                            )}
                            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-lg">
                                <p className="text-[10px] text-blue-600 dark:text-blue-400 leading-relaxed">
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
                    <div className="flex justify-between mb-1.5">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Developer Name
                        </label>
                        <span className="text-[10px] text-gray-500">
                            {formData.devName.length}/30
                        </span>
                    </div>
                    <input
                        type="text"
                        maxLength={30}
                        value={formData.devName}
                        onChange={(e) => handleChange('devName', e.target.value)}
                        className={cn(
                            "w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all",
                            errors.devName ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-blue-500"
                        )}
                    />
                    {errors.devName && (
                        <p className="mt-1 text-[10px] text-red-400">{errors.devName}</p>
                    )}
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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-5 rounded-2xl border border-gray-100 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md space-y-4"
                >
                    <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">API Key</h2>

                    <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Your API Key</span>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="p-1.5 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 transition-all"
                                    title={showApiKey ? "Hide API Key" : "Show API Key"}
                                >
                                    {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className={cn(
                                        "px-2 py-1.5 rounded text-xs transition-all flex items-center gap-1.5 font-medium",
                                        hasCopied
                                            ? "text-green-400 bg-green-400/10"
                                            : "text-gray-400 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {hasCopied ? (
                                        <>
                                            <Check className="w-3 h-3" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <code className="text-xs text-gray-600 dark:text-gray-300 font-mono break-all block">
                            {showApiKey ? project.apiKey : `${project.apiKey.slice(0, 8)}${'•'.repeat(24)}`}
                        </code>
                    </div>

                    {/* Regenerate API Key */}
                    {!showRegenerateConfirm ? (
                        <button
                            onClick={() => setShowRegenerateConfirm(true)}
                            className="w-full px-4 py-2 bg-orange-50 dark:bg-orange-600/20 hover:bg-orange-100 dark:hover:bg-orange-600/30 border border-orange-200 dark:border-orange-500/30 rounded-lg text-orange-600 dark:text-orange-400 font-bold transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Regenerate API Key
                        </button>
                    ) : (
                        <div className="p-3 bg-orange-50 dark:bg-orange-600/10 border border-orange-200 dark:border-orange-500/30 rounded-lg">
                            <p className="text-orange-800 dark:text-orange-400 text-xs mb-3 font-medium">
                                ⚠️ This will invalidate your current API key. Are you sure?
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowRegenerateConfirm(false)}
                                    className="flex-1 px-3 py-1.5 bg-white hover:bg-orange-50 dark:bg-white/5 dark:hover:bg-white/10 border border-orange-200 dark:border-white/10 rounded text-gray-700 dark:text-white text-xs font-medium transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRegenerate}
                                    className="flex-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-500 rounded text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
                                >
                                    Yes, Regenerate
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-5 rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-900/10 backdrop-blur-md space-y-4"
                >
                    <h2 className="text-base font-bold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>

                    {!showDeleteConfirm ? (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full px-4 py-2 bg-white dark:bg-red-600/20 hover:bg-red-50 dark:hover:bg-red-600/30 border border-red-200 dark:border-red-500/30 rounded-lg text-red-600 dark:text-red-400 font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Project
                        </button>
                    ) : (
                        <div className="p-3 bg-red-100/50 dark:bg-red-600/10 border border-red-200 dark:border-red-500/30 rounded-lg">
                            <p className="text-red-600 dark:text-red-400 text-xs mb-3 font-medium">
                                ⚠️ This action cannot be undone. All feedback data will be lost.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-3 py-1.5 bg-white hover:bg-red-50 dark:bg-white/5 dark:hover:bg-white/10 border border-red-200 dark:border-white/10 rounded text-gray-700 dark:text-white text-xs font-medium transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded text-white font-bold text-xs transition-all shadow-md shadow-red-500/20"
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
