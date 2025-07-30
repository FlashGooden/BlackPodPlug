import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FavoriteButton } from "@/components/favorites/favorite-button"
import { Podcast } from "@/lib/types"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { Play, Headphones, Star, CheckCircle2 } from "lucide-react"

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/podcast/${podcast.id}`}>
      <Card 
        className="group relative overflow-hidden border-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 hover:from-neutral-800 hover:via-neutral-700 hover:to-neutral-800 transition-all duration-500 hover:scale-[1.02] cursor-pointer animate-fade-in-scale"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered 
            ? '0 20px 40px rgba(212, 175, 55, 0.2), 0 0 30px rgba(212, 175, 55, 0.1)' 
            : '0 4px 16px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#800020]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Featured Badge */}
        {podcast.isFeatured && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold border-0 shadow-lg">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
        
        <CardHeader className="p-4 pb-2">
          <div className="aspect-square relative overflow-hidden rounded-xl group-hover:rounded-2xl transition-all duration-500">
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFD700] text-black p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                  <Play className="h-6 w-6 ml-1" fill="currentColor" />
                </div>
                <div onClick={(e) => e.preventDefault()} className="transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                  <FavoriteButton 
                    podcast={podcast} 
                    variant="ghost" 
                    size="icon"
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 hover:scale-110 transition-all duration-200"
                    showText={false}
                  />
                </div>
              </div>
            </div>
            
            {/* Podcast Image */}
            <Image
              src={imageError ? "/placeholder-podcast.jpg" : (podcast.imageUrl || "/placeholder-podcast.jpg")}
              alt={podcast.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            
            {/* Gradient Overlay on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg mb-1 line-clamp-2 text-white group-hover:text-[#FFD700] transition-colors duration-300">
            {podcast.title}
          </h3>
          
          {/* Author */}
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-[#FFD700] opacity-60" />
            <p className="text-neutral-300 text-sm font-medium">
              {podcast.author}
            </p>
            {podcast.isVerified && (
              <CheckCircle2 className="h-4 w-4 text-[#00D4FF]" />
            )}
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {podcast.categories?.slice(0, 2).map((category, index) => (
              <Badge 
                key={category} 
                variant="secondary" 
                className={`text-xs border-0 font-medium transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#800020]/20 text-[#FFD700] hover:from-[#D4AF37]/30 hover:to-[#800020]/30' 
                    : 'bg-gradient-to-r from-[#FF1B6B]/20 to-[#663399]/20 text-[#FF1B6B] hover:from-[#FF1B6B]/30 hover:to-[#663399]/30'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          {/* Description */}
          {podcast.description && (
            <p className="text-sm text-neutral-400 mt-2 line-clamp-2 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
              {podcast.description}
            </p>
          )}
          
          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-700/50 group-hover:border-[#FFD700]/20 transition-colors duration-300">
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <Play className="h-3 w-3" />
              <span>Listen now</span>
            </div>
            <div className="w-2 h-2 bg-[#32D74B] rounded-full animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardContent>
        
        {/* Decorative Corner Accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </Link>
  );
}