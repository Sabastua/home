
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Smartphone, Receipt, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentType: 'rent' | 'water' | 'deposit';
  amount: number;
}

const PaymentModal = ({ isOpen, onClose, paymentType, amount }: PaymentModalProps) => {
  const [step, setStep] = useState(1);
  const [mpesaCode, setMpesaCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const paymentInfo = {
    paybill: '522533',
    accountNumber: 'HOUSE001'
  };

  const handlePaymentComplete = () => {
    console.log('Payment completed:', { paymentType, amount, mpesaCode, phoneNumber });
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setMpesaCode('');
    setPhoneNumber('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Payment - {paymentType.charAt(0).toUpperCase() + paymentType.slice(1)}</span>
            <Button variant="ghost" size="sm" onClick={handleClose}>×</Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  KSh {amount.toLocaleString()}
                </div>
                <Badge variant="secondary">{paymentType} Payment</Badge>
              </div>

              <Tabs defaultValue="mpesa" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mpesa" className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4" />
                    <span>M-PESA</span>
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Bank</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="mpesa" className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">M-PESA Payment Steps</h4>
                    <ol className="text-sm text-green-700 space-y-2">
                      <li>1. Go to M-PESA on your phone</li>
                      <li>2. Select Lipa na M-PESA</li>
                      <li>3. Select Pay Bill</li>
                      <li>4. Enter Business No: <strong>{paymentInfo.paybill}</strong></li>
                      <li>5. Enter Account No: <strong>{paymentInfo.accountNumber}</strong></li>
                      <li>6. Enter Amount: <strong>KSh {amount.toLocaleString()}</strong></li>
                      <li>7. Enter your M-PESA PIN and send</li>
                    </ol>
                  </div>

                  <div>
                    <Label htmlFor="phone">Your Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+254 712 345 678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={() => setStep(2)} 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!phoneNumber}
                  >
                    I've Made the Payment
                  </Button>
                </TabsContent>

                <TabsContent value="bank" className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">Bank Transfer Details</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>Bank: <strong>Equity Bank</strong></div>
                      <div>Account: <strong>0123456789</strong></div>
                      <div>Account Name: <strong>Nakuru HomesConnect</strong></div>
                      <div>Amount: <strong>KSh {amount.toLocaleString()}</strong></div>
                      <div>Reference: <strong>{paymentInfo.accountNumber}</strong></div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setStep(2)} 
                    className="w-full"
                  >
                    I've Made the Transfer
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Confirm Your Payment</h3>
                <p className="text-gray-600">Enter your M-PESA confirmation code to verify payment</p>
              </div>

              <div>
                <Label htmlFor="mpesaCode">M-PESA Confirmation Code</Label>
                <Input
                  id="mpesaCode"
                  placeholder="e.g., QAR5TXN123"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> You'll receive an M-PESA confirmation message after successful payment. 
                  Enter the code here to verify your transaction.
                </p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handlePaymentComplete} 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!mpesaCode}
                >
                  Verify Payment
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-4">
                  Your {paymentType} payment of KSh {amount.toLocaleString()} has been confirmed.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold text-green-800 mb-2">Payment Details</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>Amount: KSh {amount.toLocaleString()}</div>
                  <div>Type: {paymentType.charAt(0).toUpperCase() + paymentType.slice(1)}</div>
                  <div>M-PESA Code: {mpesaCode}</div>
                  <div>Date: {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Receipt className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button onClick={handleClose} className="flex-1 bg-green-600 hover:bg-green-700">
                  Done
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
