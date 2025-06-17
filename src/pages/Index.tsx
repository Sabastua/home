import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Eye, DollarSign, Building2, User, Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PropertySwipeCard from '@/components/PropertySwipeCard';
import PropertyFilters from '@/components/PropertyFilters';
import OnboardingModal from '@/components/OnboardingModal';
import PaymentModal from '@/components/PaymentModal';

// Mock property data (replace with your actual data source)
const propertyData = [
  {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    features: ["Water included", "Parking", "Security"]
  },
  {
    id: 2,
    title: "Cozy Bedsitter",
    type: "Bedsitter",
    location: "Lanet",
    rent: 8000,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    features: ["Furnished", "Water included", "WiFi"]
  },
  {
    id: 3,
    title: "Spacious 3BR House",
    type: "3BR",
    location: "Njoro",
    rent: 35000,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    features: ["Own Compound", "Garden", "Parking"]
  },
  {
    id: 4,
    title: "Studio Apartment",
    type: "Studio",
    location: "Rongai",
    rent: 12000,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
    features: ["Modern", "Security", "Water included"]
  },
  {
    id: 5,
    title: "Executive 4BR Villa",
    type: "4BR",
    location: "Milimani",
    rent: 55000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    features: ["Swimming Pool", "Garden", "Parking", "Security", "Generator", "WiFi", "Gym"]
  },
  {
    id: 6,
    title: "1BR Garden Apartment",
    type: "1BR",
    location: "Section 58",
    rent: 18000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    features: ["Garden View", "Parking", "Security", "Water included", "WiFi"]
  },
  {
    id: 7,
    title: "Modern 3BR Penthouse",
    type: "3BR",
    location: "Nakuru East",
    rent: 42000,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    features: ["Rooftop Terrace", "Modern Kitchen", "Parking", "Security", "Generator", "WiFi"]
  },
  {
    id: 8,
    title: "Affordable Bedsitter",
    type: "Bedsitter",
    location: "Kaptembwo",
    rent: 6500,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    features: ["Water included", "Security", "Parking"]
  },
  {
    id: 9,
    title: "Family 2BR Duplex",
    type: "2BR",
    location: "Bahati",
    rent: 22000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    features: ["Duplex Design", "Garden", "Parking", "Security", "Water included", "WiFi"]
  },
  {
    id: 10,
    title: "Luxury 5BR Mansion",
    type: "5BR",
    location: "Upperhill",
    rent: 85000,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
    features: ["Swimming Pool", "Garden", "Parking", "Security", "Generator", "WiFi", "Gym", "Sauna", "Study Room"]
  }
];

const Index = () => {
  const [properties, setProperties] = useState(propertyData);
  const [filteredProperties, setFilteredProperties] = useState(propertyData);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    propertyId: null as number | null,
    paymentType: 'rent' as 'rent' | 'water' | 'deposit',
    amount: 0
  });

  useEffect(() => {
    // Check if it's the user's first time visiting the site
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('hasVisited', 'true');
    }

    // Detect mobile devices
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mobileQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', listener);

    return () => {
      mobileQuery.removeEventListener('change', listener);
    };
  }, []);

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId]
    );
  };

  const filterProperties = (filters: any) => {
    setFilteredProperties(() => {
      let filtered = [...properties];

      if (filters.location) {
        filtered = filtered.filter(property =>
          property.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.type) {
        filtered = filtered.filter(property =>
          property.type.toLowerCase() === filters.type.toLowerCase()
        );
      }

      if (filters.minRent) {
        filtered = filtered.filter(property => property.rent >= filters.minRent);
      }

      if (filters.maxRent) {
        filtered = filtered.filter(property => property.rent <= filters.maxRent);
      }

      return filtered;
    });
  };

  const handlePayment = (propertyId: number, type: 'rent' | 'water' | 'deposit') => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    let amount = property.rent;
    if (type === 'water') amount = Math.floor(property.rent * 0.1); // 10% of rent
    if (type === 'deposit') amount = property.rent * 2; // 2 months deposit
    
    setPaymentModal({
      isOpen: true,
      propertyId,
      paymentType: type,
      amount
    });
  };

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      propertyId: null,
      paymentType: 'rent',
      amount: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <span className="font-medium">Nakuru HomesConnect</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/favorites" className="text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home in Nakuru
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover a wide range of properties for rent in Nakuru County.
          </p>
          <div className="space-x-3">
            <Link to="/properties" className="inline-block">
              <Button size="lg" className="rounded-2xl">
                View All Properties
              </Button>
            </Link>
            <Link to="/contact" className="inline-block">
              <Button variant="outline" size="lg" className="rounded-2xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <PropertyFilters 
          properties={properties}
          onFilterChange={setFilteredProperties}
        />

        {/* Properties Grid - Desktop */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden rounded-3xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className={`p-2 rounded-full shadow-lg transition-colors ${
                          favorites.includes(property.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/90 text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-500/90 text-white rounded-full shadow-lg backdrop-blur-sm">
                        Available
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h3>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 rounded-full">
                        {property.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-blue-600">
                        KSh {property.rent.toLocaleString()}
                        <span className="text-sm text-gray-500 font-normal">/month</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs rounded-full">
                          {feature}
                        </Badge>
                      ))}
                      {property.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs rounded-full">
                          +{property.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Link to={`/property/${property.id}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          onClick={() => handlePayment(property.id, 'rent')}
                          variant="outline" 
                          className="rounded-2xl text-xs py-2"
                        >
                          <DollarSign className="w-3 h-3 mr-1" />
                          Pay Rent
                        </Button>
                        <Button 
                          onClick={() => handlePayment(property.id, 'deposit')}
                          variant="outline" 
                          className="rounded-2xl text-xs py-2"
                        >
                          <Building2 className="w-3 h-3 mr-1" />
                          Pay Deposit
                        </Button>
                      </div>
                      
                      <Link to={`/apply/${property.id}`} className="block">
                        <Button variant="outline" className="w-full rounded-2xl">
                          <User className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile Swipe View */}
        <div className="lg:hidden">
          <PropertySwipeCard 
            properties={filteredProperties}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center mt-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No properties found matching your criteria.
            </h2>
            <p className="text-gray-500">
              Please adjust your filters and try again.
            </p>
          </div>
        )}

        {/* Pagination (Example - replace with actual pagination logic) */}
        {filteredProperties.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mr-2 rounded-2xl">
              Previous
            </Button>
            <Button variant="outline" className="rounded-2xl">
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
      
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        paymentType={paymentModal.paymentType}
        amount={paymentModal.amount}
      />
    </div>
  );
};

export default Index;
