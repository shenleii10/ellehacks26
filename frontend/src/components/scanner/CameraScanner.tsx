import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ScanLine, Image as ImageIcon, User, Info } from 'lucide-react';

export function CameraScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate barcode scanning
    setTimeout(() => {
      setIsScanning(false);
      // Navigate to product info with a mock product ID
      navigate('/product/mock-product-1');
    }, 2000);
  };

  return (
    <div className="h-full min-h-screen bg-black flex flex-col relative">
      {/* Camera view simulation */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate('/help')}
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center"
          >
            <Info className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Scanner frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Scanning area */}
            <div className="w-72 h-48 border-2 border-white rounded-3xl relative">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-emerald-500 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-emerald-500 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-emerald-500 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-emerald-500 rounded-br-3xl" />
              
              {/* Scanning line animation */}
              {isScanning && (
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scan" />
                </div>
              )}
            </div>

            {/* Instruction text */}
            <div className="mt-8 text-center">
              <p className="text-white font-semibold text-lg mb-2">
                {isScanning ? 'Scanning...' : 'Align barcode within frame'}
              </p>
              <p className="text-gray-400 text-sm">
                Hold steady for best results
              </p>
            </div>
          </div>
        </div>

        {/* Scanning status */}
        {isScanning && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/50 animate-pulse">
              <ScanLine className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="bg-gradient-to-t from-black to-transparent p-8 space-y-4">
        {/* Scan button - Made bigger */}
        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center transition-all shadow-2xl ${
            isScanning
              ? 'bg-emerald-400 scale-95'
              : 'bg-emerald-500 active:scale-95 shadow-emerald-500/50'
          }`}
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <ScanLine className={`w-12 h-12 text-emerald-500 ${isScanning ? 'animate-pulse' : ''}`} />
          </div>
        </button>

        {/* Upload option */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white">
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Upload Image</span>
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm">
          Tap to scan or upload a photo of the barcode
        </p>
      </div>

      <style>{`
        @keyframes scan {
          0% {
            top: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}