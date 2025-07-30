import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Podcast } from '@/lib/types';

export function usePodcasts(limit: number = 20, skip: number = 0) {
  return useQuery({
    queryKey: ['podcasts', limit, skip],
    queryFn: () => apiClient.fetchPodcasts(limit, skip),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePodcast(id: string) {
  return useQuery({
    queryKey: ['podcast', id],
    queryFn: () => apiClient.fetchPodcast(id),
    enabled: !!id,
  });
}

export function useSearchPodcasts(query: string, limit: number = 20) {
  return useQuery({
    queryKey: ['search-podcasts', query, limit],
    queryFn: () => apiClient.searchPodcasts(query, limit),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useApiHealth() {
  return useQuery({
    queryKey: ['api-health'],
    queryFn: () => apiClient.checkHealth(),
    staleTime: 30 * 1000, // 30 seconds
    retry: 3,
  });
}