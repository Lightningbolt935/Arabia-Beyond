import type { Metadata } from 'next';
import './globals.css';
import { TravelStoreProvider } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import LiveChatWidget from '@/components/common/LiveChatWidget';
import CookieConsent from '@/components/common/CookieConsent';

export const metadata: Metadata = {
  title: {
    default: 'Arab & Beyond | Ultra-Luxury Arabian Escapes & Bespoke Packages',
    template: '%s | Arab & Beyond'
  },
  description:
    'Handcrafted luxury travel across Bahrain, Oman, Saudi Arabia, The Red Sea, and Qatar. Private island sanctuaries, canyon retreats, and bespoke itineraries.',
  keywords: [
    'luxury travel arabia',
    'oman luxury holidays',
    'the red sea resorts',
    'saudi arabia luxury tours',
    'alula luxury hotels',
    'bahrain luxury escapes',
    'qatar bespoke holidays'
  ],
  authors: [{ name: 'Arab & Beyond Concierge' }],
  metadataBase: new URL('https://arabandbeyond.com'),
  openGraph: {
    title: 'Arab & Beyond | Ultra-Luxury Arabian Escapes',
    description:
      'Handcrafted luxury travel across Bahrain, Oman, Saudi Arabia, The Red Sea, and Qatar.',
    siteName: 'Arab & Beyond',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Arab & Beyond Luxury Arabian Travel'
      }
    ],
    locale: 'en_GB',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Arab & Beyond',
    image: 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke luxury holiday packages, private island sanctuaries, and concierge services across the Arabian Peninsula.',
    url: 'https://arabandbeyond.com',
    telephone: '+44 20 7946 0888',
    priceRange: '£££££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '35 Mayfair High St',
      addressLocality: 'London',
      postalCode: 'W1J 8FF',
      addressCountry: 'GB'
    },
    areaServed: ['Bahrain', 'Oman', 'Saudi Arabia', 'The Red Sea', 'Qatar']
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#07090E] text-[#F5F5F7] flex flex-col justify-between selection:bg-[#C5A880] selection:text-black font-sans antialiased">
        <TravelStoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <LiveChatWidget />
          <CookieConsent />
        </TravelStoreProvider>
      </body>
    </html>
  );
}

