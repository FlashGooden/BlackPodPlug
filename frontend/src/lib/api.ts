import { Podcast, Episode } from './types';

// Normalize API response to match expected interface
function normalizePodcast(podcast: any): Podcast {
  return {
    ...podcast,
    // Map snake_case to camelCase for backwards compatibility
    imageUrl: podcast.image_url,
    rssUrl: podcast.rss_url,
    applePodcastId: podcast.apple_podcast_id,
    spotifyId: podcast.spotify_id,
    isVerified: podcast.is_verified,
    isFeatured: podcast.is_featured,
    isPremium: podcast.is_premium,
    submitSource: podcast.submit_source,
    createdAt: podcast.created_at,
    updatedAt: podcast.updated_at,
  };
}

function normalizeEpisode(episode: any): Episode {
  return {
    ...episode,
    // Map snake_case to camelCase for backwards compatibility
    podcastId: episode.podcast_id,
    audioUrl: episode.audio_url,
    episodeNumber: episode.episode_number,
    seasonNumber: episode.season_number,
    publishedAt: episode.published_at,
    createdAt: episode.created_at,
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async fetchPodcasts(limit: number = 20, skip: number = 0): Promise<Podcast[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/podcasts/?limit=${limit}&skip=${skip}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.map(normalizePodcast);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      throw error;
    }
  }

  async fetchPodcast(id: string): Promise<Podcast> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/podcasts/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return normalizePodcast(data);
    } catch (error) {
      console.error('Error fetching podcast:', error);
      throw error;
    }
  }

  async searchPodcasts(
    query: string = '', 
    limit: number = 20,
    category?: string,
    isVerified?: boolean,
    isFeatured?: boolean,
    skip: number = 0
  ): Promise<{results: Podcast[], query: string, total: number, filters: any}> {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      params.append('limit', limit.toString());
      params.append('skip', skip.toString());
      if (category) params.append('category', category);
      if (isVerified !== undefined) params.append('is_verified', isVerified.toString());
      if (isFeatured !== undefined) params.append('is_featured', isFeatured.toString());
      
      const response = await fetch(
        `${this.baseUrl}/api/v1/podcasts/search/?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        ...data,
        results: data.results.map(normalizePodcast)
      };
    } catch (error) {
      console.error('Error searching podcasts:', error);
      throw error;
    }
  }

  async fetchPodcastEpisodes(podcastId: string, limit: number = 50, skip: number = 0): Promise<Episode[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/podcasts/${podcastId}/episodes?limit=${limit}&skip=${skip}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const episodes = await response.json();
      return episodes.map(normalizeEpisode);
    } catch (error) {
      console.error('Error fetching podcast episodes:', error);
      throw error;
    }
  }

  async fetchCategories(): Promise<{categories: string[], category_counts: Record<string, number>, total_categories: number}> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/podcasts/categories/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<{status: string}> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/health/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();