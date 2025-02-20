import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeleton() {
    return (
      <div className=" w-full  flex items-center justify-center p-4">
         <div className="flex items-center max-w-2xl space-x-4">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
      </div>
    )
  }
