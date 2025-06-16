
import React from 'react';
import { X, Filter, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-in-right shadow-2xl">
        <Card className="border-0 rounded-t-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-3xl">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Filter className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse">
                  <Sparkles className="w-2 h-2 text-white ml-1 mt-1" />
                </div>
              </div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Filter Properties
                </CardTitle>
                <p className="text-sm text-gray-500">Find your perfect home</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="w-12 h-12 p-0 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <X className="w-6 h-6 text-gray-600" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-8 p-6">
            {/* Property Type */}
            <div className="space-y-4">
              <Label className="text-base font-bold text-gray-800 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                Property Type
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {propertyTypes.map(type => (
                  <Button
                    key={type}
                    variant={filters.type === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFiltersChange({ ...filters, type })}
                    className={`rounded-2xl text-xs py-3 font-medium transition-all duration-300 hover:scale-105 ${
                      filters.type === type 
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg" 
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <Label className="text-base font-bold text-gray-800 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
                Location
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {locations.map(location => (
                  <Button
                    key={location}
                    variant={filters.location === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFiltersChange({ ...filters, location })}
                    className={`rounded-2xl text-xs py-3 font-medium transition-all duration-300 hover:scale-105 ${
                      filters.location === location 
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg" 
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
              <Label className="text-base font-bold text-gray-800 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></div>
                Price Range
              </Label>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    KSh {filters.minRent.toLocaleString()} - KSh {filters.maxRent.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">per month</p>
                </div>
                
                <div className="px-4">
                  <Slider
                    value={[filters.minRent, filters.maxRent]}
                    onValueChange={handleRentChange}
                    max={100000}
                    min={5000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-4">
                    <span className="bg-white px-2 py-1 rounded-lg shadow-sm">KSh 5,000</span>
                    <span className="bg-white px-2 py-1 rounded-lg shadow-sm">KSh 100,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-6">
              <Button 
                onClick={onClose}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white rounded-2xl py-4 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                  Apply Filters
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyFilters;
