
import TopNav from '@/components/TopNav';
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import Testimonials from '@/components/Testimonials';
import NewsletterPreview from '@/components/NewsletterPreview';
import StickyFooter from '@/components/StickyFooter';

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopNav />
      <Hero />
      <BentoGrid />
      <NewsletterPreview />
      <Testimonials />
      <StickyFooter />
    </div>
  );
};

export default Index;
