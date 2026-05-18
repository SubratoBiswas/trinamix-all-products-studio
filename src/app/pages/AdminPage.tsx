/**
 * AdminPage — PIN-protected product management panel.
 *
 * After authenticating with ADMIN_PIN (adminConfig.ts),
 * an editor can:
 *   • Override name / tagline / icon / gradient / hub position / links
 *     for any of the six base products
 *   • Add brand-new products (action-cards demo type)
 *   • Delete any product
 *
 * All changes are saved to both localStorage and MongoDB via
 * the productStore's saveAdminStorage helper.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, Plus, Trash2, Edit2, Save, X, ChevronLeft,
  Eye, EyeOff,
} from 'lucide-react';

import {
  ADMIN_PIN,
  COLOR_OPTIONS,
  ICON_NAMES,
  ICON_REGISTRY,
  EMPTY_ADMIN_STORAGE,
  type AdminStorage,
  type SerializedProduct,
} from '../config/adminConfig';
import { PRODUCTS } from '../config/products';
import { useProducts } from '../store/productStore';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEFAULT_NEW_PRODUCT: Omit<SerializedProduct, 'id'> = {
  name: 'New Product',
  tagline: 'A powerful AI product',
  iconName: 'Brain',
  gradient: 'from-blue-500 to-cyan-500',
  accent: 'blue',
  bgTint: 'via-blue-950/10',
  hubPositionX: 0,
  hubPositionY: 0,
  links: {},
  agentStatus: 'Ready',
  demoActions: [],
  demoPrompts: [],
  demoCapabilities: [],
  demoFeatureTitle: 'Key Capabilities',
  demoFeatures: [],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder = '' }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/30 transition-colors"
    />
  );
}

// ─── Product edit form ────────────────────────────────────────────────────────

interface EditFormProps {
  initial: SerializedProduct;
  onSave: (p: SerializedProduct) => void;
  onCancel: () => void;
}

function EditForm({ initial, onSave, onCancel }: EditFormProps) {
  const [form, setForm] = useState<SerializedProduct>({ ...initial });
  const set = <K extends keyof SerializedProduct>(key: K, value: SerializedProduct[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const Icon = ICON_REGISTRY[form.iconName] ?? ICON_REGISTRY['Brain'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-5"
    >
      {/* Preview badge */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 bg-gradient-to-br ${form.gradient} rounded-2xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-semibold">{form.name || 'Untitled'}</p>
          <p className="text-xs text-white/50">{form.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Product Name">
          <TextInput value={form.name} onChange={(v) => set('name', v)} />
        </Field>
        <Field label="Tagline">
          <TextInput value={form.tagline} onChange={(v) => set('tagline', v)} />
        </Field>

        <Field label="Icon">
          <select value={form.iconName} onChange={(e) => set('iconName', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/30">
            {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </Field>

        <Field label="Color Theme">
          <select value={form.gradient} onChange={(e) => {
            const opt = COLOR_OPTIONS.find((c) => c.gradient === e.target.value);
            if (opt) { set('gradient', opt.gradient); set('accent', opt.accent); set('bgTint', opt.bgTint); }
          }} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/30">
            {COLOR_OPTIONS.map((c) => <option key={c.id} value={c.gradient}>{c.label}</option>)}
          </select>
        </Field>

        <Field label="Hub X offset (px)">
          <input type="number" value={form.hubPositionX}
            onChange={(e) => set('hubPositionX', Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/30" />
        </Field>
        <Field label="Hub Y offset (px)">
          <input type="number" value={form.hubPositionY}
            onChange={(e) => set('hubPositionY', Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/30" />
        </Field>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">Links</p>
        <Field label="Learn More URL">
          <TextInput value={form.links.learnMore ?? ''} onChange={(v) => set('links', { ...form.links, learnMore: v })} placeholder="https://" />
        </Field>
        <Field label="Request Demo URL">
          <TextInput value={form.links.requestDemo ?? ''} onChange={(v) => set('links', { ...form.links, requestDemo: v })} placeholder="https://" />
        </Field>
        <Field label="Documentation URL">
          <TextInput value={form.links.documentation ?? ''} onChange={(v) => set('links', { ...form.links, documentation: v })} placeholder="https://" />
        </Field>
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors">
          <X className="w-4 h-4" /> Cancel
        </button>
        <button onClick={() => onSave(form)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </motion.div>
  );
}

// ─── Product row ──────────────────────────────────────────────────────────────

function ProductRow({ product, isDeleted, onEdit, onDelete, onRestore }: {
  product: { id: string; name: string; gradient: string; icon: string };
  isDeleted: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onRestore: () => void;
}) {
  const Icon = ICON_REGISTRY[product.icon] ?? ICON_REGISTRY['Brain'];
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
      isDeleted
        ? 'bg-red-500/5 border-red-500/20 opacity-50'
        : 'bg-white/5 border-white/10 hover:bg-white/8'
    }`}>
      <div className={`w-10 h-10 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center shrink-0`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="flex-1 font-medium text-sm">{product.name}</p>
      {isDeleted ? (
        <button onClick={onRestore} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-xl text-xs text-green-400 hover:bg-green-500/30 transition-colors">
          <Eye className="w-3.5 h-3.5" /> Restore
        </button>
      ) : (
        <div className="flex gap-2">
          <button onClick={onEdit} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs hover:bg-white/10 transition-colors">
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          <button onClick={onDelete} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 hover:bg-red-500/20 transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { adminStorage, saveAdminStorage } = useProducts();

  // ── Auth state ──
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [saving, setSaving] = useState(false);

  // ── Edit state ──
  const [editingId, setEditingId] = useState<string | null>(null);

  // ── Helpers ──
  const storage: AdminStorage = adminStorage ?? EMPTY_ADMIN_STORAGE;

  async function persist(next: AdminStorage) {
    setSaving(true);
    try { await saveAdminStorage(next); } finally { setSaving(false); }
  }

  function handleLogin() {
    if (pin === ADMIN_PIN) { setAuthed(true); setPinError(false); }
    else { setPinError(true); setPin(''); }
  }

  // ── Override helpers ──
  function saveOverride(productId: string, form: SerializedProduct) {
    const next: AdminStorage = {
      ...storage,
      overrides: {
        ...storage.overrides,
        [productId]: {
          name: form.name,
          tagline: form.tagline,
          iconName: form.iconName,
          gradient: form.gradient,
          accent: form.accent,
          bgTint: form.bgTint,
          hubPositionX: form.hubPositionX,
          hubPositionY: form.hubPositionY,
          links: form.links,
        },
      },
    };
    persist(next);
    setEditingId(null);
  }

  function toggleDelete(productId: string) {
    const deletedIds = storage.deletedIds ?? [];
    const next: AdminStorage = {
      ...storage,
      deletedIds: deletedIds.includes(productId)
        ? deletedIds.filter((id) => id !== productId)
        : [...deletedIds, productId],
    };
    persist(next);
  }

  // ── Addition helpers ──
  function addProduct() {
    const id = `custom-${Date.now()}`;
    const newProd: SerializedProduct = { ...DEFAULT_NEW_PRODUCT, id };
    const next: AdminStorage = {
      ...storage,
      additions: [...(storage.additions ?? []), newProd],
    };
    persist(next);
    setEditingId(id);
  }

  function saveAddition(form: SerializedProduct) {
    const next: AdminStorage = {
      ...storage,
      additions: (storage.additions ?? []).map((p) => p.id === form.id ? form : p),
    };
    persist(next);
    setEditingId(null);
  }

  function deleteAddition(id: string) {
    const next: AdminStorage = {
      ...storage,
      additions: (storage.additions ?? []).filter((p) => p.id !== id),
    };
    persist(next);
  }

  // ─── Login screen ────────────────────────────────────────────────────────────

  if (!authed) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-1">Admin Panel</h1>
          <p className="text-sm text-white/40 text-center mb-8">Enter your PIN to continue</p>

          <div className="relative mb-4">
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Admin PIN"
              className={`w-full bg-white/5 border rounded-2xl px-5 py-4 text-lg tracking-widest outline-none transition-colors ${
                pinError ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'
              }`}
            />
            <button onClick={() => setShowPin(!showPin)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
              {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {pinError && (
            <p className="text-sm text-red-400 text-center mb-4">Incorrect PIN. Try again.</p>
          )}

          <button onClick={handleLogin}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-medium hover:opacity-90 transition-opacity">
            Unlock
          </button>
        </motion.div>
      </div>
    );
  }

  // ─── Admin panel ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to site
        </a>
        <div className="flex-1" />
        <h1 className="font-semibold">Admin Panel</h1>
        <div className="flex-1 flex justify-end">
          {saving && <span className="text-xs text-blue-400 animate-pulse">Saving…</span>}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* ── Base products ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Products</h2>
            <button onClick={addProduct}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          <div className="space-y-3">
            {PRODUCTS.map((p) => {
              const isDeleted = (storage.deletedIds ?? []).includes(p.id);
              const override = storage.overrides?.[p.id];
              const displayName = override?.name ?? p.name;
              const displayGradient = override?.gradient ?? p.gradient;
              const displayIcon = override?.iconName ?? p.icon.displayName ?? 'Brain';

              return (
                <div key={p.id}>
                  <ProductRow
                    product={{ id: p.id, name: displayName, gradient: displayGradient, icon: displayIcon }}
                    isDeleted={isDeleted}
                    onEdit={() => setEditingId(editingId === p.id ? null : p.id)}
                    onDelete={() => toggleDelete(p.id)}
                    onRestore={() => toggleDelete(p.id)}
                  />
                  <AnimatePresence>
                    {editingId === p.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-2">
                        <EditForm
                          initial={{
                            id: p.id,
                            name: override?.name ?? p.name,
                            tagline: override?.tagline ?? p.tagline,
                            iconName: override?.iconName ?? 'Brain',
                            gradient: override?.gradient ?? p.gradient,
                            accent: override?.accent ?? p.accent,
                            bgTint: override?.bgTint ?? p.bgTint,
                            hubPositionX: override?.hubPositionX ?? p.hubPosition.x,
                            hubPositionY: override?.hubPositionY ?? p.hubPosition.y,
                            links: override?.links ?? p.links,
                            agentStatus: 'Ready',
                            demoActions: [],
                            demoPrompts: [],
                            demoCapabilities: [],
                            demoFeatureTitle: 'Key Capabilities',
                            demoFeatures: [],
                          }}
                          onSave={(form) => saveOverride(p.id, form)}
                          onCancel={() => setEditingId(null)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Custom additions */}
            {(storage.additions ?? []).map((p) => (
              <div key={p.id}>
                <ProductRow
                  product={{ id: p.id, name: p.name, gradient: p.gradient, icon: p.iconName }}
                  isDeleted={false}
                  onEdit={() => setEditingId(editingId === p.id ? null : p.id)}
                  onDelete={() => deleteAddition(p.id)}
                  onRestore={() => {}}
                />
                <AnimatePresence>
                  {editingId === p.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-2">
                      <EditForm
                        initial={p}
                        onSave={(form) => saveAddition(form)}
                        onCancel={() => setEditingId(null)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ── Danger zone ── */}
        <section className="border border-red-500/20 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-red-400 mb-3">Danger Zone</h2>
          <p className="text-xs text-white/50 mb-4">
            Reset all overrides, additions and deletions. The site will return to its default state.
          </p>
          <button
            onClick={() => { if (confirm('Reset all admin changes?')) persist(EMPTY_ADMIN_STORAGE); }}
            className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors"
          >
            Reset to defaults
          </button>
        </section>
      </div>
    </div>
  );
}
