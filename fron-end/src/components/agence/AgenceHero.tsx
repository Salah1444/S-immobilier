import Image from "next/image";
import { Caveat } from "next/font/google";
import { ChevronRight } from "lucide-react";
import { type Agence } from "@/types/agencyTypes";
import { HERO_TEXT, IMAGES } from "./content";

const handwriting = Caveat({ subsets: ["latin"], weight: "600", display: "swap" });

export default function AgenceHero({ agency }: { agency: Agence }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-950 to-blue-800">
      <Image
        src={IMAGES.hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 via-blue-950/85 to-blue-950/10"
      />

      <p
        aria-hidden
        className={`${handwriting.className} pointer-events-none absolute right-6 top-8 hidden -rotate-6 text-right text-3xl leading-tight text-blue-950 md:block lg:right-16 lg:top-10 lg:text-4xl`}
      >
        Votre projet,
        <br />
        notre priorité
        <svg viewBox="0 0 160 12" fill="none" className="ml-auto mt-1 h-3 w-40" aria-hidden>
          <path d="M2 8C40 2 100 2 158 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </p>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-sky-200 sm:text-sm">
            À propos de {agency.agency_name}
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Une agence immobilière de confiance <span className="text-sky-400">au Maroc</span>
          </h1>
          <p className="mt-5 leading-7 text-slate-100">{HERO_TEXT}</p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Nous contacter
            <ChevronRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}