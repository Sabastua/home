
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Edit, Trash2, Eye, Plus, MapPin, DollarSign } from 'lucide-react';

// Enhanced mock data for 10 properties with comprehensive information
const mockProperties = [
  {
    id: 1,
    plotNumber: 'P001',
    title: 'Modern 2BR Apartment',
    type: '2BR',
    location: 'Nakuru Town',
    rent: 25000,
    status: 'occupied',
    tenant: 'John Kamau',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    lastPayment: '2024-06-15',
    dateAdded: '2024-01-15',
    features: ['Water included', 'Parking', 'Security', 'WiFi', 'Generator']
  },
  {
    id: 2,
    plotNumber: 'P002',
    title: 'Cozy Bedsitter',
    type: 'Bedsitter',
    location: 'Lanet',
    rent: 8000,
    status: 'vacant',
    tenant: null,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
    lastPayment: null,
    dateAdded: '2024-02-01',
    features: ['Furnished', 'Water included', 'WiFi', 'Security']
  },
  {
    id: 3,
    plotNumber: 'P003',
    title: 'Spacious 3BR House',
    type: '3BR',
    location: 'Njoro',
    rent: 35000,
    status: 'occupied',
    tenant: 'Mary Wanjiku',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
    lastPayment: '2024-06-10',
    dateAdded: '2024-01-20',
    features: ['Own Compound', 'Garden', 'Parking', 'Security', 'Generator']
  },
  {
    id: 4,
    plotNumber: 'P004',
    title: 'Studio Apartment',
    type: 'Studio',
    location: 'Rongai',
    rent: 12000,
    status: 'occupied',
    tenant: 'Peter Mwangi',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop',
    lastPayment: '2024-06-05',
    dateAdded: '2024-02-10',
    features: ['Modern', 'Security', 'Water included', 'WiFi']
  },
  {
    id: 5,
    plotNumber: 'P005',
    title: 'Executive 4BR Villa',
    type: '4BR',
    location: 'Milimani',
    rent: 55000,
    status: 'occupied',
    tenant: 'Dr. James Mwangi',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    lastPayment: '2024-06-20',
    dateAdded: '2024-01-05',
    features: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Generator', 'WiFi', 'Gym']
  },
  {
    id: 6,
    plotNumber: 'P006',
    title: '1BR Garden Apartment',
    type: '1BR',
    location: 'Section 58',
    rent: 18000,
    status: 'vacant',
    tenant: null,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    lastPayment: null,
    dateAdded: '2024-03-01',
    features: ['Garden View', 'Parking', 'Security', 'Water included', 'WiFi']
  },
  {
    id: 7,
    plotNumber: 'P007',
    title: 'Modern 3BR Penthouse',
    type: '3BR',
    location: 'Nakuru East',
    rent: 42000,
    status: 'occupied',
    tenant: 'Sarah Njoki',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
    lastPayment: '2024-06-12',
    dateAdded: '2024-02-15',
    features: ['Rooftop Terrace', 'Modern Kitchen', 'Parking', 'Security', 'Generator', 'WiFi']
  },
  {
    id: 8,
    plotNumber: 'P008',
    title: 'Affordable Bedsitter',
    type: 'Bedsitter',
    location: 'Kaptembwo',
    rent: 6500,
    status: 'occupied',
    tenant: 'Grace Wangui',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    lastPayment: '2024-06-08',
    dateAdded: '2024-03-10',
    features: ['Water included', 'Security', 'Parking']
  },
  {
    id: 9,
    plotNumber: 'P009',
    title: 'Family 2BR Duplex',
    type: '2BR',
    location: 'Bahati',
    rent: 22000,
    status: 'vacant',
    tenant: null,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    lastPayment: null,
    dateAdded: '2024-03-20',
    features: ['Duplex Design', 'Garden', 'Parking', 'Security', 'Water included', 'WiFi']
  },
  {
    id: 10,
    plotNumber: 'P010',
    title: 'Luxury 5BR Mansion',
    type: '5BR',
    location: 'Upperhill',
    rent: 85000,
    status: 'occupied',
    tenant: 'Mr. & Mrs. Kariuki',
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop',
    lastPayment: '2024-06-25',
    dateAdded: '2024-01-01',
    features: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Generator', 'WiFi', 'Gym', 'Sauna', 'Study Room']
  }
];

const PropertyManagement = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    plotNumber: '',
    title: '',
    type: '',
    location: '',
    rent: '',
    image: '',
    features: ''
  });

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const property = {
      id: properties.length + 1,
      ...newProperty,
      rent: Number(newProperty.rent),
      status: 'vacant',
      tenant: null,
      lastPayment: null,
      dateAdded: new Date().toISOString().split('T')[0],
      features: newProperty.features.split(',').map(f => f.trim())
    };
    setProperties([...properties, property]);
    setNewProperty({ plotNumber: '', title: '', type: '', location: '', rent: '', image: '', features: '' });
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-green-100 text-green-800';
      case 'vacant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.status === 'occupied').length;
  const vacantProperties = properties.filter(p => p.status === 'vacant').length;
  const totalMonthlyRent = properties.filter(p => p.status === 'occupied').reduce((sum, p) => sum + p.rent, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Property Management</h2>
          <p className="text-gray-600">Manage your rental properties and tenants</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Property Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalProperties}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-green-600">
                  {occupiedProperties}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vacant</p>
                <p className="text-2xl font-bold text-red-600">
                  {vacantProperties}
                </p>
              </div>
              <Eye className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-purple-600">
                  KSh {totalMonthlyRent.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Property</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plotNumber">Plot Number</Label>
                <Input
                  id="plotNumber"
                  value={newProperty.plotNumber}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, plotNumber: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  value={newProperty.title}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Input
                  id="type"
                  value={newProperty.type}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, type: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newProperty.location}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rent">Monthly Rent (KSh)</Label>
                <Input
                  id="rent"
                  type="number"
                  value={newProperty.rent}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, rent: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={newProperty.image}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  value={newProperty.features}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="WiFi, Parking, Security, Water included"
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Add Property
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Properties Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plot #</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.plotNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {property.image && (
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <span>{property.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      {property.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                      KSh {property.rent.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(property.status)}>
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{property.tenant || 'N/A'}</TableCell>
                  <TableCell>{property.lastPayment || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyManagement;
