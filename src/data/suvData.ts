export interface SUV {
  id: string;
  model: string;
  brand: string;
  price: number;
  type: 'Compact' | 'Mid-size' | 'Full-size' | 'Luxury';
  features: string[];
  bestFor: string[];
  engine: string;
  transmission: string;
  fuelEconomy: string;
  seating: number;
  cargoSpace: string;
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const suvData: SUV[] = [
  {
    id: 'toyota-rav4',
    model: 'RAV4',
    brand: 'Toyota',
    price: 27975,
    type: 'Compact',
    features: ['Toyota Safety Sense 2.0', 'Apple CarPlay', 'Android Auto', 'AWD Available'],
    bestFor: ['families', 'commuting', 'reliability'],
    engine: '2.5L 4-Cylinder',
    transmission: '8-speed Automatic',
    fuelEconomy: '27 city / 35 highway MPG',
    seating: 5,
    cargoSpace: '37.6 cu. ft.',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Popular compact SUV known for reliability and efficiency.'
  },
  {
    id: 'honda-crv',
    model: 'CR-V',
    brand: 'Honda',
    price: 28500,
    type: 'Compact',
    features: ['Honda Sensing', 'Turbo Engine', 'Wireless CarPlay', 'AWD Available'],
    bestFor: ['families', 'safety', 'value'],
    engine: '1.5L Turbo 4-Cylinder',
    transmission: 'CVT',
    fuelEconomy: '28 city / 34 highway MPG',
    seating: 5,
    cargoSpace: '39.2 cu. ft.',
    imageUrl: 'https://images.unsplash.com/photo-1570733117311-d990c3816c47?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Well-rounded compact SUV with excellent safety features.'
  },
  {
    id: 'jeep-grand-cherokee',
    model: 'Grand Cherokee',
    brand: 'Jeep',
    price: 41500,
    type: 'Mid-size',
    features: ['4x4 System', 'Quadra-Lift Air Suspension', 'Premium Audio', 'Advanced Safety'],
    bestFor: ['luxury', 'off-road', 'towing'],
    engine: '3.6L V6',
    transmission: '8-speed Automatic',
    fuelEconomy: '19 city / 26 highway MPG',
    seating: 5,
    cargoSpace: '37.7 cu. ft.',
    imageUrl: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Luxurious mid-size SUV with serious off-road capability.'
  },
  {
    id: 'ford-explorer',
    model: 'Explorer',
    brand: 'Ford',
    price: 36760,
    type: 'Mid-size',
    features: ['Third Row Seating', 'Co-Pilot360', 'SYNC 4', 'Terrain Management'],
    bestFor: ['large-families', 'towing', 'versatility'],
    engine: '2.3L EcoBoost',
    transmission: '10-speed Automatic',
    fuelEconomy: '21 city / 28 highway MPG',
    seating: 7,
    cargoSpace: '87.8 cu. ft.',
    imageUrl: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Versatile three-row SUV with strong performance.'
  },
  {
    id: 'lexus-rx',
    model: 'RX',
    brand: 'Lexus',
    price: 48550,
    type: 'Luxury',
    features: ['Lexus Safety System+', 'Mark Levinson Audio', 'Premium Interior'],
    bestFor: ['luxury', 'comfort', 'reliability'],
    engine: '2.4L Turbo 4-Cylinder',
    transmission: '8-speed Automatic',
    fuelEconomy: '22 city / 29 highway MPG',
    seating: 5,
    cargoSpace: '32.5 cu. ft.',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Refined luxury SUV with exceptional comfort and quality.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 35000, label: 'Budget-Friendly' },
  midRange: { min: 35001, max: 50000, label: 'Mid-Range' },
  premium: { min: 50001, max: 75000, label: 'Premium' },
  luxury: { min: 75001, max: Infinity, label: 'Luxury' }
};

export const recommendSUV = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  preferences: string[]
): SUV[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = suvData
    .filter(suv => {
      // Budget check
      if (suv.price < budgetRange.min || suv.price > budgetRange.max) return false;
      
      // Usage and preferences
      const hasMatchingUse = suv.bestFor.some(use => 
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

  // Always return exactly 3 SUVs
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more SUVs from the same budget range
  const remaining = suvData
    .filter(suv => 
      suv.price >= budgetRange.min && 
      suv.price <= budgetRange.max &&
      !filtered.includes(suv)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};