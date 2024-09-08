import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { Users, Bike, Calendar, User, ListStart, Lamp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const route = location.pathname.split("/")[2];
  // what is current route? take it from the react-router-dom

  const token = localStorage.getItem("token") || "";
  const { isLoading, data: fetchedUser } = useGetMyProfileQuery(token);

  const [user, setUser] = useState(() => {
    // Check if user data is in localStorage initially
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (fetchedUser && fetchedUser._id) {
      setUser(fetchedUser);
      localStorage.setItem("user", JSON.stringify(fetchedUser)); // Store user data in localStorage
    }
  }, [fetchedUser]);

  const navItems = [
    {
      link: "profile-management",
      label: "Profile Management",
      icon: User,
    },
    {
      link: "rental-management",
      label: "Rental Management",
      icon: ListStart,
    },
  ];
  const adminNavItems = [
    { link: "user-management", label: "User Management", icon: Users },
    { link: "bike-management", label: "Bike Management", icon: Bike },
    { link: "return-bike", label: "Return Bike", icon: Calendar },
    { link: "coupon-management", label: "Coupon Management", icon: Lamp },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-gray-100/40 lg:block">
        {isLoading && <div>Loading...</div>}
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link key={item.link} to={item.link}>
              <Button
                variant={item.link === route ? "secondary" : "ghost"}
                className="justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          {user.role === "admin" &&
            adminNavItems.map((item) => (
              <Link key={item.link} to={item.link}>
                <Button
                  variant={item.link === route ? "secondary" : "ghost"}
                  className="justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <ScrollArea className="h-full">
          <Outlet />
        </ScrollArea>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background lg:hidden">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link key={item.link} to={item.link}>
              <Button
                key={item.link}
                variant="ghost"
                className="flex-1 flex-col items-center py-2"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          ))}
          {user.role === "admin" &&
            adminNavItems.map((item) => (
              <Link key={item.link} to={item.link}>
                <Button
                  key={item.link}
                  variant="ghost"
                  className="flex-1 flex-col items-center py-2"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
}
