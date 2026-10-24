import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="bg-white" role="status" aria-busy="true" aria-label="Chargement">
      {/* Hero */}
      <section className="bg-blue-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-xl">
            <Skeleton className="h-4 w-56 bg-white/10" />
            <Skeleton className="mt-4 h-9 w-full bg-white/10 sm:h-12" />
            <Skeleton className="mt-2 h-9 w-2/3 bg-white/10 sm:h-12" />
            <div className="mt-5 space-y-2.5">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-3/4 bg-white/10" />
            </div>
            <Skeleton className="mt-8 h-[50px] w-44 rounded-full bg-white/15" />
          </div>
        </div>
      </section>

      {/* Contenu */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:px-8 lg:py-16">
        <div className="space-y-14">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-4 h-8 w-4/5" />
              <Skeleton className="mt-2 h-8 w-3/5" />
              <div className="mt-5 space-y-2.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="mt-6 h-14 w-full rounded-xl" />
            </div>
            <Skeleton className="min-h-64 rounded-xl" />
          </div>

          <div>
            <Skeleton className="h-4 w-28" />
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="size-12 rounded-2xl" />
                  <Skeleton className="mt-4 h-5 w-28" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-1.5 h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-900/5">
            <Skeleton className="h-6 w-40" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[82px] rounded-xl bg-white" />
              ))}
            </div>
          </section>
          <section className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/5">
            <div className="space-y-3 p-5">
              <Skeleton className="h-6 w-40" />
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[66px] rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-48 w-full rounded-none" />
          </section>
        </aside>
      </div>

      {/* Bandeau final */}
      <section className="bg-blue-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-xl">
            <Skeleton className="h-9 w-64 bg-white/10" />
            <Skeleton className="mt-4 h-8 w-80 bg-white/10" />
            <Skeleton className="mt-3 h-4 w-full bg-white/10" />
            <Skeleton className="mt-2 h-4 w-3/4 bg-white/10" />
          </div>
          <Skeleton className="h-[52px] w-60 rounded-full bg-white/15" />
        </div>
      </section>

      <span className="sr-only">Chargement…</span>
    </main>
  );
}