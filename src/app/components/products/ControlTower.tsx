import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Radio, MapPin, AlertTriangle, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import { ProductCTA } from '../ProductCTA';

export function ControlTower() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAlert, setSelectedAlert] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Port Delay - Shanghai',
      description: '12 shipments affected, 3-day delay expected',
      location: { x: 75, y: 40 },
      impact: 'High',
      recommendation: 'Reroute via Busan port',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Weather Alert - Midwest',
      description: 'Severe weather impacting 8 delivery routes',
      location: { x: 35, y: 35 },
      impact: 'Medium',
      recommendation: 'Delay non-critical shipments by 24h',
    },
    {
      id: 3,
      type: 'info',
      title: 'Capacity Alert - Warehouse B',
      description: 'Operating at 89% capacity',
      location: { x: 45, y: 60 },
      impact: 'Low',
      recommendation: 'Schedule inventory rebalancing',
    },
  ];

  const metrics = [
    { label: 'Active Shipments', value: '2,847', trend: '+12%', icon: TrendingUp },
    { label: 'On-Time Delivery', value: '96.4%', trend: '+2.1%', icon: CheckCircle },
    { label: 'Active Alerts', value: '23', trend: '-8', icon: AlertTriangle },
  ];

  const aiRecommendations = [
    {
      title: 'Expedite Shipment #8847',
      description: 'High-priority order at risk. Recommend air freight upgrade.',
      impact: 'Prevents $45K penalty',
      color: 'red',
    },
    {
      title: 'Alternative Route Available',
      description: '18% faster route identified for 5 shipments via alternate port.',
      impact: 'Saves 2.3 days',
      color: 'blue',
    },
    {
      title: 'Proactive Inventory Move',
      description: 'Demand spike predicted in Region C. Move 1,200 units now.',
      impact: 'Prevents stockout',
      color: 'green',
    },
  ];

  return (
    <section
      id="product-control-tower"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6 bg-gradient-to-b from-black via-yellow-950/10 to-black"
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
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Radio className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold">Control Tower</h2>
              <p className="text-xl text-white/60 mt-2">
                Real-time visibility, intelligent alerts & AI recommendations
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Map & Alerts */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Global Map View */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <div className="text-lg font-medium mb-4">Global Operations View</div>
              
              <div className="relative h-80 bg-black/30 rounded-xl overflow-hidden">
                {/* World Map Grid */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Shipping Routes */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.path
                    d="M 20% 50% Q 40% 30%, 60% 40%"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    viewport={{ once: false }}
                  />
                  <motion.path
                    d="M 30% 60% Q 50% 70%, 70% 50%"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.7 }}
                    viewport={{ once: false }}
                  />
                </svg>

                {/* Alert Markers */}
                {alerts.map((alert, index) => (
                  <motion.button
                    key={alert.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: false }}
                    onClick={() => setSelectedAlert(index)}
                    className="absolute"
                    style={{
                      left: `${alert.location.x}%`,
                      top: `${alert.location.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: selectedAlert === index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: alert.type === 'critical' ? Infinity : 0,
                      }}
                      className="relative"
                    >
                      {/* Pulse Ring for Critical */}
                      {alert.type === 'critical' && (
                        <motion.div
                          animate={{
                            scale: [1, 2],
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute inset-0 bg-red-500 rounded-full"
                        />
                      )}
                      
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                        alert.type === 'critical'
                          ? 'bg-red-500/30 border-2 border-red-500'
                          : alert.type === 'warning'
                          ? 'bg-yellow-500/30 border-2 border-yellow-500'
                          : 'bg-blue-500/30 border-2 border-blue-500'
                      }`}>
                        <AlertTriangle className={`w-6 h-6 ${
                          alert.type === 'critical'
                            ? 'text-red-400'
                            : alert.type === 'warning'
                            ? 'text-yellow-400'
                            : 'text-blue-400'
                        }`} />
                      </div>
                    </motion.div>
                  </motion.button>
                ))}

                {/* Location Markers */}
                {[
                  { x: 25, y: 45 },
                  { x: 55, y: 35 },
                  { x: 80, y: 55 },
                ].map((loc, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                    viewport={{ once: false }}
                    className="absolute"
                    style={{
                      left: `${loc.x}%`,
                      top: `${loc.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-8 h-8 bg-green-500/30 border-2 border-green-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-400" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-white/60">Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-white/60">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-white/60">Info</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-white/60">Facility</span>
                </div>
              </div>
            </div>

            {/* Alert Details */}
            <motion.div
              key={selectedAlert}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  alerts[selectedAlert].type === 'critical'
                    ? 'bg-red-500/20 border border-red-500/30'
                    : alerts[selectedAlert].type === 'warning'
                    ? 'bg-yellow-500/20 border border-yellow-500/30'
                    : 'bg-blue-500/20 border border-blue-500/30'
                }`}>
                  <AlertTriangle className={`w-6 h-6 ${
                    alerts[selectedAlert].type === 'critical'
                      ? 'text-red-400'
                      : alerts[selectedAlert].type === 'warning'
                      ? 'text-yellow-400'
                      : 'text-blue-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{alerts[selectedAlert].title}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alerts[selectedAlert].impact === 'High'
                        ? 'bg-red-500/20 text-red-400'
                        : alerts[selectedAlert].impact === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {alerts[selectedAlert].impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-white/70 mb-3">
                    {alerts[selectedAlert].description}
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-white/60 mb-1">AI Recommendation</div>
                        <div className="text-sm">{alerts[selectedAlert].recommendation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-sm transition-colors">
                  Take Action
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors">
                  Details
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Metrics & AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: false }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4"
                  >
                    <Icon className="w-6 h-6 text-yellow-400 mb-2" />
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-xs text-white/60 mb-1">{metric.label}</div>
                    <div className="text-xs text-green-400">{metric.trend}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-lg font-medium">AI Recommendations</div>
              </div>

              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: false }}
                    className={`bg-${rec.color}-500/10 border border-${rec.color}-500/30 rounded-xl p-4`}
                  >
                    <div className="font-medium text-sm mb-2">{rec.title}</div>
                    <div className="text-xs text-white/70 mb-3">{rec.description}</div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs text-${rec.color}-400 font-medium`}>
                        {rec.impact}
                      </span>
                      <button className={`px-3 py-1 bg-${rec.color}-500/20 hover:bg-${rec.color}-500/30 rounded-lg text-xs transition-colors`}>
                        Apply
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                  'Real-time shipment tracking',
                  'Predictive disruption alerts',
                  'Multi-modal visibility',
                  'Exception management',
                  'Automated escalation workflows',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </div>
                    <div className="text-sm text-white/70">{feature}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <ProductCTA productId="control-tower" accentGradient="from-yellow-500 to-orange-500" />
      </motion.div>
    </section>
  );
}
