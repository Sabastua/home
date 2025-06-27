import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, ChevronRight, Star, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PaymentButton from '@/components/PaymentButton';
import { supabase } from '@/lib/supabaseClient';
import { useFavorites } from '@/hooks/use-favorites';

const Favorites = () => {
  const { favorites, removeFavorite, loading: favLoading } = useFavorites();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavoriteProperties() {
      setLoading(true);
      if (favorites.length > 0) {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .in('id', favorites);
        setProperties(data || []);
      } else {
        setProperties([]);
      }
      setLoading(false);
    }
    fetchFavoriteProperties();
  }, [favorites]);

  const removeFavoriteHandler = async (propertyId: string) => {
    await removeFavorite(propertyId);
    setProperties(properties.filter(p => p.id !== propertyId));
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
                <p className="text-xs text-gray-500">{properties.length} saved properties</p>
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
        {(loading || favLoading) ? (
          <div className="text-center py-16">Loading favorites...</div>
        ) : properties.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-3xl border-0 bg-white shadow-sm hover:scale-[1.02]">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={property.image || '/property1.jpg'} 
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700 rounded-full shadow-lg backdrop-blur-sm">
                      {property.type}
                    </Badge>
                    <Button
                      onClick={() => removeFavoriteHandler(property.id)}
                      className="absolute top-3 left-3 w-10 h-10 rounded-full bg-red-500/90 hover:bg-red-600 text-white p-0 shadow-lg backdrop-blur-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
                    {property.description && (
                      <div className="mb-4 text-gray-700 text-sm">
                        {property.description}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Link to={`/property/${property.id}`} className="w-full block">
                        <Button className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white rounded-2xl py-3 shadow-lg">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {properties.length > 0 && (
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
