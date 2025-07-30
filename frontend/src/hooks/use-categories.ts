import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.fetchCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
  });
}