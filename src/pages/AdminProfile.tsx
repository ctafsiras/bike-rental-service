import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "123-456-7890",
    notificationsEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setAdmin((prevAdmin) => ({ ...prevAdmin, notificationsEnabled: checked }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here (e.g., update admin profile)
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Admin Profile</CardTitle>
            <CardDescription>
              Manage your admin account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={admin.name}
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
                    value={admin.email}
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
                    value={admin.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Enable Notifications
                  </span>
                  <Switch
                    checked={admin.notificationsEnabled}
                    onCheckedChange={handleSwitchChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              {isEditing ? (
                <Button type="submit" className="mt-4">
                  Save Changes
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="mt-4"
                >
                  Edit Profile
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
