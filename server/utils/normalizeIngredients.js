const NON_INGREDIENT_PHRASES = [
  "ingredients",
  "ingredient",
  "contains",
  "may contain",
  "allergen information",
  "for ingredients see",
  "composition"
];

const MARKETING_WORDS = [
  "organic",
  "natural",
  "gluten free",
  "non gmo",
  "100%"
];

export function normalizeIngredients(input = "") {
  if (!input) return [];

  // If array → join into one string
  const text = Array.isArray(input) ? input.join(", ") : input;

  let cleaned = text.toLowerCase();

  // Remove marketing words
  for (const word of MARKETING_WORDS) {
    cleaned = cleaned.replace(
      new RegExp(`\\b${word}\\b`, "gi"),
      " "
    );
  }

  // Replace non-ingredient phrases with separators
  for (const phrase of NON_INGREDIENT_PHRASES) {
    cleaned = cleaned.replace(
      new RegExp(`(?:^|[,:;])\\s*${phrase}\\s*:??`, "gi"),
      ","
    );
  }

  const normalized = cleaned
    // Remove symbols & footnotes
    .replace(/[*†‡]+/g, "")
    // Normalize E-numbers
    .replace(/e[-\s]?(\d+)/g, "e$1")
    // Normalize hyphens
    .replace(/-/g, " ")
    // Split safely
    .split(/[,;/]| and | or /)
    .map(i =>
      i
        .replace(/\(.*?\)/g, "") // keep ingredient, drop note
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean);

  return [...new Set(normalized)];
}
