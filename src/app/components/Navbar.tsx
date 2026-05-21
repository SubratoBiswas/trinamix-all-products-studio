import { motion } from 'motion/react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Navbar({ activeSection }: { activeSection: string }) {
  const { isDark, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'hero',     label: 'Home'     },
    { id: 'hub',      label: 'Platform' },
    { id: 'products', label: 'Products' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border bg-background/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Trinamix <span className="text-blue-500">AI</span></span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm transition-colors ${
                activeSection === item.id
                  ? 'text-foreground font-medium'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground transition-all"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
