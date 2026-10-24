import { Skeleton } from "@/components/ui/skeleton";

/** Squelette partagé par /vente et /location (même mise en page que la liste). */
export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50" role="status" aria-busy="true" aria-label="Chargement des biens">
      {/* Hero */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Skeleton className="mb-6 h-5 w-40 bg-white/10" />
          <Skeleton className="mb-3 h-5 w-36 bg-white/10" />
          <Skeleton className="h-9 w-full max-w-3xl bg-white/10 sm:h-12" />
          <Skeleton className="mt-3 h-9 w-2/3 max-w-xl bg-white/10 sm:h-12" />
          <Skeleton className="mt-5 h-6 w-full max-w-2xl bg-white/10" />
        </div>
      </section>

      {/* Filtres */}
      <section className="relative mx-auto -mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:grid-cols-[1fr_220px_220px] md:p-5">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="mb-2 h-5 w-28" />
              <Skeleton className="h-[46px] w-full rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      {/* Résultats */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mb-7 mt-2 h-5 w-32" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Skeleton className="h-56 w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-7 w-32" />
                <div className="flex gap-4 pt-1">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <span className="sr-only">Chargement…</span>
    </main>
  );
}