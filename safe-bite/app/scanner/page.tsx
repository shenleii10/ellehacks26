export default function ScannerPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-2">Simple Bite</h1>
                <p className="text-gray-500 mb-8">Scan your food product</p>

                {/* Placeholder for scanner */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 mb-6">
                    <p className="text-gray-400">Scanner goes here</p>
                </div>
            </div>
        </div>
    )
}