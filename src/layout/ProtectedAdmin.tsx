import Loader from "@/components/loader";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedAdmin = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const { isLoading, data: user } = useGetMyProfileQuery(token);
  if (isLoading) return <Loader />;
  const isAuthenticated = user?.role === "admin"; // Replace with actual authentication logic

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Return null or a loader while checking authentication
  if (!isAuthenticated) {
    return null; // Optionally, return a loading spinner or fallback UI
  }

  return children;
};

export default ProtectedAdmin;
