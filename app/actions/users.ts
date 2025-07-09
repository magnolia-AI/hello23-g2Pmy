'use server'

import db  from '@/lib/db'
import { users } from '@/lib/schema'
import { revalidatePath } from 'next/cache'

export async function getUsers() {
  const data = await db.select().from(users)
  return data
}

export async function createUser(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  if (!name || !email) {
    return { error: 'Name and email are required' }
  }

  try {
    await db.insert(users).values({ name, email })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error creating user:', error)
    return { error: 'Failed to create user' }
  }
} 

