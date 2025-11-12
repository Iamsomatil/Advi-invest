// api/register.ts
// Vercel Node.js Serverless Function (classic req/res signature)
import { IncomingMessage, ServerResponse } from "http";

const REQUIRED = ["RESEND_API_KEY", "FROM_EMAIL", "TO_EMAIL"] as const;
type Body = { name?: string; email?: string; message?: string; company?: string };

type Req = IncomingMessage & { method?: string; body?: unknown };
type Res = ServerResponse & {
  status: (code: number) => Res;
  json: (obj: unknown) => void;
  setHeader: (name: string, value: string) => void;
  send: (body: string) => void;
};

const safe = (v: unknown) => String(v ?? "").replace(/[\r\n]/g, " ").slice(0, 1000);

function readEnv() {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  return { ok: missing.length === 0, missing };
}

function getErrorMessage(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    const m = (e as { message?: unknown }).message;
    return typeof m === "string" ? m : String(e);
  }
  return String(e);
}

async function parseBody(req: IncomingMessage): Promise<Body> {
  // If Vercel already parsed it (usual for JSON), use it
  // @ts-expect-error body is an extension on IncomingMessage in some platforms
  if ((req as Req).body && typeof (req as Req).body === "object") return (req as Req).body as Body;

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

export default async function handler(req: Req, res: Res) {
  const started = Date.now();
  const log = (...a: unknown[]) => console.log("[/api/register]", ...a);

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

  let body: Body = {};
  try {
    body = await parseBody(req);
  } catch {
    body = {};
  }
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

  const out = await (async () => {
    try {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Percy — AdviTravel <${process.env.FROM_EMAIL}>`,
          to: process.env.TO_EMAIL,
          subject: "New investor form submission",
          html,
        }),
      });
      const json: Record<string, unknown> = await resp.json().catch(() => ({} as Record<string, unknown>));
      return { ok: resp.ok, status: resp.status, json };
    } catch (e) {
      return {
        ok: false,
        status: 0,
        json: { error: getErrorMessage(e) },
      } as { ok: boolean; status: number; json: Record<string, unknown> | { error: string } };
    }
  })();

  log("Resend returned in", Date.now() - started, "ms", out.status, out.json);

  if (!out.ok) {
    res.status(502).json({ ok: false, error: "Resend error", detail: out.json });
    return;
  }

  const id = typeof out.json === "object" && out.json && "id" in out.json ? (out.json as { id?: unknown }).id ?? null : null;
  res.status(200).json({ ok: true, id });
}
