import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignUpMutation } from "@/redux/api/userApi";
import { Navigate } from "react-router-dom";
import Loader from "@/components/loader";

export default function SignUp() {
  const [signUp, { isLoading, data }] = useSignUpMutation();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    // You can use the formData object for further processing
    signUp(formData);
  };
  if (data?.name) {
    return <Navigate to="/login" replace={true} />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create your account to start renting bikes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                minLength={3}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                type="password"
                name="password"
                minLength={6}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                minLength={10}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="address"
                minLength={6}
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
