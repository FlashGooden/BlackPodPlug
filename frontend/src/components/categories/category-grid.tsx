'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Mic, 
  Laugh, 
  Newspaper, 
  Trophy,
  Briefcase,
  Heart,
  Laptop,
  Users,
  Music,
  GraduationCap,
  Tv,
  Home,
  Search
} from 'lucide-react';

interface CategoryGridProps {
  categories: string[];
  categoryCounts: Record<string, number>;
  isLoading?: boolean;
}

// Category icon mapping
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Black Podcasts': <Mic className="h-6 w-6" />,
  'Comedy': <Laugh className="h-6 w-6" />,
  'News & Politics': <Newspaper className="h-6 w-6" />,
  'Sports': <Trophy className="h-6 w-6" />,
  'Business & Entrepreneurship': <Briefcase className="h-6 w-6" />,
  'Health & Wellness': <Heart className="h-6 w-6" />,
  'Technology': <Laptop className="h-6 w-6" />,
  'Culture & Society': <Users className="h-6 w-6" />,
  'Music': <Music className="h-6 w-6" />,
  'Education & Learning': <GraduationCap className="h-6 w-6" />,
  'Entertainment': <Tv className="h-6 w-6" />,
  'Lifestyle': <Home className="h-6 w-6" />,
  'True Crime': <Search className="h-6 w-6" />,
};

// Category color mapping with cultural vibrancy
const CATEGORY_COLORS: Record<string, string> = {
  'Black Podcasts': 'bg-gradient-to-br from-[#D4AF37] via-[#800020] to-[#663399]',
  'Comedy': 'bg-gradient-to-br from-[#FF6B35] via-[#FFD700] to-[#FFA500]',
  'News & Politics': 'bg-gradient-to-br from-[#00D4FF] via-[#0066CC] to-[#003D99]',
  'Sports': 'bg-gradient-to-br from-[#32D74B] via-[#008B3A] to-[#006B2E]',
  'Business & Entrepreneurship': 'bg-gradient-to-br from-[#800020] via-[#663399] to-[#4A0E4E]',
  'Health & Wellness': 'bg-gradient-to-br from-[#FF1B6B] via-[#FF6B35] to-[#D4AF37]',
  'Technology': 'bg-gradient-to-br from-[#663399] via-[#00D4FF] to-[#0066CC]',
  'Culture & Society': 'bg-gradient-to-br from-[#D4AF37] via-[#32D74B] to-[#008B3A]',
  'Music': 'bg-gradient-to-br from-[#FF1B6B] via-[#800020] to-[#663399]',
  'Education & Learning': 'bg-gradient-to-br from-[#FFD700] via-[#FF6B35] to-[#D4AF37]',
  'Entertainment': 'bg-gradient-to-br from-[#663399] via-[#FF1B6B] to-[#800020]',
  'Lifestyle': 'bg-gradient-to-br from-[#32D74B] via-[#00D4FF] to-[#008B3A]',
  'True Crime': 'bg-gradient-to-br from-[#525252] via-[#800020] to-[#404040]',
};

function CategoryCard({ category, count }: { category: string; count: number }) {
  const icon = CATEGORY_ICONS[category] || <Mic className="h-6 w-6" />;
  const colorClass = CATEGORY_COLORS[category] || 'bg-gradient-to-br from-gray-500 to-gray-600';

  return (
    <Link href={`/categories/${encodeURIComponent(category)}`}>
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 hover:from-neutral-800 hover:via-neutral-700 hover:to-neutral-800 transition-all duration-500 hover:scale-[1.05] cursor-pointer group animate-fade-in-scale hover:shadow-2xl">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
          <div className={`absolute inset-0 ${colorClass} blur-xl`} />
        </div>
        
        {/* Border Gradient Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-[1px] rounded-lg ${colorClass} opacity-20`} />
        </div>
        
        <CardContent className="relative z-10 p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icon Container */}
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className={`absolute inset-0 w-20 h-20 rounded-full ${colorClass} opacity-0 group-hover:opacity-30 blur-md scale-125 transition-all duration-500`} />
              
              {/* Icon Circle */}
              <div className={`relative w-20 h-20 rounded-full ${colorClass} flex items-center justify-center text-white group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl animate-gradient`}>
                <div className="relative z-10 transform group-hover:rotate-12 transition-transform duration-500">
                  {icon}
                </div>
                
                {/* Inner Highlight */}
                <div className="absolute inset-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Pulse Effect */}
              <div className={`absolute inset-0 w-20 h-20 rounded-full ${colorClass} opacity-0 group-hover:opacity-60 animate-ping`} />
            </div>
            
            {/* Category Info */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl mb-2 text-white group-hover:text-[#FFD700] transition-colors duration-300 tracking-tight">
                {category}
              </h3>
              
              {/* Count Badge */}
              <div className="relative">
                <Badge 
                  variant="secondary" 
                  className="bg-gradient-to-r from-neutral-700 to-neutral-600 text-neutral-200 border-0 px-4 py-2 text-sm font-semibold group-hover:from-[#FFD700]/20 group-hover:to-[#FFA500]/20 group-hover:text-[#FFD700] transition-all duration-300 shadow-lg"
                >
                  {count} podcast{count !== 1 ? 's' : ''}
                </Badge>
                
                {/* Badge Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/30 to-[#FFA500]/30 rounded-full opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300" />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-3 right-3 w-2 h-2 bg-[#32D74B] rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />
            <div className="absolute bottom-3 left-3 w-1 h-1 bg-[#FF1B6B] rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-700" />
          </div>
        </CardContent>
        
        {/* Corner Accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
        
        {/* Hover Shimmer Effect */}
        <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 transform skew-y-12" />
      </Card>
    </Link>
  );
}

function CategoryCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-24 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryGrid({ categories, categoryCounts, isLoading }: CategoryGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Filter out categories with 0 podcasts and sort by count
  const filteredCategories = categories
    .filter(category => categoryCounts[category] > 0)
    .sort((a, b) => categoryCounts[b] - categoryCounts[a]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredCategories.map((category) => (
        <CategoryCard
          key={category}
          category={category}
          count={categoryCounts[category]}
        />
      ))}
    </div>
  );
}