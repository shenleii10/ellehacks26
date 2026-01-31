import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, ChevronRight, ArrowLeft } from 'lucide-react';

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'India',
  'China',
  'Japan',
  'Brazil',
  'Mexico',
  'Other'
];

export function ProfileSetupStep1() {
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    // Save data
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    localStorage.setItem('userProfile', JSON.stringify({
      ...profile,
      name,
      age,
      country
    }));
    navigate('/profile-setup-2');
  };

  const isValid = name.trim() && age && country;

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header */}
      <div className="p-6 pt-8">
        <button 
          onClick={() => navigate('/verify-email')}
          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Basic Information
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Step 1 of 3 • Let's get to know you
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        {/* Age */}
        <div>
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
            className="w-full px-4 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
            className="w-full px-4 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors appearance-none text-gray-900 dark:text-white"
          >
            <option value="">Select your country</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Continue button */}
      <div className="p-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
            isValid
              ? 'bg-emerald-500 text-white shadow-emerald-500/30 active:scale-95'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}