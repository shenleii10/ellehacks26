import { ALLERGY_RULES } from "./allergyRules.js";
import { normalizeIngredients } from "../utils/normalizeIngredients.js";

export function evaluateAllergies({ ingredients, allergies = [] }) {
  const list = ingredients.map(normalizeIngredients);
  const hits = [];

  for (const allergy of allergies) {
    const triggers = ALLERGY_RULES[allergy] || [];

    for (const trigger of triggers) {
      if (list.some(i => i.includes(trigger))) {
        hits.push({
          allergy,
          ingredient: trigger
        });
        break;
      }
    }
  }

  if (hits.length) {
    return {
      status: "fail",
      hits
    };
  }

  return {
    status: "pass",
    reason: "No allergen ingredients found"
  };
}
