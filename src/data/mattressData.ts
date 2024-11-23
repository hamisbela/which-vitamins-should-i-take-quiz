export interface Mattress {
  id: string;
  model: string;
  brand: string;
  price: number;
  type: 'Memory Foam' | 'Hybrid' | 'Innerspring' | 'Latex' | 'Airbed';
  features: string[];
  bestFor: string[];
  firmness: 'Soft' | 'Medium-Soft' | 'Medium' | 'Medium-Firm' | 'Firm';
  thickness: number;
  warranty: string;
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const mattressData: Mattress[] = [
  {
    id: 'nectar-memory',
    model: 'Memory Foam Mattress',
    brand: 'Nectar',
    price: 999,
    type: 'Memory Foam',
    features: ['Cooling Cover', 'Pressure Relief', '365-Night Trial', 'Forever Warranty'],
    bestFor: ['side-sleepers', 'couples', 'back-pain'],
    firmness: 'Medium-Firm',
    thickness: 12,
    warranty: 'Forever',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Premium memory foam mattress with excellent pressure relief and cooling properties.'
  },
  {
    id: 'purple-hybrid',
    model: 'Hybrid Premier',
    brand: 'Purple',
    price: 2299,
    type: 'Hybrid',
    features: ['Grid Technology', 'Responsive Support', 'Temperature Neutral', 'Motion Isolation'],
    bestFor: ['hot-sleepers', 'back-sleepers', 'premium'],
    firmness: 'Medium',
    thickness: 13,
    warranty: '10 years',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Innovative hybrid mattress with unique grid technology for optimal comfort.'
  },
  {
    id: 'saatva-classic',
    model: 'Classic',
    brand: 'Saatva',
    price: 1499,
    type: 'Innerspring',
    features: ['Lumbar Support', 'Dual Coil', 'Organic Cotton', 'Free White Glove Delivery'],
    bestFor: ['back-pain', 'luxury', 'stomach-sleepers'],
    firmness: 'Firm',
    thickness: 14.5,
    warranty: '15 years',
    imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Luxury hybrid innerspring mattress with excellent support and durability.'
  },
  {
    id: 'dreamfoam-elements',
    model: 'Elements Latex',
    brand: 'Dreamfoam',
    price: 699,
    type: 'Latex',
    features: ['Natural Materials', 'Breathable', 'Customizable Firmness'],
    bestFor: ['eco-conscious', 'budget', 'allergies'],
    firmness: 'Medium-Soft',
    thickness: 10,
    warranty: '10 years',
    imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Affordable latex mattress with natural materials and good breathability.'
  },
  {
    id: 'helix-midnight',
    model: 'Midnight',
    brand: 'Helix',
    price: 1099,
    type: 'Hybrid',
    features: ['Memory Foam', 'Wrapped Coils', 'Cooling Cover'],
    bestFor: ['side-sleepers', 'couples', 'value'],
    firmness: 'Medium',
    thickness: 12,
    warranty: '10 years',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Popular hybrid mattress designed specifically for side sleepers.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 800, label: 'Budget-Friendly' },
  midRange: { min: 801, max: 1500, label: 'Mid-Range' },
  premium: { min: 1501, max: 2500, label: 'Premium' },
  luxury: { min: 2501, max: Infinity, label: 'Luxury' }
};

export const recommendMattress = (
  budget: keyof typeof budgetRanges,
  sleepingPosition: string[],
  preferences: string[]
): Mattress[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = mattressData
    .filter(mattress => {
      // Budget check
      if (mattress.price < budgetRange.min || mattress.price > budgetRange.max) return false;
      
      // Sleeping position and preferences
      const hasMatchingUse = mattress.bestFor.some(use => 
        [...sleepingPosition, ...preferences].includes(use)
      );
      
      return hasMatchingUse;
    })
    .sort((a, b) => {
      // Sort by matching features count
      const aMatches = a.bestFor.filter(use => 
        [...sleepingPosition, ...preferences].includes(use)
      ).length;
      const bMatches = b.bestFor.filter(use => 
        [...sleepingPosition, ...preferences].includes(use)
      ).length;
      
      return bMatches - aMatches;
    });

  // Always return exactly 3 mattresses
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more mattresses from the same budget range
  const remaining = mattressData
    .filter(mattress => 
      mattress.price >= budgetRange.min && 
      mattress.price <= budgetRange.max &&
      !filtered.includes(mattress)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};