import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Volume2,
  Type,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Check
} from 'lucide-react';

const fontSizes = [
  { value: 'small', label: 'Small', size: '14px' },
  { value: 'medium', label: 'Medium', size: '16px' },
  { value: 'large', label: 'Large', size: '18px' },
  { value: 'extra-large', label: 'Extra Large', size: '20px' }
];

export function SettingsPage() {
  const navigate = useNavigate();
  const [voiceEnabled, setVoiceEnabled] = useState(
    localStorage.getItem('voiceEnabled') === 'true'
  );
  const [fontSize, setFontSize] = useState(
    localStorage.getItem('fontSize') || 'medium'
  );
  const [notifications, setNotifications] = useState(true);

  const handleVoiceToggle = () => {
    const newValue = !voiceEnabled;
    setVoiceEnabled(newValue);
    localStorage.setItem('voiceEnabled', String(newValue));
    
    if (newValue) {
      // Simulate voice announcement
      alert('Voice dictation enabled. The app will now read out scan results.');
    }
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    const selectedSize = fontSizes.find(f => f.value === size);
    document.documentElement.style.setProperty('--font-size', selectedSize?.size || '16px');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('hasCompletedOnboarding');
    navigate('/');
  };

  return (
    <div className="h-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <button 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Accessibility */}
        <div className="bg-white px-6 py-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Accessibility
          </h3>
          
          {/* Voice Dictation */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Voice Dictation</h4>
                  <p className="text-sm text-gray-500">Read scan results aloud</p>
                </div>
              </div>
              <button
                onClick={handleVoiceToggle}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  voiceEnabled ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  voiceEnabled ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Type className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Font Size</h4>
                <p className="text-sm text-gray-500">Adjust text size</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 ml-13">
              {fontSizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => handleFontSizeChange(size.value)}
                  className={`relative p-3 rounded-xl border-2 transition-all text-left ${
                    fontSize === size.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {fontSize === size.value && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
                  )}
                  <div className="text-sm font-medium text-gray-900">
                    {size.label}
                  </div>
                  <div className="text-xs text-gray-500">{size.size}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white px-6 py-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Notifications
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Push Notifications</h4>
                <p className="text-sm text-gray-500">Product alerts & updates</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                notifications ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                notifications ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white px-6 py-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Account
          </h3>
          
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-900">Privacy & Security</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-medium text-red-600">Log Out</span>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div className="px-6 py-8 text-center">
          <p className="text-sm text-gray-500">Food Scanner App</p>
          <p className="text-xs text-gray-400 mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}