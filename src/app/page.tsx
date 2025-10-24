import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import WhyChooseUs from '@/components/WhyChooseUs';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <ErrorMessage />
      </Suspense>
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
    </div>
  );
}
