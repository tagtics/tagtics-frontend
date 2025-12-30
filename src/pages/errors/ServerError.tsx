import { useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, ServerCrash, ChevronDown, ChevronUp, Terminal, RotateCw } from 'lucide-react';
import SEO from '@components/common/SEO';
import { useState } from 'react';

interface ServerErrorProps {
    error?: Error | null;
    resetError?: () => void;
}

export default function ServerError({ error, resetError }: ServerErrorProps) {
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden font-space-grotesk p-4">
            <SEO title="500 - Server Error" description="Something went wrong on our end." />

            {/* Background Reused from Home - Removed for stability in ErrorBoundary */}

            <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px] z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-3xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md shadow-2xl shadow-red-500/10">
                    <ServerCrash className="w-12 h-12 text-red-600 dark:text-red-400" />
                </div>

                <h1 className="text-8xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-500 bg-clip-text text-transparent mb-2">
                    500
                </h1>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {error?.message || "Internal Server Error"}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg max-w-lg">
                    Something went wrong on our end. We're working to fix it. Please try again later.
                </p>

                {error && (
                    <div className="w-full mb-8 text-left">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mx-auto mb-4"
                        >
                            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {showDetails ? 'Hide Error Details' : 'View Error Details'}
                        </button>

                        {showDetails && (
                            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 rounded-xl p-4 overflow-x-auto text-sm font-mono text-gray-700 dark:text-gray-300">
                                <div className="flex items-center gap-2 text-red-500 dark:text-red-400 mb-2 font-bold">
                                    <Terminal className="w-4 h-4" />
                                    Error Stack Trace
                                </div>
                                <pre className="whitespace-pre-wrap break-all">
                                    {error.stack}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                    {resetError && (
                        <button
                            onClick={resetError}
                            className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 group"
                        >
                            <RotateCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                            Try Again
                        </button>
                    )}

                    <button
                        onClick={() => {
                            if (resetError) resetError();
                            navigate('/dashboard');
                        }}
                        className={`px-8 py-3.5 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${!resetError ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white border-none shadow-lg shadow-red-500/25' : ''}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Go to Dashboard
                    </button>

                    <button
                        onClick={() => {
                            if (resetError) resetError();
                            navigate('/');
                        }}
                        className="px-8 py-3.5 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Take Me Home
                    </button>
                </div>
            </div>

            {/* Decorative Overlay elements */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none"></div>
        </div>
    );
}
