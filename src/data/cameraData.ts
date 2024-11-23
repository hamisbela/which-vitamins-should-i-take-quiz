export interface Camera {
  id: string;
  model: string;
  brand: string;
  price: number;
  type: 'DSLR' | 'Mirrorless' | 'Point-and-Shoot' | 'Action';
  features: string[];
  bestFor: string[];
  sensorSize: string;
  megapixels: number;
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const cameraData: Camera[] = [
  {
    id: 'sony-a7iv',
    model: 'Sony A7 IV',
    brand: 'Sony',
    price: 2499,
    type: 'Mirrorless',
    features: ['Full-Frame Sensor', '4K Video', 'Eye AF', 'Weather Sealed'],
    bestFor: ['professional', 'video', 'portrait'],
    sensorSize: 'Full Frame',
    megapixels: 33,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Professional-grade mirrorless camera with exceptional image quality and advanced features.'
  },
  {
    id: 'canon-r6',
    model: 'Canon EOS R6',
    brand: 'Canon',
    price: 2299,
    type: 'Mirrorless',
    features: ['IBIS', 'Dual Card Slots', '4K Video', 'Weather Sealed'],
    bestFor: ['sports', 'wildlife', 'professional'],
    sensorSize: 'Full Frame',
    megapixels: 20,
    imageUrl: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Versatile mirrorless camera with incredible autofocus and stabilization.'
  },
  {
    id: 'fuji-xt5',
    model: 'Fujifilm X-T5',
    brand: 'Fujifilm',
    price: 1699,
    type: 'Mirrorless',
    features: ['Film Simulations', 'Weather Sealed', '4K Video', 'IBIS'],
    bestFor: ['travel', 'street', 'landscape'],
    sensorSize: 'APS-C',
    megapixels: 40,
    imageUrl: 'https://images.unsplash.com/photo-1505739998589-00fc191ce01d?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Compact yet powerful camera with stunning color reproduction and retro design.'
  },
  {
    id: 'nikon-z50',
    model: 'Nikon Z50',
    brand: 'Nikon',
    price: 999,
    type: 'Mirrorless',
    features: ['4K Video', 'Flip Screen', 'Compact Size'],
    bestFor: ['beginner', 'travel', 'vlogging'],
    sensorSize: 'APS-C',
    megapixels: 20,
    imageUrl: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Perfect entry into mirrorless photography with great handling and features.'
  },
  {
    id: 'sony-rx100',
    model: 'Sony RX100 VII',
    brand: 'Sony',
    price: 1299,
    type: 'Point-and-Shoot',
    features: ['1-inch Sensor', '4K Video', 'Pocket Size', 'Fast AF'],
    bestFor: ['travel', 'vlogging', 'compact'],
    sensorSize: '1-inch',
    megapixels: 20,
    imageUrl: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Premium compact camera with professional features in a pocket-sized body.'
  },
  {
    id: 'gopro-11',
    model: 'GoPro HERO11 Black',
    brand: 'GoPro',
    price: 499,
    type: 'Action',
    features: ['5.3K Video', 'Waterproof', 'HyperSmooth 5.0', 'TimeWarp'],
    bestFor: ['action', 'underwater', 'sports'],
    sensorSize: '1/1.9-inch',
    megapixels: 27,
    imageUrl: 'https://images.unsplash.com/photo-1522866348293-843abc2f9500?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Ultimate action camera for capturing adventures in any condition.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 800, label: 'Budget-Friendly' },
  midRange: { min: 801, max: 1500, label: 'Mid-Range' },
  premium: { min: 1501, max: 3000, label: 'Premium' },
  luxury: { min: 3001, max: Infinity, label: 'Luxury' }
};

export const recommendCamera = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  experience: string
): Camera[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = cameraData
    .filter(camera => {
      // Budget check
      if (camera.price < budgetRange.min || camera.price > budgetRange.max) return false;
      
      // Experience level check
      if (experience === 'beginner' && camera.price > 1200) return false;
      if (experience === 'professional' && camera.price < 1500) return false;
      
      // Usage and preferences
      const hasMatchingUse = camera.bestFor.some(use => 
        usage.includes(use)
      );
      
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

  // Always return exactly 3 cameras
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more cameras from the same budget range
  const remaining = cameraData
    .filter(camera => 
      camera.price >= budgetRange.min && 
      camera.price <= budgetRange.max &&
      !filtered.includes(camera)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};