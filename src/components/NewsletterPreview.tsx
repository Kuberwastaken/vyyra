
import { useState, useEffect, useRef } from 'react';

const NewsletterPreview = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
          const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
          setScrollY(progress * 100);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See Your <span className="gradient-text">Newsletter</span> Come to Life
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how Vyyra transforms your social media posts into a beautifully formatted newsletter
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Connect Your Socials</h3>
                <p className="text-gray-600">Link your LinkedIn, X (Twitter), Instagram, and TikTok accounts</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Analyzes Your Content</h3>
                <p className="text-gray-600">Our agents understand your tone, style, and key themes</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Generate Your Newsletter</h3>
                <p className="text-gray-600">Get a polished, professional newsletter ready to share</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card rounded-3xl p-6 shadow-2xl overflow-hidden h-[600px]">
              <div 
                className="transition-transform duration-75 ease-out"
                style={{ transform: `translateY(-${scrollY * 2}px)` }}
              >
                {/* Newsletter Header */}
                <div className="bg-gradient-to-r from-gray-800 to-black text-white p-6 rounded-2xl mb-6">
                  <h1 className="text-2xl font-bold mb-2">The Weekly Digest</h1>
                  <p className="opacity-90">November Edition • Curated by AI</p>
                </div>

                {/* Newsletter Content */}
                <div className="space-y-6">
                  <article className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">
                      This Week's Highlights
                    </h2>
                    <div className="space-y-3 text-gray-600">
                      <p>From your LinkedIn post about product management...</p>
                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                    </div>
                  </article>

                  <article className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">
                      Tech Insights
                    </h2>
                    <div className="space-y-3 text-gray-600">
                      <p>Your X thread on AI developments resonated...</p>
                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                    </div>
                  </article>

                  <article className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">
                      Personal Reflections
                    </h2>
                    <div className="space-y-3 text-gray-600">
                      <p>Your Instagram story about work-life balance...</p>
                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                    </div>
                  </article>

                  <div className="bg-gray-50 p-6 rounded-2xl text-center">
                    <p className="text-sm text-gray-500">Generated from 23 social posts • AI-curated in your voice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPreview;
