import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
    const { query } = await request.json()

    if (!query) {
        return NextResponse.json({ error: 'No search query provided' }, { status: 400 })
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `You are an allergen database. Given the search query "${query}", return a JSON array of relevant allergens or food sensitivities that match or are related to this query.
    
    Rules:
    - Return ONLY a valid JSON array of strings
    - Each string should be a specific allergen or food sensitivity
    - Maximum 5 results
    - Only include real, recognized allergens or food sensitivities
    - Do not include any other text, only the JSON array
    
    Example output: ["Peanuts", "Tree Nuts", "Almond"]`

        const result = await model.generateContent(prompt)
        const text = result.response.text().trim()

        // Parse the JSON response
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        const results = JSON.parse(cleanedText)

        return NextResponse.json({ results })
    } catch (error) {
        console.error('Gemini API error:', error)
        return NextResponse.json({ error: 'Search failed' }, { status: 500 })
    }
}