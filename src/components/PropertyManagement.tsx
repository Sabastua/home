import React, { useState, useEffect, useRef } from 'react';
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
import { supabase } from '@/lib/supabaseClient';

const PropertyManagement = () => {
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  // Form state for adding new property
  const [formData, setFormData] = useState({
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
    houseNumber: ''
  });

  const [newFeature, setNewFeature] = useState('');
  const [mediaType, setMediaType] = useState('image'); // 'image', 'video', 'live'

  // Remove mock properties data
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      const { data, error } = await supabase.from('properties').select('*');
      if (!error) setProperties(data);
      setLoading(false);
    }
    fetchProperties();
  }, []);

  const propertyTypes = ["Bedsitter", "Studio", "1BR", "2BR", "3BR", "Own Compound"];
  const locations = ["Nakuru Town", "Lanet", "Njoro", "Rongai", "Mbaruk", "Kabarak", "Bahati", "Milimani", "Westside", "Kiamunyi", "Racecourse", "Section 58"];
  const commonFeatures = ["Water included", "Parking", "Security", "Wi-Fi Ready", "Modern Kitchen", "Garden", "Furnished", "Generator", "Balcony"];

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

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files) as File[];
    setFormData(prev => ({ ...prev, images: files }));
    setImagePreviews(files.map(file => URL.createObjectURL(file as File)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.plotNumber || !formData.title || !formData.type || !formData.location || !formData.rent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    // Upload images to Supabase Storage if any
    let imageUrls = [];
    if (formData.images && formData.images.length > 0) {
      for (const file of formData.images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const { data, error } = await supabase.storage.from('property-images').upload(fileName, file);
        if (error) {
          toast({ title: 'Image Upload Error', description: error.message, variant: 'destructive' });
        } else {
          const { publicUrl } = supabase.storage.from('property-images').getPublicUrl(fileName).data;
          imageUrls.push(publicUrl);
        }
      }
    }
    const property = {
      plotNumber: formData.plotNumber,
      title: formData.title,
      type: formData.type,
      location: formData.location,
      neighborhood: formData.neighborhood,
      rent: parseInt(formData.rent),
      waterBillCost: parseInt(formData.waterBillCost) || 0,
      status: 'Vacant',
      tenant: '',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c9c7ca',
      lastPayment: '',
      features: formData.features,
      description: formData.description,
      images: imageUrls,
      landlordName: formData.landlordName,
      landlordPhone: formData.landlordPhone,
      paybill: formData.paybill,
      houseNumber: formData.houseNumber
    };
    const { error } = await supabase.from('properties').insert([property]);
    if (!error) {
      setFormData({
        plotNumber: '', title: '', type: '', location: '', neighborhood: '', rent: '', waterBillCost: '', description: '', features: [], images: [], landlordName: '', landlordPhone: '', paybill: '', houseNumber: ''
      });
      setImagePreviews([]);
      toast({
        title: "Property Added Successfully",
        description: `${property.title} has been added to the listings`,
      });
      // Refetch properties
      const { data: updated, error: fetchError } = await supabase.from('properties').select('*');
      if (!fetchError) setProperties(updated);
    } else {
      toast({
        title: "Error Adding Property",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteProperty = async (id) => {
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (!error) {
      setProperties(properties.filter(p => p.id !== id));
      toast({
        title: "Property Deleted",
        description: "Property has been removed from listings",
      });
    } else {
      toast({
        title: "Error Deleting Property",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading properties...</div>;
  }

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
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="plotNumber">Plot Number</Label>
                        <Input
                          id="plotNumber"
                          placeholder="PLT001"
                          value={formData.plotNumber}
                          onChange={(e) => handleInputChange('plotNumber', e.target.value)}
                          required
                        />
                      </div>
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
                      <div>
                        <Label htmlFor="neighborhood">Neighborhood</Label>
                        <Input
                          id="neighborhood"
                          placeholder="e.g., Milimani Estate"
                          value={formData.neighborhood}
                          onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="waterBillCost">Water Bill Cost (KSh)</Label>
                        <Input
                          id="waterBillCost"
                          type="number"
                          placeholder="500"
                          value={formData.waterBillCost}
                          onChange={(e) => handleInputChange('waterBillCost', e.target.value)}
                        />
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
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      >
                        Select Images
                      </Button>
                      {imagePreviews.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 justify-center">
                          {imagePreviews.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={`preview-${idx}`}
                              className="w-24 h-24 object-cover rounded border"
                            />
                          ))}
                        </div>
                      )}
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
                        <Label htmlFor="houseNumber">House Number</Label>
                        <Input
                          id="houseNumber"
                          placeholder="HOUSE001"
                          value={formData.houseNumber}
                          onChange={(e) => handleInputChange('houseNumber', e.target.value)}
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
                            {(property.features || []).map(feature => (
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
