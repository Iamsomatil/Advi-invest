// api/register.ts
// Node 22, Web Fetch API style
const REQUIRED = ["RESEND_API_KEY", "FROM_EMAIL", "TO_EMAIL"] as const;

type Body = { name?: string; email?: string; message?: string; company?: string };

const safe = (v: unknown) => String(v ?? "").replace(/[\r\n]/g, " ").slice(0, 1000);

function readEnv() {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  return { ok: missing.length === 0, missing };
}

async function readBody(req: Request): Promise<Body> {
  // Support JSON, urlencoded forms, multipart forms
  const ct = req.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) {
      return (await req.json()) as Body;
    }
    if (ct.includes("application/x-www-form-urlencoded")) {
      const txt = await req.text();
      const pairs = new URLSearchParams(txt);
      const obj: Record<string, string> = {};
      pairs.forEach((v, k) => { obj[k] = v; });
      return obj as Body;
    }
    if (ct.includes("multipart/form-data")) {
      const fd = await req.formData();
      const obj: Record<string, string> = {};
      for (const [k, v] of fd.entries()) obj[k] = typeof v === "string" ? v : v.name;
      return obj as Body;
    }
    // Fallback: try JSON, then urlencoded
    const txt = await req.text();
    try { return JSON.parse(txt); } catch { 
      const pairs = new URLSearchParams(txt);
      const obj: Record<string, string> = {};
      pairs.forEach((v, k) => { obj[k] = v; });
      return obj as Body;
    }
  } catch {
    return {};
  }
}

async function sendWithResendREST(
  from: string,
  to: string,
  subject: string,
  html: string,
  apiKey: string,
  timeoutMs = 12000
) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ from, to, subject, html }),
      signal: ctrl.signal
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, json };
  } finally {
    clearTimeout(t);
  }
}

export default async function handler(request: Request): Promise<Response> {
  const started = Date.now();
  const log = (...a: any[]) => console.log("[/api/register]", ...a);

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
      status: 405, headers: { "content-type": "application/json" }
    });
  }

  // Env check
  const env = readEnv();
  if (!env.ok) {
    log("Missing env", env.missing);
    return new Response(JSON.stringify({ ok: false, error: `Missing env: ${env.missing.join(", ")}` }), {
      status: 500, headers: { "content-type": "application/json" }
    });
  }

  // Parse body (never hangs)
  const body = await readBody(request);
  log("Parsed body in", Date.now() - started, "ms:", body);

  // Honeypot
  if (body.company) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { "content-type": "application/json" }
    });
  }

  const name = safe(body.name);
  const email = safe(body.email);
  const message = safe(body.message);

  if (!name || !email) {
    return new Response(JSON.stringify({ ok: false, error: "Missing name or email" }), {
      status: 400, headers: { "content-type": "application/json" }
    });
  }

  const html = `
    <h2>New investor registration</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
    <p><small>Submitted: ${new Date().toISOString()}</small></p>
  `;

  // Call Resend REST with a short timeout so we never hit 300s
  const from = `Percy — AdviTravel <${process.env.FROM_EMAIL!}>`;
  const res = await sendWithResendREST(
    from,
    process.env.TO_EMAIL!,
    "New investor form submission",
    html,
    process.env.RESEND_API_KEY!,
    12000 // 12s timeout
  ).catch((e) => ({ ok: false, status: 0, json: { error: String(e?.message || e) } }));

  log("Resend returned in", Date.now() - started, "ms", res.status, res.json);

  if (!res.ok) {
    // Bubble up the exact error for debugging
    return new Response(JSON.stringify({ ok: false, error: "Resend error", detail: res.json }), {
      status: 502, headers: { "content-type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ ok: true, id: (res.json as any)?.id ?? null }), {
    status: 200, headers: { "content-type": "application/json" }
  });
}
