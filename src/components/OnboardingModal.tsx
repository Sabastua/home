
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Home, CreditCard, Check, Phone, Smartphone } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      primaryPhone: '',
      secondaryPhone: '',
      usePrimaryForMpesa: false,
      useSecondaryForMpesa: false,
      idNumber: '',
      occupation: ''
    },
    preferences: {
      propertyType: '',
      maxBudget: '',
      preferredLocation: '',
      moveInDate: ''
    },
    emergency: {
      contactName: '',
      contactPhone: '',
      relationship: ''
    }
  });

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    console.log('Onboarding completed:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in rounded-3xl border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-3xl">
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">Welcome to Nakuru HomesConnect</span>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 rounded-full">
              ×
            </Button>
          </CardTitle>
          <div className="flex items-center space-x-4 mt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex items-center transition-all duration-500 ${i <= step ? 'text-white' : 'text-white/50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  i <= step ? 'bg-white text-blue-600 shadow-lg scale-110' : 'bg-white/20 text-white'
                }`}>
                  {i < step ? <Check className="w-5 h-5" /> : i}
                </div>
                {i < 3 && (
                  <div className={`w-16 h-1 mx-3 rounded-full transition-all duration-500 ${
                    i < step ? 'bg-white shadow-lg' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 p-8">
          {step === 1 && (
            <div className="space-y-6 animate-slide-in-right">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    placeholder="John Doe"
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    placeholder="john@example.com"
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                
                {/* Primary Phone with M-Pesa Option */}
                <div className="space-y-2">
                  <Label htmlFor="primaryPhone" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    Primary Phone Number
                  </Label>
                  <Input
                    id="primaryPhone"
                    value={formData.personalInfo.primaryPhone}
                    onChange={(e) => handleInputChange('personalInfo', 'primaryPhone', e.target.value)}
                    placeholder="+254 712 345 678"
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                  <div className="flex items-center space-x-3 mt-3 p-3 bg-green-50 rounded-xl">
                    <Checkbox
                      id="usePrimaryForMpesa"
                      checked={formData.personalInfo.usePrimaryForMpesa}
                      onCheckedChange={(checked) => handleInputChange('personalInfo', 'usePrimaryForMpesa', checked)}
                      className="border-2 border-green-500 data-[state=checked]:bg-green-500"
                    />
                    <Label htmlFor="usePrimaryForMpesa" className="text-sm text-green-800 font-medium flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Use for M-Pesa payments
                    </Label>
                  </div>
                </div>

                {/* Secondary Phone with M-Pesa Option */}
                <div className="space-y-2">
                  <Label htmlFor="secondaryPhone" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-purple-600" />
                    Secondary Phone (Optional)
                  </Label>
                  <Input
                    id="secondaryPhone"
                    value={formData.personalInfo.secondaryPhone}
                    onChange={(e) => handleInputChange('personalInfo', 'secondaryPhone', e.target.value)}
                    placeholder="+254 722 345 678"
                    className="rounded-2xl border-2 focus:border-purple-500 transition-all duration-300"
                  />
                  <div className="flex items-center space-x-3 mt-3 p-3 bg-purple-50 rounded-xl">
                    <Checkbox
                      id="useSecondaryForMpesa"
                      checked={formData.personalInfo.useSecondaryForMpesa}
                      onCheckedChange={(checked) => handleInputChange('personalInfo', 'useSecondaryForMpesa', checked)}
                      className="border-2 border-purple-500 data-[state=checked]:bg-purple-500"
                    />
                    <Label htmlFor="useSecondaryForMpesa" className="text-sm text-purple-800 font-medium flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Use for M-Pesa payments
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-sm font-semibold text-gray-700">National ID Number</Label>
                  <Input
                    id="idNumber"
                    value={formData.personalInfo.idNumber}
                    onChange={(e) => handleInputChange('personalInfo', 'idNumber', e.target.value)}
                    placeholder="12345678"
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-sm font-semibold text-gray-700">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.personalInfo.occupation}
                    onChange={(e) => handleInputChange('personalInfo', 'occupation', e.target.value)}
                    placeholder="Software Engineer"
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* M-Pesa Information Box */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
                <h4 className="font-bold text-green-800 mb-3 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  M-Pesa Payment Integration
                </h4>
                <p className="text-green-700 text-sm leading-relaxed">
                  We'll integrate M-Pesa Daraja B2C for seamless rent payments. Check the box above for any phone number you want to use for M-Pesa transactions. This will be your registered payment method.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-slide-in-right">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Property Preferences</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-sm font-semibold text-gray-700">Preferred Property Type</Label>
                  <Select onValueChange={(value) => handleInputChange('preferences', 'propertyType', value)}>
                    <SelectTrigger className="rounded-2xl border-2 focus:border-blue-500">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bedsitter">Bedsitter</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1br">1 Bedroom</SelectItem>
                      <SelectItem value="2br">2 Bedroom</SelectItem>
                      <SelectItem value="3br">3 Bedroom</SelectItem>
                      <SelectItem value="compound">Own Compound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxBudget" className="text-sm font-semibold text-gray-700">Maximum Budget (KSh)</Label>
                  <Input
                    id="maxBudget"
                    type="number"
                    value={formData.preferences.maxBudget}
                    onChange={(e) => handleInputChange('preferences', 'maxBudget', e.target.value)}
                    placeholder="25000"
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredLocation" className="text-sm font-semibold text-gray-700">Preferred Location</Label>
                  <Select onValueChange={(value) => handleInputChange('preferences', 'preferredLocation', value)}>
                    <SelectTrigger className="rounded-2xl border-2 focus:border-blue-500">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nakuru-town">Nakuru Town</SelectItem>
                      <SelectItem value="lanet">Lanet</SelectItem>
                      <SelectItem value="njoro">Njoro</SelectItem>
                      <SelectItem value="rongai">Rongai</SelectItem>
                      <SelectItem value="mbaruk">Mbaruk</SelectItem>
                      <SelectItem value="kabarak">Kabarak</SelectItem>
                      <SelectItem value="bahati">Bahati</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moveInDate" className="text-sm font-semibold text-gray-700">Preferred Move-in Date</Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={formData.preferences.moveInDate}
                    onChange={(e) => handleInputChange('preferences', 'moveInDate', e.target.value)}
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-slide-in-right">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Emergency Contact</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-sm font-semibold text-gray-700">Emergency Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.emergency.contactName}
                    onChange={(e) => handleInputChange('emergency', 'contactName', e.target.value)}
                    placeholder="Jane Doe"
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-sm font-semibold text-gray-700">Emergency Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.emergency.contactPhone}
                    onChange={(e) => handleInputChange('emergency', 'contactPhone', e.target.value)}
                    placeholder="+254 712 345 678"
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="relationship" className="text-sm font-semibold text-gray-700">Relationship</Label>
                  <Input
                    id="relationship"
                    value={formData.emergency.relationship}
                    onChange={(e) => handleInputChange('emergency', 'relationship', e.target.value)}
                    placeholder="Spouse, Parent, Sibling, etc."
                    className="rounded-2xl border-2 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
                <h4 className="font-bold text-green-800 mb-3 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Ready to Get Started!
                </h4>
                <p className="text-green-700 text-sm leading-relaxed">
                  You're all set! You can now browse properties, make payments via M-PESA, and track your rental history through your tenant portal.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-8">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={step === 1}
              className="rounded-2xl px-8 py-3 border-2 disabled:opacity-50 transition-all duration-300"
            >
              Previous
            </Button>
            <div className="flex space-x-3">
              {step < 3 ? (
                <Button 
                  onClick={nextStep} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl px-8 py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingModal;
