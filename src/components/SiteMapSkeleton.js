import { Skeleton } from "@/components/ui/skeleton";

export function SiteMapSkeleton() {
  return (
    <div className="space-y-4">
      {/* Heading skeleton */}
      <Skeleton className="h-8 w-1/4 mb-5" />

      {/* Area guide cards skeleton */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border border-gray-300 p-3 mb-6">
          {/* Card title skeleton */}
          <Skeleton className="h-6 w-1/4 mb-3" />

          {/* Grid of links skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {[...Array(16)].map((_, linkIndex) => (
              <Skeleton key={linkIndex} className="h-4 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}