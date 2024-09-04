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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <img src="/hero-image.jpg" alt="Hero Image" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Rent Your Dream Bike Today
          </h1>
          <p className="text-xl mb-8">Explore the city on two wheels</p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search for bikes" />
            <Button type="submit">Search</Button>
          </div>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Bikes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((bike) => (
              <Card key={bike}>
                <CardHeader>
                  <CardTitle>Bike Model {bike}</CardTitle>
                  <CardDescription>Brand Name</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={`/bike-${bike}.jpg`}
                    width={300}
                    height={200}
                    alt={`Bike ${bike}`}
                  />
                </CardContent>
                <CardFooter>
                  <Button>View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <Card key={testimonial}>
                <CardHeader>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    "Great service! The bikes were in excellent condition and
                    the rental process was smooth."
                  </p>
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
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <Input type="text" placeholder="Name" />
            </div>
            <div className="mb-4">
              <Input type="email" placeholder="Email" />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows={4}
                placeholder="Message"
              ></textarea>
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
