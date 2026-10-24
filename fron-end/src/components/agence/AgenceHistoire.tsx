import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { type Agence } from "@/types/agencyTypes";
import Eyebrow from "./Eyebrow";
import { IMAGES, VALUES } from "./content";

export default function AgenceHistoire({ agency }: { agency: Agence }) {
  return (
    <div className="space-y-14">
      {/* Notre histoire */}
      <section className="grid items-stretch gap-8 md:grid-cols-2">
        <div>
          <Eyebrow>Notre histoire</Eyebrow>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-blue-950 sm:text-3xl">
            Plus qu&apos;une agence,
            <br />
            un partenaire de vie
          </h2>

          {agency.description && (
            <p className="mt-5 whitespace-pre-line min-h-70 leading-7 text-slate-600">{agency.description}</p>
          )}

          <p className="mt-6 flex items-center gap-3 rounded-xl bg-blue-50 px-5 py-4 text-sm font-medium text-blue-800">
            <ShieldCheck className="size-5 shrink-0 text-blue-600" aria-hidden />
            Votre confiance est notre plus grande réussite.
          </p>
        </div>

        <div className="relative min-h-64 overflow-hidden rounded-xl bg-slate-200 shadow-lg shadow-slate-900/10">
          <Image
            src={IMAGES.story}
            alt={`${agency.agency_name}`}
            fill
            sizes="(min-width: 768px) 28rem, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Nos valeurs */}
      <section aria-labelledby="values-title">
        <Eyebrow>Nos valeurs</Eyebrow>
        <h2 id="values-title" className="sr-only">
          Nos valeurs
        </h2>
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-6" : "lg:pr-6"}>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-bold text-blue-950">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}