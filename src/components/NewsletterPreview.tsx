import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Maximize2, X as CloseIcon } from 'lucide-react';

const Section = ({ title, icon, children }) => (
  <section className="mb-10 bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
    <h2 className="flex items-center gap-2 text-2xl font-bold mb-4 tracking-tight">
      <span className="text-3xl">{icon}</span> {title}
    </h2>
    {children}
  </section>
);

const NewsletterHeroSection = (
  <article className="prose prose-neutral w-full bg-white rounded-3xl shadow-2xl border border-gray-200 notion-style overflow-hidden">
    <header className="bg-white px-8 py-8 flex flex-col gap-2 border-b border-gray-200">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight leading-tight text-gray-900">Alex's Weekly Recap <span className="text-2xl font-normal text-gray-500">(July 7, 2025)</span></h1>
      <div className="flex items-center gap-4 text-base text-gray-700 opacity-90 mb-2">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex Kumar" className="w-10 h-10 rounded-full border-2 border-gray-200" />
        <span className="font-medium">by Alex Kumar</span>
        <span className="opacity-60">·</span>
        <span className="opacity-80">Week 27, 2025</span>
      </div>
      <div className="text-lg mt-1 opacity-90 font-light text-gray-700">Hey friends! Here's what I've been up to this week as a creator, entrepreneur, and engineer. Thanks for following along on my journey!</div>
    </header>
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Newsletter Hero" className="w-full h-60 object-cover" />
  </article>
);

const NewsletterFullContent = (
  <article className="prose prose-neutral w-full bg-white rounded-3xl shadow-2xl border border-gray-200 notion-style overflow-hidden">
    <header className="bg-white px-8 py-8 flex flex-col gap-2 border-b border-gray-200">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight leading-tight text-gray-900">Alex's Weekly Recap <span className="text-2xl font-normal text-gray-500">(July 7, 2025)</span></h1>
      <div className="flex items-center gap-4 text-base text-gray-700 opacity-90 mb-2">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex Kumar" className="w-10 h-10 rounded-full border-2 border-gray-200" />
        <span className="font-medium">by Alex Kumar</span>
        <span className="opacity-60">·</span>
        <span className="opacity-80">Week 27, 2025</span>
      </div>
      <div className="text-lg mt-1 opacity-90 font-light text-gray-700">Hey friends! Here's what I've been up to this week as a creator, entrepreneur, and engineer. Thanks for following along on my journey!</div>
    </header>
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Newsletter Hero" className="w-full h-60 object-cover" />
    <main className="px-6 md:px-10 py-10">
      <Section title="New Project: IndieHub" icon="🚀">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80" alt="IndieHub" className="w-32 h-32 object-cover rounded-xl shadow" />
          <div>
            <p className="text-gray-700 mb-2">This week I launched <span className="font-bold text-blue-700">IndieHub</span>, a platform for indie makers to share their projects and get feedback. We hit <b>120 signups</b> in the first 3 days! 🎉</p>
            <code className="block bg-gray-100 text-gray-700 rounded px-2 py-1 text-sm mb-1">Built with Next.js, Supabase, and Tailwind CSS</code>
          </div>
        </div>
      </Section>
      <Section title="Project Deep Dive: Building IndieHub" icon="🔍">
        <p className="text-gray-700 mb-4">The idea started from a Twitter poll where 60% of my followers said they struggle to get feedback on side projects. I spent two days wireframing in Figma, then built the MVP in just 5 days. The hardest part? Getting the onboarding flow to feel welcoming and not overwhelming. I iterated on the copy 7 times before it felt right.</p>
        <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Wireframe" className="w-full h-48 object-cover rounded-xl my-4 shadow" />
        <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-700 bg-blue-50 rounded">“If you want to check out the code, I open-sourced the core feedback module. Would love your thoughts!”</blockquote>
      </Section>
      <Section title="Social Growth" icon="📈">
        <div className="flex gap-8 justify-center mb-2">
          <div className="flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="X" className="w-10 h-10 mb-1" />
            <span className="font-bold text-xl">+320</span>
            <span className="text-xs text-gray-500">New X Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="Instagram" className="w-10 h-10 mb-1" />
            <span className="font-bold text-xl">+210</span>
            <span className="text-xs text-gray-500">New IG Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-10 h-10 mb-1" />
            <span className="font-bold text-xl">+95</span>
            <span className="text-xs text-gray-500">New LinkedIn</span>
          </div>
        </div>
      </Section>
      <Section title="Lessons Learned" icon="📚">
        <ul className="list-disc pl-5 text-gray-700">
          <li><b>Launch early, iterate often:</b> The MVP wasn't perfect, but real user feedback was 10x more valuable than more polish.</li>
          <li><b>Community is everything:</b> The first 20 users came from my DMs. Don't be afraid to ask for help!</li>
          <li><b>Automate the boring stuff:</b> I set up a Zapier workflow to send me a Slack ping for every new signup. It's a tiny dopamine hit every time.</li>
        </ul>
      </Section>
      <Section title="What Inspired Me This Week" icon="📖">
        <div className="flex flex-col md:flex-row gap-6 mb-2">
          <div className="flex gap-4 items-center">
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=80&q=80" alt="Book" className="w-16 h-16 object-cover rounded-lg shadow" />
            <div>
              <span className="font-bold">Book:</span> <span className="italic">Show Your Work!</span> by Austin Kleon<br/>
              <span className="text-gray-600 text-sm">A must-read for anyone building in public. My favorite quote: "Share something small every day."</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=80&q=80" alt="Podcast" className="w-16 h-16 object-cover rounded-lg shadow" />
            <div>
              <span className="font-bold">Podcast:</span> <span className="italic">Indie Hackers Podcast</span><br/>
              <span className="text-gray-600 text-sm">Listened to the episode with Courtland Allen and Daniel Vassallo. So many gems about audience-first products.</span>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Q&A: Ask Me Anything" icon="❓">
        <div className="mb-2">
          <p className="mb-2"><b>Q:</b> How do you stay motivated when a project stalls?</p>
          <p className="mb-4 text-gray-700"><b>A:</b> I remind myself why I started, take a break, and talk to other makers. Sometimes a walk or a chat is all it takes to get unstuck.</p>
          <p className="mb-2"><b>Q:</b> What's your favorite tool this week?</p>
          <p className="text-gray-700"><b>A:</b> <span className="font-bold text-blue-700">Raycast</span> for quick workflows and <span className="font-bold text-green-700">Fathom Analytics</span> for simple, privacy-friendly stats.</p>
        </div>
      </Section>
      <Section title="Life Update" icon="🌱">
        <div className="flex gap-4 items-center">
          <img src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=200&q=80" alt="Life Update" className="w-24 h-24 object-cover rounded-lg shadow" />
          <div>
            <p className="text-gray-700">Started a new morning routine: 6am runs, journaling, and no phone until 9am. Already feeling more focused and creative! 🏃‍♂️📓</p>
          </div>
        </div>
      </Section>
      <Section title="Tech I'm Excited About" icon="💻">
        <div className="flex gap-4 items-center">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Tech" className="w-24 h-24 object-cover rounded-lg shadow" />
          <div>
            <p className="text-gray-700">Been diving into <span className="font-bold text-green-700">AI agents</span> and <span className="font-bold text-purple-700">Edge Functions</span> this week. Super inspired by what's possible with serverless and LLMs. Stay tuned for some experiments! 🤖</p>
          </div>
        </div>
      </Section>
      <Section title="Upcoming Goals" icon="🎯">
        <ul className="list-disc pl-5 text-gray-700">
          <li>Ship IndieHub v1.1 with project upvoting and comments</li>
          <li>Write a blog post about my build-in-public journey</li>
          <li>Host a Twitter Space with other indie founders</li>
          <li>Take a full day off (no laptop!)</li>
        </ul>
      </Section>
      <Section title="Reflections" icon="📝">
        <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-700 bg-blue-50 rounded">
          "This week reminded me that progress isn't always linear. Celebrate the small wins, and don't be afraid to launch before you're ready."
        </blockquote>
      </Section>
      {/* Footer CTA */}
      <div className="text-center mt-8 mb-2">
        <a href="#" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition">Reply & let me know what you're working on! →</a>
      </div>
      <div className="text-center text-xs text-gray-400 mb-2">© 2025 Alex Kumar. Thanks for reading!</div>
    </main>
  </article>
);

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
        <div className="flex justify-center">
          <div className="w-full max-w-2xl relative">
            {/* Newsletter Card with Expand Button */}
            <div className="relative">
              {NewsletterHeroSection}
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow transition flex items-center"
                    aria-label="Expand newsletter preview"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-600" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[85vw] w-[85vw] h-[90vh] p-0 flex flex-col items-center justify-center bg-transparent border-none shadow-none">
                  <div className="relative w-full h-full flex flex-col">
                    <DialogClose asChild>
                      <button
                        className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow"
                        aria-label="Close expanded newsletter"
                        data-close="true"
                      >
                        <CloseIcon className="w-5 h-5 text-gray-600" />
                      </button>
                    </DialogClose>
                    <div className="overflow-y-auto w-full h-full flex-1 flex justify-center items-start pt-8 pb-8">
                      <div className="w-full max-w-3xl">{NewsletterFullContent}</div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPreview;
