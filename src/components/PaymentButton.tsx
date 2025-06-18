
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, Droplets } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
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
  const [payRent, setPayRent] = useState(true);
  const [payWater, setPayWater] = useState(false);
  const { toast } = useToast();

  const calculateTotal = () => {
    let total = 0;
    if (payRent) total += rent;
    if (payWater && waterBill) total += waterBill;
    return total;
  };

  const handleMpesaPayment = () => {
    if (!mpesaNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your M-Pesa phone number",
        variant: "destructive"
      });
      return;
    }

    const total = calculateTotal();
    if (total === 0) {
      toast({
        title: "Select payment items",
        description: "Please select at least one item to pay for",
        variant: "destructive"
      });
      return;
    }

    const paymentItems = [];
    if (payRent) paymentItems.push('Rent');
    if (payWater) paymentItems.push('Water Bill');

    toast({
      title: "M-Pesa Payment Initiated",
      description: `Payment request of KSh ${total.toLocaleString()} for ${paymentItems.join(' and ')} sent to ${mpesaNumber}. Check your phone for STK push.`,
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

    const total = calculateTotal();
    if (total === 0) {
      toast({
        title: "Select payment items",
        description: "Please select at least one item to pay for",
        variant: "destructive"
      });
      return;
    }

    const paymentItems = [];
    if (payRent) paymentItems.push('Rent');
    if (payWater) paymentItems.push('Water Bill');

    toast({
      title: "Payment Successful",
      description: `Payment of KSh ${total.toLocaleString()} for ${paymentItems.join(' and ')} processed successfully for ${propertyTitle}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          <CreditCard className="w-4 h-4 mr-2" />
          Pay Now - KSh {rent.toLocaleString()}
          {waterBill > 0 && ` + KSh ${waterBill.toLocaleString()}`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment for {propertyTitle}</DialogTitle>
          <DialogDescription>
            Choose what to pay and your preferred payment method
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Payment Items Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Payment Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rent"
                  checked={payRent}
                  onCheckedChange={(checked) => setPayRent(checked as boolean)}
                />
                <Label htmlFor="rent" className="flex-1 cursor-pointer">
                  Monthly Rent
                </Label>
                <span className="font-medium">KSh {rent.toLocaleString()}</span>
              </div>
              
              {waterBill > 0 && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="water"
                    checked={payWater}
                    onCheckedChange={(checked) => setPayWater(checked as boolean)}
                  />
                  <Label htmlFor="water" className="flex-1 cursor-pointer flex items-center">
                    <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                    Water Bill
                  </Label>
                  <span className="font-medium">KSh {waterBill.toLocaleString()}</span>
                </div>
              )}
              
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-green-600">KSh {calculateTotal().toLocaleString()}</span>
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
                disabled={calculateTotal() === 0}
              >
                Pay KSh {calculateTotal().toLocaleString()} with M-Pesa
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
                disabled={calculateTotal() === 0}
              >
                Pay KSh {calculateTotal().toLocaleString()} with Card
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentButton;
