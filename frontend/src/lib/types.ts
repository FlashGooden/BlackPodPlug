export interface Podcast {
  id: string;
  title: string;
  description?: string;
  author?: string;
  imageUrl?: string;
  rssUrl?: string;
  applePodcastId?: string;
  spotifyId?: string;
  categories?: string[];
  tags?: string[];
  language: string;
  isVerified: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  submitSource: string;
  createdAt: string;
  updatedAt: string;
}

export interface Episode {
  id: string;
  podcastId: string;
  title?: string;
  description?: string;
  audioUrl?: string;
  duration?: number;
  episodeNumber?: number;
  seasonNumber?: number;
  publishedAt?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  subscriptionTier: 'free' | 'premium' | 'podcaster_pro';
  isPodcaster: boolean;
  podcastIds?: string[];
  favorites?: string[];
  playlists?: any[];
  isActive: boolean;
  createdAt: string;
}