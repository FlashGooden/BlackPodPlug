import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function usePodcastDetails(podcastId: string) {
  return useQuery({
    queryKey: ['podcast', podcastId],
    queryFn: () => apiClient.fetchPodcast(podcastId),
    enabled: !!podcastId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function usePodcastEpisodes(podcastId: string, limit: number = 50, skip: number = 0) {
  return useQuery({
    queryKey: ['podcast-episodes', podcastId, limit, skip],
    queryFn: () => apiClient.fetchPodcastEpisodes(podcastId, limit, skip),
    enabled: !!podcastId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}