import Image from "next/image";
import { ChevronRight, House } from "lucide-react";
import { type Agence } from "@/types/agencyTypes";
import { IMAGES } from "./content";

export default function AgenceCTA({ agency }: { agency: Agence }) {
  const href = agency.phone
    ? `tel:${agency.phone.replace(/[^\d+]/g, "")}`
    : agency.email
      ? `mailto:${agency.email}`
      : "#contact";

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-blue-950 to-blue-800">
      <Image src={IMAGES.cta} alt="" fill sizes="100vw" className="-z-20 object-cover object-right" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 via-blue-950/85 to-blue-950/20"
      />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
            <span className="flex size-9 items-center justify-center rounded-lg bg-white/15 text-white">
              <House className="size-5" aria-hidden />
            </span>
            Prêt à réaliser votre projet ?
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Parlons de votre projet immobilier
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            Que vous souhaitiez acheter, vendre ou louer, notre équipe est là pour vous conseiller et
            vous accompagner à chaque étape.
          </p>
        </div>

        <a
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Contacter notre agence
          <ChevronRight className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}