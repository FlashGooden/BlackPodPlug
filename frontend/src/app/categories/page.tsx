'use client';

import { useCategories } from '@/hooks/use-categories';
import { CategoryGrid } from '@/components/categories/category-grid';
import { Button } from '@/components/ui/button';  
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ErrorState } from '@/components/ui/error';

export default function CategoriesPage() {
  const { data, isLoading, error, refetch } = useCategories();

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <ErrorState 
          message="Failed to load categories. Please try again." 
          onRetry={() => refetch()} 
        />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Browse by Category</h1>
        <p className="text-lg text-muted-foreground">
          Discover Black podcasts across all categories
        </p>
        {data && (
          <p className="text-sm text-muted-foreground mt-2">
            {data.total_categories} categories • {Object.values(data.category_counts).reduce((a, b) => a + b, 0)} total podcasts
          </p>
        )}
      </div>

      {/* Category Grid */}
      <CategoryGrid
        categories={data?.categories || []}
        categoryCounts={data?.category_counts || {}}
        isLoading={isLoading}
      />
    </main>
  );
}