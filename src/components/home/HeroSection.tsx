import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
          Ready to streamline your <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
            feedback workflow?
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of developers building better products with Tagtics.
          Start your journey today.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-transparent dark:to-transparent dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
        >
          <span className="relative z-10">{isAuthenticated ? 'Go to Dashboard' : 'Get Started'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}