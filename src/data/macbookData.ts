export interface MacBook {
  id: string;
  model: string;
  price: number;
  type: 'Air' | 'Pro';
  chip: 'M1' | 'M2' | 'M2 Pro' | 'M2 Max' | 'M3' | 'M3 Pro' | 'M3 Max';
  features: string[];
  bestFor: string[];
  display: string;
  ram: string;
  storage: string;
  battery: string;
  ports: string[];
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const macbookData: MacBook[] = [
  {
    id: 'macbook-air-13-m2',
    model: 'MacBook Air 13" M2',
    price: 1099,
    type: 'Air',
    chip: 'M2',
    features: ['Fanless Design', 'MagSafe Charging', 'Liquid Retina Display', '1080p Camera'],
    bestFor: ['students', 'portable', 'everyday'],
    display: '13.6" Liquid Retina',
    ram: '8GB Unified Memory',
    storage: '256GB SSD',
    battery: 'Up to 18 hours',
    ports: ['MagSafe', '2x Thunderbolt', '3.5mm Audio'],
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Perfect for everyday tasks with incredible battery life and portability.'
  },
  {
    id: 'macbook-air-15-m2',
    model: 'MacBook Air 15" M2',
    price: 1299,
    type: 'Air',
    chip: 'M2',
    features: ['Larger Display', 'Six-Speaker System', 'MagSafe', 'Slim Design'],
    bestFor: ['creators', 'multimedia', 'portable'],
    display: '15.3" Liquid Retina',
    ram: '8GB Unified Memory',
    storage: '256GB SSD',
    battery: 'Up to 18 hours',
    ports: ['MagSafe', '2x Thunderbolt', '3.5mm Audio'],
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Larger screen in an incredibly thin and light design.'
  },
  {
    id: 'macbook-pro-14-m3-pro',
    model: 'MacBook Pro 14" M3 Pro',
    price: 1999,
    type: 'Pro',
    chip: 'M3 Pro',
    features: ['ProMotion', 'Mini-LED', 'HDMI', 'SD Card Reader'],
    bestFor: ['developers', 'professional', 'power-users'],
    display: '14.2" Liquid Retina XDR',
    ram: '16GB Unified Memory',
    storage: '512GB SSD',
    battery: 'Up to 18 hours',
    ports: ['MagSafe', '3x Thunderbolt', 'HDMI', 'SD Card', '3.5mm Audio'],
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Pro performance for demanding workflows and development.'
  },
  {
    id: 'macbook-pro-16-m3-max',
    model: 'MacBook Pro 16" M3 Max',
    price: 2999,
    type: 'Pro',
    chip: 'M3 Max',
    features: ['Largest Display', 'Max Performance', 'Studio Quality Mics'],
    bestFor: ['video-editing', 'professional', '3d-rendering'],
    display: '16.2" Liquid Retina XDR',
    ram: '32GB Unified Memory',
    storage: '1TB SSD',
    battery: 'Up to 22 hours',
    ports: ['MagSafe', '3x Thunderbolt', 'HDMI', 'SD Card', '3.5mm Audio'],
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Ultimate power for professional video editing and 3D rendering.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 1200, label: 'Budget-Friendly' },
  midRange: { min: 1201, max: 2000, label: 'Mid-Range' },
  premium: { min: 2001, max: 3000, label: 'Premium' },
  luxury: { min: 3001, max: Infinity, label: 'Luxury' }
};

export const recommendMacBook = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  preferences: string[]
): MacBook[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = macbookData
    .filter(macbook => {
      // Budget check
      if (macbook.price < budgetRange.min || macbook.price > budgetRange.max) return false;
      
      // Usage and preferences
      const hasMatchingUse = macbook.bestFor.some(use => 
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

  // Always return exactly 3 MacBooks
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more MacBooks from the same budget range
  const remaining = macbookData
    .filter(macbook => 
      macbook.price >= budgetRange.min && 
      macbook.price <= budgetRange.max &&
      !filtered.includes(macbook)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};