import { useNavigate } from 'react-router';
import { ArrowLeft, ScanBarcode, Shield, Leaf, HelpCircle } from 'lucide-react';

export function AppHelp() {
  const navigate = useNavigate();

  return (
    <div className="h-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <button 
          onClick={() => navigate('/scanner')}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">How It Works</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-500 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ScanBarcode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">1. Scan Barcode</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Point your camera at any food product barcode. The app will automatically detect and scan it.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">2. Check Safety</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We cross-reference ingredients with government hotlists, safety databases, and your country's regulations.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-purple-500 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">3. Match Diet</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The app checks if the product matches your dietary restrictions, allergies, and health conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">4. View Results</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                See detailed ingredient lists, nutrition scores, warnings, and compatibility with your profile.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border-2 border-emerald-200">
          <h3 className="font-bold text-gray-900 mb-2">Data Sources</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Public food databases (Open Food Facts, USDA)</li>
            <li>• Government safety hotlists</li>
            <li>• International dietary standards</li>
            <li>• Country-specific regulations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}