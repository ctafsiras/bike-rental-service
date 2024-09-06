import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold">
              BikeRental Service
            </Link>
          </div>
          <div className="flex mb-6 md:mb-0">
            <Link
              to="/privacy-policy"
              className="mx-3 hover:text-blue-400 transition duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="mx-3 hover:text-blue-400 transition duration-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact-us"
              className="mx-3 hover:text-blue-400 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex">
            <a
              href="https://facebook.com/ctafsiras"
              className="mx-3 hover:text-blue-400 transition duration-300"
            >
              <Facebook />
            </a>
            <a
              href="https://x.com/ctafsiras"
              className="mx-3 hover:text-blue-400 transition duration-300"
            >
              <Twitter />
            </a>
            <a
              href="https://instagram.com/ctafsiras"
              className="mx-3 hover:text-blue-400 transition duration-300"
            >
              <Instagram />
            </a>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 BikeRental Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
