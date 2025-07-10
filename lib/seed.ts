import db  from './db';
import { users } from './schema';

async function main() {
  console.log('Seeding database...');
  await db.insert(users).values([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ]);
  console.log('Database seeded successfully!');
}

main();

