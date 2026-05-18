import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Network, Package, Truck, DollarSign, Clock, TrendingDown } from 'lucide-react';
import { ProductCTA } from '../ProductCTA';

export function SNO() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedScenario, setSelectedScenario] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const scenarios = [
    {
      name: 'Cost Optimization',
      metrics: {
        cost: '$2.4M',
        service: '94%',
        capacity: '78%',
      },
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Service Priority',
      metrics: {
        cost: '$2.8M',
        service: '99%',
        capacity: '85%',
      },
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Balanced',
      metrics: {
        cost: '$2.6M',
        service: '97%',
        capacity: '82%',
      },
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const networkNodes = [
    { id: 'supplier1', type: 'Supplier', x: 15, y: 20, status: 'active' },
    { id: 'supplier2', type: 'Supplier', x: 15, y: 50, status: 'active' },
    { id: 'supplier3', type: 'Supplier', x: 15, y: 80, status: 'warning' },
    { id: 'warehouse1', type: 'Warehouse', x: 40, y: 35, status: 'active' },
    { id: 'warehouse2', type: 'Warehouse', x: 40, y: 65, status: 'active' },
    { id: 'dc1', type: 'DC', x: 65, y: 30, status: 'active' },
    { id: 'dc2', type: 'DC', x: 65, y: 70, status: 'active' },
    { id: 'customer1', type: 'Customer', x: 85, y: 20, status: 'active' },
    { id: 'customer2', type: 'Customer', x: 85, y: 50, status: 'active' },
    { id: 'customer3', type: 'Customer', x: 85, y: 80, status: 'active' },
  ];

  const constraints = [
    { label: 'Lead Time', value: '< 3 days', status: 'met' },
    { label: 'Capacity', value: '< 90%', status: 'met' },
    { label: 'Cost Target', value: '< $2.5M', status: 'at-risk' },
    { label: 'Service Level', value: '> 95%', status: 'met' },
  ];

  return (
    <section
      id="product-sno"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6 bg-gradient-to-b from-black via-indigo-950/10 to-black"
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
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Network className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold">SNO</h2>
              <p className="text-xl text-white/60 mt-2">
                Supply Network Optimization & Scenario Planning
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Network Map */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <div className="text-lg font-medium mb-4">Supply Network</div>
              
              <div className="relative h-96 bg-black/30 rounded-xl overflow-hidden">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Supplier to Warehouse connections */}
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: false }}
                    x1="15%" y1="20%" x2="40%" y2="35%"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="2"
                  />
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: false }}
                    x1="15%" y1="50%" x2="40%" y2="35%"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="2"
                  />
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    viewport={{ once: false }}
                    x1="15%" y1="80%" x2="40%" y2="65%"
                    stroke="rgba(239, 68, 68, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  
                  {/* Warehouse to DC connections */}
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: false }}
                    x1="40%" y1="35%" x2="65%" y2="30%"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="2"
                  />
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    viewport={{ once: false }}
                    x1="40%" y1="65%" x2="65%" y2="70%"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="2"
                  />

                  {/* DC to Customer connections */}
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    viewport={{ once: false }}
                    x1="65%" y1="30%" x2="85%" y2="20%"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="2"
                  />
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                    viewport={{ once: false }}
                    x1="65%" y1="30%" x2="85%" y2="50%"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="2"
                  />
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    viewport={{ once: false }}
                    x1="65%" y1="70%" x2="85%" y2="80%"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="2"
                  />
                </svg>

                {/* Network Nodes */}
                {networkNodes.map((node, index) => {
                  const Icon = node.type === 'Supplier' ? Package : 
                              node.type === 'Warehouse' ? Truck : 
                              node.type === 'DC' ? Network : Package;
                  
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      viewport={{ once: false }}
                      className="absolute"
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        node.status === 'warning'
                          ? 'bg-red-500/20 border-2 border-red-500'
                          : 'bg-indigo-500/20 border-2 border-indigo-500'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          node.status === 'warning' ? 'text-red-400' : 'text-indigo-400'
                        }`} />
                      </div>
                      {node.status === 'warning' && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-indigo-400" />
                  <span className="text-white/60">Supplier</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-400" />
                  <span className="text-white/60">Warehouse</span>
                </div>
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-indigo-400" />
                  <span className="text-white/60">DC</span>
                </div>
              </div>
            </div>

            {/* Constraints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="text-lg font-medium mb-4">Constraints & Targets</div>
              <div className="space-y-3">
                {constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        constraint.status === 'met' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <span className="text-sm">{constraint.label}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      constraint.status === 'met' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {constraint.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Scenarios & Optimization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Scenario Selector */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <div className="text-lg font-medium mb-4">Optimization Scenarios</div>
              <div className="space-y-3">
                {scenarios.map((scenario, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: false }}
                    onClick={() => setSelectedScenario(index)}
                    className={`w-full p-4 rounded-xl border transition-all ${
                      selectedScenario === index
                        ? `bg-gradient-to-br ${scenario.color} border-white/30`
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium mb-3">{scenario.name}</div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <div className="flex items-center gap-1 text-xs text-white/60 mb-1">
                            <DollarSign className="w-3 h-3" />
                            Cost
                          </div>
                          <div className="text-sm font-bold">{scenario.metrics.cost}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-xs text-white/60 mb-1">
                            <TrendingDown className="w-3 h-3" />
                            Service
                          </div>
                          <div className="text-sm font-bold">{scenario.metrics.service}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-xs text-white/60 mb-1">
                            <Clock className="w-3 h-3" />
                            Capacity
                          </div>
                          <div className="text-sm font-bold">{scenario.metrics.capacity}</div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Optimization Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="text-lg font-medium mb-4">Optimization Insights</div>
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Network className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Route Optimization</div>
                      <div className="text-xs text-white/70">
                        3 alternate routes identified. Potential savings: <span className="text-blue-400 font-medium">$124K/year</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Inventory Rebalancing</div>
                      <div className="text-xs text-white/70">
                        Move 2,400 units from Warehouse A to B. Reduces lead time by <span className="text-green-400 font-medium">1.2 days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Carrier Mix Adjustment</div>
                      <div className="text-xs text-white/70">
                        Shift 15% volume to Carrier B. Improves service level to <span className="text-purple-400 font-medium">98.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="text-lg font-medium mb-4">Capabilities</div>
              <div className="space-y-3">
                {[
                  'Multi-objective optimization',
                  'What-if scenario modeling',
                  'Constraint-based planning',
                  'Real-time network simulation',
                  'Cost-service tradeoff analysis',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                    </div>
                    <div className="text-sm text-white/70">{feature}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <ProductCTA productId="sno" accentGradient="from-indigo-500 to-blue-500" />
      </motion.div>
    </section>
  );
}
