import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select } from "@/components/ui/select"

// Mock data for users
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'USER' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'USER' },
  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' },
]

export default function AdminUserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filter, setFilter] = useState('')

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEditingUser((prevUser: any) => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editingUser.id) {
      setUsers(prevUsers => prevUsers.map(user => user.id === editingUser.id ? editingUser : user))
    } else {
      setUsers(prevUsers => [...prevUsers, { ...editingUser, id: Date.now() }])
    }
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  const handleDelete = (id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
  }

  const handlePromote = (id: number) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === id ? { ...user, role: 'ADMIN' } : user
    ))
  }

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-4">
              <Input
                type="text"
                placeholder="Filter users"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="max-w-sm"
              />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingUser({})}>Add New User</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingUser?.id ? 'Edit User' : 'Add New User'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input name="name" placeholder="Name" value={editingUser?.name || ''} onChange={handleInputChange} required />
                      <Input name="email" type="email" placeholder="Email" value={editingUser?.email || ''} onChange={handleInputChange} required />
                      <Select name="role" value={editingUser?.role || 'USER'} onValueChange={(value) => setEditingUser((prev:any) => ({ ...prev, role: value }))}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </Select>
                    </div>
                    <Button type="submit" className="mt-4">Save</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button variant="outline" className="mr-2" onClick={() => { setEditingUser(user); setIsDialogOpen(true); }}>Edit</Button>
                      <Button variant="destructive" className="mr-2" onClick={() => handleDelete(user.id)}>Delete</Button>
                      {user.role === 'USER' && (
                        <Button onClick={() => handlePromote(user.id)}>Promote to Admin</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}