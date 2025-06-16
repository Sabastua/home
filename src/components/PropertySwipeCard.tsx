
import React, { useState, useRef } from 'react';
import { MapPin, Star, Wifi, Car, Shield, Home, Heart, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (!isActive) return;
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isActive) return;
    
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    
    setDragOffset({ x: deltaX, y: deltaY * 0.1 });
  };

  const handleEnd = () => {
    if (!isDragging || !isActive) return;
    
    const threshold = 100;
    
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction, property.id);
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (!isActive) return;
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isRightSide = clickX > rect.width / 2;
    
    if (isRightSide && currentImageIndex < property.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else if (!isRightSide && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const getFeatureIcon = (feature: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'WiFi': <Wifi className="w-3 h-3" />,
      'Parking': <Car className="w-3 h-3" />,
      'Security': <Shield className="w-3 h-3" />,
      'Own Compound': <Home className="w-3 h-3" />,
    };
    return iconMap[feature] || null;
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) * 0.003);
  const scale = 1 - index * 0.05;
  const translateY = index * 8;
  const zIndex = 10 - index;

  const cardStyle = {
    transform: isActive 
      ? `translate(${dragOffset.x}px, ${dragOffset.y + translateY}px) rotate(${rotation}deg) scale(${scale})`
      : `translateY(${translateY}px) scale(${scale})`,
    opacity: isActive ? opacity : 1 - index * 0.2,
    zIndex,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
  };

  return (
    <Card 
      ref={cardRef}
      className="absolute inset-0 w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
      style={cardStyle}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      <div className="relative h-full">
        {/* Image with indicators */}
        <div className="relative h-2/3 overflow-hidden" onClick={handleImageClick}>
          <img 
            src={property.images[currentImageIndex]} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {/* Swipe indicators */}
          {isActive && Math.abs(dragOffset.x) > 20 && (
            <div className={`absolute inset-0 flex items-center justify-center ${
              dragOffset.x > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <div className={`w-20 h-20 rounded-full ${
                dragOffset.x > 0 ? 'bg-green-500' : 'bg-red-500'
              } flex items-center justify-center shadow-lg`}>
                {dragOffset.x > 0 ? (
                  <Heart className="w-10 h-10 text-white" />
                ) : (
                  <X className="w-10 h-10 text-white" />
                )}
              </div>
            </div>
          )}
          
          {/* Image dots */}
          {property.images.length > 1 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Property type badge */}
          <Badge className="absolute top-4 right-4 bg-white/90 text-gray-700 rounded-full shadow-lg backdrop-blur-sm">
            {property.type}
          </Badge>
          
          {/* Rating */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-xs text-gray-300">({property.reviews})</span>
          </div>
        </div>
        
        {/* Content */}
        <CardContent className="p-6 h-1/3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-4">
              KSh {property.rent.toLocaleString()}
              <span className="text-sm text-gray-500 font-normal">/month</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {property.features.slice(0, 4).map((feature, idx) => (
              <Badge 
                key={idx} 
                variant="secondary" 
                className="text-xs bg-gray-100 text-gray-700 rounded-full flex items-center space-x-1"
              >
                {getFeatureIcon(feature)}
                <span>{feature}</span>
              </Badge>
            ))}
            {property.features.length > 4 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 rounded-full">
                +{property.features.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PropertySwipeCard;
