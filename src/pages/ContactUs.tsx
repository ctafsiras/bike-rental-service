import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ContactUs = () => {
  return (
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
  );
};

export default ContactUs;
