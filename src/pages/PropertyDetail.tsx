
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Check, ArrowLeft, Phone, Mail, Home, Wifi, Car, Shield, Building2, MessageCircle, Eye, Heart, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock property data with agent and office information
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
    agent: {
      name: "Sarah Wanjiku",
      phone: "+254 712 345 678",
      email: "sarah.wanjiku@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      experience: "5+ years",
      rating: 4.8
    },
    office: {
      name: "Nakuru HomesConnect - Head Office",
      address: "Kenyatta Avenue, Nakuru Town",
      phone: "+254 712 345 678",
      email: "info@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      {
        name: "Lanet Branch",
        address: "Lanet Shopping Center",
        phone: "+254 712 345 679",
        manager: "James Kimani"
      },
      {
        name: "Njoro Branch", 
        address: "Njoro Town Center",
        phone: "+254 712 345 680",
        manager: "Grace Muthoni"
      },
      {
        name: "Rongai Branch",
        address: "Rongai Market Road",
        phone: "+254 712 345 681",
        manager: "Peter Kiprotich"
      }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE001",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-07-01"
  }
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const propertyId = parseInt(id || '1', 10);
  const property = propertyData[propertyId as keyof typeof propertyData];

  const handleContactAgent = () => {
    window.open(`tel:${property.agent.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = `Hi ${property.agent.name}, I'm interested in the ${property.title} at ${property.location}. Can we discuss?`;
    window.open(`https://wa.me/${property.agent.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/">
            <Button className="rounded-2xl">Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Properties</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">Nakuru HomesConnect</h1>
                <p className="text-xs text-gray-500">Property Details</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden rounded-3xl border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={property.images[currentImageIndex]} 
                    alt={property.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-white shadow-lg' : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500/90 text-white rounded-full shadow-lg backdrop-blur-sm">
                      Available
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                    <div className="mb-4 sm:mb-0">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-base sm:text-lg">{property.location}</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                        {property.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                        KSh {property.rent.toLocaleString()}
                      </div>
                      <span className="text-sm text-gray-500">/month</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Features & Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
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
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Status</span>
                  <Badge className="bg-green-600 text-white rounded-full">
                    {property.available ? "Available" : "Occupied"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Available from</span>
                  <div className="flex items-center text-blue-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">{property.dateAvailable}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Agent */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                  <img 
                    src={property.agent.image} 
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-lg">{property.agent.name}</div>
                    <div className="text-sm text-gray-600">{property.agent.experience} experience</div>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm font-medium text-gray-700">{property.agent.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 text-sm">{property.agent.email}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={handleContactAgent}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button 
                    onClick={handleWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-2xl py-3"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Office Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Head Office */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <h4 className="font-semibold text-blue-900 mb-2">{property.office.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">{property.office.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800">{property.office.phone}</span>
                    </div>
                    <div className="text-blue-700 text-xs">{property.office.hours}</div>
                  </div>
                </div>

                {/* Branch Offices */}
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-700 text-sm">Branch Offices</h5>
                  {property.branches.map((branch, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-2xl">
                      <div className="font-medium text-gray-900 text-sm">{branch.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{branch.address}</div>
                      <div className="text-xs text-gray-600">Manager: {branch.manager}</div>
                      <div className="text-xs text-blue-600 font-medium">{branch.phone}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* M-PESA Payment Information */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">M-PESA Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Pay via M-PESA
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-white/60 rounded-xl">
                      <span className="text-green-700">Business Name:</span>
                      <span className="font-mono text-green-900 font-semibold">{property.payment.businessName}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/60 rounded-xl">
                      <span className="text-green-700">Paybill Number:</span>
                      <span className="font-mono text-green-900 font-bold text-lg">{property.payment.paybill}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/60 rounded-xl">
                      <span className="text-green-700">Account Number:</span>
                      <span className="font-mono text-green-900 font-semibold">{property.payment.accountNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 p-3 bg-yellow-50 rounded-2xl">
                  <strong>How to pay:</strong> Go to M-PESA → Lipa na M-PESA → Pay Bill → Enter details above
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={`/apply/${property.id}`} className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-3 shadow-lg">
                    <User className="w-4 h-4 mr-2" />
                    Apply for This Property
                  </Button>
                </Link>
                <Link to={`/schedule-viewing/${property.id}`} className="block">
                  <Button variant="outline" className="w-full rounded-2xl py-3 border-2 hover:bg-gray-50">
                    <Eye className="w-4 h-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </Link>
                <Link to={`/favorites`} className="block">
                  <Button variant="outline" className="w-full rounded-2xl py-3 border-2 hover:bg-gray-50">
                    <Heart className="w-4 h-4 mr-2" />
                    Save to Favorites
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
