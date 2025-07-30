'use client';

import { use, useState, useEffect } from 'react';
import { useSearch } from '@/hooks/use-search';
import { PodcastCard } from '@/components/podcasts/podcast-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Grid, List } from 'lucide-react';
import Link from 'next/link';
import { LoadingGrid } from '@/components/ui/loading';
import { ErrorState, EmptyState } from '@/components/ui/error';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const category = decodeURIComponent(resolvedParams.category);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(0);
  const [allResults, setAllResults] = useState<any[]>([]);

  const { data, isLoading, error, refetch } = useSearch({
    query: '',
    filters: { category },
    limit: 20,
    skip: page * 20
  });

  // Reset page when category changes
  useEffect(() => {
    setPage(0);
    setAllResults([]);
  }, [category]);

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

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const hasMore = data ? allResults.length < data.total : false;

  if (isLoading && allResults.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Skeleton */}
        <div className="mb-6">
          <div className="h-9 w-32 bg-muted rounded animate-pulse" />
        </div>

        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-64 bg-muted rounded animate-pulse mb-2" />
          <div className="h-6 w-48 bg-muted rounded animate-pulse" />
        </div>

        <LoadingGrid count={8} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/categories">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
        </div>

        <ErrorState
          message="Failed to load podcasts for this category."
          onRetry={() => refetch()}
        />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/categories">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{category}</h1>
          <Badge variant="secondary" className="text-base px-3 py-1">
            {data?.total || 0} podcast{data?.total !== 1 ? 's' : ''}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Discover Black podcasts in the {category} category
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="gap-2"
          >
            <Grid className="h-4 w-4" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            List
          </Button>
        </div>
      </div>

      {/* Results */}
      {allResults.length === 0 && !isLoading ? (
        <EmptyState
          title="No podcasts found"
          description={`No podcasts found in the "${category}" category.`}
        />
      ) : (
        <>
          {/* Podcast Grid/List */}
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {allResults.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>

          {/* Loading More Results */}
          {isLoading && allResults.length > 0 && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !isLoading && (
            <div className="flex justify-center pt-8">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                size="lg"
              >
                Load More Podcasts
              </Button>
            </div>
          )}

          {/* End of Results */}
          {!hasMore && allResults.length > 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>You&apos;ve reached the end of the results.</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
