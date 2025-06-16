
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
}

const PropertySwipeCard: React.FC<PropertySwipeCardProps> = ({
  property,
  index,
  onSwipe,
  isActive
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wifi': return <Wifi className="w-3 h-3" />;
      case 'parking': return <Car className="w-3 h-3" />;
      case 'security': return <Shield className="w-3 h-3" />;
      case 'generator': return <Zap className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleStart = (clientX: number, clientY: number) => {
    if (!isActive) return;
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isActive) return;
    
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
    if (!isDragging || !isActive) return;
    
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

  const rotation = isActive ? dragOffset.x * 0.1 : 0;
  const opacity = isActive ? Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300) : 1;

  return (
    <div className="relative w-full h-[600px]">
      <Card
        ref={cardRef}
        className={`
          absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing
          border-0 shadow-2xl hover:shadow-3xl transition-all duration-300
          ${isDragging ? 'scale-105' : 'hover:scale-[1.02]'}
          ${index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'}
        `}
        style={{
          transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
          opacity,
          borderRadius: '24px',
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
              <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm z-50 flex items-center justify-center animate-pulse">
                <div className="bg-green-500 rounded-full p-4 shadow-2xl animate-bounce">
                  <Heart className="w-12 h-12 text-white" />
                </div>
              </div>
            )}
            {swipeDirection === 'left' && (
              <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm z-50 flex items-center justify-center animate-pulse">
                <div className="bg-red-500 rounded-full p-4 shadow-2xl animate-bounce">
                  <X className="w-12 h-12 text-white" />
                </div>
              </div>
            )}
          </>
        )}

        {/* Property Image */}
        <div className="relative h-[400px] overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-3 py-1 text-xs font-medium shadow-lg">
              Available
            </Badge>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-medium">{property.rating}</span>
            </div>
          </div>

          {/* Property Basic Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-xl font-bold mb-2">{property.title}</h3>
            <div className="flex items-center text-white/90 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{property.location}</span>
            </div>
            <div className="text-white text-lg font-bold">
              KSh {property.rent.toLocaleString()}/month
            </div>
          </div>
        </div>

        {/* Property Details */}
        <CardContent className="p-6 space-y-4 bg-white">
          {/* Property Type */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              {property.type}
            </Badge>
            <div className="text-xs text-gray-500 flex items-center">
              <Star className="w-3 h-3 mr-1" />
              {property.reviews} reviews
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {property.features.slice(0, 4).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-1 bg-gray-50 rounded-full px-3 py-1 text-xs text-gray-600"
                >
                  {getFeatureIcon(feature)}
                  <span>{feature}</span>
                </div>
              ))}
              {property.features.length > 4 && (
                <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-500">
                  +{property.features.length - 4} more
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySwipeCard;
