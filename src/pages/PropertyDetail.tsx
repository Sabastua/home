
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Check, ArrowLeft, Phone, Mail, Home, Wifi, Car, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock property data - in real app this would come from database
const propertyData = {
  1: {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
    ],
    features: ["Water included", "Parking", "Security", "Modern Kitchen", "Balcony"],
    description: "A beautiful modern 2-bedroom apartment located in the heart of Nakuru Town. Features include a spacious living room, modern kitchen with fitted cabinets, two comfortable bedrooms, and a private balcony with town views.",
    landlord: {
      name: "John Kamau",
      phone: "+254 712 345 678",
      email: "john.kamau@email.com"
    },
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE001"
    },
    available: true,
    dateAvailable: "2024-07-01"
  }
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Fix the type conversion error
  const propertyId = parseInt(id || '1', 10);
  const property = propertyData[propertyId as keyof typeof propertyData];

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Properties</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Nakuru HomesConnect</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
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
                          currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-lg">{property.location}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-600">
                      {property.type}
                    </Badge>
                  </div>

                  <div className="text-3xl font-bold text-green-600 mb-6">
                    KSh {property.rent.toLocaleString()}<span className="text-lg text-gray-500">/month</span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Features & Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge variant={property.available ? "default" : "secondary"}>
                      {property.available ? "Available" : "Occupied"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Available from</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{property.dateAvailable}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Landlord */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Landlord</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900">{property.landlord.name}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{property.landlord.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{property.landlord.email}</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Contact Landlord
                </Button>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">M-PESA Paybill</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Business Number:</span>
                      <span className="font-mono">{property.payment.paybill}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Number:</span>
                      <span className="font-mono">{property.payment.accountNumber}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  View Payment Instructions
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Apply for This Property
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full">
                  Save to Favorites
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
