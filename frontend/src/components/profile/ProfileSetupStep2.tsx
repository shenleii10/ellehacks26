import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, ChevronRight, X, ArrowLeft } from 'lucide-react';

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
  'Lactose',
  'Eggs',
  'Soy',
  'Wheat',
  'Fish',
  'Shellfish',
  'Sesame'
];

// Comprehensive allergen database for autocomplete (excluding common ones already shown as buttons)
const allergenDatabase = [
  'Almonds',
  'Walnuts',
  'Cashews',
  'Pecans',
  'Pistachios',
  'Hazelnuts',
  'Dairy',
  'Soybeans',
  'Gluten',
  'Salmon',
  'Tuna',
  'Cod',
  'Shrimp',
  'Crab',
  'Lobster',
  'Oysters',
  'Mustard',
  'Celery',
  'Sulfites',
  'Lupin',
  'Mollusks',
  'Corn',
  'Kiwi',
  'Banana',
  'Avocado',
  'Strawberries',
  'Tomatoes',
  'Chocolate',
  'Garlic',
  'Onion'
];

export function ProfileSetupStep2() {
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
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

  const addCustomAllergy = (allergy: string) => {
    if (!allergies.includes(allergy)) {
      setAllergies([...allergies, allergy]);
      setAllergyInput('');
      setShowSuggestions(false);
    }
  };

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  const handleAllergyInputChange = (value: string) => {
    setAllergyInput(value);
    
    if (value.trim()) {
      const filtered = allergenDatabase.filter(allergen =>
        allergen.toLowerCase().includes(value.toLowerCase()) &&
        !allergies.includes(allergen)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
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
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header */}
      <div className="p-6 pt-8">
        <button 
          onClick={() => navigate('/profile-setup-1')}
          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Health & Allergies
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Step 2 of 3 • Help us keep you safe
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-6">
        {/* Health Conditions */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Health Conditions (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {commonHealthConditions.map(condition => (
              <button
                key={condition}
                onClick={() => toggleHealth(condition)}
                className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${
                  healthConditions.includes(condition)
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-400'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Allergies
          </label>
          
          {/* Common allergen buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {commonAllergies.map(allergy => (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${
                  allergies.includes(allergy)
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-400'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300'
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
                <span key={allergy} className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900/50 text-red-900 dark:text-red-400 rounded-lg text-sm">
                  {allergy}
                  <button onClick={() => removeAllergy(allergy)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Autocomplete input for custom allergens */}
          <div className="relative">
            <input
              type="text"
              value={allergyInput}
              onChange={(e) => handleAllergyInputChange(e.target.value)}
              onFocus={() => allergyInput && setShowSuggestions(true)}
              placeholder="Add custom allergen..."
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            
            {/* Autocomplete suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-48 overflow-auto">
                {filteredSuggestions.slice(0, 8).map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => addCustomAllergy(suggestion)}
                    className="w-full px-4 py-3 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Type to search for additional allergens from our database
          </p>
        </div>
      </div>

      {/* Continue button */}
      <div className="p-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
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