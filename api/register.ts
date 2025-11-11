import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const cap = (s: string, n = 1000) => s.slice(0, n);
const safe = (v: unknown) => cap(String(v ?? '').replace(/[\r\n]/g, ' '));
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Minimal Vercel-like types to keep local typechecking happy without adding deps
type VercelRequest = { method?: string; body?: unknown };
type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

interface Submission {
  name: string;
  email: string;
  company?: string;
  role?: string;
  interest?: string[];
  checkSize?: string;
  geo?: string;
  message?: string;
  consent?: boolean;
  website_url?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
  referrer?: string;
  device?: string;
}

function parseBody(b: unknown): Record<string, unknown> {
  if (typeof b === 'string') { try { return JSON.parse(b); } catch { return {}; } }
  return (b ?? {}) as Record<string, unknown>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const bodyRaw = parseBody(req.body);
    const body = bodyRaw as Partial<Submission> & Record<string, unknown>;

    // Honeypot: if hidden website_url has any value, silently succeed (no email)
    if (typeof body.website_url === 'string' && body.website_url.trim().length > 0) {
      return res.status(200).json({ ok: true });
    }

    const sName = safe(body.name);
    const sEmail = safe(body.email);

    if (!sName || !sEmail) return res.status(400).json({ ok: false, error: 'Missing name or email' });
    if (!isEmail(sEmail)) return res.status(400).json({ ok: false, error: 'Invalid email' });

    const interest = Array.isArray(body.interest) ? body.interest.map(safe) : [];
    const utm = body.utm && typeof body.utm === 'object' ? (body.utm as Record<string, unknown>) : {};

    const rows: Array<[string, string]> = [
      ['Company / Fund', safe(body.company)],
      ['Role / Title', safe(body.role)],
      ['Investment Interest', interest.join(', ') || ''],
      ['Estimated Check Size', safe(body.checkSize)],
      ['Geography / Focus', safe(body.geo)],
      ['Consent', String(!!body.consent)],
      ['Message', safe(body.message)],
      ['UTM Source', safe(utm.source as string)],
      ['UTM Medium', safe(utm.medium as string)],
      ['UTM Campaign', safe(utm.campaign as string)],
      ['Referrer', safe(body.referrer)],
      ['Device', safe(body.device)],
      ['Submitted', new Date().toISOString()]
    ];

    const html = `
      <h2>New investor registration</h2>
      <p><strong>Name:</strong> ${sName}</p>
      <p><strong>Email:</strong> ${sEmail}</p>
      ${rows.map(([k,v]) => v ? `<p><strong>${k}:</strong> ${v}</p>` : '').join('')}
    `;

    await resend.emails.send({
      from: `Percy — AdviTravel <${process.env.FROM_EMAIL!}>`,
      to: [process.env.TO_EMAIL!],
      subject: 'New investor form submission',
      html
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
