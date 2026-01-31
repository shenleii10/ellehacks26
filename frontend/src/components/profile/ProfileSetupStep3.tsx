import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, ChevronRight, Check, ArrowLeft, Salad, Apple, Fish, Egg, Drumstick, Star, Coffee, WheatOff } from 'lucide-react';

const dietTypes = [
  { id: 'vegetarian', label: 'Vegetarian', icon: Salad },
  { id: 'vegan', label: 'Vegan', icon: Apple },
  { id: 'pescatarian', label: 'Pescatarian', icon: Fish },
  { id: 'keto', label: 'Keto', icon: Egg },
  { id: 'paleo', label: 'Paleo', icon: Drumstick },
  { id: 'halal', label: 'Halal', icon: Star },
  { id: 'kosher', label: 'Kosher', icon: Star },
  { id: 'gluten-free', label: 'Gluten-Free', icon: WheatOff },
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
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header */}
      <div className="p-6 pt-8">
        <button 
          onClick={() => navigate('/profile-setup-2')}
          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dietary Preferences
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Step 3 of 3 • Almost done!
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-6">
        {/* Diet Types */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Diet Type (Optional)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {dietTypes.map(diet => {
              const Icon = diet.icon;
              return (
                <button
                  key={diet.id}
                  onClick={() => toggleDiet(diet.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    selectedDiets.includes(diet.id)
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                  }`}
                >
                  {selectedDiets.includes(diet.id) && (
                    <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <Icon className={`w-6 h-6 mb-2 ${
                    selectedDiets.includes(diet.id)
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {diet.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ingredients to Avoid */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Ingredients to Avoid (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {commonIngredientsToAvoid.map(ingredient => (
              <button
                key={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${
                  ingredientsToAvoid.includes(ingredient)
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-900 dark:text-orange-400'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complete button */}
      <div className="p-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
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