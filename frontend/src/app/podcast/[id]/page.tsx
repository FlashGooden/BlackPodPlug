'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { usePodcastDetails, usePodcastEpisodes } from '@/hooks/use-podcast-details';
import { PodcastHeader } from '@/components/podcasts/podcast-header';
import { EpisodeList } from '@/components/podcasts/episode-list';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface PodcastPageProps {
  params: Promise<{ id: string }>;
}

export default function PodcastPage({ params }: PodcastPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const podcastId = resolvedParams.id;

  const { 
    data: podcast, 
    isLoading: podcastLoading, 
    error: podcastError 
  } = usePodcastDetails(podcastId);

  const { 
    data: episodes, 
    isLoading: episodesLoading, 
    error: episodesError 
  } = usePodcastEpisodes(podcastId);

  // Loading state
  if (podcastLoading) {
    return (
      <main className="min-h-screen">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-64 h-64 lg:w-80 lg:h-80 bg-muted rounded-2xl animate-pulse" />
              <div className="flex-1 space-y-4">
                <div className="h-12 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
                <div className="h-20 bg-muted rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-10 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 bg-muted rounded animate-pulse mb-6 w-48" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (podcastError) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Podcast Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The podcast you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => router.back()} variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Link href="/">
              <Button>Browse Podcasts</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!podcast) {
    return null;
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Button 
          onClick={() => router.back()} 
          variant="ghost" 
          size="sm" 
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Podcast Header */}
      <PodcastHeader podcast={podcast} />

      {/* Episodes Section */}
      <div className="container mx-auto px-4 py-8">
        <EpisodeList 
          episodes={episodes || []}
          isLoading={episodesLoading}
          error={episodesError}
        />
      </div>
    </main>
  );
}