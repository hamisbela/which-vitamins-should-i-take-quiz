export interface Truck {
  id: string;
  model: string;
  brand: string;
  price: number;
  type: 'Light-Duty' | 'Mid-Size' | 'Heavy-Duty' | 'Commercial';
  features: string[];
  bestFor: string[];
  engine: string;
  transmission: string;
  towing: string;
  payload: string;
  bedLength: string;
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const truckData: Truck[] = [
  {
    id: 'ford-f150',
    model: 'F-150',
    brand: 'Ford',
    price: 34585,
    type: 'Light-Duty',
    features: ['Pro Power Onboard', 'SYNC 4', 'Co-Pilot360', 'Available Hybrid'],
    bestFor: ['work', 'towing', 'versatility'],
    engine: '3.5L EcoBoost V6',
    transmission: '10-speed Automatic',
    towing: '14,000 lbs',
    payload: '3,325 lbs',
    bedLength: '5.5\', 6.5\', or 8\'',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'America\'s best-selling truck, perfect for work and play.'
  },
  {
    id: 'ram-1500',
    model: '1500',
    brand: 'RAM',
    price: 37090,
    type: 'Light-Duty',
    features: ['Air Suspension', 'RamBox', '12-inch Touchscreen', 'eTorque System'],
    bestFor: ['luxury', 'comfort', 'towing'],
    engine: '5.7L HEMI V8',
    transmission: '8-speed Automatic',
    towing: '12,750 lbs',
    payload: '2,300 lbs',
    bedLength: '5.7\' or 6.4\'',
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Luxury meets capability in this refined pickup truck.'
  },
  {
    id: 'toyota-tacoma',
    model: 'Tacoma',
    brand: 'Toyota',
    price: 27250,
    type: 'Mid-Size',
    features: ['TRD Options', 'Toyota Safety Sense', 'Crawl Control'],
    bestFor: ['off-road', 'reliability', 'value'],
    engine: '3.5L V6',
    transmission: '6-speed Automatic',
    towing: '6,800 lbs',
    payload: '1,440 lbs',
    bedLength: '5\' or 6\'',
    imageUrl: 'https://images.unsplash.com/photo-1612544409025-e3950d843e56?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Reliable mid-size truck with excellent off-road capability.'
  },
  {
    id: 'chevy-silverado',
    model: 'Silverado 1500',
    brand: 'Chevrolet',
    price: 35845,
    type: 'Light-Duty',
    features: ['Multi-Flex Tailgate', 'Super Cruise', 'Trailering Tech'],
    bestFor: ['work', 'technology', 'hauling'],
    engine: '6.2L V8',
    transmission: '10-speed Automatic',
    towing: '13,300 lbs',
    payload: '2,280 lbs',
    bedLength: '5.8\', 6.6\', or 8\'',
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Powerful and capable full-size pickup with advanced tech.'
  },
  {
    id: 'ford-ranger',
    model: 'Ranger',
    brand: 'Ford',
    price: 27400,
    type: 'Mid-Size',
    features: ['Terrain Management', 'FX4 Off-Road', 'SYNC 4'],
    bestFor: ['value', 'efficiency', 'versatility'],
    engine: '2.3L EcoBoost',
    transmission: '10-speed Automatic',
    towing: '7,500 lbs',
    payload: '1,860 lbs',
    bedLength: '5\' or 6\'',
    imageUrl: 'https://images.unsplash.com/photo-1612544409025-e3950d843e56?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Efficient mid-size truck with strong towing capability.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 35000, label: 'Budget-Friendly' },
  midRange: { min: 35001, max: 50000, label: 'Mid-Range' },
  premium: { min: 50001, max: 75000, label: 'Premium' },
  luxury: { min: 75001, max: Infinity, label: 'Luxury' }
};

export const recommendTruck = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  preferences: string[]
): Truck[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = truckData
    .filter(truck => {
      // Budget check
      if (truck.price < budgetRange.min || truck.price > budgetRange.max) return false;
      
      // Usage and preferences
      const hasMatchingUse = truck.bestFor.some(use => 
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

  // Always return exactly 3 trucks
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more trucks from the same budget range
  const remaining = truckData
    .filter(truck => 
      truck.price >= budgetRange.min && 
      truck.price <= budgetRange.max &&
      !filtered.includes(truck)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};