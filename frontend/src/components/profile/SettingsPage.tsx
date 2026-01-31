import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Volume2,
  Type,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Check,
  Moon,
  Lock
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { isVoiceDictionEnabled, setVoiceDictionEnabled } from '../../services/textToSpeech';

const fontSizes = [
  { value: 'small', label: 'Small', size: '14px' },
  { value: 'medium', label: 'Medium', size: '16px' },
  { value: 'large', label: 'Large', size: '18px' },
  { value: 'extra-large', label: 'Extra Large', size: '20px' }
];

export function SettingsPage() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Voice setting - using the TTS service
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const [fontSize, setFontSize] = useState(
    localStorage.getItem('fontSize') || 'medium'
  );
  const [notifications, setNotifications] = useState(true);

  // Load voice setting on mount
  useEffect(() => {
    setVoiceEnabled(isVoiceDictionEnabled());
  }, []);

  // Handle voice toggle
  const handleVoiceToggle = () => {
    const newValue = !voiceEnabled;
    setVoiceEnabled(newValue);
    setVoiceDictionEnabled(newValue);
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

  const handleResetPassword = () => {
    // In a real app, this would send a password reset email
    alert('Password reset link has been sent to your email!');
  };

  return (
    <div className="h-full min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-950 px-6 py-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            Appearance
          </h3>

          {/* Dark Mode */}
          <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                  <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reduce eye strain</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`w-14 h-8 rounded-full transition-colors relative ${isDarkMode ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${isDarkMode ? 'left-7' : 'left-1'
                  }`} />
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Type className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Font Size</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Adjust text size</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 ml-13">
              {fontSizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => handleFontSizeChange(size.value)}
                  className={`relative p-3 rounded-xl border-2 transition-all text-left ${fontSize === size.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                >
                  {fontSize === size.value && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )}
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {size.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{size.size}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="bg-white dark:bg-gray-950 px-6 py-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            Accessibility
          </h3>

          {/* Voice Dictation */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Voice Dictation</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically read product info after scanning</p>
                </div>
              </div>
              <button
                onClick={handleVoiceToggle}
                className={`w-14 h-8 rounded-full transition-colors relative ${voiceEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${voiceEnabled ? 'left-7' : 'left-1'
                  }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-950 px-6 py-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            Notifications
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Push Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Product alerts & updates</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full transition-colors relative ${notifications ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${notifications ? 'left-7' : 'left-1'
                }`} />
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white dark:bg-gray-950 px-6 py-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            Privacy & Security
          </h3>

          <button
            onClick={handleResetPassword}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900 dark:text-white">Reset Password</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Send reset link to email</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900 dark:text-white">Privacy Policy</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">View our privacy terms</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="font-medium text-red-600 dark:text-red-400">Log Out</span>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div className="px-6 py-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">SafeBite App</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}