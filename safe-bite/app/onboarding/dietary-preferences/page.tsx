'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DietaryPreferencesPage() {
    const [dietTypes, setDietTypes] = useState<string[]>([])
    const [ingredientsToAvoid, setIngredientsToAvoid] = useState<string[]>([])
    const [error, setError] = useState('')
    const router = useRouter()

    const dietOptions = [
        'Vegetarian', 'Vegan', 'Pescatarian', 'Keto',
        'Paleo', 'Halal', 'Kosher', 'Gluten Free'
    ]

    const ingredientOptions = [
        'Artificial Colours', 'High Fructose Corn Syrup', 'MSG', 'Trans Fat',
        'Preservatives', 'Artificial Sweeteners', 'Palm Oil', 'Sodium Nitrate'
    ]

    const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter((i) => i !== item))
        } else {
            setList([...list, item])
        }
    }

    const handleContinue = async () => {
        try {
            const res = await fetch('/api/profile/dietary-preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dietTypes, ingredientsToAvoid }),
            })

            if (res.ok) {
                router.push('/scanner')
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
                    <p className="text-gray-500 text-sm mt-1">One last step!</p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-200 text-green-600 flex items-center justify-center font-bold text-sm">✓</div>
                    </div>
                    <div className="flex-1 h-1 bg-green-600 mx-3 rounded"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-200 text-green-600 flex items-center justify-center font-bold text-sm">✓</div>
                    </div>
                    <div className="flex-1 h-1 bg-green-600 mx-3 rounded"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                        <span className="ml-2 text-sm font-semibold text-green-600">Diet</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-4">Step 3 of 3 - Dietary Preferences</p>

                {/* Diet Type */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Diet Type <span className="text-gray-400 font-normal">(optional)</span></label>
                    <div className="grid grid-cols-2 gap-2">
                        {dietOptions.map((diet) => (
                            <button
                                key={diet}
                                onClick={() => toggleSelection(diet, dietTypes, setDietTypes)}
                                className={`p-2 rounded-lg border text-sm text-left transition ${dietTypes.includes(diet)
                                        ? 'bg-green-100 border-green-500 text-green-700'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-green-300'
                                    }`}
                            >
                                {diet}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ingredients to Avoid */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Ingredients to Avoid <span className="text-gray-400 font-normal">(optional)</span></label>
                    <div className="grid grid-cols-2 gap-2">
                        {ingredientOptions.map((ingredient) => (
                            <button
                                key={ingredient}
                                onClick={() => toggleSelection(ingredient, ingredientsToAvoid, setIngredientsToAvoid)}
                                className={`p-2 rounded-lg border text-sm text-left transition ${ingredientsToAvoid.includes(ingredient)
                                        ? 'bg-orange-100 border-orange-400 text-orange-700'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'
                                    }`}
                            >
                                {ingredient}
                            </button>
                        ))}
                    </div>
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