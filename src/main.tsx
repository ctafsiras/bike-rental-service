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
import ProfileManagement from "./pages/ProfileManagement.tsx";
import BasicLayout from "./layout/basic-layout.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import ProtectedRoute from "./layout/ProtectedRoute.tsx";
import ProtectedAdmin from "./layout/ProtectedAdmin.tsx";
import { Toaster } from "@/components/ui/toaster";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
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
        element: (
          <ProtectedRoute>
            <RentalManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
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
            element: (
              <ProtectedAdmin>
                <AdminUserManagement />
              </ProtectedAdmin>
            ),
          },
          {
            path: "bike-management",
            element: (
              <ProtectedAdmin>
                <AdminBikeManagement />
              </ProtectedAdmin>
            ),
          },
          {
            path: "return-bike",
            element: (
              <ProtectedAdmin>
                <ReturnBike />
              </ProtectedAdmin>
            ),
          },
          {
            path: "coupon-management",
            element: (
              <ProtectedAdmin>
                <CouponManagement />
              </ProtectedAdmin>
            ),
          },
        ],
      },
      {
        path: "/discount-wheel",
        element: <DiscountWheel />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
