import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Mail, ChevronRight, ArrowLeft } from 'lucide-react';

export function EmailVerification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    // Mock verification
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/profile-setup-1');
  };

  const handleResend = () => {
    setResendTimer(60);
    // Mock resend logic
  };

  const isComplete = code.every(digit => digit !== '');
  const email = localStorage.getItem('userEmail') || 'your email';

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      {/* Back button */}
      <div className="p-6">
        <button 
          onClick={() => navigate('/auth')}
          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Icon */}
        <div className="text-center mb-8">
          <div className="bg-emerald-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Check Your Email
          </h1>
          <p className="text-gray-600 dark:text-gray-400 px-4">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            {email}
          </p>
        </div>

        {/* Code Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
            Enter Verification Code
          </label>
          <div className="flex gap-2 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 dark:text-white"
              />
            ))}
          </div>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!isComplete}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
            isComplete
              ? 'bg-emerald-500 text-white shadow-emerald-500/30 active:scale-95'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
        >
          Verify Email
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Resend */}
        <div className="mt-6 text-center">
          {resendTimer > 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Resend code in {resendTimer}s
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-emerald-600 dark:text-emerald-400 font-medium text-sm"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}