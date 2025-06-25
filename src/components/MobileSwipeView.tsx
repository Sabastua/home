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
  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">No properties available</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      {properties.map((property, index) => (
        <PropertySwipeCard 
          key={property.id}
          property={property}
          index={index}
          onSwipe={(direction) => {
            if (direction === 'right') {
              onToggleFavorite(property.id);
            }
          }}
          isActive={index === 0}
        />
      ))}
    </div>
  );
};

export default MobileSwipeView;
