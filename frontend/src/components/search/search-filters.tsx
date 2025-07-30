'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, X } from 'lucide-react';
import { SearchFilters } from '@/hooks/use-search';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  categories: string[];
}

export function SearchFiltersComponent({ 
  filters, 
  onFiltersChange, 
  categories 
}: SearchFiltersProps) {
  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined).length;

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category === 'all' ? undefined : category
    });
  };

  const handleVerifiedChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      isVerified: checked ? true : undefined
    });
  };

  const handleFeaturedChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      isFeatured: checked ? true : undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const removeFilter = (filterKey: keyof SearchFilters) => {
    const newFilters = { ...filters };
    delete newFilters[filterKey];
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Category Filter */}
        <Select 
          value={filters.category || 'all'} 
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Additional Filters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuCheckboxItem
              checked={filters.isVerified === true}
              onCheckedChange={handleVerifiedChange}
            >
              Verified Podcasts Only
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.isFeatured === true}
              onCheckedChange={handleFeaturedChange}
            >
              Featured Podcasts Only
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="outline" className="gap-1">
              Category: {filters.category}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter('category')}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.isVerified && (
            <Badge variant="outline" className="gap-1">
              Verified
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter('isVerified')}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.isFeatured && (
            <Badge variant="outline" className="gap-1">
              Featured
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter('isFeatured')}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}