'use client';

import { PodcastCard } from "@/components/podcasts/podcast-card";
import { usePodcasts } from "@/hooks/use-podcasts";
import { useCategories } from "@/hooks/use-categories";
import { useFavorites } from "@/contexts/favorites-context";
import { LoadingGrid } from "@/components/ui/loading";
import { ErrorState, EmptyState } from "@/components/ui/error";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Grid3X3, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { 
    data: podcasts, 
    isLoading, 
    error, 
    refetch 
  } = usePodcasts(20, 0);

  const { data: categoriesData } = useCategories();
  const { favoritesCount } = useFavorites();

  const featuredPodcasts = podcasts?.filter(p => p.isFeatured) || [];
  const recentPodcasts = podcasts?.slice(0, 12) || [];

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-16 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#800020] to-[#663399] animate-gradient opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.3),transparent_70%),radial-gradient(circle_at_70%_80%,rgba(0,212,255,0.2),transparent_70%)]" />
        
        {/* Content */}
        <div className="relative z-10 py-20 px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block text-white animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                Black
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] animate-fade-in-up font-serif" style={{animationDelay: '0.3s'}}>
                Pod
              </span>
              <span className="block text-white animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                Plug
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              Your gateway to the most powerful Black voices in podcasting. 
              <br className="hidden md:block" />
              <span className="text-[#FFD700] font-semibold">One platform. Endless stories. Infinite inspiration.</span>
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-1">
                  {podcasts?.length || 0}+
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">
                  Podcasts
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-1">
                  {categoriesData?.categories?.length || 0}+
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">
                  Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-1">
                  {favoritesCount}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">
                  Favorites
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-1">
                  24/7
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">
                  Discovery
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '1.1s'}}>
              <Link href="/search">
                <Button 
                  size="lg" 
                  className="bg-[#FFD700] text-black hover:bg-[#FFA500] font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  <Search className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Discover Podcasts
                </Button>
              </Link>
              <Link href="/categories">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl glass-morphism group"
                >
                  <Grid3X3 className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Browse Categories
                </Button>
              </Link>
              <Link href="/favorites">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-[#FF1B6B] text-[#FF1B6B] hover:bg-[#FF1B6B] hover:text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl glass-morphism group relative"
                >
                  <Heart className="h-5 w-5 mr-2 group-hover:fill-current transition-all" />
                  My Favorites
                  {favoritesCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-[#FF1B6B] to-[#663399] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center p-0 border-2 border-background">
                      {favoritesCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#FFD700] rounded-full opacity-20 blur-xl animate-pulse" />
        <div className="absolute top-32 right-16 w-16 h-16 bg-[#FF1B6B] rounded-full opacity-30 blur-lg animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#00D4FF] rounded-full opacity-25 blur-lg animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-[#32D74B] rounded-full opacity-20 blur-xl animate-pulse" style={{animationDelay: '1.5s'}} />
      </div>

      {isLoading && <LoadingGrid count={8} />}

      {error && (
        <ErrorState 
          message="Failed to load podcasts. Please check if the backend API is running." 
          onRetry={() => refetch()} 
        />
      )}

      {podcasts && podcasts.length === 0 && (
        <EmptyState 
          title="No podcasts available"
          description="The database appears to be empty. Try running the initialization script."
        />
      )}

      {podcasts && podcasts.length > 0 && (
        <>
          {/* Categories Preview */}
          {categoriesData && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="heading-xl text-4xl mb-3 text-white">
                    Explore by
                    <span className="text-[#FFD700] font-playfair italic"> Category</span>
                  </h2>
                  <p className="text-body text-neutral-400 max-w-2xl">
                    From comedy that makes you laugh out loud to news that keeps you informed, 
                    discover podcasts that speak to every part of the Black experience.
                  </p>
                </div>
                <Link href="/categories">
                  <Button 
                    variant="outline" 
                    className="gap-2 border-2 border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-accent">View All Categories</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categoriesData.categories
                  .filter(cat => cat !== 'Black Podcasts') // Exclude generic category
                  .slice(0, 6)
                  .map((category, index) => (
                    <Link key={category} href={`/categories/${encodeURIComponent(category)}`}>
                      <div 
                        className="p-6 rounded-xl glass-morphism hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 animate-fade-in-up border-0"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <h3 className="heading-md text-base mb-2 group-hover:text-[#FFD700] transition-colors duration-300 text-white">
                          {category}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-gradient-to-r from-neutral-700 to-neutral-600 text-neutral-300 border-0 font-medium"
                        >
                          {categoriesData.category_counts[category]} shows
                        </Badge>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          )}

          {featuredPodcasts.length > 0 && (
            <section className="mb-20">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full" />
                  <h2 className="heading-xl text-4xl text-white">
                    Featured
                    <span className="text-[#FFD700] font-playfair italic"> Voices</span>
                  </h2>
                </div>
                <p className="text-body text-neutral-400 max-w-3xl">
                  Handpicked podcasts that showcase the diversity, creativity, and excellence of Black creators. 
                  These are the conversations you don&apos;t want to miss.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-[#FFD700]">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
                  <span className="text-accent">{featuredPodcasts.length} Featured Shows</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {featuredPodcasts.map((podcast, index) => (
                  <div 
                    key={podcast.id} 
                    className="animate-fade-in-scale"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <PodcastCard podcast={podcast} />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mb-16">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-[#00D4FF] to-[#32D74B] rounded-full" />
                <h2 className="heading-xl text-4xl text-white">
                  Fresh
                  <span className="text-[#00D4FF] font-playfair italic"> Discoveries</span>
                </h2>
              </div>
              <p className="text-body text-neutral-400 max-w-3xl">
                The latest additions to our growing collection of Black podcasts. 
                Stay ahead of the curve and discover your next obsession.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#00D4FF]">
                <div className="w-2 h-2 bg-[#32D74B] rounded-full animate-pulse" />
                <span className="text-accent">{recentPodcasts.length} Recent Additions</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recentPodcasts.map((podcast, index) => (
                <div 
                  key={`recent-${podcast.id}`} 
                  className="animate-fade-in-scale"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <PodcastCard podcast={podcast} />
                </div>
              ))}
            </div>
          </section>

          {/* Cultural Quote Section */}
          <section className="my-20 py-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 border border-[#FFD700] rounded-full" />
              <div className="absolute top-32 right-20 w-20 h-20 border border-[#FF1B6B] rounded-full" />
              <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-[#00D4FF] rounded-full" />
            </div>
            
            <div className="text-center relative z-10">
              <blockquote className="cultural-quote text-2xl md:text-3xl text-[#FFD700] max-w-4xl mx-auto mb-6">
                When we speak, the world listens. When we create, culture shifts. 
                Black voices in podcasting aren&apos;t just entertainment — they&apos;re revolution.
              </blockquote>
              <cite className="text-neutral-400 text-lg font-space-grotesk">
                — The Power of Black Podcasting
              </cite>
            </div>
          </section>

          {podcasts.length >= 20 && (
            <div className="mt-16 text-center py-12 glass-morphism rounded-2xl border border-neutral-700/30">
              <div className="max-w-lg mx-auto">
                <h3 className="heading-lg text-2xl text-white mb-4">
                  Just Getting Started
                </h3>
                <p className="text-body text-neutral-400 mb-6">
                  Showing {podcasts.length} incredible podcasts. This is just the beginning — 
                  we&apos;re constantly adding new voices and stories to celebrate.
                </p>
                <div className="flex justify-center items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-[#FF1B6B] rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                  </div>
                  <span className="text-accent text-sm">More coming soon</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
