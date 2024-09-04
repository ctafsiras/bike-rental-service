import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for rentals
const rentals = [
  { id: 1, bikeName: 'Mountain Bike', startTime: '2023-06-01T10:00', returnTime: '2023-06-02T10:00', totalCost: 100, paid: true },
  { id: 2, bikeName: 'Road Bike', startTime: '2023-06-05T14:00', returnTime: '2023-06-06T14:00', totalCost: 120, paid: false },
  { id: 3, bikeName: 'City Bike', startTime: '2023-06-10T09:00', returnTime: '2023-06-11T09:00', totalCost: 80, paid: true },
]

export default function MyRentals() {
  const [activeTab, setActiveTab] = useState('unpaid')

  const paidRentals = rentals.filter(rental => rental.paid)
  const unpaidRentals = rentals.filter(rental => !rental.paid)

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Rentals</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          <TabsContent value="unpaid">
            {unpaidRentals.map(rental => (
              <Card key={rental.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{rental.bikeName}</CardTitle>
                  <CardDescription>Rental ID: {rental.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Start Time: {new Date(rental.startTime).toLocaleString()}</p>
                  <p>Return Time: {new Date(rental.returnTime).toLocaleString()}</p>
                  <p>Total Cost: ${rental.totalCost}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => console.log(`/payment/${rental.id}`)}>Pay Now</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="paid">
            {paidRentals.map(rental => (
              <Card key={rental.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{rental.bikeName}</CardTitle>
                  <CardDescription>Rental ID: {rental.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Start Time: {new Date(rental.startTime).toLocaleString()}</p>
                  <p>Return Time: {new Date(rental.returnTime).toLocaleString()}</p>
                  <p>Total Cost: ${rental.totalCost}</p>
                  <p className="text-green-600 font-semibold">Paid</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}