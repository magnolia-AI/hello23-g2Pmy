import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { posts } from '@/lib/schema';

export async function GET() {
  try {
    console.log('Seeding database from API route...');

    // Manually create table if it doesn't exist.
    // This is a temporary workaround for the Drizzle CLI issue.
    await (db as any).run(
      `CREATE TABLE IF NOT EXISTS "posts" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" text NOT NULL,
        "content" text,
        "created_at" timestamp DEFAULT now() NOT NULL
      );`
    );
    console.log('Table "posts" checked/created successfully.');

    // Clear existing posts to prevent duplicates on re-runs
    await db.delete(posts);
    console.log('Existing posts cleared.');

    // Seed the database with some sample posts
    await db.insert(posts).values([
      {
        title: 'First Post: Getting Started with Next.js',
        content: 'This is a sample post about setting up a Next.js project. It is fetched from a Neon database using Drizzle ORM.',
      },
      {
        title: 'Second Post: Styling with Tailwind CSS',
        content: 'A guide on how to effectively use Tailwind CSS for modern web design in a Next.js application.',
      },
      {
        title: 'Third Post: Database Management with Drizzle',
        content: 'Exploring the features of Drizzle ORM for type-safe database queries and schema management.',
      },
    ]);

    console.log('Database seeded successfully!');
    return NextResponse.json({ message: 'Database seeded successfully!' });

  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ message: 'Error seeding database', error: (error as Error).message }, { status: 500 });
  }
}

