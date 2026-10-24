import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  CalendarDays,
  ChevronRight,
  House,
  KeyRound,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

// Police « manuscrite » pour le slogan en haut à droite
const handwriting = Caveat({ subsets: ["latin"], weight: "600", display: "swap" });

type TransactionType = "vendre" | "louer";

type Variant = {
  eyebrow: string;
  title: string;
  description: string;
  tagline: [string, string];
  breadcrumb: string;
  image: string; // fichier dans /public
  features: { icon: LucideIcon; line1: string; line2: string }[];
  cta: string;
  // Classes complètes (Tailwind ne détecte pas les classes construites dynamiquement)
  eyebrowColor: string;
  iconColor: string;
  button: string;
};

const VARIANTS: Record<TransactionType, Variant> = {
  vendre: {
    eyebrow: "Biens immobiliers à",
    title: "Vendre",
    description:
      "Trouvez la propriété idéale pour un investissement sûr ou pour y vivre. Villas, appartements, terrains…",
    tagline: ["Investissez", "dans votre avenir"],
    breadcrumb: "Vente",
    image: "/properties/bg-vendre.jpg", // ← adaptez le nom / l'extension
    features: [
      { icon: House, line1: "Large choix", line2: "de biens" },
      { icon: ShieldCheck, line1: "Transactions", line2: "sécurisées" },
      { icon: MapPin, line1: "Les meilleures", line2: "villes du Maroc" },
    ],
    cta: "Voir les biens à vendre",
    eyebrowColor: "text-sky-300",
    iconColor: "text-blue-400",
    button: "bg-blue-500 hover:bg-blue-600 focus-visible:outline-blue-300",
  },
  louer: {
    eyebrow: "Biens immobiliers à",
    title: "Louer",
    description:
      "Que ce soit pour une courte ou longue durée, trouvez le logement qui correspond à vos besoins.",
    tagline: ["Un chez-vous", "en toute sérénité"],
    breadcrumb: "Location",
    image: "/properties/bg-louer.jpg", 
    features: [
      { icon: KeyRound, line1: "Appartements", line2: "& villas" },
      { icon: CalendarDays, line1: "Locations courte", line2: "et longue durée" },
      { icon: MapPin, line1: "Dans toutes", line2: "les grandes villes" },
    ],
    cta: "Voir les biens à louer",
    eyebrowColor: "text-cyan-200",
    iconColor: "text-cyan-300",
    button: "bg-cyan-500 hover:bg-cyan-600 focus-visible:outline-cyan-200",
  },
};

export default function PropertyListingHero({
  transactionType,
}: {
  transactionType: TransactionType;
}) {
  const v = VARIANTS[transactionType];

  return (
    <section className="relative isolate overflow-hidden bg-slate-900">
      {/* Image de fond + dégradé pour garder le texte lisible */}
      <Image
        src={v.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/10 md:to-transparent"
      />

      {/* Slogan manuscrit */}
      <p
        aria-hidden
        className={`${handwriting.className} pointer-events-none absolute right-6 top-8 hidden -rotate-6 text-right text-3xl leading-tight text-cyan-300 md:block lg:right-16 lg:top-12 lg:text-4xl`}
      >
        {v.tagline[0]}
        <br />
        {v.tagline[1]}
        <svg viewBox="0 0 160 12" fill="none" className="ml-auto mt-1 h-3 w-40" aria-hidden>
          <path
            d="M2 8C40 2 100 2 158 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </p>

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:pb-32 lg:px-8">
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-slate-200">
          <Link href="/" className="transition hover:text-white">
            Accueil
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-white" aria-current="page">
            {v.breadcrumb}
          </span>
        </nav>

        <div className="mt-14 max-w-xl sm:mt-20">
          <p
            className={`text-sm font-medium uppercase tracking-[0.3em] sm:text-base ${v.eyebrowColor}`}
          >
            {v.eyebrow}
          </p>

          <h1 className="mt-2 text-6xl font-extrabold leading-none tracking-tight text-white sm:text-7xl lg:text-8xl">
            {v.title}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-100 sm:text-lg">
            {v.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            {v.features.map(({ icon: Icon, line1, line2 }) => (
              <li
                key={line1}
                className="flex items-center gap-3 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-white/20 sm:[&:not(:first-child)]:pl-6"
              >
                <Icon className={`size-8 shrink-0 ${v.iconColor}`} strokeWidth={1.5} aria-hidden />
                <span className="text-sm leading-tight text-white/90">
                  {line1}
                  <br />
                  {line2}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#resultats"
            className={`mt-9 inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-semibold text-white shadow-lg shadow-slate-950/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${v.button}`}
          >
            {v.cta}
            <ChevronRight className="size-5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}