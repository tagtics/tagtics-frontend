import React, { useState } from 'react';
import { Check } from 'lucide-react';

type FormValues = {
  name: string;
  email: string;
};

export const EarlyAccessSection: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({ name: '', email: '' });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [showNotification, setShowNotification] = useState(false);

  const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<FormValues> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(formData);

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    setFormData({ name: '', email: '' });
    setErrors({});
  };

  const handleChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <section id="early-access" className="py-20 relative min-h-screen flex items-center text-white">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Section Heading */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Start Your Journey with Tagtics
          </h2>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-7 lg:p-9">

          {/* Centered Header Badge */}
          <div className="text-center mb-5">
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
              <span className="text-amber-400 font-semibold text-sm">⚡ LIMITED OFFER - First 50 Users Only</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-7 items-stretch">

            {/* Left Side - Offer Showcase */}
            <div className="space-y-4 h-full flex flex-col justify-between" data-aos="fade-right" data-aos-delay="0">
              <div className="space-y-2.5">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Get <span className="gradient-text">3 Months Pro</span> Absolutely Free
                </h3>
                <p className="text-base text-white/80">
                  Worth $57 • No credit card required • Cancel anytime
                </p>
              </div>

              {/* Value Showcase */}
              <div className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 rounded-2xl p-5 shadow-[0_0_25px_rgba(59,130,246,0.2)] space-y-3 transition-all duration-300 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-white">What You Get</span>
                  <div className="text-right">
                    <div className="text-white/50 line-through text-sm">$57</div>
                    <div className="text-xl font-bold gradient-text">FREE</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">AI-Powered Summarization</div>
                      <div className="text-xs text-white/60">Analyze feedback instantly with advanced AI</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">Projects Count Increased</div>
                      <div className="text-xs text-white/60">Free tier limited to just 1 project</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-pink-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">Expanded Comment Storage</div>
                      <div className="text-xs text-white/60">Store even more feedback and insights</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs text-white/70">
                    Regular price: <span className="font-bold text-white">$19/month</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-white/60 italic pt-2 flex items-center gap-2">
                <span className="text-blue-400 animate-pulse">→</span> Sign up below to secure your free trial!
              </div>

            </div>

            {/* Right Side - Form */}
            <div className="space-y-4 bg-white/3 border border-white/5 rounded-2xl p-6 h-full flex flex-col justify-between shadow-inner backdrop-blur-sm" data-aos="fade-left" data-aos-delay="300">
              <div className="text-center">
                <h4 className="text-2xl md:text-3xl font-semibold mb-1 text-white/90">
                  Sign Up for Early Access
                </h4>

                <p className="text-white/70 text-sm">
                  Be among the first to experience Tagtics Pro
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    id='name'
                    placeholder={errors.name ? errors.name : 'Your Name'}
                    value={formData.name}
                    onChange={handleChange('name')}
                    className={`w-full px-5 py-3 rounded-lg text-white 
      ${errors.name
                        ? 'bg-red-500/10 border border-red-500 placeholder-red-400'
                        : 'bg-white/10 border border-white/20 placeholder-white/50 hover:bg-white/15 hover:border-white/30'
                      }
      focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent 
      transition-all duration-200`}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id='email'
                    placeholder={errors.email ? errors.email : 'Email Address'}
                    value={formData.email}
                    onChange={handleChange('email')}
                    className={`w-full px-5 py-3 rounded-lg text-white 
      ${errors.email
                        ? 'bg-red-500/10 border border-red-500 placeholder-red-400'
                        : 'bg-white/10 border border-white/20 placeholder-white/50 hover:bg-white/15 hover:border-white/30'
                      }
      focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent 
      transition-all duration-200`}
                  />
                </div>
                <button aria-label="Early Access Submit"
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-base text-white hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  Get 3 Months Free →
                </button>

                <p className="text-xs text-white/50 text-center">
                  No credit card required • Instant activation
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <div className="flex items-center space-x-2 text-white/60 text-xs">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Instant access after signup</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60 text-xs">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>No payment info needed</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60 text-xs">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Full premium features unlocked</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Success Notification */}
      <div className={`fixed bottom-5 right-5 bg-gray-900 border border-green-500/30 rounded-xl p-4 shadow-lg transition-all duration-300 z-50 ${showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h4 className="font-medium text-white">Welcome Aboard! 🎉</h4>
            <p className="text-sm text-white/70">
              Check your email for next steps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}