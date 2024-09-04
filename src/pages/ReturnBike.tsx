import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for rentals
const initialRentals = [
  { id: 1, bikeName: 'Mountain Bike', userName: 'John Doe', startTime: '2023-06-01T10:00', status: 'ONGOING' },
  { id: 2, bikeName: 'Road Bike', userName: 'Jane Smith', startTime: '2023-06-05T14:00', status: 'ONGOING' },
  { id: 3, bikeName: 'City Bike', userName: 'Alice Johnson', startTime: '2023-06-10T09:00', status: 'RETURNED' },
]

export default function ReturnBike() {
  const [rentals, setRentals] = useState(initialRentals)
  const [selectedRental, setSelectedRental] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [endTime, setEndTime] = useState('')
  const [calculatedCost, setCalculatedCost] = useState(0)

  const handleReturn = (rental: any) => {
    setSelectedRental(rental)
    setIsDialogOpen(true)
  }

  const calculateCost = () => {
    if (!endTime) return

    const start = new Date(selectedRental.startTime)
    const end = new Date(endTime)
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))
    const cost = hours * 10 // Assuming $10 per hour
    setCalculatedCost(cost)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRentals(prevRentals => prevRentals.map(rental => 
      rental.id === selectedRental.id ? { ...rental, status: 'RETURNED' } : rental
    ))
    setIsDialogOpen(false)
    setSelectedRental(null)
    setEndTime('')
    setCalculatedCost(0)
  }

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Return Bike</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bike</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentals.map(rental => (
                  <TableRow key={rental.id}>
                    <TableCell>{rental.bikeName}</TableCell>
                    <TableCell>{rental.userName}</TableCell>
                    <TableCell>{new Date(rental.startTime).toLocaleString()}</TableCell>
                    <TableCell>{rental.status}</TableCell>
                    <TableCell>
                      {rental.status === 'ONGOING' && (
                        <Button onClick={() => handleReturn(rental)}>Return</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Return Bike</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Time</label>
                      <Input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="button" onClick={calculateCost}>Calculate Cost</Button>
                    {calculatedCost > 0 && (
                      <p className="text-lg font-semibold">Total Cost: ${calculatedCost}</p>
                    )}
                  </div>
                  <Button type="submit" className="mt-4">Confirm Return</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}