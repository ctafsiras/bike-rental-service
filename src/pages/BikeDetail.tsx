import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for a single bike
const bike = {
  id: 1,
  name: "Mountain Bike",
  brand: "Trek",
  price: 50,
  cc: 250,
  year: 2022,
  available: true,
  description:
    "A high-performance mountain bike perfect for rough terrains and adventurous trails.",
};

export default function BikeDetail() {
  const id=1;

  // In a real application, you would fetch the bike data based on the ID

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>{bike.name}</CardTitle>
            <CardDescription>{bike.brand}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <strong>Price:</strong> ${bike.price}/day
              </p>
              <p>
                <strong>CC:</strong> {bike.cc}
              </p>
              <p>
                <strong>Year:</strong> {bike.year}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {bike.available ? "Available" : "Unavailable"}
              </p>
              <p>
                <strong>Description:</strong> {bike.description}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            {bike.available ? (
              <Button onClick={() => console.log(`/booking/${id}`)}>
                Book Now
              </Button>
            ) : (
              <Button disabled>Currently Unavailable</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
