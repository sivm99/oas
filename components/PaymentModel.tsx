"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  price: string
  currency: string
}

export default function PaymentModal({ isOpen, onClose, plan, price, currency }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'payu' | 'payment 1' | 'payment 2' | null>(null)

  const handlePayment = () => {
    // Implement actual payment logic here
    console.log(`Processing payment for ${plan} using ${paymentMethod}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to {plan}</DialogTitle>
          <DialogDescription>
            Choose your payment method to complete the subscription.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-semibold">
            Total: {currency} {price}/month
          </p>
          <div className="flex space-x-4">
            <Button
              onClick={() => setPaymentMethod('razorpay')}
              variant={paymentMethod === 'razorpay' ? 'default' : 'outline'}
            >
              Payment 1
            </Button>
            <Button
              onClick={() => setPaymentMethod('payu')}
              variant={paymentMethod === 'payu' ? 'default' : 'outline'}
            >
              Payment2
            </Button>
          </div>
          <Button onClick={handlePayment} disabled={!paymentMethod}>
            Pay Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


