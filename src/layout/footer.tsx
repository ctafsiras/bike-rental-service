import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="/" className="text-2xl font-bold">BikeRental</a>
          </div>
          <div className="flex mb-6 md:mb-0">
            <a href="/privacy" className="mx-3 hover:text-blue-400 transition duration-300">Privacy Policy</a>
            <a href="/terms" className="mx-3 hover:text-blue-400 transition duration-300">Terms of Service</a>
            <a href="/contact" className="mx-3 hover:text-blue-400 transition duration-300">Contact Us</a>
          </div>
          <div className="flex">
            <a href="#" className="mx-3 hover:text-blue-400 transition duration-300"><Facebook /></a>
            <a href="#" className="mx-3 hover:text-blue-400 transition duration-300"><Twitter /></a>
            <a href="#" className="mx-3 hover:text-blue-400 transition duration-300"><Instagram /></a>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2023 BikeRental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}