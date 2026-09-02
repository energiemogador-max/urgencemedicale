/**
 * Firebase config for the Urgence Médicale admin dashboard.
 *
 * Project: urgencemedicale-8b903 (operator-supplied, 2026-09-02). Complete.
 *
 * `measurementId` is deliberately omitted: it is for Google Analytics, which
 * this dashboard does not load. Pulling in the Analytics SDK would add weight
 * and a tracking surface to a page that only needs Auth and the database.
 *
 * These values are public identifiers by design — a Firebase web config is
 * meant to ship in the browser. What protects the data is the Realtime
 * Database rules, not secrecy of this file. Use rules like:
 *
 *   {
 *     "rules": {
 *       "taps": {
 *         ".read":  "auth != null",   // only signed-in staff can read
 *         ".write": true              // the Worker posts taps without a login
 *       }
 *     }
 *   }
 *
 * Then create staff accounts under Authentication → Users. There is no public
 * sign-up: accounts are created by you, which is what "a dashboard with users"
 * means here.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyB056BzxbBbZqI9Vn4waoJI7QQY0m_V63g",
  authDomain: "urgencemedicale-8b903.firebaseapp.com",
  databaseURL: "https://urgencemedicale-8b903-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "urgencemedicale-8b903",
  storageBucket: "urgencemedicale-8b903.firebasestorage.app",
  messagingSenderId: "931669755140",
  appId: "1:931669755140:web:689e07ba6fc93e22683c51",
};

export function isConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL);
}
