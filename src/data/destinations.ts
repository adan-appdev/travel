export type Category = 'Beach' | 'Mountain' | 'Culture' | 'City' | 'Nature';

export interface Activity {
  icon: string;
  name: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  location: {
    city: string;
    province: string;
    coordinates: { lat: number; lng: number };
  };
  category: Category;
  priceRange: {
    min: number;
    max: number;
    currency: string;
    note: string;
  };
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  activities: Activity[];
  bestTime: string;
  duration: string;
  highlights: string[];
  featured: boolean;
}

export const destinations: Destination[] = [
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'Island of the Gods',
    description: 'Emerald rice terraces, sacred temples, and world-class surf breaks make Bali Indonesia\'s crown jewel.',
    fullDescription: 'Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Immerse yourself in the spiritual culture of the Balinese people, marvel at impossibly green rice terraces cascading down hillsides, and lose yourself in the warm, turquoise waters of its famous beaches. Whether you seek adventure on world-class surf breaks, spiritual renewal at ancient Hindu temples, or simply the chance to unwind amid tropical beauty, Bali delivers an experience unlike any other in the world.',
    location: { city: 'Denpasar', province: 'Bali', coordinates: { lat: -8.3405, lng: 115.0920 } },
    category: 'Beach',
    priceRange: { min: 500000, max: 3000000, currency: 'IDR', note: 'per person/day' },
    rating: 4.9,
    reviewCount: 24830,
    image: '/images/bali.jpg',
    gallery: ['/images/bali.jpg', '/images/hero-bg.jpg', '/images/lombok.jpg'],
    activities: [
      { icon: '🏄', name: 'Surfing' },
      { icon: '🛕', name: 'Temple Tours' },
      { icon: '🌾', name: 'Rice Terrace Trek' },
      { icon: '🤿', name: 'Snorkeling' },
      { icon: '🧘', name: 'Yoga & Wellness' },
      { icon: '🎨', name: 'Art & Crafts' },
    ],
    bestTime: 'April – October',
    duration: '5–10 days',
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Kuta Beach', 'Mount Agung', 'Sacred Monkey Forest'],
    featured: true,
  },
  {
    id: 'raja-ampat',
    name: 'Raja Ampat',
    tagline: 'The Last Paradise on Earth',
    description: 'Thousands of tiny islands rising from the world\'s most biodiverse marine waters — a diver\'s ultimate dream.',
    fullDescription: 'Raja Ampat, meaning "Four Kings," is an archipelago comprising over 1,500 small islands, cays, and shoals surrounding the four main islands of Misool, Salawati, Batanta, and Waigeo. Located in the heart of the Coral Triangle, Raja Ampat holds the world\'s highest recorded marine biodiversity. Divers and snorkelers from across the globe come to witness the staggering variety of sea life found nowhere else on Earth — from manta rays and pygmy seahorses to walking sharks and vibrant coral gardens.',
    location: { city: 'Waisai', province: 'West Papua', coordinates: { lat: -0.2330, lng: 130.5220 } },
    category: 'Nature',
    priceRange: { min: 1500000, max: 5000000, currency: 'IDR', note: 'per person/day' },
    rating: 4.95,
    reviewCount: 8920,
    image: '/images/raja-ampat.jpg',
    gallery: ['/images/raja-ampat.jpg', '/images/komodo.jpg', '/images/labuan-bajo.jpg'],
    activities: [
      { icon: '🤿', name: 'Scuba Diving' },
      { icon: '🐠', name: 'Snorkeling' },
      { icon: '🚣', name: 'Kayaking' },
      { icon: '🐦', name: 'Bird Watching' },
      { icon: '⛵', name: 'Boat Tours' },
      { icon: '📸', name: 'Photography' },
    ],
    bestTime: 'October – April',
    duration: '7–14 days',
    highlights: ['Wayag Lagoon', 'Pianemo Viewpoint', 'Misool Island', 'Arborek Village', 'Manta Sandy'],
    featured: true,
  },
  {
    id: 'borobudur',
    name: 'Borobudur',
    tagline: 'World\'s Largest Buddhist Temple',
    description: 'A UNESCO World Heritage masterpiece rising from the Javanese jungle — mankind\'s greatest spiritual monument.',
    fullDescription: 'Borobudur is a 9th-century Mahayana Buddhist temple in Magelang, Central Java. It is the world\'s largest Buddhist temple and one of the greatest Buddhist monuments in the world. Built during the reign of the Sailendra Dynasty, Borobudur is designed as a giant mandala and decorated with 2,672 relief panels and 504 Buddha statues. A central dome is surrounded by 72 Buddha statues, each seated inside a perforated stupa. Visiting at sunrise, as mist rolls through the valley below, is one of the most transcendent experiences on Earth.',
    location: { city: 'Magelang', province: 'Central Java', coordinates: { lat: -7.6079, lng: 110.2038 } },
    category: 'Culture',
    priceRange: { min: 200000, max: 800000, currency: 'IDR', note: 'per person/day' },
    rating: 4.8,
    reviewCount: 31540,
    image: '/images/borobudur.jpg',
    gallery: ['/images/borobudur.jpg', '/images/yogyakarta.jpg', '/images/bromo.jpg'],
    activities: [
      { icon: '🏛️', name: 'Temple Exploration' },
      { icon: '🌅', name: 'Sunrise Tour' },
      { icon: '🚴', name: 'Cycling Tour' },
      { icon: '🙏', name: 'Meditation' },
      { icon: '🎭', name: 'Cultural Shows' },
      { icon: '🍜', name: 'Local Cuisine' },
    ],
    bestTime: 'May – September',
    duration: '1–3 days',
    highlights: ['Main Temple Complex', 'Sunrise Viewpoint', 'Pawon Temple', 'Mendut Temple', 'Punthuk Setumbu Hill'],
    featured: true,
  },
  {
    id: 'komodo',
    name: 'Komodo National Park',
    tagline: 'Land of the Dragons',
    description: 'Ancient Komodo dragons roam volcanic islands above some of the world\'s most spectacular coral reefs.',
    fullDescription: 'Komodo National Park, a UNESCO World Heritage Site and one of the New Seven Wonders of Nature nominees, is home to the legendary Komodo dragon — the world\'s largest living lizard. The park encompasses three large islands and 26 smaller ones, all rising dramatically from the sea. But Komodo is far more than its famous reptiles: the surrounding waters are among the richest marine ecosystems on the planet, featuring vibrant coral reefs, manta rays, dugongs, and the famous "Pink Beach" — one of only seven in the world.',
    location: { city: 'Labuan Bajo', province: 'East Nusa Tenggara', coordinates: { lat: -8.5500, lng: 119.4800 } },
    category: 'Nature',
    priceRange: { min: 800000, max: 3500000, currency: 'IDR', note: 'per person/day' },
    rating: 4.85,
    reviewCount: 15670,
    image: '/images/komodo.jpg',
    gallery: ['/images/komodo.jpg', '/images/labuan-bajo.jpg', '/images/raja-ampat.jpg'],
    activities: [
      { icon: '🦎', name: 'Dragon Trekking' },
      { icon: '🏖️', name: 'Pink Beach' },
      { icon: '🤿', name: 'Diving' },
      { icon: '⛵', name: 'Sailing' },
      { icon: '🐋', name: 'Marine Wildlife' },
      { icon: '🧗', name: 'Hiking' },
    ],
    bestTime: 'April – December',
    duration: '3–5 days',
    highlights: ['Komodo Island', 'Rinca Island', 'Pink Beach', 'Manta Point', 'Padar Island Viewpoint'],
    featured: true,
  },
  {
    id: 'bromo',
    name: 'Mount Bromo',
    tagline: 'Where Earth Breathes Fire',
    description: 'Stand on the rim of an active volcano at sunrise, watching smoke billow over a vast sea of ash and clouds.',
    fullDescription: 'Mount Bromo is an active volcano and part of the Tengger massif in East Java. Standing at 2,329 meters, it sits within the "Sea of Sand," a vast volcanic plain surrounded by steep cliffs inside the Tengger caldera. The iconic view from the Penanjakan viewpoint — with Bromo\'s smoking crater surrounded by the caldera, Mt. Semeru in the background, and the rising sun painting the sky in brilliant colors — is one of the most photographed scenes in Southeast Asia. The surrounding region is home to the Tenggerese people, who maintain ancient traditions and hold the spectacular Kasada ceremony annually.',
    location: { city: 'Probolinggo', province: 'East Java', coordinates: { lat: -7.9425, lng: 112.9530 } },
    category: 'Mountain',
    priceRange: { min: 300000, max: 1200000, currency: 'IDR', note: 'per person/day' },
    rating: 4.87,
    reviewCount: 22100,
    image: '/images/bromo.jpg',
    gallery: ['/images/bromo.jpg', '/images/borobudur.jpg', '/images/yogyakarta.jpg'],
    activities: [
      { icon: '🌋', name: 'Crater Hiking' },
      { icon: '🌅', name: 'Sunrise Viewing' },
      { icon: '🐴', name: 'Horseback Riding' },
      { icon: '🏕️', name: 'Camping' },
      { icon: '📸', name: 'Photography' },
      { icon: '🌄', name: 'Jeep Tour' },
    ],
    bestTime: 'April – October',
    duration: '2–4 days',
    highlights: ['Penanjakan Viewpoint', 'Bromo Crater Rim', 'Sea of Sand', 'Mount Semeru View', 'Tengger Villages'],
    featured: false,
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    tagline: 'Heart of Javanese Culture',
    description: 'A royal city of ancient palaces, vibrant street art, master batik weavers, and legendary street food.',
    fullDescription: 'Yogyakarta, affectionately known as "Jogja," is the cultural heart of Java and one of Indonesia\'s most visited cities. Here, traditional Javanese culture thrives alongside a vibrant contemporary arts scene and bustling student life. The city is the seat of the Yogyakarta Sultanate, whose magnificent 18th-century Kraton (Royal Palace) remains at the city\'s center. Yogyakarta is the perfect base from which to explore the nearby wonders of Borobudur and Prambanan, while the city itself offers world-class batik workshops, wayang (shadow puppet) performances, and the legendary Malioboro Street shopping experience.',
    location: { city: 'Yogyakarta', province: 'Special Region of Yogyakarta', coordinates: { lat: -7.7956, lng: 110.3695 } },
    category: 'Culture',
    priceRange: { min: 150000, max: 700000, currency: 'IDR', note: 'per person/day' },
    rating: 4.75,
    reviewCount: 28900,
    image: '/images/yogyakarta.jpg',
    gallery: ['/images/yogyakarta.jpg', '/images/borobudur.jpg', '/images/bromo.jpg'],
    activities: [
      { icon: '🎭', name: 'Cultural Performances' },
      { icon: '🎨', name: 'Batik Workshop' },
      { icon: '🛕', name: 'Temple Visits' },
      { icon: '🍜', name: 'Street Food Tour' },
      { icon: '🛍️', name: 'Malioboro Shopping' },
      { icon: '🎪', name: 'Puppet Shows' },
    ],
    bestTime: 'May – October',
    duration: '3–5 days',
    highlights: ['Kraton Palace', 'Prambanan Temple', 'Malioboro Street', 'Mount Merapi', 'Taman Sari Water Castle'],
    featured: false,
  },
  {
    id: 'lombok',
    name: 'Lombok',
    tagline: 'Bali\'s Untouched Sister Island',
    description: 'Pristine beaches, the mighty volcano Rinjani, and the Gili Islands — Lombok\'s beauty has no equal.',
    fullDescription: 'Lombok is often described as "Bali before the tourists arrived." This beautiful island in West Nusa Tenggara offers a more serene and authentic Indonesian experience than its famous neighbor. The island\'s centerpiece is Mount Rinjani, Indonesia\'s second-highest volcano at 3,726 meters, whose crater lake is one of the most breathtaking sights in the archipelago. To the northwest lie the Gili Islands — Trawangan, Meno, and Air — three tiny jewels famed for their crystal waters, vibrant snorkeling, and car-free tranquility.',
    location: { city: 'Mataram', province: 'West Nusa Tenggara', coordinates: { lat: -8.5833, lng: 116.1167 } },
    category: 'Beach',
    priceRange: { min: 400000, max: 2000000, currency: 'IDR', note: 'per person/day' },
    rating: 4.82,
    reviewCount: 18450,
    image: '/images/lombok.jpg',
    gallery: ['/images/lombok.jpg', '/images/bali.jpg', '/images/raja-ampat.jpg'],
    activities: [
      { icon: '🏔️', name: 'Rinjani Trekking' },
      { icon: '🏖️', name: 'Beach Hopping' },
      { icon: '🤿', name: 'Snorkeling' },
      { icon: '🐢', name: 'Sea Turtle Watching' },
      { icon: '🚲', name: 'Cycling' },
      { icon: '🧘', name: 'Yoga Retreats' },
    ],
    bestTime: 'May – September',
    duration: '4–8 days',
    highlights: ['Gili Islands', 'Mount Rinjani', 'Senggigi Beach', 'Sembalun Valley', 'Kuta Mandalika Beach'],
    featured: true,
  },
  {
    id: 'labuan-bajo',
    name: 'Labuan Bajo',
    tagline: 'Gateway to Komodo',
    description: 'A fishing village turned world-class destination, with spectacular sunsets and access to Komodo\'s wonders.',
    fullDescription: 'Labuan Bajo is the main gateway to the Komodo National Park, situated at the western tip of Flores island. Once a humble fishing village, it has transformed into one of Indonesia\'s premier tourist destinations, attracting travelers seeking both the thrill of Komodo dragons and the splendor of its marine environment. The town\'s harbor is a picturesque scene of liveaboard boats and colorful phinisi schooners set against dramatic hillsides, particularly magical during the famous Labuan Bajo sunset. Beyond Komodo, Flores island itself offers stunning overland scenery — including the tri-colored volcanic crater lakes of Kelimutu.',
    location: { city: 'Labuan Bajo', province: 'East Nusa Tenggara', coordinates: { lat: -8.4500, lng: 119.8800 } },
    category: 'City',
    priceRange: { min: 600000, max: 2500000, currency: 'IDR', note: 'per person/day' },
    rating: 4.78,
    reviewCount: 11200,
    image: '/images/labuan-bajo.jpg',
    gallery: ['/images/labuan-bajo.jpg', '/images/komodo.jpg', '/images/raja-ampat.jpg'],
    activities: [
      { icon: '🌅', name: 'Sunset Cruises' },
      { icon: '⛵', name: 'Liveaboard Trips' },
      { icon: '🦎', name: 'Komodo Tours' },
      { icon: '🍽️', name: 'Seafood Dining' },
      { icon: '🏊', name: 'Swimming' },
      { icon: '📸', name: 'Photography' },
    ],
    bestTime: 'April – November',
    duration: '3–6 days',
    highlights: ['Puncak Waringin Viewpoint', 'Batu Cermin Cave', 'Cunca Rami Waterfall', 'Kelimutu Lake Flores', 'Golo Mori'],
    featured: false,
  },
];

export const categories: Category[] = ['Beach', 'Mountain', 'Culture', 'City', 'Nature'];

export const categoryConfig: Record<Category, { icon: string; color: string; bg: string }> = {
  Beach: { icon: '🏖️', color: 'text-cyan-700', bg: 'bg-cyan-50' },
  Mountain: { icon: '⛰️', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  Culture: { icon: '🏛️', color: 'text-amber-700', bg: 'bg-amber-50' },
  City: { icon: '🌆', color: 'text-purple-700', bg: 'bg-purple-50' },
  Nature: { icon: '🌿', color: 'text-green-700', bg: 'bg-green-50' },
};

export function formatPrice(amount: number): string {
  if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `Rp ${(amount / 1000).toFixed(0)}K`;
  return `Rp ${amount}`;
}
