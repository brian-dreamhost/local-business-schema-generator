// All local business subtypes with their Schema.org types and type-specific fields
export const BUSINESS_SUBTYPES = [
  {
    id: 'LocalBusiness',
    label: 'Local Business (Generic)',
    schemaType: 'LocalBusiness',
    icon: 'building',
    description: 'General local business — use a specific type below if available',
    fields: [],
  },
  {
    id: 'Restaurant',
    label: 'Restaurant',
    schemaType: 'Restaurant',
    icon: 'restaurant',
    description: 'Restaurants, cafes, bars, fast food, and dining establishments',
    fields: [
      { key: 'servesCuisine', label: 'Cuisine Type', type: 'text', placeholder: 'e.g., Italian, Mexican, Thai' },
      { key: 'menu', label: 'Menu URL', type: 'url', placeholder: 'https://example.com/menu' },
      { key: 'acceptsReservations', label: 'Accepts Reservations', type: 'toggle', default: true },
      { key: 'hasMenu', label: 'Menu Page URL', type: 'url', placeholder: 'https://example.com/menu' },
    ],
  },
  {
    id: 'Dentist',
    label: 'Dentist',
    schemaType: 'Dentist',
    icon: 'medical',
    description: 'Dental practices and oral health clinics',
    fields: [
      { key: 'medicalSpecialty', label: 'Specialty', type: 'select', options: ['General Dentistry', 'Orthodontics', 'Periodontics', 'Endodontics', 'Oral Surgery', 'Pediatric Dentistry', 'Prosthodontics', 'Cosmetic Dentistry'] },
      { key: 'availableService', label: 'Services Offered', type: 'tags', placeholder: 'e.g., Teeth Cleaning, Crowns, Implants' },
      { key: 'isAcceptingNewPatients', label: 'Accepting New Patients', type: 'toggle', default: true },
    ],
  },
  {
    id: 'MedicalBusiness',
    label: 'Medical Practice',
    schemaType: 'MedicalBusiness',
    icon: 'medical',
    description: 'Doctors offices, clinics, urgent care, and medical facilities',
    fields: [
      { key: 'medicalSpecialty', label: 'Medical Specialty', type: 'select', options: ['Family Medicine', 'Internal Medicine', 'Pediatrics', 'Dermatology', 'Cardiology', 'Orthopedics', 'Neurology', 'Psychiatry', 'Ophthalmology', 'OB/GYN', 'Urology', 'ENT', 'Oncology', 'Rheumatology'] },
      { key: 'availableService', label: 'Services Offered', type: 'tags', placeholder: 'e.g., Annual Physicals, Vaccinations' },
      { key: 'isAcceptingNewPatients', label: 'Accepting New Patients', type: 'toggle', default: true },
    ],
  },
  {
    id: 'AutoRepair',
    label: 'Auto Repair',
    schemaType: 'AutoRepair',
    icon: 'auto',
    description: 'Auto repair shops, mechanics, and vehicle service centers',
    fields: [
      { key: 'availableService', label: 'Auto Services', type: 'tags', placeholder: 'e.g., Oil Change, Brake Repair, Tire Rotation' },
      { key: 'brand', label: 'Brands Serviced', type: 'tags', placeholder: 'e.g., Toyota, Ford, Honda' },
    ],
  },
  {
    id: 'Attorney',
    label: 'Attorney / Law Firm',
    schemaType: 'Attorney',
    icon: 'legal',
    description: 'Attorneys, lawyers, and law firms',
    fields: [
      { key: 'practiceArea', label: 'Practice Areas', type: 'tags', placeholder: 'e.g., Personal Injury, Family Law, Criminal Defense' },
      { key: 'legalAid', label: 'Offers Free Consultations', type: 'toggle', default: false },
    ],
  },
  {
    id: 'LegalService',
    label: 'Legal Service',
    schemaType: 'LegalService',
    icon: 'legal',
    description: 'Notaries, mediators, paralegals, and other legal services',
    fields: [
      { key: 'practiceArea', label: 'Service Areas', type: 'tags', placeholder: 'e.g., Notary, Mediation, Document Preparation' },
      { key: 'legalAid', label: 'Offers Free Consultations', type: 'toggle', default: false },
    ],
  },
  {
    id: 'Plumber',
    label: 'Plumber',
    schemaType: 'Plumber',
    icon: 'home',
    description: 'Plumbing services and plumbing contractors',
    fields: [
      { key: 'availableService', label: 'Services', type: 'tags', placeholder: 'e.g., Drain Cleaning, Pipe Repair, Water Heater Install' },
      { key: 'hasOfferCatalog', label: 'Emergency Service Available', type: 'toggle', default: true },
    ],
  },
  {
    id: 'Electrician',
    label: 'Electrician',
    schemaType: 'Electrician',
    icon: 'home',
    description: 'Electrical contractors and electricians',
    fields: [
      { key: 'availableService', label: 'Services', type: 'tags', placeholder: 'e.g., Wiring, Panel Upgrades, EV Charger Install' },
      { key: 'hasOfferCatalog', label: 'Emergency Service Available', type: 'toggle', default: true },
    ],
  },
  {
    id: 'HVACBusiness',
    label: 'HVAC',
    schemaType: 'HVACBusiness',
    icon: 'home',
    description: 'Heating, ventilation, and air conditioning services',
    fields: [
      { key: 'availableService', label: 'Services', type: 'tags', placeholder: 'e.g., AC Repair, Furnace Install, Duct Cleaning' },
      { key: 'hasOfferCatalog', label: 'Emergency Service Available', type: 'toggle', default: true },
    ],
  },
  {
    id: 'BeautySalon',
    label: 'Beauty Salon',
    schemaType: 'BeautySalon',
    icon: 'beauty',
    description: 'Beauty salons, nail salons, and cosmetic services',
    fields: [
      { key: 'availableService', label: 'Services with Pricing', type: 'servicePricing', placeholder: 'e.g., Manicure' },
    ],
  },
  {
    id: 'HairSalon',
    label: 'Hair Salon',
    schemaType: 'HairSalon',
    icon: 'beauty',
    description: 'Hair salons and barber shops',
    fields: [
      { key: 'availableService', label: 'Services with Pricing', type: 'servicePricing', placeholder: 'e.g., Haircut' },
    ],
  },
  {
    id: 'DaySpa',
    label: 'Day Spa',
    schemaType: 'DaySpa',
    icon: 'beauty',
    description: 'Spas, wellness centers, and massage therapy',
    fields: [
      { key: 'availableService', label: 'Services with Pricing', type: 'servicePricing', placeholder: 'e.g., Swedish Massage' },
    ],
  },
  {
    id: 'RealEstateAgent',
    label: 'Real Estate Agent',
    schemaType: 'RealEstateAgent',
    icon: 'realestate',
    description: 'Real estate agents, brokers, and agencies',
    fields: [
      { key: 'specialties', label: 'Specialties', type: 'tags', placeholder: 'e.g., Residential, Commercial, Luxury Homes' },
    ],
  },
  {
    id: 'VeterinaryCare',
    label: 'Veterinarian',
    schemaType: 'VeterinaryCare',
    icon: 'vet',
    description: 'Veterinary clinics and animal hospitals',
    fields: [
      { key: 'availableService', label: 'Services', type: 'tags', placeholder: 'e.g., Wellness Exams, Vaccinations, Surgery, Dental' },
      { key: 'animalTypes', label: 'Animals Treated', type: 'tags', placeholder: 'e.g., Dogs, Cats, Birds, Reptiles' },
    ],
  },
  {
    id: 'HealthClub',
    label: 'Gym / Fitness Center',
    schemaType: 'HealthClub',
    icon: 'fitness',
    description: 'Gyms, fitness centers, yoga studios, and health clubs',
    fields: [
      { key: 'amenityFeature', label: 'Amenities', type: 'tags', placeholder: 'e.g., Pool, Sauna, Free Weights, Group Classes' },
      { key: 'availableService', label: 'Programs', type: 'tags', placeholder: 'e.g., Personal Training, Yoga, Pilates, Spin' },
    ],
  },
  {
    id: 'Store',
    label: 'Retail Store',
    schemaType: 'Store',
    icon: 'store',
    description: 'Retail stores, shops, and boutiques',
    fields: [
      { key: 'productCategories', label: 'Product Categories', type: 'tags', placeholder: 'e.g., Clothing, Electronics, Home Goods' },
      { key: 'hasOfferCatalog', label: 'Online Ordering Available', type: 'toggle', default: false },
    ],
  },
  {
    id: 'AccountingService',
    label: 'Accountant / CPA',
    schemaType: 'AccountingService',
    icon: 'accounting',
    description: 'Accounting firms, CPAs, bookkeepers, and tax preparers',
    fields: [
      { key: 'availableService', label: 'Services', type: 'tags', placeholder: 'e.g., Tax Preparation, Bookkeeping, Payroll, Auditing' },
    ],
  },
  {
    id: 'ChildCare',
    label: 'Child Care',
    schemaType: 'ChildCare',
    icon: 'childcare',
    description: 'Daycare centers, preschools, and after-school programs',
    fields: [
      { key: 'ageRange', label: 'Age Range', type: 'ageRange' },
      { key: 'programs', label: 'Programs', type: 'tags', placeholder: 'e.g., Infant Care, Preschool, After School, Summer Camp' },
    ],
  },
];

export const DAYS_OF_WEEK = [
  { key: 'Monday', short: 'Mon' },
  { key: 'Tuesday', short: 'Tue' },
  { key: 'Wednesday', short: 'Wed' },
  { key: 'Thursday', short: 'Thu' },
  { key: 'Friday', short: 'Fri' },
  { key: 'Saturday', short: 'Sat' },
  { key: 'Sunday', short: 'Sun' },
];

export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'Apple Pay',
  'Google Pay',
  'PayPal',
  'Check',
  'Cryptocurrency',
  'Financing Available',
];

export const PRICE_RANGES = [
  { value: '$', label: '$ — Budget-Friendly' },
  { value: '$$', label: '$$ — Moderate' },
  { value: '$$$', label: '$$$ — Upscale' },
  { value: '$$$$', label: '$$$$ — Premium / Luxury' },
];

export const SOCIAL_PLATFORMS = [
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourbusiness' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourbusiness' },
  { key: 'twitter', label: 'X (Twitter)', placeholder: 'https://x.com/yourbusiness' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yourbusiness' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourbusiness' },
];

// Default opening hours (Mon-Fri 9-5, Sat-Sun closed)
export const DEFAULT_HOURS = {
  Monday: { open: '09:00', close: '17:00', closed: false },
  Tuesday: { open: '09:00', close: '17:00', closed: false },
  Wednesday: { open: '09:00', close: '17:00', closed: false },
  Thursday: { open: '09:00', close: '17:00', closed: false },
  Friday: { open: '09:00', close: '17:00', closed: false },
  Saturday: { open: '10:00', close: '14:00', closed: true },
  Sunday: { open: '10:00', close: '14:00', closed: true },
};

export function getDefaultFormState() {
  return {
    subtype: 'LocalBusiness',
    name: '',
    description: '',
    url: '',
    telephone: '',
    email: '',
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: 'US',
    latitude: '',
    longitude: '',
    openingHours: { ...DEFAULT_HOURS },
    priceRange: '',
    paymentAccepted: [],
    socialProfiles: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
    },
    logo: '',
    image: '',
    foundingDate: '',
    isServiceArea: false,
    serviceAreas: [''],
    // Type-specific fields stored as dynamic object
    typeFields: {},
  };
}
