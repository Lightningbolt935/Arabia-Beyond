import { Destination, Package, Hotel, Enquiry, BookingOrder, WebsiteSettings } from './types';

export const initialDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Bahrain',
    slug: 'bahrain',
    country: 'Kingdom of Bahrain',
    tagline: 'The Island Kingdom of Natural Pearls & Dilmun Antiquity',
    description: 'An ancient Arabian maritime kingdom steeped in 5,000 years of civilization, where azure waters meet UNESCO pearling pathways, private desert equestrian estates, and secluded sandbank sanctuaries.',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-with-swimming-pools-42407-large.mp4',
    heroPosterUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=85',
    heroHeadline: 'Bahrain: The Pearling Kingdom',
    heroSubheadline: 'Private island lagoons, ancient Dilmun civilization, and purebred Arabian equestrian estates.',
    overview: 'Bahrain captivates discerning voyagers with its intimate island grace and deep maritime pedigree. From wandering the restored wind-tower merchant quarters of Muharraq along the UNESCO Pearling Path to private yacht voyages to the secluded Jarada Island sandbank, Bahrain offers aristocratic Arabian tranquility.',
    highlights: [
      {
        title: 'UNESCO Pearling Path & Royal Wind-Towers',
        description: 'Private guided walkthrough of restored coral-stone merchant palaces and the centuries-old story of Arabian Gulf natural pearls.',
        imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Secluded Sandbank Charters at Jarada',
        description: 'Chartered luxury catamaran to an ephemeral white sandbank emerging at low tide, with private butler service and crystal waters.',
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Qal\'at al-Bahrain at Sunset',
        description: 'Private sunset exploration of the 16th-century fortress guarding layers of 4,000-year-old Dilmun excavations along the shore.',
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      }
    ],
    bestTimeToVisit: {
      season: 'October to April',
      temperature: '20°C - 28°C',
      description: 'Temperate coastal breezes and clear blue skies make autumn and winter the prime season for private yachting and archaeological excursions.',
      recommendedMonths: ['November', 'December', 'January', 'February', 'March', 'April']
    },
    practicalInfo: {
      currency: 'Bahraini Dinar (BHD)',
      timeZone: 'GMT+3 (Arabia Standard Time)',
      flightDuration: '6h 45m direct from London Heathrow',
      language: 'Arabic (English spoken universally in luxury hospitality)',
      visaNotice: 'eVisa or visa-on-arrival available for UK, EU, US, and GCC passport holders.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        caption: 'Manama waterfront and private marina',
        alt: 'Bahrain skyline illuminated at dusk'
      },
      {
        url: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80',
        caption: 'Traditional carved wooden doors along Muharraq alleys',
        alt: 'Bahrain historic architecture'
      },
      {
        url: 'https://images.unsplash.com/photo-1743580839034-9d5dae99596b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic Bahrain Fort (Qal\'at al-Bahrain) UNESCO site',
        alt: 'Bahrain fort sunset'
      }
    ],
    faqs: [
      {
        question: 'Is Bahrain suitable for a luxury coastal and wellness escape?',
        answer: 'Yes, Bahrain boasts iconic 5-star beachfront resorts including The Ritz-Carlton Bahrain and Jumeirah Gulf of Bahrain, offering private lagoons, Thalassotherapy thermal spas, and secluded royal villas.'
      },
      {
        question: 'Can Bahrain be paired with Oman or Saudi Arabia?',
        answer: 'Seamlessly. Bahrain is a short 1-hour direct executive flight from Riyadh and 1.5 hours from Muscat, making it an ideal beginning or conclusion to a grand Arabian voyage.'
      }
    ],
    metaTitle: 'Luxury Bahrain Holidays & Bespoke Escapes | Arab & Beyond',
    metaDescription: 'Discover luxury holidays in Bahrain. Private island resorts, UNESCO pearling history, and bespoke luxury escapes with Arab & Beyond.',
    featuredOnHome: true,
    active: true,
    displayOrder: 1,
  },
  {
    id: 'dest-2',
    name: 'Oman',
    slug: 'oman',
    country: 'Sultanate of Oman',
    tagline: 'Sultanate of Grand Canyons, Frankincense & Timeless Nobility',
    description: 'An untouched Arabian empire of jagged 2,000-meter peaks, cobalt ocean fjords, singing Wahiba dunes, and frankincense-perfumed souqs preserved with aristocratic authenticity.',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-desert-landscape-with-sand-dunes-under-a-clear-blue-sky-42792-large.mp4',
    heroPosterUrl: 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=2000&q=85',
    heroHeadline: 'Oman: The Soul of Arabia',
    heroSubheadline: 'Clifftop mountain retreats, starlit luxury desert camps, and the white dome heritage of Muscat.',
    overview: 'The Sultanate of Oman is revered by luxury travelers for its proud preservation of heritage and astonishing natural diversity. Unlike hyper-modern metropolises, Oman strictly enforces white Arabesque architecture, carved wooden porticos, and grand stone forts. From the cool summits of Jabal Akhdar to the golden silence of the Wahiba Sands, Oman offers a deeply grounding, noble journey.',
    highlights: [
      {
        title: 'Jabal Akhdar 2,000m Canyon Rim',
        description: 'Perched on dramatic limestone precipices at Alila Jabal Akhdar with private canyon treks, stargazing, and ancient pomegranate terraces.',
        imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Sultan Qaboos Grand Mosque & Muscat Souq',
        description: 'Private architectural tours of grand marble courtyards, handwoven Persian carpets, and the rare frankincense alleys of Mutrah.',
        imageUrl: 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Wahiba Sands Royal Desert Camp',
        description: 'Private luxury tented camp set deep in towering dunes, with traditional Omani Shuwa feasts, falconry, and oud music under the stars.',
        imageUrl: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=800&q=80',
      }
    ],
    bestTimeToVisit: {
      season: 'October to April',
      temperature: '18°C - 28°C (Canyon summits: 12°C - 20°C)',
      description: 'Crisp mountain air, temperate coastal waters, and starry desert nights make autumn and winter the golden season to explore the Sultanate.',
      recommendedMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April']
    },
    practicalInfo: {
      currency: 'Omani Rial (OMR)',
      timeZone: 'GMT+4',
      flightDuration: '7h 15m direct from London Heathrow to Muscat',
      language: 'Arabic & English',
      visaNotice: 'Online eVisa system. VIP tarmac meet-and-greet transfers arranged for all guests.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hajar Mountain dramatic canyon gorge',
        alt: 'Oman mountain peaks'
      },
      {
        url: 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sultan Qaboos Grand Mosque marble arches',
        alt: 'Grand Mosque Muscat'
      },
      {
        url: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Golden rippling dunes of Wahiba Sands at dusk',
        alt: 'Oman desert dunes'
      }
    ],
    faqs: [
      {
        question: 'How many days are recommended for an Oman luxury itinerary?',
        answer: 'We recommend 7 to 10 nights to experience coastal Muscat, the Hajar Mountain summits, and the Wahiba desert without rushing.'
      },
      {
        question: 'Are private 4WD vehicles and expert guides included?',
        answer: 'Yes, all Arab & Beyond Oman itineraries feature private luxury 4WD vehicles (such as Lexus LX or Land Cruiser VIP) with certified English-speaking Omani luxury guides.'
      }
    ],
    metaTitle: 'Luxury Oman Holidays & Private Tours | Arab & Beyond',
    metaDescription: 'Experience luxury travel in Oman. High mountain resorts in Jabal Akhdar, bespoke desert camps in Wahiba Sands, and five-star Muscat retreats.',
    featuredOnHome: true,
    active: true,
    displayOrder: 2,
  },
  {
    id: 'dest-3',
    name: 'Saudi Arabia',
    slug: 'saudi-arabia',
    country: 'Kingdom of Saudi Arabia',
    tagline: 'Monumental Nabataean Tombs & Royal Palatial Splendour',
    description: 'A grand cultural renaissance where monumental rock tombs carved into rose sandstone at AlUla meet the soaring skyline of Riyadh and the mud-brick palaces of UNESCO Diriyah.',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-camera-flying-over-a-desert-with-sand-dunes-and-rock-formations-43302-large.mp4',
    heroPosterUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=2000&q=85',
    heroHeadline: 'Saudi Arabia: The Ancient Frontier',
    heroSubheadline: 'Private jet charters to AlUla, Michelin dining in historic Diriyah, and royal suites in Riyadh.',
    overview: 'Saudi Arabia represents one of the most awe-inspiring cultural openings of our time. Arab & Beyond provides unprecedented access to the Kingdom’s most monumental treasures: private archaeologist-guided walkthroughs of UNESCO Hegra tombs, mirrored reflections at Maraya Hall, and palatial stays in Riyadh.',
    highlights: [
      {
        title: 'AlUla & UNESCO Hegra Tombs',
        description: 'Exclusive after-hours access to the monumental tombs carved into sandstone massifs by Nabataean artisans over 2,000 years ago.',
        imageUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'UNESCO Diriyah & At-Turaif District',
        description: 'Private tour through the ancestral mud-brick palace quarter of the royal family, overlooking Bujairi Terrace.',
        imageUrl: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Ashar Valley Sandstone Sanctuaries',
        description: 'Stay in ultra-luxury canyon villas nestled into natural rock amphitheaters at Habitas AlUla and Banyan Tree.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      }
    ],
    bestTimeToVisit: {
      season: 'October to April',
      temperature: '15°C - 26°C in AlUla; 20°C - 28°C in Riyadh',
      description: 'Pleasant, dry sunny days and crisp desert nights make winter the ultimate season for desert exploration and private cultural concerts.',
      recommendedMonths: ['November', 'December', 'January', 'February', 'March']
    },
    practicalInfo: {
      currency: 'Saudi Riyal (SAR)',
      timeZone: 'GMT+3',
      flightDuration: '6h 30m direct to Riyadh or Jeddah from London',
      language: 'Arabic & English',
      visaNotice: 'Instant Tourist eVisa issued online in minutes for UK, EU, and US citizens. Managed directly by our concierge.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80',
        caption: 'AlUla ancient sandstone canyons and tombs',
        alt: 'AlUla Saudi Arabia'
      },
      {
        url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Riyadh modern illuminated capital skyline',
        alt: 'Riyadh modern skyline'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Canyon luxury villa in the Ashar Valley oasis',
        alt: 'Luxury desert villa Saudi'
      }
    ],
    faqs: [
      {
        question: 'What are the cultural norms for luxury travelers?',
        answer: 'Modern Saudi Arabia is warm and exceptionally welcoming to international voyagers. Elegant, modest resort wear is standard. In public city areas, attire covering shoulders and knees is customary.'
      },
      {
        question: 'How do guests travel between Riyadh and AlUla?',
        answer: 'We arrange premium business-class commercial flights or private executive jet charters direct to AlUla International Airport with VIP lounge tarmac transfers.'
      }
    ],
    metaTitle: 'Saudi Arabia Luxury Tours & Private Holidays | Arab & Beyond',
    metaDescription: 'Experience Saudi Arabia luxury travel. Private tours of AlUla Hegra, exclusive Riyadh retreats, and bespoke desert expeditions.',
    featuredOnHome: true,
    active: true,
    displayOrder: 3,
  },
  {
    id: 'dest-4',
    name: 'The Red Sea',
    slug: 'the-red-sea',
    country: 'Saudi Arabia',
    isRegionOf: 'Saudi Arabia',
    tagline: 'The World\'s Most Pristine Ultra-Luxury Regenerative Archipelago',
    description: 'An untouched marine wonder of 90 barrier reef islands, turquoise lagoons, crystal sands, and visionary overwater architectural sanctuaries powered by 100% renewable energy.',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-with-swimming-pools-42407-large.mp4',
    heroPosterUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
    heroHeadline: 'The Red Sea: Pure Coral Sanctuaries',
    heroSubheadline: 'Overwater curved villas, private seaplane transfers, and unblemished barrier reefs on the Arabian coast.',
    overview: 'Set along Saudi Arabia’s western coastline, The Red Sea is a standalone ultra-luxury archipelago that rivals the Maldives and French Polynesia. Home to the world’s fourth-largest barrier reef system, it offers crystal visibility for diving, dolphin sanctuaries, and futuristic villas at The St. Regis Red Sea Resort and Nujuma, a Ritz-Carlton Reserve.',
    highlights: [
      {
        title: 'Ummahat Island & Overwater Coral Villas',
        description: 'Curved shell-inspired overwater villas suspended over crystal lagoons with private infinity pools and dedicated St. Regis butler service.',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Pristine Barrier Reef Private Diving',
        description: 'Explore untouched coral gardens teeming with green sea turtles, dugongs, and over 1,200 fish species with private marine biologists.',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Zero-Emission Hydrofoil Water Sports',
        description: 'Electric hydrofoils, catamaran sunset cruises, and private stargazing over dark-sky marine reserves.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      }
    ],
    bestTimeToVisit: {
      season: 'October to May',
      temperature: '22°C - 31°C; Water: 25°C - 28°C',
      description: 'Pleasant coastal sea breezes and pristine water clarity make winter and spring paradise for yachting, snorkeling, and barefoot luxury.',
      recommendedMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May']
    },
    practicalInfo: {
      currency: 'Saudi Riyal (SAR)',
      timeZone: 'GMT+3',
      flightDuration: 'Direct flights to Red Sea International Airport (RSI) via Riyadh, Jeddah, or Dubai',
      language: 'English & Arabic',
      visaNotice: 'Accessible under standard Saudi eVisa. Private boat and seaplane transfers connect directly from Red Sea International terminal.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Overwater luxury villas suspended over turquoise lagoon',
        alt: 'The Red Sea overwater resort'
      },
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pristine coral barrier reef and marine life',
        alt: 'Red sea coral diving'
      },
      {
        url: 'https://images.unsplash.com/photo-1707343848552-893e05dba6ac?auto=format&fit=crop&w=1200&q=80',
        caption: 'White sand barefoot beaches on private archipelago islands',
        alt: 'The Red Sea island beach'
      }
    ],
    faqs: [
      {
        question: 'How do guests reach the private island resorts?',
        answer: 'Guests arrive into Red Sea International Airport (RSI), designed by Foster + Partners, and are transferred by chartered seaplane or electric luxury yacht directly to island jetties.'
      },
      {
        question: 'Is The Red Sea independent from mainland Saudi itineraries?',
        answer: 'Yes, it operates as a distinct world-class island getaway, but pairs seamlessly with AlUla or Riyadh for a multi-destination grand voyage.'
      }
    ],
    metaTitle: 'The Red Sea Luxury Island Resorts & Holidays | Arab & Beyond',
    metaDescription: 'Discover The Red Sea, Saudi Arabia\'s ultra-luxury archipelago. Overwater villas at The St. Regis and Nujuma Ritz-Carlton Reserve.',
    featuredOnHome: true,
    active: true,
    displayOrder: 4,
  },
  {
    id: 'dest-5',
    name: 'Qatar',
    slug: 'qatar',
    country: 'State of Qatar',
    tagline: 'Modern Arabian Splendour, Islamic Art & Desert Coastal Serenity',
    description: 'A dazzling peninsula where I.M. Pei\'s iconic Museum of Islamic Art graces the Corniche, Souq Waqif whispers ancient falconry traditions, and the Inland Sea meets singing desert dunes.',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-modern-city-at-night-with-skyscrapers-42099-large.mp4',
    heroPosterUrl: 'https://images.unsplash.com/photo-1724614766636-3ddd7ea39804?auto=format&fit=crop&w=2000&q=85',
    heroHeadline: 'Qatar: Refined Culture & Coastal Splendour',
    heroSubheadline: 'Private museum curators, Michelin-starred gastronomy, and private dhow sailings along the Doha Corniche.',
    overview: 'Qatar has established itself as the cultural jewel of the modern Arab world. With masterpieces of contemporary architecture like the National Museum of Qatar and Katara Cultural Village, paired with stays at Mandarin Oriental Msheireb and private island getaways at Banana Island Resort, Qatar delivers polished, effortless luxury.',
    highlights: [
      {
        title: 'Museum of Islamic Art Private Curator Tour',
        description: 'Exclusive private after-hours walkthrough across 1,400 years of imperial carpets, calligraphy, and gems.',
        imageUrl: 'https://images.unsplash.com/photo-1724614766636-3ddd7ea39804?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'The Inland Sea (Khor Al Adaid) Safari',
        description: 'UNESCO-recognized natural wonder where ocean tides surge into towering desert dunes, accessible only by luxury 4WD.',
        imageUrl: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Msheireb Downtown & Souq Waqif Falconry',
        description: 'Architectural district blending modern sustainability with the authentic spice and falconry alleys of traditional Souq Waqif.',
        imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      }
    ],
    bestTimeToVisit: {
      season: 'October to April',
      temperature: '19°C - 27°C',
      description: 'Pleasant coastal winter warmth makes dining outdoors on the marina and exploring desert dunes sublime.',
      recommendedMonths: ['November', 'December', 'January', 'February', 'March', 'April']
    },
    practicalInfo: {
      currency: 'Qatari Riyal (QAR)',
      timeZone: 'GMT+3',
      flightDuration: '6h 50m direct from London Heathrow to Hamad International',
      language: 'Arabic & English',
      visaNotice: 'Visa-free entry for citizens of over 100 countries including UK, US, Canada, EU.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1792930568968-93840b84840a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Doha glittering West Bay skyline across the bay',
        alt: 'Doha Corniche skyline'
      },
      {
        url: 'https://images.unsplash.com/photo-1724614766636-3ddd7ea39804?auto=format&fit=crop&w=1200&q=80',
        caption: 'Museum of Islamic Art and Doha palm promenade',
        alt: 'Museum of Islamic Art Doha'
      },
      {
        url: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Khor Al Adaid inland sea where ocean meets desert dunes',
        alt: 'Qatar Inland Sea'
      }
    ],
    faqs: [
      {
        question: 'Is Doha a good stopover or full luxury holiday destination?',
        answer: 'Both! Doha offers fabulous 3-4 night city and desert breaks, or provides a supreme 7-night leisure stay at private island resorts like Banana Island.'
      },
      {
        question: 'Are private dhow charters available for sunset dinners?',
        answer: 'Yes, Arab & Beyond arranges private luxury dhow sailings with private chefs serving five-course Arabian Gulf seafood menus.'
      }
    ],
    metaTitle: 'Luxury Qatar Holidays & Doha City Breaks | Arab & Beyond',
    metaDescription: 'Experience luxury travel in Qatar. Mandarin Oriental Doha stays, private desert safaris to the Inland Sea, and cultural tours with Arab & Beyond.',
    featuredOnHome: true,
    active: true,
    displayOrder: 5,
  }
];

export const initialPackages: Package[] = [
  // 1. Bahrain: Manama Luxury City Escape
  {
    id: 'pkg-1',
    name: 'Manama Luxury City Escape',
    slug: 'manama-luxury-city-escape',
    destinationId: 'dest-1',
    destinationSlug: 'bahrain',
    destinationName: 'Bahrain',
    cities: ['Manama', 'Muharraq'],
    durationDays: 4,
    durationNights: 3,
    travelStyle: 'Luxury Escapes',
    groupType: 'Flexible Dates',
    priceFrom: 1850,
    currency: 'GBP',
    isPriceOnRequest: false,
    status: 'live',
    isFeatured: true,
    badge: 'Popular Short Break',
    shortSummary: 'A 4-day weekend of private island resort elegance, Michelin-starred waterfront dining, and bespoke private tours of Bahrain\'s UNESCO Pearling Path.',
    fullDescription: 'Indulge in an exquisite 4-day private getaway based at The Ritz-Carlton Bahrain. Enjoy a secluded private beach and lagoon, chartered sunset boat cruises along the modern skyline, and an exclusive walking journey through historic Muharraq with a local pearl historian.',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', caption: 'Manama luxury marina and coastline', alt: 'Manama marina' },
      { url: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80', caption: 'Historic Muharraq UNESCO architecture', alt: 'Muharraq historic street' }
    ],
    highlights: [
      '3 nights at The Ritz-Carlton Bahrain in a Club Ocean Room with dedicated lounge access',
      'Private guided excursion through the UNESCO Pearling Path and Sheikh Isa bin Ali House',
      'Sunset champagne cruise along Manama Bay aboard a private yacht',
      'VIP airport tarmac meet-and-greet with luxury chauffeured Mercedes S-Class transfers'
    ],
    inclusions: [
      '3 nights luxury 5-star accommodation at The Ritz-Carlton Bahrain',
      'Daily gourmet breakfast and Club Lounge dining presentations',
      'Private luxury vehicle with chauffeur throughout the stay',
      'Private licensed English-speaking guide for all excursions',
      'All entrance fees, private yacht charter, and applicable tourism taxes'
    ],
    exclusions: [
      'International flights (can be quoted upon request)',
      'Personal travel insurance',
      'Discretionary gratuities'
    ],
    accommodationsSummary: 'The Ritz-Carlton Bahrain (Club Ocean Room or 3-Bedroom Seafront Villa upgrade)',
    linkedHotelIds: ['hotel-1'],
    departureDates: [
      { id: 'dep-101', startDate: '2026-11-20', endDate: '2026-11-23', pricePerPerson: 1850, singleSupplement: 450, status: 'available', allocationLeft: 4 },
      { id: 'dep-102', startDate: '2026-12-10', endDate: '2026-12-13', pricePerPerson: 1980, singleSupplement: 480, status: 'available', allocationLeft: 2 }
    ],
    meetingPoint: 'Bahrain International Airport (BAH) - VIP Arrivals Lounge',
    suitableFor: ['Couples', 'Solo Travellers', 'Short Break Seekers'],
    activityLevel: 'Gentle',
    accessibilityNotes: 'Fully wheelchair accessible vehicles and level hotel access throughout.',
    visaNotice: 'eVisa or Visa on Arrival available for British, EU and US passport holders. Verified by concierge upon booking.',
    cancellationPolicy: 'Complimentary cancellation up to 21 days before departure.',
    primaryCtaType: 'book_now',
    metaTitle: 'Manama Luxury City Escape 4-Day Holiday | Arab & Beyond',
    metaDescription: 'Book the 4-day Manama Luxury City Escape. 5-star Ritz-Carlton stay, private yacht cruise, UNESCO pearling history.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Manama & Sunset Coastal Cruise',
        location: 'Manama',
        overnightLocation: 'The Ritz-Carlton Bahrain, Manama',
        hotelName: 'The Ritz-Carlton Bahrain',
        summary: 'VIP airport meet-and-greet, luxury check-in, afternoon spa relaxation, and private evening yacht sail.',
        description: [
          'Arrive at Bahrain International Airport where our VIP airport concierge meets you at the aircraft door and whisks you through private passport control to your chauffeured Mercedes S-Class.',
          'Transfer to The Ritz-Carlton Bahrain situated on its own private lagoon. Spend the afternoon unwinding by the private beach or enjoying the Thalassotherapy spa pool.',
          'At dusk, board our private motor yacht for a 2-hour champagne and canapé cruise admiring the illuminated skyline of Manama.'
        ],
        schedule: {
          morning: 'Arrival and private VIP tarmac transfer',
          afternoon: 'Check-in and spa leisure at The Ritz-Carlton',
          evening: 'Private sunset yacht cruise with champagne and canapés'
        },
        includedActivities: ['VIP airport fast-track', 'Private sunset yacht cruise'],
        mealsIncluded: ['Dinner'],
        transfers: 'Private Mercedes-Benz S-Class chauffeur',
        images: [{ url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80', caption: 'Arrival and luxury bay views', alt: 'Bahrain sunset harbor' }]
      },
      {
        dayNumber: 2,
        title: 'UNESCO Pearling Path & Royal Bahrain Heritage',
        location: 'Muharraq & Manama',
        overnightLocation: 'The Ritz-Carlton Bahrain, Manama',
        hotelName: 'The Ritz-Carlton Bahrain',
        summary: 'Discover the pearling legacy of Muharraq, private merchant mansions, and Qal\'at al-Bahrain.',
        description: [
          'After breakfast on the terrace, depart with your private historian to Muharraq, Bahrain\'s historical capital. Walk along the UNESCO Pearling Path, visiting the exquisite Kurar House, Bin Matar House, and restored coral-stone wind-tower architecture.',
          'Enjoy a traditional lunch at a restored heritage restaurant sampling local delicacies such as spiced hammour fish and saffron dates.',
          'Late afternoon visit to Qal\'at al-Bahrain (Bahrain Fort), an imposing fortress guarding layers of 4,000-year-old Dilmun excavations.'
        ],
        includedActivities: ['Private Pearling Path walking tour', 'Bahrain Fort guided exploration'],
        mealsIncluded: ['Breakfast', 'Lunch'],
        transfers: 'Private luxury Mercedes throughout',
        images: [{ url: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1000&q=80', caption: 'Muharraq historic pearl architecture', alt: 'Pearling path Bahrain' }]
      },
      {
        dayNumber: 3,
        title: 'Private Sandbank Charter to Jarada Island',
        location: 'Jarada Island & Arabian Gulf',
        overnightLocation: 'The Ritz-Carlton Bahrain, Manama',
        hotelName: 'The Ritz-Carlton Bahrain',
        summary: 'Full-day private boat expedition to the ephemeral white sandbank of Jarada with private chef barbecue.',
        description: [
          'Cruise out into the Arabian Gulf aboard a luxury catamaran to Jarada Island, an enchanting white sandbank that emerges only with the falling tide.',
          'Swim in crystal turquoise waters, snorkel above living coral patches, or relax under private luxury cabanas while your private chef prepares grilled seafood, freshly caught Gulf prawns, and chilled refreshments.',
          'Return to the hotel in the late afternoon for a farewell dinner at CUT by Wolfgang Puck.'
        ],
        includedActivities: ['Private Jarada Island catamaran expedition', 'Snorkeling equipment and beach butler'],
        mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
        transfers: 'Private catamaran & chauffeured transfer',
        images: [{ url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80', caption: 'Turquoise waters of Jarada Island', alt: 'Jarada island sandbank' }]
      },
      {
        dayNumber: 4,
        title: 'Artisan Souq & Farewell Transfer',
        location: 'Manama',
        overnightLocation: 'Homebound Flight',
        summary: 'Morning visit to Bab Al Bahrain spices and gold souq, leisurely late check-out, and VIP airport transfer.',
        description: [
          'Spend a leisurely morning browsing the Bab Al Bahrain souq with your guide, sourcing rare natural pearls, oud perfumes, and Bahraini halwa confectionary.',
          'Enjoy guaranteed 4:00 PM late check-out at The Ritz-Carlton before your chauffeur transfers you to the VIP departures lounge for your flight home.'
        ],
        includedActivities: ['Private guided souq walking tour', 'Late check-out guaranteed'],
        mealsIncluded: ['Breakfast'],
        transfers: 'Chauffeured Mercedes transfer to BAH airport',
        images: [{ url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80', caption: 'Final views of Manama waterfront', alt: 'Bahrain luxury promenade' }]
      }
    ]
  },

  // 2. Bahrain: Bahrain Heritage and Coastal Retreat
  {
    id: 'pkg-2',
    name: 'Bahrain Heritage and Coastal Retreat',
    slug: 'bahrain-heritage-and-coastal-retreat',
    destinationId: 'dest-1',
    destinationSlug: 'bahrain',
    destinationName: 'Bahrain',
    cities: ['Zallaq', 'Al Areen', 'Manama'],
    durationDays: 6,
    durationNights: 5,
    travelStyle: 'Wellness & Marine',
    groupType: 'Private Only',
    priceFrom: 2750,
    currency: 'GBP',
    isPriceOnRequest: false,
    status: 'live',
    isFeatured: false,
    shortSummary: 'A 6-day coastal sanctuary at Jumeirah Gulf of Bahrain with ancient Dilmun burial mounds, Thalassotherapy wellness, and purebred Arabian horse riding.',
    fullDescription: 'Discover the untamed southwestern coast of Bahrain. Unwind at the palatial Jumeirah Gulf of Bahrain Resort & Spa, featuring panoramic sea-facing suites, private desert horseback excursions, and deep heritage excursions into the mysterious UNESCO Dilmun Burial Mounds.',
    heroImage: 'https://images.unsplash.com/photo-1743580839034-9d5dae99596b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1743580839034-9d5dae99596b?auto=format&fit=crop&w=1200&q=80', caption: 'Historic Bahrain Fort UNESCO monument', alt: 'Bahrain Fort' },
      { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', caption: 'Zallaq coastal beach serenity', alt: 'Bahrain coast' }
    ],
    highlights: [
      '5 nights in an Ocean View Suite at Jumeirah Gulf of Bahrain Resort',
      'Daily Talise Spa wellness treatments including heated Thalassotherapy pools',
      'Archaeologist-led private tour of the UNESCO Dilmun Burial Mounds & Saar settlements',
      'Sunset purebred Arabian horse riding along the virgin southwestern beaches'
    ],
    inclusions: [
      '5 nights luxury accommodation at Jumeirah Gulf of Bahrain',
      'Daily gourmet breakfast and 3 bespoke 3-course dinners',
      'Private 4x4 vehicles and executive Mercedes transfers',
      'Two 60-minute Talise Spa therapies per person'
    ],
    exclusions: ['International airfare', 'Gratuities'],
    accommodationsSummary: 'Jumeirah Gulf of Bahrain Resort & Spa (Ocean Suite)',
    linkedHotelIds: ['hotel-2'],
    departureDates: [
      { id: 'dep-201', startDate: '2026-11-25', endDate: '2026-11-30', pricePerPerson: 2750, singleSupplement: 650, status: 'available', allocationLeft: 3 }
    ],
    meetingPoint: 'Bahrain International Airport (BAH)',
    suitableFor: ['Wellness Seekers', 'Couples', 'History Enthusiasts'],
    activityLevel: 'Gentle',
    accessibilityNotes: 'Wheelchair accessible resort and adapted touring vehicles.',
    visaNotice: 'Tourist eVisa required. Assisted by Arab & Beyond concierge.',
    cancellationPolicy: 'Full refund up to 30 days prior to arrival.',
    primaryCtaType: 'enquire_now',
    metaTitle: 'Bahrain Heritage & Coastal Retreat | Arab & Beyond',
    metaDescription: '6-day luxury wellness retreat at Jumeirah Gulf of Bahrain. Private Arabian horse riding, Dilmun archaeology, and Talise Spa.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival into Coastal Splendour',
        location: 'Zallaq Coast',
        overnightLocation: 'Jumeirah Gulf of Bahrain Resort',
        hotelName: 'Jumeirah Gulf of Bahrain',
        summary: 'Arrival and private transfer across the desert to the tranquil southwestern coast of Bahrain.',
        description: ['Touch down at Bahrain International Airport and journey south to Zallaq Coast. Check into your Ocean View Suite at Jumeirah Gulf of Bahrain. Evening welcome dinner on the beachfront terrace.'],
        includedActivities: ['VIP arrival transfer'],
        mealsIncluded: ['Dinner'],
        transfers: 'Executive Mercedes-Benz',
        images: [{ url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80', caption: 'Coastal retreat view', alt: 'Bahrain resort pool' }]
      }
    ]
  },

  // 3. Oman: Muscat, Mountains and Desert (Section 35: EXACT 7-DAY DEMO ITINERARY)
  {
    id: 'pkg-3',
    name: 'Muscat, Mountains and Desert',
    slug: 'muscat-mountains-and-desert',
    destinationId: 'dest-2',
    destinationSlug: 'oman',
    destinationName: 'Oman',
    cities: ['Muscat', 'Jabal Akhdar', 'Wahiba Sands', 'Nizwa'],
    durationDays: 7,
    durationNights: 6,
    travelStyle: 'Luxury Escapes',
    groupType: 'Private Only',
    priceFrom: 3450,
    currency: 'GBP',
    isPriceOnRequest: false,
    status: 'live',
    isFeatured: true,
    badge: 'Signature Expedition',
    shortSummary: 'The definitive 7-day luxury voyage through Oman: beachfront Arabesque serenity in Muscat, dramatic 2,000m canyon clifftops at Alila Jabal Akhdar, and starry desert dunes in Wahiba Sands.',
    fullDescription: 'Our flagship voyage across the Sultanate of Oman. Seamlessly transitioning from the palm water gardens and white Arabesque colonnades of The Chedi Muscat to the awe-inspiring 2,000-meter cliffs of the Hajar Mountains, and concluding in the golden silence of the Wahiba Sands. Operated exclusively with private Lexus 4WD vehicles and senior Omani cultural guides.',
    heroImage: 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'Hajar Mountains canyon view from Alila', alt: 'Jabal Akhdar mountain resort' },
      { url: 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=1200&q=80', caption: 'Sultan Qaboos Grand Mosque Muscat', alt: 'Muscat Grand Mosque' },
      { url: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=1200&q=80', caption: 'Wahiba Sands luxury desert camp sunset', alt: 'Wahiba desert dunes' }
    ],
    highlights: [
      '2 nights at The Chedi Muscat in a Serai Club Room with beachside cabana dining',
      '2 nights at Alila Jabal Akhdar perched on the precipice of a 2,000m canyon gorge',
      '1 night in a bespoke air-conditioned luxury tented camp in the heart of Wahiba Sands',
      '1 final night at a secluded coastal luxury resort near Muscat',
      'Private modern Lexus LX 4WD with expert Omani chauffeur-guide throughout',
      'Private sunset dolphin and coastal fjord catamaran sailing in the Gulf of Oman'
    ],
    inclusions: [
      '6 nights luxury accommodation in handpicked 5-star properties',
      'Daily breakfast, 4 gourmet lunches, and 4 multi-course dinners',
      'Private luxury 4WD transport with unlimited mileage, bottled mineral water, and refreshments',
      'Private certified English-speaking Omani luxury guide',
      'All entrance fees to forts, museums, and natural reserves',
      'VIP Oman airside tarmac arrival assistance'
    ],
    exclusions: [
      'International flights',
      'Travel insurance (mandatory)',
      'Alcoholic drinks beyond specified tasting pairings'
    ],
    accommodationsSummary: 'The Chedi Muscat (Serai Club Suite), Alila Jabal Akhdar (Mountain View Suite), Desert Nights Luxury Camp (Deluxe Pool Tent)',
    linkedHotelIds: ['hotel-3', 'hotel-4'],
    departureDates: [
      { id: 'dep-301', startDate: '2026-11-18', endDate: '2026-11-24', pricePerPerson: 3450, singleSupplement: 890, status: 'available', allocationLeft: 4 },
      { id: 'dep-302', startDate: '2026-12-05', endDate: '2026-12-11', pricePerPerson: 3750, singleSupplement: 950, status: 'limited', allocationLeft: 2 }
    ],
    meetingPoint: 'Muscat International Airport (MCT) - VIP Protocol Lounge',
    suitableFor: ['Discerning Travelers', 'Couples', 'Photographers', 'Small Luxury Groups'],
    activityLevel: 'Moderate',
    accessibilityNotes: 'Mountain trails involve uneven stone surfaces; hotel properties offer step-free accessibility.',
    visaNotice: 'eVisa pre-issued online. Concierge assists with visa formality check.',
    cancellationPolicy: 'Deposit refundable up to 35 days prior to departure.',
    primaryCtaType: 'book_now',
    metaTitle: 'Muscat, Mountains and Desert 7-Day Oman Itinerary | Arab & Beyond',
    metaDescription: 'The definitive 7-day luxury Oman itinerary. The Chedi Muscat, Alila Jabal Akhdar canyon resort, and Wahiba Sands luxury camp.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Muscat: Meet-and-Greet, Private Airport Transfer & Relaxation',
        location: 'Muscat',
        overnightLocation: 'Muscat',
        hotelName: 'The Chedi Muscat',
        summary: 'Meet-and-greet, private airport transfer, luxury hotel check-in, time to relax, optional evening promenade.',
        description: [
          'Arrive at Muscat International Airport where your Arab & Beyond concierge receives you immediately upon disembarking. Enjoy swift escort through dedicated VIP immigration and luggage retrieval before stepping into your waiting Lexus LX.',
          'Transfer to The Chedi Muscat, set amidst 21 acres of tranquil water gardens facing the Gulf of Oman. Check into your Serai Club Suite and take time to relax beside the 103-meter Long Pool, the longest pool in the Middle East.',
          'In the evening, take an optional gentle promenade along the Mutrah waterfront or enjoy dinner under the stars at The Beach Restaurant savoring freshly caught local grouper and Gulf prawns.'
        ],
        schedule: {
          morning: 'Arrival and private airport tarmac reception',
          afternoon: 'Leisurely check-in, unpacking, and poolside relaxation',
          evening: 'Welcome dinner and evening promenade along the private beach'
        },
        includedActivities: ['VIP airport fast-track service', 'Exclusive beachside lounge access'],
        mealsIncluded: ['Dinner'],
        transfers: 'Private Lexus LX 4WD luxury chauffeur',
        images: [
          { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'The Chedi Muscat reflective garden architecture', alt: 'The Chedi Muscat' }
        ],
        notes: {
          dressCode: 'Smart casual resort attire; shoulders covered in public areas.',
          activityLevel: 'Relaxed'
        }
      },
      {
        dayNumber: 2,
        title: 'Explore Muscat: Cultural Splendours, Royal Grand Mosque & Souq',
        location: 'Muscat (Grand Mosque, Old Port, Mutrah)',
        overnightLocation: 'Muscat',
        hotelName: 'The Chedi Muscat',
        summary: 'Guided visits to major cultural attractions, traditional market experience, seaside photo stops and dining recommendations.',
        description: [
          'Begin the day with a morning private tour of the Sultan Qaboos Grand Mosque, one of the world\'s most awe-inspiring Islamic architectural monuments, featuring a 21-ton single-weave Persian carpet and 14-meter Swarovski crystal chandelier.',
          'Continue to the Old Port of Muscat, passing Al Alam Palace flanked by the 16th-century Portuguese twin fortresses of Al Jalali and Al Mirani. Visit Bait Al Zubair private museum showcasing antique silver khanjar daggers and traditional Omani costumes.',
          'Late afternoon is devoted to the intoxicating scents of frankincense, myrrh, and rare spices in the vaulted alleys of Mutrah Souq with your guide, followed by seaside sunset photographs over the bay.'
        ],
        schedule: {
          morning: 'Private architectural tour of Sultan Qaboos Grand Mosque',
          afternoon: 'Al Alam Palace, Bait Al Zubair Museum, and Mutrah Souq',
          evening: 'Fine dining recommendations at Opera Galleria Muscat'
        },
        includedActivities: ['Private certified guide', 'Grand Mosque VIP entrance', 'Museum entrance fees'],
        mealsIncluded: ['Breakfast', 'Lunch'],
        transfers: 'Private Lexus 4WD',
        images: [
          { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'Sultan Qaboos Grand Mosque marble courtyards', alt: 'Sultan Qaboos Grand Mosque' }
        ]
      },
      {
        dayNumber: 3,
        title: 'Coastal Scenery: Scenic Route, Coastal Viewpoints & Bay Relaxation',
        location: 'Bandar Khayran & Qantab Coast',
        overnightLocation: 'Muscat or nearby coastal resort',
        hotelName: 'The Chedi Muscat',
        summary: 'Scenic route and selected coastal viewpoints, optional privately guided excursion, return for a relaxed evening.',
        description: [
          'Drive along the dramatic coastal winding corniche toward the rugged fjords of Bandar Khayran. Marvel at emerald-blue inlets carved into towering limestone cliffs.',
          'Board a private luxury motor catamaran for a guided marine excursion exploring secluded coves, looking for pods of spinner dolphins playing in the vessel\'s wake, and snorkeling above vibrant sea turtle reefs.',
          'Return to your resort by mid-afternoon for a relaxed evening, enjoying personalized spa treatments or a cocktail on the private cliff-edge terrace.'
        ],
        schedule: {
          morning: 'Scenic drive along rugged coastal cornice to Bandar Khayran',
          afternoon: 'Private catamaran charter, dolphin watching, and reef snorkeling',
          evening: 'Relaxed evening at leisure on the beach terrace'
        },
        includedActivities: ['Private 3-hour luxury catamaran charter', 'Snorkeling equipment with marine biologist'],
        mealsIncluded: ['Breakfast', 'Lunch'],
        transfers: 'Private 4WD & luxury marine charter',
        images: [
          { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', caption: 'Limestone fjords and turquoise bays of Bandar Khayran', alt: 'Oman coastal bay' }
        ]
      },
      {
        dayNumber: 4,
        title: 'Mountains: Ascent toward the Hajar Region, Viewpoints & Property Check-In',
        location: 'Hajar Mountains & Jabal Akhdar',
        overnightLocation: 'Mountain resort (Jabal Akhdar)',
        hotelName: 'Alila Jabal Akhdar',
        hotelId: 'hotel-4',
        summary: 'Transfer toward the Hajar Mountain region, viewpoints, mountain scenery and property check-in.',
        description: [
          'Leave the coast behind and ascend into the jagged grandeur of the Western Hajar Mountains. The road snakes upwards through dramatic rocky defiles, climbing to 2,000 meters above sea level where the crisp mountain air brings a refreshing drop in temperature.',
          'Stop at ancient viewpoints gazing down into steep canyon gorges and terraced pomegranate orchards that cling precariously to the vertical stone faces.',
          'Check into Alila Jabal Akhdar, an extraordinary sanctuary constructed from local stone that blends seamlessly into the cliff edge. Savor sunset cocktails on the canyon-edge observation deck.'
        ],
        schedule: {
          morning: 'Depart Muscat into the foothills of the Hajar Mountains',
          afternoon: 'Ascent to the Green Mountain plateau and canyon viewpoints',
          evening: 'Check-in at Alila Jabal Akhdar and canyon-side fine dining'
        },
        includedActivities: ['Scenic mountain pass drive', 'Canyon rim viewpoints'],
        mealsIncluded: ['Breakfast', 'Dinner'],
        transfers: 'Private 4WD mountain vehicle',
        images: [
          { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'Alila Jabal Akhdar infinity pool over the 2,000m canyon', alt: 'Alila Jabal Akhdar' }
        ]
      },
      {
        dayNumber: 5,
        title: 'Leisure and Experiences: Mountain Hike, Nature Walk, Spa & Stargazing',
        location: 'Jabal Akhdar Plateau',
        overnightLocation: 'Mountain resort (Jabal Akhdar)',
        hotelName: 'Alila Jabal Akhdar',
        hotelId: 'hotel-4',
        summary: 'Breakfast, optional hiking or guided nature experience, spa or resort time, evening at leisure.',
        description: [
          'Awake to the morning sun illuminating the canyon rim. After breakfast, join your resident nature guide for the "Three Villages Walk", strolling along ancient Falaj irrigation canals connecting the historic cliffside hamlets of Al Ayn and Ash Shirayjah.',
          'The afternoon is dedicated to restorative leisure: experience an indigenous juniper and frankincense treatment at Spa Alila, or relax by the heated infinity pool overlooking the canyon gorge.',
          'As night falls, gather at the resort’s high-altitude observatory for an astronomer-led stargazing session observing the deep-sky constellations in unpolluted dark skies.'
        ],
        schedule: {
          morning: 'Guided terraced orchard and village heritage walk',
          afternoon: 'Restorative Spa Alila therapy or poolside leisure',
          evening: 'Private canyon dinner followed by guided astronomical stargazing'
        },
        includedActivities: ['Guided village and falaj walking tour', 'Astronomer stargazing session'],
        mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
        transfers: 'Local resort transportation',
        images: [
          { url: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80', caption: 'Ancient terraced villages on the canyon cliffside', alt: 'Jabal Akhdar terraces' }
        ]
      },
      {
        dayNumber: 6,
        title: 'Desert Experience: Scenic Transfer, Dune Drive, Sunset & Luxury Camp',
        location: 'Wahiba Sands (Sharqiya)',
        overnightLocation: 'Desert lodge (Wahiba Sands)',
        hotelName: 'Desert Nights Luxury Camp',
        summary: 'Scenic transfer, selected desert activities as offered by the supplier, sunset and luxury camp/lodge experience.',
        description: [
          'Descend from the mountains and pause at the historic oasis city of Nizwa, exploring the 17th-century circular cannon tower of Nizwa Fort and the bustling silver souq famous for handcrafted Bedouin jewelry.',
          'Journey onward toward the gateway of the Wahiba Sands. Your chauffeur deflates the tires of your 4WD as you enter the dramatic expanse of copper and amber sand dunes rising up to 100 meters high.',
          'Experience exhilarating dune driving, or opt for a gentle sunset camel ride atop the crests. Check into your deluxe Bedouin-style tented suite at Desert Nights Camp. Enjoy an evening of traditional Omani Shuwa barbecue cooked under the sand, accompanied by live lute oud music under the canopy of stars.'
        ],
        schedule: {
          morning: 'Descent to Nizwa Fort and antique silver souq',
          afternoon: 'Transfer into Wahiba Sands and dune navigation',
          evening: 'Sunset dune champagne toast, Bedouin dinner, and campfire oud music'
        },
        includedActivities: ['Nizwa Fort VIP entry', 'Wahiba Sands dune driving', 'Sunset dune camel trek'],
        mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
        transfers: 'Private 4WD desert vehicle',
        images: [
          { url: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=1200&q=80', caption: 'Golden rolling dunes of Wahiba Sands at sunset', alt: 'Wahiba Sands desert' }
        ]
      },
      {
        dayNumber: 7,
        title: 'Departure: Breakfast, Check-Out & Arranged Private Transfer',
        location: 'Wahiba Sands to Muscat Airport',
        overnightLocation: 'Homebound Flight',
        summary: 'Breakfast, check-out and arranged private transfer according to departure details. End of tour.',
        description: [
          'Witness the sunrise bathing the desert dunes in crimson and peach tones before enjoying a leisurely breakfast of fresh pomegranate, flatbreads, and Arabian coffee in the desert pavilion.',
          'Check out of your luxury camp and make the smooth, scenic drive back to Muscat, passing through the date-palm oasis of Wadi Bani Khalid with its emerald swimming pools.',
          'Arrive at Muscat International Airport in time for your homeward flight, escorted by our airport representative to the First/Business Class check-in desks. End of unforgettable journey.'
        ],
        schedule: {
          morning: 'Sunrise desert viewing and hearty breakfast',
          afternoon: 'Scenic transfer to Muscat via Wadi Bani Khalid oasis',
          evening: 'Escorted airport check-in and departure'
        },
        includedActivities: ['Wadi Bani Khalid oasis visit', 'Airport VIP departure transfer'],
        mealsIncluded: ['Breakfast'],
        transfers: 'Private luxury 4WD to MCT Airport',
        images: [
          { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'Final tranquil views of Omani heritage', alt: 'Muscat architecture' }
        ]
      }
    ]
  },

  // 4. Oman: Oman Coast and Luxury Resort Escape
  {
    id: 'pkg-4',
    name: 'Oman Coast and Luxury Resort Escape',
    slug: 'oman-coast-and-luxury-resort-escape',
    destinationId: 'dest-2',
    destinationSlug: 'oman',
    destinationName: 'Oman',
    cities: ['Muscat', 'Musandam'],
    durationDays: 5,
    durationNights: 4,
    travelStyle: 'Wellness & Marine',
    groupType: 'Flexible Dates',
    priceFrom: 2200,
    currency: 'GBP',
    isPriceOnRequest: false,
    status: 'live',
    isFeatured: false,
    shortSummary: 'A 5-day coastal sanctuary at The Chedi Muscat with private dhow fjord sailing, frankincense spa journeys, and private cove dining.',
    fullDescription: 'Designed for travelers seeking pure tranquility and coastal indulgence. Stay in an expansive Club Ocean Suite at The Chedi Muscat, enjoy signature frankincense and myrrh thermal therapies, and cruise the dramatic limestone coves of the Gulf of Oman aboard a private classic dhow.',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'The Chedi Muscat beachside pools', alt: 'The Chedi Muscat pool' }
    ],
    highlights: [
      '4 nights at The Chedi Muscat in a Serai Club Room with full VIP privileges',
      'Full-day private traditional dhow sailing with private chef and snorkel guide',
      'Daily multi-course dining at award-winning beachfront restaurants'
    ],
    inclusions: ['4 nights 5-star accommodation', 'Daily breakfast & club refreshments', 'Private airport transfers'],
    exclusions: ['International flights', 'Gratuities'],
    accommodationsSummary: 'The Chedi Muscat',
    linkedHotelIds: ['hotel-3'],
    departureDates: [
      { id: 'dep-401', startDate: '2026-11-28', endDate: '2026-12-02', pricePerPerson: 2200, singleSupplement: 520, status: 'available', allocationLeft: 3 }
    ],
    meetingPoint: 'Muscat International Airport',
    suitableFor: ['Couples', 'Honeymooners', 'Wellness Seekers'],
    activityLevel: 'Gentle',
    accessibilityNotes: 'Step-free hotel grounds and beach walkways.',
    visaNotice: 'eVisa pre-issued online.',
    cancellationPolicy: 'Full refund up to 21 days prior.',
    primaryCtaType: 'book_now',
    metaTitle: 'Oman Coast and Luxury Resort Escape | Arab & Beyond',
    metaDescription: 'Book the 5-day luxury Oman coast getaway at The Chedi Muscat. Private dhow charters, spa treatments, and pristine Gulf waters.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Muscat & Coastal Welcome',
        location: 'Muscat',
        overnightLocation: 'The Chedi Muscat',
        hotelName: 'The Chedi Muscat',
        summary: 'VIP greeting and check-in to your beachfront resort.',
        description: ['Arrive in Muscat and transfer to The Chedi Muscat. Relax with evening refreshments by the 103-meter Long Pool.'],
        includedActivities: ['VIP airport escort'],
        mealsIncluded: ['Dinner'],
        transfers: 'Executive luxury car',
        images: [{ url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80', caption: 'The Chedi pool', alt: 'The Chedi pool' }]
      }
    ]
  },

  // 5. Saudi Arabia: Riyadh and AlUla Luxury Journey
  {
    id: 'pkg-5',
    name: 'Riyadh and AlUla Luxury Journey',
    slug: 'riyadh-and-alula-luxury-journey',
    destinationId: 'dest-3',
    destinationSlug: 'saudi-arabia',
    destinationName: 'Saudi Arabia',
    cities: ['Riyadh', 'AlUla'],
    durationDays: 6,
    durationNights: 5,
    travelStyle: 'Cultural Discovery',
    groupType: 'Private Only',
    priceFrom: 4200,
    currency: 'GBP',
    isPriceOnRequest: false,
    status: 'live',
    isFeatured: true,
    badge: 'Extraordinary Discovery',
    shortSummary: 'Experience Saudi Arabia\'s most iconic duality: 2 nights in royal Riyadh exploring UNESCO Diriyah, followed by 3 nights in an ultra-luxury canyon villa at Habitas AlUla with VIP Hegra access.',
    fullDescription: 'An unforgettable 6-day expedition across ancient and modern Arabia. Begin in the vibrant capital of Riyadh staying at The Ritz-Carlton, with curated tours of the mud-brick palaces of UNESCO At-Turaif. Fly by private air to AlUla, where you stay in an eco-luxury canyon villa nestled in the Ashar Valley, exploring Nabataean tombs, Elephant Rock, and the mirrored wonder of Maraya.',
    heroImage: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80', caption: 'Monumental Hegra rock tomb carved into rose sandstone', alt: 'Hegra AlUla' },
      { url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=80', caption: 'Riyadh modern skyline and Kingdom Tower', alt: 'Riyadh city' }
    ],
    highlights: [
      '2 nights at The Ritz-Carlton Riyadh in a Superior Executive Suite',
      '3 nights at Habitas AlUla in a Canyon Villa with private outdoor terrace',
      'Private archaeologist-led after-hours exploration of UNESCO Hegra',
      'Private dinner under the stars in the Ashar Valley sandstone canyons',
      'Domestic flights between Riyadh and AlUla included'
    ],
    inclusions: [
      '5 nights luxury 5-star accommodation',
      'Domestic flights Riyadh to AlUla in premium class',
      'All private chauffeured 4WD and executive Mercedes transfers',
      'Private rawi (storyteller) and certified archaeologist guides',
      'All monument entry permits and exclusive access rights'
    ],
    exclusions: ['International flights', 'Personal discretionary expenses', 'Travel insurance'],
    accommodationsSummary: 'The Ritz-Carlton Riyadh & Habitas AlUla (Canyon Villa)',
    linkedHotelIds: ['hotel-5', 'hotel-6'],
    departureDates: [
      { id: 'dep-501', startDate: '2026-11-22', endDate: '2026-11-27', pricePerPerson: 4200, singleSupplement: 1100, status: 'available', allocationLeft: 3 }
    ],
    meetingPoint: 'King Khalid International Airport (RUH), Riyadh',
    suitableFor: ['Culture Enthusiasts', 'Couples', 'Architectural Connoisseurs'],
    activityLevel: 'Moderate',
    accessibilityNotes: 'Habitas AlUla uses electric golf cart buggies; Hegra provides golf-cart assisted tomb touring.',
    visaNotice: 'Saudi eVisa required; Arab & Beyond assists with online validation.',
    cancellationPolicy: 'Full refund up to 30 days prior.',
    primaryCtaType: 'book_now',
    metaTitle: 'Riyadh and AlUla Luxury Journey | Arab & Beyond',
    metaDescription: '6-day luxury tour of Saudi Arabia: The Ritz-Carlton Riyadh, UNESCO Diriyah, Habitas AlUla canyon villas, and private Hegra tomb tours.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Royal Riyadh & Diriyah Twilight',
        location: 'Riyadh',
        overnightLocation: 'The Ritz-Carlton, Riyadh',
        hotelName: 'The Ritz-Carlton, Riyadh',
        summary: 'Palatial check-in and private twilight walking tour of UNESCO At-Turaif in Diriyah.',
        description: [
          'Arrive in Riyadh where our VIP airport team escorts you through royal protocol to your limousine. Arrive at The Ritz-Carlton Riyadh, set amidst 52 acres of manicured gardens and 600-year-old olive trees.',
          'In the late afternoon, head to UNESCO World Heritage site At-Turaif in Diriyah, the mud-brick ancestral capital of the House of Saud. Dine at Bujairi Terrace overlooking the illuminated historic walls.'
        ],
        includedActivities: ['VIP airport fast-track', 'At-Turaif private guide', 'Bujairi Terrace dining reservation'],
        mealsIncluded: ['Dinner'],
        transfers: 'Executive Mercedes-Benz',
        images: [{ url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1000&q=80', caption: 'Riyadh illuminated nightscape', alt: 'Riyadh' }]
      }
    ]
  },

  // 7. The Red Sea: Red Sea Island Resort Escape
  {
    id: 'pkg-7',
    name: 'Red Sea Island Resort Escape',
    slug: 'red-sea-island-resort-escape',
    destinationId: 'dest-4',
    destinationSlug: 'the-red-sea',
    destinationName: 'The Red Sea',
    cities: ['Ummahat Island'],
    durationDays: 5,
    durationNights: 4,
    travelStyle: 'Wellness & Marine',
    groupType: 'Flexible Dates',
    priceFrom: 4800,
    currency: 'GBP',
    isPriceOnRequest: false,
    status: 'live',
    isFeatured: true,
    badge: 'Ultra Luxury Haven',
    shortSummary: 'The pinnacle of barefoot island luxury: 4 nights in an overwater coral villa at The St. Regis Red Sea Resort, private seaplane transfers, and dedicated butler service.',
    fullDescription: 'Experience the world\'s most pristine new archipelago. Suspended over transparent turquoise waters at Ummahat Island, your private overwater villa at The St. Regis Red Sea Resort features a private plunge pool, outdoor sundeck, and uninterrupted sunset horizons. Includes chartered seaplane transfers from Red Sea International Airport.',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', caption: 'Overwater villas at Ummahat Island', alt: 'St Regis Red Sea' },
      { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', caption: 'Pristine barrier coral reef diving', alt: 'Coral reef' }
    ],
    highlights: [
      '4 nights in an Overwater Coral Villa with private plunge pool at The St. Regis Red Sea',
      'Return private seaplane charter from Red Sea International Airport (RSI)',
      '24-hour dedicated St. Regis Butler service',
      'Daily breakfast and choice of 3 fine-dining specialty venues (including Tilina overwater restaurant)',
      'Private guided snorkeling expedition along untouched outer barrier reefs'
    ],
    inclusions: [
      '4 nights ultra-luxury overwater villa accommodation',
      'Return seaplane flights from RSI airport to Ummahat Island',
      'All gourmet meals and premium pairings',
      'Private water sports including electric hydrofoil session and sea kayaking'
    ],
    exclusions: ['International flights', 'Discretionary gratuities'],
    accommodationsSummary: 'The St. Regis Red Sea Resort (Overwater Coral Villa)',
    linkedHotelIds: ['hotel-7'],
    departureDates: [
      { id: 'dep-701', startDate: '2026-11-20', endDate: '2026-11-24', pricePerPerson: 4800, singleSupplement: 1400, status: 'available', allocationLeft: 2 }
    ],
    meetingPoint: 'Red Sea International Airport (RSI)',
    suitableFor: ['Honeymooners', 'Couples', 'Marine Lovers', 'Ultra-Luxury Travelers'],
    activityLevel: 'Gentle',
    accessibilityNotes: 'Step-free overwater jetty with electric club carts.',
    visaNotice: 'Saudi tourist eVisa valid for Red Sea International arrivals.',
    cancellationPolicy: 'Complimentary cancellation up to 45 days before arrival.',
    primaryCtaType: 'book_now',
    metaTitle: 'The Red Sea Island Resort Escape | Arab & Beyond',
    metaDescription: 'Book 5 days at The St. Regis Red Sea Resort. Overwater coral villas, private seaplane transfers, and regenerative luxury.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Seaplane Arrival over Ummahat Turquoise Lagoon',
        location: 'Ummahat Island',
        overnightLocation: 'The St. Regis Red Sea Resort',
        hotelName: 'The St. Regis Red Sea Resort',
        summary: 'Seaplane transfer, St. Regis butler check-in, and sunset overwater dinner.',
        description: [
          'Arrive at Red Sea International Airport and step aboard your chartered seaplane. Soar above ring-shaped coral atolls and turquoise sandbanks before touching down gently on the lagoon waters of Ummahat Island.',
          'Your dedicated St. Regis Butler escorts you to your Overwater Villa. Spend the late afternoon swimming from your private deck into crystal waters, followed by an exquisite seafood dinner at Tilina perched directly over the reef.'
        ],
        includedActivities: ['Private scenic seaplane transfer', 'Dedicated butler unpacking service'],
        mealsIncluded: ['Dinner'],
        transfers: 'Scenic amphibious seaplane',
        images: [{ url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80', caption: 'Seaplane arrival at Ummahat jetty', alt: 'Red Sea overwater' }]
      }
    ]
  },

  // 9. Qatar: Doha Luxury City Break
  {
    id: 'pkg-9',
    name: 'Doha Luxury City Break',
    slug: 'doha-luxury-city-break',
    destinationId: 'dest-5',
    destinationSlug: 'qatar',
    destinationName: 'Qatar',
    cities: ['Doha'],
    durationDays: 4,
    durationNights: 3,
    travelStyle: 'Luxury Escapes',
    groupType: 'Flexible Dates',
    priceFrom: 1650,
    currency: 'GBP',
    isPriceOnRequest: false,
    status: 'live',
    isFeatured: true,
    badge: 'Popular Weekend Escape',
    shortSummary: 'A 4-day cosmopolitan escape: Mandarin Oriental Doha in Msheireb Downtown, private dhow dinner cruise along West Bay, and after-hours Museum of Islamic Art tour.',
    fullDescription: 'Experience Doha’s refined cultural heart. Based in the sophisticated Msheireb Downtown district at the Mandarin Oriental, Doha, explore the dramatic architecture of Jean Nouvel’s National Museum of Qatar, wander the atmospheric falconry quarters of Souq Waqif, and dine on private traditional dhows beneath the sparkling Corniche skyline.',
    heroImage: 'https://images.unsplash.com/photo-1724614766636-3ddd7ea39804?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1792930568968-93840b84840a?auto=format&fit=crop&w=1200&q=80', caption: 'Doha Corniche skyline at dusk', alt: 'Doha Corniche' },
      { url: 'https://images.unsplash.com/photo-1724614766636-3ddd7ea39804?auto=format&fit=crop&w=1200&q=80', caption: 'Museum of Islamic Art and Doha palm promenade', alt: 'Museum of Islamic Art Doha' },
      { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'Souq Waqif traditional atmospheric street', alt: 'Souq Waqif' }
    ],
    highlights: [
      '3 nights at Mandarin Oriental, Doha in an Executive Deluxe Room',
      'Private curator walkthrough of the Museum of Islamic Art and National Museum of Qatar',
      'Private sunset traditional dhow boat cruise with chef-prepared Arabian dinner',
      'VIP airport tarmac meet-and-assist at Hamad International Airport'
    ],
    inclusions: [
      '3 nights luxury accommodation at Mandarin Oriental, Doha',
      'Daily gourmet breakfast at Mosaic and Club Lounge privileges',
      'Private chauffeured Mercedes S-Class for all transfers and touring',
      'Private museum admissions and curator fees'
    ],
    exclusions: ['International flights', 'Personal purchases', 'Gratuities'],
    accommodationsSummary: 'Mandarin Oriental, Doha (Executive Deluxe Suite)',
    linkedHotelIds: ['hotel-9'],
    departureDates: [
      { id: 'dep-901', startDate: '2026-11-19', endDate: '2026-11-22', pricePerPerson: 1650, singleSupplement: 420, status: 'available', allocationLeft: 5 }
    ],
    meetingPoint: 'Hamad International Airport (DOH) - Al Maha VIP Arrivals Lounge',
    suitableFor: ['Weekend Escapes', 'Couples', 'Art Aficionados'],
    activityLevel: 'Gentle',
    accessibilityNotes: 'Step-free museum and hotel access throughout.',
    visaNotice: 'Visa-free entry for British, EU, US passport holders.',
    cancellationPolicy: 'Full refund up to 14 days prior to arrival.',
    primaryCtaType: 'book_now',
    metaTitle: 'Doha Luxury City Break 4-Day Holiday | Arab & Beyond',
    metaDescription: 'Book 4 days in Doha at Mandarin Oriental. Museum of Islamic Art private tours, private dhow dinner cruise, and Souq Waqif.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Doha & Msheireb Stroll',
        location: 'Doha (Msheireb)',
        overnightLocation: 'Mandarin Oriental, Doha',
        hotelName: 'Mandarin Oriental, Doha',
        summary: 'VIP airport transfer, hotel check-in, and evening stroll through Msheireb Downtown.',
        description: ['Arrive at Hamad International Airport and be escorted by Al Maha protocol service to your private chauffeur. Check in to Mandarin Oriental, Doha in Msheireb Downtown. Enjoy an evening terrace cocktail overlooking Barahat Msheireb plaza.'],
        includedActivities: ['VIP airport arrival service'],
        mealsIncluded: ['Dinner'],
        transfers: 'Mercedes-Benz S-Class',
        images: [{ url: 'https://images.unsplash.com/photo-1792930568968-93840b84840a?auto=format&fit=crop&w=1000&q=80', caption: 'Doha skyline', alt: 'Doha' }]
      }
    ]
  }
];

export const initialHotels: Hotel[] = [
  // 1. Bahrain: The Ritz-Carlton Bahrain
  {
    id: 'hotel-1',
    name: 'The Ritz-Carlton, Bahrain',
    slug: 'the-ritz-carlton-bahrain',
    destinationId: 'dest-1',
    destinationSlug: 'bahrain',
    destinationName: 'Bahrain',
    city: 'Manama',
    address: 'Bldg. 112, King Mohammed VI Ave, Block 428, Al Seef, Manama',
    starRating: 5,
    verifiedLuxuryTier: 'Ultra Luxury',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', caption: 'Resort lagoon and private island villas', alt: 'Ritz-Carlton Bahrain exterior' }
    ],
    priceFromPerNight: 420,
    currency: 'GBP',
    isPriceOnRequest: false,
    shortSummary: 'An iconic 20-acre private seafront oasis in Manama\'s Al Seef district, featuring a secluded private lagoon, marina, and three-bedroom beachfront royal villas.',
    fullOverview: 'The Ritz-Carlton, Bahrain commands a legendary status along the sparkling waters of the Arabian Gulf. Set on its own secluded bay in the upscale Seef district, the resort offers an intimate sanctuary within easy reach of the capital\'s cultural treasures. Guests enjoy a world-class Thalassotherapy spa, 11 exceptional restaurants and lounges (including CUT by Wolfgang Puck and Primavera), private tennis courts, and pristine white-sand private beaches.',
    amenities: [
      'Private Lagoon & Secluded White Sand Beach',
      'World-Class Thalassotherapy Spa & Turkish Hammam',
      'Private 40-Slip Luxury Marina',
      '11 Acclaimed International Restaurants & Lounges',
      'The Ritz-Carlton Club Lounge with 5 Daily Food Presentations',
      'Private Seafront Villas with Personal Butler'
    ],
    roomTypes: [
      {
        id: 'room-101',
        name: 'Club Sea View Room',
        description: 'Sophisticated 48 sqm room overlooking the turquoise lagoon with marble bathroom and full access to The Ritz-Carlton Club Lounge.',
        sizeSqM: 48,
        bedSetup: '1 King or 2 Queen Beds',
        maxGuests: 3,
        view: 'Arabian Gulf & Lagoon View',
        imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80',
        gallery: [],
        boardBasis: 'Bed & Breakfast',
        pricePerNightFrom: 420,
        amenities: ['Club Lounge Access', 'Asprey Purple Water Toiletries', 'Nespresso Machine', 'High-speed Wi-Fi', 'Marble Soaking Tub'],
        rateType: 'indicative_rate'
      }
    ],
    policies: {
      checkInTime: '15:00',
      checkOutTime: '12:00 (Guaranteed 16:00 for Arab & Beyond guests)',
      cancellationPolicy: 'Complimentary cancellation up to 72 hours prior to arrival.',
      childPolicy: 'Children under 12 stay complimentary.',
      taxesAndFees: 'Subject to 10% service charge and 10% government levy.',
      paymentTerms: 'Credit card guarantee required at time of booking.'
    },
    nearbyAttractions: [
      { name: 'Qal\'at al-Bahrain (Bahrain Fort)', distance: '4.2 km' },
      { name: 'Bab Al Bahrain & Manama Souq', distance: '6.5 km' }
    ],
    faqs: [
      { question: 'Does the resort have a private beach suitable for swimming?', answer: 'Yes, the resort features a sheltered, calm private lagoon with imported white sand that is safe and pristine for swimming year-round.' }
    ],
    linkedPackageIds: ['pkg-1'],
    isFeatured: true,
    active: true,
    metaTitle: 'The Ritz-Carlton Bahrain | Luxury Manama Beachfront Resort',
    metaDescription: 'Book your luxury stay at The Ritz-Carlton, Bahrain. Private lagoon, seafront villas, Thalassotherapy spa, and Michelin-starred dining.'
  },

  // 3. Oman: The Chedi Muscat
  {
    id: 'hotel-3',
    name: 'The Chedi Muscat',
    slug: 'the-chedi-muscat',
    destinationId: 'dest-2',
    destinationSlug: 'oman',
    destinationName: 'Oman',
    city: 'Muscat',
    address: '18th November St, Al Azaiba, Muscat, Sultanate of Oman',
    starRating: 5,
    verifiedLuxuryTier: 'Ultra Luxury',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'The Chedi 103-meter Long Pool reflection', alt: 'The Chedi long pool' },
      { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'Water gardens and white Arabesque arches', alt: 'The Chedi courtyards' }
    ],
    priceFromPerNight: 490,
    currency: 'GBP',
    isPriceOnRequest: false,
    shortSummary: 'A 21-acre beachfront sanctuary in Muscat where Omani royal architecture meets tranquil water gardens and the iconic 103m Long Pool.',
    fullOverview: 'The Chedi Muscat is universally celebrated among architecture connoisseurs as one of the world’s most breathtaking beachfront resorts. Its pure white domes, symmetry, and carved Mashrabiya latticework rise above palm groves and reflecting water basins along the Gulf of Oman. Home to six acclaimed dining venues, an expansive frankincense and myrrh thermal spa, and the iconic 103-meter Long Pool.',
    amenities: [
      '103-Meter Long Pool (Middle East\'s Longest Temperature-Controlled Pool)',
      '3 Distinct Temperature-Controlled Swimming Pools',
      'Frankincense & Myrrh Holistic Thermal Spa',
      'Private 370-Meter Gulf Beachfront',
      '6 Award-Winning International Restaurants',
      'Complimentary Serai Club Minibar & Cocktail Hours'
    ],
    roomTypes: [
      {
        id: 'room-301',
        name: 'Serai Club Suite',
        description: 'Exquisite 62 sqm suite featuring high ceilings, sunken terrazzo bath, and complimentary access to the Serai Club lounge with afternoon tea and evening cocktails.',
        sizeSqM: 62,
        bedSetup: '1 King Bed',
        maxGuests: 2,
        view: 'Water Garden or Mountain View',
        imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
        gallery: [],
        boardBasis: 'Bed & Breakfast',
        pricePerNightFrom: 490,
        amenities: ['Complimentary Minibar Refilled Daily', 'Sunken Terrazzo Bath', 'Bose Sound System', 'Evening Cocktails & Canapés', 'Daily Laundry (6 pieces)'],
        rateType: 'indicative_rate'
      }
    ],
    policies: {
      checkInTime: '15:00',
      checkOutTime: '12:00',
      cancellationPolicy: 'Free cancellation up to 14 days prior to arrival.',
      childPolicy: 'Children welcome; Serai Pool and Long Pool are adult-only for maximum tranquility.',
      taxesAndFees: 'Includes service charge and government taxes.',
      paymentTerms: 'Credit card guarantee.'
    },
    nearbyAttractions: [
      { name: 'Sultan Qaboos Grand Mosque', distance: '4.8 km' },
      { name: 'Royal Opera House Muscat', distance: '8.0 km' }
    ],
    faqs: [
      { question: 'Is the 103-meter Long Pool heated or chilled?', answer: 'It is temperature-controlled year-round to an optimal 28°C–30°C.' }
    ],
    linkedPackageIds: ['pkg-3', 'pkg-4'],
    isFeatured: true,
    active: true,
    metaTitle: 'The Chedi Muscat | 5-Star Luxury Beachfront Resort Oman',
    metaDescription: 'Book The Chedi Muscat. 103m long pool, Arabian water courtyards, and Michelin-tier dining.'
  },

  // 4. Oman: Alila Jabal Akhdar
  {
    id: 'hotel-4',
    name: 'Alila Jabal Akhdar',
    slug: 'alila-jabal-akhdar',
    destinationId: 'dest-2',
    destinationSlug: 'oman',
    destinationName: 'Oman',
    city: 'Jabal Akhdar',
    address: 'Plot No. 4, Al Roose, Jabal Akhdar, Nizwa, Sultanate of Oman',
    starRating: 5,
    verifiedLuxuryTier: 'Ultra Luxury',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', caption: 'Mountain canyon architecture in Oman', alt: 'Alila Jabal Akhdar canyon' }
    ],
    priceFromPerNight: 580,
    currency: 'GBP',
    isPriceOnRequest: false,
    shortSummary: 'Perched 2,000 meters above sea level on the edge of a dramatic Hajar Mountain gorge, constructed entirely from indigenous Omani stone.',
    fullOverview: 'Alila Jabal Akhdar is one of the world\'s most breathtaking mountain lodges. Inspired by ancient Omani forts and constructed using traditional stone masonry, the resort clings to the edge of a sheer canyon cliff. Enjoy cool mountain breezes, private via ferrata adventures, mountain-view infinity pools, and Spa Alila therapies using local juniper and mountain roses.',
    amenities: [
      'Clifftop Infinity Pool overlooking 2,000m Gorge',
      'Spa Alila with Frankincense & Mountain Rose Therapies',
      'Private High-Altitude Stargazing Observatory',
      'Via Ferrata Climbing Cave Experience',
      'Organic Farm-to-Table Dining at Juniper Restaurant',
      'Private 4WD Chauffeur Services'
    ],
    roomTypes: [
      {
        id: 'room-401',
        name: 'Mountain View Suite',
        description: 'Spacious 52 sqm suite with private stone balcony looking out across the dramatic canyon peaks, freestanding tub, and hand-painted juniper murals.',
        sizeSqM: 52,
        bedSetup: '1 King Bed',
        maxGuests: 2,
        view: 'Unobstructed Canyon & Mountain View',
        imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
        gallery: [],
        boardBasis: 'Half Board',
        pricePerNightFrom: 580,
        amenities: ['Private Canyon Balcony', 'Handmade Frankincense Soaps', 'Freestanding Bathtub', 'Fireplace'],
        rateType: 'indicative_rate'
      }
    ],
    policies: {
      checkInTime: '15:00',
      checkOutTime: '12:00',
      cancellationPolicy: 'Free cancellation up to 21 days before arrival.',
      childPolicy: 'Children over 6 welcome.',
      taxesAndFees: 'Includes Omani tourism tax and service charge.',
      paymentTerms: 'Credit card guarantee.'
    },
    nearbyAttractions: [
      { name: 'Diana\'s Point Canyon Viewpoint', distance: '3.5 km' },
      { name: 'Al Ayn Terraced Village', distance: '6.0 km' }
    ],
    faqs: [
      { question: 'Do I need a 4WD vehicle to reach the resort?', answer: 'Yes, Royal Oman Police requires all vehicles ascending Jabal Akhdar to be four-wheel drive. Arab & Beyond provides luxury chauffeured 4WD transfers.' }
    ],
    linkedPackageIds: ['pkg-3'],
    isFeatured: true,
    active: true,
    metaTitle: 'Alila Jabal Akhdar | Luxury Clifftop Mountain Resort Oman',
    metaDescription: 'Experience Alila Jabal Akhdar perched 2,000m high in Oman\'s Hajar Mountains. Clifftop infinity pool and canyon suites.'
  },

  // 7. The Red Sea: The St. Regis Red Sea Resort
  {
    id: 'hotel-7',
    name: 'The St. Regis Red Sea Resort',
    slug: 'the-st-regis-red-sea-resort',
    destinationId: 'dest-4',
    destinationSlug: 'the-red-sea',
    destinationName: 'The Red Sea',
    city: 'Ummahat Island',
    address: 'Ummahat Island 1, The Red Sea, Kingdom of Saudi Arabia',
    starRating: 5,
    verifiedLuxuryTier: 'Private Island Sanctuary',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', caption: 'Overwater curved villas hovering over the reef', alt: 'St Regis Red Sea' },
      { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', caption: 'Pristine lagoon and barrier reef', alt: 'Red Sea reef' }
    ],
    priceFromPerNight: 950,
    currency: 'GBP',
    isPriceOnRequest: false,
    shortSummary: 'A landmark of regenerative ultra-luxury on Ummahat Island: visionary shell-inspired overwater villas, private seaplane access, and signature St. Regis Butler Service.',
    fullOverview: 'The St. Regis Red Sea Resort heralds a new era of ultra-luxury along the western coast of Saudi Arabia. Designed by world-renowned architect Kengo Kuma, the resort’s 90 overwater and beachfront villas echo the organic curves of the surrounding coral dunes. Powered entirely by 100% renewable solar energy, guests savor Michelin-caliber gastronomy across five specialty venues, embark on private seaplane flights, and snorkel directly from their villa stairs into untouched barrier reefs.',
    amenities: [
      'Private Overwater Villas with Personal Plunge Pools',
      '24-Hour Signature St. Regis Butler Service',
      '5 Signature Fine Dining Restaurants (including Tilina and Nesma)',
      'The St. Regis Spa with 24K Gold Treatments',
      'PADI Master Dive Center & Marine Conservation Lab',
      'Zero-Emission Electric Hydrofoils and Catamarans'
    ],
    roomTypes: [
      {
        id: 'room-701',
        name: 'Overwater Coral Villa with Plunge Pool',
        description: 'Spectacular 185 sqm overwater haven floating above crystal lagoon waters, with private infinity plunge pool, sunrise/sunset deck, and outdoor bathtub.',
        sizeSqM: 185,
        bedSetup: '1 King Bed',
        maxGuests: 3,
        view: 'Unobstructed Turquoise Lagoon & Reef',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        gallery: [],
        boardBasis: 'All Inclusive Luxury',
        pricePerNightFrom: 950,
        amenities: ['Private Infinity Plunge Pool', 'Direct Lagoon Access Stairs', '24h St. Regis Butler', 'Outdoor Soaking Tub', 'Complimentary Seaplane Luggage Assistance'],
        rateType: 'indicative_rate'
      }
    ],
    policies: {
      checkInTime: '15:00',
      checkOutTime: '12:00',
      cancellationPolicy: 'Full refund up to 30 days prior to arrival.',
      childPolicy: 'Children of all ages welcome; children’s club provides marine biology activities.',
      taxesAndFees: 'Inclusive of 15% VAT and municipal environmental fee.',
      paymentTerms: 'Credit card guarantee or bank wire transfer.'
    },
    nearbyAttractions: [
      { name: 'Red Sea Barrier Reef Marine Sanctuary', distance: '0.1 km' },
      { name: 'Ummahat Island Dolphin Bay', distance: '1.2 km' }
    ],
    faqs: [
      { question: 'How do guests travel to the resort?', answer: 'Guests arrive via chartered amphibious seaplane or electric luxury yacht from Red Sea International Airport (RSI).' }
    ],
    linkedPackageIds: ['pkg-7'],
    isFeatured: true,
    active: true,
    metaTitle: 'The St. Regis Red Sea Resort | Ultra-Luxury Island Overwater Villas',
    metaDescription: 'Book The St. Regis Red Sea Resort on Ummahat Island. Overwater villas with private plunge pools, seaplane transfers, and butler service.'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-1',
    referenceId: 'AB-ENQ-2026-8812',
    createdAt: '2026-11-09T14:32:00Z',
    customerName: 'Lord Alistair Sterling',
    email: 'a.sterling@sterlingholdings.co.uk',
    phone: '+44 7700 900821',
    destinationId: 'dest-2',
    destinationName: 'Oman',
    packageId: 'pkg-3',
    packageName: 'Muscat, Mountains and Desert',
    travelDatesType: 'flexible',
    startDate: '2026-12-10',
    endDate: '2026-12-17',
    adultsCount: 2,
    childrenCount: 0,
    preferredContactMethod: 'Email',
    budgetRange: '£8,000 - £12,000',
    requirements: 'Interested in private Lexus LX tour with upgrade to Serai Club Villa and Alila Mountain Suite. Anniversary celebration.',
    sourcePage: '/packages/muscat-mountains-and-desert',
    enquiryChannel: 'Package Page',
    status: 'Quoted',
    priority: 'VIP',
    assignedAgent: 'Eleanor Vance (Senior Arabian Concierge)'
  }
];

export const initialOrders: BookingOrder[] = [
  {
    id: 'ord-101',
    orderReference: 'AB-RES-2026-9041',
    createdAt: '2026-11-08T11:20:00Z',
    type: 'package',
    productId: 'pkg-3',
    productName: 'Muscat, Mountains and Desert',
    destinationName: 'Oman',
    customerDetails: {
      fullName: 'Sir Julian Montgomery',
      email: 'j.montgomery@montgomerycapital.co.uk',
      phone: '+44 7800 554433',
      country: 'United Kingdom',
      specialRequests: 'High-floor canyon suite at Alila; private falconry session.'
    },
    travelDates: {
      startDate: '2026-12-05',
      endDate: '2026-12-11',
      durationDays: 7
    },
    travellers: {
      adults: 2,
      children: 0
    },
    roomOrOptionSelected: 'Serai Club Suite + Canyon View Suite',
    lineItems: [
      { description: 'Muscat, Mountains and Desert (2 Adults)', amount: 7500 },
      { description: 'Private Catamaran Fjord Upgrade', amount: 450 }
    ],
    subtotal: 7950,
    taxesAndFees: 0,
    totalAmount: 7950,
    currency: 'GBP',
    depositRequired: 1590,
    balanceDue: 6360,
    balanceDueDate: '2026-11-21',
    paymentMethod: 'card',
    paymentStatus: 'successful',
    orderStatus: 'booking_pending_supplier_confirmation',
    termsAccepted: true,
    termsAcceptedTimestamp: '2026-11-08T11:22:15Z',
    termsVersion: 'v2026.1',
    supplierConfirmationReference: 'SUPP-OM-9921',
    isDemoTransaction: false,
    auditTrail: [
      {
        timestamp: '2026-11-08T11:22:30Z',
        action: 'Deposit Paid via Card Token ($1,590.00)',
        performedBy: 'Customer (Online Checkout)',
        notes: 'Card payment processed. Awaiting hotel confirmation.'
      }
    ]
  }
];

export const initialSettings: WebsiteSettings = {
  companyName: 'Arab & Beyond',
  tagline: 'The Apogee of Arabian Luxury',
  contactEmail: 'concierge@arabandbeyond.com',
  contactPhone: '+44 (0) 20 7946 0888',
  londonOffice: '35 Mayfair High St, London W1J 8FF, United Kingdom',
  dubaiOffice: 'Level 42, Al Saada Tower, DIFC, Dubai, UAE',
  whatsAppNumber: '+447700900999',
  whatsAppDefaultMessage: 'Hello Arab & Beyond Concierge, I am interested in planning a luxury voyage to {destination}. Could you please advise on private arrangements and availability?',
  clickConnectorApiKey: 'cc_live_arab_beyond_prod_8819',
  clickConnectorEnabled: true,
  supportedCurrencies: ['GBP', 'USD', 'EUR', 'AED', 'SAR'],
  defaultCurrency: 'GBP',
  maintenanceMode: false
};
