import React from 'react';
import HeroVideo from '@/components/home/HeroVideo';
import CompactSearch from '@/components/home/CompactSearch';
import DestinationGrid from '@/components/home/DestinationGrid';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import FeaturedHotels from '@/components/home/FeaturedHotels';
import TailorMadeSection from '@/components/home/TailorMadeSection';
import TrustSection from '@/components/home/TrustSection';

export default function HomePage() {
  return (
    <div className="w-full bg-[#07090E] min-h-screen">
      {/* 1. Cinematic Luxury Video Hero (Section 6 & 7) */}
      <HeroVideo />

      {/* 2. Compact Search Module (Section 7 & 13) */}
      <CompactSearch />

      {/* 3. Five Destination Bento Showcase (Section 2 & 8) */}
      <DestinationGrid />

      {/* 4. Featured Luxury Packages (Section 7 & 9) */}
      <FeaturedPackages />

      {/* 5. Featured Hotels & Sanctuaries (Section 7 & 12) */}
      <FeaturedHotels />

      {/* 6. Tailor-Made Experiences (Section 4 & 7) */}
      <TailorMadeSection />

      {/* 7. Why Arab & Beyond Trust Section (Section 7 & 32) */}
      <TrustSection />
    </div>
  );
}
