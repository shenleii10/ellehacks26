import { getCached, setCached } from './cache.js';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function explainIngredients(ingredients) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const cacheKey = 'gemini_explain:' + [...ingredients].sort().join('|').toLowerCase();
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const ingredientList = ingredients.join(', ');

  const prompt = `You are a helpful food and cosmetics ingredient expert. For each of the following ingredients, provide a brief, plain-English explanation of what it is and why it is used in the product. Keep each explanation to 1-2 sentences max. Be factual and neutral.

IMPORTANT: If an ingredient is so self-explanatory that the explanation would just restate the ingredient name itself (e.g. "Water is water", "Sugar is a sweetener called sugar", "Salt is salt"), omit that ingredient from the response entirely. Only include it if you can add genuinely useful context beyond what the name already tells the user.

Ingredients: ${ingredientList}

Respond ONLY as a valid JSON object with this exact format (no markdown, no extra text):
{
  "explanations": {
    "Ingredient Name": "Brief explanation here."
  }
}

Make sure each key exactly matches one of the ingredient names provided (preserve original casing). Only include keys for ingredients that have a meaningful explanation.`;

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} - ${err}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error('No response from Gemini');
  }

  const clean = text.replace(/```json\s*/i, '').replace(/```\s*$/, '').trim();
  const parsed = JSON.parse(clean);
  const result = parsed.explanations || {};

  setCached(cacheKey, result);

  return result;
}