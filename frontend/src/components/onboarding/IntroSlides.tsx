import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ScanBarcode, Shield, Leaf, ChevronRight, ChevronLeft } from 'lucide-react';
import logo from 'figma:asset/810334357aa1160bfe21db150b2d4701b8ad47db.png';

const slides = [
  {
    icon: ScanBarcode,
    title: "Scan Any Food Product",
    description: "Simply point your camera at any barcode to instantly get detailed information about your food.",
    color: "bg-emerald-500"
  },
  {
    icon: Shield,
    title: "Stay Safe & Informed",
    description: "Check ingredients against government hotlists and safety databases in real-time.",
    color: "bg-blue-500"
  },
  {
    icon: Leaf,
    title: "Match Your Diet",
    description: "Set your dietary preferences and restrictions to see if products are right for you.",
    color: "bg-purple-500"
  }
];

export function IntroSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (hasCompletedOnboarding === 'true' && isLoggedIn === 'true') {
      navigate('/scanner');
    }
  }, [navigate]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="h-full min-h-screen bg-white dark:bg-gray-950 flex flex-col lg:flex-row">
      {/* Mobile/Tablet View */}
      <div className="lg:hidden h-full min-h-screen flex flex-col">
        {/* Skip button */}
        <div className="p-6 flex justify-between items-center">
          {currentSlide > 0 ? (
            <button 
              onClick={handleBack}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}
          {currentSlide < slides.length - 1 && (
            <button 
              onClick={handleSkip}
              className="text-gray-400 dark:text-gray-500 text-sm font-medium"
            >
              Skip
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
          <div className={`${slide.color} w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-lg`}>
            <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {slide.title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 text-center text-lg leading-relaxed max-w-sm">
            {slide.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="p-8 space-y-4">
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-emerald-500' 
                    : 'w-2 bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
          >
            {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop View - Side by Side Layout */}
      <div className="hidden lg:flex w-full">
        {/* Left Side - All Slides */}
        <div className="w-1/2 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-12 flex flex-col justify-center">
          <div className="max-w-xl mx-auto space-y-12">
            {slides.map((s, index) => {
              const SlideIcon = s.icon;
              return (
                <div 
                  key={index}
                  className={`transition-all duration-300 ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`${s.color} w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <SlideIcon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {s.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Navigation */}
        <div className="w-1/2 bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-12">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                SafeBite
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Your personal food safety assistant
              </p>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'w-12 bg-emerald-500' 
                      : 'w-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <button
                onClick={() => navigate('/auth')}
                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  disabled={currentSlide === 0}
                  className="flex-1 py-3 rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 inline" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentSlide === slides.length - 1}
                  className="flex-1 py-3 rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}