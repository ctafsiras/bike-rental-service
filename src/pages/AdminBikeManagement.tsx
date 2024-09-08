import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCreateNewBikeMutation,
  useDeleteBikeMutation,
  useGetAllBikesQuery,
  useUpdateBikeMutation,
} from "@/redux/api/bikeApi";
import Loader from "@/components/loader";

export default function AdminBikeManagement() {
  const [bikes, setBikes] = useState([] as any[]);
  const [editingBike, setEditingBike] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    availability: "",
  });
  const { isLoading, data: allBikes } = useGetAllBikesQuery(null);
  const [createNewBike, { isLoading: isCreating }] = useCreateNewBikeMutation();
  const [updateBike, { isLoading: isUpdating }] = useUpdateBikeMutation();
  const [deleteBike, { isLoading: isDeleting }] = useDeleteBikeMutation();

  useEffect(() => {
    if (allBikes) {
      setBikes(allBikes);
    }
  }, [allBikes]);
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        (filters.availability === "available" && bike.isAvailable === true) ||
        (filters.availability === "unavailable" && bike.isAvailable === false))
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditingBike((prevBike: any) => ({ ...prevBike, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingBike._id) {
      updateBike({
        bike: editingBike,
        token: localStorage.getItem("token") || "",
      });
    } else {
      createNewBike({
        bike: {
          ...editingBike,
          isAvailable: true,
          pricePerHour: Number(editingBike.pricePerHour),
          cc: Number(editingBike.cc),
          year: Number(editingBike.year),
        },
        token: localStorage.getItem("token") || "",
      });
    }
    setIsDialogOpen(false);
    setEditingBike(null);
  };

  const handleDelete = (id: string) => {
    deleteBike({ id, token: localStorage.getItem("token") || "" });
  };

  if (isLoading) {
    return <Loader />;
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
              {/* <Input
                name="availability"
                type="select"
                value={filters.availability}
                onChange={handleFilterChange}
                className="w-full sm:w-auto"
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Input> */}

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingBike({})}>
                    Add New Bike
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingBike?._id ? "Edit Bike" : "Add New Bike"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input
                        name="name"
                        placeholder="Name"
                        value={editingBike?.name || ""}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="description"
                        placeholder="Description"
                        value={editingBike?.description || ""}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="brand"
                        placeholder="Brand"
                        value={editingBike?.brand || ""}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="model"
                        placeholder="Model"
                        value={editingBike?.model || ""}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="pricePerHour"
                        type="number"
                        placeholder="Price Per Hour"
                        value={editingBike?.pricePerHour || ""}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="cc"
                        type="number"
                        placeholder="CC"
                        value={editingBike?.cc || ""}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="year"
                        type="number"
                        placeholder="Year"
                        value={editingBike?.year || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button
                      disabled={isCreating || isUpdating}
                      type="submit"
                      className="mt-4"
                    >
                      Save
                    </Button>
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
                  <TableHead>isAvailable</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBikes.map((bike) => (
                  <TableRow key={bike._id}>
                    <TableCell>{bike.name}</TableCell>
                    <TableCell>{bike.brand}</TableCell>
                    <TableCell>{bike.model}</TableCell>
                    <TableCell>${bike.pricePerHour}/day</TableCell>
                    <TableCell>{bike.cc}</TableCell>
                    <TableCell>{bike.year}</TableCell>
                    <TableCell>
                      {bike.isAvailable ? "Available" : "Unavailable"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() => {
                          setEditingBike(bike);
                          setIsDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        disabled={isDeleting}
                        variant="destructive"
                        onClick={() => handleDelete(bike._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
