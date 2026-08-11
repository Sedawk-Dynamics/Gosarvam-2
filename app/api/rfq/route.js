import { NextResponse } from 'next/server';
import { saveRFQ } from '@/lib/db';
import { sendRFQEmail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.name || !data.email) {
      return NextResponse.json(
        { ok: false, error: 'Name and email are required.' },
        { status: 400 },
      );
    }
    const id = saveRFQ(data);
    // Await the send so it cannot be cut short when the function suspends.
    await sendRFQEmail(data).catch(e => console.error('RFQ email failed:', e.message));
    console.log(`[RFQ] #${id} from ${data.name} <${data.email}>`);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error('[RFQ] Error:', err);
    return NextResponse.json(
      { ok: false, error: 'Server error — please try again.' },
      { status: 500 },
    );
  }
}
