// api/register.ts  (Node serverless req/res)
type Body = { name?: string; email?: string; message?: string; company?: string };

type ReqLike = AsyncIterable<unknown> & { body?: unknown; method?: string };
type ResLike = { status: (code: number) => { json: (obj: unknown) => void } };

const safe = (v: unknown) => String(v ?? "").replace(/[\r\n]/g, " ").slice(0, 1000);

async function parseBody(req: ReqLike): Promise<Body> {
  if (req.body && typeof req.body === "object") return req.body as Body;
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    if (chunk instanceof Uint8Array) {
      chunks.push(chunk);
    } else if (typeof chunk === "string") {
      chunks.push(new TextEncoder().encode(chunk));
    } else {
      chunks.push(new TextEncoder().encode(String(chunk)));
    }
  }
  const total = chunks.reduce((acc, cur) => acc + cur.byteLength, 0);
  const merged = new Uint8Array(total);
  let off = 0;
  for (const u8 of chunks) { merged.set(u8, off); off += u8.byteLength; }
  const raw = new TextDecoder().decode(merged).trim();
  if (!raw) return {};
  try { return JSON.parse(raw); } catch {
    const params = new URLSearchParams(raw);
    const obj: Record<string,string> = {};
    for (const [k,v] of params.entries()) obj[k]=v;
    return obj as Body;
  }
}

export default async function handler(req: ReqLike, res: ResLike) {
  if (req.method !== "POST") {
    res.status(405).json({ ok:false, error:"Method not allowed" });
    return;
  }

  const body: Body = await parseBody(req).catch(() => ({} as Body));
  const name = safe(body.name), email = safe(body.email), message = safe(body.message);
  // (Optional) temporarily disable honeypot while testing:
  // if (body.company) return res.status(200).json({ ok:true });

  if (!name || !email) {
    res.status(400).json({ ok:false, error:"Missing name or email" });
    return;
  }

  const html = `
    <h2>New investor registration</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
    <p><small>Submitted: ${new Date().toISOString()}</small></p>
  `;

  // SEND via Resend REST — POST /emails only
  const rsp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `Percy — AdviTravel <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,                 // test with a Gmail first
      subject: "New investor form submission",
      html
    })
  });

  const json = await rsp.json().catch(() => ({}));
  console.log("Resend response", rsp.status, json);

  if (!rsp.ok) {
    res.status(502).json({ ok:false, status:rsp.status, detail:json });
    return;
  }
  res.status(200).json({ ok:true, id: json?.id ?? null });
}
