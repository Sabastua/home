
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
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'generator': return <Zap className="w-4 h-4" />;
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
    <div className="fixed inset-0 z-30">
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
          borderRadius: '0px',
          margin: '0',
          height: '100vh',
          width: '100vw',
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
              <div className="absolute inset-0 bg-green-500/30 backdrop-blur-sm z-50 flex items-center justify-center animate-pulse">
                <div className="bg-green-500 rounded-full p-6 shadow-2xl animate-bounce">
                  <Heart className="w-16 h-16 text-white" />
                </div>
              </div>
            )}
            {swipeDirection === 'left' && (
              <div className="absolute inset-0 bg-red-500/30 backdrop-blur-sm z-50 flex items-center justify-center animate-pulse">
                <div className="bg-red-500 rounded-full p-6 shadow-2xl animate-bounce">
                  <X className="w-16 h-16 text-white" />
                </div>
              </div>
            )}
          </>
        )}

        {/* Full Screen Property Image */}
        <div className="relative h-full overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Enhanced Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          
          {/* Top Status Bar */}
          <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-40">
            <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-4 py-2 text-sm font-medium shadow-xl">
              Available Now
            </Badge>
            <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">{property.rating}</span>
              <span className="text-white/70 text-xs">({property.reviews})</span>
            </div>
          </div>

          {/* Main Property Info - Centered */}
          <div className="absolute inset-x-6 top-1/2 transform -translate-y-1/2 text-center z-40">
            <h1 className="text-white text-4xl font-bold mb-4 drop-shadow-2xl">
              {property.title}
            </h1>
            <div className="flex items-center justify-center text-white text-lg mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="drop-shadow-lg">{property.location}</span>
            </div>
            <div className="text-white text-3xl font-bold mb-6 drop-shadow-2xl">
              KSh {property.rent.toLocaleString()}
              <span className="text-lg font-normal text-white/90">/month</span>
            </div>
            <Badge variant="outline" className="text-white border-white/50 bg-white/10 backdrop-blur-sm text-lg px-6 py-2">
              {property.type}
            </Badge>
          </div>

          {/* Bottom Property Details */}
          <div className="absolute bottom-8 left-6 right-6 z-40">
            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-6">
              <h4 className="text-white text-lg font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></span>
                Features & Amenities
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {property.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white"
                  >
                    {getFeatureIcon(feature)}
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              {property.features.length > 4 && (
                <div className="mt-3 text-center">
                  <span className="text-white/80 text-sm">
                    +{property.features.length - 4} more amenities
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PropertySwipeCard;
