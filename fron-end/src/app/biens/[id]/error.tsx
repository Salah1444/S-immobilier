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
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <TriangleAlert className="size-7" aria-hidden />
      </span>

      <h1 className="mt-6 text-2xl font-semibold text-slate-900">
        Impossible de charger ce bien
      </h1>
      <p className="mt-2 text-slate-600">
        Le serveur ne répond pas ou a renvoyé une erreur. Vérifiez votre
        connexion, puis réessayez.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-teal-700 px-5 py-2.5 font-medium text-white transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          Réessayer
        </button>
        <Link
          href="/biens"
          className="rounded-xl bg-white px-5 py-2.5 font-medium text-slate-900 ring-1 ring-slate-300 transition hover:bg-slate-100"
        >
          Retour aux biens
        </Link>
      </div>
    </div>
  );
}