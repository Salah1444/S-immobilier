
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ArrowUpRight,
} from "lucide-react";



export type PropertyCardData = {
  id: number;
  title: string;
  price: number | string;
  transaction_type: "vendre" | "louer";
  rental_period: "mois" | "jour"
  description?: string | null;
  address?: string | null;
  city?: {
    name: string;
  } | null;
  area?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  images?: {
    id: number;
    image_path: string;
    is_cover?: boolean;
  }[];
};

type PropertyCardProps = {
  property: PropertyCardData;
};

function getImageUrl(path?: string | null) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;

  const baseUrl = (
    process.env.NEXT_PUBLIC_API_URL
  );

  return `${baseUrl}/storage/${path}`;
}

function formatPrice(price: number | string) {
  return new Intl.NumberFormat("fr-MA", {
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const images = property?.images?.find(i =>i?.is_cover);

  const imageUrl = getImageUrl(images?.image_path);
  const isRent = property.transaction_type === "louer";

  return (
    <article className="group w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-700 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <Link
        href={`/biens/${property.id}`}
        aria-label={`Consulter ${property.title}`}
        className="relative mx-3 mt-3 block h-64 overflow-hidden rounded-xl bg-slate-100"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Photo non disponible
          </div>
        )}

        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-semibold text-white ${
            isRent ? "bg-cyan-600" : "bg-blue-700"
          }`}
        >
          {isRent ? "À louer" : "À vendre"}
        </span>

        <span className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow">
          {isRent ? "Location" : "Vente"}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 text-base font-semibold leading-6 text-slate-900">
            {property.title}
          </h2>

          <p className="shrink-0 text-base font-bold text-blue-700">
            {formatPrice(property.price)}
            <span className="ml-1 text-xs font-medium">DH </span>
            {isRent  && `/${property?.rental_period}`}
          </p>
        </div>

        <p className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={16} className="shrink-0 text-cyan-600" />
          <span className="truncate">
            {[property.address, property.city?.name]
              .filter(Boolean)
              .join(", ") || "Adresse sur demande"}
          </span>
        </p>

        <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {property.description || "Contactez notre agence pour en savoir plus sur ce bien immobilier."}
        </p>

        {/* Characteristics */}
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-slate-100 py-4 text-sm text-slate-600">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={17} className="text-cyan-600" />
              {property.bedrooms} ch.
            </span>
          )}

          {property.bathrooms != null && (
            <span className="flex items-center gap-1.5">
              <Bath size={17} className="text-cyan-600" />
              {property.bathrooms} sdb.
            </span>
          )}

          {property.area != null && (
            <span className="flex items-center gap-1.5">
              <Maximize size={16} className="text-cyan-600" />
              {property.area} m²
            </span>
          )}
        </div>

        {/* Action */}
        <Link
          href={`/biens/${property.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-600 hover:text-white"
        >
          Voir les détails
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
