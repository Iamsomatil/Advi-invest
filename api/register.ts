import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const safe = (v: unknown) => String(v ?? '').replace(/[\r\n]/g, ' ').slice(0, 1000);

export const runtime = 'nodejs22.x';

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' }
    });
  }

  try {
    type Body = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };
    const data: Body = await request.json().catch(() => ({} as Record<string, unknown>));
    const { name, email, message, company } = data;

    // Honeypot: if company is provided, silently succeed
    if (company) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    const sName = safe(name);
    const sEmail = safe(email);
    const sMsg = safe(message);

    if (!sName || !sEmail) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing name or email' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }

    const html = `
      <h2>New investor registration</h2>
      <p><strong>Name:</strong> ${sName}</p>
      <p><strong>Email:</strong> ${sEmail}</p>
      ${sMsg ? `<p><strong>Message:</strong> ${sMsg}</p>` : ''}
      <p><small>Submitted: ${new Date().toISOString()}</small></p>
    `;

    await resend.emails.send({
      from: `Percy — AdviTravel <${process.env.FROM_EMAIL!}>`,
      to: process.env.TO_EMAIL!,
      subject: 'New investor form submission',
      html
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}
