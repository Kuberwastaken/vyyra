
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
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Floating polka dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-6xl mx-auto relative z-10">
        {/* Main headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          From Posts to{' '}
          <span className="gradient-text">Publications</span>
        </h1>
        
        <div className="text-lg md:text-xl mb-4 text-gray-600">
          Let Your Social Media Speak in{' '}
          <span className="font-semibold text-purple-600">Volumes</span>
        </div>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          Vyyra auto-generates a sleek, intelligent monthly newsletter from your posts 
          across LinkedIn & X — powered by AI agents tuned to your tone.
        </p>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
        >
          Generate My First Issue →
        </Button>

        {/* Newsletter Preview Animation */}
        <div className="mt-16 mx-auto max-w-md">
          <div className="glass-card rounded-3xl p-6 shadow-2xl">
            <div className="bg-white rounded-2xl p-4 mb-4">
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="text-lg font-semibold mb-2 border-r-2 border-purple-600 pr-1 overflow-hidden whitespace-nowrap">
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
