import { Bot, AudioWaveform, Wand2, Download, Plug } from "lucide-react";
import React from "react";

const bentoItems = [
  {
    id: 1,
    title: "AI-Powered Digest",
    description:
      "Curated by multiple agents analyzing your content style and sentiment.",
    icon: Bot,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-gray-500/10 to-gray-600/10",
  },
  {
    id: 2,
    title: "Your Voice, Amplified",
    description: "Vyyra retains your tone, voice, and content rhythm.",
    icon: AudioWaveform,
    className: "md:col-span-1 md:row-span-2",
    gradient: "from-gray-600/10 to-gray-700/10",
  },
  {
    id: 3,
    title: "Zero Effort Publishing",
    description:
      "No writing or formatting — just connect your socials and get the newsletter.",
    icon: Wand2,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-gray-500/10 to-gray-600/10",
  },
  {
    id: 4,
    title: "Export Anywhere",
    description: "PDF, HTML, Substack-ready formats in one click.",
    icon: Download,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-gray-600/10 to-gray-700/10",
  },
  {
    id: 5,
    title: "Seamless Integration",
    description: "Connect with your favorite platforms effortlessly.",
    icon: Plug,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-gray-500/10 to-gray-600/10",
  },
];

const BentoGrid = () => {
  return (
    <section
      id="features"
      className="py-24 px-4 max-w-7xl mx-auto bento-section-bg"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          How <span className="gradient-text">Vyyra</span> Works
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your scattered social content into professional publications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr items-stretch">
        {bentoItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`bento-card group cursor-pointer ${item.className} bg-white/60 backdrop-blur-xl border border-[#888]/40 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] hover:-rotate-1 relative overflow-hidden flex flex-col h-full`}
              onClick={(e) => {
                e.currentTarget.classList.remove("pulse");
                void e.currentTarget.offsetWidth; // trigger reflow
                e.currentTarget.classList.add("pulse");
              }}
            >
              <div className="flex flex-col h-full relative z-30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative group/icon-float">
                    <span className="absolute inset-0 rounded-2xl blur-md opacity-60 bg-gradient-to-br from-gray-400/40 via-gray-600/30 to-black/20 group-hover:opacity-90 transition-all duration-300" />
                    <div className="p-3 rounded-2xl bg-gray-100/80 border border-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-300 relative z-10 icon-float">
                      <IconComponent className="w-7 h-7 text-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.10)] group-hover:drop-shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                {item.id === 2 ? (
                  <div className="text-gray-600 leading-relaxed flex-1 flex flex-col gap-2">
                    <div>
                      Vyyra retains your tone, voice, and content rhythm.
                    </div>
                    <ul className="mt-6 space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-waveform"
                          >
                            <polyline points="3 16 7 12 11 18 15 10 19 14" />
                          </svg>
                        </span>
                        <span className="text-base">
                          Preserves your unique writing style
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-volume-2"
                          >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19 12c0-2.21-1.79-4-4-4" />
                            <path d="M19 12c0 2.21-1.79 4-4 4" />
                          </svg>
                        </span>
                        <span className="text-base">
                          Amplifies your authentic voice
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-heart"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </span>
                        <span className="text-base">
                          Captures emotional nuances
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed flex-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BentoGrid;
