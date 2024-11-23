export interface TV {
  id: string;
  model: string;
  brand: string;
  price: number;
  size: number;
  features: string[];
  bestFor: string[];
  hdr: boolean;
  refreshRate: number;
  resolution: '4K' | '8K';
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const tvData: TV[] = [
  {
    id: 'lg-c3-65',
    model: 'LG C3 OLED',
    brand: 'LG',
    price: 1799,
    size: 65,
    features: ['OLED', 'Perfect Blacks', 'G-SYNC Compatible', 'Dolby Vision', 'WebOS'],
    bestFor: ['gaming', 'movies', 'dark-room'],
    hdr: true,
    refreshRate: 120,
    resolution: '4K',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Perfect for movie enthusiasts and gamers, featuring infinite contrast and true blacks.'
  },
  {
    id: 'samsung-qn90c',
    model: 'Samsung QN90C Neo QLED',
    brand: 'Samsung',
    price: 1499,
    size: 55,
    features: ['Neo QLED', 'Anti Glare', 'Object Tracking Sound+', 'Gaming Hub'],
    bestFor: ['bright-room', 'sports', 'gaming'],
    hdr: true,
    refreshRate: 120,
    resolution: '4K',
    imageUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Exceptional brightness and anti-glare technology make it perfect for bright rooms.'
  },
  {
    id: 'sony-x90k',
    model: 'Sony X90K',
    brand: 'Sony',
    price: 999,
    size: 55,
    features: ['Full Array LED', 'XR Processing', 'Netflix Calibrated', 'Google TV'],
    bestFor: ['movies', 'streaming', 'budget'],
    hdr: true,
    refreshRate: 120,
    resolution: '4K',
    imageUrl: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Great value with excellent picture quality and smart features.'
  },
  {
    id: 'tcl-6-series',
    model: 'TCL 6-Series',
    brand: 'TCL',
    price: 699,
    size: 55,
    features: ['QLED', 'Mini-LED', 'Gaming Mode', 'Roku TV'],
    bestFor: ['budget', 'gaming', 'streaming'],
    hdr: true,
    refreshRate: 120,
    resolution: '4K',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Best budget TV with premium features and excellent gaming performance.'
  },
  {
    id: 'samsung-s95c',
    model: 'Samsung S95C QD-OLED',
    brand: 'Samsung',
    price: 2499,
    size: 65,
    features: ['QD-OLED', 'Neural Quantum Processor', 'Gaming Hub', 'Anti-Glare'],
    bestFor: ['gaming', 'movies', 'bright-room'],
    hdr: true,
    refreshRate: 144,
    resolution: '4K',
    imageUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Revolutionary QD-OLED technology combines OLED contrast with QLED brightness.'
  },
  {
    id: 'hisense-u8k',
    model: 'Hisense U8K',
    brand: 'Hisense',
    price: 899,
    size: 65,
    features: ['Mini-LED', 'Google TV', 'Gaming Mode Pro', 'Dolby Vision IQ'],
    bestFor: ['budget', 'bright-room', 'sports'],
    hdr: true,
    refreshRate: 144,
    resolution: '4K',
    imageUrl: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Exceptional value with premium features like Mini-LED and 144Hz refresh rate.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 800, label: 'Budget-Friendly' },
  midRange: { min: 801, max: 1500, label: 'Mid-Range' },
  premium: { min: 1501, max: 3000, label: 'Premium' },
  luxury: { min: 3001, max: Infinity, label: 'Luxury' }
};

export const recommendTV = (
  budget: keyof typeof budgetRanges,
  size: number,
  usage: string[],
  brightness: 'dark-room' | 'bright-room' | 'mixed'
): TV[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = tvData
    .filter(tv => {
      // Budget check
      if (tv.price < budgetRange.min || tv.price > budgetRange.max) return false;
      
      // Size preference (within 10 inches)
      if (Math.abs(tv.size - size) > 10) return false;
      
      // Usage and brightness preferences
      const hasMatchingUse = tv.bestFor.some(use => 
        usage.includes(use) || use === brightness
      );
      
      return hasMatchingUse;
    })
    .sort((a, b) => {
      // Sort by matching features count
      const aMatches = a.bestFor.filter(use => 
        usage.includes(use) || use === brightness
      ).length;
      const bMatches = b.bestFor.filter(use => 
        usage.includes(use) || use === brightness
      ).length;
      
      return bMatches - aMatches;
    });

  // Always return exactly 3 TVs
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more TVs from the same budget range
  const remaining = tvData
    .filter(tv => 
      tv.price >= budgetRange.min && 
      tv.price <= budgetRange.max &&
      !filtered.includes(tv)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};