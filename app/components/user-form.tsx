'use client'

import { useActionState, useEffect, useRef } from 'react'
import { createUser } from '@/app/actions/users'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function UserForm() {
  const { toast } = useToast()
  const [state, formAction, isPending] = useActionState(createUser, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      toast({ title: 'Success', description: 'User created successfully.' })
      formRef.current?.reset()
    } else if (state?.error) {
      toast({ title: 'Error', description: state.error, variant: 'destructive' })
    }
  }, [state, toast])

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Enter user's name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Enter user's email" required />
        </div>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Adding User...' : 'Add User'}
      </Button>
    </form>
  )
}

