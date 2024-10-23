import { Skeleton } from '@/presentation/components/shadcn-ui/skeleton'

export function ProjectCardSkeleton() {
  return (
    <article className={'my-12 animate-showing opacity-0'}>
      <section className={'max-w-safeMobile xl:max-w-safeDesktop m-auto'}>
        <Skeleton className="h-6 w-[600px] rounded-l" />
        <Skeleton className="h-32 w-[800px] my-4" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>

        <div
          className={
            'mt-8 flex flex-col flex-wrap w-full gap-[1rem]  sm:flex-row'
          }
        >
          {Array.from({ length: 4 }).map(() => (
            <Skeleton className="h-[500px] w-[calc(50%-1rem)]" />
          ))}
        </div>
      </section>
    </article>
  )
}
