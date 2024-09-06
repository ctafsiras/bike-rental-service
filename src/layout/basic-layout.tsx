import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const BasicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default BasicLayout;
