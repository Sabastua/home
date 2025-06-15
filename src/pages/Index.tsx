
import React, { useState } from 'react';
import { Search, Filter, MapPin, Plus, User, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import OnboardingModal from '@/components/OnboardingModal';

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    features: ["Water included", "Parking", "Security"],
    available: true
  },
  {
    id: 2,
    title: "Cozy Bedsitter",
    type: "Bedsitter",
    location: "Lanet",
    rent: 8000,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    features: ["Furnished", "Water included"],
    available: true
  },
  {
    id: 3,
    title: "Spacious 3BR House",
    type: "3BR",
    location: "Njoro",
    rent: 35000,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
    features: ["Own Compound", "Garden", "Parking"],
    available: true
  },
  {
    id: 4,
    title: "Studio Apartment",
    type: "Studio",
    location: "Rongai",
    rent: 12000,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
    features: ["Modern", "Security", "Water included"],
    available: true
  }
];

const propertyTypes = ["All", "Bedsitter", "Studio", "1BR", "2BR", "3BR", "Own Compound"];
const locations = ["All", "Nakuru Town", "Lanet", "Njoro", "Rongai", "Mbaruk", "Kabarak", "Bahati"];

const Index = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);

  const filteredProperties = properties.filter(property => {
    const matchesType = selectedType === "All" || property.type === selectedType;
    const matchesLocation = selectedLocation === "All" || property.location === selectedLocation;
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesLocation && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Nakuru HomesConnect</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Find your perfect home</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowOnboarding(true)}
                className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <User className="w-4 h-4 mr-2" />
                Join
              </Button>
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  List
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Find Your Perfect</h2>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Home in Nakuru</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Discover quality rental properties across Nakuru and surrounding areas with seamless M-PESA payments</p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-3 shadow-lg"
              onClick={() => setShowOnboarding(true)}
            >
              <User className="w-5 h-5 mr-2" />
              Join as Tenant
            </Button>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="rounded-2xl px-8 py-3 border-2 hover:bg-gray-50">
                <Plus className="w-5 h-5 mr-2" />
                List Your Property
              </Button>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by property name or location..."
                className="pl-12 py-4 text-base bg-white rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filters</span>
            </div>
            
            {/* Property Type Filter */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-600 mb-3">Property Type</p>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full px-4 py-2 ${
                      selectedType === type 
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" 
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">Location</p>
              <div className="flex flex-wrap gap-2">
                {locations.map(location => (
                  <Button
                    key={location}
                    variant={selectedLocation === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLocation(location)}
                    className={`rounded-full px-4 py-2 ${
                      selectedLocation === location 
                        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg" 
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Available Properties
            </h3>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 rounded-full px-3 py-1">
              {filteredProperties.length} found
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map(property => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-3xl border-0 bg-white shadow-sm hover:scale-[1.02]">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700 rounded-full shadow-lg backdrop-blur-sm">
                    {property.type}
                  </Badge>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-green-500/90 text-white rounded-full shadow-lg backdrop-blur-sm">
                      Available
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">{property.title}</h4>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    KSh {property.rent.toLocaleString()}
                    <span className="text-sm text-gray-500 font-normal">/month</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-600 rounded-full">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{property.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <Link to={`/property/${property.id}`} className="w-full block">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-3 shadow-lg">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">NH</span>
                </div>
                <span className="font-semibold text-gray-900">Nakuru HomesConnect</span>
              </div>
              <p className="text-gray-600 max-w-md">Your trusted partner for rental properties in Nakuru and surrounding areas. Find your perfect home with seamless M-PESA integration.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Locations</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Nakuru Town</li>
                <li>Lanet</li>
                <li>Njoro</li>
                <li>Rongai</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>+254 712 345 678</li>
                <li>info@nakuruhomes.com</li>
                <li>Nakuru, Kenya</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Nakuru HomesConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </div>
  );
};

export default Index;
