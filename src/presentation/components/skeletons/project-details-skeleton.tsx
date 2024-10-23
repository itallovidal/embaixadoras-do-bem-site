import { Skeleton } from '@/presentation/components/shadcn-ui/skeleton'

export function ProjectDetailsSkeleton() {
  return (
    <>
      <Skeleton className="h-6 w-[50%] rounded-l" />
      <Skeleton className="h-32 w-[80%] my-4" />
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <div
        className={
          'mt-8 flex flex-col flex-wrap w-full gap-[1rem] sm:flex-row'
        }
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[500px] w-full sm:w-[calc(50%-1rem)]"
          />
        ))}
      </div>
    </>
  )
}
