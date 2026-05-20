import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PlatformHub } from '../components/PlatformHub';
import { ProductSections } from '../components/ProductSections';
import { Transformation } from '../components/Transformation';

const SECTIONS = ['hero', 'hub', 'products', 'transformation'];

export default function Landing() {
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Navbar activeSection={activeSection} />
      <Hero />
      <PlatformHub />
      <ProductSections />
      <Transformation />

      <footer className="py-12 text-center text-sm text-foreground/20 border-t border-border">
        {new Date().getFullYear()} Trinamix Enterprise AI Platform
      </footer>

      {/* Floating admin gear icon */}
      <button
        onClick={() => navigate('/admin')}
        title="Admin panel"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-foreground/8 border border-border hover:bg-foreground/15 flex items-center justify-center text-foreground/40 hover:text-foreground transition-all shadow-lg"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}
