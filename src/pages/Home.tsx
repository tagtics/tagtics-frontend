import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { DemoPreview } from "@components/home/DemoPreview";
import { FeaturesSection } from "@components/home/FeaturesSection";
import { HeroSection } from "@components/home/HeroSection";
import { HowItWorksSection } from "@components/home/HowItWorksSection";
import { AnimatedBackground } from "@components/home/AnimatedBackground";
import { Footer } from "@components/Footer";
import { Navbar } from "@components/Navbar";
import '@styles/Home.css';
import Snowfall from "react-snowfall";
import SEO from "@components/common/SEO";



export default function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'));

    // Observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Initialize AOS
    AOS.init({
      duration: 500,
      easing: 'ease-out',
      once: false,
      offset: 100,
    });

    // refresh on scroll end or resize
    const refresh = () => AOS.refresh();
    window.addEventListener('resize', refresh);
    window.addEventListener('orientationchange', refresh);
    window.addEventListener('hashchange', refresh);
    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('orientationchange', refresh);
      window.removeEventListener('hashchange', refresh);
      observer.disconnect();
    };
  }, []);


  return (

    <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      <SEO
        title="Home"
        description="Tagtics is the visual feedback tool for developers. Get element-level insights, bug reports, and feature requests directly from your live website."
      />
      <Navbar />
      {/* Background layer */}
      <AnimatedBackground />
      <div className="fixed inset-0 bg-white/60 dark:bg-black/60 z-5 pointer-events-none transition-colors duration-300"></div>

      {/* Snowfall - positioned above overlay */}
      <Snowfall
        color={isDark ? "white" : "#111827"}
        snowflakeCount={100}
        style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: 8 }}
      />

      {/* Foreground content */}
      <div className="relative z-10">
        <div className="absolute w-64 h-64 rounded-full  z-10 pointer-events-none bg-purple-500/20 blur-3xl -top-32 -left-32"></div>
        <div className="absolute w-96 h-96 rounded-full  z-10 pointer-events-none bg-blue-500/20 blur-3xl -bottom-32 -right-32"></div>

        <HeroSection />
        <DemoPreview />
        <FeaturesSection />
        <HowItWorksSection />
        <Footer />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Tagtics",
            "applicationCategory": "DeveloperApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Visual UI feedback platform enabling element-level user insights for developers",
            "url": "https://www.tagtics.online",
            "screenshot": "https://www.tagtics.online/screenshot.png",
            "operatingSystem": "Web",
            "author": {
              "@type": "Organization",
              "name": "Tagtics"
            }
          })}
        </script>
      </div>
    </div>
  )
}