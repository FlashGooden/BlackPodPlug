'use client';

import { Podcast } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from '@/components/favorites/favorite-button';
import { 
  Share2, 
  ExternalLink, 
  Verified,
  Star,
  Headphones
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface PodcastHeaderProps {
  podcast: Podcast;
}

export function PodcastHeader({ podcast }: PodcastHeaderProps) {
  const [imageError, setImageError] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: podcast.title,
          text: podcast.description || `Check out ${podcast.title} on BlackPodPlug`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Could show a toast notification here
    }
  };

  const handleExternalLink = () => {
    if (podcast.rssUrl) {
      window.open(podcast.rssUrl, '_blank');
    }
  };


  return (
    <div className="bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Podcast Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 lg:w-80 lg:h-80 relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={imageError ? '/placeholder-podcast.jpg' : (podcast.imageUrl || '/placeholder-podcast.jpg')}
                alt={podcast.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          </div>

          {/* Podcast Info */}
          <div className="flex-1 min-w-0">
            {/* Title and Badges */}
            <div className="mb-4">
              <div className="flex items-start gap-3 mb-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {podcast.title}
                </h1>
                {podcast.isVerified && (
                  <Verified className="h-6 w-6 text-blue-500 flex-shrink-0 mt-2" />
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {podcast.isFeatured && (
                  <Badge className="gap-1">
                    <Star className="h-3 w-3" />
                    Featured
                  </Badge>
                )}
                {podcast.isPremium && (
                  <Badge variant="secondary">Premium</Badge>
                )}
                {podcast.categories?.slice(0, 3).map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author */}
            {podcast.author && (
              <p className="text-xl text-muted-foreground mb-4">
                By {podcast.author}
              </p>
            )}

            {/* Description */}
            {podcast.description && (
              <div className="mb-6">
                <p className="text-base leading-relaxed">
                  {podcast.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                <Headphones className="h-4 w-4" />
                Subscribe
              </Button>
              
              <FavoriteButton podcast={podcast} size="lg" />

              <Button size="lg" variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              {podcast.rssUrl && (
                <Button size="lg" variant="outline" onClick={handleExternalLink} className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  RSS Feed
                </Button>
              )}
            </div>

            {/* External Platform Links */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Listen on your favorite platform:
              </p>
              <div className="flex flex-wrap gap-2">
                {podcast.applePodcastId && (
                  <Button variant="outline" size="sm">
                    Apple Podcasts
                  </Button>
                )}
                {podcast.spotifyId && (
                  <Button variant="outline" size="sm">
                    Spotify
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Google Podcasts
                </Button>
                <Button variant="outline" size="sm">
                  Stitcher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}