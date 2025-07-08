const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { AssemblyAI } = require('assemblyai');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// CORS for local dev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Serve audio files statically
const audioDir = path.join(__dirname, 'audio');
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir);
app.use('/audio', express.static(audioDir));

// Helper to extract YouTube channel ID or username from URL
function extractYouTubeChannelId(url) {
  const atMatch = url.match(/youtube\.com\/@([\w-]+)/);
  if (atMatch) return atMatch[1];
  const idMatch = url.match(/youtube\.com\/channel\/([\w-]+)/);
  if (idMatch) return idMatch[1];
  return null;
}

// Helper to get channel_id from @username page
async function getChannelIdFromUsername(username) {
  const res = await fetch(`https://www.youtube.com/@${username}`);
  if (!res.ok) return null;
  const html = await res.text();
  const match = html.match(/"channelId":"([\w-]+)"/);
  return match ? match[1] : null;
}

// Fetch public YouTube videos (try user feed, then channel_id feed)
async function fetchYouTubeVideos(channel, timeRange, isUsername = false) {
  let items = [];
  // Try user feed first
  if (isUsername) {
    const userFeedUrl = `https://www.youtube.com/feeds/videos.xml?user=${channel}`;
    let res = await fetch(userFeedUrl);
    if (res.ok) {
      const xml = await res.text();
      items = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g));
    }
    // If no items, try to get channel_id and fetch channel_id feed
    if (!items.length) {
      const channelId = await getChannelIdFromUsername(channel);
      if (channelId) {
        const channelFeedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        res = await fetch(channelFeedUrl);
        if (res.ok) {
          const xml = await res.text();
          items = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g));
        }
      }
    }
  } else {
    // channel is already a channel_id
    const channelFeedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`;
    const res = await fetch(channelFeedUrl);
    if (res.ok) {
      const xml = await res.text();
      items = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g));
    }
  }
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
    return { platform: "YouTube", title, url, date: date.slice(0, 10), thumbnail, videoId: id };
  }).filter((v) => v.date && new Date(v.date) >= cutoff);
}

// Helper to download audio from YouTube using yt-dlp
function downloadYouTubeAudio(videoUrl, outPath) {
  return new Promise((resolve, reject) => {
    const cmd = `yt-dlp -x --audio-format mp3 -o "${outPath}" ${videoUrl}`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(stderr || error);
      resolve();
    });
  });
}

app.post('/api/scrape-socials', async (req, res) => {
  const { links, timeRange } = req.body;
  let results = [];
  for (const link of links) {
    if (link.includes("youtube.com")) {
      const atMatch = link.match(/youtube\.com\/@([\w-]+)/);
      const idMatch = link.match(/youtube\.com\/channel\/([\w-]+)/);
      if (atMatch) {
        const vids = await fetchYouTubeVideos(atMatch[1], timeRange, true);
        results = results.concat(vids);
      } else if (idMatch) {
        const vids = await fetchYouTubeVideos(idMatch[1], timeRange, false);
        results = results.concat(vids);
      }
    } else if (link.includes("instagram.com")) {
      results.push({
        platform: "Instagram",
        title: "Mocked Instagram Post",
        url: link,
        date: new Date().toISOString().slice(0, 10),
        thumbnail: "https://placehold.co/120x120?text=IG",
      });
    } else if (link.includes("linkedin.com")) {
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
});

// AssemblyAI transcription endpoint
app.post('/api/transcribe', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });
    const transcript = await client.transcripts.transcribe({ audio: url });
    if (transcript.status === 'error') {
      return res.status(500).json({ error: transcript.error });
    }
    res.json({ text: transcript.text });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Transcription failed' });
  }
});

// Scrape and transcribe endpoint
app.post('/api/scrape-and-transcribe', async (req, res) => {
  const { links, timeRange } = req.body;
  let results = [];
  for (const link of links) {
    if (link.includes("youtube.com")) {
      const atMatch = link.match(/youtube\.com\/@([\w-]+)/);
      const idMatch = link.match(/youtube\.com\/channel\/([\w-]+)/);
      let vids = [];
      if (atMatch) {
        vids = await fetchYouTubeVideos(atMatch[1], timeRange, true);
      } else if (idMatch) {
        vids = await fetchYouTubeVideos(idMatch[1], timeRange, false);
      }
      for (const vid of vids) {
        try {
          const audioFile = path.join(audioDir, `${vid.videoId}.mp3`);
          const audioUrl = `/audio/${vid.videoId}.mp3`;
          if (!fs.existsSync(audioFile)) {
            await downloadYouTubeAudio(vid.url, audioFile);
          }
          // Transcribe
          const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });
          const transcript = await client.transcripts.transcribe({ audio: `http://localhost:3001${audioUrl}` });
          vid.transcript = transcript.text;
          vid.audioUrl = audioUrl;
        } catch (err) {
          vid.transcript = "[Transcription failed]";
          vid.audioUrl = null;
        }
        results.push(vid);
      }
    } else if (link.includes("instagram.com")) {
      results.push({
        platform: "Instagram",
        title: "Mocked Instagram Post",
        url: link,
        date: new Date().toISOString().slice(0, 10),
        thumbnail: "https://placehold.co/120x120?text=IG",
        transcript: null,
        audioUrl: null,
      });
    } else if (link.includes("linkedin.com")) {
      results.push({
        platform: "LinkedIn",
        title: "Mocked LinkedIn Post",
        url: link,
        date: new Date().toISOString().slice(0, 10),
        thumbnail: "https://placehold.co/120x120?text=LI",
        transcript: null,
        audioUrl: null,
      });
    }
  }
  res.json({ posts: results });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
}); 