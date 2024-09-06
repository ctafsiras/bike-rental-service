import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { useGetSingleBikeQuery } from "@/redux/api/bikeApi";
import Loader from "@/components/loader";

export default function RentalManagement() {
  const location = useLocation();
  const { id } = location.state;
  const { isLoading, data: bike } = useGetSingleBikeQuery(id);
  const [startTime, setStartTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log(startTime);

  const handleBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the booking data to your backend
    setIsDialogOpen(true);
  };

  const handlePayment = () => {
    // Here you would typically handle the payment process
    // router.push('/payment')
  };

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-md mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Book Your Bike</CardTitle>
              <CardDescription>Bike ID: {bike?._id}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBooking}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <Input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Book Now
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>
                You're about to book this bike. An advance payment of $100 is
                required to confirm your booking.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handlePayment}>Proceed to Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
