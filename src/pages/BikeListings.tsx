import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllBikesQuery } from "@/redux/api/bikeApi";
import Loader from "@/components/loader";
import { Link } from "react-router-dom";

export default function BikeList() {
  const { isLoading, data: bikes } = useGetAllBikesQuery(null);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    availability: "",
  });

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredBikes = bikes?.filter(
    (bike) =>
      (filters.brand === "" ||
        bike.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (filters.model === "" ||
        bike.name.toLowerCase().includes(filters.model.toLowerCase())) &&
      (filters.availability === "" ||
        (filters.availability === "available" && bike.isAvailable) ||
        (filters.availability === "unavailable" && !bike.isAvailable))
  );

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Available Bikes</h1>

        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Input
            type="text"
            name="brand"
            placeholder="Filter by brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="w-full sm:w-auto"
          />
          <Input
            type="text"
            name="model"
            placeholder="Filter by model"
            value={filters.model}
            onChange={handleFilterChange}
            className="w-full sm:w-auto"
          />
          <Select
            name="availability"
            value={filters.availability}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, availability: value }))
            }
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </Select>
        </div>

        {/* Bike List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <Loader />
          ) : (
            filteredBikes?.map((bike) => (
              <Card key={bike._id}>
                <CardHeader>
                  <CardTitle>{bike.name}</CardTitle>
                  <CardDescription>{bike.brand}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Price: ${bike.pricePerHour}/day</p>
                  <p>CC: {bike.cc}</p>
                  <p>Year: {bike.year}</p>
                  <p>
                    Status: {bike.isAvailable ? "Available" : "Unavailable"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/bike-details" state={{ id: bike._id }}>
                    <Button>View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
