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

// Mock data for bikes
const bikes = [
  {
    id: 1,
    name: "Mountain Bike",
    brand: "Trek",
    price: 50,
    cc: 250,
    year: 2022,
    available: true,
  },
  {
    id: 2,
    name: "Road Bike",
    brand: "Specialized",
    price: 60,
    cc: 300,
    year: 2023,
    available: true,
  },
  {
    id: 3,
    name: "City Bike",
    brand: "Giant",
    price: 40,
    cc: 200,
    year: 2021,
    available: false,
  },
];

export default function BikeList() {
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

  const filteredBikes = bikes.filter(
    (bike) =>
      (filters.brand === "" ||
        bike.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (filters.model === "" ||
        bike.name.toLowerCase().includes(filters.model.toLowerCase())) &&
      (filters.availability === "" ||
        (filters.availability === "available" && bike.available) ||
        (filters.availability === "unavailable" && !bike.available))
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
          {filteredBikes.map((bike) => (
            <Card key={bike.id}>
              <CardHeader>
                <CardTitle>{bike.name}</CardTitle>
                <CardDescription>{bike.brand}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Price: ${bike.price}/day</p>
                <p>CC: {bike.cc}</p>
                <p>Year: {bike.year}</p>
                <p>Status: {bike.available ? "Available" : "Unavailable"}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => console.log(`/bikes/${bike.id}`)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
