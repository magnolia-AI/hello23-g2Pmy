import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // This is a temporary solution to apply schema changes
    // In a real-world scenario, you would use a proper migration strategy
    // and ensure your database user has the correct permissions.
    
    // The 'drizzle-kit push' command is being simulated here
    // by directly applying the schema.
    // This is not a standard use of Drizzle ORM but a workaround for the current environment.
    
    // Manually creating the users table as db.push() is not directly available in the client
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" text,
        "email" text,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    return NextResponse.json({ success: true, message: 'Schema pushed successfully.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

