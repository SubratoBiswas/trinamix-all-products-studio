/**
 * ═══════════════════════════════════════════════════════════════════════
 *  MASTER PRODUCT REGISTRY
 *
 *  This is the ONLY file you need to edit to:
 *    • Add a new product to the landing page
 *    • Update any product's name, description, metrics, or demo data
 *    • Set/change product URLs (learnMore, requestDemo, documentation)
 *    • Change the hub network graph layout (hubPosition)
 *
 *  HOW TO ADD A NEW PRODUCT
 *  ────────────────────────
 *  1. Add a new entry to the PRODUCTS array below.
 *  2. Choose a `demo.type` from the existing types, or create a new
 *     demo component in src/app/components/demos/ and add its type here.
 *  3. That's it — the hub graph, product sections, and CTA buttons all
 *     update automatically.
 *
 *  DEMO TYPES AVAILABLE
 *  ────────────────────
 *  'action-cards'     → AI agent with action list + NL prompts (EnterpriseAI style)
 *  'search'           → Enterprise search with AI answer panel (Ariv style)
 *  'document-flow'    → Document ingestion + extraction preview (Documantra style)
 *  'chart-scenarios'  → Scenario switcher + Recharts area chart (PriceSenseAI style)
 *  'network-map'      → Supply network SVG with nodes + scenario picker (SNO style)
 *  'alerts-map'       → Global map with alert markers + AI recs (ControlTower style)
 * ═══════════════════════════════════════════════════════════════════════
 */

import type { LucideIcon } from 'lucide-react';
import {
  Brain, Search, FileText, TrendingUp, Network, Radio,
  Mail, ArrowRight, CheckCircle, AlertCircle,
  Users, Database, Zap, DollarSign, TrendingDown,
  Package, Truck, MapPin, AlertTriangle, CheckCircle as CheckIcon,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductLinks {
  learnMore?: string;       // e.g. 'https://trinamix.com/ariv'
  requestDemo?: string;     // e.g. 'https://calendly.com/trinamix/demo'
  documentation?: string;   // e.g. 'https://docs.trinamix.com/ariv'
}

// ─────────────────────────────────────────────────────────────────────────────
// Demo data types (one interface per demo type)
// ─────────────────────────────────────────────────────────────────────────────

/* ── action-cards ── */
export interface ActionItem {
  label: string;
  status: string;
  progress: number;   // 0 = not started, 1–99 = running, 100 = done
}
export interface CapabilityMetric {
  title: string;
  value: string;
  trend: string;
}
export interface ActionCardsData {
  agentName: string;
  agentStatus: string;
  actions: ActionItem[];
  prompts: string[];
  capabilities: CapabilityMetric[];
  featureTitle: string;
  features: string[];
}

/* ── search ── */
export interface SearchResult {
  title: string;
  resultType: string;
  icon: LucideIcon;
  snippet: string;
  source: string;
}
export interface SearchData {
  query: string;
  aiAnswerText: string;
  resultsLabel: string;
  results: SearchResult[];
  metrics: Array<{ label: string; value: string }>;
  dataSources: string[];
  featureTitle: string;
  features: string[];
}

/* ── document-flow ── */
export interface FlowStep {
  icon: LucideIcon;
  label: string;
  status: 'complete' | 'processing';
}
export interface ExtractedField {
  field: string;
  value: string;
  confidence: number;
}
export interface DocumentFlowData {
  docSubject: string;
  docAttachment: string;
  flowSteps: FlowStep[];
  extractedData: ExtractedField[];
  stats: Array<{ label: string; value: string; change: string }>;
  exceptionRules: string[];
  featureTitle: string;
  features: string[];
}

/* ── chart-scenarios ── */
export interface ChartPoint {
  month: string;
  revenue: number;
  elasticity: number;
}
export interface PriceScenario {
  id: string;
  label: string;
  revenue: string;
  margin: string;
  color: string;        // Tailwind gradient e.g. 'from-green-500 to-emerald-500'
  chartData: ChartPoint[];
}
export interface ElasticityBand {
  category: string;
  label: string;
  widthClass: string;   // Tailwind width e.g. 'w-4/5'
  barGradient: string;  // e.g. 'from-yellow-500 to-orange-500'
}
export interface PriceRecommendation {
  icon: LucideIcon;
  color: string;        // e.g. 'green'
  title: string;
  description: string;
  highlight: string;
}
export interface ChartScenariosData {
  scenarios: PriceScenario[];
  elasticityBands: ElasticityBand[];
  recommendations: PriceRecommendation[];
  insights: Array<{ label: string; value: string }>;
  featureTitle: string;
  features: string[];
}

/* ── network-map ── */
export interface NetworkNode {
  id: string;
  nodeType: 'Supplier' | 'Warehouse' | 'DC' | 'Customer';
  x: number;   // percentage 0–100
  y: number;
  status: 'active' | 'warning';
}
export interface NetworkConnection {
  x1: number; y1: number;
  x2: number; y2: number;
  warning?: boolean;
  delay?: number;
}
export interface OptScenario {
  name: string;
  color: string;
  metrics: { cost: string; service: string; capacity: string };
}
export interface NetworkMapData {
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  constraints: Array<{ label: string; value: string; status: 'met' | 'at-risk' }>;
  scenarios: OptScenario[];
  insights: Array<{ color: string; icon: LucideIcon; title: string; description: string; highlight: string }>;
  featureTitle: string;
  features: string[];
}

/* ── alerts-map ── */
export interface AlertMarker {
  id: number;
  alertType: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  location: { x: number; y: number };
  impact: 'High' | 'Medium' | 'Low';
  recommendation: string;
}
export interface AIRecommendation {
  title: string;
  description: string;
  impact: string;
  color: string;  // e.g. 'red' | 'blue' | 'green'
}
export interface AlertsMapData {
  alerts: AlertMarker[];
  locationMarkers: Array<{ x: number; y: number }>;
  metrics: Array<{ label: string; value: string; trend: string; icon: LucideIcon }>;
  recommendations: AIRecommendation[];
  featureTitle: string;
  features: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Demo config discriminated union
// ─────────────────────────────────────────────────────────────────────────────

export type DemoConfig =
  | { type: 'action-cards';    data: ActionCardsData }
  | { type: 'search';          data: SearchData }
  | { type: 'document-flow';   data: DocumentFlowData }
  | { type: 'chart-scenarios'; data: ChartScenariosData }
  | { type: 'network-map';     data: NetworkMapData }
  | { type: 'alerts-map';      data: AlertsMapData };

// ─────────────────────────────────────────────────────────────────────────────
// Product config
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductConfig {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  gradient: string;     // Tailwind gradient e.g. 'from-blue-500 to-cyan-500'
  accent: string;       // Tailwind color name e.g. 'blue'
  bgTint: string;       // Section background tint e.g. 'via-blue-950/10'
  hubPosition: { x: number; y: number };  // px offset from hub center
  demo: DemoConfig;
  links: ProductLinks;
}

// ─────────────────────────────────────────────────────────────────────────────
// THE REGISTRY — edit here to add / remove / update products
// ─────────────────────────────────────────────────────────────────────────────

export const PRODUCTS: ProductConfig[] = [
  // ── 1. Enterprise AI ───────────────────────────────────────────────────────
  {
    id: 'enterprise-ai',
    name: 'Enterprise AI',
    tagline: 'AI agents that understand, decide, and act',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
    accent: 'blue',
    bgTint: '',
    hubPosition: { x: 0, y: 0 },
    links: {
      learnMore:     '',  // e.g. 'https://trinamix.com/enterprise-ai'
      requestDemo:   '',
      documentation: '',
    },
    demo: {
      type: 'action-cards',
      data: {
        agentName: 'AI Agent',
        agentStatus: 'Processing',
        actions: [
          { label: 'Simulate Q3 Demand',  status: 'Running 2.4M scenarios…', progress: 75  },
          { label: 'Optimize Inventory',  status: 'Complete',                 progress: 100 },
          { label: 'Generate Report',     status: 'Ready to execute',         progress: 0   },
        ],
        prompts: [
          '"Analyze supplier risk and suggest alternatives"',
          '"Run promotion scenario with 20% discount"',
          '"What if we increase production by 15%?"',
        ],
        capabilities: [
          { title: 'Natural Language Actions', value: '200+',      trend: '+15%' },
          { title: 'Automated Decisions',      value: '12.4K/day', trend: '+28%' },
          { title: 'Process Time Saved',       value: '94%',       trend: '+8%'  },
        ],
        featureTitle: 'Key Capabilities',
        features: [
          'Decision automation with confidence scoring',
          'Multi-step workflow orchestration',
          'Real-time learning from outcomes',
          'Integration with all enterprise systems',
        ],
      },
    },
  },

  // ── 2. Ariv ────────────────────────────────────────────────────────────────
  {
    id: 'ariv',
    name: 'Ariv',
    tagline: 'Enterprise search with AI-powered answers',
    icon: Search,
    gradient: 'from-purple-500 to-pink-500',
    accent: 'purple',
    bgTint: 'via-purple-950/10',
    hubPosition: { x: 200, y: -100 },
    links: {
      learnMore:     '',
      requestDemo:   '',
      documentation: '',
    },
    demo: {
      type: 'search',
      data: {
        query: "What's our current inventory risk?",
        aiAnswerText:
          'Based on current inventory data, 3 SKUs are at high risk with stock levels below safety thresholds. SKU-1024 (Office Supplies) requires immediate attention with only 4 days of stock remaining. Recommended action: increase purchase order by 2,500 units.',
        resultsLabel: 'Found 127 results across 8 systems',
        results: [
          { title: 'Q2 Inventory Report',      resultType: 'Document',  icon: FileText, snippet: 'Current inventory levels across all SKUs with risk assessment…', source: 'ERP System'  },
          { title: 'Supply Chain Policy 2026', resultType: 'Policy',    icon: Database, snippet: 'Updated guidelines for vendor management and procurement…',       source: 'SharePoint' },
          { title: 'Sales Team Dashboard',     resultType: 'Dashboard', icon: Users,    snippet: 'Real-time sales metrics and performance indicators…',              source: 'Tableau'    },
        ],
        metrics: [
          { label: 'Data Sources',       value: '47+'    },
          { label: 'Avg Response Time',  value: '1.2s'   },
          { label: 'Accuracy',           value: '98.7%'  },
        ],
        dataSources: ['SAP', 'Salesforce', 'SharePoint', 'Tableau', 'Jira', 'Confluence', 'Slack', 'Google Drive'],
        featureTitle: 'Key Features',
        features: [
          'Semantic search across all systems',
          'Real-time index updates',
          'Permission-aware results',
          'Natural language queries',
          'Citation tracking',
        ],
      },
    },
  },

  // ── 3. Documantra ──────────────────────────────────────────────────────────
  {
    id: 'documantra',
    name: 'Documantra',
    tagline: 'Intelligent document processing & automation',
    icon: FileText,
    gradient: 'from-orange-500 to-red-500',
    accent: 'orange',
    bgTint: 'via-orange-950/10',
    hubPosition: { x: -200, y: -100 },
    links: {
      learnMore:     '',
      requestDemo:   '',
      documentation: '',
    },
    demo: {
      type: 'document-flow',
      data: {
        docSubject: 'Invoice from Acme Corp',
        docAttachment: 'invoice_march_2026.pdf',
        flowSteps: [
          { icon: Mail,         label: 'Email Received',    status: 'complete'   },
          { icon: FileText,     label: 'Document Extracted', status: 'complete'   },
          { icon: CheckCircle,  label: 'Data Validated',    status: 'complete'   },
          { icon: ArrowRight,   label: 'ERP Integration',   status: 'processing' },
        ],
        extractedData: [
          { field: 'Invoice Number', value: 'INV-2024-8847', confidence: 99 },
          { field: 'Vendor',         value: 'Acme Corp',     confidence: 98 },
          { field: 'Amount',         value: '$15,240.00',    confidence: 99 },
          { field: 'Due Date',       value: 'Apr 15, 2026',  confidence: 97 },
          { field: 'PO Number',      value: 'PO-45623',      confidence: 95 },
        ],
        stats: [
          { label: 'Processing Time', value: '2.3s',  change: '-87%' },
          { label: 'Accuracy',        value: '99.2%', change: '+12%' },
          { label: 'Auto-processed',  value: '94%',   change: '+31%' },
        ],
        exceptionRules: [
          'Low confidence? Route to human review',
          'Data mismatch? Flag for validation',
          'New format? Learn and adapt',
        ],
        featureTitle: 'Capabilities',
        features: [
          'Invoice & PO extraction',
          'Email attachment processing',
          'ERP / Oracle Fusion integration',
          'Exception routing & audit trail',
          'Continuous model improvement',
        ],
      },
    },
  },

  // ── 4. Price Sense AI ──────────────────────────────────────────────────────
  {
    id: 'pricesense',
    name: 'Price Sense AI',
    tagline: 'Dynamic pricing optimization & elasticity modeling',
    icon: TrendingUp,
    gradient: 'from-green-500 to-emerald-500',
    accent: 'green',
    bgTint: 'via-green-950/10',
    hubPosition: { x: 200, y: 100 },
    links: {
      learnMore:     '',
      requestDemo:   '',
      documentation: '',
    },
    demo: {
      type: 'chart-scenarios',
      data: {
        scenarios: [
          {
            id: 'base',         label: 'Base Case',    revenue: '$5.7M', margin: '32%',
            color: 'from-green-500 to-emerald-500',
            chartData: [
              { month: 'Jan', revenue: 4200, elasticity: 1.20 },
              { month: 'Feb', revenue: 4500, elasticity: 1.15 },
              { month: 'Mar', revenue: 4800, elasticity: 1.10 },
              { month: 'Apr', revenue: 5100, elasticity: 1.05 },
              { month: 'May', revenue: 5400, elasticity: 1.00 },
              { month: 'Jun', revenue: 5700, elasticity: 0.95 },
            ],
          },
          {
            id: 'aggressive',   label: 'Aggressive',   revenue: '$7.8M', margin: '28%',
            color: 'from-blue-500 to-cyan-500',
            chartData: [
              { month: 'Jan', revenue: 4200, elasticity: 1.20 },
              { month: 'Feb', revenue: 4700, elasticity: 1.18 },
              { month: 'Mar', revenue: 5300, elasticity: 1.15 },
              { month: 'Apr', revenue: 6100, elasticity: 1.12 },
              { month: 'May', revenue: 6900, elasticity: 1.08 },
              { month: 'Jun', revenue: 7800, elasticity: 1.05 },
            ],
          },
          {
            id: 'conservative', label: 'Conservative', revenue: '$5.1M', margin: '36%',
            color: 'from-purple-500 to-pink-500',
            chartData: [
              { month: 'Jan', revenue: 4200, elasticity: 1.20 },
              { month: 'Feb', revenue: 4300, elasticity: 1.18 },
              { month: 'Mar', revenue: 4500, elasticity: 1.16 },
              { month: 'Apr', revenue: 4700, elasticity: 1.14 },
              { month: 'May', revenue: 4900, elasticity: 1.12 },
              { month: 'Jun', revenue: 5100, elasticity: 1.10 },
            ],
          },
        ],
        elasticityBands: [
          { category: 'Category A', label: '-1.8 (Elastic)',   widthClass: 'w-4/5', barGradient: 'from-yellow-500 to-orange-500' },
          { category: 'Category B', label: '-0.6 (Inelastic)', widthClass: 'w-1/3', barGradient: 'from-green-500 to-emerald-500' },
          { category: 'Category C', label: '-1.2 (Moderate)',  widthClass: 'w-3/5', barGradient: 'from-blue-500 to-cyan-500'    },
        ],
        recommendations: [
          { icon: TrendingUp, color: 'green',  title: 'Increase SKU-2847 by 8%',          description: 'Low elasticity detected. Est. revenue lift:',              highlight: '$147K'   },
          { icon: Zap,        color: 'blue',   title: 'Promotional Pricing for Category C', description: '15% discount recommended. Expected volume increase:',    highlight: '+24%'    },
          { icon: DollarSign, color: 'purple', title: 'Dynamic Pricing for Peak Hours',    description: 'Implement time-based pricing. Potential uplift:',          highlight: '$89K/mo' },
        ],
        insights: [
          { label: 'Optimal Price Point', value: '$24.99' },
          { label: 'Revenue Lift',        value: '+37%'   },
          { label: 'Volume Impact',       value: '+12%'   },
        ],
        featureTitle: 'Capabilities',
        features: [
          'Real-time price elasticity modeling',
          'Competitive intelligence integration',
          'Multi-variable scenario planning',
          'A/B testing & simulation',
          'Automated price updates',
        ],
      },
    },
  },

  // ── 5. SNO ─────────────────────────────────────────────────────────────────
  {
    id: 'sno',
    name: 'SNO',
    tagline: 'Supply Network Optimization & Scenario Planning',
    icon: Network,
    gradient: 'from-indigo-500 to-blue-500',
    accent: 'indigo',
    bgTint: 'via-indigo-950/10',
    hubPosition: { x: -200, y: 100 },
    links: {
      learnMore:     '',
      requestDemo:   '',
      documentation: '',
    },
    demo: {
      type: 'network-map',
      data: {
        nodes: [
          { id: 'supplier1',  nodeType: 'Supplier',   x: 15, y: 20, status: 'active'  },
          { id: 'supplier2',  nodeType: 'Supplier',   x: 15, y: 50, status: 'active'  },
          { id: 'supplier3',  nodeType: 'Supplier',   x: 15, y: 80, status: 'warning' },
          { id: 'warehouse1', nodeType: 'Warehouse',  x: 40, y: 35, status: 'active'  },
          { id: 'warehouse2', nodeType: 'Warehouse',  x: 40, y: 65, status: 'active'  },
          { id: 'dc1',        nodeType: 'DC',         x: 65, y: 30, status: 'active'  },
          { id: 'dc2',        nodeType: 'DC',         x: 65, y: 70, status: 'active'  },
          { id: 'customer1',  nodeType: 'Customer',   x: 85, y: 20, status: 'active'  },
          { id: 'customer2',  nodeType: 'Customer',   x: 85, y: 50, status: 'active'  },
          { id: 'customer3',  nodeType: 'Customer',   x: 85, y: 80, status: 'active'  },
        ],
        connections: [
          { x1: 15, y1: 20, x2: 40, y2: 35, delay: 0.5 },
          { x1: 15, y1: 50, x2: 40, y2: 35, delay: 0.6 },
          { x1: 15, y1: 80, x2: 40, y2: 65, delay: 0.7, warning: true },
          { x1: 40, y1: 35, x2: 65, y2: 30, delay: 0.8 },
          { x1: 40, y1: 65, x2: 65, y2: 70, delay: 0.9 },
          { x1: 65, y1: 30, x2: 85, y2: 20, delay: 1.0 },
          { x1: 65, y1: 30, x2: 85, y2: 50, delay: 1.1 },
          { x1: 65, y1: 70, x2: 85, y2: 80, delay: 1.2 },
        ],
        constraints: [
          { label: 'Lead Time',     value: '< 3 days', status: 'met'     },
          { label: 'Capacity',      value: '< 90%',    status: 'met'     },
          { label: 'Cost Target',   value: '< $2.5M',  status: 'at-risk' },
          { label: 'Service Level', value: '> 95%',    status: 'met'     },
        ],
        scenarios: [
          { name: 'Cost Optimization', color: 'from-green-500 to-emerald-500', metrics: { cost: '$2.4M', service: '94%', capacity: '78%' } },
          { name: 'Service Priority',  color: 'from-blue-500 to-cyan-500',     metrics: { cost: '$2.8M', service: '99%', capacity: '85%' } },
          { name: 'Balanced',          color: 'from-purple-500 to-pink-500',   metrics: { cost: '$2.6M', service: '97%', capacity: '82%' } },
        ],
        insights: [
          { color: 'blue',   icon: Network,  title: 'Route Optimization',      description: '3 alternate routes identified. Potential savings:',                       highlight: '$124K/year' },
          { color: 'green',  icon: Package,  title: 'Inventory Rebalancing',   description: 'Move 2,400 units from Warehouse A to B. Reduces lead time by',            highlight: '1.2 days'   },
          { color: 'purple', icon: Truck,    title: 'Carrier Mix Adjustment',  description: 'Shift 15% volume to Carrier B. Improves service level to',                highlight: '98.5%'      },
        ],
        featureTitle: 'Capabilities',
        features: [
          'Multi-objective optimization',
          'What-if scenario modeling',
          'Constraint-based planning',
          'Real-time network simulation',
          'Cost-service tradeoff analysis',
        ],
      },
    },
  },

  // ── 6. Control Tower ───────────────────────────────────────────────────────
  {
    id: 'control-tower',
    name: 'Control Tower',
    tagline: 'Real-time visibility, intelligent alerts & AI recommendations',
    icon: Radio,
    gradient: 'from-yellow-500 to-orange-500',
    accent: 'yellow',
    bgTint: 'via-yellow-950/10',
    hubPosition: { x: 0, y: 180 },
    links: {
      learnMore:     '',
      requestDemo:   '',
      documentation: '',
    },
    demo: {
      type: 'alerts-map',
      data: {
        alerts: [
          { id: 1, alertType: 'critical', title: 'Port Delay – Shanghai',    description: '12 shipments affected, 3-day delay expected',  location: { x: 75, y: 40 }, impact: 'High',   recommendation: 'Reroute via Busan port'              },
          { id: 2, alertType: 'warning',  title: 'Weather Alert – Midwest',  description: 'Severe weather impacting 8 delivery routes',   location: { x: 35, y: 35 }, impact: 'Medium', recommendation: 'Delay non-critical shipments by 24h' },
          { id: 3, alertType: 'info',     title: 'Capacity Alert – WH-B',    description: 'Operating at 89% capacity',                   location: { x: 45, y: 60 }, impact: 'Low',    recommendation: 'Schedule inventory rebalancing'      },
        ],
        locationMarkers: [
          { x: 25, y: 45 },
          { x: 55, y: 35 },
          { x: 80, y: 55 },
        ],
        metrics: [
          { label: 'Active Shipments', value: '2,847', trend: '+12%', icon: TrendingUp    },
          { label: 'On-Time Delivery', value: '96.4%', trend: '+2.1%', icon: CheckIcon   },
          { label: 'Active Alerts',    value: '23',    trend: '-8',    icon: AlertTriangle },
        ],
        recommendations: [
          { title: 'Expedite Shipment #8847',    description: 'High-priority order at risk. Recommend air freight upgrade.',               impact: 'Prevents $45K penalty', color: 'red'   },
          { title: 'Alternative Route Available', description: '18% faster route identified for 5 shipments via alternate port.',           impact: 'Saves 2.3 days',        color: 'blue'  },
          { title: 'Proactive Inventory Move',   description: 'Demand spike predicted in Region C. Move 1,200 units now.',                impact: 'Prevents stockout',     color: 'green' },
        ],
        featureTitle: 'Capabilities',
        features: [
          'Real-time shipment tracking',
          'Predictive disruption alerts',
          'Multi-modal visibility',
          'Exception management',
          'Automated escalation workflows',
        ],
      },
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getProduct(id: string): ProductConfig | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
