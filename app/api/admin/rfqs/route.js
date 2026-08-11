import { NextResponse } from 'next/server';
import { getRFQs } from '@/lib/db';
import { isAuthorised } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getRFQs());
}
