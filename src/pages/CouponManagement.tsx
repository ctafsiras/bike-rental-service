import React, { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for coupons
const initialCoupons = [
  { id: 1, code: "SUMMER10", discount: 10, expiryDate: "2023-08-31" },
  { id: 2, code: "NEWUSER20", discount: 20, expiryDate: "2023-12-31" },
];

export default function CouponManagement() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditingCoupon((prevCoupon: any) => ({ ...prevCoupon, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingCoupon.id) {
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.id === editingCoupon.id ? editingCoupon : coupon
        )
      );
    } else {
      setCoupons((prevCoupons) => [
        ...prevCoupons,
        { ...editingCoupon, id: Date.now() },
      ]);
    }
    setIsDialogOpen(false);
    setEditingCoupon(null);
  };

  const handleDelete = (id: number) => {
    setCoupons((prevCoupons) =>
      prevCoupons.filter((coupon) => coupon.id !== id)
    );
  };

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Coupon Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingCoupon({})}>
                  Add New Coupon
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCoupon?.id ? "Edit Coupon" : "Add New Coupon"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <Input
                      name="code"
                      placeholder="Coupon Code"
                      value={editingCoupon?.code || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="discount"
                      type="number"
                      placeholder="Discount (%)"
                      value={editingCoupon?.discount || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="expiryDate"
                      type="date"
                      placeholder="Expiry Date"
                      value={editingCoupon?.expiryDate || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="mt-4">
                    Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>{coupon.discount}%</TableCell>
                    <TableCell>{coupon.expiryDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() => {
                          setEditingCoupon(coupon);
                          setIsDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(coupon.id)}
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
