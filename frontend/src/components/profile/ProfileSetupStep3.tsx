import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, ChevronRight, Plus, X, Check, ArrowLeft, LucideIcon } from 'lucide-react';

import {
  Sprout,
  Fish,
  Flame,
  Drumstick,
  Shield,
  Star,
  WheatOff
} from "lucide-react";

type DietType = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const dietTypes: DietType[] = [
  { id: "vegetarian", label: "Vegetarian", icon: Leaf },
  { id: "vegan", label: "Vegan", icon: Sprout },
  { id: "pescatarian", label: "Pescatarian", icon: Fish },
  { id: "keto", label: "Keto", icon: Flame },
  { id: "paleo", label: "Paleo", icon: Drumstick },
  { id: "halal", label: "Halal", icon: Shield },
  { id: "kosher", label: "Kosher", icon: Star },
  { id: "gluten-free", label: "Gluten-Free", icon: WheatOff },
];

const commonIngredientsToAvoid = [
  'Artificial Colors',
  'High Fructose Corn Syrup',
  'MSG',
  'Trans Fats',
  'Preservatives',
  'Artificial Sweeteners',
  'Palm Oil',
  'Sodium Nitrate'
];

export function ProfileSetupStep3() {
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [ingredientsToAvoid, setIngredientsToAvoid] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState('');
  const navigate = useNavigate();

  const toggleDiet = (dietId: string) => {
    setSelectedDiets(prev =>
      prev.includes(dietId)
        ? prev.filter(id => id !== dietId)
        : [...prev, dietId]
    );
  };

  const toggleIngredient = (ingredient: string) => {
    setIngredientsToAvoid(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleComplete = () => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    localStorage.setItem('userProfile', JSON.stringify({
      ...profile,
      dietTypes: selectedDiets,
      ingredientsToAvoid
    }));
    
    // Mark onboarding as complete
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    navigate('/scanner');
  };

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col">
      {/* Header */}
      <div className="p-6 pt-8">
        <button 
          onClick={() => navigate('/profile-setup-2')}
          className="flex items-center gap-1 text-gray-600 text-sm font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dietary Preferences
        </h1>
        <p className="text-gray-600">
          Step 3 of 3 • Almost done!
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-6">
        {/* Diet Types */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Diet Type (Optional)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {dietTypes.map(diet => (
              <button
                key={diet.id}
                onClick={() => toggleDiet(diet.id)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  selectedDiets.includes(diet.id)
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {selectedDiets.includes(diet.id) && (
                  <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="text-2xl mb-1">
                  <diet.icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {diet.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients to Avoid */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Ingredients to Avoid (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {commonIngredientsToAvoid.map(ingredient => (
              <button
                key={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${
                  ingredientsToAvoid.includes(ingredient)
                    ? 'border-orange-500 bg-orange-50 text-orange-900'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Complete button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <button
          onClick={handleComplete}
          className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Complete Setup
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}