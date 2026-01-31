import { normalizeIngredients } from '../utils/normalizeIngredients.js';
import { getCached, setCached } from './cache.js';

export async function getProductByBarcode(barcode) {
  const cached = getCached(barcode);
  if (cached) return cached;

  const res = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?lc=en`
  );
  const data = await res.json();

  if (data.status !== 1) {
    throw new Error('Product not found');
  }

  const product = {
    name: data.product.product_name,
    ingredients: normalizeIngredients(
      data.product.ingredients_text_en ||
      data.product.ingredients_text
    ),
    allergens: data.product.allergens_tags
  };

  setCached(barcode, product);
  return product;
}