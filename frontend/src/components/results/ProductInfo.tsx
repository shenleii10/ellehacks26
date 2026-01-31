import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ChevronDown,
  ChevronUp,
  Leaf,
  Shield,
  MapPin
} from 'lucide-react';

// Mock product data
const productData = {
  name: "Organic Granola Bar",
  brand: "Nature's Best",
  barcode: "012345678901",
  image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
  ingredients: [
    "Organic Rolled Oats",
    "Organic Honey",
    "Organic Almonds",
    "Organic Dark Chocolate (Contains Soy Lecithin)",
    "Organic Coconut Oil",
    "Sea Salt",
    "Natural Vanilla Extract"
  ],
  warnings: [
    {
      level: "info",
      title: "Contains Tree Nuts",
      description: "This product contains almonds"
    },
    {
      level: "warning",
      title: "Contains Soy",
      description: "Soy lecithin found in chocolate"
    }
  ],
  nutritionScore: "A",
  compatibility: {
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    nutFree: false,
    halal: true,
    kosher: true,
    keto: false
  }
};

export function ProductInfo() {
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const navigate = useNavigate();

  // Get user profile
  const profileStr = localStorage.getItem('userProfile');
  const profile = profileStr ? JSON.parse(profileStr) : { dietaryRestrictions: [] };

  // Check compatibility
  const checkCompatibility = () => {
    const issues: string[] = [];
    profile.dietaryRestrictions.forEach((restriction: string) => {
      const restrictionKey = restriction as keyof typeof productData.compatibility;
      if (productData.compatibility[restrictionKey] === false) {
        issues.push(restriction);
      }
    });
    return issues;
  };

  const issues = checkCompatibility();
  const isCompatible = issues.length === 0;

  return (
    <div className="h-full min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <button 
          onClick={() => navigate('/scanner')}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-gray-900">Product Details</h1>
          <p className="text-sm text-gray-500">Scan completed</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          productData.nutritionScore === 'A' 
            ? 'bg-emerald-500 text-white'
            : 'bg-yellow-500 text-white'
        }`}>
          Score: {productData.nutritionScore}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Product image and basic info */}
        <div className="bg-white p-6">
          <div className="flex gap-4">
            <img 
              src={productData.image}
              alt={productData.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {productData.name}
              </h2>
              <p className="text-gray-600 mb-2">{productData.brand}</p>
              <p className="text-xs text-gray-400 font-mono">
                {productData.barcode}
              </p>
            </div>
          </div>
        </div>

        {/* Compatibility status */}
        <div className="px-6 py-4">
          <div className={`p-4 rounded-2xl flex items-start gap-3 ${
            isCompatible 
              ? 'bg-emerald-50 border-2 border-emerald-200'
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            {isCompatible ? (
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h3 className={`font-semibold mb-1 ${
                isCompatible ? 'text-emerald-900' : 'text-red-900'
              }`}>
                {isCompatible ? 'Safe for Your Diet!' : 'Dietary Warning'}
              </h3>
              <p className={`text-sm ${
                isCompatible ? 'text-emerald-700' : 'text-red-700'
              }`}>
                {isCompatible 
                  ? 'This product matches all your dietary preferences'
                  : `Not suitable for: ${issues.join(', ')}`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Warnings */}
        {productData.warnings.length > 0 && (
          <div className="px-6 pb-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safety Alerts
            </h3>
            <div className="space-y-2">
              {productData.warnings.map((warning, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl flex gap-3 ${
                    warning.level === 'warning'
                      ? 'bg-yellow-50 border border-yellow-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                    warning.level === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {warning.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {warning.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div className="px-6 pb-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Ingredients
          </h3>
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {(showAllIngredients ? productData.ingredients : productData.ingredients.slice(0, 4)).map((ingredient, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700"
                >
                  {ingredient}
                </span>
              ))}
            </div>
            {productData.ingredients.length > 4 && (
              <button
                onClick={() => setShowAllIngredients(!showAllIngredients)}
                className="mt-3 text-sm text-emerald-600 font-medium flex items-center gap-1"
              >
                {showAllIngredients ? (
                  <>Show Less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Show All {productData.ingredients.length} Ingredients <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Dietary Compatibility Grid */}
        <div className="px-6 pb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Dietary Compatibility
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(productData.compatibility).map(([key, value]) => (
              <div 
                key={key}
                className={`p-3 rounded-xl border-2 ${
                  value
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {value ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={`text-sm font-medium capitalize ${
                    value ? 'text-emerald-900' : 'text-gray-500'
                  }`}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="bg-white border-t border-gray-200 p-4">
        <button
          onClick={() => navigate('/scanner')}
          className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
        >
          Scan Another Product
        </button>
      </div>
    </div>
  );
}