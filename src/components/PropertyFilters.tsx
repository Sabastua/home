
import React from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface Filters {
  type: string;
  location: string;
  maxRent: number;
  minRent: number;
}

interface PropertyFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const propertyTypes = ["All", "Bedsitter", "Studio", "1BR", "2BR", "3BR", "Own Compound"];
const locations = ["All", "Nakuru Town", "Lanet", "Njoro", "Rongai", "Mbaruk", "Kabarak", "Bahati"];

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange
}) => {
  if (!isOpen) return null;

  const handleRentChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      minRent: values[0],
      maxRent: values[1]
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto animate-slide-in-right">
        <Card className="border-0 rounded-t-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl">Filters</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="w-10 h-10 p-0 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Property Type */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Property Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {propertyTypes.map(type => (
                  <Button
                    key={type}
                    variant={filters.type === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFiltersChange({ ...filters, type })}
                    className={`rounded-full text-xs py-2 ${
                      filters.type === type 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Location</Label>
              <div className="grid grid-cols-2 gap-2">
                {locations.map(location => (
                  <Button
                    key={location}
                    variant={filters.location === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFiltersChange({ ...filters, location })}
                    className={`rounded-full text-xs py-2 ${
                      filters.location === location 
                        ? "bg-purple-600 hover:bg-purple-700 text-white" 
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                Price Range: KSh {filters.minRent.toLocaleString()} - KSh {filters.maxRent.toLocaleString()}
              </Label>
              <div className="px-2">
                <Slider
                  value={[filters.minRent, filters.maxRent]}
                  onValueChange={handleRentChange}
                  max={100000}
                  min={5000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>KSh 5,000</span>
                  <span>KSh 100,000</span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-4">
              <Button 
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-4 text-base font-semibold"
              >
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyFilters;
