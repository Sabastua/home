
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface PaymentButtonProps {
  propertyId: number;
  propertyTitle: string;
  rent: number;
  waterBill?: number;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  propertyId,
  propertyTitle,
  rent,
  waterBill = 0
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | null>(null);
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const { toast } = useToast();

  const totalAmount = rent + waterBill;

  const handleMpesaPayment = () => {
    if (!mpesaNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your M-Pesa phone number",
        variant: "destructive"
      });
      return;
    }

    // Simulate M-Pesa payment
    toast({
      title: "M-Pesa Payment Initiated",
      description: `Payment request of KSh ${totalAmount.toLocaleString()} sent to ${mpesaNumber}. Check your phone for STK push.`,
    });
  };

  const handleCardPayment = () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
      toast({
        title: "Card details required",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }

    // Simulate card payment
    toast({
      title: "Payment Successful",
      description: `Payment of KSh ${totalAmount.toLocaleString()} processed successfully for ${propertyTitle}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          <CreditCard className="w-4 h-4 mr-2" />
          Pay Now - KSh {totalAmount.toLocaleString()}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment for {propertyTitle}</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to proceed
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Monthly Rent:</span>
                <span>KSh {rent.toLocaleString()}</span>
              </div>
              {waterBill > 0 && (
                <div className="flex justify-between">
                  <span>Water Bill:</span>
                  <span>KSh {waterBill.toLocaleString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>KSh {totalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Select Payment Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={paymentMethod === 'mpesa' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('mpesa')}
                className="h-16 flex flex-col"
              >
                <Smartphone className="w-6 h-6 mb-1" />
                <span>M-Pesa</span>
              </Button>
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('card')}
                className="h-16 flex flex-col"
              >
                <CreditCard className="w-6 h-6 mb-1" />
                <span>Card</span>
              </Button>
            </div>
          </div>

          {/* M-Pesa Payment Form */}
          {paymentMethod === 'mpesa' && (
            <div className="space-y-3">
              <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
              <Input
                id="mpesa-number"
                placeholder="254712345678"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
              />
              <Button 
                onClick={handleMpesaPayment}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Pay with M-Pesa
              </Button>
            </div>
          )}

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="card-expiry">Expiry</Label>
                  <Input
                    id="card-expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="card-cvv">CVV</Label>
                  <Input
                    id="card-cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>
              <Button 
                onClick={handleCardPayment}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Pay with Card
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentButton;
