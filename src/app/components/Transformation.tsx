import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

export function Transformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAI, setShowAI] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Trigger AI interface when in view
  const handleInView = (inView: boolean) => {
    if (inView) {
      setTimeout(() => setShowAI(true), 500);
    }
  };

  const queries = [
    { q: "What's our inventory risk for Q2?", a: "3 SKUs at high risk. Recommended actions: increase orders for SKU-1024 by 2,500 units." },
    { q: "Optimize pricing for summer campaign", a: "Running 847 simulations... Recommended: 15% discount on categories A,C. Est. revenue lift: $2.3M" },
    { q: "Show supply chain disruptions", a: "2 critical alerts detected. Port delays in Shanghai affecting 12 shipments. AI recommends alternate routes." },
  ];

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6"
    >
      <motion.div style={{ opacity }} className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => handleInView(true)}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            The Transformation
          </h2>
          <p className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            One platform. All answers. Instant action.
          </p>
        </motion.div>

        {/* AI Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={showAI ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10" />

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="font-medium">AI Assistant</div>
                <div className="text-xs text-white/60">Enterprise Intelligence</div>
              </div>
              <div className="ml-auto flex gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-white/60 ml-2">Active</span>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-6 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto">
              {queries.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={showAI ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.8 }}
                >
                  {/* User Query */}
                  <div className="flex justify-end mb-2">
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                      <p className="text-sm">{item.q}</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={showAI ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.8 }}
                    className="flex gap-3 mb-6"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-lg">
                      <p className="text-sm text-white/90 chat-response-text">{item.a}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-xs transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-xs transition-colors">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={showAI ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 3 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-white/60 rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-white/60 rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-white/60 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-3 items-center bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
                <input
                  type="text"
                  placeholder="Ask anything about your business..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/40"
                />
                <button className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: false }}
          className="text-center mt-16"
        >
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Natural language queries. Instant insights. Automated actions across your entire enterprise.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
