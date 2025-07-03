
import { Bot, AudioWaveform, Wand2, Download } from 'lucide-react';

const bentoItems = [
  {
    id: 1,
    title: "AI-Powered Digest",
    description: "Curated by multiple agents analyzing your content style and sentiment.",
    icon: Bot,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-gray-500/10 to-gray-600/10"
  },
  {
    id: 2,
    title: "Your Voice, Amplified",
    description: "Vyyra retains your tone, voice, and content rhythm.",
    icon: AudioWaveform,
    className: "md:col-span-1 md:row-span-2",
    gradient: "from-gray-600/10 to-gray-700/10"
  },
  {
    id: 3,
    title: "Zero Effort Publishing",
    description: "No writing or formatting — just connect your socials and get the newsletter.",
    icon: Wand2,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-gray-500/10 to-gray-600/10"
  },
  {
    id: 4,
    title: "Export Anywhere",
    description: "PDF, HTML, Substack-ready formats in one click.",
    icon: Download,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-gray-600/10 to-gray-700/10"
  }
];

const BentoGrid = () => {
  return (
    <section id="features" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          How <span className="gradient-text">Vyyra</span> Works
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your scattered social content into professional publications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {bentoItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`bento-card group cursor-pointer ${item.className} bg-white/80 border border-gray-300/50`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-gray-100 border border-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="h-1 w-12 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BentoGrid;
