export function CourseSkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-d-800 bg-ocean-900/60 shadow-md">
      <div className="animate-pulse bg-gradient-to-r from-ocean-800 via-ocean-700 to-ocean-800">
        <div className="aspect-video w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-24 rounded-full bg-neutral-d-700/80" />
        <div className="h-5 w-3/4 rounded-full bg-neutral-d-700/80" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-neutral-d-800" />
          <div className="h-4 w-5/6 rounded bg-neutral-d-800" />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="h-4 w-20 rounded bg-neutral-d-800" />
          <div className="h-4 w-12 rounded bg-neutral-d-800" />
        </div>
      </div>
    </div>
  );
}
