import { Skeleton } from '@/presentation/components/shadcn-ui/skeleton'

export function ProjectCardSkeleton() {
  return (
    <div className="animate-showing opacity-0 w-full flex flex-col md:w-[calc(theme(width.1/2)-theme(gap.2))] gap-4 ">
      <Skeleton className="h-[500px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
