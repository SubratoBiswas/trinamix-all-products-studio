import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Search, Sparkles, FileText, Users, Database } from 'lucide-react';
import { ProductCTA } from '../ProductCTA';

export function Ariv() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedResult, setSelectedResult] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const searchResults = [
    {
      title: 'Q2 Inventory Report',
      type: 'Document',
      icon: FileText,
      snippet: 'Current inventory levels across all SKUs with risk assessment...',
      source: 'ERP System',
    },
    {
      title: 'Supply Chain Policy 2026',
      type: 'Policy',
      icon: Database,
      snippet: 'Updated guidelines for vendor management and procurement...',
      source: 'SharePoint',
    },
    {
      title: 'Sales Team Dashboard',
      type: 'Dashboard',
      icon: Users,
      snippet: 'Real-time sales metrics and performance indicators...',
      source: 'Tableau',
    },
  ];

  const metrics = [
    { label: 'Data Sources', value: '47+' },
    { label: 'Avg Response Time', value: '1.2s' },
    { label: 'Accuracy', value: '98.7%' },
  ];

  return (
    <section
      id="product-ariv"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6 bg-gradient-to-b from-black via-purple-950/10 to-black"
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold">Ariv</h2>
              <p className="text-xl text-white/60 mt-2">
                Enterprise search with AI-powered answers
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Search Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
              {/* Search Bar */}
              <div className="p-6 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search across all your enterprise data..."
                    className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-purple-500/50 transition-colors"
                    defaultValue="What's our current inventory risk?"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* AI Answer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false }}
                className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-b border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-300 mb-2">AI Answer</div>
                    <div className="text-sm text-white/90 leading-relaxed">
                      Based on current inventory data, <span className="text-purple-300 font-medium">3 SKUs are at high risk</span> with 
                      stock levels below safety thresholds. SKU-1024 (Office Supplies) requires immediate attention with 
                      only 4 days of stock remaining. Recommended action: increase purchase order by 2,500 units.
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-xs transition-colors">
                        View Full Report
                      </button>
                      <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-colors">
                        Create Order
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Search Results */}
              <div className="p-6">
                <div className="text-xs text-white/60 mb-4">
                  Found 127 results across 8 systems
                </div>
                <div className="space-y-3">
                  {searchResults.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: false }}
                        onClick={() => setSelectedResult(index)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          selectedResult === index
                            ? 'bg-purple-500/10 border-purple-500/30'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            selectedResult === index
                              ? 'bg-purple-500/20'
                              : 'bg-white/10'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-medium text-sm truncate">{result.title}</div>
                              <span className="text-xs text-white/40">{result.type}</span>
                            </div>
                            <div className="text-xs text-white/60 line-clamp-1">
                              {result.snippet}
                            </div>
                            <div className="text-xs text-white/40 mt-1">
                              Source: {result.source}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats and Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: false }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center"
                >
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-white/60">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Data Sources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="text-lg font-medium mb-4">Connected Data Sources</div>
              <div className="grid grid-cols-2 gap-3">
                {['SAP', 'Salesforce', 'SharePoint', 'Tableau', 'Jira', 'Confluence', 'Slack', 'Google Drive'].map(
                  (source, index) => (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-center"
                    >
                      {source}
                    </div>
                  )
                )}
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
              <div className="text-lg font-medium mb-4">Key Features</div>
              <div className="space-y-3">
                {[
                  'Semantic search across all systems',
                  'Real-time index updates',
                  'Permission-aware results',
                  'Natural language queries',
                  'Citation tracking',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    </div>
                    <div className="text-sm text-white/70">{feature}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <ProductCTA productId="ariv" accentGradient="from-purple-500 to-pink-500" />
      </motion.div>
    </section>
  );
}
