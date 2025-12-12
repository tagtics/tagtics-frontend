import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectStore } from '../../store/projectStore';
import { cn } from '../../utils/cn';

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
    const addProject = useProjectStore((state) => state.addProject);

    const [formData, setFormData] = useState({
        name: '',
        url: '',
        devName: '',
        tier: 'pro' as const
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateUrl = (url: string): boolean => {
        if (!url) return false;
        // Accept any valid URL (localhost or production)
        return /^https?:\/\//.test(url);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required';
        }

        if (!formData.devName.trim()) {
            newErrors.devName = 'Developer name is required';
        }

        if (!validateUrl(formData.url)) {
            newErrors.url = 'Please enter a valid URL (e.g., https://example.com or http://localhost:3000)';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        addProject({
            ...formData,
            isLocal: false // Default to false, can be enabled later in settings
        });

        // Reset form
        setFormData({
            name: '',
            url: '',
            devName: '',
            tier: 'pro'
        });
        setErrors({});
        onClose();
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Add New Project</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Project Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Project Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className={cn(
                                            "w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 outline-none transition-all",
                                            errors.name ? "border-red-500" : "border-white/10 focus:border-blue-500"
                                        )}
                                        placeholder="My Awesome App"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                                    )}
                                </div>

                                {/* Website URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Website URL *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.url}
                                        onChange={(e) => handleChange('url', e.target.value)}
                                        className={cn(
                                            "w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 outline-none transition-all",
                                            errors.url ? "border-red-500" : "border-white/10 focus:border-blue-500"
                                        )}
                                        placeholder="https://example.com or http://localhost:3000"
                                    />
                                    {errors.url && (
                                        <p className="mt-1 text-sm text-red-400">{errors.url}</p>
                                    )}
                                </div>

                                {/* Developer Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Developer Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.devName}
                                        onChange={(e) => handleChange('devName', e.target.value)}
                                        className={cn(
                                            "w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 outline-none transition-all",
                                            errors.devName ? "border-red-500" : "border-white/10 focus:border-blue-500"
                                        )}
                                        placeholder="John Doe"
                                    />
                                    {errors.devName && (
                                        <p className="mt-1 text-sm text-red-400">{errors.devName}</p>
                                    )}
                                </div>



                                {/* Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-bold transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        Create Project
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
