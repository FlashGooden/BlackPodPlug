'use client';

import { Episode } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Calendar, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EpisodeListProps {
  episodes: Episode[];
  isLoading?: boolean;
  error?: any;
}

function formatDuration(seconds?: number): string {
  if (!seconds) return 'Unknown';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function EpisodeCard({ episode }: { episode: Episode }) {
  const publishedDate = episode.publishedAt ? new Date(episode.publishedAt) : null;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Episode Number/Play Button */}
          <div className="flex-shrink-0">
            {episode.episodeNumber ? (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {episode.episodeNumber}
                </span>
              </div>
            ) : (
              <Button size="sm" variant="outline" className="w-12 h-12 rounded-full p-0">
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Episode Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold line-clamp-2">
                {episode.title || 'Untitled Episode'}
              </h3>
              
              {/* Episode Metadata */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                {episode.seasonNumber && (
                  <Badge variant="secondary" className="text-xs">
                    S{episode.seasonNumber}
                  </Badge>
                )}
                {episode.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDuration(episode.duration)}
                  </div>
                )}
              </div>
            </div>

            {/* Publication Date */}
            {publishedDate && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <Calendar className="h-3 w-3" />
                {formatDistanceToNow(publishedDate, { addSuffix: true })}
              </div>
            )}

            {/* Description */}
            {episode.description && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {episode.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {episode.audioUrl && (
                <Button size="sm" className="gap-2">
                  <Play className="h-3 w-3" />
                  Play Episode
                </Button>
              )}
              {episode.audioUrl && (
                <Button size="sm" variant="outline" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  Open Audio
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EpisodeList({ episodes, isLoading, error }: EpisodeListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <p className="text-red-600">Failed to load episodes. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (episodes.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="text-6xl mb-4">🎙️</div>
          <h3 className="text-xl font-semibold mb-2">No Episodes Available</h3>
          <p className="text-muted-foreground">
            This podcast doesn't have any episodes yet, or they haven't been loaded.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Episodes ({episodes.length})
        </h2>
      </div>
      
      <div className="space-y-4">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
}