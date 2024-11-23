export interface Guitar {
  id: string;
  model: string;
  brand: string;
  price: number;
  type: 'Electric' | 'Acoustic' | 'Classical' | 'Bass' | 'Electro-Acoustic';
  features: string[];
  bestFor: string[];
  bodyType: string;
  pickups?: string;
  tonewood: string;
  scale: string;
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const guitarData: Guitar[] = [
  {
    id: 'martin-d28',
    model: 'D-28',
    brand: 'Martin',
    price: 3199,
    type: 'Acoustic',
    features: ['Sitka Spruce Top', 'East Indian Rosewood Back & Sides', 'Ebony Fingerboard'],
    bestFor: ['professional', 'recording', 'bluegrass'],
    bodyType: 'Dreadnought',
    tonewood: 'Spruce/Rosewood',
    scale: '25.4"',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Legendary dreadnought known for its rich, powerful sound.'
  },
  {
    id: 'fender-strat',
    model: 'Player Stratocaster',
    brand: 'Fender',
    price: 849,
    type: 'Electric',
    features: ['Alder Body', '3 Single-Coil Pickups', '2-Point Tremolo'],
    bestFor: ['rock', 'blues', 'versatile'],
    bodyType: 'Stratocaster',
    pickups: '3x Single-Coil',
    tonewood: 'Alder/Maple',
    scale: '25.5"',
    imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Versatile electric guitar suitable for various music styles.'
  },
  {
    id: 'yamaha-fg800',
    model: 'FG800',
    brand: 'Yamaha',
    price: 219,
    type: 'Acoustic',
    features: ['Solid Spruce Top', 'Nato Back & Sides', 'Rosewood Fingerboard'],
    bestFor: ['beginner', 'practice', 'affordable'],
    bodyType: 'Dreadnought',
    tonewood: 'Spruce/Nato',
    scale: '25.6"',
    imageUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Excellent beginner acoustic with great sound quality.'
  },
  {
    id: 'gibson-lp',
    model: 'Les Paul Standard',
    brand: 'Gibson',
    price: 2699,
    type: 'Electric',
    features: ['Mahogany Body', 'Maple Top', 'Humbucker Pickups'],
    bestFor: ['rock', 'metal', 'professional'],
    bodyType: 'Les Paul',
    pickups: '2x Humbucker',
    tonewood: 'Mahogany/Maple',
    scale: '24.75"',
    imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Classic electric guitar with rich, warm tone.'
  },
  {
    id: 'taylor-214ce',
    model: '214ce',
    brand: 'Taylor',
    price: 999,
    type: 'Electro-Acoustic',
    features: ['Sitka Spruce Top', 'Layered Rosewood', 'ES2 Electronics'],
    bestFor: ['performing', 'recording', 'intermediate'],
    bodyType: 'Grand Auditorium',
    tonewood: 'Spruce/Rosewood',
    scale: '25.5"',
    imageUrl: 'https://images.unsplash.com/photo-1619558041249-0523903712e1?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Versatile electro-acoustic with excellent playability.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 500, label: 'Budget-Friendly' },
  midRange: { min: 501, max: 1000, label: 'Mid-Range' },
  premium: { min: 1001, max: 2000, label: 'Premium' },
  luxury: { min: 2001, max: Infinity, label: 'Luxury' }
};

export const recommendGuitar = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  type: string
): Guitar[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = guitarData
    .filter(guitar => {
      // Budget check
      if (guitar.price < budgetRange.min || guitar.price > budgetRange.max) return false;
      
      // Usage and preferences
      const hasMatchingUse = guitar.bestFor.some(use => 
        usage.includes(use)
      );
      
      // Guitar type preference
      if (type === 'acoustic' && !['Acoustic', 'Classical', 'Electro-Acoustic'].includes(guitar.type)) return false;
      if (type === 'electric' && guitar.type !== 'Electric') return false;
      if (type === 'versatile' && !['Electro-Acoustic', 'Electric'].includes(guitar.type)) return false;
      
      return hasMatchingUse;
    })
    .sort((a, b) => {
      // Sort by matching features count
      const aMatches = a.bestFor.filter(use => 
        usage.includes(use)
      ).length;
      const bMatches = b.bestFor.filter(use => 
        usage.includes(use)
      ).length;
      
      return bMatches - aMatches;
    });

  // Always return exactly 3 guitars
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more guitars from the same budget range
  const remaining = guitarData
    .filter(guitar => 
      guitar.price >= budgetRange.min && 
      guitar.price <= budgetRange.max &&
      !filtered.includes(guitar)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};