export interface iPhone {
  id: string;
  model: string;
  price: number;
  type: 'Standard' | 'Plus' | 'Pro' | 'Pro Max';
  chip: 'A15' | 'A16' | 'A17 Pro';
  features: string[];
  bestFor: string[];
  display: string;
  storage: string;
  camera: string;
  battery: string;
  colors: string[];
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const iphoneData: iPhone[] = [
  {
    id: 'iphone-15-pro-max',
    model: 'iPhone 15 Pro Max',
    price: 1199,
    type: 'Pro Max',
    chip: 'A17 Pro',
    features: ['Action Button', 'USB-C', 'ProMotion', 'Always-On Display'],
    bestFor: ['professional', 'photography', 'power-users'],
    display: '6.7" Super Retina XDR',
    storage: '256GB',
    camera: '48MP Main, 12MP Ultra Wide, 12MP 5x Telephoto',
    battery: 'Up to 29 hours video playback',
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    imageUrl: 'https://images.unsplash.com/photo-1696426051872-0b664d1df01c?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'The ultimate iPhone with pro camera features and top performance.'
  },
  {
    id: 'iphone-15-pro',
    model: 'iPhone 15 Pro',
    price: 999,
    type: 'Pro',
    chip: 'A17 Pro',
    features: ['Action Button', 'USB-C', 'ProMotion', 'Always-On Display'],
    bestFor: ['professional', 'compact', 'power-users'],
    display: '6.1" Super Retina XDR',
    storage: '128GB',
    camera: '48MP Main, 12MP Ultra Wide, 12MP 3x Telephoto',
    battery: 'Up to 23 hours video playback',
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    imageUrl: 'https://images.unsplash.com/photo-1696426051872-0b664d1df01c?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Pro features in a more compact size.'
  },
  {
    id: 'iphone-15',
    model: 'iPhone 15',
    price: 799,
    type: 'Standard',
    chip: 'A16',
    features: ['Dynamic Island', 'USB-C', 'Face ID'],
    bestFor: ['everyday', 'value', 'casual'],
    display: '6.1" Super Retina XDR',
    storage: '128GB',
    camera: '48MP Main, 12MP Ultra Wide',
    battery: 'Up to 20 hours video playback',
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    imageUrl: 'https://images.unsplash.com/photo-1696426051872-0b664d1df01c?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Great all-around iPhone with excellent features.'
  },
  {
    id: 'iphone-15-plus',
    model: 'iPhone 15 Plus',
    price: 899,
    type: 'Plus',
    chip: 'A16',
    features: ['Dynamic Island', 'USB-C', 'Face ID', 'Larger Display'],
    bestFor: ['battery-life', 'multimedia', 'everyday'],
    display: '6.7" Super Retina XDR',
    storage: '128GB',
    camera: '48MP Main, 12MP Ultra Wide',
    battery: 'Up to 26 hours video playback',
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    imageUrl: 'https://images.unsplash.com/photo-1696426051872-0b664d1df01c?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Larger screen and better battery life in the standard iPhone.'
  },
  {
    id: 'iphone-14',
    model: 'iPhone 14',
    price: 699,
    type: 'Standard',
    chip: 'A15',
    features: ['Face ID', 'MagSafe', 'Emergency SOS'],
    bestFor: ['budget', 'value', 'casual'],
    display: '6.1" Super Retina XDR',
    storage: '128GB',
    camera: '12MP Main, 12MP Ultra Wide',
    battery: 'Up to 20 hours video playback',
    colors: ['Blue', 'Purple', 'Yellow', 'Midnight', 'Starlight', 'Red'],
    imageUrl: 'https://images.unsplash.com/photo-1696426051872-0b664d1df01c?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Great value iPhone with solid performance.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 800, label: 'Budget-Friendly' },
  midRange: { min: 801, max: 1000, label: 'Mid-Range' },
  premium: { min: 1001, max: 1200, label: 'Premium' },
  luxury: { min: 1201, max: Infinity, label: 'Luxury' }
};

export const recommendiPhone = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  preferences: string[]
): iPhone[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = iphoneData
    .filter(iphone => {
      // Budget check
      if (iphone.price < budgetRange.min || iphone.price > budgetRange.max) return false;
      
      // Usage and preferences
      const hasMatchingUse = iphone.bestFor.some(use => 
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

  // Always return exactly 3 iPhones
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more iPhones from the same budget range
  const remaining = iphoneData
    .filter(iphone => 
      iphone.price >= budgetRange.min && 
      iphone.price <= budgetRange.max &&
      !filtered.includes(iphone)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};