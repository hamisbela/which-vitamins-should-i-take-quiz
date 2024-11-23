export interface Laptop {
  id: string;
  model: string;
  brand: string;
  price: number;
  type: 'Gaming' | 'Business' | 'Creative' | 'Student' | 'Ultrabook';
  features: string[];
  bestFor: string[];
  processor: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string;
  imageUrl: string;
  amazonUrl: string;
  description: string;
}

export const laptopData: Laptop[] = [
  {
    id: 'macbook-pro-14',
    model: 'MacBook Pro 14"',
    brand: 'Apple',
    price: 1999,
    type: 'Creative',
    features: ['M2 Pro Chip', 'Liquid Retina XDR', 'Up to 18hr Battery', 'MagSafe'],
    bestFor: ['professional', 'video', 'development'],
    processor: 'Apple M2 Pro',
    ram: '16GB',
    storage: '512GB SSD',
    display: '14.2" Liquid Retina XDR',
    gpu: 'Integrated 16-core',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Powerful MacBook Pro ideal for creative professionals and developers.'
  },
  {
    id: 'dell-xps-13',
    model: 'Dell XPS 13',
    brand: 'Dell',
    price: 1299,
    type: 'Ultrabook',
    features: ['InfinityEdge Display', 'Thunderbolt 4', 'Long Battery Life'],
    bestFor: ['business', 'student', 'portable'],
    processor: 'Intel Core i7-1260P',
    ram: '16GB',
    storage: '512GB SSD',
    display: '13.4" FHD+',
    gpu: 'Intel Iris Xe',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Premium ultrabook with excellent build quality and portability.'
  },
  {
    id: 'lenovo-legion-5',
    model: 'Lenovo Legion 5',
    brand: 'Lenovo',
    price: 1399,
    type: 'Gaming',
    features: ['165Hz Display', 'RGB Keyboard', 'NVIDIA RTX 3060'],
    bestFor: ['gaming', 'entertainment', 'content'],
    processor: 'AMD Ryzen 7 6800H',
    ram: '16GB',
    storage: '1TB SSD',
    display: '15.6" QHD 165Hz',
    gpu: 'NVIDIA RTX 3060 6GB',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Powerful gaming laptop with excellent performance and cooling.'
  },
  {
    id: 'hp-envy-x360',
    model: 'HP Envy x360',
    brand: 'HP',
    price: 899,
    type: 'Student',
    features: ['2-in-1 Design', 'Pen Support', 'All-Day Battery'],
    bestFor: ['student', 'creative', 'portable'],
    processor: 'AMD Ryzen 5 7530U',
    ram: '8GB',
    storage: '512GB SSD',
    display: '15.6" FHD Touch',
    gpu: 'AMD Radeon Graphics',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Versatile 2-in-1 laptop perfect for students and casual users.'
  },
  {
    id: 'thinkpad-x1',
    model: 'ThinkPad X1 Carbon',
    brand: 'Lenovo',
    price: 1599,
    type: 'Business',
    features: ['Military-Grade Durability', 'Privacy Features', 'TrackPoint'],
    bestFor: ['business', 'professional', 'portable'],
    processor: 'Intel Core i7-1270P',
    ram: '16GB',
    storage: '1TB SSD',
    display: '14" QHD+',
    gpu: 'Intel Iris Xe',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80',
    amazonUrl: 'https://amazon.com',
    description: 'Premium business laptop with legendary ThinkPad reliability.'
  }
];

export const budgetRanges = {
  budget: { min: 0, max: 800, label: 'Budget-Friendly' },
  midRange: { min: 801, max: 1500, label: 'Mid-Range' },
  premium: { min: 1501, max: 2500, label: 'Premium' },
  luxury: { min: 2501, max: Infinity, label: 'Luxury' }
};

export const recommendLaptop = (
  budget: keyof typeof budgetRanges,
  usage: string[],
  experience: string
): Laptop[] => {
  const budgetRange = budgetRanges[budget];
  
  const filtered = laptopData
    .filter(laptop => {
      // Budget check
      if (laptop.price < budgetRange.min || laptop.price > budgetRange.max) return false;
      
      // Usage and preferences
      const hasMatchingUse = laptop.bestFor.some(use => 
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

  // Always return exactly 3 laptops
  if (filtered.length >= 3) {
    return filtered.slice(0, 3);
  }
  
  // If we have fewer matches, add more laptops from the same budget range
  const remaining = laptopData
    .filter(laptop => 
      laptop.price >= budgetRange.min && 
      laptop.price <= budgetRange.max &&
      !filtered.includes(laptop)
    )
    .sort((a, b) => b.price - a.price);

  return [...filtered, ...remaining].slice(0, 3);
};