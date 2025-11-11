// api/register.ts
// Vercel Node.js Serverless Function (classic req/res signature)

const REQUIRED = ["RESEND_API_KEY", "FROM_EMAIL", "TO_EMAIL"] as const;
type Body = { name?: string; email?: string; message?: string; company?: string };

const safe = (v: unknown) => String(v ?? "").replace(/[\r\n]/g, " ").slice(0, 1000);

function readEnv() {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  return { ok: missing.length === 0, missing };
}

async function parseBody(req: any): Promise<Body> {
  // If Vercel already parsed it (usual for JSON), use it
  if (req.body && typeof req.body === "object") return req.body as Body;

  // Otherwise, collect the raw body and try JSON -> urlencoded
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const params = new URLSearchParams(raw);
    const obj: Record<string, string> = {};
    for (const [k, v] of params.entries()) obj[k] = v;
    return obj as Body;
  }
}

async function sendWithResendREST(opts: {
  from: string;
  to: string;
  subject: string;
  html: string;
  apiKey: string;
  timeoutMs?: number;
}) {
  const { from, to, subject, html, apiKey, timeoutMs = 12000 } = opts;
  const ctrl = new AbortController();
  const toid = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ from, to, subject, html }),
      signal: ctrl.signal
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, json };
  } finally {
    clearTimeout(toid);
  }
}

export default async function handler(req: any, res: any) {
  const started = Date.now();
  const log = (...a: any[]) => console.log("[/api/register]", ...a);

  if (req.method !== "POST") {
    res.status(405).setHeader("content-type", "application/json").send(JSON.stringify({ ok: false, error: "Method not allowed" }));
    return;
  }

  const env = readEnv();
  if (!env.ok) {
    log("Missing env", env.missing);
    res.status(500).json({ ok: false, error: `Missing env: ${env.missing.join(", ")}` });
    return;
  }

  const body = await parseBody(req).catch(() => ({}));
  log("Parsed body in", Date.now() - started, "ms:", body);

  if (body.company) {
    // Honeypot hit
    res.status(200).json({ ok: true });
    return;
  }

  const name = safe(body.name);
  const email = safe(body.email);
  const message = safe(body.message);

  if (!name || !email) {
    res.status(400).json({ ok: false, error: "Missing name or email" });
    return;
  }

  const html = `
    <h2>New investor registration</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
    <p><small>Submitted: ${new Date().toISOString()}</small></p>
  `;

  const from = `Percy — AdviTravel <${process.env.FROM_EMAIL!}>`;
  const out = await sendWithResendREST({
    from,
    to: process.env.TO_EMAIL!,
    subject: "New investor form submission",
    html,
    apiKey: process.env.RESEND_API_KEY!,
    timeoutMs: 12000
  }).catch((e) => ({ ok: false, status: 0, json: { error: String(e?.message || e) } }));

  log("Resend returned in", Date.now() - started, "ms", out.status, out.json);

  if (!out.ok) {
    res.status(502).json({ ok: false, error: "Resend error", detail: out.json });
    return;
  }

  res.status(200).json({ ok: true, id: (out.json as any)?.id ?? null });
}
