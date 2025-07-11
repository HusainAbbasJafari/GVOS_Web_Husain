import { Skeleton } from "@/components/ui/skeleton";

export function AreaGuideSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index}>
          <Skeleton className="h-8 w-1/4 mb-3 p-2" />
          <div className="border border-gray-300 p-3 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
              {[...Array(16)].map((_, linkIndex) => (
                <Skeleton key={linkIndex} className="h-4 w-full p-2" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}