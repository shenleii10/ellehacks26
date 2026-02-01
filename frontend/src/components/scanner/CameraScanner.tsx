import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ScanLine, Image as ImageIcon, User, Info, Menu, X } from 'lucide-react';
import { Html5Qrcode } from "html5-qrcode";
import logo from '../../assets/logo.png';

export function CameraScanner() {
  const scanLockRef = useRef(false);
  const isStartingRef = useRef(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // ✅ One place to edit scan box size
  const QR_W = 280;
  const QR_H = 180;

  // ✅ How far down to shift the live camera feed (and the library's qrbox)
  const CAMERA_SHIFT_DOWN_PX = 120;
  // ✅ How far down to shift the pre-scan overlay (border + scan animation)
  const OVERLAY_SHIFT_DOWN_PX = 0;

  useEffect(() => {
    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode("barcode-camera");
    }
    return () => {
      try {
        if (html5QrCodeRef.current?.isScanning) {
          html5QrCodeRef.current.stop().catch(() => { });
        }
      } catch { }
    };
  }, []);

  const handleScan = async () => {
    if (!html5QrCodeRef.current) return;

    // Stop scanning
    if (isScanning && !isStartingRef.current) {
      try {
        await html5QrCodeRef.current.stop().catch(() => { });
      } catch { }
      setIsScanning(false);
      return;
    }

    if (isStartingRef.current) return;

    try {
      scanLockRef.current = false;
      setCameraDenied(false);
      setIsScanning(true);
      isStartingRef.current = true;

      await html5QrCodeRef.current?.start(
        { facingMode: "environment" },
        {
          fps: 10,
          // ✅ This controls the "normal opacity" window size (always centered by library)
          qrbox: { width: QR_W, height: QR_H }
        },
        async (decodedText) => {
          if (!html5QrCodeRef.current) return;
          scanLockRef.current = true;
          setIsScanning(false);
          try {
            await html5QrCodeRef.current?.stop().catch(() => { });
          } catch { }
          navigate(`/product/${decodedText}`);
        },
        (_errorMessage) => {
          // optional — usually fires every frame if no barcode detected
        }
      );

      isStartingRef.current = false;
    } catch (err: any) {
      console.error("Camera error", err);
      setIsScanning(false);
      isStartingRef.current = false;

      const message = (err?.message || err?.toString?.() || "").toLowerCase();
      const name = err?.name || "";

      if (
        name === "NotAllowedError" ||
        name === "SecurityError" ||
        message.includes("permission") ||
        message.includes("denied") ||
        message.includes("not allowed")
      ) {
        setCameraDenied(true);
        alert("Camera permission is required to scan barcodes.");
      } else {
        alert("Unable to start camera. Please try again.");
      }
    }
  };

  return (
    <div className="h-full min-h-screen bg-black dark:bg-gray-950 flex flex-col lg:flex-row relative">
      {/* Desktop Left Panel - Profile Quick Access with Slide Toggle */}
      <div
        className={`hidden lg:flex lg:flex-col bg-gradient-to-br from-gray-900 to-gray-950 border-r border-gray-800 shrink-0 z-20 transition-all duration-300 overflow-hidden ${
          isSidebarOpen ? 'lg:w-80' : 'lg:w-0 lg:border-r-0'
        }`}
      >
        <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="p-6 border-b border-gray-800 flex items-center gap-3">
            <img src={logo} alt="SafeBite Logo" className="w-10 h-10" />
            <div>
              <h2 className="text-white font-bold text-xl">SafeBite</h2>
              <p className="text-gray-400 text-sm">Scan products safely</p>
            </div>
          </div>

          <div className="flex-1 p-6 space-y-4">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-medium">Profile</p>
                <p className="text-gray-400 text-xs">View your settings</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/help')}
              className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-medium">Help</p>
                <p className="text-gray-400 text-xs">How it works</p>
              </div>
            </button>
          </div>

          <div className="p-6 border-t border-gray-800">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-emerald-400 text-sm font-medium mb-2">💡 Quick Tip</p>
              <p className="text-gray-300 text-xs">
                Hold your device steady and ensure good lighting for the best scan results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button - Desktop */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-r-xl transition-all shadow-lg"
        style={{ left: isSidebarOpen ? '20rem' : '0' }}
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Main Camera View */}
      <div className="flex-1 flex flex-col relative h-screen min-h-0">
        {/* Camera view — min-h-0 lets it shrink so bottom controls can claim their height */}
        <div className="flex-1 min-h-0 relative bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black overflow-hidden">
          {/* ✅ Camera feed shifted down — the library centers its qrbox inside
              this element, so pushing the element down moves everything together */}
          <div
            id="barcode-camera"
            className="absolute inset-0 z-0"
            style={{ top: CAMERA_SHIFT_DOWN_PX }}
          />

          {/* Top bar - Mobile Only */}
          <div className="lg:hidden absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
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

          {/* ✅ Scanner UI — ONLY before scanning starts (disappears immediately on click) */}
          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="relative"
                style={{ transform: `translateY(${OVERLAY_SHIFT_DOWN_PX}px)` }}
              >
                <div
                  className="border-2 border-white rounded-3xl relative"
                  style={{ width: QR_W, height: QR_H }}
                >
                  {cameraDenied && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-3xl">
                      <div className="text-center px-6">
                        <p className="text-white text-xl font-semibold mb-3">
                          Camera Access Needed
                        </p>

                        <p className="text-gray-300 text-sm mb-6">
                          Please allow camera access in your browser settings.
                        </p>

                        <button
                          onClick={() => {
                            setCameraDenied(false);
                            handleScan(); // retry
                          }}
                          className="px-6 py-3 bg-emerald-500 rounded-full text-white font-semibold"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-l-4 border-t-4 border-emerald-500 rounded-tl-3xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-r-4 border-t-4 border-emerald-500 rounded-tr-3xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-l-4 border-b-4 border-emerald-500 rounded-bl-3xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-r-4 border-b-4 border-emerald-500 rounded-br-3xl" />

                  {/* Scanning line animation (pre-scan vibe) */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scan" />
                  </div>
                </div>

                {/* Instruction text */}
                <div className="mt-8 text-center">
                  <p className="text-white font-semibold text-lg lg:text-xl mb-2">
                    Align barcode within frame
                  </p>
                  <p className="text-gray-400 text-sm lg:text-base">
                    Hold steady for best results
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom controls — shrink-0 prevents flex from squishing it, so h-[500px] sticks */}
        <div className="shrink-0 h-[800px] bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-center gap-4 lg:gap-6 p-8 lg:p-12">
          {/* Scan button - Bigger on desktop */}
          <button
            onClick={handleScan}
            className={`w-28 h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center transition-all shadow-2xl ${
              isScanning
                ? 'bg-red-500 scale-95'
                : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 shadow-emerald-500/50'
            }`}
          >
            <div className="w-24 h-24 lg:w-28 lg:h-28 bg-white rounded-full flex items-center justify-center">
              <ScanLine className={`w-12 h-12 lg:w-14 lg:h-14 text-emerald-500 ${isScanning ? 'animate-pulse' : ''}`} />
            </div>
          </button>

          {/* Upload option */}
          <button className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm lg:text-base font-medium">Upload Image</span>
          </button>

          <p className="text-center text-gray-400 text-sm lg:text-base">
            Tap to scan or upload a photo of the barcode
          </p>
        </div>
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
