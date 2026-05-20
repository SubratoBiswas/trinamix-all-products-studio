import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe, ArrowLeft, Plus, Pencil, Trash2, RotateCcw,
  Eye, EyeOff, X, Check, Save, User, Lock,
} from 'lucide-react';
import {
  COLOR_OPTIONS,
  ICON_NAMES,
  ICON_REGISTRY,
  EMPTY_ADMIN_STORAGE,
  type AdminStorage,
  type SerializedProduct,
} from '../config/adminConfig';
import { PRODUCTS } from '../config/products';
import { useProducts } from '../store/productStore';

/* ---------------------------------------------------------- */
/* Auth                                                        */
/* ---------------------------------------------------------- */
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

type LinkKey = 'learnMore' | 'requestDemo' | 'documentation';
const LINK_LABELS: Record<LinkKey, string> = {
  learnMore: 'Learn More',
  requestDemo: 'Request Demo',
  documentation: 'Documentation',
};

function genId() { return 'prod_' + Math.random().toString(36).slice(2, 10); }

const DEFAULT_NEW: Omit<SerializedProduct, 'id'> = {
  name: 'New Product',
  tagline: 'A powerful AI product',
  iconName: 'Brain',
  gradient: 'from-blue-500 to-cyan-500',
  accent: 'blue',
  bgTint: 'via-blue-950/10',
  hubPositionX: 150,
  hubPositionY: -80,
  links: {},
  agentStatus: 'Ready',
  demoActions: [],
  demoPrompts: [],
  demoCapabilities: [],
  demoFeatureTitle: 'Key Capabilities',
  demoFeatures: [],
};

/* ---------------------------------------------------------- */
/* Login screen                                               */
/* ---------------------------------------------------------- */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser]   = useState('');
  const [pass, setPass]   = useState('');
  const [showP, setShowP] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      onLogin();
    } else {
      setError('Invalid credentials');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#13141a] border border-white/10 rounded-2xl p-10 w-full max-w-sm"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Globe className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white text-center mb-1">Trinamix Admin</h1>
        <p className="text-sm text-white/40 text-center mb-8">Sign in to manage your products</p>

        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type={showP ? 'text' : 'password'}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white outline-none focus:border-white/30 transition-colors"
            />
            <button
              onClick={() => setShowP(!showP)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showP ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mt-3">{error}</p>
        )}

        <button
          onClick={submit}
          className="w-full mt-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
        >
          Sign in
        </button>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------- */
/* Hub position canvas                                        */
/* ---------------------------------------------------------- */
function HubCanvas({
  x, y, iconName, gradient,
  onChange,
}: {
  x: number; y: number; iconName: string; gradient: string;
  onChange: (x: number, y: number) => void;
}) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const dragging  = useRef(false);

  const W = 620, H = 260;
  const cx = W / 2, cy = H / 2 + 20;
  const scale = 0.45;

  const nx = cx + x * scale;
  const ny = cy - y * scale;

  const IconComp = ICON_REGISTRY[iconName] ?? ICON_REGISTRY['Brain'];

  const toCoords = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * W;
    const svgY = ((clientY - rect.top) / rect.height) * H;
    const newX = Math.round((svgX - cx) / scale);
    const newY = Math.round((cy - svgY) / scale);
    onChange(newX, newY);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0e14] select-none">
      <svg
        ref={canvasRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 200 }}
        onMouseDown={() => { dragging.current = true; }}
        onMouseMove={(e) => { if (dragging.current) toCoords(e.clientX, e.clientY); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={(e) => { dragging.current = true; toCoords(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchMove={(e) => { if (dragging.current) toCoords(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchEnd={() => { dragging.current = false; }}
      >
        {/* Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />
        {/* Axes */}
        <line x1={cx} y1={0} x2={cx} y2={H} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1={0} y1={cy} x2={W} y2={cy} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        {/* Line hub -> node */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Hub node */}
        <circle cx={cx} cy={cy} r={22} fill="#4c1d95" />
        <text x={cx} y={cy + 5} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Hub</text>
        {/* Product node */}
        <circle cx={nx} cy={ny} r={18} fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" style={{ cursor: 'grab' }} />
        <text x={nx + 28} y={ny - 8} fill="rgba(255,255,255,0.5)" fontSize="10">{x},{y}</text>
      </svg>
      <div className="flex gap-4 px-4 py-2 border-t border-white/5">
        <label className="text-xs text-white/40 flex items-center gap-2">
          X
          <input
            type="number"
            value={x}
            onChange={(e) => onChange(Number(e.target.value), y)}
            className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none"
          />
        </label>
        <label className="text-xs text-white/40 flex items-center gap-2">
          Y
          <input
            type="number"
            value={y}
            onChange={(e) => onChange(x, Number(e.target.value))}
            className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none"
          />
        </label>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- */
/* Edit / Add modal                                           */
/* ---------------------------------------------------------- */
type ModalTab = 'basic' | 'links' | 'demo';

function ProductModal({
  initial, title, onSave, onClose,
}: {
  initial: SerializedProduct; title: string;
  onSave: (p: SerializedProduct) => void; onClose: () => void;
}) {
  const [form, setForm] = useState<SerializedProduct>(initial);
  const [tab, setTab]   = useState<ModalTab>('basic');

  const set = useCallback(<K extends keyof SerializedProduct>(k: K, v: SerializedProduct[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
  }, []);

  const toggleLink = (key: LinkKey) => {
    const cur = { ...(form.links ?? {}) };
    if (cur[key]) { delete cur[key]; } else { cur[key] = '#'; }
    set('links', cur);
  };

  const IconComp  = ICON_REGISTRY[form.iconName] ?? ICON_REGISTRY['Brain'];
  const colorOpt  = COLOR_OPTIONS.find((c) => c.gradient === form.gradient);

  const TABS: { id: ModalTab; label: string }[] = [
    { id: 'basic', label: 'Basic Info'    },
    { id: 'links', label: 'Links'         },
    { id: 'demo',  label: 'Demo Content'  },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#13141a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
          <h2 className="text-white font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 flex-shrink-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-blue-600 text-white'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* ---- BASIC INFO ---- */}
          {tab === 'basic' && (
            <>
              {/* Preview */}
              <div className="flex items-center gap-4 p-4 bg-white/3 rounded-xl border border-white/8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${form.gradient} flex items-center justify-center flex-shrink-0`}>
                  <IconComp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{form.name}</p>
                  <p className="text-white/40 text-sm">{form.tagline}</p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm text-white/60 mb-1.5">
                  Product name <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm text-white/60 mb-1.5">
                  Tagline <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.tagline}
                  onChange={(e) => set('tagline', e.target.value)}
                  className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              {/* Icon picker */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Icon</label>
                <div className="grid grid-cols-8 gap-2">
                  {ICON_NAMES.map((name) => {
                    const Ic = ICON_REGISTRY[name];
                    const sel = form.iconName === name;
                    return (
                      <button
                        key={name}
                        onClick={() => set('iconName', name)}
                        title={name}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          sel
                            ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                            : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/8'
                        }`}
                      >
                        <Ic className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color scheme */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Color scheme</label>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_OPTIONS.map((c) => {
                    const sel = form.gradient === c.gradient;
                    return (
                      <button
                        key={c.id}
                        onClick={() => { set('gradient', c.gradient); set('accent', c.accent); set('bgTint', c.bgTint); }}
                        className={`h-12 rounded-xl relative transition-all ${
                          sel ? 'ring-2 ring-white ring-offset-2 ring-offset-[#13141a]' : 'hover:scale-105'
                        }`}
                        style={{ background: c.preview }}
                        title={c.label}
                      >
                        {sel && <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow" />}
                      </button>
                    );
                  })}
                </div>
                {colorOpt && (
                  <p className="text-xs text-white/30 mt-2">Selected: {colorOpt.label}</p>
                )}
              </div>

              {/* Hub position */}
              <div>
                <label className="block text-sm text-white/60 mb-1">Hub network position</label>
                <p className="text-xs text-white/30 mb-2">
                  Drag the node to position it, or edit the numbers directly. Canvas centre = hub centre (0,0).
                </p>
                <HubCanvas
                  x={form.hubPositionX}
                  y={form.hubPositionY}
                  iconName={form.iconName}
                  gradient={form.gradient}
                  onChange={(x, y) => { set('hubPositionX', x); set('hubPositionY', y); }}
                />
              </div>
            </>
          )}

          {/* ---- LINKS ---- */}
          {tab === 'links' && (
            <div className="space-y-3">
              <p className="text-white/40 text-sm">Toggle which links appear on the product card.</p>
              {(Object.entries(LINK_LABELS) as [LinkKey, string][]).map(([key, label]) => {
                const active = !!(form.links ?? {})[key];
                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                      active
                        ? 'bg-emerald-500/8 border-emerald-500/20'
                        : 'bg-white/3 border-white/8'
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-medium ${active ? 'text-white' : 'text-white/50'}`}>{label}</p>
                      <p className="text-xs text-white/30 mt-0.5">{active ? 'Visible on product card' : 'Hidden'}</p>
                    </div>
                    <button
                      onClick={() => toggleLink(key)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        active ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                        active ? 'left-6' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ---- DEMO CONTENT ---- */}
          {tab === 'demo' && (
            <div className="space-y-4">
              <p className="text-white/40 text-sm">Configure the demo section shown on the landing page.</p>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Agent name / status label</label>
                <input
                  value={form.agentStatus ?? ''}
                  onChange={(e) => set('agentStatus', e.target.value)}
                  placeholder="e.g. AI Agent"
                  className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Feature section title</label>
                <input
                  value={form.demoFeatureTitle ?? ''}
                  onChange={(e) => set('demoFeatureTitle', e.target.value)}
                  placeholder="e.g. Key Capabilities"
                  className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">
                  Features <span className="text-white/30 font-normal">(one per line)</span>
                </label>
                <textarea
                  value={(form.demoFeatures ?? []).join('\n')}
                  onChange={(e) => set('demoFeatures', e.target.value.split('\n').filter(Boolean))}
                  rows={4}
                  placeholder="Natural language processing&#10;Real-time analytics&#10;Auto-classification"
                  className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">
                  Sample prompts <span className="text-white/30 font-normal">(one per line)</span>
                </label>
                <textarea
                  value={(form.demoPrompts ?? []).join('\n')}
                  onChange={(e) => set('demoPrompts', e.target.value.split('\n').filter(Boolean))}
                  rows={4}
                  placeholder="Summarize last quarter's data&#10;Find anomalies in Q3"
                  className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-white/10 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------- */
/* Product row                                                */
/* ---------------------------------------------------------- */
function ProductRow({
  id, name, tagline, iconName, gradient, links, isBase, isDeleted,
  onEdit, onDelete, onRestore,
}: {
  id: string; name: string; tagline: string; iconName: string;
  gradient: string; links: Record<string, string>;
  isBase: boolean; isDeleted: boolean;
  onEdit: () => void; onDelete: () => void; onRestore: () => void;
}) {
  const IconComp  = ICON_REGISTRY[iconName] ?? ICON_REGISTRY['Brain'];
  const linkKeys: LinkKey[] = ['learnMore', 'requestDemo', 'documentation'];

  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
      isDeleted ? 'border-white/5 bg-white/2 opacity-55' : 'border-white/8 bg-[#13141a] hover:bg-[#16171f]'
    }`}>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
        <IconComp className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-white font-medium text-sm">{name}</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-white/8 text-white/40 border border-white/10">
            {isBase ? 'base config' : 'added'}
          </span>
          {isDeleted && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
              deleted
            </span>
          )}
        </div>
        <p className="text-white/35 text-xs truncate mb-2">{tagline}</p>
        <div className="flex gap-1.5 flex-wrap">
          {linkKeys.map((key) => {
            const active = !!links?.[key];
            return (
              <span
                key={key}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                  active
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-white/5 text-white/20 border border-white/8'
                }`}
              >
                {active ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                {LINK_LABELS[key]}
              </span>
            );
          })}
        </div>
      </div>
      {!isDeleted ? (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onEdit}    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white hover:bg-white/10 transition-all"><Pencil  className="w-3.5 h-3.5" /></button>
          <button onClick={onDelete}  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2  className="w-3.5 h-3.5" /></button>
          <button onClick={onRestore} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/15 transition-all" disabled><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>
      ) : (
        <button onClick={onRestore} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all flex-shrink-0">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------- */
/* Dashboard                                                   */
/* ---------------------------------------------------------- */
function AdminDashboard() {
  const { products, adminStorage, saveAdminStorage } = useProducts();
  const [modal, setModal] = useState<{ mode: 'add' } | { mode: 'edit'; id: string } | null>(null);

  const { overrides, additions, deletedIds } = adminStorage;

  const activeCount  = products.length;
  const withLinks    = products.filter((p) => Object.keys(p.links ?? {}).length > 0).length;
  const deletedCount = deletedIds.length;

  const baseRows = PRODUCTS.map((p) => {
    const ov = overrides[p.id];
    return {
      id: p.id, isBase: true,
      name:      ov?.name     ?? p.name,
      tagline:   ov?.tagline  ?? p.tagline,
      iconName:  ov?.iconName ?? 'Brain',
      gradient:  ov?.gradient ?? 'from-blue-500 to-cyan-500',
      links:     ((ov?.links ?? p.links) as Record<string, string>) ?? {},
      isDeleted: deletedIds.includes(p.id),
    };
  });

  const addedRows = (additions ?? []).map((a) => ({
    id: a.id, isBase: false,
    name: a.name, tagline: a.tagline,
    iconName: a.iconName, gradient: a.gradient,
    links: (a.links ?? {}) as Record<string, string>,
    isDeleted: deletedIds.includes(a.id),
  }));

  const allRows = [...baseRows, ...addedRows];

  async function handleDelete(id: string) {
    await saveAdminStorage({ ...adminStorage, deletedIds: [...deletedIds, id] });
  }
  async function handleRestore(id: string) {
    await saveAdminStorage({ ...adminStorage, deletedIds: deletedIds.filter((d) => d !== id) });
  }
  async function handleSave(updated: SerializedProduct) {
    const isBase = PRODUCTS.some((p) => p.id === updated.id);
    if (isBase) {
      await saveAdminStorage({
        ...adminStorage,
        overrides: { ...overrides, [updated.id]: {
          name: updated.name, tagline: updated.tagline,
          iconName: updated.iconName, gradient: updated.gradient,
          accent: updated.accent, bgTint: updated.bgTint,
          hubPositionX: updated.hubPositionX, hubPositionY: updated.hubPositionY,
          links: updated.links,
        }},
      });
    } else {
      await saveAdminStorage({
        ...adminStorage,
        additions: (additions ?? []).map((a) => a.id === updated.id ? updated : a),
      });
    }
    setModal(null);
  }
  async function handleAdd(p: SerializedProduct) {
    await saveAdminStorage({ ...adminStorage, additions: [...(additions ?? []), p] });
    setModal(null);
  }

  function getEditInitial(id: string): SerializedProduct {
    const base = PRODUCTS.find((p) => p.id === id);
    if (base) {
      const ov = overrides[id];
      return {
        id,
        name:      ov?.name     ?? base.name,
        tagline:   ov?.tagline  ?? base.tagline,
        iconName:  ov?.iconName ?? 'Brain',
        gradient:  ov?.gradient ?? 'from-blue-500 to-cyan-500',
        accent:    ov?.accent   ?? base.accent,
        bgTint:    ov?.bgTint   ?? base.bgTint,
        hubPositionX: ov?.hubPositionX ?? (base.hubPosition?.x ?? 150),
        hubPositionY: ov?.hubPositionY ?? (base.hubPosition?.y ?? -80),
        links:     ((ov?.links ?? base.links) as Record<string, string>) ?? {},
        agentStatus: 'Ready', demoActions: [], demoPrompts: [],
        demoCapabilities: [], demoFeatureTitle: 'Key Capabilities', demoFeatures: [],
      };
    }
    return (additions ?? []).find((a) => a.id === id) ?? { ...DEFAULT_NEW, id };
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white">
      <header className="border-b border-white/8 bg-[#0d0e14]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold">Trinamix Admin</span>
            <span className="text-white/20 mx-1">|</span>
            <span className="text-white/40 text-sm">Product Registry</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="text-emerald-400 text-sm">Live</span>
            </div>
            <a href="/" className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to site
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { v: activeCount,  l: 'Active products'      },
            { v: withLinks,    l: 'With links'           },
            { v: deletedCount, l: 'Deleted (restorable)' },
          ].map(({ v, l }) => (
            <div key={l} className="bg-[#13141a] border border-white/8 rounded-2xl p-5">
              <div className="text-3xl font-bold text-white mb-1">{v}</div>
              <div className="text-sm text-white/40">{l}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Products</h2>
          <button
            onClick={() => setModal({ mode: 'add' })}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add product
          </button>
        </div>

        <div className="space-y-2">
          {allRows.map((row) => (
            <ProductRow
              key={row.id}
              {...row}
              onEdit={() => setModal({ mode: 'edit', id: row.id })}
              onDelete={() => handleDelete(row.id)}
              onRestore={() => handleRestore(row.id)}
            />
          ))}
        </div>

        <div className="mt-10 border border-red-500/15 rounded-2xl p-5">
          <h3 className="text-red-400 font-medium text-sm mb-1">Danger zone</h3>
          <p className="text-white/30 text-xs mb-4">Reset all admin changes and restore original configuration.</p>
          <button
            onClick={async () => { if (confirm('Reset everything?')) await saveAdminStorage(EMPTY_ADMIN_STORAGE); }}
            className="px-4 py-2 border border-red-500/30 text-red-400 rounded-xl text-sm hover:bg-red-500/10 transition-colors"
          >
            Reset to defaults
          </button>
        </div>
      </main>

      <AnimatePresence>
        {modal?.mode === 'add' && (
          <ProductModal key="add" title="Add product" initial={{ ...DEFAULT_NEW, id: genId() }} onSave={handleAdd} onClose={() => setModal(null)} />
        )}
        {modal?.mode === 'edit' && (
          <ProductModal key={modal.id} title={`Edit -- ${allRows.find(r => r.id === modal.id)?.name ?? ''}`} initial={getEditInitial(modal.id)} onSave={handleSave} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------- */
/* Export                                                      */
/* ---------------------------------------------------------- */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  return authed ? <AdminDashboard /> : <LoginScreen onLogin={() => setAuthed(true)} />;
}
