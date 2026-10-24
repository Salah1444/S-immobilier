"use client";

import Link from "next/link";
import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <TriangleAlert className="size-6" aria-hidden />
        </span>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">
          Impossible de charger les propriétés
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Le serveur ne répond pas ou a renvoyé une erreur. Réessayez dans un instant.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-300 transition hover:bg-slate-100"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}