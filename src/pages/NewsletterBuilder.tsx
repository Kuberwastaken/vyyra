import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SOCIAL_PLACEHOLDERS = [
  "https://youtube.com/@yourchannel",
  "https://instagram.com/yourprofile",
  "https://linkedin.com/in/yourprofile",
];

const TIME_RANGES = [
  { label: "Past week", value: "week" },
  { label: "Past month", value: "month" },
];

export default function NewsletterBuilder() {
  const [links, setLinks] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [newsletter, setNewsletter] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("week");
  const [scraped, setScraped] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLinkChange = (idx: number, value: string) => {
    setLinks((prev) => prev.map((l, i) => (i === idx ? value : l)));
  };

  const addLink = () => setLinks((prev) => [...prev, ""]);
  const removeLink = (idx: number) => setLinks((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNewsletter(null);
    setScraped(null);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/api/scrape-and-transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links, timeRange }),
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setScraped(data.posts);
      setNewsletter("[Newsletter will appear here after processing]");
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f7f7fa] py-12 px-2 md:px-4">
      <Card className="max-w-xl w-full p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Build Your Weekly Newsletter</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {links.map((link, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <Input
                type="url"
                placeholder={SOCIAL_PLACEHOLDERS[idx] || "Paste your social link"}
                value={link}
                onChange={(e) => handleLinkChange(idx, e.target.value)}
                required={idx === 0}
                className="flex-1"
              />
              {links.length > 1 && (
                <Button type="button" variant="destructive" onClick={() => removeLink(idx)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <div className="flex gap-4 items-center">
            <label className="font-medium">How far back?</label>
            <select
              className="border rounded px-3 py-2 text-base"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              disabled={loading}
            >
              {TIME_RANGES.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <Button type="button" variant="secondary" onClick={addLink}>
            + Add another link
          </Button>
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Generating..." : "Generate Newsletter"}
          </Button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </Card>
      <Card className="max-w-2xl w-full p-8 min-h-[300px] flex items-center justify-center bg-white shadow-xl">
        {loading ? (
          <span className="text-gray-400 animate-pulse">Processing your social links...</span>
        ) : newsletter ? (
          <span className="text-gray-700 whitespace-pre-line">{newsletter}</span>
        ) : (
          <span className="text-gray-400">Your generated newsletter will appear here.</span>
        )}
      </Card>
      {/* Scraped posts/videos section */}
      {scraped && scraped.length > 0 && (
        <Card className="max-w-2xl w-full p-8 mt-8 bg-white shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Posts & Videos Used</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scraped.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center border rounded-lg p-3 hover:shadow-lg transition w-full"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex flex-col items-center"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded mb-2 border"
                  />
                  <div className="text-sm font-bold text-center mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500 mb-1">{item.platform}</div>
                  <div className="text-xs text-gray-400">{item.date}</div>
                </a>
                {item.transcript && (
                  <div className="mt-2 w-full bg-gray-50 rounded p-2 text-xs text-gray-700 max-h-40 overflow-auto">
                    <b>Transcript:</b>
                    <div className="whitespace-pre-line mt-1">{item.transcript}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
} 