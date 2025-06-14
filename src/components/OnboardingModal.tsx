
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Home, CreditCard, Check } from 'lucide-react';

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
      phone: '',
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

  const handleInputChange = (section: string, field: string, value: string) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Welcome to Nakuru HomesConnect</span>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </CardTitle>
          <div className="flex items-center space-x-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex items-center ${i <= step ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i <= step ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i}
                </div>
                {i < 3 && <div className={`w-12 h-0.5 mx-2 ${i < step ? 'bg-green-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    placeholder="+254 712 345 678"
                  />
                </div>
                <div>
                  <Label htmlFor="idNumber">National ID Number</Label>
                  <Input
                    id="idNumber"
                    value={formData.personalInfo.idNumber}
                    onChange={(e) => handleInputChange('personalInfo', 'idNumber', e.target.value)}
                    placeholder="12345678"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.personalInfo.occupation}
                    onChange={(e) => handleInputChange('personalInfo', 'occupation', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Home className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Property Preferences</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyType">Preferred Property Type</Label>
                  <Select onValueChange={(value) => handleInputChange('preferences', 'propertyType', value)}>
                    <SelectTrigger>
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
                <div>
                  <Label htmlFor="maxBudget">Maximum Budget (KSh)</Label>
                  <Input
                    id="maxBudget"
                    type="number"
                    value={formData.preferences.maxBudget}
                    onChange={(e) => handleInputChange('preferences', 'maxBudget', e.target.value)}
                    placeholder="25000"
                  />
                </div>
                <div>
                  <Label htmlFor="preferredLocation">Preferred Location</Label>
                  <Select onValueChange={(value) => handleInputChange('preferences', 'preferredLocation', value)}>
                    <SelectTrigger>
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
                <div>
                  <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={formData.preferences.moveInDate}
                    onChange={(e) => handleInputChange('preferences', 'moveInDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Emergency Contact</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Emergency Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.emergency.contactName}
                    onChange={(e) => handleInputChange('emergency', 'contactName', e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Emergency Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.emergency.contactPhone}
                    onChange={(e) => handleInputChange('emergency', 'contactPhone', e.target.value)}
                    placeholder="+254 712 345 678"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input
                    id="relationship"
                    value={formData.emergency.relationship}
                    onChange={(e) => handleInputChange('emergency', 'relationship', e.target.value)}
                    placeholder="Spouse, Parent, Sibling, etc."
                  />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-green-800 mb-2">Ready to Get Started!</h4>
                <p className="text-green-700 text-sm">
                  You're all set! You can now browse properties, make payments via M-PESA, and track your rental history.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={step === 1}
            >
              Previous
            </Button>
            <div className="flex space-x-2">
              {step < 3 ? (
                <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
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
