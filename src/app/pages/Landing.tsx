import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PlatformHub } from '../components/PlatformHub';
import { ProductSections } from '../components/ProductSections';
import { Transformation } from '../components/Transformation';

const SECTIONS = ['hero', 'hub', 'products', 'transformation'];

export default function Landing() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.25, 0.5] },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} />
      <Hero />
      <PlatformHub />
      <ProductSections />
      <Transformation />

      {/* Footer spacer */}
      <footer className="py-12 text-center text-sm text-white/20 border-t border-white/5">
        © {new Date().getFullYear()} Trinamix — Enterprise AI Platform
      </footer>
    </div>
  );
}
