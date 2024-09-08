import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          About BikeRental Service
        </h1>

        {/* Mission Statement */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            At BikeRental Service, our mission is to provide high-quality bike
            rentals that enable people to explore Dhaka and other cities, stay
            active, and reduce their carbon footprint. We believe in promoting
            sustainable transportation options that are both fun and
            environmentally friendly for all Bangladeshis.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Farhana Ahmed",
                role: "CEO",
                image:
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
              },
              {
                name: "Mahmudul Hassan",
                role: "CTO",
                image:
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
              },
              {
                name: "Nusrat Jahan",
                role: "Operations Manager",
                image:
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
              },
            ].map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <img
                    src={member.image}
                    width={200}
                    height={200}
                    alt={member.name}
                    className="rounded-full"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* History & Milestones */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">2015</h3>
              <p>
                BikeRental BD was founded in Dhaka with a small fleet of 50
                bikes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">2018</h3>
              <p>
                Expanded to Chittagong, Sylhet, and other major cities with over
                1000 bikes in our fleet.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">2020</h3>
              <p>
                Launched our mobile app for easier bookings and bike tracking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">2023</h3>
              <p>
                Reached the milestone of serving over 1 million customers across
                20 cities in Bangladesh.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div>
            <p>
              <strong>Address:</strong> 123 Bikrampur Road, Dhaka, Bangladesh
              1205
            </p>
            <p>
              <strong>Phone:</strong> (+880) 1234-567890
            </p>
            <p>
              <strong>Email:</strong> info@bikerentalbd.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
