// rules/evaluateDiet.js
import { DIET_RULES } from "./dietRules.js";
import { normalizeIngredients } from "../utils/normalizeIngredients.js";

export function evaluateDiet({ ingredients, diet } = {}) {
  const normalized = normalizeIngredients(ingredients);

  // Evaluate ONE diet
  if (diet) {
    return evaluateSingleDiet(normalized, diet);
  }

  // Evaluate ALL diets
  const results = {};

  for (const dietName of Object.keys(DIET_RULES)) {
    results[dietName] = evaluateSingleDiet(normalized, dietName);
  }

  return results;
}

function evaluateSingleDiet(normalizedIngredients, diet) {
  const rules = DIET_RULES[diet];

  if (!rules) {
    return {
      status: "unknown",
      diet,
      reason: `No rules defined for diet: ${diet}`
    };
  }

  // Hard blocks
  const hardHits = rules.hardBlocks.filter(block =>
    normalizedIngredients.some(i => i.includes(block))
  );

  if (hardHits.length > 0) {
    return {
      status: "fail",
      diet,
      reason: `Contains ${hardHits.join(", ")}`,
      hits: hardHits
    };
  }

  // Uncertain
  const uncertainHits = rules.uncertain.filter(item =>
    normalizedIngredients.some(i => i.includes(item))
  );

  if (uncertainHits.length > 0) {
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
