/**
 * ═══════════════════════════════════════════════════════
 *  FIREBASE CONFIGURATION
 *  ───────────────────────────────────────────────────────
 *  HOW TO GET THESE VALUES:
 *
 *  1. Go to https://console.firebase.google.com
 *  2. Click "Add project" → give it a name → Continue
 *  3. Once created, click the "</>" (Web) icon to add a web app
 *  4. Register the app (any nickname) → Copy the firebaseConfig object
 *  5. Paste the values into the FIREBASE_CONFIG object below
 *
 *  ENABLE REALTIME DATABASE:
 *  1. In Firebase Console → left sidebar → "Realtime Database"
 *  2. Click "Create Database"
 *  3. Choose a region (us-central1 is fine)
 *  4. Start in TEST MODE (allows reads/writes for 30 days)
 *  5. Click "Enable"
 *  6. Copy the database URL (looks like https://your-app-default-rtdb.firebaseio.com)
 *     and paste it as databaseURL below
 *
 *  FOR PRODUCTION — set proper security rules:
 *  {
 *    "rules": {
 *      "admin": {
 *        ".read": true,
 *        ".write": true
 *      }
 *    }
 *  }
 * ═══════════════════════════════════════════════════════
 */

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyBpzlQA1hplztly730MWL5AzMOgRPTuqXU',
  authDomain:        'ai-tools-interactive.firebaseapp.com',
  databaseURL:       'https://ai-tools-interactive-default-rtdb.firebaseio.com',
  projectId:         'ai-tools-interactive',
  storageBucket:     'ai-tools-interactive.firebasestorage.app',
  messagingSenderId: '1036361682364',
  appId:             '1:1036361682364:web:5d0f0b60ff8a086c992fb9',
  measurementId:     'G-ZVN0B2WB54',
};

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);

export const db = getDatabase(app);

export const DB_PATH = 'admin/productRegistry';
