import React from 'react';
import { Github, Linkedin, XIcon } from 'lucide-react';
export const Footer: React.FC = () => {
  return <footer className="py-12 border-t border-gray-200 dark:border-white/10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl md:text-2xl font-bold gradient-text mb-6 md:mb-0">
          Tagtics
        </div>
        <div className="flex space-x-6">
          <a href="https://x.com/tagticsdev" aria-label='Link to X' target="_blank" rel="noreferrer" className="text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
            <XIcon className="w-6 h-6" />
          </a>
          <a href="https://github.com/tagtics" aria-label='Link to Github' target="_blank" rel="noreferrer" className="text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/tagtics-dev-111b7b385" aria-label='Link to LinkedIn' target="_blank" rel="noreferrer" className="text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 dark:text-white/60 text-sm">
        &copy; 2025 Tagtics. All rights reserved.
      </div>
    </div>
  </footer>;
};