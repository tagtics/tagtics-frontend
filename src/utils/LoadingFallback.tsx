import NProgress from 'nprogress';
import React, { useEffect } from 'react';

export const LoadingFallback: React.FC = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-t-transparent border-purple-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
        {/* Subtle text with pulse animation */}
        <p className="text-white text-lg font-semibold animate-pulse">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}