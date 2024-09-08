import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Booking,
  useGetAllUserBookingsQuery,
  useReturnBikeMutation,
} from "@/redux/api/bookingApi";
import Loader from "@/components/loader";

export default function ReturnBike() {
  const [rentals, setRentals] = useState<Booking[]>([]);
  const [selectedRental, setSelectedRental] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [endTime, setEndTime] = useState(new Date().toISOString().slice(0, 16));
  const [calculatedCost, setCalculatedCost] = useState(0);
  const token = localStorage.getItem("token") || "";
  const { data: allUserBookings, isLoading } =
    useGetAllUserBookingsQuery(token);
  const [returnBike, { isLoading: isReturning }] = useReturnBikeMutation();

  console.log(rentals);
  useEffect(() => {
    if (allUserBookings) {
      setRentals(allUserBookings);
    }
  }, [allUserBookings, isLoading]);

  const handleReturn = (rental: any) => {
    setSelectedRental(rental);
    setIsDialogOpen(true);
  };

  const calculateCost = () => {
    if (!endTime) return;

    const start = new Date(selectedRental.startTime);
    const end = new Date(endTime);
    const hours = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    );
    const cost = hours * 10; // Assuming $10 per hour
    setCalculatedCost(cost);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    returnBike({
      id: selectedRental._id,
      token: token,
    });
    setIsDialogOpen(false);
    setSelectedRental(null);
    setEndTime("");
    setCalculatedCost(0);
  };
  if (isLoading) {
    return <Loader />;
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
                {rentals.map((rental) => (
                  <TableRow key={rental._id}>
                    <TableCell>{rental.bikeId?.name}</TableCell>
                    <TableCell>{rental.userId?.name}</TableCell>
                    <TableCell>
                      {new Date(rental.startTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {rental.isReturned ? "Returned" : "Ongoing"}
                    </TableCell>
                    <TableCell>
                      {rental.isReturned === false && (
                        <Button
                          disabled={isReturning}
                          onClick={() => handleReturn(rental)}
                        >
                          Return
                        </Button>
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
                      <label className="block text-sm font-medium text-gray-700">
                        End Time
                      </label>
                      <Input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="button" onClick={calculateCost}>
                      Calculate Cost
                    </Button>
                    {calculatedCost > 0 && (
                      <p className="text-lg font-semibold">
                        Total Cost: ${calculatedCost}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="mt-4">
                    Confirm Return
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
