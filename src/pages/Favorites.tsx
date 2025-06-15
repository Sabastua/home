
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, ChevronRight, Star, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock favorites data
const initialFavorites = [
  {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    features: ["Water included", "Parking", "Security"],
    dateAdded: "2024-12-10"
  },
  {
    id: 2,
    title: "Cozy Bedsitter",
    type: "Bedsitter", 
    location: "Lanet",
    rent: 8000,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    features: ["Furnished", "Water included"],
    dateAdded: "2024-12-08"
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(property => property.id !== id));
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
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-pink-600">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-xs">Added {new Date(property.dateAdded).toLocaleDateString()}</span>
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
