/**
 * GenericProductSection
 * ─────────────────────
 * Data-driven section renderer used by ProductSections.tsx.
 * Reads everything from ProductConfig (products.ts) so admin edits
 * (overrides / additions) are reflected without touching this file.
 *
 * Handles all six demo types:
 *   action-cards | search | document-flow |
 *   chart-scenarios | network-map | alerts-map
 */

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Zap, Play, CheckCircle, Search, Sparkles,
  Mail, AlertTriangle, AlertCircle, TrendingUp,
  ExternalLink, Calendar, BookOpen,
} from 'lucide-react';
import type { ProductConfig } from '../config/products';
import { useProducts } from '../store/productStore';

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA({ product }: { product: ProductConfig }) {
  const { products } = useProducts();
  const live = products.find((p) => p.id === product.id);
  const links = live?.links ?? {};
  const hasLinks = links.learnMore || links.requestDemo || links.documentation;
  if (!hasLinks) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: false }}
      className="mt-12 flex flex-wrap gap-4 justify-center"
    >
      {links.learnMore && (
        <a href={links.learnMore} target="_blank" rel="noopener noreferrer"
          className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${product.gradient} rounded-xl font-medium text-white hover:opacity-90 transition-opacity`}>
          <ExternalLink className="w-4 h-4" /> Learn More
        </a>
      )}
      {links.requestDemo && (
        <a href={links.requestDemo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors">
          <Calendar className="w-4 h-4" /> Request Demo
        </a>
      )}
      {links.documentation && (
        <a href={links.documentation} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors">
          <BookOpen className="w-4 h-4" /> Documentation
        </a>
      )}
    </motion.div>
  );
}

// ─── Shared card wrapper ──────────────────────────────────────────────────────

function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 ${className}`}>
      {children}
    </div>
  );
}

// ─── Features list (right-column bottom card) ─────────────────────────────────

function FeatureList({ title, features, accent }: { title: string; features: string[]; accent: string }) {
  return (
    <Card className="p-6">
      <p className="text-lg font-semibold mb-4">{title}</p>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/70">
            <span className={`mt-1 w-2 h-2 rounded-full bg-${accent}-400 shrink-0`} />
            {f}
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Demo panels (one per demo type)
// ═══════════════════════════════════════════════════════════════════════════════

// ── 1. action-cards ───────────────────────────────────────────────────────────

function ActionCardsDemo({ product }: { product: ProductConfig }) {
  if (product.demo.type !== 'action-cards') return null;
  const { agentName, agentStatus, actions, prompts, capabilities } = product.demo.data;
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: agent card */}
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: false }}>
        <Card className="overflow-hidden">
          <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center`}>
              <product.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm">{agentName}</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                {agentStatus}
              </p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {actions.map((action, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }} viewport={{ once: false }}
                onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                className={`rounded-2xl border p-4 transition-all cursor-pointer ${
                  active === i ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{action.label}</p>
                      <p className="text-xs text-white/50">{action.status}</p>
                    </div>
                  </div>
                  {action.progress === 0 && (
                    <button className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Play className="w-3 h-3" />
                    </button>
                  )}
                  {action.progress === 100 && <CheckCircle className="w-5 h-5 text-green-400" />}
                </div>
                {action.progress > 0 && action.progress < 100 && (
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${action.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }} viewport={{ once: false }}
                      className={`h-full bg-gradient-to-r ${product.gradient}`} />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Prompts */}
            <Card className="p-4 bg-white/3">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-medium mb-2">Try natural language:</p>
                  {prompts.map((p, i) => (
                    <p key={i} className="text-xs text-white/60">{p}</p>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </motion.div>

      {/* Right: KPIs + features */}
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }} viewport={{ once: false }}
        className="space-y-5">
        {capabilities.map((cap, i) => (
          <Card key={i} className="p-6">
            <p className="text-sm text-white/50 mb-2">{cap.title}</p>
            <div className="flex items-end justify-between">
              <p className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${product.gradient}`}>
                {cap.value}
              </p>
              <p className="text-sm text-green-400 font-medium">{cap.trend}</p>
            </div>
          </Card>
        ))}
        <FeatureList
          title={product.demo.data.featureTitle}
          features={product.demo.data.features}
          accent={product.accent}
        />
      </motion.div>
    </div>
  );
}

// ── 2. search ─────────────────────────────────────────────────────────────────

function SearchDemo({ product }: { product: ProductConfig }) {
  if (product.demo.type !== 'search') return null;
  const { query, aiAnswerText, resultsLabel, results, metrics, dataSources } = product.demo.data;
  const [selected, setSelected] = useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left */}
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: false }}>
        <Card className="overflow-hidden">
          {/* Search bar */}
          <div className="p-5 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input readOnly value={query}
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-sm outline-none" />
              <Sparkles className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-${product.accent}-400`} />
            </div>
          </div>
          {/* AI answer */}
          <div className={`p-5 border-b border-white/10 bg-gradient-to-br from-${product.accent}-500/10 to-transparent`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 bg-gradient-to-br ${product.gradient} rounded-lg flex items-center justify-center shrink-0`}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className={`text-xs font-medium text-${product.accent}-300 mb-2`}>AI Answer</p>
                <p className="text-sm text-white/80 leading-relaxed">{aiAnswerText}</p>
              </div>
            </div>
          </div>
          {/* Results */}
          <div className="p-5 space-y-3">
            <p className="text-xs text-white/40">{resultsLabel}</p>
            {results.map((r, i) => {
              const Icon = r.icon;
              return (
                <button key={i} onClick={() => setSelected(i)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selected === i
                      ? `bg-${product.accent}-500/10 border-${product.accent}-500/30`
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{r.title}
                        <span className="text-xs text-white/40 ml-2">{r.resultType}</span>
                      </p>
                      <p className="text-xs text-white/50 truncate">{r.snippet}</p>
                      <p className="text-xs text-white/30 mt-0.5">Source: {r.source}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Right */}
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }} viewport={{ once: false }}
        className="space-y-5">
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <Card key={i} className="p-4 text-center">
              <p className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${product.gradient} mb-1`}>{m.value}</p>
              <p className="text-xs text-white/50">{m.label}</p>
            </Card>
          ))}
        </div>
        <Card className="p-6">
          <p className="text-sm font-semibold mb-4">Connected Data Sources</p>
          <div className="grid grid-cols-2 gap-2">
            {dataSources.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-center text-white/70">{s}</div>
            ))}
          </div>
        </Card>
        <FeatureList
          title={product.demo.data.featureTitle}
          features={product.demo.data.features}
          accent={product.accent}
        />
      </motion.div>
    </div>
  );
}

// ── 3. document-flow ─────────────────────────────────────────────────────────

function DocumentFlowDemo({ product }: { product: ProductConfig }) {
  if (product.demo.type !== 'document-flow') return null;
  const { docSubject, docAttachment, flowSteps, extractedData, stats, exceptionRules } = product.demo.data;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left */}
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: false }}
        className="space-y-5">
        <Card className="p-6">
          <p className="font-semibold mb-5">Document Processing Flow</p>
          {flowSteps.map((step, i) => {
            const Icon = step.icon;
            const done = step.status === 'complete';
            return (
              <div key={i}>
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }} viewport={{ once: false }}
                  className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 ${
                    done ? 'bg-green-500/20 border-green-500' : 'bg-orange-500/20 border-orange-500'
                  }`}>
                    <Icon className={`w-5 h-5 ${done ? 'text-green-400' : 'text-orange-400'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className={`text-xs ${done ? 'text-green-400' : 'text-orange-400'}`}>
                      {done ? 'Complete' : 'Processing…'}
                    </p>
                  </div>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.12 }} viewport={{ once: false }}
                    className="w-0.5 h-6 bg-gradient-to-b from-green-500 to-orange-500 ml-5 my-1.5 origin-top" />
                )}
              </div>
            );
          })}
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-white/5 border-b border-white/10 px-5 py-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium">Incoming Document</span>
          </div>
          <div className="p-5">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1">
              <p className="text-xs text-white/50">Subject: {docSubject}</p>
              <p className="text-sm">Attachment: {docAttachment}</p>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400">Auto-processed &amp; validated</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Right */}
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }} viewport={{ once: false }}
        className="space-y-5">
        <Card className="p-6">
          <p className="font-semibold mb-4">Extracted Data</p>
          <div className="space-y-3">
            {extractedData.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-white/50">{item.field}</span>
                  <span className="text-xs text-green-400">{item.confidence}% confident</span>
                </div>
                <p className="text-sm font-medium">{item.value}</p>
                <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.confidence}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.08 }} viewport={{ once: false }}
                    className={`h-full bg-gradient-to-r ${product.gradient}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <Card key={i} className="p-4 text-center">
              <p className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${product.gradient} mb-0.5`}>{s.value}</p>
              <p className="text-xs text-white/50 mb-1">{s.label}</p>
              <p className="text-xs text-green-400">{s.change}</p>
            </Card>
          ))}
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <p className="font-medium text-sm">Smart Exception Handling</p>
          </div>
          <ul className="space-y-2">
            {exceptionRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 shrink-0" />
                {rule}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}

// ── 4. chart-scenarios ───────────────────────────────────────────────────────

function ChartScenariosDemo({ product }: { product: ProductConfig }) {
  if (product.demo.type !== 'chart-scenarios') return null;
  const { scenarios, elasticityBands, recommendations, insights } = product.demo.data;
  const [activeId, setActiveId] = useState(scenarios[0]?.id ?? '');
  const activeScenario = scenarios.find((s) => s.id === activeId) ?? scenarios[0];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: chart */}
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: false }}
        className="space-y-5">
        {/* Scenario tabs */}
        <div className="flex gap-2 flex-wrap">
          {scenarios.map((s) => (
            <button key={s.id} onClick={() => setActiveId(s.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeId === s.id
                  ? `bg-gradient-to-r ${s.color} text-white`
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}>
              {s.label}
            </button>
          ))}
        </div>

        <Card className="p-5">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{activeScenario?.revenue}</p>
              <p className="text-xs text-white/50">Projected Revenue</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">{activeScenario?.margin}</p>
              <p className="text-xs text-white/50">Margin</p>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeScenario?.chartData ?? []}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem' }} />
                <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#chartGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold mb-3">Price Elasticity by Category</p>
          <div className="space-y-3">
            {elasticityBands.map((band, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-white/50 mb-1">
                  <span>{band.category}</span>
                  <span>{band.label}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${band.widthClass} bg-gradient-to-r ${band.barGradient} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Right: recommendations + insights */}
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }} viewport={{ once: false }}
        className="space-y-5">
        {recommendations.map((rec, i) => {
          const Icon = rec.icon;
          return (
            <Card key={i} className="p-5">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl bg-${rec.color}-500/20 flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 text-${rec.color}-400`} />
                </div>
                <div>
                  <p className="font-medium text-sm">{rec.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{rec.description}{' '}
                    <span className={`text-${rec.color}-400 font-semibold`}>{rec.highlight}</span>
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
        <div className="grid grid-cols-3 gap-3">
          {insights.map((ins, i) => (
            <Card key={i} className="p-4 text-center">
              <p className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${product.gradient}`}>{ins.value}</p>
              <p className="text-xs text-white/50 mt-0.5">{ins.label}</p>
            </Card>
          ))}
        </div>
        <FeatureList
          title={product.demo.data.featureTitle}
          features={product.demo.data.features}
          accent={product.accent}
        />
      </motion.div>
    </div>
  );
}

// ── 5. network-map ────────────────────────────────────────────────────────────

function NetworkMapDemo({ product }: { product: ProductConfig }) {
  if (product.demo.type !== 'network-map') return null;
  const { nodes, connections, constraints, scenarios, insights } = product.demo.data;
  const [activeScenario, setActiveScenario] = useState(0);

  const nodeColors: Record<string, string> = {
    Supplier: 'bg-blue-500', Warehouse: 'bg-purple-500', DC: 'bg-green-500', Customer: 'bg-yellow-500',
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: SVG map + constraints */}
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: false }}
        className="space-y-5">
        <Card className="overflow-hidden">
          <div className="bg-white/5 border-b border-white/10 px-5 py-3">
            <p className="text-sm font-semibold">Supply Network</p>
          </div>
          <div className="relative h-64 p-4">
            <svg className="absolute inset-0 w-full h-full">
              {connections.map((c, i) => (
                <line key={i}
                  x1={`${c.x1}%`} y1={`${c.y1}%`}
                  x2={`${c.x2}%`} y2={`${c.y2}%`}
                  stroke={c.warning ? 'rgba(251,191,36,0.5)' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={c.warning ? 2 : 1}
                  strokeDasharray={c.warning ? '4 3' : undefined}
                />
              ))}
            </svg>
            {nodes.map((node) => (
              <div key={node.id} className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}>
                <div className={`w-3 h-3 rounded-full ${nodeColors[node.nodeType]} ${
                  node.status === 'warning' ? 'ring-2 ring-yellow-400' : ''
                }`} title={`${node.nodeType} — ${node.status}`} />
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="px-5 pb-4 flex flex-wrap gap-3">
            {Object.entries(nodeColors).map(([type, cls]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${cls}`} />
                <span className="text-xs text-white/50">{type}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold mb-3">Constraints</p>
          <div className="space-y-2">
            {constraints.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-white/60">{c.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{c.value}</span>
                  <span className={`w-2 h-2 rounded-full ${c.status === 'met' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Right: scenarios + insights */}
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }} viewport={{ once: false }}
        className="space-y-5">
        <div className="flex gap-2 flex-wrap">
          {scenarios.map((s, i) => (
            <button key={i} onClick={() => setActiveScenario(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeScenario === i
                  ? `bg-gradient-to-r ${s.color} text-white`
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}>
              {s.name}
            </button>
          ))}
        </div>
        <Card className="p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            {Object.entries(scenarios[activeScenario]?.metrics ?? {}).map(([key, val]) => (
              <div key={key}>
                <p className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${product.gradient}`}>{val as string}</p>
                <p className="text-xs text-white/50 capitalize">{key}</p>
              </div>
            ))}
          </div>
        </Card>
        {insights.map((ins, i) => {
          const Icon = ins.icon;
          return (
            <Card key={i} className="p-5">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl bg-${ins.color}-500/20 flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 text-${ins.color}-400`} />
                </div>
                <div>
                  <p className="font-medium text-sm">{ins.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{ins.description}{' '}
                    <span className={`text-${ins.color}-400 font-semibold`}>{ins.highlight}</span>
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
        <FeatureList
          title={product.demo.data.featureTitle}
          features={product.demo.data.features}
          accent={product.accent}
        />
      </motion.div>
    </div>
  );
}

// ── 6. alerts-map ─────────────────────────────────────────────────────────────

function AlertsMapDemo({ product }: { product: ProductConfig }) {
  if (product.demo.type !== 'alerts-map') return null;
  const { alerts, locationMarkers, metrics, recommendations } = product.demo.data;
  const [activeAlert, setActiveAlert] = useState<number | null>(null);

  const alertColors = { critical: 'red', warning: 'yellow', info: 'blue' };
  const impactBg = { High: 'bg-red-500/20 text-red-400', Medium: 'bg-yellow-500/20 text-yellow-400', Low: 'bg-blue-500/20 text-blue-400' };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: map + alerts */}
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: false }}
        className="space-y-5">
        <Card className="overflow-hidden">
          <div className="bg-white/5 border-b border-white/10 px-5 py-3">
            <p className="text-sm font-semibold">Global Operations Map</p>
          </div>
          {/* Simplified world map area */}
          <div className="relative h-48 bg-gradient-to-br from-slate-900 to-slate-800 m-4 rounded-xl overflow-hidden">
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(to right,rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.3) 1px,transparent 1px)',
                backgroundSize: '20% 33%',
              }} />
            {/* Location dots */}
            {locationMarkers.map((m, i) => (
              <div key={i} className="absolute w-2 h-2 bg-blue-400/60 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${m.x}%`, top: `${m.y}%` }} />
            ))}
            {/* Alert markers */}
            {alerts.map((a) => {
              const col = alertColors[a.alertType];
              return (
                <button key={a.id} onClick={() => setActiveAlert(activeAlert === a.id ? null : a.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all`}
                  style={{ left: `${a.location.x}%`, top: `${a.location.y}%` }}>
                  <div className={`w-4 h-4 bg-${col}-500 rounded-full flex items-center justify-center`}>
                    <AlertTriangle className="w-2.5 h-2.5 text-white" />
                  </div>
                  {activeAlert === a.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/90 border border-white/20 rounded-xl px-3 py-2 w-48 text-left z-10 pointer-events-none">
                      <p className="text-xs font-medium">{a.title}</p>
                      <p className="text-xs text-white/50 mt-0.5">{a.description}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {/* Alert list */}
          <div className="px-4 pb-4 space-y-2">
            {alerts.map((a) => {
              const col = alertColors[a.alertType];
              const imp = impactBg[a.impact];
              return (
                <div key={a.id} className={`flex items-start gap-3 p-3 rounded-xl border ${
                  activeAlert === a.id
                    ? `bg-${col}-500/10 border-${col}-500/30`
                    : 'bg-white/5 border-white/10'
                }`}>
                  <AlertTriangle className={`w-4 h-4 text-${col}-400 shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-white/50 truncate">{a.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${imp}`}>{a.impact}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Right: metrics + recommendations */}
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }} viewport={{ once: false }}
        className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <Card key={i} className="p-4 text-center">
                <Icon className="w-4 h-4 text-white/40 mx-auto mb-1" />
                <p className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${product.gradient}`}>{m.value}</p>
                <p className="text-xs text-white/40">{m.label}</p>
                <p className="text-xs text-green-400 mt-0.5">{m.trend}</p>
              </Card>
            );
          })}
        </div>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <p className="font-semibold text-sm">AI Recommendations</p>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div key={i} className={`p-3 rounded-xl bg-${rec.color}-500/10 border border-${rec.color}-500/20`}>
                <p className="text-sm font-medium">{rec.title}</p>
                <p className="text-xs text-white/50 mt-0.5">{rec.description}</p>
                <p className={`text-xs text-${rec.color}-400 font-semibold mt-1`}>{rec.impact}</p>
              </div>
            ))}
          </div>
        </Card>
        <FeatureList
          title={product.demo.data.featureTitle}
          features={product.demo.data.features}
          accent={product.accent}
        />
      </motion.div>
    </div>
  );
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

function DemoPanel({ product }: { product: ProductConfig }) {
  switch (product.demo.type) {
    case 'action-cards':    return <ActionCardsDemo product={product} />;
    case 'search':          return <SearchDemo product={product} />;
    case 'document-flow':   return <DocumentFlowDemo product={product} />;
    case 'chart-scenarios': return <ChartScenariosDemo product={product} />;
    case 'network-map':     return <NetworkMapDemo product={product} />;
    case 'alerts-map':      return <AlertsMapDemo product={product} />;
    default:                return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main export
// ═══════════════════════════════════════════════════════════════════════════════

interface Props {
  product: ProductConfig;
}

export function GenericProductSection({ product }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const Icon = product.icon;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      id={`product-${product.id}`}
      ref={containerRef}
      className={`min-h-screen relative flex items-center justify-center py-20 px-6 bg-gradient-to-b from-black ${product.bgTint} to-black`}
    >
      <motion.div style={{ opacity }} className="max-w-7xl w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold">{product.name}</h2>
              <p className="text-xl text-white/60 mt-1">{product.tagline}</p>
            </div>
          </div>
        </motion.div>

        {/* Demo content */}
        <DemoPanel product={product} />

        {/* CTA buttons */}
        <CTA product={product} />
      </motion.div>
    </section>
  );
}
