'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Sparkles, Mic2 } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Discover your next favorite Black podcast...",
  className = ""
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    onSearch(value);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleClear = () => {
    onChange('');
    onSearch('');
  };

  // Animated placeholder suggestions
  const suggestions = [
    "Discover your next favorite Black podcast...",
    "Find voices that inspire and educate...",
    "Explore stories from Black creators...",
    "Search for comedy, news, culture & more..."
  ];

  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  useEffect(() => {
    if (!value && !isFocused) {
      const interval = setInterval(() => {
        setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [value, isFocused, suggestions.length]);

  return (
    <div className={`relative ${className}`}>
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-[#FF1B6B]/20 to-[#00D4FF]/20 rounded-2xl blur-xl opacity-0 ${isFocused ? 'opacity-100' : ''} transition-opacity duration-500`} />
      
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center glass-morphism rounded-2xl border-2 transition-all duration-500 ${
          isFocused 
            ? 'border-[#FFD700]/50 shadow-2xl shadow-[#FFD700]/20' 
            : 'border-neutral-700 hover:border-neutral-600'
        }`}>
          {/* Search Icon */}
          <div className={`absolute left-4 transition-all duration-300 ${
            isFocused ? 'text-[#FFD700] scale-110' : 'text-neutral-400'
          }`}>
            {isAnimating ? (
              <Sparkles className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </div>
          
          {/* Main Input */}
          <Input
            type="text"
            placeholder={suggestions[currentSuggestion]}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-12 pr-24 h-16 text-lg bg-transparent border-0 text-white placeholder:text-neutral-400 font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          
          {/* Voice Search Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={`absolute right-20 h-10 w-10 p-0 rounded-full transition-all duration-300 ${
              isFocused 
                ? 'text-[#FFD700] hover:bg-[#FFD700]/10 scale-110' 
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Mic2 className="h-4 w-4" />
          </Button>
          
          {/* Clear Button */}
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-14 h-8 w-8 p-0 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all duration-200 group"
            >
              <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
            </Button>
          )}
          
          {/* Search Button */}
          <Button
            type="submit"
            size="sm"
            className={`absolute right-2 h-12 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isFocused || value
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            }`}
            disabled={isAnimating}
          >
            {isAnimating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Searching...
              </div>
            ) : (
              'Search'
            )}
          </Button>
        </div>
        
        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-2xl opacity-0 ${isFocused ? 'opacity-100' : ''} transition-opacity duration-500`}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FF1B6B] to-[#00D4FF] opacity-30 animate-gradient" 
               style={{backgroundSize: '400% 400%'}} />
        </div>
      </form>
      
      {/* Quick Search Suggestions */}
      {isFocused && !value && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-morphism rounded-xl border border-neutral-700/50 p-4 z-50 animate-fade-in-up">
          <div className="text-sm text-neutral-400 mb-3 font-medium">Popular searches:</div>
          <div className="flex flex-wrap gap-2">
            {['Comedy', 'News & Politics', 'Business', 'Culture', 'Music', 'True Crime'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onChange(tag);
                  onSearch(tag);
                }}
                className="px-3 py-1.5 bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-[#FFD700]/20 hover:to-[#FFA500]/20 text-neutral-300 hover:text-[#FFD700] rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}