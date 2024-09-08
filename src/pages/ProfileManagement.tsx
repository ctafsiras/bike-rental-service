import React, { MouseEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/userApi";
import Loader from "@/components/loader";

export default function ProfileManagement() {
  const token = localStorage.getItem("token") || "";
  const { isLoading, data: user } = useGetMyProfileQuery(token);
  const [updateMyProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  if (isLoading) return <Loader />;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUser((prevUser: any) => ({ ...prevUser, [name]: value }));
  };
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Handle form submission here (e.g., update user profile)
    updateMyProfile({
      token,
      user: {
        name: editedUser?.name,
        email: editedUser?.email,
        phone: editedUser?.phone,
        address: editedUser?.address,
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Welcome, {editedUser?.name}!</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <form onSubmit={handleSubmit}> */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={editedUser?.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={editedUser?.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={editedUser?.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Input
                  type="text"
                  name="address"
                  value={editedUser?.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            {isEditing ? (
              <Button
                disabled={isUpdating}
                onClick={(e: MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
                className="mt-4"
              >
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="mt-4">
                Edit Profile
              </Button>
            )}
            {/* </form> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
