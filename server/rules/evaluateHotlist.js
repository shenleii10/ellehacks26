import { CANADA_HOTLIST } from "./canadaHotlistRules.js";
import { normalizeIngredients } from "../utils/normalizeIngredients.js";

/**
 * Checks a product's ingredients against the Canada Hotlist.
 *
 * @param {{ ingredients: string[] }} params
 * @returns {{ status: "fail" | "pass", hits?: Array<{ chemical: string, severity: string, matchedKeyword: string, reason: string }> }}
 */
export function evaluateHotlist({ ingredients = [] }) {
  // normalizeIngredients returns an array of tokens per ingredient string;
  // flatten everything into one big list for matching.
  const normalized = ingredients.flatMap(normalizeIngredients);

  const hits = [];

  for (const rule of CANADA_HOTLIST) {
    for (const keyword of rule.keywords) {
      if (normalized.some(token => token.includes(keyword))) {
        hits.push({
          chemical: rule.name,
          severity: rule.severity,
          matchedKeyword: keyword,
          reason: rule.reason
        });
        break; // one hit per chemical group is enough
      }
    }
  }

  if (hits.length > 0) {
    return { status: "fail", hits };
  }

  return { status: "pass" };
}