import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ScanBarcode, Shield, Leaf, ChevronRight, ChevronLeft } from 'lucide-react';

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
    <div className="h-full min-h-screen bg-white flex flex-col">
      {/* Skip button */}
      <div className="p-6 flex justify-between items-center">
        {currentSlide > 0 ? (
          <button 
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-600 text-sm font-medium"
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
            className="text-gray-400 text-sm font-medium"
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
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          {slide.title}
        </h1>
        
        <p className="text-gray-600 text-center text-lg leading-relaxed max-w-sm">
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
                  : 'w-2 bg-gray-300'
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
  );
}