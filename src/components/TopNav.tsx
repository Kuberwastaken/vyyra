
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const TopNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold">
          Vyyra
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-black transition-colors">
            Features
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-black transition-colors">
            Testimonials
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-black transition-colors">
            Pricing
          </a>
        </div>

        <Button 
          className="bg-black hover:bg-gray-800 text-white rounded-xl px-6"
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default TopNav;
