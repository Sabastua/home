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

const mockProperties = [
  {
    id: 1,
    title: 'Cozy Bedsitter in Nakuru Town',
    location: 'Nakuru Town',
    rent: 8000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c9c7ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c9c7ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1494200426193-1c0c4efcb48f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: 'Bedsitter',
    rating: 4.5,
    beds: 0,
    baths: 1,
    features: ['Water included', 'Security', 'WiFi'],
    available: true,
    reviews: 12,
  },
  {
    id: 2,
    title: 'Spacious 2BR Apartment in Milimani',
    location: 'Milimani',
    rent: 25000,
    image: 'https://images.unsplash.com/photo-1494200426193-1c0c4efcb48f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1494200426193-1c0c4efcb48f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1560185893-a55cbc97b59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: '2BR',
    rating: 4.2,
    beds: 2,
    baths: 1,
    features: ['Parking', 'Security', 'Modern Kitchen', 'Balcony'],
    available: true,
    reviews: 18,
  },
  {
    id: 3,
    title: 'Modern Studio Apartment in Westside',
    location: 'Westside',
    rent: 12000,
    image: 'https://images.unsplash.com/photo-1600585154524-164726a3a7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1600585154524-164726a3a7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: 'Studio',
    rating: 4.8,
    beds: 0,
    baths: 1,
    features: ['Modern', 'Security', 'Water included'],
    available: true,
    reviews: 25,
  },
  {
    id: 4,
    title: 'Elegant 3BR House in Kiamunyi',
    location: 'Kiamunyi',
    rent: 40000,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: '3BR',
    rating: 4.6,
    beds: 3,
    baths: 2,
    features: ['Garden', 'Parking', 'Security', 'Generator'],
    available: true,
    reviews: 22,
  },
  {
    id: 5,
    title: 'Stylish 1BR Apartment in Racecourse',
    location: 'Racecourse',
    rent: 18000,
    image: 'https://images.unsplash.com/photo-1520215790490-49023c19ca80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1520215790490-49023c19ca80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1512917774080-9991f1c9c7ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: '1BR',
    rating: 4.3,
    beds: 1,
    baths: 1,
    features: ['Parking', 'Security', 'Water included', 'WiFi'],
    available: true,
    reviews: 15,
  },
  {
    id: 6,
    title: 'Bedsitter with a View in Section 58',
    location: 'Section 58',
    rent: 9000,
    image: 'https://images.unsplash.com/photo-1592595539828-49624c13e6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1592595539828-49624c13e6e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: 'Bedsitter',
    rating: 4.1,
    beds: 0,
    baths: 1,
    features: ['Garden View', 'Security', 'Water included'],
    available: true,
    reviews: 8,
  },
  {
    id: 7,
    title: 'Lovely 2 Bedroom House in Naka Estate',
    location: 'Naka Estate',
    rent: 28000,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: '2BR',
    rating: 4.7,
    beds: 2,
    baths: 1,
    features: ['Garden', 'Parking', 'Security', 'WiFi'],
    available: true,
    reviews: 30,
  },
  {
    id: 8,
    title: 'Affordable Studio in Free Area',
    location: 'Free Area',
    rent: 11000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: 'Studio',
    rating: 4.0,
    beds: 0,
    baths: 1,
    features: ['Water included', 'Security', 'Parking'],
    available: true,
    reviews: 12,
  },
  {
    id: 9,
    title: '3 Bedroom Bungalow in London Estate',
    location: 'London Estate',
    rent: 35000,
    image: 'https://images.unsplash.com/photo-1613490495763-54ed944c48ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fEhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1613490495763-54ed944c48ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: '3BR',
    rating: 4.4,
    beds: 3,
    baths: 2,
    features: ['Own Compound', 'Garden', 'Parking', 'Security'],
    available: true,
    reviews: 18,
  },
  {
    id: 10,
    title: 'Well-Lit 1 Bedroom in White House',
    location: 'White House',
    rent: 17000,
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc97b59c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1560185893-a55cbc97b59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    ],
    type: '1BR',
    rating: 4.9,
    beds: 1,
    baths: 1,
    features: ['Modern Kitchen', 'Parking', 'Security', 'WiFi'],
    available: true,
    reviews: 35,
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const filteredProperties = mockProperties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (propertyId: number) => {
    const updatedFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: favorites.includes(propertyId) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(propertyId) 
        ? "Property removed from your favorites list"
        : "Property added to your favorites list",
    });
  };

  if (isMobile) {
    return (
      <MobileSwipeView 
        properties={filteredProperties}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
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
                  <Heart className="w-5 h-5" />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl overflow-hidden bg-white">
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
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
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
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{property.beds} bed • {property.baths} bath</span>
                </div>
                
                <div className="space-y-2">
                  <Link to={`/property/${property.id}`}>
                    <Button variant="outline" className="w-full rounded-2xl font-semibold">
                      View Details
                    </Button>
                  </Link>
                  <PaymentButton
                    propertyId={property.id}
                    propertyTitle={property.title}
                    rent={property.rent}
                    waterBill={property.waterBillCost}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No properties found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
