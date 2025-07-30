'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Podcast } from '@/lib/types';

interface FavoritesContextType {
  favorites: string[];
  favoritesPodcasts: Podcast[];
  addFavorite: (podcastId: string, podcast?: Podcast) => void;
  removeFavorite: (podcastId: string) => void;
  isFavorite: (podcastId: string) => boolean;
  toggleFavorite: (podcastId: string, podcast?: Podcast) => void;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesPodcasts, setFavoritesPodcasts] = useState<Podcast[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('blackpodplug-favorites');
      const savedPodcasts = localStorage.getItem('blackpodplug-favorites-podcasts');
      
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      }
      
      if (savedPodcasts) {
        try {
          setFavoritesPodcasts(JSON.parse(savedPodcasts));
        } catch (error) {
          console.error('Error loading favorite podcasts:', error);
        }
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blackpodplug-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Save favorite podcasts to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blackpodplug-favorites-podcasts', JSON.stringify(favoritesPodcasts));
    }
  }, [favoritesPodcasts]);

  const addFavorite = (podcastId: string, podcast?: Podcast) => {
    setFavorites(prev => {
      if (prev.includes(podcastId)) return prev;
      return [...prev, podcastId];
    });

    if (podcast) {
      setFavoritesPodcasts(prev => {
        if (prev.some(p => p.id === podcastId)) return prev;
        return [...prev, podcast];
      });
    }
  };

  const removeFavorite = (podcastId: string) => {
    setFavorites(prev => prev.filter(id => id !== podcastId));
    setFavoritesPodcasts(prev => prev.filter(p => p.id !== podcastId));
  };

  const isFavorite = (podcastId: string) => {
    return favorites.includes(podcastId);
  };

  const toggleFavorite = (podcastId: string, podcast?: Podcast) => {
    if (isFavorite(podcastId)) {
      removeFavorite(podcastId);
    } else {
      addFavorite(podcastId, podcast);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    setFavoritesPodcasts([]);
  };

  const value: FavoritesContextType = {
    favorites,
    favoritesPodcasts,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}