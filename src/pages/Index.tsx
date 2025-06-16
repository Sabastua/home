
import React, { useState } from 'react';
import { Search, Filter, MapPin, Plus, User, Heart, X, Star, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import OnboardingModal from '@/components/OnboardingModal';
import PropertySwipeCard from '@/components/PropertySwipeCard';
import PropertyFilters from '@/components/PropertyFilters';

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=600&fit=crop"
    ],
    features: ["Water included", "Parking", "Security", "WiFi", "Generator"],
    available: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    title: "Cozy Bedsitter",
    type: "Bedsitter",
    location: "Lanet",
    rent: 8000,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop"
    ],
    features: ["Furnished", "Water included"],
    available: true,
    rating: 4.2,
    reviews: 18
  },
  {
    id: 3,
    title: "Spacious 3BR House",
    type: "3BR",
    location: "Njoro",
    rent: 35000,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=600&fit=crop"
    ],
    features: ["Own Compound", "Garden", "Parking"],
    available: true,
    rating: 4.9,
    reviews: 31
  },
  {
    id: 4,
    title: "Studio Apartment",
    type: "Studio",
    location: "Rongai",
    rent: 12000,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=600&fit=crop"
    ],
    features: ["Modern", "Security", "Water included"],
    available: true,
    rating: 4.5,
    reviews: 12
  }
];

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [likedProperties, setLikedProperties] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    type: "All",
    location: "All",
    maxRent: 50000,
    minRent: 0
  });

  const filteredProperties = properties.filter(property => {
    const matchesType = filters.type === "All" || property.type === filters.type;
    const matchesLocation = filters.location === "All" || property.location === filters.location;
    const matchesRent = property.rent >= filters.minRent && property.rent <= filters.maxRent;
    return matchesType && matchesLocation && matchesRent;
  });

  const handleSwipe = (direction: 'left' | 'right', propertyId: number) => {
    if (direction === 'right') {
      setLikedProperties(prev => [...prev, propertyId]);
    }
    
    setTimeout(() => {
      setCurrentPropertyIndex(prev => prev + 1);
    }, 300);
  };

  const resetStack = () => {
    setCurrentPropertyIndex(0);
  };

  const currentProperty = filteredProperties[currentPropertyIndex];
  const hasMoreProperties = currentPropertyIndex < filteredProperties.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs">NH</span>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">Nakuru Homes</h1>
                <p className="text-xs text-gray-500">Find your perfect match</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFilters(true)}
                className="w-10 h-10 p-0 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Filter className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowOnboarding(true)}
                className="w-10 h-10 p-0 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
              >
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 pb-24 px-4 min-h-screen flex flex-col">
        {hasMoreProperties ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Property Stack */}
              <div className="relative">
                {filteredProperties.slice(currentPropertyIndex, currentPropertyIndex + 3).map((property, index) => (
                  <PropertySwipeCard
                    key={property.id}
                    property={property}
                    index={index}
                    onSwipe={handleSwipe}
                    isActive={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No more properties!</h3>
              <p className="text-gray-600 mb-6">You've seen all available properties matching your filters</p>
              <Button 
                onClick={resetStack}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-full px-8 py-3"
              >
                Start Over
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {hasMoreProperties && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-6">
            <Button
              onClick={() => currentProperty && handleSwipe('left', currentProperty.id)}
              className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:scale-105 transition-all duration-200"
              variant="ghost"
            >
              <X className="w-6 h-6 text-red-500" />
            </Button>
            
            <Link to={currentProperty ? `/property/${currentProperty.id}` : '#'}>
              <Button className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:scale-105 transition-all duration-200" variant="ghost">
                <Info className="w-5 h-5 text-blue-500" />
              </Button>
            </Link>
            
            <Button
              onClick={() => currentProperty && handleSwipe('right', currentProperty.id)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Heart className="w-6 h-6 text-white" />
            </Button>
          </div>
        )}

        {/* Match Counter */}
        {hasMoreProperties && (
          <div className="fixed top-24 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-gray-700">{likedProperties.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Filters Modal */}
      <PropertyFilters 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </div>
  );
};

export default Index;
