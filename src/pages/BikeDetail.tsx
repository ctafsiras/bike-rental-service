import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSingleBikeQuery } from "@/redux/api/bikeApi";
import { Link, useLocation } from "react-router-dom";

export default function BikeDetail() {
  const location = useLocation();
  const { id } = location.state;
  const { isLoading, data: bike } = useGetSingleBikeQuery(id);
  // In a real application, you would fetch the bike data based on the ID
  // isLoading && <Loader />;
  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        {isLoading ? (
          <Loader />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{bike?.name}</CardTitle>
              <CardDescription>{bike?.brand}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  <strong>Price:</strong> ${bike?.pricePerHour}/day
                </p>
                <p>
                  <strong>CC:</strong> {bike?.cc}
                </p>
                <p>
                  <strong>Year:</strong> {bike?.year}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {bike?.isAvailable ? "Available" : "Unavailable"}
                </p>
                <p>
                  <strong>Description:</strong> {bike?.description}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              {bike?.isAvailable ? (
                <Link to="/rental-management" state={{ id: bike?._id }}>
                  <Button>Book Now</Button>
                </Link>
              ) : (
                <Button disabled>Currently Unavailable</Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
