'use client';

import { useFavorites } from '@/contexts/favorites-context';
import { PodcastCard } from '@/components/podcasts/podcast-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Trash2, Grid, List } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { EmptyState } from '@/components/ui/error';

export default function FavoritesPage() {
  const { favoritesPodcasts, favoritesCount, clearFavorites } = useFavorites();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleClearFavorites = () => {
    clearFavorites();
    setShowClearDialog(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 hover:bg-white/5">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF1B6B] to-[#663399] flex items-center justify-center shadow-lg shadow-[#FF1B6B]/25">
            <Heart className="h-8 w-8 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#D4AF37] to-[#FF1B6B] bg-clip-text text-transparent">
              My Favorites
            </h1>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-[#FF1B6B] to-[#663399] text-white border-0">
                {favoritesCount} podcast{favoritesCount !== 1 ? 's' : ''}
              </Badge>
              <p className="text-muted-foreground">
                Your curated collection of Black podcast excellence
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {favoritesCount > 0 && (
        <div className="flex items-center justify-between mb-8">
          {/* View Mode Toggle */}
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

          {/* Clear Favorites */}
          <div className="relative">
            {showClearDialog ? (
              <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-sm text-red-200">Clear all favorites?</span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleClearFavorites}
                  className="h-7 px-2"
                >
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowClearDialog(false)}
                  className="h-7 px-2"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearDialog(true)}
                className="gap-2 hover:border-red-500/50 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Favorites Content */}
      {favoritesCount === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Start exploring and heart the podcasts you love to build your personal collection."
        >
          <div className="mt-6">
            <Link href="/categories">
              <Button className="gap-2">
                <Heart className="h-4 w-4" />
                Discover Podcasts
              </Button>
            </Link>
          </div>
        </EmptyState>
      ) : (
        <>
          {/* Favorites Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {favoritesPodcasts.map((podcast, index) => (
              <div
                key={podcast.id}
                className="animate-in fade-in-0 slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <PodcastCard podcast={podcast} />
              </div>
            ))}
          </div>

          {/* Favorites Summary */}
          <div className="mt-12 text-center">
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-[#FF1B6B]/10 border border-white/10 backdrop-blur-sm">
              <Heart className="h-12 w-12 text-[#FF1B6B] fill-current mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Your Curated Collection
              </h3>
              <p className="text-muted-foreground">
                You've favorited {favoritesCount} incredible Black podcast{favoritesCount !== 1 ? 's' : ''}. 
                Keep exploring to discover more voices that inspire, educate, and entertain.
              </p>
              <div className="mt-4">
                <Link href="/search">
                  <Button variant="outline" className="gap-2">
                    Discover More Podcasts
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}