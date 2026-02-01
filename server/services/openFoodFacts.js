import { normalizeIngredients } from '../utils/normalizeIngredients.js';
import { getCached, setCached } from './cache.js';

export async function getProductByBarcode(barcode) {
  const cached = getCached(barcode);
  if (cached) return cached;

  const res = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barcode}.json` +
    `?fields=product_name,ingredients_text_en,ingredients_text,ingredients,allergens_tags,image_front_url,image_url`
  );
  const data = await res.json();

  if (data.status !== 1) {
    throw new Error('Product not found');
  }

  const rawIngredients =
    data.product.ingredients_text_en ||
    data.product.ingredients_text ||
    data.product.ingredients?.map(i => i.text).join(",") ||
    "";

  const product = {
    name: data.product.product_name_en || data.product.product_name || "Unknown product",
    image: data.product.image_front_url || data.product.image_url || null,
    ingredients: normalizeIngredients(rawIngredients),
    allergens: (data.product.allergens_tags || []).map(tag =>
      tag.replace("en:", "")
    )
  };

  setCached(barcode, product);
  return product;
}