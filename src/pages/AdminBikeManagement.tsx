import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select } from "@/components/ui/select"

// Mock data for bikes
const initialBikes = [
  { id: 1, name: 'Mountain Bike', brand: 'Trek', price: 50, cc: 250, year: 2022, model: 'XC 1', available: true },
  { id: 2, name: 'Road Bike', brand: 'Specialized', price: 60, cc: 300, year: 2023, model: 'Tarmac', available: true },
  { id: 3, name: 'City Bike', brand: 'Giant', price: 40, cc: 200, year: 2021, model: 'Escape', available: false },
]

export default function AdminBikeManagement() {
  const [bikes, setBikes] = useState(initialBikes)
  const [editingBike, setEditingBike] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filters, setFilters] = useState({ brand: '', model: '', availability: '' })

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }))
  }

  const filteredBikes = bikes.filter(bike => 
    (filters.brand === '' || bike.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
    (filters.model === '' || bike.model.toLowerCase().includes(filters.model.toLowerCase())) &&
    (filters.availability === '' || 
     (filters.availability === 'available' && bike.available) ||
     (filters.availability === 'unavailable' && !bike.available))
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEditingBike((prevBike: any) => ({ ...prevBike, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editingBike.id) {
      setBikes(prevBikes => prevBikes.map(bike => bike.id === editingBike.id ? editingBike : bike))
    } else {
      setBikes(prevBikes => [...prevBikes, { ...editingBike, id: Date.now() }])
    }
    setIsDialogOpen(false)
    setEditingBike(null)
  }

  const handleDelete = (id: number) => {
    setBikes(prevBikes => prevBikes.filter(bike => bike.id !== id))
  }

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Bike Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-4">
              <Input
                type="text"
                name="brand"
                placeholder="Filter by brand"
                value={filters.brand}
                onChange={handleFilterChange}
              />
              <Input
                type="text"
                name="model"
                placeholder="Filter by model"
                value={filters.model}
                onChange={handleFilterChange}
              />
              <Select name="availability" value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Select>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingBike({})}>Add New Bike</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingBike?.id ? 'Edit Bike' : 'Add New Bike'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input name="name" placeholder="Name" value={editingBike?.name || ''} onChange={handleInputChange} required />
                      <Input name="brand" placeholder="Brand" value={editingBike?.brand || ''} onChange={handleInputChange} required />
                      <Input name="model" placeholder="Model" value={editingBike?.model || ''} onChange={handleInputChange} required />
                      <Input name="price" type="number" placeholder="Price" value={editingBike?.price || ''} onChange={handleInputChange} required />
                      <Input name="cc" type="number" placeholder="CC" value={editingBike?.cc || ''} onChange={handleInputChange} required />
                      <Input name="year" type="number" placeholder="Year" value={editingBike?.year || ''} onChange={handleInputChange} required />
                      <Select name="available" value={editingBike?.available ? 'true' : 'false'} onValueChange={(value) => setEditingBike((prev: any) => ({ ...prev, available: value === 'true' }))}>
                        <option value="true">Available</option>
                        <option value="false">Unavailable</option>
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
                  <TableHead>Brand</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>CC</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBikes.map(bike => (
                  <TableRow key={bike.id}>
                    <TableCell>{bike.name}</TableCell>
                    <TableCell>{bike.brand}</TableCell>
                    <TableCell>{bike.model}</TableCell>
                    <TableCell>${bike.price}/day</TableCell>
                    <TableCell>{bike.cc}</TableCell>
                    <TableCell>{bike.year}</TableCell>
                    <TableCell>{bike.available ? 'Available' : 'Unavailable'}</TableCell>
                    <TableCell>
                      <Button variant="outline" className="mr-2" onClick={() => { setEditingBike(bike); setIsDialogOpen(true); }}>Edit</Button>
                      <Button variant="destructive" onClick={() => handleDelete(bike.id)}>Delete</Button>
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