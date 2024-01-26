import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
    return (
        <div className="flex flex-col justify-center items-center w-screen">
            <div className="flex flex-col justify-start">
                <Skeleton className="h-9 w-52 md:w-80 mt-[10px]" />
                <Skeleton className="h-9 w-52 md:w-80 mt-[10px]" />
                <Skeleton className="h-9 w-20 mt-[10px]" />
            </div>
            <div className="mt-[40px] w-full md:w-10/12 flex flex-row justify-between">
                <Skeleton className="w-full md:w-[380px] lg:w-[410px] h-[150px] md:h-[260px]" />
                <Skeleton className="hidden md:block w-[380px] h-[150px] md:h-[260px]" />
            </div>
            <Skeleton className="my-[30px] w-full md:w-10/12 h-72" />

        </div>
    )
}

export default LoadingSkeleton