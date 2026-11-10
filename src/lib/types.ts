export type DestinationSlug = 'bahrain' | 'oman' | 'saudi-arabia' | 'the-red-sea' | 'qatar' | string;

export interface Destination {
  id: string;
  name: string;
  slug: DestinationSlug;
  country: string;
  isRegionOf?: string; // e.g. "Saudi Arabia" for The Red Sea
  tagline: string;
  description: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  overview: string;
  highlights: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  bestTimeToVisit: {
    season: string;
    temperature: string;
    description: string;
    recommendedMonths: string[];
  };
  practicalInfo: {
    currency: string;
    timeZone: string;
    flightDuration: string;
    language: string;
    visaNotice: string;
  };
  gallery: {
    url: string;
    caption: string;
    alt: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
  featuredOnHome: boolean;
  active: boolean;
  displayOrder: number;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  overnightLocation: string;
  hotelName?: string;
  hotelId?: string;
  summary: string;
  description: string[]; // multi-paragraph
  schedule?: {
    morning?: string;
    afternoon?: string;
    evening?: string;
  };
  includedActivities: string[];
  mealsIncluded: ('Breakfast' | 'Lunch' | 'Dinner' | 'Tasting' | 'Afternoon Tea')[];
  transfers: string;
  images: {
    url: string;
    caption: string;
    alt: string;
  }[];
  notes?: {
    dressCode?: string;
    activityLevel?: 'Relaxed' | 'Moderate' | 'Active';
    drivingDistance?: string;
    whatToBring?: string;
  };
}

export interface DepartureDate {
  id: string;
  startDate: string;
  endDate: string;
  pricePerPerson: number;
  singleSupplement: number;
  status: 'available' | 'limited' | 'sold_out' | 'on_request';
  allocationLeft?: number;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  destinationId: string;
  destinationSlug: DestinationSlug;
  destinationName: string;
  cities: string[];
  durationDays: number;
  durationNights: number;
  travelStyle: 'Luxury Escapes' | 'Private Tour' | 'Cultural Discovery' | 'Wellness & Marine' | 'Desert Expedition' | 'Family Sanctuary';
  groupType: 'Private Only' | 'Small Luxury Group' | 'Flexible Dates';
  priceFrom: number;
  currency: string;
  isPriceOnRequest: boolean;
  status: 'live' | 'draft' | 'demo' | 'archived';
  isFeatured: boolean;
  shortSummary: string;
  fullDescription: string;
  heroImage: string;
  gallery: {
    url: string;
    caption: string;
    alt: string;
  }[];
  heroVideoUrl?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  accommodationsSummary: string;
  linkedHotelIds: string[];
  itinerary: ItineraryDay[];
  departureDates: DepartureDate[];
  meetingPoint: string;
  suitableFor: string[];
  activityLevel: 'Gentle' | 'Moderate' | 'Demanding';
  accessibilityNotes: string;
  visaNotice: string;
  cancellationPolicy: string;
  primaryCtaType: 'book_now' | 'check_availability' | 'enquire_now' | 'price_on_request';
  metaTitle: string;
  metaDescription: string;
  badge?: string;
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  sizeSqM: number;
  bedSetup: string;
  maxGuests: number;
  view: string;
  imageUrl: string;
  gallery: string[];
  boardBasis: 'Room Only' | 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive Luxury';
  pricePerNightFrom: number;
  amenities: string[];
  rateType: 'indicative_rate' | 'supplier_confirmed';
}

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  destinationId: string;
  destinationSlug: DestinationSlug;
  destinationName: string;
  city: string;
  address: string;
  starRating: 5;
  verifiedLuxuryTier: 'Ultra Luxury' | 'Heritage Boutique' | 'Private Island Sanctuary' | 'Desert Oasis';
  heroImage: string;
  gallery: {
    url: string;
    caption: string;
    alt: string;
  }[];
  priceFromPerNight: number;
  currency: string;
  isPriceOnRequest: boolean;
  shortSummary: string;
  fullOverview: string;
  amenities: string[];
  roomTypes: RoomType[];
  policies: {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    childPolicy: string;
    taxesAndFees: string;
    paymentTerms: string;
  };
  nearbyAttractions: {
    name: string;
    distance: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  linkedPackageIds: string[];
  isFeatured: boolean;
  active: boolean;
  metaTitle: string;
  metaDescription: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Quoted' | 'Follow-up' | 'Won' | 'Lost' | 'Spam';

export interface Enquiry {
  id: string;
  referenceId: string; // e.g. "AB-ENQ-2026-8812"
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  destinationId?: string;
  destinationName?: string;
  packageId?: string;
  packageName?: string;
  hotelId?: string;
  hotelName?: string;
  travelDatesType: 'exact' | 'approximate' | 'flexible';
  startDate?: string;
  endDate?: string;
  adultsCount: number;
  childrenCount: number;
  childrenAges?: string;
  roomsCount?: number;
  budgetRange?: string;
  preferredContactMethod: 'Email' | 'Phone' | 'WhatsApp';
  requirements: string;
  sourcePage: string;
  enquiryChannel: 'Website Form' | 'Package Page' | 'Hotel Page' | 'WhatsApp Direct' | 'Live Concierge Chat' | 'Tailor-Made Planner';
  status: EnquiryStatus;
  assignedAgent?: string;
  priority: 'Low' | 'Medium' | 'High' | 'VIP';
  internalNotes?: {
    id: string;
    author: string;
    timestamp: string;
    content: string;
  }[];
  followUpDate?: string;
}

export type OrderStatus =
  | 'enquiry_received'
  | 'quotation_sent'
  | 'awaiting_availability'
  | 'availability_confirmed'
  | 'payment_pending'
  | 'part_paid'
  | 'paid'
  | 'booking_pending_supplier_confirmation'
  | 'confirmed'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'partially_refunded' | 'refunded';
export type PaymentMethod = 'card' | 'paypal' | 'super_payments' | 'buy_now_pay_later' | 'bank_transfer_request';

export interface BookingOrder {
  id: string;
  orderReference: string; // e.g. "AB-RES-2026-9041"
  createdAt: string;
  type: 'package' | 'hotel' | 'tailor_made';
  productId: string;
  productName: string;
  destinationName: string;
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
    dietaryRestrictions?: string;
  };
  travelDates: {
    startDate: string;
    endDate: string;
    durationDays?: number;
  };
  travellers: {
    adults: number;
    children: number;
  };
  roomOrOptionSelected: string;
  lineItems: {
    description: string;
    amount: number;
  }[];
  subtotal: number;
  taxesAndFees: number;
  totalAmount: number;
  currency: string;
  depositRequired: number;
  balanceDue: number;
  balanceDueDate?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  termsAccepted: boolean;
  termsAcceptedTimestamp: string;
  termsVersion: string;
  supplierConfirmationReference?: string;
  isDemoTransaction: boolean;
  auditTrail: {
    timestamp: string;
    action: string;
    performedBy: string;
    notes?: string;
  }[];
}

export interface WebsiteSettings {
  companyName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  londonOffice: string;
  dubaiOffice: string;
  whatsAppNumber: string;
  whatsAppDefaultMessage: string;
  clickConnectorApiKey: string;
  clickConnectorEnabled: boolean;
  supportedCurrencies: string[];
  defaultCurrency: string;
  maintenanceMode: boolean;
}

