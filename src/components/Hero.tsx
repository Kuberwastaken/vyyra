import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const newsletterTitle = 'The Weekly Digest - November Edition';
  
  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        if (displayText.length < newsletterTitle.length) {
          setDisplayText(newsletterTitle.slice(0, displayText.length + 1));
        } else {
          setIsTyping(false);
        }
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [displayText, isTyping, newsletterTitle]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-16">
      <div className="text-center max-w-6xl mx-auto relative z-10">
        {/* Main tagline - now the biggest element */}
        <h1 className="tagline-font text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold mb-8 leading-tight text-gray-800 animate-fade-in">
          "Where scattered thoughts<br />
          become <span className="gradient-text">structured stories</span>"
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Vyyra auto-generates a sleek, intelligent monthly newsletter from your posts 
          across LinkedIn & X — powered by AI agents tuned to your tone.
        </p>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 rounded-2xl bg-black hover:bg-gray-800 text-white shadow-2xl hover:shadow-black/25 transition-all duration-300 hover:scale-105 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          Generate My First Issue →
        </Button>

        {/* Newsletter Preview Animation */}
        <div className="mt-16 mx-auto max-w-md animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="glass-card rounded-3xl p-6 shadow-2xl">
            <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-200">
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="text-lg font-semibold mb-2 border-r-2 border-black pr-1 overflow-hidden whitespace-nowrap">
                {displayText}
                {isTyping && <span className="animate-blink">|</span>}
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded w-full"></div>
                <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                <div className="h-2 bg-gray-100 rounded w-5/6"></div>
              </div>
            </div>
            <div className="text-sm text-gray-500 text-center">
              ✨ Generated from your social posts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
