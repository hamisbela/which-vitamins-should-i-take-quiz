export interface Vitamin {
  id: string;
  name: string;
  brand: string;
  price: number;
  type: 'Multivitamin' | 'Single Vitamin' | 'Mineral' | 'Supplement';
  features: string[];
  bestFor: string[];
  dosage: string;
  servings: number;
  form: 'Tablet' | 'Capsule' | 'Gummy' | 'Liquid' | 'Powder';
  dietary: string[];
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const vitaminData: Vitamin[] = [
  {
    id: 'ritual-essential',
    name: 'Essential Multivitamin',
    brand: 'Ritual',
    price: 30,
    type: 'Multivitamin',
    features: ['Delayed-Release', 'Vegan', 'No Artificial Colors', 'Third-Party Tested'],
    bestFor: ['daily-health', 'women', 'nutrient-gaps'],
    dosage: '2 capsules daily',
    servings: 30,
    form: 'Capsule',
    dietary: ['Vegan', 'Gluten-Free', 'Non-GMO'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Essential nutrients in their most absorbable forms.'
  },
  {
    id: 'nordic-d3',
    name: 'Vitamin D3 5000 IU',
    brand: 'Nordic Naturals',
    price: 25,
    type: 'Single Vitamin',
    features: ['High Potency', 'Olive Oil Base', 'Small Size'],
    bestFor: ['immunity', 'bone-health', 'winter'],
    dosage: '1 softgel daily',
    servings: 60,
    form: 'Capsule',
    dietary: ['Gluten-Free', 'Non-GMO'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'High-potency vitamin D3 for optimal immune support.'
  },
  {
    id: 'garden-life-b12',
    name: 'B12 Spray',
    brand: 'Garden of Life',
    price: 15,
    type: 'Single Vitamin',
    features: ['Methylcobalamin Form', 'Quick Absorption', 'Pleasant Taste'],
    bestFor: ['energy', 'vegan', 'seniors'],
    dosage: '1 spray daily',
    servings: 40,
    form: 'Liquid',
    dietary: ['Vegan', 'Gluten-Free', 'Non-GMO'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Easy-to-absorb B12 spray for energy support.'
  },
  {
    id: 'solgar-magnesium',
    name: 'Magnesium Citrate',
    brand: 'Solgar',
    price: 20,
    type: 'Mineral',
    features: ['Highly Absorbable', 'Chelated Form', 'Easy to Digest'],
    bestFor: ['sleep', 'muscle-health', 'stress'],
    dosage: '2 tablets daily',
    servings: 60,
    form: 'Tablet',
    dietary: ['Vegan', 'Gluten-Free', 'Non-GMO'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Highly absorbable magnesium for relaxation and sleep.'
  },
  {
    id: 'now-omega3',
    name: 'Ultra Omega-3',
    brand: 'NOW Foods',
    price: 28,
    type: 'Supplement',
    features: ['High EPA/DHA', 'Molecular Distilled', 'No Fishy Taste'],
    bestFor: ['heart-health', 'brain-health', 'joints'],
    dosage: '2 softgels daily',
    servings: 45,
    form: 'Capsule',
    dietary: ['Fish-Based', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'High-quality omega-3s for heart and brain health.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 20, label: 'Budget-Friendly' },
  midRange: { min: 21, max: 40, label: 'Mid-Range' },
  premium: { min: 41, max: 60, label: 'Premium' },
  luxury: { min: 61, max: Infinity, label: 'Luxury' }
};

export const recommendVitamin = (
  budget: keyof typeof budgetRanges,
  needs: string[],
  preferences: string[]
): Vitamin[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = vitaminData
    .filter(vitamin => {
      // Budget check
      if (vitamin.price < budgetRange.min || vitamin.price > budgetRange.max) return false;
      
      // Needs and preferences
      const hasMatchingUse = vitamin.bestFor.some(use => 
        [...needs, ...preferences].includes(use)
      );
      
      return hasMatchingUse;
    })
    .sort((a, b) => {
      // Sort by matching features count
      const aMatches = a.bestFor.filter(use => 
        [...needs, ...preferences].includes(use)
      ).length;
      const bMatches = b.bestFor.filter(use => 
        [...needs, ...preferences].includes(use)
      ).length;
      
      return bMatches - aMatches;
    });

  // Always return exactly 3 vitamins
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more vitamins from the same budget range
  const remaining = vitaminData
    .filter(vitamin => 
      vitamin.price >= budgetRange.min && 
      vitamin.price <= budgetRange.max &&
      !filtered.includes(vitamin)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};