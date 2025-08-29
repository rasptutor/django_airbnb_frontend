import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  (await cookieStore).set('session_userid', '', { path: '/' });
  // remove other auth cookies if needed
  return NextResponse.json({ success: true });
}
