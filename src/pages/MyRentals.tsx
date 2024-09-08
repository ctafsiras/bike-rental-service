import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserBookingsQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/loader";

// Mock data for rentals

export default function MyRentals() {
  const [rentals, setRentals] = useState([] as any[]);
  const token = localStorage.getItem("token") || "";
  const { data: userBookings, isLoading } = useGetUserBookingsQuery(token);

  console.log(rentals);
  useEffect(() => {
    if (userBookings) {
      setRentals(userBookings);
    }
  }, [userBookings, isLoading]);
  const [activeTab, setActiveTab] = useState("unpaid");

  const paidRentals = rentals.filter((rental) => rental.paid);
  const unpaidRentals = rentals.filter((rental) => !rental.paid);
  if (isLoading) {
    return <Loader />;
  }
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
            {unpaidRentals.map((rental) => (
              <Card key={rental._id} className="mb-4">
                <CardHeader>
                  <CardTitle>{rental.bikeId.name}</CardTitle>
                  <CardDescription>
                    Booked by: {rental.userId.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Start Time: {new Date(rental.startTime).toLocaleString()}
                  </p>
                  <p>
                    Return Time: {new Date(rental.returnTime).toLocaleString()}
                  </p>
                  <p>Total Cost: ${rental.totalCost}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => console.log(`/payment/${rental.id}`)}>
                    Pay Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="paid">
            {paidRentals.map((rental) => (
              <Card key={rental.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{rental.bikeId.name}d</CardTitle>
                  <CardDescription>Rental ID: {rental.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Start Time: {new Date(rental.startTime).toLocaleString()}
                  </p>
                  <p>
                    Return Time: {new Date(rental.returnTime).toLocaleString()}
                  </p>
                  <p>Total Cost: ${rental.totalCost}</p>
                  <p className="text-green-600 font-semibold">Paid</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
