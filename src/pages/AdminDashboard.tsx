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
import { supabase } from '@/lib/supabaseClient';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
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

  const [monthlyData, setMonthlyData] = useState([]);
  const [properties, setProperties] = useState([]);
  const [payments, setPayments] = useState([]);

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
    let mounted = true;
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (mounted) setIsAuthenticated(!!data.session);
    }
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    // Still checking auth state
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AdminAuth onLogin={() => setIsAuthenticated(true)} />;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare property data
    const newProperty = {
      title: formData.title,
      type: formData.type,
      location: formData.location,
      rent: Number(formData.rent),
      description: formData.description,
      features: formData.features,
      landlord_name: formData.landlordName,
      landlord_phone: formData.landlordPhone,
      paybill: formData.paybill,
      account_number: formData.accountNumber,
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('properties').insert([newProperty]);
    if (!error) {
      setFormData({
        title: '', type: '', location: '', rent: '', description: '', features: [], landlordName: '', landlordPhone: '', paybill: '', accountNumber: ''
      });
      alert('Property listed successfully!');
      // Optionally refetch properties
      const { data: updated, error: fetchError } = await supabase.from('properties').select('*');
      if (!fetchError) setProperties(updated);
    } else {
      alert('Error listing property: ' + error.message);
    }
  };

  async function addFavorite(userId, propertyId) {
    await supabase.from('favorites').insert([{ user_id: userId, property_id: propertyId }]);
  }

  async function fetchFavorites(userId) {
    const { data } = await supabase.from('favorites').select('property_id').eq('user_id', userId);
    return data.map(favorite => favorite.property_id);
  }

  const user = supabase.auth.getUser();

  async function addPayment(payment) {
    const { data, error } = await supabase.from('payments').insert([payment]);
    // handle result
  }

  async function addReceipt(paymentId, pdfUrl) {
    await supabase.from('receipts').insert([{ payment_id: paymentId, pdf_url: pdfUrl }]);
  }

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
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Property or Plot</h2>
        <PropertyManagement />
        {/* You can add other dashboard content below if needed */}
      </div>
    </div>
  );
};

export default AdminDashboard;
