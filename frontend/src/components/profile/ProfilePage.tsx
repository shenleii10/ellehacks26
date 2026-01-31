import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Calendar,
  Heart,
  AlertTriangle,
  Leaf,
  Ban,
  Settings,
  ChevronRight
} from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const email = localStorage.getItem('userEmail') || 'user@example.com';

  return (
    <div className="h-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 pb-8">
        <button 
          onClick={() => navigate('/scanner')}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">
              {profile.name || 'User'}
            </h1>
            <p className="text-emerald-100 text-sm">{email}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Basic Info */}
        <div className="bg-white px-6 py-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Basic Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Age: {profile.age || 'Not set'}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{profile.country || 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* Health Conditions */}
        {profile.healthConditions && profile.healthConditions.length > 0 && (
          <div className="bg-white px-6 py-4 mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Health Conditions
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.healthConditions.map((condition: string, index: number) => (
                <span key={index} className="px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-lg text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Allergies */}
        {profile.allergies && profile.allergies.length > 0 && (
          <div className="bg-white px-6 py-4 mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Allergies
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.allergies.map((allergy: string, index: number) => (
                <span key={index} className="px-3 py-1.5 bg-red-100 text-red-900 rounded-lg text-sm">
                  {allergy}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Diet Types */}
        {profile.dietTypes && profile.dietTypes.length > 0 && (
          <div className="bg-white px-6 py-4 mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Diet Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.dietTypes.map((diet: string, index: number) => (
                <span key={index} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg text-sm capitalize">
                  {diet.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients to Avoid */}
        {profile.ingredientsToAvoid && profile.ingredientsToAvoid.length > 0 && (
          <div className="bg-white px-6 py-4 mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Ban className="w-4 h-4" />
              Ingredients to Avoid
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.ingredientsToAvoid.map((ingredient: string, index: number) => (
                <span key={index} className="px-3 py-1.5 bg-orange-100 text-orange-900 rounded-lg text-sm">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Settings Button */}
        <div className="px-6 py-4">
          <button
            onClick={() => navigate('/settings')}
            className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-200 active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-semibold text-gray-900">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}