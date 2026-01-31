import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, ChevronRight, ArrowLeft } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/scanner');
    } else {
      // Mock sign up - save email and go to verification
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      navigate('/verify-email');
    }
  };

  const isValid = isLogin 
    ? email && password 
    : email && password && name;

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col">
      {/* Back button */}
      <div className="p-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-gray-600 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="bg-emerald-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
              isValid
                ? 'bg-emerald-500 text-white shadow-emerald-500/30 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 font-medium"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}