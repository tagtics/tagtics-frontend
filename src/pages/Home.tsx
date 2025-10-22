import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { DemoPreview } from "../components/home/DemoPreview";
import { EarlyAccessSection } from "../components/home/EarlyAccessSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { HeroSection } from "../components/home/HeroSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { Toaster } from "sonner";
import { AnimatedBackground } from "../components/home/AnimatedBackground";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import '../styles/Home.css';


export default function Home() {
  useEffect(() => {
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
    };
  }, []);


  return (

    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      {/* Background layer */}
      <AnimatedBackground />
      <div className="fixed inset-0 bg-black/60 z-5 pointer-events-none"></div>

      {/* Foreground content */}
      <div className="relative z-10">
        <div className="absolute w-64 h-64 rounded-full  z-10 pointer-events-none bg-purple-500/20 blur-3xl -top-32 -left-32"></div>
        <div className="absolute w-96 h-96 rounded-full  z-10 pointer-events-none bg-blue-500/20 blur-3xl -bottom-32 -right-32"></div>

        <HeroSection />
        <DemoPreview />
        <EarlyAccessSection />
        <FeaturesSection />
        <HowItWorksSection />
        <Footer />
        <Toaster position="top-right" />
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