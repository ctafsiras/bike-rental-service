import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { useGetAllBikesQuery } from "@/redux/api/bikeApi";
import Loader from "@/components/loader";
import { Link } from "react-router-dom";
import BikeGif from "../assets/bike.gif";
import ContactUs from "./ContactUs";

const testimonials = [
  {
    name: "Ashiqur Rahman",
    review:
      "Excellent service! The bikes were in brand-new condition, and the rental process was very smooth.",
  },
  {
    name: "Tasnim Ara",
    review:
      "I use this service regularly. Timely service and very helpful staff.",
  },
  {
    name: "Zubair Alam",
    review:
      "Great experience. The bikes were comfortable and safe. Thank you for your outstanding service.",
  },
];

export default function Home() {
  const { isLoading, data } = useGetAllBikesQuery(null);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <img
          src={BikeGif}
          className="w-full h-full object-cover"
          alt="Hero Image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Rent Your Dream Bike Today
          </h1>
          <p className="text-xl mb-8">Explore the city on two wheels</p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search for bikes" />
            <Link to={"/bikes"}>
              <Button>Get Your Dream Bike</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Bikes
          </h2>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data?.map((bike) => (
                <Card key={bike._id}>
                  <CardHeader>
                    <CardTitle>{bike.name}</CardTitle>
                    <CardDescription>Brand: {bike.brand}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={`https://img.freepik.com/premium-photo/sketch-sport-bike-white-background_956363-7940.jpg?w=300`}
                      width={300}
                      height={200}
                      alt={`Bike ${bike.name}`}
                    />
                  </CardContent>
                  <CardFooter>
                    <Link to="/bike-details" state={{ id: bike._id }}>
                      <Button>View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{testimonial.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We offer competitive prices for all our bike rentals.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wide Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Choose from our extensive range of bikes for all purposes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Excellent Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our customer service team is always ready to assist you.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactUs />
    </div>
  );
}
