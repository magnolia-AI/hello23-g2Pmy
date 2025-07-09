import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { migrate } from 'drizzle-orm/neon-http/migrator';

export async function GET() {
  try {
    await migrate(db, { migrationsFolder: 'lib/drizzle' });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during migration:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

