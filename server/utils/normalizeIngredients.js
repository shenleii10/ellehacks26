const NON_INGREDIENT_PHRASES = [
  "ingredients",
  "ingredient",
  "contains",
  "may contain",
  "or contains",
  "or ingredients",
  "allergen information",
  "for ingredients see",
  "composition",
  "and",
  "or",
];

const MARKETING_WORDS = [
  "organic",
  "natural",
  "gluten free",
  "non gmo",
  "100%"
];


export function normalizeIngredients(text = '') {

  let cleaned = text.toLowerCase();

  for (const word of MARKETING_WORDS) {
    cleaned = cleaned.replace(
      new RegExp(`\\b${word}\\b`, "gi"),
      ""
    );
  }

  for (const phrase of NON_INGREDIENT_PHRASES) {
    cleaned = cleaned.replace(
      new RegExp(`(?:^|[,:;])\\s*(or\\s+)?${phrase}\\s*:??`, "gi"),
      ","
    );
  }
  
  const normalized = cleaned
    .replace(/\(.*?\)/g, '')
    .replace(/[*†‡]+/g, "")
    .replace(/e[-\s]?(\d+)/g, "e$1")
    .replace(/-/g, " ")
    .split(/[,;/]/)
    .map(i => i.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  
  return [...new Set(normalized)];
}
