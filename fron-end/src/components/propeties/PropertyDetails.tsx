import Image from "next/image";
import Link from "next/link";
import InquiryForm from "./InquiryForm";
import PropertyGallery from "./propertyGallery";
import type { ComponentType } from "react";
import {
  BadgeCheck,
  Bath,
  BedDouble,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Hash,
  Home,
  Layers,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Sofa,
  Sprout,
  Star,
  Tag,
  Trees,
  type LucideProps,
} from "lucide-react";

/* ----------------------------- Types ----------------------------- */

export type Amenity = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
};

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  contact_preference: string | null;
  created_at: string;
};

export type PropertyImage = {
  id: number;
  image_path: string;
  alt_text?: string | null;
  is_cover?: number | boolean;
  sort_order?: number;
};

export type Property = {
  id: number;
  slug: string;
  reference: string;
  title: string;
  description: string | null;
  transaction_type: "louer" | "vendre" | string;
  rental_period: string | null;
  price: string;
  area: string | null;
  land_area: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  living_rooms: number | null;
  floor_number: number | null;
  total_floors: number | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
  status: string;
  is_featured: number | boolean;
  city: { name: string; region: string | null };
  property_type: { name: string };
  amenities: Amenity[];
  images?: PropertyImage[];
  inquiries?: Inquiry[];
};

/* ----------------------------- Helpers ----------------------------- */

// Icônes d'équipements stockées en base (nom lucide). Les autres → <Check />.
const AMENITY_ICONS: Record<string, ComponentType<LucideProps>> = {
  "car-front": Car,
  car: Car,
  sofa: Sofa,
  trees: Trees,
  sprout: Sprout,
};

// URL absolue → telle quelle ; chemin relatif → servi par le storage Laravel.
const imageSrc = (img: PropertyImage) => {
  const raw = img.image_path;
  if (/^(https?:)?\/\//.test(raw) || raw.startsWith("data:")) return raw;
  const clean = raw.replace(/^\/+/, "").replace(/^storage\//, "");
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${clean}`;
};

// Couverture d'abord, puis sort_order.
const sortImages = (images: PropertyImage[] = []) =>
  [...images].sort(
    (a, b) =>
      Number(Boolean(b.is_cover)) - Number(Boolean(a.is_cover)) ||
      (a.sort_order ?? 0) - (b.sort_order ?? 0)
  );

const money = (value: string | number) =>
  new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(Number(value));

const number = (value: string | number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(
    Number(value)
  );

const date = (value: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
    new Date(value)
  );

const INQUIRY_STATUS: Record<string, { label: string; className: string }> = {
  nouveau: { label: "Nouveau", className: "bg-blue-50 text-blue-700 ring-blue-600/20" },
  en_cours: { label: "En cours", className: "bg-amber-50 text-amber-800 ring-amber-600/20" },
  traite: { label: "Traité", className: "bg-slate-100 text-slate-700 ring-slate-500/20" },
};

const CONTACT_PREFERENCE: Record<string, string> = {
  phone: "Préfère être appelé",
  email: "Préfère un e-mail",
  whatsapp: "Préfère WhatsApp",
};

const card = "rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5";

/* ----------------------------- Component ----------------------------- */

export default function PropertyDetails({
  property,
  showInquiries = true,
  showInquiryForm = true,
}: {
  property: Property;
  showInquiries?: boolean;
  showInquiryForm?: boolean;
}) {
  const p = property;
  const isRent = p.transaction_type === "louer";
  const featured = Boolean(p.is_featured);
  const images = sortImages(p.images);
  const slides = images.map((img) => ({
    id: img.id,
    src: imageSrc(img),
    alt: img.alt_text ?? p.title,
  }));

  const floor =
    p.floor_number == null
      ? null
      : p.floor_number === 0
      ? "Rez-de-chaussée"
      : p.total_floors != null
      ? `${p.floor_number} sur ${p.total_floors}`
      : `${p.floor_number}`;

  // Les 3 chiffres clés en haut de la fiche
  const keyStats = [
    { icon: Maximize, label: "Surface", value: p.area ? `${number(p.area)} m²` : null },
    { icon: BedDouble, label: "Chambres", value: p.bedrooms },
    { icon: Bath, label: "Salles de bain", value: p.bathrooms },
  ].filter((s) => s.value !== null && s.value !== undefined);

  // La grille « Détails de la propriété »
  const details = [
    { icon: Tag, label: "Type de transaction", value: isRent ? "Location" : "Vente" },
    { icon: Home, label: "Type de bien", value: p.property_type.name },
    { icon: Maximize, label: "Surface", value: p.area ? `${number(p.area)} m²` : null },
    { icon: Trees, label: "Terrain", value: p.land_area ? `${number(p.land_area)} m²` : null },
    { icon: BedDouble, label: "Chambres", value: p.bedrooms },
    { icon: Bath, label: "Salles de bain", value: p.bathrooms },
    { icon: Sofa, label: "Salons", value: p.living_rooms },
    { icon: Layers, label: "Étage", value: floor },
    { icon: MapPin, label: "Ville", value: p.city.name },
    { icon: Hash, label: "Référence", value: p.reference },
    { icon: BadgeCheck, label: "Statut", value: p.status },
  ].filter((d) => d.value !== null && d.value !== undefined && d.value !== "");

  const place = [p.city.name, p.city.region].filter(Boolean).join(", ");
  const mapsUrl =
    p.latitude && p.longitude
      ? `https://www.google.com/maps?q=${p.latitude},${p.longitude}`
      : null;

  return (
    <div className="bg-slate-50">
      <article className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        {/* ---------- Fil d'Ariane ---------- */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600">Accueil</Link>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
          <Link href="/biens" className="hover:text-blue-600">Propriétés</Link>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
          <span className="truncate text-slate-700" aria-current="page">{p.title}</span>
        </nav>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:grid-rows-[auto_1fr]">
          {/* ---------- Fiche : titre, prix, chiffres clés ---------- */}
          <section className={`${card} lg:col-start-2 lg:row-start-1`}>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                {p.property_type.name}
              </span>
              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-white">
                {isRent ? "À louer" : "À vendre"}
              </span>
              {featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">
                  <Star className="size-3 fill-current" aria-hidden />À la une
                </span>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-bold leading-8 tracking-tight text-slate-900">
              {p.title}
            </h1>

            <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {place}
            </p>

            <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
              <span className="text-2xl font-bold text-blue-600">{money(p.price)}</span>
              {isRent && p.rental_period && (
                <span className="text-sm text-slate-500">/ {p.rental_period}</span>
              )}
            </p>
            {p.area && (
              <p className="mt-1 text-sm text-slate-500">
                soit {money(Number(p.price) / Number(p.area))} / m²
              </p>
            )}

            {keyStats.length > 0 && (
              <dl className="mt-6 grid grid-cols-3 gap-2">
                {keyStats.map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <dd className="flex items-center gap-1.5 text-lg font-bold text-slate-900">
                      <Icon className="size-5 shrink-0 text-blue-600" aria-hidden />
                      {value}
                    </dd>
                    <dt className="mt-0.5 text-xs text-slate-500">{label}</dt>
                  </div>
                ))}
              </dl>
            )}

            <a
              href="#contact"
              className="mt-6 block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Demander une visite
            </a>
          </section>

          {/* ---------- Colonne principale ---------- */}
          <div className="min-w-0 space-y-6 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            {slides.length > 0 && <PropertyGallery slides={slides} />}

            {(p.description || p.amenities.length > 0) && (
              <section className={card} aria-labelledby="desc-title">
                <h2 id="desc-title" className="text-xl font-bold text-slate-900">
                  Description
                </h2>

                {p.description && (
                  <p className="mt-4 max-w-prose whitespace-pre-line leading-7 text-slate-600">
                    {p.description}
                  </p>
                )}

                {p.amenities.length > 0 && (
                  <ul
                    aria-label="Équipements"
                    className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-4 rounded-lg bg-blue-50/70 p-5 ring-1 ring-blue-100"
                  >
                    {p.amenities.map((a) => {
                      const Icon = (a.icon && AMENITY_ICONS[a.icon]) || Check;
                      return (
                        <li key={a.id} className="flex flex-col items-center gap-2 text-center">
                          <Icon className="size-7 text-blue-600" aria-hidden />
                          <span className="text-xs text-slate-600">{a.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            )}

            {images.length > 1 && <GalleryGrid images={images} title={p.title} />}

            {/* Détails de la propriété */}
            <section className={card} aria-labelledby="details-title">
              <h2 id="details-title" className="text-xl font-bold text-slate-900">
                Détails de la propriété
              </h2>
              <dl className="mt-5 grid gap-x-6 gap-y-5 rounded-lg border border-slate-200 p-5 sm:grid-cols-2 lg:grid-cols-3">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs text-slate-500">{label}</dt>
                      <dd className="truncate text-sm font-semibold text-slate-900">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>

            {/* Demandes reçues (vue admin) */}
            {showInquiries && p.inquiries && p.inquiries.length > 0 && (
              <section className={card} aria-labelledby="inquiries-title">
                <h2 id="inquiries-title" className="text-xl font-bold text-slate-900">
                  Demandes reçues ({p.inquiries.length})
                </h2>
                <ul className="mt-5 space-y-4">
                  {p.inquiries.map((q) => {
                    const status = INQUIRY_STATUS[q.status] ?? {
                      label: q.status,
                      className: "bg-slate-100 text-slate-700 ring-slate-500/20",
                    };
                    return (
                      <li key={q.id} className="rounded-lg border border-slate-200 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{q.name}</p>
                            {q.subject && <p className="text-sm text-slate-500">{q.subject}</p>}
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>

                        <p className="mt-3 text-slate-600">{q.message}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                          <a href={`mailto:${q.email}`} className="inline-flex items-center gap-1.5 hover:text-blue-600">
                            <Mail className="size-4" aria-hidden />
                            {q.email}
                          </a>
                          {q.phone && (
                            <a href={`tel:${q.phone}`} className="inline-flex items-center gap-1.5 hover:text-blue-600">
                              <Phone className="size-4" aria-hidden />
                              {q.phone}
                            </a>
                          )}
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-4" aria-hidden />
                            {date(q.created_at)}
                          </span>
                          {q.contact_preference && (
                            <span>
                              {CONTACT_PREFERENCE[q.contact_preference] ?? q.contact_preference}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>

          {/* ---------- Localisation ---------- */}
          <div className="space-y-6 lg:col-start-2 lg:row-start-2 lg:self-start">
          {showInquiryForm && <InquiryForm propertyId={p.id} propertyTitle={p.title} />}

          <section className={card} aria-labelledby="location-title">
            <h2 id="location-title" className="text-lg font-bold text-slate-900">
              Localisation
            </h2>
            <p className="mt-3 flex items-start gap-1.5 text-sm text-slate-500">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {[p.address, place].filter(Boolean).join(", ")}
            </p>
            {p.latitude && p.longitude && (
              <iframe
                title={`Carte : ${p.title}`}
                src={`https://maps.google.com/maps?q=${p.latitude},${p.longitude}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="mt-4 h-56 w-full rounded-lg border-0 bg-slate-100"
              />
            )}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50/60 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <MapPin className="size-4" aria-hidden />
                Voir sur Google Maps
              </a>
            )}
          </section>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ----------------------------- Galerie ----------------------------- */

function GalleryGrid({ images, title }: { images: PropertyImage[]; title: string }) {
  return (
    <section id="galerie" className={`${card} scroll-mt-6`} aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="text-xl font-bold text-slate-900">
        Galerie photo
      </h2>
      <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {images.map((img, i) => (
          <li
            key={img.id}
            className={`relative overflow-hidden rounded-lg bg-slate-200 ${
              i === 0 ? "col-span-2 aspect-[16/9] sm:row-span-2 sm:aspect-auto" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={imageSrc(img)}
              alt={img.alt_text ?? `${title} – photo ${i + 1}`}
              fill
              unoptimized
              sizes="(min-width: 1024px) 20rem, 50vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}