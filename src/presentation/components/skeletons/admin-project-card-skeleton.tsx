import { Skeleton } from '@/presentation/components/shadcn-ui/skeleton'

export function AdminProjectCardSkeleton() {
  return (
    <div className="animate-showing opacity-0 flex flex-col items-center justify-center flex-1 gap-4 bg-gray-100 p-4 sm:max-w-[265px]">
      <Skeleton className="h-[200px] w-[200px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px] mb-4" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
