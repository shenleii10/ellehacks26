import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, ChevronRight, Plus, X, ArrowLeft } from 'lucide-react';

const commonHealthConditions = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Celiac Disease',
  'IBS',
  'Lactose Intolerance',
  'GERD',
  'Kidney Disease'
];

const commonAllergies = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Eggs',
  'Soy',
  'Wheat',
  'Fish',
  'Shellfish',
  'Sesame'
];

export function ProfileSetupStep2() {
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [customHealth, setCustomHealth] = useState('');
  const [customAllergy, setCustomAllergy] = useState('');
  const navigate = useNavigate();

  const toggleHealth = (condition: string) => {
    setHealthConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setAllergies(prev =>
      prev.includes(allergy)
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const addCustomHealth = () => {
    if (customHealth.trim()) {
      setHealthConditions([...healthConditions, customHealth.trim()]);
      setCustomHealth('');
    }
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim()) {
      setAllergies([...allergies, customAllergy.trim()]);
      setCustomAllergy('');
    }
  };

  const removeHealth = (condition: string) => {
    setHealthConditions(healthConditions.filter(c => c !== condition));
  };

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  const handleContinue = () => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    localStorage.setItem('userProfile', JSON.stringify({
      ...profile,
      healthConditions,
      allergies
    }));
    navigate('/profile-setup-3');
  };

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col">
      {/* Header */}
      <div className="p-6 pt-8">
        <button 
          onClick={() => navigate('/profile-setup-1')}
          className="flex items-center gap-1 text-gray-600 text-sm font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Health & Allergies
        </h1>
        <p className="text-gray-600">
          Step 2 of 3 • Help us keep you safe
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-6">
        {/* Health Conditions */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Health Conditions (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {commonHealthConditions.map(condition => (
              <button
                key={condition}
                onClick={() => toggleHealth(condition)}
                className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${
                  healthConditions.includes(condition)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>

          {/* Custom health condition tags */}
          {healthConditions.filter(h => !commonHealthConditions.includes(h)).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {healthConditions.filter(h => !commonHealthConditions.includes(h)).map(condition => (
                <span key={condition} className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-lg text-sm">
                  {condition}
                  <button onClick={() => removeHealth(condition)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add custom */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customHealth}
              onChange={(e) => setCustomHealth(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomHealth()}
              placeholder="Add custom condition"
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-sm"
            />
            <button
              onClick={addCustomHealth}
              className="px-4 bg-emerald-500 text-white rounded-xl active:scale-95 transition-transform"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Allergies
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {commonAllergies.map(allergy => (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${
                  allergies.includes(allergy)
                    ? 'border-red-500 bg-red-50 text-red-900'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {allergy}
              </button>
            ))}
          </div>

          {/* Custom allergy tags */}
          {allergies.filter(a => !commonAllergies.includes(a)).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {allergies.filter(a => !commonAllergies.includes(a)).map(allergy => (
                <span key={allergy} className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-900 rounded-lg text-sm">
                  {allergy}
                  <button onClick={() => removeAllergy(allergy)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add custom */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customAllergy}
              onChange={(e) => setCustomAllergy(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomAllergy()}
              placeholder="Add custom allergy"
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-sm"
            />
            <button
              onClick={addCustomAllergy}
              className="px-4 bg-emerald-500 text-white rounded-xl active:scale-95 transition-transform"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <button
          onClick={handleContinue}
          className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}