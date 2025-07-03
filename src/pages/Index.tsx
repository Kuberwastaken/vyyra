import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Testimonials from "@/components/Testimonials";
import NewsletterPreview from "@/components/NewsletterPreview";
import StickyFooter from "@/components/StickyFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopNav />
      <Hero />
      <BentoGrid />
      <NewsletterPreview />
      <Testimonials />
      <footer className="w-full py-6 text-center text-gray-500 text-sm border-t border-gray-200/60 bg-white/70 backdrop-blur-md">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://vyyra.com"
          className="underline hover:text-black transition-colors"
        >
          Vyyra
        </a>
        . All rights reserved.
      </footer>
      <StickyFooter />
    </div>
  );
};

export default Index;
