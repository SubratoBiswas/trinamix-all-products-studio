import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale  = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y      = useTransform(scrollYProgress, [0, 1], [0, 200]);


  return (
    <section
      id="hero"
      ref={containerRef}
      className="h-screen relative flex items-center justify-center overflow-hidden bg-background transition-colors duration-300"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(59,130,246,0.35) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147,51,234,0.35) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(59,130,246,0.2) 0%, transparent 50%)
            `,
            backgroundSize: '100% 100%',
          }}
        />

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{
              left: `${(i * 37 + 5) % 100}%`,
              top:  `${(i * 53 + 10) % 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-500">
            Enterprise AI Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to right, #ffffff, #bfdbfe, #e9d5ff)'
              : 'linear-gradient(to right, #1e293b, #2563eb, #7c3aed)',
          }}
        >
          From Data to Decisions
          <br />
          <span className="text-blue-500">Instantly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-foreground/60 mb-12 max-w-3xl mx-auto"
        >
          Unify your enterprise operations with AI-powered intelligence.
          Automate decisions, optimize outcomes, and transform complexity into clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-lg font-medium text-white hover:scale-105 transition-transform">
            Explore Platform
          </button>
          <button className="px-8 py-4 bg-foreground/10 border border-border rounded-xl text-lg font-medium text-foreground hover:bg-foreground/15 transition-colors">
            Watch Demo
          </button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
