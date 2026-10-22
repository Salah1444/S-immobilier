import { Skeleton } from "@/components/ui/skeleton";

const card = "rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5";

/** Squelette calqué sur <PropertyDetails /> (mêmes grilles, mêmes hauteurs). */
export default function Loading() {
  return (
    <div className="bg-slate-50" role="status" aria-busy="true" aria-label="Chargement du bien">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Fil d'Ariane */}
        <Skeleton className="h-5 w-72 max-w-full" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:grid-rows-[auto_1fr]">
          {/* Fiche */}
          <section className={`${card} lg:col-start-2 lg:row-start-1`}>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-8 w-4/5" />
            <Skeleton className="mt-2 h-5 w-40" />
            <Skeleton className="mt-5 h-8 w-44" />
            <Skeleton className="mt-1 h-5 w-32" />
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-4 w-14" />
                </div>
              ))}
            </div>
            <Skeleton className="mt-6 h-12 w-full rounded-lg" />
          </section>

          {/* Colonne principale */}
          <div className="min-w-0 space-y-6 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            {/* Galerie */}
            <Skeleton className="h-[17rem] w-full rounded-xl sm:h-[26rem]" />

            {/* Description + équipements */}
            <section className={card}>
              <Skeleton className="h-7 w-36" />
              <div className="mt-4 max-w-prose">
                {["w-full", "w-full", "w-4/5"].map((w, i) => (
                  <div key={i} className="flex h-7 items-center">
                    <Skeleton className={`h-4 ${w}`} />
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-4 rounded-lg bg-blue-50/70 p-5 ring-1 ring-blue-100">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="size-7 rounded-md" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </section>

            {/* Détails */}
            <section className={card}>
              <Skeleton className="h-7 w-52" />
              <div className="mt-5 grid gap-x-6 gap-y-5 rounded-lg border border-slate-200 p-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-10 shrink-0 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Localisation */}
          <div className="space-y-6 lg:col-start-2 lg:row-start-2 lg:self-start">
            {/* Formulaire de demande */}
            <section className={card}>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="mt-1 h-5 w-56" />
              <div className="mt-5 space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-[42px] w-full rounded-lg" />
                  </div>
                ))}
                <Skeleton className="h-[106px] w-full rounded-lg" />
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </section>

          <section className={card}>
            <Skeleton className="h-7 w-32" />
            <Skeleton className="mt-3 h-5 w-48" />
            <Skeleton className="mt-4 h-56 w-full rounded-lg" />
            <Skeleton className="mt-4 h-10 w-full rounded-lg" />
          </section>
          </div>
        </div>
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}