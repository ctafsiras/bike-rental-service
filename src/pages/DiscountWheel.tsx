import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const discounts = [10, 20, 30]

export default function DiscountWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const spinWheel = () => {
    setIsSpinning(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * discounts.length)
      setSelectedDiscount(discounts[randomIndex])
      setIsSpinning(false)
      setIsDialogOpen(true)
    }, 3000) // Simulate spinning for 3 seconds
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-64 h-64 rounded-full border-8 border-blue-500 relative">
        <div className={`w-full h-full rounded-full ${isSpinning ? 'animate-spin' : ''}`}>
          {discounts.map((discount, index) => (
            <div
              key={index}
              className="absolute w-full h-full flex items-center justify-center"
              style={{ transform: `rotate(${120 * index}deg)` }}
            >
              <div className="text-2xl font-bold">{discount}%</div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">↓</div>
      </div>
      <Button onClick={spinWheel} disabled={isSpinning} className="mt-8">
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">You won a {selectedDiscount}% discount!</p>
            <p className="mb-4">Your coupon code is:</p>
            <div className="bg-gray-100 p-4 rounded-md">
              <code className="text-xl font-mono">DISCOUNT{selectedDiscount}</code>
            </div>
            <Button onClick={() => navigator.clipboard.writeText(`DISCOUNT${selectedDiscount}`)} className="mt-4">
              Copy Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}