import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 mb-5 border border-zinc-150 rounded-3xl overflow-hidden">
            <Skeleton className="aspect-[5/4] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/3 mb-2 mx-auto" />
                <Skeleton className="h-3 w-1/2 mb-2 mx-auto" />
                <Skeleton className="h-3 w-4/5 mb-3 mx-auto" />

                <Skeleton className="h-20 w-full" />
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
    )
}
