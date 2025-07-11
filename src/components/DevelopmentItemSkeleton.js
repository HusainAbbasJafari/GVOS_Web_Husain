import { Skeleton } from "@/components/ui/skeleton";

export default function DevelopmentItemSkeleton() {
    return (
        <div className="flex flex-col justify-center border border-neutral-400 rounded-4xl overflow-hidden">
            <div className="aspect-square">
                <Skeleton className="aspect-square w-full h-full bg-white" />
            </div>

            <div className="flex flex-col bg-neutral-100 p-3 lg:p-4 border-t border-neutral-400 ">
                <div className="h-[140px] overflow-y-auto mt-2">
                    <div className="flex">
                        <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                            <Skeleton className="h-3 w-3/4 my-1 ml-auto bg-neutral-200" />
                        </div>
                        <div className="w-[1px] bg-gray-300"></div>
                        <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                            <Skeleton className="h-3 w-1/2 my-1 bg-neutral-200" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                            <Skeleton className="h-3 w-1/2 my-1 ml-auto bg-neutral-200" />
                        </div>
                        <div className="w-[1px] bg-gray-300"></div>
                        <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                            <Skeleton className="h-3 w-3/4 my-1 bg-neutral-200" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                            <Skeleton className="h-3 w-1/3 my-1 ml-auto bg-neutral-200" />
                        </div>
                        <div className="w-[1px] bg-gray-300"></div>
                        <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                            <Skeleton className="h-3 w-1/2 my-1 bg-neutral-200" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                            <Skeleton className="h-3 w-1/3 my-1 ml-auto bg-neutral-200" />
                        </div>
                        <div className="w-[1px] bg-gray-300"></div>
                        <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                            <Skeleton className="h-3 w-1/2 my-1 bg-neutral-200" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                            <Skeleton className="h-3 w-3/4 my-1 ml-auto bg-neutral-200" />
                        </div>
                        <div className="w-[1px] bg-gray-300"></div>
                        <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                            <Skeleton className="h-3 w-1/2 my-1 bg-neutral-200" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                            <Skeleton className="h-3 w-full my-1 ml-auto bg-neutral-200" />
                        </div>
                        <div className="w-[1px] bg-gray-300"></div>
                        <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                            <Skeleton className="h-3 w-4/5 my-1 bg-neutral-200" />
                        </div>
                    </div>

                </div>
                <div className="flex justify-center items-center pt-3">
                    <Skeleton className="h-8 w-48 rounded bg-neutral-200" />
                </div>
            </div>
        </div>
    );
}