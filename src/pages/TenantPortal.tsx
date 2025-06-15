
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, TrendingUp, DollarSign, Home, Receipt, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import PaymentModal from '@/components/PaymentModal';

// Mock data for tenant analytics
const monthlyPayments = [
  { month: 'Jan', rent: 25000, water: 1200, total: 26200 },
  { month: 'Feb', rent: 25000, water: 1500, total: 26500 },
  { month: 'Mar', rent: 25000, water: 1100, total: 26100 },
  { month: 'Apr', rent: 25000, water: 1400, total: 26400 },
  { month: 'May', rent: 25000, water: 1300, total: 26300 },
  { month: 'Jun', rent: 25000, water: 1500, total: 26500 },
];

const expenseBreakdown = [
  { name: 'Rent', value: 25000, color: '#10b981' },
  { name: 'Water', value: 1500, color: '#3b82f6' },
  { name: 'Security', value: 1000, color: '#f59e0b' },
  { name: 'Maintenance', value: 500, color: '#ef4444' },
];

const chartConfig = {
  rent: { label: 'Rent', color: '#10b981' },
  water: { label: 'Water', color: '#3b82f6' },
  total: { label: 'Total', color: '#6366f1' },
};

// Mock tenant data
const tenantData = {
  currentProperty: {
    id: 1,
    title: "Modern 2BR Apartment",
    location: "Nakuru Town",
    rent: 25000,
    nextDueDate: "2024-07-15",
    waterBill: 1500,
    waterDueDate: "2024-07-10"
  },
  paymentHistory: [
    {
      id: 1,
      type: "Rent",
      amount: 25000,
      date: "2024-06-15",
      status: "Paid",
      mpesaCode: "QAR5TXN123"
    },
    {
      id: 2,
      type: "Water Bill",
      amount: 1200,
      date: "2024-06-10",
      status: "Paid",
      mpesaCode: "QBR3TXN456"
    }
  ],
  totalPaid: 176400,
  avgMonthlyExpense: 26300,
  onTimePayments: 95
};

const TenantPortal = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'rent' | 'water' | 'deposit'>('rent');

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const rentDaysLeft = getDaysUntilDue(tenantData.currentProperty.nextDueDate);
  const waterDaysLeft = getDaysUntilDue(tenantData.currentProperty.waterDueDate);

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
                        KSh {tenantData.totalPaid.toLocaleString()}
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
                        KSh {tenantData.avgMonthlyExpense.toLocaleString()}
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
                        {tenantData.onTimePayments}%
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
                    <div className="text-sm text-gray-600">Due: {tenantData.currentProperty.nextDueDate}</div>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setPaymentType('rent');
                      setShowPaymentModal(true);
                    }}
                  >
                    Pay Rent - KSh {tenantData.currentProperty.rent.toLocaleString()}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Water Bill</span>
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    waterDaysLeft <= 2 ? 'bg-red-50' : waterDaysLeft <= 5 ? 'bg-yellow-50' : 'bg-blue-50'
                  }`}>
                    <div className={`text-sm font-medium ${
                      waterDaysLeft <= 2 ? 'text-red-600' : waterDaysLeft <= 5 ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      Next Payment Due
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {waterDaysLeft > 0 ? `${waterDaysLeft} days` : 'Overdue'}
                    </div>
                    <div className="text-sm text-gray-600">Due: {tenantData.currentProperty.waterDueDate}</div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setPaymentType('water');
                      setShowPaymentModal(true);
                    }}
                  >
                    Pay Water Bill - KSh {tenantData.currentProperty.waterBill.toLocaleString()}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Payments Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Payment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <LineChart data={monthlyPayments}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="rent" stroke="var(--color-rent)" strokeWidth={2} />
                      <Line type="monotone" dataKey="water" stroke="var(--color-water)" strokeWidth={2} />
                      <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
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
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded shadow">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm">KSh {data.value.toLocaleString()}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
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
                  {tenantData.paymentHistory.map((payment) => (
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
                        <div className="font-semibold">KSh {payment.amount.toLocaleString()}</div>
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

          <TabsContent value="receipts" className="space-y-6">
            {/* Receipt Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Receipt Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {tenantData.paymentHistory.map((payment) => (
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

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentType={paymentType}
        amount={paymentType === 'rent' ? tenantData.currentProperty.rent : tenantData.currentProperty.waterBill}
      />
    </div>
  );
};

export default TenantPortal;
