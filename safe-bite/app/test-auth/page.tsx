'use client'

import { useState } from 'react'

export default function TestAuth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [message, setMessage] = useState('')

    const handleSignup = async () => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, fullName }),
        })
        const data = await res.json()
        setMessage(JSON.stringify(data, null, 2))
    }

    const handleLogin = async () => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await res.json()
        setMessage(JSON.stringify(data, null, 2))
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Test Auth</h1>

            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 border mb-2 text-black"
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border mb-2 text-black"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border mb-4 text-black"
            />

            <button onClick={handleSignup} className="w-full bg-blue-500 text-white p-2 mb-2">
                Sign Up
            </button>

            <button onClick={handleLogin} className="w-full bg-green-500 text-white p-2 mb-4">
                Login
            </button>

            <pre className="bg-gray-100 p-4 rounded text-black text-sm overflow-auto">
                {message || 'No response yet'}
            </pre>
        </div>
    )
}