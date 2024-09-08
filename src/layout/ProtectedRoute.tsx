import Loader from "@/components/loader";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const { isLoading, data: user } = useGetMyProfileQuery(token);

  const isAuthenticated = !!user?._id; // Replace with actual authentication logic

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Show loader while loading
  if (isLoading) return <Loader />;

  // Show children if authenticated
  return isAuthenticated ? children : null; // Return null or a fallback UI while redirecting
};

export default ProtectedRoute;
