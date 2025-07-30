'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchBar } from '@/components/search/search-bar';
import { SearchFiltersComponent } from '@/components/search/search-filters';
import { SearchResults } from '@/components/search/search-results';
import { useSearch, SearchFilters } from '@/hooks/use-search';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  'Black Podcasts',
  'Comedy',
  'News',
  'Sports',
  'Culture', 
  'Business',
  'Health',
  'Technology',
  'Music',
  'Politics'
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || undefined,
    isVerified: searchParams.get('verified') === 'true' ? true : undefined,
    isFeatured: searchParams.get('featured') === 'true' ? true : undefined,
  });
  const [page, setPage] = useState(0);
  const [allResults, setAllResults] = useState<any[]>([]);

  const { data, isLoading, error, refetch } = useSearch({
    query,
    filters,
    limit: 20,
    skip: page * 20
  });

  // Update URL when search parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.category) params.set('category', filters.category);
    if (filters.isVerified) params.set('verified', 'true');
    if (filters.isFeatured) params.set('featured', 'true');
    
    const newUrl = params.toString() ? `/search?${params.toString()}` : '/search';
    router.replace(newUrl, { scroll: false });
  }, [query, filters, router]);

  // Reset page when search changes
  useEffect(() => {
    setPage(0);
    setAllResults([]);
  }, [query, filters]);

  // Accumulate results for pagination
  useEffect(() => {
    if (data?.results) {
      if (page === 0) {
        setAllResults(data.results);
      } else {
        setAllResults(prev => [...prev, ...data.results]);
      }
    }
  }, [data, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const hasMore = data ? allResults.length < data.total : false;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-2">Search Podcasts</h1>
            <p className="text-lg text-muted-foreground">
              Discover Black podcasts across all categories
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder="Search for podcasts, hosts, or topics..."
          className="max-w-2xl"
        />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <SearchFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categories={CATEGORIES}
        />
      </div>

      {/* Results */}
      <SearchResults
        results={allResults}
        isLoading={isLoading}
        error={error}
        query={query}
        total={data?.total || 0}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        onRetry={refetch}
      />
    </main>
  );
}