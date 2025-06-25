import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Upload, MapPin, Calendar, Check, ArrowDown, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminAuth from '@/components/AdminAuth';
import PropertyManagement from '@/components/PropertyManagement';
import PaymentManagement from '@/components/PaymentManagement';
import jsPDF from 'jspdf';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const tenantReceipts = [
    {
      tenantName: 'Jane Doe',
      amountPaid: 35000,
      waterBill: 2000,
      rent: 30000,
      deposit: 3000,
      datePaid: '2024-07-01',
    },
    {
      tenantName: 'John Smith',
      amountPaid: 40000,
      waterBill: 2500,
      rent: 35000,
      deposit: 2500,
      datePaid: '2024-07-02',
    },
  ];

  function downloadReceipt(receipt) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Tenant Payment Receipt', 20, 20);
    doc.setFontSize(12);
    doc.text(`Tenant Name: ${receipt.tenantName}`, 20, 40);
    doc.text(`Amount Paid: KSh ${receipt.amountPaid.toLocaleString()}`, 20, 50);
    doc.text(`Water Bill: KSh ${receipt.waterBill.toLocaleString()}`, 20, 60);
    doc.text(`Rent: KSh ${receipt.rent.toLocaleString()}`, 20, 70);
    doc.text(`Deposit: KSh ${receipt.deposit.toLocaleString()}`, 20, 80);
    doc.text(`Date Paid: ${receipt.datePaid}`, 20, 90);
    doc.save(`receipt-${receipt.tenantName.replace(/\s+/g, '_')}-${receipt.datePaid}.pdf`);
  }

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

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
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">Financial Reports</Button>
              </Link>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tenant Payment Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tenant</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount Paid</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Water Bill</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rent</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Deposit</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date Paid</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tenantReceipts.map((receipt, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 whitespace-nowrap">{receipt.tenantName}</td>
                      <td className="px-4 py-2 whitespace-nowrap">KSh {receipt.amountPaid.toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap">KSh {receipt.waterBill.toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap">KSh {receipt.rent.toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap">KSh {receipt.deposit.toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{receipt.datePaid}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <Button size="sm" variant="outline" onClick={() => downloadReceipt(receipt)}>
                          Download PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="add-property" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add-property">Add Property</TabsTrigger>
            <TabsTrigger value="manage-properties">Manage Properties</TabsTrigger>
            <TabsTrigger value="payments">Payment Management</TabsTrigger>
          </TabsList>

          <TabsContent value="add-property">
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
          </TabsContent>

          <TabsContent value="manage-properties">
            <PropertyManagement />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
