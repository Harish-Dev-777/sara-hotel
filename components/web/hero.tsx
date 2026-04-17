'use client';

import { HeroSection } from "@/components/ui/dynamic-hero";

const Hero = () => {
  return (
    <HeroSection
      heading="Stay Beyond Expectations"
      tagline="Experience the perfect blend of comfort, luxury, and warm hospitality at Sara Hotel. Your ideal destination for relaxation and rejuvenation."
      buttonText="Book Your Stay"
      buttonHref="/contact"
      imageUrl="/sara.png"
      navItems={[]} 
    />
  );
};

export default Hero;
