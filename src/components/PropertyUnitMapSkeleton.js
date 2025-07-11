import { Skeleton } from "@/components/ui/skeleton";

export function PropertyUnitMapSkeleton() {
    return (
        <div className="h-full flex flex-col md:flex-row lg:flex-col xl:flex-row gap-2 p-2 rounded-3xl border border-gray-300">
            {/* Image Section */}
            <div className="w-full h-[266.5px] md:w-1/2 lg:w-full xl:w-1/2">
                <Skeleton className="w-full h-full rounded-3xl" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between grow gap-2">
                <div>
                    {/* Header Section */}
                    <div className="mb-3 flex flex-col justify-center">
                        <Skeleton className="h-4 w-1/2 mb-2 mx-auto" />
                        <Skeleton className="h-3 w-full mb-2 mx-auto" />
                        <Skeleton className="h-6 w-full mx-auto rounded-md" />
                    </div>

                    {/* Property List Section */}
                    <div className="h-[140px] overflow-y-auto mt-2">
                        <div className="flex">
                            <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                                <Skeleton className="h-3 w-3/4 my-1 ml-auto" />
                            </div>
                            <div className="w-[1px] bg-gray-300"></div>
                            <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                                <Skeleton className="h-3 w-3/4 my-1" />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                                <Skeleton className="h-3 w-full my-1 ml-auto" />
                                <Skeleton className="h-2 w-full my-1 ml-auto bg-white" />
                            </div>
                            <div className="w-[1px] bg-gray-300"></div>
                            <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                                <Skeleton className="h-3 w-full my-1" />
                                <Skeleton className="h-2 w-full my-1" />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                                <Skeleton className="h-3 w-3/4 my-1 ml-auto" />
                            </div>
                            <div className="w-[1px] bg-gray-300"></div>
                            <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                                <Skeleton className="h-3 w-3/4 my-1" />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                                <Skeleton className="h-3 w-full my-1 ml-auto" />
                            </div>
                            <div className="w-[1px] bg-gray-300"></div>
                            <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                                <Skeleton className="h-3 w-full my-1" />
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* Button Section */}
                <Skeleton className="h-8 w-full mx-auto rounded-lg" />
            </div>
        </div>
    );
}