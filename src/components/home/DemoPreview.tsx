import React, { useEffect, useState, useRef } from 'react';
import { CheckIcon, MessageCircleIcon, HeartIcon, SendIcon, XCircleIcon } from 'lucide-react';

export const DemoPreview: React.FC = () => {
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showGuide, setShowGuide] = useState<string | null>('initial');
  const [selectedElements, setSelectedElements] = useState<HTMLElement[]>([]);
  const [guideTarget, setGuideTarget] = useState<HTMLElement | null>(null);

  const feedbackTextRef = useRef<HTMLTextAreaElement>(null);
  const demoContainerRef = useRef<HTMLDivElement>(null);

  const [guidesShown, setGuidesShown] = useState({
    initial: false,
    selection: false,
    submit: false,
    completed: false,
  });

  // Show initial guide on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!guidesShown.initial && !guidesShown.completed) {
        setShowGuide('initial');
        setGuidesShown(prev => ({ ...prev, initial: true }));
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [guidesShown]);

  const toggleFeedbackMode = () => {
    if (!feedbackMode) {
      // Enter feedback mode (start selecting)
      setFeedbackMode(true);
      if (showGuide === 'initial') {
        setShowGuide('selection');
        setGuidesShown(prev => ({ ...prev, selection: true }));
        // Set initial guide target to the first demo element
        const firstElement = document.querySelector('[data-element="header"]') as HTMLElement;
        setGuideTarget(firstElement);
      }
    } else {
      // Click again while in feedback mode -> open the submit form
      setShowFeedbackForm(true);
      // hide selection guide when opening form
      if (showGuide === 'selection' || showGuide === 'submit') {
        setShowGuide(null);
      }
    }
  };

  // Single-element toggle selection & set guide target
  const handleElementClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!feedbackMode) return;
    e.stopPropagation();
    const element = e.currentTarget;

    setSelectedElements(prev => {
      const alreadySelected = prev.includes(element);
      const newSelected = alreadySelected ? prev.filter(el => el !== element) : [...prev, element];

      // Set guide target to first selected element
      setGuideTarget(newSelected[0] || null);

      // Switch guide to submit step if selection exists
      if (newSelected.length > 0) setShowGuide('submit');
      return newSelected;
    });
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    setFeedbackMode(false);
    setSelectedElements([]);
    setGuideTarget(null);
    // hide guides once user closes form
    setShowGuide(null);
  };

  const submitFeedback = () => {
    const feedbackText = feedbackTextRef.current?.value;
    const toastElement = document.getElementById('feedbackToast');

    if (!feedbackText || feedbackText.trim() === '') {
      // Show error toast (containerized)
      if (toastElement) {
        const iconContainer = toastElement.querySelector('.toast-icon-container') as HTMLElement;
        const successIcon = toastElement.querySelector('.toast-icon-success') as HTMLElement;
        const errorIcon = toastElement.querySelector('.toast-icon-error') as HTMLElement;

        toastElement.style.background = 'rgba(239, 68, 68, 0.9)';
        iconContainer.style.backgroundColor = 'rgb(239, 68, 68)';
        successIcon.classList.add('hidden');
        errorIcon.classList.remove('hidden');
        toastElement.querySelector('.toast-title')!.textContent = 'Error';
        toastElement.querySelector('.toast-message')!.textContent = 'Please enter your feedback before submitting';
        toastElement.classList.add('active');
        setTimeout(() => toastElement.classList.remove('active'), 3000);
      }
      return;
    }

    // Show success toast
    if (toastElement) {
      const iconContainer = toastElement.querySelector('.toast-icon-container') as HTMLElement;
      const successIcon = toastElement.querySelector('.toast-icon-success') as HTMLElement;
      const errorIcon = toastElement.querySelector('.toast-icon-error') as HTMLElement;

      toastElement.style.background = 'rgba(16, 185, 129, 0.9)';
      iconContainer.style.backgroundColor = 'rgb(16, 185, 129)';
      errorIcon.classList.add('hidden');
      successIcon.classList.remove('hidden');
      toastElement.querySelector('.toast-title')!.textContent = 'Feedback Sent!';
      toastElement.querySelector('.toast-message')!.textContent = 'Thank you for helping us improve.';
      toastElement.classList.add('active');
      setTimeout(() => toastElement.classList.remove('active'), 3000);
    }

    // clear the textarea immediately so next open is empty
    if (feedbackTextRef.current) feedbackTextRef.current.value = '';

    closeFeedbackForm();
    setGuidesShown(prev => ({ ...prev, completed: true }));
  };

  // Clear textarea whenever the form is opened (prevents stale text)
  useEffect(() => {
    if (showFeedbackForm && feedbackTextRef.current) {
      feedbackTextRef.current.value = '';
    }
  }, [showFeedbackForm]);

  // Helper for highlight class (safely handle nulls)
  const isSelected = (el: HTMLElement | null) =>
    el && selectedElements.includes(el) ? 'highlight' : '';

  // Dynamically position selection guide relative to demo container
  useEffect(() => {
    const guideEl = document.getElementById('guideSelection');
    if (!guideEl) return;
    // Ensure guide is absolutely positioned
    guideEl.style.position = 'absolute';

    if (showGuide === 'selection' && guideTarget && demoContainerRef.current) {
      const targetRect = guideTarget.getBoundingClientRect();
      const containerRect = demoContainerRef.current.getBoundingClientRect();

      // compute left/top relative to container
      let left = targetRect.left - containerRect.left + targetRect.width / 2 - guideEl.offsetWidth / 2;
      let top = targetRect.top - containerRect.top - guideEl.offsetHeight - 8;

      // clamp within container bounds with small padding
      const padding = 8;
      const maxLeft = containerRect.width - guideEl.offsetWidth - padding;
      const minLeft = padding;
      left = Math.max(minLeft, Math.min(left, maxLeft));
      // Make sure top doesn't go above the container; if it would, place below element
      if (top < padding) {
        top = targetRect.top - containerRect.top + targetRect.height + 8; // place below
        // still clamp to bottom
        const maxTop = containerRect.height - guideEl.offsetHeight - padding;
        top = Math.max(padding, Math.min(top, maxTop));
      }

      guideEl.style.left = `${Math.round(left)}px`;
      guideEl.style.top = `${Math.round(top)}px`;
    } else {
      // Hide/reset positioning when not in selection guide
      guideEl.style.left = '';
      guideEl.style.top = '';
    }
  }, [showGuide, guideTarget, selectedElements]);

  // Also reposition on window resize/scroll to keep it aligned
  useEffect(() => {
    const handler = () => {
      // trigger the effect by toggling a small state is one approach,
      // but we can directly recalc by calling the same logic via event dispatch
      const guideEl = document.getElementById('guideSelection');
      if (!guideEl) return;
      // Force re-run by reading guideTarget (no-op here)
      // Simpler: call the positioning effect by dispatching a small custom event we don't need — so just call the same positioning logic:
      if (guideTarget && demoContainerRef.current && showGuide === 'selection') {
        const targetRect = guideTarget.getBoundingClientRect();
        const containerRect = demoContainerRef.current.getBoundingClientRect();
        let left = targetRect.left - containerRect.left + targetRect.width / 2 - guideEl.offsetWidth / 2;
        let top = targetRect.top - containerRect.top - guideEl.offsetHeight - 8;
        const padding = 8;
        const maxLeft = containerRect.width - guideEl.offsetWidth - padding;
        const minLeft = padding;
        left = Math.max(minLeft, Math.min(left, maxLeft));
        if (top < padding) {
          top = targetRect.top - containerRect.top + targetRect.height + 8;
          const maxTop = containerRect.height - guideEl.offsetHeight - padding;
          top = Math.max(padding, Math.min(top, maxTop));
        }
        guideEl.style.left = `${Math.round(left)}px`;
        guideEl.style.top = `${Math.round(top)}px`;
      }
    };

    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, true); // capture scrolls inside containers
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler, true);
    };
  }, [guideTarget, showGuide]);

  return (
    <section id='demo-section' className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Try Our Interactive Demo
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Experience Tagtics in action! Click the feedback icon to select elements and share your thoughts.
          </p>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden shadow-xl">
          <div className="bg-gray-900 p-4 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-sm text-white/50">
              demo.tagtics.com
            </div>
          </div>

          <div
            ref={demoContainerRef}
            className={`relative h-80 md:h-96 ${feedbackMode ? 'feedback-active' : ''}`}
            id="demo-container"
          >
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 overflow-hidden">

              {/* Demo Header */}
              <div
                className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 demo-element ${isSelected(document.querySelector('[data-element="header"]'))}`}
                data-element="header"
                onClick={handleElementClick}
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    TaskFlow Pro
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base">
                    Streamline your productivity
                  </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button aria-label="Demo Webpage Component"
                    className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors demo-element text-sm ${isSelected(document.querySelector('[data-element="login-button"]'))}`}
                    data-element="login-button"
                    onClick={handleElementClick}
                  >
                    Login
                  </button>
                  <button aria-label="Demo Webpage Component"
                    className={`px-4 py-2 border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors demo-element text-sm ${isSelected(document.querySelector('[data-element="signup-button"]'))}`}
                    data-element="signup-button"
                    onClick={handleElementClick}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Demo Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {['tasks-card', 'projects-card', 'team-card'].map(id => (
                  <div
                    key={id}
                    className={`bg-slate-800 p-4 md:p-6 rounded-xl demo-element ${isSelected(document.querySelector(`[data-element="${id}"]`))}`}
                    data-element={id}
                    onClick={handleElementClick}
                  >
                    <h4 className="font-semibold text-white">{id.replace('-', ' ').toUpperCase()}</h4>
                    <p className="text-2xl font-bold text-white mb-1">Sample Value</p>
                    <p className="text-sm text-slate-400">Description</p>
                  </div>
                ))}
              </div>

              {/* Demo CTA */}
              <div className="text-center">
                <button aria-label="Demo Webpage Component"
                  className={`px-6 md:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 demo-element text-sm md:text-base ${isSelected(document.querySelector('[data-element="cta-button"]'))}`}
                  data-element="cta-button"
                  onClick={handleElementClick}
                >
                  Get Started Today
                </button>
              </div>

              {/* Feedback Icon */}
              <div
                id="feedbackIcon"
                className={`demo-feedback-icon ${feedbackMode ? 'feedback-active' : ''} ${showFeedbackForm ? 'form-active' : ''} ${showGuide ? 'guide-active' : ''}`}
                onClick={toggleFeedbackMode}
              >
                {!feedbackMode ? (
                  <MessageCircleIcon className="w-5 h-5 text-white feedback-icon" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-white feedback-icon" />
                )}
                <SendIcon className="w-5 h-5 text-white hidden form-icon" />
              </div>

              {/* Feedback Form */}
              <div id="feedbackForm" className={`feedback-form ${showFeedbackForm ? 'show active' : ''}`}>
                <h4 className="text-lg font-bold text-white mb-3">
                  Share Your Feedback
                </h4>
                <p id="feedbackTarget" className="text-sm text-white/60 mb-4">
                  {selectedElements.length > 0
                    ? `Feedback for: ${selectedElements.length} selected elements`
                    : 'General page feedback'}
                </p>
                <textarea
                  ref={feedbackTextRef}
                  id="feedbackText"
                  placeholder="What would you like to improve?"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/40 resize-none h-24"
                ></textarea>
                <div className="flex justify-end gap-3 mt-4">
                  <button aria-label="Demo Webpage Form Close"
                    onClick={closeFeedbackForm}
                    className="px-4 py-2 text-white/80 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button aria-label="Demo Webpage Form Submit"
                    onClick={submitFeedback}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* User Guides */}
              <div
                id="guideInitial"
                className={`user-guide guide-initial ${showGuide === 'initial' ? 'show active' : ''}`}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">Give Feedback</div>
                    <div className="text-xs text-white/80">
                      Click this icon to start giving feedback
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="guideSelection"
                className={`user-guide guide-selection ${showGuide === 'selection' ? 'show active' : ''}`}
              >
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">Select Elements</div>
                    <div className="text-xs text-white/80">
                      Click elements to select them for feedback, or click the feedback icon again for general page feedback
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="guideSubmit"
                className={`user-guide guide-submit ${showGuide === 'submit' ? 'show active' : ''}`}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">Submit Feedback</div>
                    <div className="text-xs text-white/80">
                      Click the icon again to submit your feedback
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Toast */}
              <div id="feedbackToast" className="feedback-toast">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 toast-icon-container">
                    <CheckIcon className="w-5 h-5 text-white toast-icon-success" />
                    <XCircleIcon className="w-5 h-5 text-white toast-icon-error hidden" />
                  </div>
                  <div>
                    <div className="font-medium text-white toast-title">Feedback Sent!</div>
                    <div className="text-sm text-white/60 toast-message">
                      Thank you for helping us improve.
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