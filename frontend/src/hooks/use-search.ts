import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Podcast } from '@/lib/types';

export interface SearchFilters {
  category?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
}

export interface SearchParams {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  skip?: number;
}

export interface SearchResult {
  results: Podcast[];
  query: string;
  total: number;
  filters: SearchFilters;
}

export function useSearch(params: SearchParams) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: () => apiClient.searchPodcasts(
      params.query,
      params.limit || 20,
      params.filters?.category,
      params.filters?.isVerified,
      params.filters?.isFeatured,
      params.skip || 0
    ),
    enabled: !!params.query || Object.keys(params.filters || {}).length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}