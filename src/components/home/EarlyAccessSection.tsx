import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { registerForEarlyAccess } from '../../services/EarlyAccess.service';

type FormValues = {
  name: string;
  email: string;
};

type RegistrationResponse = {
  success: boolean;
  message?: string;
  userId?: string;
  error?: string;
  warning?: string;
  retryAfter?: number;
};

export const EarlyAccessSection: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({ name: '', email: '' });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      setGeneralError('');
      return;
    }

    setIsLoading(true);
    setErrors({});
    setGeneralError('');

    try {
      const response: RegistrationResponse = await registerForEarlyAccess(formData.name, formData.email);

      if (response.success) {
        setNotificationMessage(response.message || 'Welcome Aboard! 🎉 Check your email for next steps.');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
        setFormData({ name: '', email: '' });
      } else {
        if (response.error) {
          // Check if it's a field-specific error; otherwise, set as general
          if (response.error.includes('email') || response.error.includes('Email')) {
            setErrors({ email: response.error });
          } else if (response.error.includes('name') || response.error.includes('Name')) {
            setErrors({ name: response.error });
          } else {
            setGeneralError(response.error);
          }
        }
        if (response.warning) {
          setGeneralError(response.warning);
        }
        if (response.retryAfter) {
          // Optionally handle retry after delay
          console.log(`Retry after ${response.retryAfter} seconds`);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setGeneralError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  return (
    <section id="early-access" className="py-20 relative items-center text-white">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Section Heading */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 gradient-text">
            Start Your Journey with Tagtics
          </h2>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-7">

          {/* Centered Header Badge */}
          <div className="text-center mb-5">
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
              <span className="text-amber-400 font-semibold text-xs">⚡ LIMITED OFFER - First 50 Users Only</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">

            {/* Left Side - Offer Showcase */}
            <div className="space-y-4 h-full flex flex-col justify-between" data-aos="fade-right" data-aos-delay="0">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Get <span className="gradient-text">3 Months Pro</span> Absolutely Free
                </h3>
                <p className="text-sm text-white/80">
                  Worth $57 • No credit card required • Cancel anytime
                </p>
              </div>

              {/* Value Showcase */}
              <div className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 rounded-xl p-4 shadow-lg space-y-2.5 transition-all duration-300 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-bold text-white">What You Get</span>
                  <div className="text-right">
                    <div className="text-white/50 line-through text-xs">$57</div>
                    <div className="text-lg font-bold gradient-text">FREE</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-xs">AI-Powered Summarization</div>
                      <div className="text-xs text-white/60">Analyze feedback instantly with advanced AI</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-xs">Projects Count Increased</div>
                      <div className="text-xs text-white/60">Free tier limited to just 1 project</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-pink-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-xs">Expanded Comment Storage</div>
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
              <div className="text-xs text-white/60 italic flex items-center gap-2">
                <span className="text-blue-400 animate-pulse">→</span> Sign up below to secure your free trial!
              </div>

            </div>

            {/* Right Side - Form */}
            <div className="space-y-3 bg-white/3 border border-white/5 rounded-2xl p-5 h-full flex flex-col justify-between shadow-inner backdrop-blur-sm" data-aos="fade-left" data-aos-delay="300">
              <div className="text-center">
                <h4 className="text-xl md:text-2xl font-semibold mb-1 text-white/90">
                  Sign Up for Early Access
                </h4>

                <p className="text-white/70 text-xs">
                  Be among the first to experience Tagtics Pro
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <input
                    type="text"
                    id='name'
                    placeholder={errors.name ? errors.name : 'Your Name'}
                    value={formData.name}
                    onChange={handleChange('name')}
                    disabled={isLoading}
                    className={`w-full px-4 py-2.5 rounded-lg text-white text-sm
                      ${errors.name
                        ? 'bg-red-500/10 border placeholder-red-400'
                        : 'bg-white/10 border border-white/20 placeholder-white/50 hover:bg-white/15 hover:border-white/30'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent 
                      transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id='email'
                    placeholder={errors.email ? errors.email : 'Email Address'}
                    value={formData.email}
                    onChange={handleChange('email')}
                    disabled={isLoading}
                    className={`w-full px-4 py-2.5 rounded-lg text-white text-sm
                      ${errors.email
                        ? 'bg-red-500/10 border placeholder-red-400'
                        : 'bg-white/10 border border-white/20 placeholder-white/50 hover:bg-white/15 hover:border-white/30'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent 
                      transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>

                {generalError && (
                  <div className="text-red-400 text-xs text-center bg-red-500/10 p-2 rounded-lg">
                    {generalError}
                  </div>
                )}

                <button 
                  type="submit"
                  aria-label="Early Access Submit"
                  disabled={isLoading}
                  className={`w-full px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300 cursor-pointer flex items-center justify-center
                    ${isLoading 
                      ? 'bg-gray-600 cursor-not-allowed opacity-70' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105'
                    }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Get 3 Months Free →'
                  )}
                </button>

                <p className="text-xs text-white/50 text-center">
                  No credit card required • Instant activation
                </p>
              </form>

              {/* Trust Indicators */}
              <div className="pt-2.5 border-t border-white/10 space-y-1">
                <div className="flex items-center space-x-2 text-white/60 text-xs">
                  <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                  <span>Instant access after signup</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60 text-xs">
                  <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                  <span>No payment info needed</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60 text-xs">
                  <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
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
            <h4 className="font-medium text-white">Success! 🎉</h4>
            <p className="text-sm text-white/70">
              {notificationMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}