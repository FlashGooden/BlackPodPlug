import { Card, CardContent, CardHeader } from "./card";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong", onRetry }: ErrorStateProps) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <h3 className="text-lg font-semibold text-red-800">Error</h3>
      </CardHeader>
      <CardContent>
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </CardContent>
    </Card>
  );
}

export function EmptyState({ 
  title = "No podcasts found", 
  description = "Try adjusting your search or check back later.",
  children
}: { 
  title?: string; 
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <div className="text-6xl mb-4">🎙️</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        {children}
      </CardContent>
    </Card>
  );
}