import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, MapPin, Star, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import MobileSwipeView from '@/components/MobileSwipeView';
import PaymentButton from '@/components/PaymentButton';
import { supabase } from '@/lib/supabaseClient';
import { useFavorites } from '@/hooks/use-favorites';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch properties from database
  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          console.error('Error fetching properties:', error);
          toast({
            title: "Error",
            description: "Failed to load properties. Please try again.",
            variant: "destructive"
          });
        } else {
          const transformedProperties = data?.map(property => ({
            id: property.id,
            title: property.title,
            location: property.location,
            rent: property.rent,
            type: property.type,
            description: property.description,
            created_at: property.created_at,
            image: '/property1.jpg', // fallback image
            features: [],
            beds: 1,
            baths: 1,
            available: true,
            rating: 4.0,
            reviews: 0,
          })) || [];
          setProperties(transformedProperties);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Error",
          description: "Failed to load properties. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [toast]);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (isMobile) {
    // Convert favorites (string[]) to number[] for MobileSwipeView
    const favoriteIds = favorites.map(id => {
      const num = Number(id);
      return isNaN(num) ? -1 : num;
    }).filter(id => id !== -1);
    // Handler to convert number to string for toggleFavorite
    const handleToggleFavorite = (propertyId: number) => {
      toggleFavorite(propertyId.toString());
    };
    return (
      <MobileSwipeView 
        properties={filteredProperties}
        favorites={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Nakuru Homes</h1>
                <p className="text-sm text-gray-600">Find Your Perfect Home</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/favorites" className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Star className="w-5 h-5" />
                  {favorites.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                    >
                      {favorites.length}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-red-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Dream Home in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">Nakuru</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover beautiful, affordable rental properties across Nakuru. From cozy bedsitters to spacious family homes.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by location or property type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-green-500 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Available Properties ({filteredProperties.length})
          </h3>
          <Button
            variant="outline"
            onClick={async () => {
              setLoading(true);
              try {
                const { data, error } = await supabase
                  .from('properties')
                  .select('*')
                  .order('created_at', { ascending: false });
                if (!error) {
                  const transformedProperties = data?.map(property => ({
                    id: property.id,
                    title: property.title,
                    location: property.location,
                    rent: property.rent,
                    type: property.type,
                    description: property.description,
                    created_at: property.created_at,
                    image: '/property1.jpg', // fallback image
                    features: [],
                    beds: 1,
                    baths: 1,
                    available: true,
                    rating: 4.0,
                    reviews: 0,
                  })) || [];
                  setProperties(transformedProperties);
                }
              } finally {
                setLoading(false);
              }
            }}
          >
            Refresh
          </Button>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? `No properties match "${searchTerm}". Try adjusting your search.` : 'No properties are currently available.'}
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="mx-auto"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => {
              const cardClass = `transition-transform duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-green-500`;
              return (
                <Card key={property.id} className={cardClass}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(property.id)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                      >
                        <Star 
                          className={`w-5 h-5 ${isFavorite(property.id) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} 
                        />
                      </Button>
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                        {property.type}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                          {property.title}
                        </h4>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            KSh {property.rent.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">per month</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <Link to={`/property/${property.id}`}>
                          <Button variant="outline" className="w-full rounded-2xl font-semibold">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
