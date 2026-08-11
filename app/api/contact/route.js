import { NextResponse } from 'next/server';
import { saveContact } from '@/lib/db';
import { sendContactEmail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { ok: false, error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }
    const id = saveContact(data);
    await sendContactEmail(data).catch(e => console.error('Contact email failed:', e.message));
    console.log(`[Contact] #${id} from ${data.name} <${data.email}>`);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error('[Contact] Error:', err);
    return NextResponse.json(
      { ok: false, error: 'Server error — please try again.' },
      { status: 500 },
    );
  }
}
