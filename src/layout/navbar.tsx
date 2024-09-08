import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SVGProps, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
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
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">BikeRental Service</span>
        </Link>
        <div className="hidden gap-4 md:flex">
          <NavLink
            to="/bikes"
            className={({ isActive, isPending }) =>
              isPending
                ? "text-gray-500 transition duration-200 hover:text-gray-700 pending"
                : isActive
                ? "text-blue-500 bg-blue-100 rounded-md py-2 px-4 transition duration-200 active"
                : "text-gray-500 transition duration-200 py-2 px-4 hover:text-gray-700"
            }
          >
            All Bikes
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
              isPending
                ? "text-gray-500 transition duration-200 hover:text-gray-700 pending"
                : isActive
                ? "text-blue-500 bg-blue-100 rounded-md py-2 px-4 transition duration-200 active"
                : "text-gray-500 transition duration-200 py-2 px-4 hover:text-gray-700"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive, isPending }) =>
              isPending
                ? "text-gray-500 transition duration-200 hover:text-gray-700 pending"
                : isActive
                ? "text-blue-500 bg-blue-100 rounded-md py-2 px-4 transition duration-200 active"
                : "text-gray-500 transition duration-200 py-2 px-4 hover:text-gray-700"
            }
          >
            About Us
          </NavLink>
          {isLoading ? (
            <Button disabled>Loading...</Button>
          ) : user?._id ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden">
            <div className="grid gap-4 p-4">
              <Link
                to="/"
                className="text-sm font-medium hover:underline hover:underline-offset-4"
              >
                Home
              </Link>
              <Link
                to="bikes"
                className="text-sm font-medium hover:underline hover:underline-offset-4"
              >
                All Bikes
              </Link>
              <Link
                to="dashboard"
                className="text-sm font-medium hover:underline hover:underline-offset-4"
              >
                Dashboard
              </Link>
              <Link
                to="about-us"
                className="text-sm font-medium hover:underline hover:underline-offset-4"
              >
                About Us
              </Link>

              {isLoading ? (
                <div>Loading...</div>
              ) : user?._id ? (
                <Button>Logout</Button>
              ) : (
                <>
                  <Link
                    to="#"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Login
                  </Link>
                  <Link
                    to="#"
                    className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
