export const DIET_RULES = {
  vegan: {
    hardBlocks: [
      "milk",
      "cheese",
      "butter",
      "cream",
      "whey",
      "casein",
      "lactose",
      "yogurt",
      "rennet",
      "lipase",
      "egg",
      "honey",
      "gelatin",
      "fish",
      "meat",
      "chicken",
      "beef",
      "pork"
    ],
    uncertain: [
      "natural flavors",
      "mono and diglycerides",
      "enzymes",
      "lecithin",
      "e471",
      "e322"
    ]
  },

  vegetarian: {
    hardBlocks: [
      "meat",
      "chicken",
      "beef",
      "pork",
      "fish",
      "shellfish",
      "gelatin",
      "lard",
      "anchovy"
    ],
    uncertain: [
      "rennet",
      "enzymes",
      "natural flavors",
      "broth",
      "stock"
    ]
  },

  pescatarian: {
    hardBlocks: [
      "beef",
      "pork",
      "chicken",
      "lamb",
      "turkey",
      "gelatin",
      "lard"
    ],
    uncertain: [
      "broth",
      "stock",
      "natural flavors"
    ]
  },

  keto: {
    hardBlocks: [
      "sugar",
      "corn syrup",
      "high fructose corn syrup",
      "rice",
      "wheat",
      "flour",
      "potato",
      "bread",
      "pasta"
    ],
    uncertain: [
      "maltodextrin",
      "modified starch",
      "dextrose",
      "fructose",
      "natural sweeteners"
    ]
  },

  halal: {
    hardBlocks: [
      "pork",
      "bacon",
      "ham",
      "lard",
      "gelatin (pork)",
      "alcohol",
      "wine",
      "beer"
    ],
    uncertain: [
      "enzymes",
      "gelatin",
      "natural flavors",
      "emulsifiers",
      "shortening"
    ]
  },

  paleo: {
    hardBlocks: [
      "grains",
      "wheat",
      "rice",
      "corn",
      "legumes",
      "soy",
      "peanuts",
      "dairy",
      "refined sugar"
    ],
    uncertain: [
      "honey",
      "maple syrup",
      "natural sweeteners",
      "processed oils"
    ]
  },

  kosher: {
    hardBlocks: [
      "pork",
      "shellfish",
      "shrimp",
      "crab",
      "lobster",
      "mixing meat and dairy"
    ],
    uncertain: [
      "enzymes",
      "gelatin",
      "rennet",
      "natural flavors",
      "emulsifiers"
    ]
  }
};
