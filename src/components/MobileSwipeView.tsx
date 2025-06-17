
import React from 'react';
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
}

interface MobileSwipeViewProps {
  properties: Property[];
  currentIndex: number;
  onSwipe: (direction: 'left' | 'right', propertyId: number) => void;
}

const MobileSwipeView: React.FC<MobileSwipeViewProps> = ({
  properties,
  currentIndex,
  onSwipe
}) => {
  if (properties.length === 0 || currentIndex >= properties.length) {
    return null;
  }

  return (
    <div className="relative">
      {/* Stack of cards for swipe effect */}
      {properties.slice(currentIndex, currentIndex + 3).map((property, index) => (
        <PropertySwipeCard 
          key={property.id}
          property={property}
          index={index}
          onSwipe={onSwipe}
          isActive={index === 0}
        />
      ))}
    </div>
  );
};

export default MobileSwipeView;
