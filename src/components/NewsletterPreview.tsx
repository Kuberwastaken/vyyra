import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NewsletterExample from "../pages/NewsletterExample";

const SOCIALS = [
  { key: "twitter", label: "Twitter", placeholder: "@alexkumar", default: "@alexkumar" },
  { key: "instagram", label: "Instagram", placeholder: "@alex.gram", default: "@alex.gram" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/alexkumar", default: "https://linkedin.com/in/alexkumar" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@alexkumar", default: "https://youtube.com/@alexkumar" },
];

const TIME_RANGES = [
  { label: "Past week", value: "week" },
  { label: "Past month", value: "month" },
];

const NewsletterPreview = () => {
  const [name, setName] = useState("Alex Kumar");
  const [socials, setSocials] = useState({
    twitter: true,
    instagram: true,
    linkedin: false,
    youtube: true,
  });
  const [socialInputs, setSocialInputs] = useState({
    twitter: "@alexkumar",
    instagram: "@alex.gram",
    linkedin: "https://linkedin.com/in/alexkumar",
    youtube: "https://youtube.com/@alexkumar",
  });
  const [timeRange, setTimeRange] = useState("week");
  const [loading, setLoading] = useState(false);
  const [showGeneration, setShowGeneration] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSocialCheck = (key: string) => {
    setSocials((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleInputChange = (key: string, value: string) => {
    setSocialInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowGeneration(false);
    setProgress(0);
    // Animate progress bar over 5-9 seconds
    const totalDuration = Math.floor(Math.random() * 4000) + 5000; // 5000-9000 ms
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min(100, (elapsed / totalDuration) * 100);
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          setShowGeneration(true);
        }, 400);
      }
    }, 50);
  };

  return (
    <section className="py-24 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See Your <span className="gradient-text">Newsletter</span> Come to Life
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simulate making your own newsletter by entering your social links below!
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Card className="max-w-xl w-full p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Build Your Weekly Newsletter</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Your Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Socials to include</label>
                <div className="flex gap-4 flex-wrap">
                  {SOCIALS.map((s) => (
                    <label key={s.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={socials[s.key as keyof typeof socials]}
                        onChange={() => handleSocialCheck(s.key)}
                        disabled={loading}
                        className="accent-pink-400 w-4 h-4 rounded focus:ring-2 focus:ring-pink-400"
                      />
                      <span className="text-gray-800 capitalize">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Show prefilled input for each checked social */}
              <div className="space-y-2">
                {SOCIALS.map((s) =>
                  socials[s.key as keyof typeof socials] && (
                    <div key={s.key} className="flex flex-col md:flex-row gap-2 items-center">
                      <label className="block text-gray-600 text-xs md:w-32 capitalize">{s.label}:</label>
                      <Input
                        type="text"
                        className="flex-1"
                        value={socialInputs[s.key as keyof typeof socialInputs]}
                        onChange={e => handleInputChange(s.key, e.target.value)}
                        placeholder={s.placeholder}
                        disabled={loading}
                      />
                    </div>
                  )
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">How far back?</label>
                <select
                  className="border rounded px-3 py-2 text-base"
                  value={timeRange}
                  onChange={e => setTimeRange(e.target.value)}
                  disabled={loading}
                >
                  {TIME_RANGES.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <Button
                  id="get-started"
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-400 text-white font-bold text-base shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="tracking-wider">Analyzing</span>
                      <span className="animate-pulse ml-1">...</span>
                    </>
                  ) : (
                    <>
                      Generate Newsletter
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
          <Card className="max-w-2xl w-full p-8 min-h-[300px] flex items-center justify-center bg-white shadow-xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 w-full">
                {/* Progress Bar */}
                <div className="w-full max-w-md h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400 animate-pulse"
                    style={{ width: `${progress}%`, transition: 'width 0.3s' }}
                  />
                </div>
                <svg className="animate-spin h-8 w-8 text-cyan-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                <span className="text-cyan-200 text-lg font-medium animate-pulse">AI is generating your newsletter…</span>
                <span className="text-gray-500 mt-2">This may take a few seconds</span>
              </div>
            ) : showGeneration ? (
              <NewsletterExample />
            ) : (
              <span className="text-gray-400">Your generated newsletter will appear here.</span>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPreview;
