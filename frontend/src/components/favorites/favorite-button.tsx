'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/favorites-context';
import { Podcast } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  podcast: Podcast;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

export function FavoriteButton({ 
  podcast, 
  variant = 'outline', 
  size = 'default',
  className,
  showText = true 
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const favorited = isFavorite(podcast.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    toggleFavorite(podcast.id, podcast);
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      variant={favorited ? 'default' : variant}
      size={size}
      onClick={handleClick}
      className={cn(
        'group transition-all duration-300',
        favorited && 'bg-gradient-to-r from-[#FF1B6B] to-[#663399] text-white border-transparent hover:shadow-lg hover:shadow-[#FF1B6B]/25',
        !favorited && 'hover:border-[#FF1B6B]/50 hover:text-[#FF1B6B]',
        isAnimating && 'scale-110',
        className
      )}
    >
      <Heart 
        className={cn(
          'h-4 w-4 transition-all duration-300',
          favorited && 'fill-current',
          isAnimating && 'animate-pulse',
          showText && 'mr-2'
        )} 
      />
      {showText && (
        <span className="transition-all duration-300">
          {favorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </Button>
  );
}