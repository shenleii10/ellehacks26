import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, ChevronRight, ArrowLeft } from 'lucide-react';
import logo from './logo.png';


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
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col lg:flex-row">
      {/* Desktop Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 to-emerald-600 p-12 flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 text-center max-w-md">
          <div className="bg-white w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <img src={logo} alt="SafeBite Logo" className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            SafeBite
          </h1>
          <p className="text-emerald-50 text-xl mb-8">
            Your personal food safety assistant
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Scan any product instantly</p>
                <p className="text-emerald-100 text-sm">Quick barcode recognition</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Check safety & allergies</p>
                <p className="text-emerald-100 text-sm">Government-verified data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Match your diet preferences</p>
                <p className="text-emerald-100 text-sm">Personalized recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form (Mobile full, Desktop half) */}
      <div className="flex-1 flex flex-col">
        {/* Back button - Mobile */}
        <div className="p-6 lg:hidden">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 xl:px-20 py-8 max-w-xl lg:mx-auto w-full">
          {/* Logo/Icon - Mobile */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="lg:hidden bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-gray-100">
              <img src={logo} alt="SafeBite Logo" className="w-12 h-12" />
            </div>
            
            {/* Back button - Desktop */}
            <button 
              onClick={() => navigate('/')}
              className="hidden lg:flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm font-medium mb-8 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 lg:text-lg">
              {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
                isValid
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600 active:scale-95'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
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
              className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}