
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, Home, Upload, Camera, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PropertyManagement = () => {
  const { toast } = useToast();

  // Form state for adding new property
  const [newProperty, setNewProperty] = useState({
    plotNumber: '',
    title: '',
    type: '',
    location: '',
    neighborhood: '',
    rent: '',
    waterBillCost: '',
    description: '',
    features: [],
    images: [],
    landlordName: '',
    landlordPhone: '',
    paybill: '',
    accountNumber: ''
  });

  const [newFeature, setNewFeature] = useState('');
  const [mediaType, setMediaType] = useState('image'); // 'image', 'video', 'live'

  // Mock properties data with new fields
  const [properties, setProperties] = useState([
    {
      id: 1,
      plotNumber: 'PLT001',
      title: 'Cozy Bedsitter in Nakuru Town',
      type: 'Bedsitter',
      location: 'Nakuru Town',
      neighborhood: 'Town Center',
      rent: 8000,
      waterBillCost: 500,
      status: 'Occupied',
      tenant: 'John Kamau',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c9c7ca',
      lastPayment: '2024-01-15',
      dateAdded: '2023-12-01',
      features: ['Water included', 'Security', 'WiFi']
    },
    {
      id: 2,
      plotNumber: 'PLT002',
      title: 'Spacious 2BR Apartment in Milimani',
      type: '2BR',
      location: 'Milimani',
      neighborhood: 'Milimani Estate',
      rent: 25000,
      waterBillCost: 800,
      status: 'Vacant',
      tenant: '',
      image: 'https://images.unsplash.com/photo-1494200426193-1c0c4efcb48f',
      lastPayment: '',
      dateAdded: '2023-11-15',
      features: ['Parking', 'Security', 'Modern Kitchen', 'Balcony']
    }
  ]);

  const propertyTypes = ["Bedsitter", "Studio", "1BR", "2BR", "3BR", "Own Compound"];
  const locations = ["Nakuru Town", "Lanet", "Njoro", "Rongai", "Mbaruk", "Kabarak", "Bahati", "Milimani", "Westside", "Kiamunyi", "Racecourse", "Section 58"];
  const commonFeatures = ["Water included", "Parking", "Security", "Wi-Fi Ready", "Modern Kitchen", "Garden", "Furnished", "Generator", "Balcony"];

  const handleInputChange = (field: string, value: string) => {
    setNewProperty(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFeature = (feature: string) => {
    if (feature && !newProperty.features.includes(feature)) {
      setNewProperty(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setNewProperty(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProperty.plotNumber || !newProperty.title || !newProperty.type || !newProperty.location || !newProperty.rent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const property = {
      id: properties.length + 1,
      plotNumber: newProperty.plotNumber,
      title: newProperty.title,
      type: newProperty.type,
      location: newProperty.location,
      neighborhood: newProperty.neighborhood,
      rent: parseInt(newProperty.rent),
      waterBillCost: parseInt(newProperty.waterBillCost) || 0,
      status: 'Vacant',
      tenant: '',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c9c7ca',
      lastPayment: '',
      dateAdded: new Date().toISOString().split('T')[0],
      features: newProperty.features
    };

    setProperties([...properties, property]);
    
    // Reset form
    setNewProperty({
      plotNumber: '',
      title: '',
      type: '',
      location: '',
      neighborhood: '',
      rent: '',
      waterBillCost: '',
      description: '',
      features: [],
      images: [],
      landlordName: '',
      landlordPhone: '',
      paybill: '',
      accountNumber: ''
    });

    toast({
      title: "Property Added Successfully",
      description: `${property.title} has been added to the listings`,
    });
  };

  const deleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
    toast({
      title: "Property Deleted",
      description: "Property has been removed from listings",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="add-property" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add-property">Add New Property</TabsTrigger>
          <TabsTrigger value="existing-properties">Existing Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="add-property">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Add New Property
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plotNumber">Plot Number *</Label>
                    <Input
                      id="plotNumber"
                      placeholder="PLT001"
                      value={newProperty.plotNumber}
                      onChange={(e) => handleInputChange('plotNumber', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Modern 2BR Apartment"
                      value={newProperty.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Property Type *</Label>
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
                    <Label htmlFor="location">Location *</Label>
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

                  <div>
                    <Label htmlFor="neighborhood">Neighborhood</Label>
                    <Input
                      id="neighborhood"
                      placeholder="e.g., Milimani Estate"
                      value={newProperty.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rent">Monthly Rent (KSh) *</Label>
                    <Input
                      id="rent"
                      type="number"
                      placeholder="25000"
                      value={newProperty.rent}
                      onChange={(e) => handleInputChange('rent', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="waterBillCost">Water Bill Cost (KSh)</Label>
                    <Input
                      id="waterBillCost"
                      type="number"
                      placeholder="500"
                      value={newProperty.waterBillCost}
                      onChange={(e) => handleInputChange('waterBillCost', e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the property, its features, and surroundings..."
                    value={newProperty.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Media Upload */}
                <div className="space-y-4">
                  <Label>Property Media</Label>
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={mediaType === 'image' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMediaType('image')}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images
                    </Button>
                    <Button
                      type="button"
                      variant={mediaType === 'video' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMediaType('video')}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Upload Video
                    </Button>
                    <Button
                      type="button"
                      variant={mediaType === 'live' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMediaType('live')}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Live Capture
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {mediaType === 'image' && (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Property Images</h3>
                        <p className="text-gray-600 mb-4">Drag and drop images or click to browse</p>
                        <Button type="button" variant="outline">
                          Select Images
                        </Button>
                      </>
                    )}
                    {mediaType === 'video' && (
                      <>
                        <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Property Video</h3>
                        <p className="text-gray-600 mb-4">Upload a video tour of the property</p>
                        <Button type="button" variant="outline">
                          Select Video
                        </Button>
                      </>
                    )}
                    {mediaType === 'live' && (
                      <>
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Live Camera Capture</h3>
                        <p className="text-gray-600 mb-4">Take photos directly with your camera</p>
                        <Button type="button" variant="outline">
                          Open Camera
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <Label>Features & Amenities</Label>
                  <div className="flex flex-wrap gap-2">
                    {newProperty.features.map(feature => (
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

                  <div className="flex flex-wrap gap-2">
                    {commonFeatures.map(feature => (
                      <Button
                        key={feature}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addFeature(feature)}
                        disabled={newProperty.features.includes(feature)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {feature}
                      </Button>
                    ))}
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
                </div>

                {/* Landlord Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="landlordName">Landlord Name</Label>
                    <Input
                      id="landlordName"
                      placeholder="John Kamau"
                      value={newProperty.landlordName}
                      onChange={(e) => handleInputChange('landlordName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="landlordPhone">Phone Number</Label>
                    <Input
                      id="landlordPhone"
                      placeholder="+254 712 345 678"
                      value={newProperty.landlordPhone}
                      onChange={(e) => handleInputChange('landlordPhone', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="paybill">M-PESA Paybill Number</Label>
                    <Input
                      id="paybill"
                      placeholder="522533"
                      value={newProperty.paybill}
                      onChange={(e) => handleInputChange('paybill', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="HOUSE001"
                      value={newProperty.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Add Property
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="existing-properties">
          <Card>
            <CardHeader>
              <CardTitle>Existing Properties ({properties.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {properties.map((property) => (
                  <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{property.title}</h3>
                          <Badge variant={property.status === 'Occupied' ? 'default' : 'secondary'}>
                            {property.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Plot:</strong> {property.plotNumber}</p>
                          <p><strong>Location:</strong> {property.location} - {property.neighborhood}</p>
                          <p><strong>Rent:</strong> KSh {property.rent.toLocaleString()}/month</p>
                          <p><strong>Water Bill:</strong> KSh {property.waterBillCost ? property.waterBillCost.toLocaleString() : 0}/month</p>
                          {property.tenant && <p><strong>Tenant:</strong> {property.tenant}</p>}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {property.features.map(feature => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteProperty(property.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyManagement;
