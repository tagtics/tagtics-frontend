import { useState } from 'react';
import { User, Lock, Trash2, X, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { DashboardHeader } from '@components/common/DashboardHeader';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@components/common/SEO';

export default function Settings() {
    const breadcrumbItems = [
        { label: 'Dashboard', onClick: () => window.location.href = '/dashboard' },
        { label: 'Settings', active: true }
    ];

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col space-y-4">
            <SEO title="Settings" description="Manage your account settings and preferences." />
            <h1 className="sr-only">Account Settings</h1>
            <DashboardHeader breadcrumbItems={breadcrumbItems} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                {/* Account Section - Compact & Light Mode */}
                <div className="h-fit p-5 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <User className="w-4 h-4" />
                        </div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Account Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">Full Name</label>
                            <input
                                type="text"
                                defaultValue="Rishi RJ"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">Email Address (Read-only)</label>
                            <input
                                type="email"
                                value="rishi@tagtics.online"
                                readOnly
                                className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed select-none"
                            />
                            <p className="text-[10px] text-gray-500 dark:text-gray-500 ml-1">Contact support to change email associated with billing.</p>
                        </div>
                    </div>
                </div>

                {/* Security & Danger Zone - Stacked */}
                <div className="space-y-6 flex flex-col h-fit">
                    {/* Security */}
                    <div className="h-fit p-5 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                                <Lock className="w-4 h-4" />
                            </div>
                            <h2 className="text-base font-bold text-gray-900 dark:text-white">Security</h2>
                        </div>

                        <div>
                            <button
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white transition-all text-sm font-medium flex items-center justify-center gap-2"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="h-fit p-5 rounded-2xl border border-red-100 dark:border-red-500/10 bg-red-50/50 dark:bg-red-500/5 shadow-sm dark:shadow-none backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-500 dark:text-red-400">
                                <Trash2 className="w-4 h-4" />
                            </div>
                            <h2 className="text-base font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Permanently delete your account and all data.
                            </div>
                            <button className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-500/10 hover:bg-red-200 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 transition-all text-xs font-bold whitespace-nowrap">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            <AnimatePresence>
                {isPasswordModalOpen && (
                    <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}

function PasswordModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<'details' | 'otp'>('details');
    // Mock state
    const [showPw, setShowPw] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h3>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {step === 'details' ? (
                        <>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">Current Password</label>
                                    <input type="password" className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-purple-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">New Password</label>
                                    <div className="relative">
                                        <input type={showPw ? "text" : "password"} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-purple-500" />
                                        <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">Confirm New Password</label>
                                    <input type="password" className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-purple-500" />
                                </div>
                            </div>
                            <button
                                onClick={() => setStep('otp')}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity mt-2"
                            >
                                Continue to Verification
                            </button>
                        </>
                    ) : (
                        <div className="space-y-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 mb-2">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-gray-900 dark:text-white font-bold mb-1">Enter Verification Code</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">We sent a 6-digit code to rishi@tagtics.online</p>
                            </div>

                            <div className="flex gap-2 justify-center">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <input key={i} type="text" maxLength={1} className="w-10 h-12 rounded-lg bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-center text-xl font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none" />
                                ))}
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:opacity-90 transition-opacity"
                            >
                                Verify & Change Password
                            </button>
                            <button onClick={() => setStep('details')} className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white">Back</button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
