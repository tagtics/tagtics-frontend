import React from 'react';
import AOS from 'aos';

export const HeroSection: React.FC = () => {
  const handleClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    AOS.refresh();
    const el = document.querySelector(hash) as HTMLElement | null;
    if (el) {
      const originalTransform = el.style.transform;
      el.style.transform = 'none';

      const finalTop = el.offsetTop;

      el.style.transform = originalTransform;

      window.scrollTo({
        top: finalTop,
        behavior: 'smooth'
      });
      setTimeout(() => AOS.refreshHard(), 600);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight" data-aos="fade-up">
          <span className="gradient-text">See Through Your Users' Eyes</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="100">
          Capture precise UI feedback exactly where it matters. No guesswork,
          just actionable insights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up" data-aos-delay="200">

          <a
            href="#early-access" aria-label='Link to Early Access Section' 
            className="relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-full font-semibold text-white tracking-wide shadow-[0_0_15px_rgba(80,80,255,0.4)] hover:shadow-[0_0_25px_rgba(120,90,255,0.6)] hover:scale-[1.03] transition-all duration-300 group overflow-hidden"
            onClick={(e) => handleClick(e, '#early-access')}
          >
            <span className="relative inline-block text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
              <span className="relative z-10 transition-all duration-300 group-hover:text-yellow-300 group-hover:drop-shadow-[0_0_10px_rgba(255,230,150,0.6)]">
                Join Early Access
              </span>

              {/* shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out rounded-full"></span>
            </span>

            {/* subtle glowing outline ring */}
            <span className="absolute inset-0 rounded-full ring-1 ring-white/10 group-hover:ring-yellow-300/30 transition-all duration-500"></span>
          </a>


          <a href="#how-it-works" aria-label='Link to How it Works Section' 
            className="px-6 md:px-8 py-3 md:py-4 border border-white/20 rounded-full font-medium text-white hover:bg-white/5 transition-all duration-300"
            onClick={(e) => handleClick(e, '#how-it-works')}
            >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
};