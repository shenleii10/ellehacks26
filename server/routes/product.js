import express from 'express';
import { getProductByBarcode } from '../services/openFoodFacts.js'; // adjust path if needed

const router = express.Router();

router.get('/:barcode', async (req, res) => {
  const { barcode } = req.params;

  console.log('Received barcode:', barcode);

  try {
    const product = await getProductByBarcode(barcode);

    // Optionally transform or add more fields
    const response = {
      name: product.name || 'Unknown',
      barcode,
      ingredients: product.ingredients || [],
      warnings: [], // add later if needed
      allergens: product.allergens || [],
      nutritionScore: 'N/A', // can fetch if you want
      compatibility: {} // fill based on user profile later
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message || 'Product not found' });
  }
});

export default router;
