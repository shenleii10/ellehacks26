import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save, X, Salad, Apple, Fish, Egg, Drumstick, Star, WheatOff } from 'lucide-react';

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

export function EditProfile() {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  
  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState(profile.age || '');
  const [country, setCountry] = useState(profile.country || '');
  const [healthConditions, setHealthConditions] = useState<string[]>(profile.healthConditions || []);
  const [allergies, setAllergies] = useState<string[]>(profile.allergies || []);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(profile.dietTypes || []);
  const [ingredientsToAvoid, setIngredientsToAvoid] = useState<string[]>(profile.ingredientsToAvoid || []);
  
  const [allergyInput, setAllergyInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

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

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify({
      ...profile,
      name,
      age,
      country,
      healthConditions,
      allergies,
      dietTypes: selectedDiets,
      ingredientsToAvoid
    }));
    navigate('/profile');
  };

  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Congo-Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ];

  return (
    <div className="h-full min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl font-medium active:scale-95 transition-transform"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Personal Information */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Information</h2>
          
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              min="1"
              max="120"
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors appearance-none text-gray-900 dark:text-white"
            >
              <option value="">Select your country</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Health & Dietary Information */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Health & Dietary Preferences</h2>
        </div>

        {/* Health Conditions */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Health Conditions
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

        {/* Allergies with Autocomplete */}
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
                <span key={allergy} className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900/50 text-red-900 dark:text-red-400 rounded-lg text-sm font-medium">
                  {allergy}
                  <button onClick={() => removeAllergy(allergy)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Autocomplete input */}
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

        {/* Diet Types */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Diet Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {dietTypes.map(diet => {
              const Icon = diet.icon;
              return (
                <button
                  key={diet.id}
                  onClick={() => toggleDiet(diet.id)}
                  className={`p-3 rounded-xl border-2 transition-all text-left text-sm flex items-center gap-2 ${
                    selectedDiets.includes(diet.id)
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-900 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {diet.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ingredients to Avoid */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Ingredients to Avoid
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
    </div>
  );
}