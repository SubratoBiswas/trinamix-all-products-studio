import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Brain, Sparkles, Play, Zap } from 'lucide-react';
import { ProductCTA } from '../ProductCTA';

export function EnterpriseAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAction, setActiveAction] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const actions = [
    { label: 'Simulate Q3 Demand', status: 'Running 2.4M scenarios...', progress: 75 },
    { label: 'Optimize Inventory', status: 'Complete', progress: 100 },
    { label: 'Generate Report', status: 'Ready to execute', progress: 0 },
  ];

  const capabilities = [
    { title: 'Natural Language Actions', value: '200+', trend: '+15%' },
    { title: 'Automated Decisions', value: '12.4K/day', trend: '+28%' },
    { title: 'Process Time Saved', value: '94%', trend: '+8%' },
  ];

  return (
    <section
      id="product-enterprise-ai"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6"
    >
      <motion.div style={{ opacity }} className="max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold">Enterprise AI</h2>
              <p className="text-xl text-white/60 mt-2">
                AI agents that understand, decide, and act
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: AI Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">AI Agent</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Processing
                  </div>
                </div>
              </div>

              {/* Action Cards */}
              <div className="p-6 space-y-4">
                {actions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: false }}
                    onMouseEnter={() => setActiveAction(index)}
                    onMouseLeave={() => setActiveAction(null)}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{action.label}</div>
                          <div className="text-xs text-white/60">{action.status}</div>
                        </div>
                      </div>
                      {action.progress < 100 && (
                        <button className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg flex items-center justify-center transition-colors">
                          <Play className="w-4 h-4 text-blue-400" />
                        </button>
                      )}
                      {action.progress === 100 && (
                        <div className="text-xs text-green-400 font-medium"> Done</div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {action.progress > 0 && action.progress < 100 && (
                      <div className="bg-white/5 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${action.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Natural Language Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: false }}
                  className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <div className="font-medium text-sm mb-2">Try natural language:</div>
                      <div className="text-xs text-white/70 space-y-1">
                        <div>"Analyze supplier risk and suggest alternatives"</div>
                        <div>"Run promotion scenario with 20% discount"</div>
                        <div>"What if we increase production by 15%?"</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: KPIs and Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* KPI Cards */}
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: false }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
              >
                <div className="text-sm text-white/60 mb-2">{cap.title}</div>
                <div className="flex items-end justify-between">
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                    {cap.value}
                  </div>
                  <div className="text-sm text-green-400 font-medium">{cap.trend}</div>
                </div>
              </motion.div>
            ))}

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="text-lg font-medium mb-4">Key Capabilities</div>
              <div className="space-y-3">
                {[
                  'Decision automation with confidence scoring',
                  'Multi-step workflow orchestration',
                  'Real-time learning from outcomes',
                  'Integration with all enterprise systems',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    </div>
                    <div className="text-sm text-white/70">{feature}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <ProductCTA productId="enterprise-ai" accentGradient="from-blue-500 to-cyan-500" />
      </motion.div>
    </section>
  );
}
