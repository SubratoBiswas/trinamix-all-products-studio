/**
 * 
 *  MONGODB API CLIENT
 *  
 *  Replaces firebase.ts.
 *
 *  All reads / writes go through the Express backend at
 *  VITE_API_URL (default: http://localhost:3001).
 *
 *  The backend exposes two endpoints:
 *    GET  /api/registry   returns AdminStorage JSON (or null)
 *    POST /api/registry   saves AdminStorage JSON, returns { ok: true }
 * 
 */

import type { AdminStorage } from './adminConfig';

/** Base URL for the backend API  set VITE_API_URL in your .env file */
const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3001';

//  Read 

/**
 * Fetch the current AdminStorage document from MongoDB.
 * Returns null if nothing has been saved yet or on network error.
 */
export async function fetchRegistry(): Promise<AdminStorage | null> {
  try {
    const res = await fetch(`${API_BASE}/api/registry`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GET /api/registry failed: ${res.status}`);
    return (await res.json()) as AdminStorage;
  } catch (err) {
    console.error('[MongoDB] fetchRegistry error:', err);
    return null;
  }
}

//  Write 

/**
 * Persist the full AdminStorage document to MongoDB.
 * Replaces (upserts) the single registry document.
 */
export async function saveRegistry(data: AdminStorage): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/api/registry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`POST /api/registry failed: ${res.status}`);
  } catch (err) {
    console.error('[MongoDB] saveRegistry error:', err);
    throw err;
  }
}
