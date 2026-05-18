import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { TrendingUp, DollarSign, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ProductCTA } from '../ProductCTA';

export function PriceSenseAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scenario, setScenario] = useState('base');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const baseData = [
    { month: 'Jan', revenue: 4200, elasticity: 1.2 },
    { month: 'Feb', revenue: 4500, elasticity: 1.15 },
    { month: 'Mar', revenue: 4800, elasticity: 1.1 },
    { month: 'Apr', revenue: 5100, elasticity: 1.05 },
    { month: 'May', revenue: 5400, elasticity: 1.0 },
    { month: 'Jun', revenue: 5700, elasticity: 0.95 },
  ];

  const aggressiveData = [
    { month: 'Jan', revenue: 4200, elasticity: 1.2 },
    { month: 'Feb', revenue: 4700, elasticity: 1.18 },
    { month: 'Mar', revenue: 5300, elasticity: 1.15 },
    { month: 'Apr', revenue: 6100, elasticity: 1.12 },
    { month: 'May', revenue: 6900, elasticity: 1.08 },
    { month: 'Jun', revenue: 7800, elasticity: 1.05 },
  ];

  const chartData = scenario === 'aggressive' ? aggressiveData : baseData;

  const scenarios = [
    { id: 'base', label: 'Base Case', revenue: '$5.7M', margin: '32%', color: 'from-green-500 to-emerald-500' },
    { id: 'aggressive', label: 'Aggressive', revenue: '$7.8M', margin: '28%', color: 'from-blue-500 to-cyan-500' },
    { id: 'conservative', label: 'Conservative', revenue: '$5.1M', margin: '36%', color: 'from-purple-500 to-pink-500' },
  ];

  const insights = [
    { label: 'Optimal Price Point', value: '$24.99' },
    { label: 'Revenue Lift', value: '+37%' },
    { label: 'Volume Impact', value: '+12%' },
  ];

  return (
    <section
      id="product-pricesense"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6 bg-gradient-to-b from-black via-green-950/10 to-black"
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold">Price Sense AI</h2>
              <p className="text-xl text-white/60 mt-2">
                Dynamic pricing optimization & elasticity modeling
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Chart & Scenarios */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Scenario Selector */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <div className="text-lg font-medium mb-4">Pricing Scenarios</div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScenario(s.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      scenario === s.id
                        ? `bg-gradient-to-br ${s.color} border-white/30`
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-white/60 mt-1">{s.revenue}</div>
                  </button>
                ))}
              </div>

              {/* Chart */}
              <motion.div
                key={scenario}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black/30 rounded-xl p-4 h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-xs text-white/60">Projected Revenue</div>
                  <div className="text-xl font-bold text-green-400">
                    {scenarios.find((s) => s.id === scenario)?.revenue}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-xs text-white/60">Target Margin</div>
                  <div className="text-xl font-bold text-green-400">
                    {scenarios.find((s) => s.id === scenario)?.margin}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Elasticity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <div className="text-lg font-medium">Elasticity Analysis</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Category A</span>
                  <span className="text-sm font-medium">-1.8 (Elastic)</span>
                </div>
                <div className="bg-white/5 rounded-full h-2">
                  <div className="w-4/5 h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Category B</span>
                  <span className="text-sm font-medium">-0.6 (Inelastic)</span>
                </div>
                <div className="bg-white/5 rounded-full h-2">
                  <div className="w-1/3 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Category C</span>
                  <span className="text-sm font-medium">-1.2 (Moderate)</span>
                </div>
                <div className="bg-white/5 rounded-full h-2">
                  <div className="w-3/5 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Insights & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-lg font-medium">AI Recommendations</div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: false }}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Increase SKU-2847 by 8%</div>
                      <div className="text-xs text-white/70">
                        Low elasticity detected. Est. revenue lift: <span className="text-green-400 font-medium">$147K</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: false }}
                  className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Promotional Pricing for Category C</div>
                      <div className="text-xs text-white/70">
                        15% discount recommended. Expected volume increase: <span className="text-blue-400 font-medium">+24%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: false }}
                  className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <DollarSign className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Dynamic Pricing for Peak Hours</div>
                      <div className="text-xs text-white/70">
                        Implement time-based pricing. Potential uplift: <span className="text-purple-400 font-medium">$89K/mo</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: false }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center"
                >
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 mb-1">
                    {insight.value}
                  </div>
                  <div className="text-xs text-white/60">{insight.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="text-lg font-medium mb-4">Capabilities</div>
              <div className="space-y-3">
                {[
                  'Real-time price elasticity modeling',
                  'Competitive intelligence integration',
                  'Multi-variable scenario planning',
                  'A/B testing & simulation',
                  'Automated price updates',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    <div className="text-sm text-white/70">{feature}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <ProductCTA productId="pricesense" accentGradient="from-green-500 to-emerald-500" />
      </motion.div>
    </section>
  );
}
