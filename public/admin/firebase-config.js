/**
 * Firebase config for the Urgence Médicale admin dashboard.
 *
 * PLACEHOLDER — the dashboard stays disabled until these are filled in.
 * Nothing here is invented: create (or reuse) a Firebase project, then copy
 * the web-app config from Project settings → General → Your apps.
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
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  appId: "",
};

export function isConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL);
}
