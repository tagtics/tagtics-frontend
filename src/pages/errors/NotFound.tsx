import { useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '@components/home/AnimatedBackground';
import { Home, LayoutDashboard, Telescope } from 'lucide-react';
import SEO from '@components/common/SEO';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden font-space-grotesk">
            <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />

            {/* Background Reused from Home */}
            <AnimatedBackground />
            <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px] z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md shadow-2xl shadow-blue-500/10">
                    <Telescope className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>

                <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent mb-2">
                    404
                </h1>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Lost in Space?
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-10 leading-relaxed text-lg">
                    The page you're looking for seems to have drifted away into the void. Let's get you back to safety.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Go to Dashboard
                    </button>

                    <button
                        onClick={() => navigate('/')}
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
