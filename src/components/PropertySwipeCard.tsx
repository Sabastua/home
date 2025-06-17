import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Heart, X, Wifi, Car, Shield, Zap } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  type: string;
  location: string;
  rent: number;
  image: string;
  images: string[];
  features: string[];
  available: boolean;
  rating: number;
  reviews: number;
}

interface PropertySwipeCardProps {
  property: Property;
  index: number;
  onSwipe: (direction: 'left' | 'right', propertyId: number) => void;
  isActive: boolean;
  isDesktop?: boolean;
}

const PropertySwipeCard: React.FC<PropertySwipeCardProps> = ({
  property,
  index,
  onSwipe,
  isActive,
  isDesktop = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'generator': return <Zap className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleStart = (clientX: number, clientY: number) => {
    if (!isActive || isDesktop) return;
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isActive || isDesktop) return;
    
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY });

    // Determine swipe direction and show preview
    if (Math.abs(deltaX) > 50) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleEnd = () => {
    if (!isDragging || !isActive || isDesktop) return;
    
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction, property.id);
    }
    
    setDragOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const rotation = isActive && !isDesktop ? dragOffset.x * 0.1 : 0;
  const opacity = isActive && !isDesktop ? Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300) : 1;

  if (isDesktop) {
    // Desktop grid card layout
    return (
      <Card className="w-full h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl hover:scale-105 group">
        {/* Property Card Content */}
        <div className="relative h-full overflow-hidden rounded-3xl">
          {/* High Quality Property Image */}
          <div className="relative h-3/5 overflow-hidden rounded-t-3xl">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              draggable={false}
              loading="eager"
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            
            {/* Top Status Bar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-40">
              <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-3 py-1 text-xs font-medium shadow-lg">
                Available Now
              </Badge>
              <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-gray-800 text-xs font-medium">{property.rating}</span>
                <span className="text-gray-600 text-xs">({property.reviews})</span>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={() => onSwipe('left', property.id)}
                className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl border-0 hover:scale-110 transition-all duration-300"
                variant="ghost"
              >
                <X className="w-5 h-5 text-red-500" />
              </Button>
              <Button
                onClick={() => onSwipe('right', property.id)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              >
                <Heart className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>

          {/* Property Details Section */}
          <div className="h-2/5 bg-white p-4 flex flex-col justify-between">
            {/* Main Property Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h1 className="text-gray-900 text-lg font-bold mb-1">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-gray-700 border-gray-300 bg-gray-50 px-2 py-1 text-xs">
                  {property.type}
                </Badge>
              </div>

              {/* Price */}
              <div className="mb-3">
                <div className="text-xl font-bold text-gray-900">
                  KSh {property.rent.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600">/month</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-2">
                <h4 className="text-gray-800 text-xs font-semibold mb-2 flex items-center">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></span>
                  Features & Amenities
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  {property.features.slice(0, 4).map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-1 bg-gray-50 rounded-lg px-2 py-1 text-gray-700"
                    >
                      {getFeatureIcon(feature)}
                      <span className="text-xs font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                {property.features.length > 4 && (
                  <div className="mt-1 text-center">
                    <span className="text-gray-500 text-xs">
                      +{property.features.length - 4} more
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="fixed inset-4 z-30">
      <Card
        ref={cardRef}
        className={`
          relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing
          border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl
          ${isDragging ? 'scale-105' : 'hover:scale-[1.02]'}
          ${index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'}
        `}
        style={{
          transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
          opacity,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe Direction Overlays */}
        {swipeDirection && isActive && (
          <>
            {swipeDirection === 'right' && (
              <div className="absolute inset-0 bg-green-500/30 backdrop-blur-sm z-50 flex items-center justify-center animate-pulse rounded-3xl">
                <div className="bg-green-500 rounded-full p-6 shadow-2xl animate-bounce">
                  <Heart className="w-16 h-16 text-white" />
                </div>
              </div>
            )}
            {swipeDirection === 'left' && (
              <div className="absolute inset-0 bg-red-500/30 backdrop-blur-sm z-50 flex items-center justify-center animate-pulse rounded-3xl">
                <div className="bg-red-500 rounded-full p-6 shadow-2xl animate-bounce">
                  <X className="w-16 h-16 text-white" />
                </div>
              </div>
            )}
          </>
        )}

        {/* Property Card Content */}
        <div className="relative h-full overflow-hidden rounded-3xl">
          {/* High Quality Property Image */}
          <div className="relative h-3/5 overflow-hidden rounded-t-3xl">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              draggable={false}
              loading="eager"
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            
            {/* Top Status Bar */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-40">
              <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
                Available Now
              </Badge>
              <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-gray-800 text-sm font-medium">{property.rating}</span>
                <span className="text-gray-600 text-xs">({property.reviews})</span>
              </div>
            </div>
          </div>

          {/* Property Details Section */}
          <div className="h-2/5 bg-white p-6 flex flex-col justify-between">
            {/* Main Property Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-gray-900 text-2xl font-bold mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-base">{property.location}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-gray-700 border-gray-300 bg-gray-50 px-3 py-1">
                  {property.type}
                </Badge>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  KSh {property.rent.toLocaleString()}
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-gray-800 text-sm font-semibold mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></span>
                  Features & Amenities
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {property.features.slice(0, 4).map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 bg-gray-50 rounded-xl px-3 py-2 text-gray-700"
                    >
                      {getFeatureIcon(feature)}
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                {property.features.length > 4 && (
                  <div className="mt-2 text-center">
                    <span className="text-gray-500 text-sm">
                      +{property.features.length - 4} more amenities
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PropertySwipeCard;
