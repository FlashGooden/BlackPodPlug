'use client';

import { PodcastCard } from '@/components/podcasts/podcast-card';
import { LoadingGrid } from '@/components/ui/loading';
import { ErrorState, EmptyState } from '@/components/ui/error';
import { Button } from '@/components/ui/button';
import { Podcast } from '@/lib/types';

interface SearchResultsProps {
  results: Podcast[];
  isLoading: boolean;
  error: any;
  query: string;
  total: number;
  hasMore: boolean;
  onLoadMore: () => void;
  onRetry: () => void;
}

export function SearchResults({
  results,
  isLoading,
  error,
  query,
  total,
  hasMore,
  onLoadMore,
  onRetry
}: SearchResultsProps) {
  if (isLoading && results.length === 0) {
    return <LoadingGrid count={8} />;
  }

  if (error) {
    return (
      <ErrorState 
        message="Failed to search podcasts. Please try again." 
        onRetry={onRetry} 
      />
    );
  }

  if (results.length === 0 && query) {
    return (
      <EmptyState 
        title="No podcasts found"
        description={`No results found for "${query}". Try adjusting your search terms or filters.`}
      />
    );
  }

  if (results.length === 0) {
    return (
      <EmptyState 
        title="Start searching"
        description="Enter a search term or apply filters to discover podcasts."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            {query ? `Search Results` : 'Filtered Podcasts'}
          </h2>
          <p className="text-muted-foreground">
            {query && `${total} results for "${query}"`}
            {!query && `${total} podcasts found`}
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>

      {/* Loading More Results */}
      {isLoading && results.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !isLoading && (
        <div className="flex justify-center pt-8">
          <Button 
            onClick={onLoadMore}
            variant="outline"
            size="lg"
          >
            Load More Podcasts
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && results.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You've reached the end of the results.</p>
        </div>
      )}
    </div>
  );
}