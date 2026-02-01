'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BasicInfoPage() {
    const [fullName, setFullName] = useState('')
    const [age, setAge] = useState('')
    const [country, setCountry] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const countries = [
        'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
        'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
        'Colombia', 'Cuba', 'Czech Republic', 'Denmark', 'Dominican Republic',
        'Egypt', 'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece',
        'Guatemala', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India',
        'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica',
        'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Lebanon',
        'Malaysia', 'Mexico', 'Morocco', 'Mozambique', 'Myanmar', 'Nepal',
        'Netherlands', 'New Zealand', 'Nigeria', 'North Korea', 'Norway',
        'Pakistan', 'Palestine', 'Panama', 'Paraguay', 'Peru', 'Philippines',
        'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
        'Saudi Arabia', 'Scotland', 'Senegal', 'Serbia', 'Singapore',
        'Somalia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
        'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tanzania',
        'Thailand', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda',
        'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
        'Uzbekistan', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ]

    const handleContinue = async () => {
        if (!fullName || !age || !country) {
            setError('Please fill in all fields')
            return
        }

        if (parseInt(age) < 5 || parseInt(age) > 120) {
            setError('Please enter a valid age')
            return
        }

        try {
            const res = await fetch('/api/profile/basic-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, age: parseInt(age), country }),
            })

            if (res.ok) {
                router.push('/onboarding/health-allergies')
            } else {
                const data = await res.json()
                setError(data.error || 'Failed to save')
            }
        } catch {
            setError('Something went wrong')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-green-600">Simple Bite</h1>
                    <p className="text-gray-500 text-sm mt-1">Let's set up your profile</p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                        <span className="ml-2 text-sm font-semibold text-green-600">Basic Info</span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-200 mx-3 rounded">
                        <div className="w-0 h-1 bg-green-600 rounded"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm">2</div>
                    </div>
                    <div className="flex-1 h-1 bg-gray-200 mx-3 rounded"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm">3</div>
                    </div>
                </div>

                {/* Step Label */}
                <p className="text-gray-500 text-sm mb-4">Step 1 of 3 - Basic Information</p>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="25"
                            min="5"
                            max="120"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Country</label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
                        >
                            <option value="">Select a country</option>
                            {countries.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className="w-full mt-6 bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}