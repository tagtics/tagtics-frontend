import React, { useState, useEffect } from 'react';
import { Activity, ChevronLeft, ChevronRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const steps = [
    {
      number: 1,
      title: 'User Clicks Feedback Button',
      description: 'Users activate feedback mode with a simple click on the Tagtics widget.'
    },
    {
      number: 2,
      title: 'Select & Comment',
      description: 'They highlight any UI element and add their comments or suggestions.'
    },
    {
      number: 3,
      title: 'You Get Precise Data',
      description: 'Receive exact element identifiers, screenshots, and user comments in your dashboard.'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };
  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveStep((prev) => (prev + 1) % steps.length);
  };
  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveStep(index);
  };

  return (
    <section id="how-it-works" className="py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            How Tagtics Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-white/80 max-w-2xl mx-auto">
            A seamless process from user feedback to developer action.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side - Carousel */}
          <div className="relative flex" data-aos="fade-right">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-6 md:p-8 relative overflow-hidden w-full flex flex-col shadow-sm dark:shadow-none">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-blue-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">The Process</h3>
                  <div className="flex gap-1.5">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${index === activeStep
                            ? 'w-6 bg-gradient-to-r from-blue-500 to-purple-600'
                            : 'w-2 bg-gray-300 dark:bg-white/30 hover:bg-gray-400 dark:hover:bg-white/50'
                          }`}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Step display */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-md shadow-purple-500/30">
                        {steps[activeStep].number}
                      </div>
                    </div>

                    <h4 className="text-xl md:text-2xl font-bold mb-3">
                      {steps[activeStep].title}
                    </h4>
                    <p className="text-white/80 text-base md:text-lg leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handlePrev}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-105"
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-105"
                      aria-label="Next step"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      aria-label="Pause or Auto Play"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="ml-auto px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 text-xs md:text-sm font-medium"
                    >
                      {isAutoPlaying ? 'Pause' : 'Auto Play'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - AI Analysis */}
          <div className="glass-card rounded-xl overflow-hidden flex flex-col" data-aos="fade-left">
            <div className="p-6 md:p-8 flex flex-col h-full">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                AI-Powered Analysis
              </h3>
              <p className="text-white/80 mb-6 text-base md:text-lg">
                Our system automatically categorizes feedback, detects duplicates, and surfaces the most critical issues first.
              </p>

              <div className="relative flex-1 flex items-center">
                <div className="w-full">
                  <div className="absolute -top-3 -left-3 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl"></div>
                  <div className="relative bg-white dark:bg-gray-900/50 rounded-lg p-4 md:p-5 shadow-md border border-gray-200 dark:border-white/5">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-3">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base md:text-lg text-gray-900 dark:text-white">Feedback Analysis</h4>
                        <p className="text-xs text-gray-500 dark:text-white/60">5 new high-priority items</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Navigation clarity', value: 87, color: 'bg-blue-500' },
                        { label: 'Button visibility', value: 64, color: 'bg-purple-500' },
                        { label: 'Form usability', value: 92, color: 'bg-pink-500' },
                      ].map(({ label, value, color }) => (
                        <div key={label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-white/80">{label}</span>
                            <span className="text-xs font-medium">{value}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1.5">
                            <div
                              className={`${color} h-1.5 rounded-full transition-all duration-1000`}
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
