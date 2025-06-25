import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, TrendingUp, DollarSign, Home, Receipt, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import PaymentModal from '@/components/PaymentModal';
import { supabase } from '@/lib/supabaseClient';

const TenantPortal = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [property, setProperty] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'rent' | 'water' | 'deposit'>('rent');

  useEffect(() => {
    async function fetchTenantData() {
      setLoading(true);
      setError(null);
      // Get current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        setError('You must be logged in to view the tenant portal.');
        setLoading(false);
        return;
      }
      const uid = userData.user.id;
      setUserId(uid);
      // Fetch property for this tenant (assuming a tenants table or tenant_id on properties)
      const { data: propData, error: propError } = await supabase
        .from('properties')
        .select('*')
        .eq('tenant_id', uid)
        .single();
      if (propError || !propData) {
        setError('No property found for this tenant.');
        setLoading(false);
        return;
      }
      setProperty(propData);
      // Fetch payments for this tenant
      const { data: payData, error: payError } = await supabase
        .from('payments')
        .select('*')
        .eq('tenant_id', uid)
        .order('date', { ascending: false });
      if (payError) {
        setError('Error fetching payment history.');
        setLoading(false);
        return;
      }
      setPayments(payData || []);
      setLoading(false);
    }
    fetchTenantData();
  }, []);

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading tenant data...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
  }
  if (!property) {
    return <div className="flex justify-center items-center min-h-screen text-gray-600">No property assigned to you.</div>;
  }

  const rentDaysLeft = getDaysUntilDue(property.nextDueDate);
  const waterDaysLeft = getDaysUntilDue(property.waterDueDate);
  const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const avgMonthlyExpense = payments.length > 0 ? Math.round(totalPaid / payments.length) : 0;
  const onTimePayments = payments.length > 0 ? Math.round((payments.filter(p => p.status === 'Paid').length / payments.length) * 100) : 0;

  // Prepare analytics data
  const monthlyTrends = (() => {
    // Group payments by month
    const map = new Map();
    payments.forEach(p => {
      const month = p.date ? p.date.slice(0, 7) : 'Unknown';
      if (!map.has(month)) map.set(month, { month, rent: 0, water: 0, total: 0 });
      if (p.type === 'rent') map.get(month).rent += p.amount || 0;
      if (p.type === 'water') map.get(month).water += p.amount || 0;
      map.get(month).total += p.amount || 0;
    });
    return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));
  })();
  const expenseBreakdown = [
    { name: 'Rent', value: payments.filter(p => p.type === 'rent').reduce((sum, p) => sum + (p.amount || 0), 0), color: '#10b981' },
    { name: 'Water', value: payments.filter(p => p.type === 'water').reduce((sum, p) => sum + (p.amount || 0), 0), color: '#3b82f6' },
    { name: 'Other', value: payments.filter(p => p.type !== 'rent' && p.type !== 'water').reduce((sum, p) => sum + (p.amount || 0), 0), color: '#f59e0b' },
  ];

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
              <h1 className="text-xl font-bold text-gray-900">My Tenant Portal</h1>
            </Link>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Financial Dashboard</h2>
          <p className="text-gray-600">Track your rental payments, expenses, and financial insights</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Paid</p>
                      <p className="text-2xl font-bold text-green-600">
                        KSh {totalPaid.toLocaleString()}
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
                      <p className="text-sm font-medium text-gray-600">Avg Monthly</p>
                      <p className="text-2xl font-bold text-blue-600">
                        KSh {avgMonthlyExpense.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">On-Time Rate</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {onTimePayments}%
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Property</p>
                      <p className="text-lg font-bold text-gray-900">Active</p>
                    </div>
                    <Home className="w-8 h-8 text-gray-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Due Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Rent Payment</span>
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    rentDaysLeft <= 3 ? 'bg-red-50' : rentDaysLeft <= 7 ? 'bg-yellow-50' : 'bg-green-50'
                  }`}>
                    <div className={`text-sm font-medium ${
                      rentDaysLeft <= 3 ? 'text-red-600' : rentDaysLeft <= 7 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      Next Payment Due
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {rentDaysLeft > 0 ? `${rentDaysLeft} days` : 'Overdue'}
                    </div>
                    <div className="text-sm text-gray-600">Due: {property.nextDueDate}</div>
                  </div>
                  <Button onClick={() => { setPaymentType('rent'); setShowPaymentModal(true); }} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl">
                    Pay Rent
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Water Bill</span>
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    waterDaysLeft <= 3 ? 'bg-red-50' : waterDaysLeft <= 7 ? 'bg-yellow-50' : 'bg-green-50'
                  }`}>
                    <div className={`text-sm font-medium ${
                      waterDaysLeft <= 3 ? 'text-red-600' : waterDaysLeft <= 7 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      Next Water Bill Due
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {waterDaysLeft > 0 ? `${waterDaysLeft} days` : 'Overdue'}
                    </div>
                    <div className="text-sm text-gray-600">Due: {property.waterDueDate}</div>
                  </div>
                  <Button onClick={() => { setPaymentType('water'); setShowPaymentModal(true); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl">
                    Pay Water Bill
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.length === 0 ? (
                    <div className="text-gray-500 text-center">No payments found.</div>
                  ) : payments.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          payment.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <div className="font-medium">{payment.type}</div>
                          <div className="text-sm text-gray-600">{payment.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">KSh {payment.amount?.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{payment.mpesaCode}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Receipt className="w-4 h-4 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Payments Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Payment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrends}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="rent" stroke="#10b981" strokeWidth={2} name="Rent" />
                        <Line type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={2} name="Water" />
                        <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} name="Total" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              {/* Expense Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value, name, props) => [`KSh ${value.toLocaleString()}`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="receipts" className="space-y-6">
            {/* Receipt Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Receipt Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {payments.length === 0 ? (
                    <div className="text-gray-500 col-span-full text-center">No receipts found.</div>
                  ) : payments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <Receipt className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <div className="text-sm font-medium">{payment.type}</div>
                      <div className="text-xs text-gray-500">{payment.date}</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentType={paymentType}
        amount={paymentType === 'rent' ? property.rent : property.waterBill}
      />
    </div>
  );
};

export default TenantPortal;
