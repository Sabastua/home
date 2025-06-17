
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Eye, DollarSign, Building2, User, Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PropertySwipeCard from '@/components/PropertySwipeCard';
import PropertyFilters from '@/components/PropertyFilters';
import MobileSwipeView from '@/components/MobileSwipeView';
import OnboardingModal from '@/components/OnboardingModal';
import PaymentModal from '@/components/PaymentModal';

// Mock property data with comprehensive information
const propertyData = [
  {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
    ],
    features: ["Water included", "Parking", "Security", "WiFi", "Modern Kitchen", "Balcony"],
    available: true,
    rating: 4.5,
    reviews: 12,
    plotNumber: "NK001",
    description: "A beautifully designed modern apartment in the heart of Nakuru Town.",
    bedrooms: 2,
    bathrooms: 2,
    size: "80 sqm",
    yearBuilt: 2020,
    landlord: {
      name: "John Kamau",
      phone: "+254712345678",
      email: "john.kamau@email.com"
    }
  },
  {
    id: 2,
    title: "Cozy Bedsitter",
    type: "Bedsitter",
    location: "Lanet",
    rent: 8000,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
    ],
    features: ["Furnished", "Water included", "WiFi", "Security"],
    available: true,
    rating: 4.2,
    reviews: 8,
    plotNumber: "LN002",
    description: "Perfect for students and young professionals. Fully furnished and ready to move in.",
    bedrooms: 1,
    bathrooms: 1,
    size: "25 sqm",
    yearBuilt: 2019,
    landlord: {
      name: "Mary Wanjiku",
      phone: "+254723456789",
      email: "mary.wanjiku@email.com"
    }
  },
  {
    id: 3,
    title: "Spacious 3BR House",
    type: "3BR",
    location: "Njoro",
    rent: 35000,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    ],
    features: ["Own Compound", "Garden", "Parking", "Security", "Generator", "WiFi"],
    available: true,
    rating: 4.7,
    reviews: 15,
    plotNumber: "NJ003",
    description: "A family-friendly house with a beautiful garden and secure compound.",
    bedrooms: 3,
    bathrooms: 2,
    size: "120 sqm",
    yearBuilt: 2018,
    landlord: {
      name: "Peter Kiprop",
      phone: "+254734567890",
      email: "peter.kiprop@email.com"
    }
  },
  {
    id: 4,
    title: "Studio Apartment",
    type: "Studio",
    location: "Rongai",
    rent: 12000,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
    ],
    features: ["Modern", "Security", "Water included", "Parking"],
    available: true,
    rating: 4.3,
    reviews: 10,
    plotNumber: "RG004",
    description: "Modern studio apartment perfect for singles or couples.",
    bedrooms: 1,
    bathrooms: 1,
    size: "35 sqm",
    yearBuilt: 2021,
    landlord: {
      name: "Grace Nyambura",
      phone: "+254745678901",
      email: "grace.nyambura@email.com"
    }
  },
  {
    id: 5,
    title: "Executive 4BR Villa",
    type: "4BR",
    location: "Milimani",
    rent: 55000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop"
    ],
    features: ["Swimming Pool", "Garden", "Parking", "Security", "Generator", "WiFi", "Gym", "Study Room"],
    available: true,
    rating: 4.9,
    reviews: 25,
    plotNumber: "ML005",
    description: "Luxury villa with premium amenities in the prestigious Milimani area.",
    bedrooms: 4,
    bathrooms: 3,
    size: "200 sqm",
    yearBuilt: 2022,
    landlord: {
      name: "David Mwangi",
      phone: "+254756789012",
      email: "david.mwangi@email.com"
    }
  },
  {
    id: 6,
    title: "1BR Garden Apartment",
    type: "1BR",
    location: "Section 58",
    rent: 18000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
    ],
    features: ["Garden View", "Parking", "Security", "Water included", "WiFi"],
    available: true,
    rating: 4.4,
    reviews: 18,
    plotNumber: "S8006",
    description: "Serene apartment with beautiful garden views and modern amenities.",
    bedrooms: 1,
    bathrooms: 1,
    size: "45 sqm",
    yearBuilt: 2020,
    landlord: {
      name: "Susan Achieng",
      phone: "+254767890123",
      email: "susan.achieng@email.com"
    }
  },
  {
    id: 7,
    title: "Modern 3BR Penthouse",
    type: "3BR",
    location: "Nakuru East",
    rent: 42000,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
    ],
    features: ["Rooftop Terrace", "Modern Kitchen", "Parking", "Security", "Generator", "WiFi"],
    available: false,
    rating: 4.6,
    reviews: 14,
    plotNumber: "NE007",
    description: "Stunning penthouse with rooftop terrace and panoramic city views.",
    bedrooms: 3,
    bathrooms: 2,
    size: "150 sqm",
    yearBuilt: 2021,
    landlord: {
      name: "James Ochieng",
      phone: "+254778901234",
      email: "james.ochieng@email.com"
    }
  },
  {
    id: 8,
    title: "Affordable Bedsitter",
    type: "Bedsitter",
    location: "Kaptembwo",
    rent: 6500,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop"
    ],
    features: ["Water included", "Security", "Parking"],
    available: true,
    rating: 4.0,
    reviews: 6,
    plotNumber: "KT008",
    description: "Budget-friendly bedsitter in a quiet neighborhood with essential amenities.",
    bedrooms: 1,
    bathrooms: 1,
    size: "20 sqm",
    yearBuilt: 2017,
    landlord: {
      name: "Rose Mutua",
      phone: "+254789012345",
      email: "rose.mutua@email.com"
    }
  },
  {
    id: 9,
    title: "Family 2BR Duplex",
    type: "2BR",
    location: "Bahati",
    rent: 22000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
    ],
    features: ["Duplex Design", "Garden", "Parking", "Security", "Water included", "WiFi"],
    available: true,
    rating: 4.5,
    reviews: 20,
    plotNumber: "BH009",
    description: "Unique duplex design offering extra space and privacy for families.",
    bedrooms: 2,
    bathrooms: 2,
    size: "90 sqm",
    yearBuilt: 2019,
    landlord: {
      name: "Michael Kariuki",
      phone: "+254790123456",
      email: "michael.kariuki@email.com"
    }
  },
  {
    id: 10,
    title: "Luxury 5BR Mansion",
    type: "5BR",
    location: "Upperhill",
    rent: 85000,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    ],
    features: ["Swimming Pool", "Garden", "Parking", "Security", "Generator", "WiFi", "Gym", "Sauna", "Study Room"],
    available: true,
    rating: 5.0,
    reviews: 30,
    plotNumber: "UH010",
    description: "Ultimate luxury mansion with world-class amenities and stunning architecture.",
    bedrooms: 5,
    bathrooms: 4,
    size: "350 sqm",
    yearBuilt: 2023,
    landlord: {
      name: "Catherine Njeri",
      phone: "+254701234567",
      email: "catherine.njeri@email.com"
    }
  }
];

const Index = () => {
  const [properties, setProperties] = useState(propertyData);
  const [filteredProperties, setFilteredProperties] = useState(propertyData);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'All',
    location: 'All',
    maxRent: 100000,
    minRent: 5000
  });
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

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
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

  useEffect(() => {
    // Apply filters
    let filtered = properties;

    if (filters.type !== 'All') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.location !== 'All') {
      filtered = filtered.filter(property => property.location === filters.location);
    }

    filtered = filtered.filter(property => 
      property.rent >= filters.minRent && property.rent <= filters.maxRent
    );

    setFilteredProperties(filtered);
    setCurrentSwipeIndex(0); // Reset swipe index when filters change
  }, [filters, properties]);

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId];
      
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleSwipe = (direction: 'left' | 'right', propertyId: number) => {
    if (direction === 'right') {
      toggleFavorite(propertyId);
    }
    
    // Move to next property
    if (currentSwipeIndex < filteredProperties.length - 1) {
      setCurrentSwipeIndex(currentSwipeIndex + 1);
    } else {
      setCurrentSwipeIndex(0); // Loop back to first property
    }
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
              <Link to="/favorites" className="text-gray-600 hover:text-red-500 transition-colors relative">
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
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

        {/* Filter Button for Mobile */}
        {isMobile && (
          <div className="mb-6">
            <Button 
              onClick={() => setShowFilters(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl"
            >
              Filter Properties
            </Button>
          </div>
        )}

        {/* Filters for Desktop */}
        {!isMobile && (
          <div className="mb-8">
            <PropertyFilters
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        )}

        {/* Properties Grid - Desktop */}
        {!isMobile && (
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
                        <Heart className="w-4 h-4" fill={favorites.includes(property.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className={`${property.available ? 'bg-green-500/90' : 'bg-red-500/90'} text-white rounded-full shadow-lg backdrop-blur-sm`}>
                        {property.available ? 'Available' : 'Occupied'}
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
                          View Details & Book
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
        )}

        {/* Mobile Swipe View */}
        {isMobile && (
          <MobileSwipeView
            properties={filteredProperties}
            currentIndex={currentSwipeIndex}
            onSwipe={handleSwipe}
          />
        )}

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
        {filteredProperties.length > 0 && !isMobile && (
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

      {/* Mobile Filters Modal */}
      {isMobile && (
        <PropertyFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />
      )}
    </div>
  );
};

export default Index;
