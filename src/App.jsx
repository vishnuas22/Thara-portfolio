import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import ScrollCanvas from './components/ScrollCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ServicesTools from './components/ServicesTools';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';
import { initAudioEngine } from './utils/audioEngine';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    initAudioEngine();

    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });
    lenisRef.current = lenis;

    const handleLenisScroll = (e) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = e.animatedScroll !== undefined ? e.animatedScroll : window.scrollY;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, currentScroll / maxScroll)) : 0;
      setScrollProgress(progress);
    };

    lenis.on('scroll', handleLenisScroll);

    // Fallback native scroll listener
    const handleNativeScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    let animId;
    function raf(time) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // When user scrubs via the bottom timeline rail
  const handleManualScrub = (fraction) => {
    if (lenisRef.current) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = fraction * maxScroll;
      lenisRef.current.scrollTo(targetY, { immediate: false, duration: 0.6 });
    }
  };

  return (
    <>
      {/* Precision Magnetic Physics Cursor */}
      <CustomCursor />

      {/* Fixed 240-frame 3D sequence canvas backdrop & Timeline Controller */}
      <ScrollCanvas
        scrollProgress={scrollProgress}
        isCinemaMode={isCinemaMode}
        setIsCinemaMode={setIsCinemaMode}
        onManualScrub={handleManualScrub}
      />

      {/* Atmospheric lighting overlay tuned to footage rim lighting */}
      <div className="ambient-glow-layer" />

      {/* Main app content with smooth Cinema Mode dimming transition */}
      <div
        className={`app-content ${isCinemaMode ? 'cinema-content-dimmed' : ''}`}
        style={{
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease, transform 0.6s ease',
          opacity: isCinemaMode ? 0 : 1,
          pointerEvents: isCinemaMode ? 'none' : 'auto',
          filter: isCinemaMode ? 'blur(10px)' : 'none',
          transform: isCinemaMode ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        <Navbar isCinemaMode={isCinemaMode} setIsCinemaMode={setIsCinemaMode} />
        <main>
          <Hero onEnterCinema={() => setIsCinemaMode(true)} />
          <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
          <ServicesTools />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Interactive Case Study Specification Dossier Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
