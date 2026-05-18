/**
 * ─────────────────────────────────────────────────────────────────
 *  ADMIN CONFIGURATION
 *  Change ADMIN_PIN below to set your own access PIN.
 * ─────────────────────────────────────────────────────────────────
 */

import {
  Brain, Search, FileText, TrendingUp, Network, Radio,
  Zap, Globe, Shield, Database, Cloud, Cpu, Code,
  Activity, Layers, Settings, Users, Package, Truck,
  DollarSign, BarChart2, PieChart, Target, Briefcase,
  Lock, Bell, Star, Sparkles, Rocket, TestTube2,
  Bot, Gauge, Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ── PIN ────────────────────────────────────────────────────────────
/** Change this to any string to set your admin PIN */
export const ADMIN_PIN = 'admin123';

// ── Icon registry ─────────────────────────────────────────────────
/** Maps display name → LucideIcon component. Add more as needed. */
export const ICON_REGISTRY: Record<string, LucideIcon> = {
  Brain, Search, FileText, TrendingUp, Network, Radio,
  Zap, Globe, Shield, Database, Cloud, Cpu, Code,
  Activity, Layers, Settings, Users, Package, Truck,
  DollarSign, BarChart2, PieChart, Target, Briefcase,
  Lock, Bell, Star, Sparkles, Rocket, TestTube2,
  Bot, Gauge, Workflow,
};

export const ICON_NAMES = Object.keys(ICON_REGISTRY);

// ── Gradient / color palette ──────────────────────────────────────
export interface ColorOption {
  id: string;
  label: string;
  gradient: string;
  accent: string;
  bgTint: string;
  preview: string;  // CSS gradient string for the swatch
}

export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'blue-cyan',     label: 'Blue → Cyan',      gradient: 'from-blue-500 to-cyan-500',      accent: 'blue',    bgTint: 'via-blue-950/10',    preview: 'linear-gradient(135deg,#3b82f6,#06b6d4)' },
  { id: 'purple-pink',   label: 'Purple → Pink',    gradient: 'from-purple-500 to-pink-500',    accent: 'purple',  bgTint: 'via-purple-950/10',  preview: 'linear-gradient(135deg,#a855f7,#ec4899)' },
  { id: 'orange-red',    label: 'Orange → Red',     gradient: 'from-orange-500 to-red-500',     accent: 'orange',  bgTint: 'via-orange-950/10',  preview: 'linear-gradient(135deg,#f97316,#ef4444)' },
  { id: 'green-emerald', label: 'Green → Emerald',  gradient: 'from-green-500 to-emerald-500',  accent: 'green',   bgTint: 'via-green-950/10',   preview: 'linear-gradient(135deg,#22c55e,#10b981)' },
  { id: 'indigo-blue',   label: 'Indigo → Blue',    gradient: 'from-indigo-500 to-blue-500',    accent: 'indigo',  bgTint: 'via-indigo-950/10',  preview: 'linear-gradient(135deg,#6366f1,#3b82f6)' },
  { id: 'yellow-orange', label: 'Yellow → Orange',  gradient: 'from-yellow-500 to-orange-500',  accent: 'yellow',  bgTint: 'via-yellow-950/10',  preview: 'linear-gradient(135deg,#eab308,#f97316)' },
  { id: 'teal-cyan',     label: 'Teal → Cyan',      gradient: 'from-teal-500 to-cyan-500',      accent: 'teal',    bgTint: 'via-teal-950/10',    preview: 'linear-gradient(135deg,#14b8a6,#06b6d4)' },
  { id: 'rose-pink',     label: 'Rose → Pink',      gradient: 'from-rose-500 to-pink-500',      accent: 'rose',    bgTint: 'via-rose-950/10',    preview: 'linear-gradient(135deg,#f43f5e,#ec4899)' },
  { id: 'violet-purple', label: 'Violet → Purple',  gradient: 'from-violet-500 to-purple-500',  accent: 'violet',  bgTint: 'via-violet-950/10',  preview: 'linear-gradient(135deg,#8b5cf6,#a855f7)' },
  { id: 'sky-blue',      label: 'Sky → Blue',       gradient: 'from-sky-500 to-blue-500',       accent: 'sky',     bgTint: 'via-sky-950/10',     preview: 'linear-gradient(135deg,#0ea5e9,#3b82f6)' },
];

// ── Serialised product (stored in localStorage) ───────────────────
/** All icon references are strings; hydrated to LucideIcon at runtime. */
export interface SerializedProduct {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  gradient: string;
  accent: string;
  bgTint: string;
  hubPositionX: number;
  hubPositionY: number;
  links: {
    learnMore?: string;
    requestDemo?: string;
    documentation?: string;
  };
  // action-cards demo fields
  agentStatus: string;
  demoActions: Array<{ label: string; status: string; progress: number }>;
  demoPrompts: string[];
  demoCapabilities: Array<{ title: string; value: string; trend: string }>;
  demoFeatureTitle: string;
  demoFeatures: string[];
}

// ── Admin localStorage schema ─────────────────────────────────────
export interface AdminStorage {
  /** Partial overrides keyed by product id (for base products from products.ts) */
  overrides: Record<string, {
    name?: string;
    tagline?: string;
    iconName?: string;
    gradient?: string;
    accent?: string;
    bgTint?: string;
    hubPositionX?: number;
    hubPositionY?: number;
    links?: { learnMore?: string; requestDemo?: string; documentation?: string };
  }>;
  /** Admin-created products */
  additions: SerializedProduct[];
  /** IDs of base products that have been deleted */
  deletedIds: string[];
}

export const EMPTY_ADMIN_STORAGE: AdminStorage = {
  overrides: {},
  additions: [],
  deletedIds: [],
};

/**
 * localStorage key used as an offline cache