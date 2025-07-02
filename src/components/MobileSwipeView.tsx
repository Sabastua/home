import React, { useState } from 'react';
import PropertySwipeCard from './PropertySwipeCard';

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
  beds: number;
  baths: number;
}

interface MobileSwipeViewProps {
  properties: Property[];
  favorites: number[];
  onToggleFavorite: (propertyId: number) => void;
}

const MobileSwipeView: React.FC<MobileSwipeViewProps> = ({
  properties,
  favorites,
  onToggleFavorite
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">No properties available</p>
      </div>
    );
  }

  const handleSwipe = (direction: 'left' | 'right', propertyId: number) => {
    if (direction === 'right') {
      onToggleFavorite(propertyId);
    }
    setCurrentIndex((prev) => Math.min(prev + 1, properties.length));
  };

  return (
    <div className="relative h-screen">
      {properties.slice(currentIndex, currentIndex + 2).map((property, idx) => (
        <PropertySwipeCard 
          key={property.id}
          property={property}
          index={idx}
          onSwipe={handleSwipe}
          isActive={idx === 0}
        />
      ))}
    </div>
  );
};

export default MobileSwipeView;
