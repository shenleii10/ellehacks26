import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Leaf,
  Shield,
  MapPin,
  Sparkles
} from 'lucide-react';

type Warning = {
  level: "info" | "warning";
  title: string;
  description: string;
};

type Product = {
  name: string;
  brand: string;
  barcode: string;
  image: string;
  ingredients: string[];
  warnings: Warning[];
  nutritionScore: string;
  compatibility: Record<string, boolean>;
  rawIngredientsText?: string;
};

export function ProductInfo() {
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // AI ingredient explanations
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [showAiExplanations, setShowAiExplanations] = useState(false);

  const { barcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Barcode from URL:", barcode);
    if (!barcode) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`http://localhost:3001/api/product/${barcode}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Product not found');
        }
        const data = await res.json();
        setProductData(data);
      } catch (err: any) {
        setError(err.message || "Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  // Fetch AI explanations on demand
  const fetchAiExplanations = async () => {
    if (!productData || productData.ingredients.length === 0) return;
    if (Object.keys(aiExplanations).length > 0) {
      setShowAiExplanations(true);
      return;
    }

    setAiLoading(true);
    setAiError("");

    try {
      const res = await fetch('http://localhost:3001/api/product/explain-ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: productData.ingredients })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to get explanations');
      }

      const data = await res.json();
      setAiExplanations(data.explanations || {});
      setShowAiExplanations(true);
    } catch (err: any) {
      setAiError(err.message || 'AI explanation unavailable');
    } finally {
      setAiLoading(false);
    }
  };

  type UserProfile = {
    allergies?: string[];
    dietTypes?: (keyof Product['compatibility'])[];
    ingredientsToAvoid?: string[];
  };

  const profileStr = localStorage.getItem('userProfile');
  const profile: UserProfile = profileStr ? JSON.parse(profileStr) : {};

  const checkCompatibility = () => {
    if (!productData) return [];
    const issues: string[] = [];

    if (profile.allergies && Array.isArray(profile.allergies)) {
      profile.allergies.forEach((allergy: string) => {
        if (productData.ingredients.some((ing: string) =>
          ing.toLowerCase().includes(allergy.toLowerCase())
        )) {
          issues.push(`Contains ${allergy}`);
        }
      });
    }

    if (profile.dietTypes && Array.isArray(profile.dietTypes)) {
      profile.dietTypes.forEach((dietType: string) => {
        const restrictionKey = dietType as keyof typeof productData.compatibility;
        if (productData.compatibility[restrictionKey] === false) {
          issues.push(`Not ${dietType}`);
        }
      });
    }

    if (profile.ingredientsToAvoid && Array.isArray(profile.ingredientsToAvoid)) {
      profile.ingredientsToAvoid.forEach((ingredient: string) => {
        if (productData.ingredients.some((ing: string) =>
          ing.toLowerCase().includes(ingredient.toLowerCase())
        )) {
          issues.push(`Contains ${ingredient}`);
        }
      });
    }

    return issues;
  };

  const issues = checkCompatibility();
  const isCompatible = issues.length === 0;

  if (loading) return <p className="p-6 text-gray-700 dark:text-gray-300">Loading product...</p>;
  if (error) return <p className="p-6 text-red-600 dark:text-red-400">{error}</p>;
  if (!productData) return null;

  return (
    <div className="h-full min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col lg:flex-row overflow-hidden">
      {/* Desktop Left Column - Product Overview */}
      <div className="lg:w-2/5 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 p-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/scanner')}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900 dark:text-white">Product Details</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Scan completed</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${productData.nutritionScore === 'A'
              ? 'bg-emerald-500 text-white'
              : 'bg-yellow-500 text-white'
            }`}>
            Score: {productData.nutritionScore}
          </div>
        </div>

        {/* Product Image & Info */}
        <div className="p-6 lg:h-[calc(100vh-81px)] lg:overflow-auto">
          <div className="flex flex-col lg:items-center gap-4 mb-6">
            <img
              src={productData.image}
              alt={productData.name}
              className="w-full lg:w-64 h-48 lg:h-64 rounded-2xl object-cover"
            />
            <div className="w-full lg:text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {productData.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">{productData.brand}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                {productData.barcode}
              </p>
            </div>
          </div>

          {/* Compatibility Status */}
          <div className={`p-4 lg:p-5 rounded-2xl flex items-start gap-3 ${isCompatible
              ? 'bg-emerald-50 border-2 border-emerald-200'
              : 'bg-red-50 border-2 border-red-200'
            }`}>
            {isCompatible ? (
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h3 className={`font-semibold lg:text-lg mb-1 ${isCompatible ? 'text-emerald-900' : 'text-red-900'
                }`}>
                {isCompatible ? 'Safe for Your Diet!' : 'Dietary Warning'}
              </h3>
              <p className={`text-sm lg:text-base ${isCompatible ? 'text-emerald-700' : 'text-red-700'
                }`}>
                {isCompatible
                  ? 'This product matches all your dietary preferences'
                  : `Not suitable for: ${issues.join(', ')}`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Details */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Warnings */}
          {productData.warnings.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5" />
                Safety Alerts
              </h3>
              <div className="space-y-3">
                {productData.warnings.map((warning: Warning, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl flex gap-3 ${warning.level === 'warning'
                        ? 'bg-yellow-50 border border-yellow-200'
                        : 'bg-blue-50 border border-blue-200'
                      }`}
                  >
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${warning.level === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {warning.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {warning.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-lg">
              <Leaf className="w-5 h-5" />
              Ingredients
            </h3>
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 lg:p-5 border border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {(showAllIngredients ? productData.ingredients : productData.ingredients.slice(0, 4)).map((ingredient: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
              {productData.ingredients.length > 4 && (
                <button
                  onClick={() => setShowAllIngredients(!showAllIngredients)}
                  className="mt-3 text-sm text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700"
                >
                  {showAllIngredients ? (
                    <>Show Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Show All {productData.ingredients.length} Ingredients <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              )}

              {/* AI Explain Button */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                {!showAiExplanations && (
                  <button
                    onClick={fetchAiExplanations}
                    disabled={aiLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    <Sparkles className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
                    {aiLoading ? 'Analyzing...' : 'AI Explain Ingredients'}
                  </button>
                )}

                {aiError && (
                  <p className="text-sm text-red-500 mt-2">{aiError}</p>
                )}

                {/* AI Explanations Panel */}
                {showAiExplanations && Object.keys(aiExplanations).length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI-Powered Ingredient Guide
                      </p>
                      <button
                        onClick={() => setShowAiExplanations(false)}
                        className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        Hide
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {productData.ingredients.map((ingredient: string, index: number) => {
                        const explanation = Object.entries(aiExplanations).find(
                          ([key]) => key.toLowerCase() === ingredient.toLowerCase()
                        )?.[1];
                        if (!explanation) return null;
                        return (
                          <div key={index} className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-lg p-3">
                            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-0.5">{ingredient}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{explanation}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dietary Compatibility Grid */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5" />
              Dietary Compatibility
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {Object.entries(productData.compatibility).map(([key, value]) => (
                <div
                  key={key}
                  className={`p-3 lg:p-4 rounded-xl border-2 ${value
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
                    <span className={`text-sm font-medium capitalize ${value ? 'text-emerald-900' : 'text-gray-500'
                      }`}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom action - Mobile only */}
          <div className="lg:hidden">
            <button
              onClick={() => navigate('/scanner')}
              className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
            >
              Scan Another Product
            </button>
          </div>
        </div>
      </div>

      {/* Fixed bottom button for desktop */}
      <div className="hidden lg:block fixed bottom-6 right-6">
        <button
          onClick={() => navigate('/scanner')}
          className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
        >
          Scan Another Product
        </button>
      </div>
    </div>
  );
}