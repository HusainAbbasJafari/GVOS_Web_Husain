import { Skeleton } from "@/components/ui/skeleton";

export function MixedPropertyCardSplitSkeleton() {
  return (
    <div className="h-full flex flex-col border border-zinc-150 rounded-3xl overflow-hidden">
      {/* Image Section */}
      <div className="px-2 xl:px-3 pt-2 xl:pt-3">
        <Skeleton className="w-full aspect-[5/4] rounded-2xl" />
      </div>

      {/* Content Section */}
      <div className="grow flex flex-col justify-between">
        <Skeleton className="h-4 w-1/3 mb-2 mx-auto mt-2" />
        <Skeleton className="h-3 w-1/2 mb-2 mx-auto" />
        <Skeleton className="h-3 w-4/5 mb-3 mx-auto" />
        {/* Property Details Section */}
        <div className="grow max-h-[140px] bg-gray-100 border-y py-2">
          <div className="flex justify-between items-center gap-2 xl:gap-3 p-4 xl:px-6">
            <div className="flex items-center gap-2 xl:gap-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-2 xl:gap-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-2 xl:gap-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-2 xl:gap-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-2 xl:px-3 pb-2 xl:pb-2 pt-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-24 rounded-full" />
            <div className="flex items-center gap-4 px-2">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}