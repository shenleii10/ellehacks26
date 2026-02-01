'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HealthAllergiePage() {
    const [healthConditions, setHealthConditions] = useState<string[]>([])
    const [allergies, setAllergies] = useState<string[]>([])
    const [customAllergenQuery, setCustomAllergenQuery] = useState('')
    const [customAllergenResults, setCustomAllergenResults] = useState<string[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const healthOptions = [
        'Diabetes', 'Hypertension', 'Heart Disease', 'Celiac Disease',
        'IBS', 'Lactose Intolerance', 'GERD', 'Kidney Disease'
    ]

    const allergenOptions = [
        'Peanuts', 'Tree Nuts', 'Milk', 'Lactose', 'Eggs',
        'Soy', 'Wheat', 'Fish', 'Shellfish', 'Sesame'
    ]

    const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter((i) => i !== item))
        } else {
            setList([...list, item])
        }
    }

    const searchAllergens = async () => {
        if (!customAllergenQuery.trim()) return
        setIsSearching(true)
        setCustomAllergenResults([])

        try {
            const res = await fetch('/api/profile/search-allergens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: customAllergenQuery }),
            })

            const data = await res.json()
            if (res.ok) {
                setCustomAllergenResults(data.results)
            }
        } catch {
            setError('Search failed, try again')
        } finally {
            setIsSearching(false)
        }
    }

    const handleContinue = async () => {
        try {
            const res = await fetch('/api/profile/health-allergies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ healthConditions, allergies }),
            })

            if (res.ok) {
                router.push('/onboarding/dietary-preferences')
            } else {
                const data = await res.json()
                setError(data.error || 'Failed to save')
            }
        } catch {
            setError('Something went wrong')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-green-600">Simple Bite</h1>
                    <p className="text-gray-500 text-sm mt-1">Almost there!</p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-200 text-green-600 flex items-center justify-center font-bold text-sm">✓</div>
                    </div>
                    <div className="flex-1 h-1 bg-green-600 mx-3 rounded"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                        <span className="ml-2 text-sm font-semibold text-green-600">Health</span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-200 mx-3 rounded"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm">3</div>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-4">Step 2 of 3 - Health & Allergies</p>

                {/* Health Conditions */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Health Conditions <span className="text-gray-400 font-normal">(optional)</span></label>
                    <div className="grid grid-cols-2 gap-2">
                        {healthOptions.map((condition) => (
                            <button
                                key={condition}
                                onClick={() => toggleSelection(condition, healthConditions, setHealthConditions)}
                                className={`p-2 rounded-lg border text-sm text-left transition ${healthConditions.includes(condition)
                                        ? 'bg-green-100 border-green-500 text-green-700'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-green-300'
                                    }`}
                            >
                                {condition}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Allergies */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Allergies</label>
                    <div className="grid grid-cols-2 gap-2">
                        {allergenOptions.map((allergen) => (
                            <button
                                key={allergen}
                                onClick={() => toggleSelection(allergen, allergies, setAllergies)}
                                className={`p-2 rounded-lg border text-sm text-left transition ${allergies.includes(allergen)
                                        ? 'bg-red-100 border-red-400 text-red-700'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-red-300'
                                    }`}
                            >
                                {allergen}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Allergen Search */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Add Custom Allergen</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customAllergenQuery}
                            onChange={(e) => setCustomAllergenQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchAllergens()}
                            placeholder="Search allergens..."
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-sm"
                        />
                        <button
                            onClick={searchAllergens}
                            className="bg-green-600 text-white px-4 rounded-lg text-sm hover:bg-green-700 transition"
                        >
                            {isSearching ? '...' : 'Search'}
                        </button>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Type to search for additional allergens</p>

                    {/* Search Results */}
                    {customAllergenResults.length > 0 && (
                        <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden">
                            {customAllergenResults.map((result) => (
                                <button
                                    key={result}
                                    onClick={() => {
                                        if (!allergies.includes(result)) {
                                            setAllergies([...allergies, result])
                                        }
                                        setCustomAllergenResults([])
                                        setCustomAllergenQuery('')
                                    }}
                                    className="w-full text-left p-2 text-sm text-gray-700 hover:bg-green-50 border-b border-gray-100 last:border-0"
                                >
                                    + {result}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}