
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Edit, Trash2, Eye, Plus, MapPin, DollarSign } from 'lucide-react';

// Mock data for properties
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
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    lastPayment: '2024-06-15'
  },
  {
    id: 2,
    plotNumber: 'P002',
    title: 'Cozy Bedsitter',
    type: 'Bedsitter',
    location: 'Lanet',
    rent: 12000,
    status: 'vacant',
    tenant: null,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    lastPayment: null
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
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511',
    lastPayment: '2024-06-10'
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
    image: ''
  });

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const property = {
      id: properties.length + 1,
      ...newProperty,
      rent: Number(newProperty.rent),
      status: 'vacant',
      tenant: null,
      lastPayment: null
    };
    setProperties([...properties, property]);
    setNewProperty({ plotNumber: '', title: '', type: '', location: '', rent: '', image: '' });
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-green-100 text-green-800';
      case 'vacant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
