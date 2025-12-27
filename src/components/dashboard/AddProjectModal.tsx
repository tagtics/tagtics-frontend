import { useState, useEffect } from 'react';
import { X, Globe, User, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectStore } from '@store/projectStore';
import { cn } from '@utils/cn';
import { Project } from '@store/projectStore';

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProjectCreated?: (project: Project) => void;
}

export function AddProjectModal({ isOpen, onClose, onProjectCreated }: AddProjectModalProps) {
    const addProject = useProjectStore((state) => state.addProject);

    const [formData, setFormData] = useState({
        name: '',
        url: '',
        devName: '',
        tier: 'pro' as const
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const validateUrl = (url: string): boolean => {
        if (!url) return false;
        return /^https?:\/\//.test(url);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.devName.trim()) newErrors.devName = 'Dev name is required';
        if (!validateUrl(formData.url)) newErrors.url = 'Valid URL required (https://...)';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newProject = addProject({
            ...formData,
            isLocal: false
        });

        if (onProjectCreated) onProjectCreated(newProject);

        // Reset
        setFormData({ name: '', url: '', devName: '', tier: 'pro' });
        setErrors({});
        onClose();
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-zoom-out"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="pointer-events-auto w-full max-w-[420px] bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Minimalism Header */}
                            <div className="px-6 pt-6 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                                    New Project
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">

                                {/* Project Name */}
                                <div className="group">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Tag className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            maxLength={30}
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            className={cn(
                                                "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all",
                                                errors.name
                                                    ? "border-red-500 focus:ring-red-500/20"
                                                    : "border-gray-200 dark:border-white/5 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/10 outline-none"
                                            )}
                                            placeholder="Project Name"
                                            autoFocus
                                        />
                                    </div>
                                    {errors.name && <p className="mt-1 text-[10px] text-red-500 font-medium pl-1">{errors.name}</p>}
                                </div>

                                {/* URL */}
                                <div className="group">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Globe className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            maxLength={100}
                                            value={formData.url}
                                            onChange={(e) => handleChange('url', e.target.value)}
                                            className={cn(
                                                "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all font-mono",
                                                errors.url
                                                    ? "border-red-500 focus:ring-red-500/20"
                                                    : "border-gray-200 dark:border-white/5 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/10 outline-none"
                                            )}
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                    {errors.url && <p className="mt-1 text-[10px] text-red-500 font-medium pl-1">{errors.url}</p>}
                                </div>

                                {/* Dev Name */}
                                <div className="group">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            maxLength={30}
                                            value={formData.devName}
                                            onChange={(e) => handleChange('devName', e.target.value)}
                                            className={cn(
                                                "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all",
                                                errors.devName
                                                    ? "border-red-500 focus:ring-red-500/20"
                                                    : "border-gray-200 dark:border-white/5 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/10 outline-none"
                                            )}
                                            placeholder="Developer Name"
                                        />
                                    </div>
                                    {errors.devName && <p className="mt-1 text-[10px] text-red-500 font-medium pl-1">{errors.devName}</p>}
                                </div>

                                {/* Actions */}
                                <div className="pt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-4 py-2.5 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl text-xs font-bold transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] px-4 py-2.5 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black rounded-xl text-xs font-bold transition-all shadow-lg shadow-gray-900/10 dark:shadow-white/5"
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
