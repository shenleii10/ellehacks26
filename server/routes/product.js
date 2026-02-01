import express from 'express';
import { getProductByBarcode } from '../services/openFoodFacts.js';
import { explainIngredients } from '../services/geminiService.js';
import { evaluateDiet } from "../rules/evaluateDiet.js";
import { evaluateAllergies } from "../rules/evaluateAllergies.js";

const router = express.Router();

router.post('/explain-ingredients', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: 'Please provide a non-empty ingredients array' });
  }

  try {
    const explanations = await explainIngredients(ingredients);
    res.json({ explanations });
  } catch (err) {
    console.error('Gemini explain error:', err);
    res.status(500).json({ message: err.message || 'Failed to explain ingredients' });
  }
});

router.get('/:barcode', async (req, res) => {
  const { barcode } = req.params;

  console.log('Received barcode:', barcode);

  try {
    const product = await getProductByBarcode(barcode);

    // test with vegan
    const dietResult = evaluateDiet({
      ingredients: product.ingredients,
      diet: "vegan"
    });

    // test with milk and peanut allergies
    const allergyResult = evaluateAllergies({
      ingredients: product.ingredients,
      allergies: ["milk", "peanut"]
    });

    const response = {
      name: product.name || 'Unknown',
      barcode,
      image: product.image || null,
      ingredients: product.ingredients || [],
      warnings: [],
      allergens: product.allergens || [],
      nutritionScore: 'N/A', // can fetch if you want
      dietCheck: dietResult,
      allergyCheck: allergyResult,
      compatibility: {} // fill based on user profile later
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message || 'Product not found' });
  }
});

export default router;