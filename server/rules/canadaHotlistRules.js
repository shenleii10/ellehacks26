/**
 * Canada Hotlist Chemicals
 *
 * Sourced from Health Canada's Cosmetic Ingredients Hotlist and
 * the Canadian Environmental Protection Act (CEPA) priority substances.
 * Each entry has:
 *   - keywords : terms to match against a normalised ingredient string
 *   - severity : "high" | "medium"   (high = banned / restricted; medium = flagged / under review)
 *   - reason   : plain-language explanation shown to the user
 */
export const CANADA_HOTLIST = [
  // ─── Banned / Restricted (high) ───────────────────────────────────────────
  {
    name: "Parabens",
    keywords: ["paraben", "methylparaben", "ethylparaben", "propylparaben", "butylparaben", "isopropylparaben", "isobutylparaben"],
    severity: "high",
    reason: "Parabens are preservatives that have been restricted in Canada due to concerns about endocrine disruption."
  },
  {
    name: "Formaldehyde & Releasers",
    keywords: ["formaldehyde", "dmdm hydantoin", "imidazolidinyl urea", "quaternium-15", "sodium hydroxymethylglycinate", "2-bromo-2-nitropropane-1,3-diol", "bronopol"],
    severity: "high",
    reason: "Formaldehyde and its releasing agents are known carcinogens and are banned or heavily restricted in Canadian cosmetics."
  },
  {
    name: "Phthalates",
    keywords: ["phthalate", "diethylhexyl phthalate", "dehp", "dibutyl phthalate", "dbp", "benzyl butyl phthalate", "bbp", "diisononyl phthalate", "dinp", "diisodecyl phthalate", "didp"],
    severity: "high",
    reason: "Phthalates are plasticisers linked to hormonal disruption. Several are prohibited under Canada's Chemicals Management Plan."
  },
  {
    name: "Mercury & Compounds",
    keywords: ["mercury", "mercuric", "thimerosal", "thiomersal", "phenylmercuric"],
    severity: "high",
    reason: "Mercury compounds are toxic and banned in Canadian food and cosmetic products."
  },
  {
    name: "Lead",
    keywords: ["lead", "lead acetate", "lead nitrate"],
    severity: "high",
    reason: "Lead is a potent neurotoxin. Health Canada prohibits it in consumer products."
  },
  {
    name: "Arsenic",
    keywords: ["arsenic", "arsenic trioxide", "sodium arsenite"],
    severity: "high",
    reason: "Arsenic is a known carcinogen and is banned in Canadian consumer products."
  },
  {
    name: "Cadmium",
    keywords: ["cadmium", "cadmium chloride", "cadmium sulfate"],
    severity: "high",
    reason: "Cadmium is a toxic heavy metal restricted under Canada's CEPA regulations."
  },
  {
    name: "Polycyclic Aromatic Hydrocarbons (PAHs)",
    keywords: ["polycyclic aromatic", "pah", "benzo[a]pyrene", "naphthalene"],
    severity: "high",
    reason: "PAHs are potent carcinogens flagged by Health Canada."
  },
  {
    name: "Butylated Hydroxytoluene (BHT)",
    keywords: ["butylated hydroxytoluene", "bht"],
    severity: "high",
    reason: "BHT is a synthetic antioxidant linked to endocrine disruption and restricted in several Canadian product categories."
  },
  {
    name: "Artificial Sweetener - Cyclamate",
    keywords: ["cyclamate", "sodium cyclamate", "calcium cyclamate"],
    severity: "high",
    reason: "Cyclamate sweeteners are banned in Canada due to potential cancer risk."
  },

  // ─── Flagged / Under Review (medium) ──────────────────────────────────────
  {
    name: "Perfluoroalkyl Substances (PFAS)",
    keywords: ["pfas", "pfos", "pfoa", "perfluorooctane", "perfluorooctanoic", "perfluorinated"],
    severity: "medium",
    reason: "PFAS (forever chemicals) are under review in Canada for their persistence in the environment and potential health effects."
  },
  {
    name: "Triclosan",
    keywords: ["triclosan"],
    severity: "medium",
    reason: "Triclosan is an antimicrobial additive under review in Canada for potential endocrine-disrupting activity."
  },
  {
    name: "Bisphenol A (BPA)",
    keywords: ["bisphenol a", "bpa", "bisphenol"],
    severity: "medium",
    reason: "BPA is restricted in baby products in Canada and is under broader review as an endocrine disruptor."
  },
  {
    name: "Artificial Colours (Azo Dyes)",
    keywords: ["red 40", "yellow 5", "yellow 6", "sunset yellow", "tartrazine", "amaranth", "allura red", "azo dye"],
    severity: "medium",
    reason: "Several azo-based artificial colours are flagged by Health Canada for potential hyperactivity links in children."
  },
  {
    name: "Nitrates / Nitrites",
    keywords: ["sodium nitrate", "sodium nitrite", "potassium nitrate", "potassium nitrite"],
    severity: "medium",
    reason: "Nitrates and nitrites are preserved-meat additives under scrutiny in Canada for cancer risk at high intake levels."
  },
  {
    name: "Sodium Benzoate",
    keywords: ["sodium benzoate", "benzoic acid", "benzoate"],
    severity: "medium",
    reason: "Sodium benzoate is a preservative that can form benzene (a carcinogen) when combined with ascorbic acid. Flagged by Health Canada."
  }
];