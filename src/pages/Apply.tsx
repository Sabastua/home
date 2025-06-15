
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, FileText, Upload, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Apply = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    monthlyIncome: '',
    references: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the application to the agent
    const agentPhone = "+254712345678";
    const message = `New Property Application for Property ID: ${id}
    
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Occupation: ${formData.occupation}
Monthly Income: KSh ${formData.monthlyIncome}
References: ${formData.references}
Additional Info: ${formData.additionalInfo}`;
    
    window.open(`https://wa.me/${agentPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={`/property/${id}`} className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Property</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">Property Application</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Apply for Property</CardTitle>
            <p className="text-gray-600 mt-2">Fill out this form to apply for Property ID: {id}</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 rounded-2xl border-2 focus:border-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 rounded-2xl border-2 focus:border-blue-500"
                    placeholder="+254 712 345 678"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 rounded-2xl border-2 focus:border-blue-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">Occupation</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="mt-1 rounded-2xl border-2 focus:border-blue-500"
                    placeholder="Your job title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">Monthly Income (KSh)</Label>
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className="mt-1 rounded-2xl border-2 focus:border-blue-500"
                    placeholder="50000"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="references" className="text-sm font-medium text-gray-700">References</Label>
                <Textarea
                  id="references"
                  name="references"
                  value={formData.references}
                  onChange={handleInputChange}
                  className="mt-1 rounded-2xl border-2 focus:border-blue-500"
                  placeholder="Please provide 2-3 references with their contact information"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="additionalInfo" className="text-sm font-medium text-gray-700">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="mt-1 rounded-2xl border-2 focus:border-blue-500"
                  placeholder="Any additional information you'd like to share"
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl">
                <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your application will be sent directly to our agent via WhatsApp</li>
                  <li>• You'll receive a response within 24 hours</li>
                  <li>• If approved, we'll schedule a property viewing</li>
                </ul>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-4 text-lg font-semibold shadow-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Apply;
