
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, ChevronRight, Star, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import the same property data
const propertyData = [
  {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop",
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

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<typeof propertyData>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const ids = JSON.parse(savedFavorites);
      setFavoriteIds(ids);
      
      // Filter properties based on favorite IDs
      const favoriteProperties = propertyData.filter(property => ids.includes(property.id));
      setFavorites(favoriteProperties);
    }
  }, []);

  const removeFavorite = (id: number) => {
    const newFavoriteIds = favoriteIds.filter(favoriteId => favoriteId !== id);
    setFavoriteIds(newFavoriteIds);
    setFavorites(favorites.filter(property => property.id !== id));
    
    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavoriteIds));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Properties</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">My Favorites</h1>
                <p className="text-xs text-gray-500">{favorites.length} saved properties</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorite Properties</h1>
          <p className="text-gray-600">Properties you've saved for later</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-4">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Start browsing properties and save your favorites</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white rounded-2xl px-8 py-3">
                Browse Properties
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(property => (
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
                  <Button
                    onClick={() => removeFavorite(property.id)}
                    className="absolute top-3 left-3 w-10 h-10 rounded-full bg-red-500/90 hover:bg-red-600 text-white p-0 shadow-lg backdrop-blur-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-3 left-3">
                    <Badge className={`${property.available ? 'bg-green-500/90' : 'bg-red-500/90'} text-white rounded-full shadow-lg backdrop-blur-sm`}>
                      {property.available ? 'Available' : 'Occupied'}
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
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-pink-600">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="text-sm font-medium">{property.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({property.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <Link to={`/property/${property.id}`} className="w-full block">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white rounded-2xl py-3 shadow-lg">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/">
              <Button variant="outline" className="rounded-2xl px-8 py-3 border-2">
                Browse More Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
