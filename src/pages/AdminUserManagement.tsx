import { useEffect, useState } from "react";
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
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useMakeAdminMutation,
} from "@/redux/api/userApi";
import Loader from "@/components/loader";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([] as any[]);
  const token = localStorage.getItem("token") || "";
  const { data, isLoading } = useGetAllUsersQuery(token);
  const [filter, setFilter] = useState("");
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [makeAdmin, { isLoading: isMaking }] = useMakeAdminMutation();

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, isLoading]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (userId: string) => {
    deleteUser({ token, userId });
  };

  const handlePromote = (userId: string) => {
    makeAdmin({ token, userId });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-4">
              <Input
                type="text"
                placeholder="Filter users"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        disabled={isDeleting}
                        className="mr-2"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                      {user.role === "user" && (
                        <Button
                          disabled={isMaking}
                          onClick={() => handlePromote(user._id)}
                        >
                          Promote to Admin
                        </Button>
                      )}
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
