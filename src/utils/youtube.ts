/**
 * YouTube Utility Helper
 * Extracts YouTube video ID from various URL formats (watch, share, embed, shorts)
 * and generates clean embed URLs for playing directly inside the website.
 */

export function extractYouTubeId(urlOrId?: string): string | null {
  if (!urlOrId) return null;

  const trimmed = urlOrId.trim();

  // If it's already an 11-character video ID with alphanumeric, dashes, underscores
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Common YouTube URL regex
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = trimmed.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

export function getYouTubeEmbedUrl(urlOrId?: string, autoplay = true): string | null {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return null;

  const autoplayParam = autoplay ? 'autoplay=1&mute=0&' : 'autoplay=0&';
  return `https://www.youtube.com/embed/${videoId}?${autoplayParam}rel=0&playsinline=1&modestbranding=1&enablejsapi=1`;
}

export function getYouTubeThumbnail(urlOrId?: string, quality: 'hq' | 'maxres' = 'hq'): string {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/${quality === 'maxres' ? 'maxresdefault' : 'hqdefault'}.jpg`;
}

export function getYouTubeWatchUrl(urlOrId?: string, isShort = false): string {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return 'https://www.youtube.com/@groovinto-1';
  return isShort ? `https://www.youtube.com/shorts/${videoId}` : `https://www.youtube.com/watch?v=${videoId}`;
}
