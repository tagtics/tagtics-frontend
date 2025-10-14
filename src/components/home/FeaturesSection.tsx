import React from 'react';
import { Target, Zap, TrendingUp } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Feedback Made Powerful
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Traditional feedback methods leave you guessing. Tagtics gives you
            pixel-perfect precision.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 md:p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white mb-6">
              <Target className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Element-Level Feedback
            </h3>
            <p className="text-white/80">
              Users can pinpoint exactly which button, section, or component
              needs improvement - no more vague descriptions.
            </p>
          </div>
          <div className="glass-card p-6 md:p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-icon w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white mb-6">
              <Zap className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Lightning Fast Setup
            </h3>
            <p className="text-white/80">
              Add our lightweight script to your site and start collecting
              feedback in minutes. No complex integrations needed.
            </p>
          </div>
          <div className="glass-card p-6 md:p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-icon w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white mb-6">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Actionable Insights
            </h3>
            <p className="text-white/80">
              Our dashboard organizes feedback by frequency, severity, and
              element type so you know what to fix first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};