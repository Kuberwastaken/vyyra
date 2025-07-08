import type { NextApiRequest, NextApiResponse } from "next";

// Helper to extract YouTube channel ID or username from URL
function extractYouTubeChannelId(url: string): string | null {
  // Supports https://youtube.com/@username or /channel/ID
  const atMatch = url.match(/youtube\.com\/@([\w-]+)/);
  if (atMatch) return atMatch[1];
  const idMatch = url.match(/youtube\.com\/channel\/([\w-]+)/);
  if (idMatch) return idMatch[1];
  return null;
}

// Fetch public YouTube videos (no API key, limited to RSS)
async function fetchYouTubeVideos(channel: string, timeRange: string) {
  // Use YouTube RSS feed: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
  // or https://www.youtube.com/feeds/videos.xml?user=USERNAME
  let feedUrl = channel.length < 20
    ? `https://www.youtube.com/feeds/videos.xml?user=${channel}`
    : `https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`;
  const res = await fetch(feedUrl);
  if (!res.ok) return [];
  const xml = await res.text();
  // Parse XML (very basic)
  const items = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g));
  const now = new Date();
  const cutoff = new Date(now);
  if (timeRange === "week") cutoff.setDate(now.getDate() - 7);
  else cutoff.setMonth(now.getMonth() - 1);
  return items.map((m) => {
    const entry = m[1];
    const title = (entry.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
    const url = (entry.match(/<link rel='alternate' href='([\s\S]*?)'/) || [])[1] || "";
    const date = (entry.match(/<published>([\s\S]*?)<\/published>/) || [])[1] || "";
    const id = (entry.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/) || [])[1] || "";
    const thumbnail = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
    return { platform: "YouTube", title, url, date: date.slice(0, 10), thumbnail };
  }).filter((v) => v.date && new Date(v.date) >= cutoff);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { links, timeRange } = req.body;
  let results: any[] = [];
  for (const link of links) {
    if (link.includes("youtube.com")) {
      const channel = extractYouTubeChannelId(link);
      if (channel) {
        const vids = await fetchYouTubeVideos(channel, timeRange);
        results = results.concat(vids);
      }
    } else if (link.includes("instagram.com")) {
      // Mocked Instagram post
      results.push({
        platform: "Instagram",
        title: "Mocked Instagram Post",
        url: link,
        date: new Date().toISOString().slice(0, 10),
        thumbnail: "https://placehold.co/120x120?text=IG",
      });
    } else if (link.includes("linkedin.com")) {
      // Mocked LinkedIn post
      results.push({
        platform: "LinkedIn",
        title: "Mocked LinkedIn Post",
        url: link,
        date: new Date().toISOString().slice(0, 10),
        thumbnail: "https://placehold.co/120x120?text=LI",
      });
    }
  }
  res.json({ posts: results });
} 