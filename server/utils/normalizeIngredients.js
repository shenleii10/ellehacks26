export function normalizeIngredients(text = '') {
  return text
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .split(',')
    .map(i => i.trim())
    .filter(Boolean);
}
