
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Check, ArrowDown, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Mock data for tenant dashboard
const tenantData = {
  currentProperty: {
    id: 1,
    title: "Modern 2BR Apartment",
    location: "Nakuru Town",
    rent: 25000,
    nextDueDate: "2024-07-15",
    waterBill: 1500,
    waterDueDate: "2024-07-10"
  },
  paymentHistory: [
    {
      id: 1,
      type: "Rent",
      amount: 25000,
      date: "2024-06-15",
      status: "Paid",
      mpesaCode: "QAR5TXN123"
    },
    {
      id: 2,
      type: "Water Bill",
      amount: 1200,
      date: "2024-06-10",
      status: "Paid",
      mpesaCode: "QBR3TXN456"
    },
    {
      id: 3,
      type: "Rent",
      amount: 25000,
      date: "2024-05-15",
      status: "Paid",
      mpesaCode: "QCR1TXN789"
    }
  ]
};

const Dashboard = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'rent' | 'water'>('rent');

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const rentDaysLeft = getDaysUntilDue(tenantData.currentProperty.nextDueDate);
  const waterDaysLeft = getDaysUntilDue(tenantData.currentProperty.waterDueDate);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
            </Link>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Manage your rental payments and property details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Property & Payment Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Property */}
            <Card>
              <CardHeader>
                <CardTitle>Your Current Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{tenantData.currentProperty.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{tenantData.currentProperty.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Monthly Rent</div>
                    <div className="text-2xl font-bold text-blue-700">
                      KSh {tenantData.currentProperty.rent.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Water Bill</div>
                    <div className="text-2xl font-bold text-green-700">
                      KSh {tenantData.currentProperty.waterBill.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tenantData.paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          payment.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <div className="font-medium">{payment.type}</div>
                          <div className="text-sm text-gray-600">{payment.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">KSh {payment.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{payment.mpesaCode}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Due & Quick Actions */}
          <div className="space-y-6">
            {/* Rent Due */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Rent Payment</span>
                  <Calendar className="w-5 h-5 text-gray-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  rentDaysLeft <= 3 ? 'bg-red-50' : rentDaysLeft <= 7 ? 'bg-yellow-50' : 'bg-green-50'
                }`}>
                  <div className={`text-sm font-medium ${
                    rentDaysLeft <= 3 ? 'text-red-600' : rentDaysLeft <= 7 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    Next Payment Due
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {rentDaysLeft > 0 ? `${rentDaysLeft} days` : 'Overdue'}
                  </div>
                  <div className="text-sm text-gray-600">Due: {tenantData.currentProperty.nextDueDate}</div>
                </div>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setPaymentType('rent');
                    setShowPaymentModal(true);
                  }}
                >
                  Pay Rent - KSh {tenantData.currentProperty.rent.toLocaleString()}
                </Button>
              </CardContent>
            </Card>

            {/* Water Bill */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Water Bill</span>
                  <ArrowDown className="w-5 h-5 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  waterDaysLeft <= 2 ? 'bg-red-50' : waterDaysLeft <= 5 ? 'bg-yellow-50' : 'bg-blue-50'
                }`}>
                  <div className={`text-sm font-medium ${
                    waterDaysLeft <= 2 ? 'text-red-600' : waterDaysLeft <= 5 ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    Next Payment Due
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {waterDaysLeft > 0 ? `${waterDaysLeft} days` : 'Overdue'}
                  </div>
                  <div className="text-sm text-gray-600">Due: {tenantData.currentProperty.waterDueDate}</div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPaymentType('water');
                    setShowPaymentModal(true);
                  }}
                >
                  Pay Water Bill - KSh {tenantData.currentProperty.waterBill.toLocaleString()}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Download Receipts
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Landlord
                </Button>
                <Button variant="outline" className="w-full">
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>M-PESA Payment</span>
                <Button variant="ghost" size="sm" onClick={() => setShowPaymentModal(false)}>×</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Payment Instructions</h4>
                <ol className="text-sm text-green-700 space-y-1">
                  <li>1. Go to M-PESA on your phone</li>
                  <li>2. Select Lipa na M-PESA</li>
                  <li>3. Select Pay Bill</li>
                  <li>4. Enter Business No: <strong>522533</strong></li>
                  <li>5. Enter Account No: <strong>HOUSE001</strong></li>
                  <li>6. Enter Amount: <strong>KSh {paymentType === 'rent' ? tenantData.currentProperty.rent.toLocaleString() : tenantData.currentProperty.waterBill.toLocaleString()}</strong></li>
                  <li>7. Enter your M-PESA PIN and send</li>
                </ol>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> After payment, you'll receive an M-PESA confirmation message. 
                  Your payment will be automatically verified within 5 minutes.
                </p>
              </div>

              <Button onClick={() => setShowPaymentModal(false)} className="w-full">
                I've Made the Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
