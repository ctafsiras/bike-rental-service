import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import BikeList from "./pages/BikeListings.tsx";
import BikeDetail from "./pages/BikeDetail.tsx";
import RentalManagement from "./pages/RentalManagement.tsx";
import MyRentals from "./pages/MyRentals.tsx";
import AdminBikeManagement from "./pages/AdminBikeManagement.tsx";
import AdminUserManagement from "./pages/AdminUserManagement.tsx";
import ReturnBike from "./pages/ReturnBike.tsx";
import CouponManagement from "./pages/CouponManagement.tsx";
import DiscountWheel from "./pages/DiscountWheel.tsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Dashboard from "./layout/dashboard.tsx";
import Footer from "./layout/footer.tsx";
import Navbar from "./layout/navbar.tsx";
import ProfileManagement from "./pages/ProfileManagement.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/bikes",
    element: <BikeList />,
  },
  {
    path: "/bike-details",
    element: <BikeDetail />,
  },
  {
    path: "/rental-management",
    element: <RentalManagement />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile-management",
        element: <ProfileManagement />,
      },
      {
        path: "rental-management",
        element: <MyRentals />,
      },
      {
        path: "user-management",
        element: <AdminUserManagement />,
      },
      {
        path: "bike-management",
        element: <AdminBikeManagement />,
      },
      {
        path: "return-bike",
        element: <ReturnBike />,
      },
      {
        path: "coupon-management",
        element: <CouponManagement />,
      },
    ],
  },
  {
    path: "/discount-wheel",
    element: <DiscountWheel />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </Provider>
  </StrictMode>
);
