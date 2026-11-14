/**
 * Applies the phone number chosen in the dashboard ("Modifier le numéro").
 *
 * Run every 5 minutes by .github/workflows/numero-telephone.yml. The
 * dashboard writes the request to the Realtime Database at site_config/phone
 * ({ call, whatsapp, at }). That node is publicly readable, since it is the
 * number printed on every page anyway, and only an account with the admin
 * role can write it (firebase-database-rules.json). When the request is new,
 * this script writes content/phone.json; the workflow commits and pushes,
 * and the Cloudflare build republishes every page with the new number.
 *
 * Plain Node with no dependencies: the job checks out two files and has to
 * stay cheap at 288 runs a day.
 *
 * A read problem never fails the job: a red run every 5 minutes would bury
 * a real failure and fill the inbox. It logs a warning and the next run
 * tries again.
 */
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";

// The project's database (public/admin/firebase-config.js). Overridable so
// the script can be tested against a local stand-in.
const DB = process.env.PHONE_DB_URL || "https://urgencemedicale-8b903-default-rtdb.europe-west1.firebasedatabase.app";
const FILE = "content/phone.json";
const NUMBER = /^0[5-8]\d{8}$/;

/** Any way a Moroccan number gets typed, down to its 10 national digits. */
function digitsOf(value) {
  let d = String(value ?? "").replace(/\D/g, "");
  if (d.startsWith("00212")) d = "0" + d.slice(5);
  else if (d.startsWith("212")) d = "0" + d.slice(3);
  return d;
}
const display = (d) => d.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5");

function output(values) {
  if (!process.env.GITHUB_OUTPUT) return;
  appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(values).map(([k, v]) => `${k}=${v}\n`).join(""));
}

let request;
try {
  const res = await fetch(`${DB}/site_config/phone.json`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) {
    console.log(`::warning::Demande illisible (HTTP ${res.status}). Les règles Firebase sont-elles publiées ?`);
    process.exit(0);
  }
  request = await res.json();
} catch (error) {
  console.log(`::warning::Base injoignable : ${error instanceof Error ? error.message : String(error)}`);
  process.exit(0);
}

if (!request || typeof request !== "object") {
  console.log("Aucune demande enregistrée depuis le tableau de bord.");
  process.exit(0);
}

const current = JSON.parse(readFileSync(FILE, "utf8"));
const at = Number(request.at);
if (!Number.isFinite(at) || at <= 0) {
  console.log("::warning::Demande sans date valable, ignorée.");
  process.exit(0);
}
if (current.request === at) {
  console.log(`Demande du ${new Date(at).toISOString()} déjà en ligne (${display(current.call)}).`);
  process.exit(0);
}

const call = digitsOf(request.call);
const whatsapp = digitsOf(request.whatsapp || request.call);
if (!NUMBER.test(call) || !NUMBER.test(whatsapp)) {
  // The database rules already refuse this; checked again because a wrong
  // number on an emergency service is the one mistake that must not ship.
  console.log(`::error::Numéro refusé : ${JSON.stringify(request.call)} / ${JSON.stringify(request.whatsapp)}`);
  process.exit(0);
}

writeFileSync(FILE, JSON.stringify({ call, whatsapp, request: at }, null, 2) + "\n");
console.log(`Nouveau numéro : ${display(call)} (WhatsApp ${display(whatsapp)}), demandé le ${new Date(at).toISOString()}.`);
output({ changed: "true", display: display(call) });
