import { DIET_RULES } from "./dietRules.js";
import { normalizeIngredients } from "../utils/normalizeIngredients.js";

export function evaluateDiet({ ingredients = [], diet }) {
  const rules = DIET_RULES[diet];
  console.log("INPUT INGREDIENTS:", ingredients);
  console.log("DIET:", diet);


  if (!rules) {
    return {
      status: "unknown",
      reason: `No rules defined for diet: ${diet}`
    };
  }

  const normalized = ingredients.map(normalizeIngredients);

  // Hard blocks
  for (const blocked of rules.hardBlocks) {
    if (normalized.some(i => i.includes(blocked))) {
      return {
        status: "fail",
        diet,
        reason: `Contains ${blocked}`
      };
    }
  }

  // Uncertain ingredients
  const uncertainHits = rules.uncertain.filter(item =>
    normalized.some(i => i.includes(item))
  );

  if (uncertainHits.length) {
    return {
      status: "uncertain",
      diet,
      reason: "Contains potentially incompatible ingredients",
      hits: uncertainHits
    };
  }

  // Safe
  return {
    status: "pass",
    diet,
    reason: "No conflicting ingredients found"
  };
}
