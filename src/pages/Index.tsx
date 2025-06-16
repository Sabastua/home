
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Plus, User, Heart, X, Star, Info, Sparkles } from 'lucide-react';
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
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [filters, setFilters] = useState({
    type: "All",
    location: "All",
    maxRent: 50000,
    minRent: 0
  });

  // Check if device is desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

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
    
    if (!isDesktop) {
      setTimeout(() => {
        setCurrentPropertyIndex(prev => prev + 1);
        setIsFirstTime(false);
      }, 300);
    }
  };

  const resetStack = () => {
    setCurrentPropertyIndex(0);
    setIsFirstTime(true);
  };

  const currentProperty = filteredProperties[currentPropertyIndex];
  const hasMoreProperties = currentPropertyIndex < filteredProperties.length;

  // Desktop Grid Layout
  if (isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Desktop Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-lg">NH</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Nakuru Homes
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-yellow-500" />
                    Discover your perfect home
                  </p>
                </div>
              </div>
              
              {/* Desktop Search and Filters */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    placeholder="Search properties..." 
                    className="pl-12 pr-4 py-3 rounded-2xl border-gray-200 bg-white/90 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowFilters(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Filter className="w-5 h-5 mr-2 text-gray-700" />
                  Filters
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowOnboarding(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Desktop Property Grid */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property, index) => (
                <div 
                  key={property.id} 
                  className="h-96 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PropertySwipeCard
                    property={property}
                    index={index}
                    onSwipe={handleSwipe}
                    isActive={true}
                    isDesktop={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Heart className="w-12 h-12 text-white animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                No properties found
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Try adjusting your filters to see more properties
              </p>
              <Button 
                onClick={() => setShowFilters(true)}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white rounded-2xl px-8 py-4 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Filter className="w-5 h-5 mr-2" />
                Adjust Filters
              </Button>
            </div>
          )}
        </main>

        {/* Liked Properties Counter for Desktop */}
        {likedProperties.length > 0 && (
          <div className="fixed top-6 right-6 z-50">
            <Link to="/favorites">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl px-6 py-3 shadow-xl flex items-center space-x-3 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Heart className="w-5 h-5 animate-pulse" />
                <span className="font-bold">{likedProperties.length} Liked</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Mobile Layout (existing code)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Mobile Header - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-sm">NH</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Nakuru Homes
                </h1>
                <p className="text-xs text-gray-500 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
                  Find your perfect match
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFilters(true)}
                className="w-11 h-11 p-0 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Filter className="w-5 h-5 text-gray-700" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowOnboarding(true)}
                className="w-11 h-11 p-0 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Message for First Time Users */}
      {isFirstTime && hasMoreProperties && (
        <div className="fixed top-24 left-4 right-4 z-50 animate-slide-in-right">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-2xl">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Heart className="w-6 h-6 text-white animate-pulse" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Welcome to Nakuru Homes!</h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Swipe right to like ❤️ or left to pass ✖️. Tap info for details!
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content - Property Cards with Padding */}
      {hasMoreProperties ? (
        <div className="h-screen w-full pt-20 pb-4">
          {/* Property Stack with Padded Cards */}
          <div className="relative h-full w-full">
            {filteredProperties.slice(currentPropertyIndex, currentPropertyIndex + 3).map((property, index) => (
              <div
                key={property.id}
                className={`absolute transition-all duration-500 ease-out ${
                  index === 0 ? 'z-30 scale-100 inset-0' : 
                  index === 1 ? 'z-20 scale-95 inset-2' : 
                  'z-10 scale-90 inset-4'
                }`}
                style={{
                  transform: `scale(${1 - index * 0.02}) translateX(${index * 4}px)`,
                  opacity: 1 - index * 0.1
                }}
              >
                <PropertySwipeCard
                  property={property}
                  index={index}
                  onSwipe={handleSwipe}
                  isActive={index === 0}
                  isDesktop={false}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <div className="text-center py-8 animate-scale-in px-6">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Heart className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              That's all for now!
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed px-4">
              You've seen all available properties matching your filters. Check back later for new listings!
            </p>
            <div className="space-y-3">
              <Button 
                onClick={resetStack}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white rounded-2xl px-8 py-4 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="w-5 h-5 mr-2" />
                Start Over
              </Button>
              <Button 
                onClick={() => setShowOnboarding(true)}
                variant="outline"
                className="rounded-2xl px-8 py-4 text-base font-semibold border-2 border-purple-200 hover:bg-purple-50 transition-all duration-300 hover:scale-105"
              >
                <User className="w-5 h-5 mr-2" />
                Complete Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Action Buttons - Fixed at bottom */}
      {hasMoreProperties && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-8 z-50">
          <Button
            onClick={() => currentProperty && handleSwipe('left', currentProperty.id)}
            className="w-16 h-16 rounded-full bg-white shadow-2xl hover:shadow-3xl border-0 hover:scale-110 transition-all duration-300 group"
            variant="ghost"
          >
            <X className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform duration-200" />
          </Button>
          
          <Link to={currentProperty ? `/property/${currentProperty.id}` : '#'}>
            <Button className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-xl hover:shadow-2xl border-0 hover:scale-110 transition-all duration-300 group" variant="ghost">
              <Info className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            </Button>
          </Link>
          
          <Button
            onClick={() => currentProperty && handleSwipe('right', currentProperty.id)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Heart className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200 relative z-10" />
          </Button>
        </div>
      )}

      {/* Enhanced Match Counter */}
      {hasMoreProperties && likedProperties.length > 0 && (
        <div className="fixed top-32 right-4 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-4 py-2 shadow-xl flex items-center space-x-2">
            <Heart className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-bold">{likedProperties.length}</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {hasMoreProperties && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex space-x-2">
            {filteredProperties.slice(0, Math.min(5, filteredProperties.length)).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPropertyIndex 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-125' 
                    : index < currentPropertyIndex 
                      ? 'bg-gray-400' 
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filters Modal */}
      <PropertyFilters 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Enhanced Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </div>
  );
};

export default Index;
