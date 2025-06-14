
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowDown, MapPin, Calendar, Check, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Mock property data (in real app, this would come from API)
const propertyData = {
  1: {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    waterBill: 1500,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
    ],
    features: ["Water included", "Parking", "Security", "Wi-Fi Ready", "Modern Kitchen"],
    description: "Beautiful modern 2-bedroom apartment located in the heart of Nakuru Town. Features include spacious rooms, modern kitchen, reliable water supply, and 24/7 security.",
    landlord: "John Kamau",
    phone: "+254 712 345 678",
    available: true,
    paybill: "522533",
    accountNumber: "HOUSE001"
  }
};

const PropertyDetail = () => {
  const { id } = useParams();
  const property = propertyData[id as keyof typeof propertyData];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentType, setPaymentType] = useState<'rent' | 'water'>('rent');

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <Link to="/">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>M-PESA Payment</span>
            <Button variant="ghost" size="sm" onClick={() => setShowPayment(false)}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Payment Instructions</h4>
            <ol className="text-sm text-green-700 space-y-1">
              <li>1. Go to M-PESA on your phone</li>
              <li>2. Select Lipa na M-PESA</li>
              <li>3. Select Pay Bill</li>
              <li>4. Enter Business No: <strong>{property.paybill}</strong></li>
              <li>5. Enter Account No: <strong>{property.accountNumber}</strong></li>
              <li>6. Enter Amount: <strong>KSh {paymentType === 'rent' ? property.rent.toLocaleString() : property.waterBill.toLocaleString()}</strong></li>
              <li>7. Enter your M-PESA PIN and send</li>
            </ol>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="amount">Amount to Pay</Label>
              <Input
                id="amount"
                value={`KSh ${paymentType === 'rent' ? property.rent.toLocaleString() : property.waterBill.toLocaleString()}`}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant={paymentType === 'rent' ? 'default' : 'outline'}
                onClick={() => setPaymentType('rent')}
                className="flex-1"
              >
                Monthly Rent
              </Button>
              <Button
                variant={paymentType === 'water' ? 'default' : 'outline'}
                onClick={() => setPaymentType('water')}
                className="flex-1"
              >
                Water Bill
              </Button>
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> After payment, you'll receive an M-PESA confirmation message. 
              Your payment will be automatically verified within 5 minutes.
            </p>
          </div>

          <Button onClick={() => setShowPayment(false)} className="w-full">
            I've Made the Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );

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
              <h1 className="text-xl font-bold text-gray-900">Nakuru HomesConnect</h1>
            </Link>
            <Link to="/">
              <Button variant="outline">Back to Properties</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{property.location}</span>
                      </div>
                      <Badge className="bg-green-600">{property.type}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">
                        KSh {property.rent.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">per month</div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking and Payment Card */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Book This Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-800 font-medium">Monthly Rent</span>
                    <span className="text-green-800 font-bold">KSh {property.rent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-800 font-medium">Water Bill (Est.)</span>
                    <span className="text-green-800 font-bold">KSh {property.waterBill.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setPaymentType('rent');
                    setShowPayment(true);
                  }}
                >
                  Pay Rent via M-PESA
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPaymentType('water');
                    setShowPayment(true);
                  }}
                >
                  Pay Water Bill
                </Button>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Landlord Contact</h4>
                  <div className="text-sm text-gray-600">
                    <div>{property.landlord}</div>
                    <div>{property.phone}</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">M-PESA Payment Info</h4>
                  <div className="text-sm text-blue-700">
                    <div>Paybill: <strong>{property.paybill}</strong></div>
                    <div>Account: <strong>{property.accountNumber}</strong></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Save to Favorites
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showPayment && <PaymentModal />}
    </div>
  );
};

export default PropertyDetail;
