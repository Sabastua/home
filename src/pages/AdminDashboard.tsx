
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Upload, MapPin, Calendar, Check, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    rent: '',
    description: '',
    features: [],
    landlordName: '',
    landlordPhone: '',
    paybill: '',
    accountNumber: ''
  });

  const [newFeature, setNewFeature] = useState('');

  const propertyTypes = ["Bedsitter", "Studio", "1BR", "2BR", "3BR", "Own Compound"];
  const locations = ["Nakuru Town", "Lanet", "Njoro", "Rongai", "Mbaruk", "Kabarak", "Bahati"];
  const commonFeatures = ["Water included", "Parking", "Security", "Wi-Fi Ready", "Modern Kitchen", "Garden", "Furnished"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFeature = (feature: string) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property listing submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Property listed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </Link>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">List New Property</h2>
          <p className="text-gray-600">Add a new rental property to Nakuru HomesConnect</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Modern 2BR Apartment"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="rent">Monthly Rent (KSh)</Label>
                  <Input
                    id="rent"
                    type="number"
                    placeholder="25000"
                    value={formData.rent}
                    onChange={(e) => handleInputChange('rent', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Property Type</Label>
                  <Select onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Property Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the property, its features, and surroundings..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Features & Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Selected Features</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map(feature => (
                    <Badge key={feature} variant="secondary" className="cursor-pointer">
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Common Features</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonFeatures.map(feature => (
                    <Button
                      key={feature}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addFeature(feature)}
                      disabled={formData.features.includes(feature)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      {feature}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add custom feature..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => addFeature(newFeature)}
                  disabled={!newFeature}
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Property Images</h3>
                <p className="text-gray-600 mb-4">Drag and drop images or click to browse</p>
                <Button type="button" variant="outline">
                  Select Images
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Landlord Information */}
          <Card>
            <CardHeader>
              <CardTitle>Landlord Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="landlordName">Landlord Name</Label>
                  <Input
                    id="landlordName"
                    placeholder="John Kamau"
                    value={formData.landlordName}
                    onChange={(e) => handleInputChange('landlordName', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="landlordPhone">Phone Number</Label>
                  <Input
                    id="landlordPhone"
                    placeholder="+254 712 345 678"
                    value={formData.landlordPhone}
                    onChange={(e) => handleInputChange('landlordPhone', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="paybill">M-PESA Paybill Number</Label>
                  <Input
                    id="paybill"
                    placeholder="522533"
                    value={formData.paybill}
                    onChange={(e) => handleInputChange('paybill', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="HOUSE001"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              List Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
