export interface Car {
  id: string;
  model: string;
  brand: string;
  price: number;
  type: 'Sedan' | 'SUV' | 'Sports' | 'Electric' | 'Hybrid' | 'Truck' | 'Compact';
  features: string[];
  bestFor: string[];
  engine: string;
  transmission: string;
  fuelEconomy: string;
  safety: string[];
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const carData: Car[] = [
  {
    id: 'toyota-camry',
    model: 'Camry',
    brand: 'Toyota',
    price: 26420,
    type: 'Sedan',
    features: ['Apple CarPlay', 'Android Auto', 'Safety Sense 2.5+', 'Dual-Zone Climate'],
    bestFor: ['family', 'commuting', 'reliability'],
    engine: '2.5L 4-Cylinder',
    transmission: '8-speed Automatic',
    fuelEconomy: '28 city / 39 highway MPG',
    safety: ['Pre-Collision System', 'Lane Departure Alert', 'Adaptive Cruise Control'],
    imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Reliable family sedan with excellent fuel economy and safety features.'
  },
  {
    id: 'tesla-model3',
    model: 'Model 3',
    brand: 'Tesla',
    price: 40240,
    type: 'Electric',
    features: ['Autopilot', 'Glass Roof', 'Minimalist Interior', '15" Touchscreen'],
    bestFor: ['tech-savvy', 'eco-friendly', 'luxury'],
    engine: 'Dual Motor Electric',
    transmission: 'Single-Speed',
    fuelEconomy: '134 MPGe city / 126 MPGe highway',
    safety: ['Automatic Emergency Braking', 'Side Collision Warning', '360° Cameras'],
    imageUrl: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'High-tech electric sedan with impressive range and performance.'
  },
  {
    id: 'honda-crv',
    model: 'CR-V',
    brand: 'Honda',
    price: 27400,
    type: 'SUV',
    features: ['Honda Sensing', 'Magic Seats', 'Hands-free Power Tailgate'],
    bestFor: ['family', 'versatility', 'safety'],
    engine: '1.5L Turbo 4-Cylinder',
    transmission: 'CVT',
    fuelEconomy: '28 city / 34 highway MPG',
    safety: ['Collision Mitigation', 'Road Departure Warning', 'Blind Spot Info'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'Popular compact SUV with excellent practicality and safety.'
  },
  {
    id: 'ford-f150',
    model: 'F-150',
    brand: 'Ford',
    price: 33695,
    type: 'Truck',
    features: ['Pro Power Onboard', 'Sync 4', 'Trailer Tow Package'],
    bestFor: ['work', 'towing', 'utility'],
    engine: '3.5L EcoBoost V6',
    transmission: '10-speed Automatic',
    fuelEconomy: '20 city / 24 highway MPG',
    safety: ['Pre-Collision Assist', 'Pro Trailer Backup Assist', 'Lane-Keeping System'],
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80',
    amazonUrl: '#',
    description: 'America\'s best-selling truck, perfect for work and play.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 25000, label: 'Budget-Friendly' },
  midRange: { min: 25001, max: 45000, label: 'Mid-Range' },
  premium: { min: 45001, max: 70000, label: 'Premium' },
  luxury: { min: 70001, max: Infinity, label: 'Luxury' }
};

export const recommendCar = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  type: string
): Car[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = carData
    .filter(car => {
      // Budget check
      if (car.price < budgetRange.min || car.price > budgetRange.max) return false;
      
      // Usage and preferences
      const hasMatchingUse = car.bestFor.some(use => 
        usage.includes(use)
      );
      
      // Vehicle type preference
      if (type === 'eco-friendly' && !['Electric', 'Hybrid'].includes(car.type)) return false;
      if (type === 'family' && !['SUV', 'Sedan', 'Hybrid'].includes(car.type)) return false;
      if (type === 'performance' && !['Sports', 'Electric'].includes(car.type)) return false;
      
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

  // Always return exactly 3 cars
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more cars from the same budget range
  const remaining = carData
    .filter(car => 
      car.price >= budgetRange.min && 
      car.price <= budgetRange.max &&
      !filtered.includes(car)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};