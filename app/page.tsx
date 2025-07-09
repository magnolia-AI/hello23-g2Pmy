import { getUsers } from '@/app/actions/users'
import { UserForm } from '@/app/components/user-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { users as usersSchema } from '@/lib/schema'

export default async function Home() {
  const users = await getUsers()

  return (
    <div className="min-h-full">
      <section className="container mx-auto px-4 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add a New User</CardTitle>
            </CardHeader>
            <CardContent>
              <UserForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
            </CardHeader>
            <CardContent>
              {users.length > 0 ? (
                <ul className="space-y-4">
                  {users.map((user) => (
                    <li key={user.id} className="p-4 border rounded-md shadow-sm">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No users found. Add one using the form above.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

