import { normalize } from "../utils/normalize.js";

export const HARD_BLOCKS = {
  vegan: ["milk", "egg", "honey", "gelatin", "whey", "casein"],
  glutenFree: ["wheat", "barley", "rye", "malt"]
};

export const UNCERTAIN_INGREDIENTS = {
  vegan: [
    "natural flavors",
    "mono and diglycerides",
    "enzymes",
    "lecithin",
    "e471",
    "e322"
  ]
};

export function evaluateDiet({ ingredients, diet }) {
  const list = ingredients.map(normalize);

  // 1️⃣ Hard blocks
  for (const bad of HARD_BLOCKS[diet] || []) {
    if (list.some(i => i.includes(bad))) {
      return {
        status: "fail",
        reason: `Contains ${bad}`
      };
    }
  }

  // 2️⃣ Uncertain ingredients
  const uncertainHits = [];
  for (const item of UNCERTAIN_INGREDIENTS[diet] || []) {
    if (list.some(i => i.includes(item))) {
      uncertainHits.push(item);
    }
  }

  if (uncertainHits.length) {
    return {
      status: "uncertain",
      reason: `Contains potentially non-${diet} ingredients`,
      hits: uncertainHits
    };
  }

  // 3️⃣ Safe
  return {
    status: "pass",
    reason: "No conflicting ingredients found"
  };
}
