/**
 * 
 *  PRODUCT STORE  (MongoDB edition  replaces Firebase version)
 *
 *  Provides a React context that:
 *    1. Boots from localStorage (instant, no flash)
 *    2. Fetches the latest AdminStorage from MongoDB on mount
 *    3. Merges base PRODUCTS with admin overrides / additions / deletions
 *    4. Exposes save helpers that write to both localStorage AND MongoDB
 *
 *  Consumers:
 *    const { products, syncing, adminStorage, saveAdminStorage } = useProducts();
 * 
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

import { PRODUCTS, type ProductConfig } from '../config/products';
import {
  EMPTY_ADMIN_STORAGE,
  ICON_REGISTRY,
  STORAGE_KEY,
  type AdminStorage,
  type SerializedProduct,
} from '../config/adminConfig';
import { fetchRegistry, saveRegistry } from '../config/mongodb';

//  Types 

interface ProductContextValue {
  /** Final merged product list  use this everywhere in the UI */
  products: ProductConfig[];
  /** True while the initial MongoDB fetch is in flight */
  syncing: boolean;
  /** Raw admin state (for the admin panel to read / mutate) */
  adminStorage: AdminStorage;
  /** Persist a new AdminStorage to localStorage + MongoDB */
  saveAdminStorage: (next: AdminStorage) => Promise<void>;
}

//  Helpers 

/** Deserialise a SerializedProduct (icon name  LucideIcon component) */
function deserialise(s: SerializedProduct): ProductConfig {
  return {
    id: s.id,
    name: s.name,
    tagline: s.tagline,
    icon: ICON_REGISTRY[s.iconName] ?? ICON_REGISTRY['Brain'],
    gradient: s.gradient,
    accent: s.accent,
    bgTint: s.bgTint,
    hubPosition: { x: s.hubPositionX, y: s.hubPositionY },
    links: s.links,
    // Admin-created products always use the action-cards demo type
    demo: {
      type: 'action-cards',
      data: {
        agentName: s.agentStatus ?? 'AI Agent',
        agentStatus: s.agentStatus ?? 'Ready',
        actions: s.demoActions ?? [],
        prompts: s.demoPrompts ?? [],
        capabilities: s.demoCapabilities ?? [],
        featureTitle: s.demoFeatureTitle ?? 'Key Capabilities',
        features: s.demoFeatures ?? [],
      },
    },
  };
}

/**
 * Merge base PRODUCTS array with admin overrides/additions/deletions.
 * Returns the final ordered list that the UI renders.
 */
function mergeProducts(storage: AdminStorage): ProductConfig[] {
  const { overrides, additions, deletedIds } = storage;

  // 1. Apply overrides to base products and filter deleted ones
  const base: ProductConfig[] = PRODUCTS
    .filter((p) => !deletedIds.includes(p.id))
    .map((p) => {
      const ov = overrides[p.id];
      if (!ov) return p;
      return {
        ...p,
        name:        ov.name        ?? p.name,
        tagline:     ov.tagline     ?? p.tagline,
        icon:        ov.iconName    ? (ICON_REGISTRY[ov.iconName] ?? p.icon) : p.icon,
        gradient:    ov.gradient    ?? p.gradient,
        accent:      ov.accent      ?? p.accent,
        bgTint:      ov.bgTint      ?? p.bgTint,
        hubPosition: ov.hubPositionX !== undefined
          ? { x: ov.hubPositionX!, y: ov.hubPositionY! }
          : p.hubPosition,
        links:       ov.links       ?? p.links,
      };
    });

  // 2. Append admin-created products
  const extra: ProductConfig[] = (additions ?? []).map(deserialise);

  return [...base, ...extra];
}

/** Read AdminStorage from localStorage, falling back to the empty default */
function readLocalStorage(): AdminStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdminStorage;
  } catch {
    /* ignore parse errors */
  }
  return EMPTY_ADMIN_STORAGE;
}

/** Write AdminStorage to localStorage */
function writeLocalStorage(data: AdminStorage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
}

//  Context 

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  // Boot instantly from localStorage (no UI flash)
  const [adminStorage, setAdminStorage] = useState<AdminStorage>(readLocalStorage);
  const [syncing, setSyncing] = useState(true);

  // Derived product list  recomputed whenever adminStorage changes
  const products = mergeProducts(adminStorage);

  // On mount: fetch latest from MongoDB and sync to local state
  useEffect(() => {
    let cancelled = false;

    async function syncFromMongoDB() {
      setSyncing(true);
      const remote = await fetchRegistry();

      if (cancelled) return;

      if (remote) {
        setAdminStorage(remote);
        writeLocalStorage(remote);
      }

      setSyncing(false);
    }

    syncFromMongoDB();
    return () => { cancelled = true; };
  }, []);

  // Save helper: write to localStorage immediately, then persist to MongoDB
  const saveAdminStorage = useCallback(async (next: AdminStorage) => {
    setAdminStorage(next);
    writeLocalStorage(next);
    await saveRegistry(next);
  }, []);

  return (
    <ProductContext.Provider value={{ products, syncing, adminStorage, saveAdminStorage }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductContextValue {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used inside <ProductProvider>');
  return ctx;
}
