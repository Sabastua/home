import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Check, ArrowLeft, Phone, Mail, Home, Wifi, Car, Shield, Building2, MessageCircle, Eye, Heart, User, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import PaymentModal from '@/components/PaymentModal';
import { getCurrentUserId, fetchFavorites, addFavorite, removeFavorite } from '@/lib/favorites';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

// Enhanced property data with comprehensive information for all 10 properties
const propertyData = {
  1: {
    id: 1,
    title: "Modern 2BR Apartment",
    type: "2BR",
    location: "Nakuru Town",
    rent: 25000,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
    ],
    features: ["Water included", "Parking", "Security", "Modern Kitchen", "Balcony", "WiFi", "Generator"],
    description: "A beautiful modern 2-bedroom apartment located in the heart of Nakuru Town. Features include a spacious living room, modern kitchen with fitted cabinets, two comfortable bedrooms, and a private balcony with town views.",
    agent: {
      name: "Sarah Wanjiku",
      phone: "+254 712 345 678",
      email: "sarah.wanjiku@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      experience: "5+ years",
      rating: 4.8
    },
    office: {
      name: "Nakuru HomesConnect - Head Office",
      address: "Kenyatta Avenue, Nakuru Town",
      phone: "+254 712 345 678",
      email: "info@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE001",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-07-01"
  },
  2: {
    id: 2,
    title: "Cozy Bedsitter",
    type: "Bedsitter",
    location: "Lanet",
    rent: 8000,
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
    ],
    features: ["Furnished", "Water included", "WiFi", "Security"],
    description: "A cozy bedsitter perfect for students and young professionals. Fully furnished with modern amenities and located in the quiet neighborhood of Lanet.",
    agent: {
      name: "James Kimani",
      phone: "+254 712 345 679",
      email: "james.kimani@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      experience: "3+ years",
      rating: 4.5
    },
    office: {
      name: "Nakuru HomesConnect - Lanet Branch",
      address: "Lanet Shopping Center",
      phone: "+254 712 345 679",
      email: "lanet@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Head Office", address: "Kenyatta Avenue, Nakuru Town", phone: "+254 712 345 678", manager: "Sarah Wanjiku" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE002",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-06-15"
  },
  3: {
    id: 3,
    title: "Spacious 3BR House",
    type: "3BR",
    location: "Njoro",
    rent: 35000,
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    ],
    features: ["Own Compound", "Garden", "Parking", "Security", "Generator"],
    description: "A spacious 3-bedroom house with its own compound and beautiful garden. Perfect for families looking for privacy and space in the serene environment of Njoro.",
    agent: {
      name: "Grace Muthoni",
      phone: "+254 712 345 680",
      email: "grace.muthoni@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      experience: "6+ years",
      rating: 4.9
    },
    office: {
      name: "Nakuru HomesConnect - Njoro Branch",
      address: "Njoro Town Center",
      phone: "+254 712 345 680",
      email: "njoro@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Head Office", address: "Kenyatta Avenue, Nakuru Town", phone: "+254 712 345 678", manager: "Sarah Wanjiku" },
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE003",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-07-15"
  },
  4: {
    id: 4,
    title: "Studio Apartment",
    type: "Studio",
    location: "Rongai",
    rent: 12000,
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop"
    ],
    features: ["Modern", "Security", "Water included", "WiFi"],
    description: "A modern studio apartment perfect for young professionals. Located in Rongai with easy access to town and modern amenities.",
    agent: {
      name: "Peter Kiprotich",
      phone: "+254 712 345 681",
      email: "peter.kiprotich@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      experience: "4+ years",
      rating: 4.6
    },
    office: {
      name: "Nakuru HomesConnect - Rongai Branch",
      address: "Rongai Market Road",
      phone: "+254 712 345 681",
      email: "rongai@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Head Office", address: "Kenyatta Avenue, Nakuru Town", phone: "+254 712 345 678", manager: "Sarah Wanjiku" },
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE004",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-06-20"
  },
  5: {
    id: 5,
    title: "Executive 4BR Villa",
    type: "4BR",
    location: "Milimani",
    rent: 55000,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
    ],
    features: ["Swimming Pool", "Garden", "Parking", "Security", "Generator", "WiFi", "Gym"],
    description: "An executive 4-bedroom villa in the prestigious Milimani area. Features a swimming pool, gym, and beautifully landscaped garden.",
    agent: {
      name: "Sarah Wanjiku",
      phone: "+254 712 345 678",
      email: "sarah.wanjiku@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      experience: "5+ years",
      rating: 4.8
    },
    office: {
      name: "Nakuru HomesConnect - Head Office",
      address: "Kenyatta Avenue, Nakuru Town",
      phone: "+254 712 345 678",
      email: "info@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE005",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-08-01"
  },
  6: {
    id: 6,
    title: "1BR Garden Apartment",
    type: "1BR",
    location: "Section 58",
    rent: 18000,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
    ],
    features: ["Garden View", "Parking", "Security", "Water included", "WiFi"],
    description: "A charming 1-bedroom apartment with garden views in Section 58. Quiet neighborhood with easy access to amenities.",
    agent: {
      name: "Mary Njeri",
      phone: "+254 712 345 682",
      email: "mary.njeri@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      experience: "2+ years",
      rating: 4.4
    },
    office: {
      name: "Nakuru HomesConnect - Head Office",
      address: "Kenyatta Avenue, Nakuru Town",
      phone: "+254 712 345 678",
      email: "info@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE006",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-07-10"
  },
  7: {
    id: 7,
    title: "Modern 3BR Penthouse",
    type: "3BR",
    location: "Nakuru East",
    rent: 42000,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ],
    features: ["Rooftop Terrace", "Modern Kitchen", "Parking", "Security", "Generator", "WiFi"],
    description: "A luxurious 3-bedroom penthouse with rooftop terrace in Nakuru East. Modern finishes and panoramic views of the city.",
    agent: {
      name: "David Mutua",
      phone: "+254 712 345 683",
      email: "david.mutua@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      experience: "7+ years",
      rating: 4.7
    },
    office: {
      name: "Nakuru HomesConnect - Head Office",
      address: "Kenyatta Avenue, Nakuru Town",
      phone: "+254 712 345 678",
      email: "info@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE007",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-08-15"
  },
  8: {
    id: 8,
    title: "Affordable Bedsitter",
    type: "Bedsitter",
    location: "Kaptembwo",
    rent: 6500,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
    ],
    features: ["Water included", "Security", "Parking"],
    description: "An affordable bedsitter in Kaptembwo, perfect for budget-conscious tenants. Basic amenities included with secure compound.",
    agent: {
      name: "Anne Waweru",
      phone: "+254 712 345 684",
      email: "anne.waweru@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      experience: "3+ years",
      rating: 4.2
    },
    office: {
      name: "Nakuru HomesConnect - Head Office",
      address: "Kenyatta Avenue, Nakuru Town",
      phone: "+254 712 345 678",
      email: "info@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE008",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-06-10"
  },
  9: {
    id: 9,
    title: "Family 2BR Duplex",
    type: "2BR",
    location: "Bahati",
    rent: 22000,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop"
    ],
    features: ["Duplex Design", "Garden", "Parking", "Security", "Water included", "WiFi"],
    description: "A family-friendly 2-bedroom duplex in Bahati. Two-level design with garden space, perfect for families with children.",
    agent: {
      name: "Joseph Kariuki",
      phone: "+254 712 345 685",
      email: "joseph.kariuki@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      experience: "4+ years",
      rating: 4.6
    },
    office: {
      name: "Nakuru HomesConnect - Head Office",
      address: "Kenyatta Avenue, Nakuru Town",
      phone: "+254 712 345 678",
      email: "info@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE009",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-07-20"
  },
  10: {
    id: 10,
    title: "Luxury 5BR Mansion",
    type: "5BR",
    location: "Upperhill",
    rent: 85000,
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=600&fit=crop"
    ],
    features: ["Swimming Pool", "Garden", "Parking", "Security", "Generator", "WiFi", "Gym", "Sauna", "Study Room"],
    description: "A luxury 5-bedroom mansion in the exclusive Upperhill area. Features swimming pool, gym, sauna, study room, and beautifully landscaped gardens.",
    agent: {
      name: "Sarah Wanjiku",
      phone: "+254 712 345 678",
      email: "sarah.wanjiku@nakuruhomes.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      experience: "5+ years",
      rating: 4.8
    },
    office: {
      name: "Nakuru HomesConnect - Head Office",
      address: "Kenyatta Avenue, Nakuru Town",
      phone: "+254 712 345 678",
      email: "info@nakuruhomes.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
    },
    branches: [
      { name: "Lanet Branch", address: "Lanet Shopping Center", phone: "+254 712 345 679", manager: "James Kimani" },
      { name: "Njoro Branch", address: "Njoro Town Center", phone: "+254 712 345 680", manager: "Grace Muthoni" },
      { name: "Rongai Branch", address: "Rongai Market Road", phone: "+254 712 345 681", manager: "Peter Kiprotich" }
    ],
    payment: {
      paybill: "522533",
      accountNumber: "HOUSE010",
      businessName: "Nakuru HomesConnect Ltd"
    },
    available: true,
    dateAvailable: "2024-09-01"
  }
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    paymentType: 'rent' as 'rent' | 'water' | 'deposit',
    amount: 0
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const propertyId = parseInt(id || '1', 10);
  const property = propertyData[propertyId as keyof typeof propertyData];

  useEffect(() => {
    async function fetchUserAndFavorite() {
      const id = await getCurrentUserId();
      setUserId(id);
      if (id) {
        const favs = await fetchFavorites(id);
        setIsFavorite(favs.includes(propertyId));
      }
    }
    fetchUserAndFavorite();
  }, [propertyId]);

  const handleContactAgent = () => {
    window.open(`tel:${property.agent.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = `Hi ${property.agent.name}, I'm interested in the ${property.title} at ${property.location}. Can we discuss?`;
    window.open(`https://wa.me/${property.agent.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePayment = (type: 'rent' | 'water' | 'deposit') => {
    if (!property) return;
    
    let amount = property.rent;
    if (type === 'water') amount = Math.floor(property.rent * 0.1); // 10% of rent
    if (type === 'deposit') amount = property.rent * 2; // 2 months deposit
    
    setPaymentModal({
      isOpen: true,
      paymentType: type,
      amount
    });
  };

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      paymentType: 'rent',
      amount: 0
    });
  };

  const handleToggleFavorite = async () => {
    if (!userId) return;
    if (isFavorite) {
      await removeFavorite(userId, propertyId);
      setIsFavorite(false);
    } else {
      await addFavorite(userId, propertyId);
      setIsFavorite(true);
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/">
            <Button className="rounded-2xl">Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Properties</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">Nakuru HomesConnect</h1>
                <p className="text-xs text-gray-500">Property Details</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden rounded-3xl border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="relative">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {property.images.map((img, idx) => (
                        <CarouselItem key={idx} className="w-full">
                          <img
                            src={img}
                            alt={`${property.title} photo ${idx + 1}`}
                            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl"
                            draggable={false}
                            loading="eager"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                  </Carousel>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500/90 text-white rounded-full shadow-lg backdrop-blur-sm">
                      Available
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                    <div className="mb-4 sm:mb-0">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-base sm:text-lg">{property.location}</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                        {property.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                        KSh {property.rent.toLocaleString()}
                      </div>
                      <span className="text-sm text-gray-500">/month</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Features & Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Status</span>
                  <Badge className="bg-green-600 text-white rounded-full">
                    {property.available ? "Available" : "Occupied"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Available from</span>
                  <div className="flex items-center text-blue-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">{property.dateAvailable}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => handlePayment('rent')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pay Rent - KSh {property.rent.toLocaleString()}
                </Button>
                <Button 
                  onClick={() => handlePayment('deposit')}
                  variant="outline"
                  className="w-full rounded-2xl py-3 border-2 hover:bg-gray-50"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Pay Deposit - KSh {(property.rent * 2).toLocaleString()}
                </Button>
                <Button 
                  onClick={() => handlePayment('water')}
                  variant="outline"
                  className="w-full rounded-2xl py-3 border-2 hover:bg-gray-50"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pay Water - KSh {Math.floor(property.rent * 0.1).toLocaleString()}
                </Button>
              </CardContent>
            </Card>

            {/* Contact Agent */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <img 
                    src={property.agent.image} 
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-lg">{property.agent.name}</div>
                    <div className="text-sm text-gray-600">{property.agent.experience} experience</div>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm font-medium text-gray-700">{property.agent.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 text-sm">{property.agent.email}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={handleContactAgent}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button 
                    onClick={handleWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-2xl py-3"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Office Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Head Office */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <h4 className="font-semibold text-blue-900 mb-2">{property.office.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">{property.office.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800">{property.office.phone}</span>
                    </div>
                    <div className="text-blue-700 text-xs">{property.office.hours}</div>
                  </div>
                </div>

                {/* Branch Offices */}
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-700 text-sm">Branch Offices</h5>
                  {property.branches.map((branch, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-2xl">
                      <div className="font-medium text-gray-900 text-sm">{branch.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{branch.address}</div>
                      <div className="text-xs text-gray-600">Manager: {branch.manager}</div>
                      <div className="text-xs text-blue-600 font-medium">{branch.phone}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* M-PESA Payment Information */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">M-PESA Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Pay via M-PESA
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-white/60 rounded-xl">
                      <span className="text-green-700">Business Name:</span>
                      <span className="font-mono text-green-900 font-semibold">{property.payment.businessName}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/60 rounded-xl">
                      <span className="text-green-700">Paybill Number:</span>
                      <span className="font-mono text-green-900 font-bold text-lg">{property.payment.paybill}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/60 rounded-xl">
                      <span className="text-green-700">Account Number:</span>
                      <span className="font-mono text-green-900 font-semibold">{property.payment.accountNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 p-3 bg-yellow-50 rounded-2xl">
                  <strong>How to pay:</strong> Go to M-PESA → Lipa na M-PESA → Pay Bill → Enter details above
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={`/apply/${property.id}`} className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-3 shadow-lg">
                    <User className="w-4 h-4 mr-2" />
                    Apply for This Property
                  </Button>
                </Link>
                <Link to={`/schedule-viewing/${property.id}`} className="block">
                  <Button variant="outline" className="w-full rounded-2xl py-3 border-2 hover:bg-gray-50">
                    <Eye className="w-4 h-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </Link>
                <Button variant={isFavorite ? 'destructive' : 'outline'} className="w-full rounded-2xl py-3 border-2 hover:bg-gray-50" onClick={handleToggleFavorite}>
                  <Heart className="w-4 h-4 mr-2" />
                  {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        paymentType={paymentModal.paymentType}
        amount={paymentModal.amount}
      />
    </div>
  );
};

export default PropertyDetail;
