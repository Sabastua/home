import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, DollarSign, Home, Receipt, Download, Eye, Users, Building, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import AdminAuth from '@/components/AdminAuth';
import { supabase } from '@/lib/supabaseClient';

const chartConfig = {
  rent: { label: 'Rent', color: '#10b981' },
  water: { label: 'Water', color: '#3b82f6' },
  total: { label: 'Total', color: '#6366f1' },
};

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalTenants, setTotalTenants] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [occupancyRate, setOccupancyRate] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [maintenanceRequests, setMaintenanceRequests] = useState(0);
  const [revenueTrends, setRevenueTrends] = useState<any[]>([]);
  const [occupancyData, setOccupancyData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        // Total properties
        const { count: propertyCount } = await supabase.from('properties').select('*', { count: 'exact', head: true });
        setTotalProperties(propertyCount || 0);
        // Total tenants (users with a property assigned)
        const { data: tenantProps } = await supabase.from('properties').select('tenant_id').not('tenant_id', 'is', null);
        const uniqueTenants = new Set((tenantProps || []).map(p => p.tenant_id));
        setTotalTenants(uniqueTenants.size);
        // Monthly revenue (sum of payments in current month)
        const now = new Date();
        const monthStr = now.toISOString().slice(0, 7); // 'YYYY-MM'
        const { data: monthPayments } = await supabase.from('payments').select('amount, date').like('date', `${monthStr}%`);
        const monthRev = (monthPayments || []).reduce((sum, p) => sum + (p.amount || 0), 0);
        setMonthlyRevenue(monthRev);
        // Occupancy rate
        const { data: allProps } = await supabase.from('properties').select('id, tenant_id, type');
        const occupied = (allProps || []).filter(p => p.tenant_id).length;
        const total = (allProps || []).length;
        setOccupancyRate(total > 0 ? Math.round((occupied / total) * 100) : 0);
        // Pending payments
        const { data: pending } = await supabase.from('payments').select('id').eq('status', 'pending');
        setPendingPayments((pending || []).length);
        // Maintenance requests (if you have a table, else set to 0)
        setMaintenanceRequests(0);
        // Revenue trends (group by month)
        const { data: allPayments } = await supabase.from('payments').select('amount, date, type');
        const trendsMap = new Map();
        (allPayments || []).forEach(p => {
          const month = p.date ? p.date.slice(0, 7) : 'Unknown';
          if (!trendsMap.has(month)) trendsMap.set(month, { month, rent: 0, water: 0, total: 0 });
          if (p.type === 'rent') trendsMap.get(month).rent += p.amount || 0;
          if (p.type === 'water') trendsMap.get(month).water += p.amount || 0;
          trendsMap.get(month).total += p.amount || 0;
        });
        setRevenueTrends(Array.from(trendsMap.values()).sort((a, b) => a.month.localeCompare(b.month)));
        // Occupancy by type
        const typeMap = new Map();
        (allProps || []).forEach(p => {
          const type = p.type || 'Unknown';
          if (!typeMap.has(type)) typeMap.set(type, { type, occupied: 0, vacant: 0 });
          if (p.tenant_id) typeMap.get(type).occupied += 1;
          else typeMap.get(type).vacant += 1;
        });
        setOccupancyData(Array.from(typeMap.values()));
      } catch (e) {
        setError('Error fetching dashboard data.');
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
  }

  const revenueBreakdown = [
    { name: 'Rent', value: (revenueTrends.reduce((sum, m) => sum + (m.rent || 0), 0)), color: '#10b981' },
    { name: 'Water Bills', value: (revenueTrends.reduce((sum, m) => sum + (m.water || 0), 0)), color: '#3b82f6' },
    { name: 'Other', value: (revenueTrends.reduce((sum, m) => sum + (m.total || 0), 0) - revenueTrends.reduce((sum, m) => sum + (m.rent || 0) + (m.water || 0), 0)), color: '#f59e0b' },
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
              <h1 className="text-xl font-bold text-gray-900">Financial Dashboard</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="outline">Manage Properties</Button>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Property Management Dashboard</h2>
          <p className="text-gray-600">Monitor your rental properties, revenue, and tenant management</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Properties</p>
                      <p className="text-2xl font-bold text-green-600">
                        {totalProperties}
                      </p>
                    </div>
                    <Building className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {totalTenants}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-purple-600">
                        KSh {monthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                      <p className="text-2xl font-bold text-green-600">
                        {occupancyRate}%
                      </p>
                    </div>
                    <Home className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue and Occupancy Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <LineChart data={revenueTrends}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} />
                      <Line type="monotone" dataKey="rent" stroke="var(--color-rent)" strokeWidth={2} />
                      <Line type="monotone" dataKey="water" stroke="var(--color-water)" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Occupancy by Property Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={occupancyData}>
                      <XAxis dataKey="type" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="occupied" fill="#10b981" name="Occupied" />
                      <Bar dataKey="vacant" fill="#ef4444" name="Vacant" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {revenueBreakdown.map((entry, index) => (
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

              {/* Monthly Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={revenueTrends}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="rent" fill="var(--color-rent)" />
                      <Bar dataKey="water" fill="var(--color-water)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Financial Reports */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">Comprehensive monthly revenue breakdown</p>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Annual Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">Yearly property and revenue analysis</p>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tenant Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">Tenant payment history and analytics</p>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
