export interface iPad {
  id: string;
  model: string;
  price: number;
  type: 'iPad' | 'iPad Air' | 'iPad mini' | 'iPad Pro';
  chip: 'A15' | 'M1' | 'M2';
  features: string[];
  bestFor: string[];
  display: string;
  storage: string;
  cellular: boolean;
  pencilSupport: 'None' | '1st Gen' | '2nd Gen';
  keyboardSupport: string[];
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const ipadData: iPad[] = [
  {
    id: 'ipad-10th-gen',
    model: 'iPad (10th Generation)',
    price: 449,
    type: 'iPad',
    chip: 'A15',
    features: ['USB-C', 'Landscape Camera', 'Touch ID', '10.9" Display'],
    bestFor: ['students', 'everyday', 'budget'],
    display: '10.9" Liquid Retina',
    storage: '64GB',
    cellular: false,
    pencilSupport: '1st Gen',
    keyboardSupport: ['Magic Keyboard Folio'],
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Perfect for everyday tasks and learning with a modern design.'
  },
  {
    id: 'ipad-air-5th-gen',
    model: 'iPad Air (5th Generation)',
    price: 599,
    type: 'iPad Air',
    chip: 'M1',
    features: ['M1 Chip', 'USB-C', '2nd Gen Pencil', 'Wide Color'],
    bestFor: ['creators', 'students', 'portable'],
    display: '10.9" Liquid Retina',
    storage: '64GB',
    cellular: false,
    pencilSupport: '2nd Gen',
    keyboardSupport: ['Magic Keyboard', 'Smart Keyboard Folio'],
    imageUrl: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Pro features in a lighter, more affordable package.'
  },
  {
    id: 'ipad-pro-11',
    model: 'iPad Pro 11"',
    price: 799,
    type: 'iPad Pro',
    chip: 'M2',
    features: ['ProMotion', 'Face ID', 'Thunderbolt', 'Center Stage'],
    bestFor: ['professional', 'artists', 'power-users'],
    display: '11" Liquid Retina',
    storage: '128GB',
    cellular: false,
    pencilSupport: '2nd Gen',
    keyboardSupport: ['Magic Keyboard', 'Smart Keyboard Folio'],
    imageUrl: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Pro performance in a compact size.'
  },
  {
    id: 'ipad-pro-12-9',
    model: 'iPad Pro 12.9"',
    price: 1099,
    type: 'iPad Pro',
    chip: 'M2',
    features: ['Mini-LED', 'ProMotion', 'Thunderbolt', 'Face ID'],
    bestFor: ['professional', 'video-editing', 'artists'],
    display: '12.9" Liquid Retina XDR',
    storage: '128GB',
    cellular: false,
    pencilSupport: '2nd Gen',
    keyboardSupport: ['Magic Keyboard', 'Smart Keyboard Folio'],
    imageUrl: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'The ultimate iPad experience with the largest display.'
  },
  {
    id: 'ipad-mini-6th-gen',
    model: 'iPad mini (6th Generation)',
    price: 499,
    type: 'iPad mini',
    chip: 'A15',
    features: ['Compact Size', 'USB-C', 'Touch ID', 'Wide Color'],
    bestFor: ['portable', 'reading', 'notes'],
    display: '8.3" Liquid Retina',
    storage: '64GB',
    cellular: false,
    pencilSupport: '2nd Gen',
    keyboardSupport: ['Bluetooth Keyboards'],
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Powerful features in the most portable iPad.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 500, label: 'Budget-Friendly' },
  midRange: { min: 501, max: 800, label: 'Mid-Range' },
  premium: { min: 801, max: 1200, label: 'Premium' },
  luxury: { min: 1201, max: Infinity, label: 'Luxury' }
};

export const recommendiPad = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  preferences: string[]
): iPad[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = ipadData
    .filter(ipad => {
      // Budget check
      if (ipad.price < budgetRange.min || ipad.price > budgetRange.max) return false;
      
      // Usage and preferences
      const hasMatchingUse = ipad.bestFor.some(use => 
        [...usage, ...preferences].includes(use)
      );
      
      return hasMatchingUse;
    })
    .sort((a, b) => {
      // Sort by matching features count
      const aMatches = a.bestFor.filter(use => 
        [...usage, ...preferences].includes(use)
      ).length;
      const bMatches = b.bestFor.filter(use => 
        [...usage, ...preferences].includes(use)
      ).length;
      
      return bMatches - aMatches;
    });

  // Always return exactly 3 iPads
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more iPads from the same budget range
  const remaining = ipadData
    .filter(ipad => 
      ipad.price >= budgetRange.min && 
      ipad.price <= budgetRange.max &&
      !filtered.includes(ipad)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};