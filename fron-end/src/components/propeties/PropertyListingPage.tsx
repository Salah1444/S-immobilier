"use client";

import { useDeferredValue, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, House, Search, X } from "lucide-react";

import PropertyCard, {
  type PropertyCardData,
} from "@/components/propeties/propertyCard";
import PropertyListingHero from "@/components/propeties/PropertyListingHero";

type Props = {
  transactionType: "vendre" | "louer";
  /** Biens déjà chargés par la page serveur. */
  properties: PropertyCardData[];
};

type SortKey = "recent" | "price-asc" | "price-desc";

/* ----------------------------- Helpers ----------------------------- */

// « Médina » = « medina » : recherche insensible à la casse et aux accents.
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

// Champs optionnels de l'API : lus sans casser le typage de PropertyCardData.
type Optional = {
  bedrooms?: number | string | null;
  property_type?: { name?: string | null } | null;
};
const optional = (p: PropertyCardData) => p as PropertyCardData & Optional;
const typeName = (p: PropertyCardData) => optional(p).property_type?.name ?? null;
const bedroomCount = (p: PropertyCardData) => {
  const n = optional(p).bedrooms;
  return n == null ? null : Number(n);
};

const formatNumber = (n: number) => new Intl.NumberFormat("fr-MA").format(n);

const controlClass =
  "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15";

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectControl({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${controlClass} appearance-none pr-9`}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
    </div>
  );
}

/* ----------------------------- Component ----------------------------- */

export default function PropertyListingPage({ transactionType, properties }: Props) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");

  // La frappe reste fluide même avec beaucoup de biens.
  const deferredSearch = useDeferredValue(search);

  const isRent = transactionType === "louer";

  // Texte de recherche calculé une seule fois par bien
  const indexed = useMemo(
    () =>
      properties.map((property) => ({
        property,
        text: normalize(
          [
            property.title,
            property.address,
            property.city?.name,
            property.description,
            typeName(property),
          ]
            .filter(Boolean)
            .join(" ")
        ),
      })),
    [properties]
  );

  const cities = useMemo(
    () =>
      Array.from(
        new Set(
          properties.map((p) => p.city?.name).filter((name): name is string => Boolean(name))
        )
      ).sort((a, b) => a.localeCompare(b, "fr")),
    [properties]
  );

  const types = useMemo(
    () =>
      Array.from(
        new Set(properties.map(typeName).filter((name): name is string => Boolean(name)))
      ).sort((a, b) => a.localeCompare(b, "fr")),
    [properties]
  );

  const hasBedrooms = useMemo(
    () => properties.some((p) => bedroomCount(p) !== null),
    [properties]
  );

  const results = useMemo(() => {
    const query = normalize(deferredSearch);
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);
    const minBeds = bedrooms ? Number(bedrooms) : null;

    return indexed
      .filter(({ property, text }) => {
        if (!text.includes(query)) return false;
        if (city && property.city?.name !== city) return false;
        if (type && typeName(property) !== type) return false;

        if (minBeds !== null) {
          const beds = bedroomCount(property);
          if (beds === null || beds < minBeds) return false;
        }

        const price = Number(property.price);
        if (min !== null && price < min) return false;
        if (max !== null && price > max) return false;

        return true;
      })
      .map(({ property }) => property)
      .sort((a, b) => {
        if (sort === "price-asc") return Number(a.price) - Number(b.price);
        if (sort === "price-desc") return Number(b.price) - Number(a.price);
        return b.id - a.id;
      });
  }, [indexed, deferredSearch, city, type, bedrooms, minPrice, maxPrice, sort]);

  const count = results.length;

  /* ---------- Filtres actifs (pastilles) ---------- */
  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  if (search.trim()) chips.push({ key: "q", label: `« ${search.trim()} »`, onRemove: () => setSearch("") });
  if (city) chips.push({ key: "city", label: city, onRemove: () => setCity("") });
  if (type) chips.push({ key: "type", label: type, onRemove: () => setType("") });
  if (bedrooms) chips.push({ key: "beds", label: `${bedrooms}+ chambres`, onRemove: () => setBedrooms("") });
  if (minPrice || maxPrice) {
    const label =
      minPrice && maxPrice
        ? `${formatNumber(Number(minPrice))} – ${formatNumber(Number(maxPrice))} MAD`
        : minPrice
          ? `À partir de ${formatNumber(Number(minPrice))} MAD`
          : `Jusqu'à ${formatNumber(Number(maxPrice))} MAD`;
    chips.push({
      key: "price",
      label,
      onRemove: () => {
        setMinPrice("");
        setMaxPrice("");
      },
    });
  }

  const resetFilters = () => {
    setSearch("");
    setCity("");
    setType("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <PropertyListingHero transactionType={transactionType} />

      {/* ---------- Recherche et filtres ---------- */}
      <section
        aria-label="Recherche et filtres"
        className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-6">
          {/* Recherche */}
          <div className="relative">
            <label htmlFor="property-search" className="sr-only">
              Rechercher un bien
            </label>
            <Search
              className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              id="property-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher par titre, adresse, ville ou type de bien…"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
            />
          </div>

          {/* Critères */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]">
            <Field label="Ville" htmlFor="filter-city">
              <SelectControl id="filter-city" value={city} onChange={setCity}>
                <option value="">Toutes les villes</option>
                {cities.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </SelectControl>
            </Field>

            {types.length > 0 && (
              <Field label="Type de bien" htmlFor="filter-type">
                <SelectControl id="filter-type" value={type} onChange={setType}>
                  <option value="">Tous les types</option>
                  {types.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </SelectControl>
              </Field>
            )}

            {hasBedrooms && (
              <Field label="Chambres" htmlFor="filter-bedrooms">
                <SelectControl id="filter-bedrooms" value={bedrooms} onChange={setBedrooms}>
                  <option value="">Indifférent</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}+
                    </option>
                  ))}
                </SelectControl>
              </Field>
            )}

            <div role="group" aria-labelledby="budget-label" className="sm:col-span-2 lg:col-span-1">
              <span id="budget-label" className="mb-1.5 block text-xs font-semibold text-slate-600">
                Budget (MAD{isRent ? " / mois" : ""})
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder={isRent ? "Min. 2 000" : "Min. 500 000"}
                  aria-label="Prix minimum"
                  className={controlClass}
                />
                <span className="text-slate-400" aria-hidden>
                  –
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder={isRent ? "Max. 15 000" : "Max. 5 000 000"}
                  aria-label="Prix maximum"
                  className={controlClass}
                />
              </div>
            </div>
          </div>

          {/* Filtres actifs */}
          {chips.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
              <span className="text-xs font-medium text-slate-500">Filtres actifs :</span>
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Retirer le filtre ${chip.label}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                >
                  {chip.label}
                  <X className="size-3.5" aria-hidden />
                </button>
              ))}
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto text-xs font-semibold text-slate-500 transition hover:text-slate-900"
              >
                Tout effacer
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Résultats ---------- */}
      <section id="resultats" className="mx-auto max-w-7xl scroll-mt-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Biens {isRent ? "à louer" : "à vendre"}
            </h2>
            <p className="mt-2 text-sm text-slate-500" aria-live="polite">
              {count} bien{count > 1 ? "s" : ""} trouvé{count > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="property-sort" className="text-sm text-slate-500">
              Trier par
            </label>
            <div className="w-48">
              <SelectControl id="property-sort" value={sort} onChange={(v) => setSort(v as SortKey)}>
                <option value="recent">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </SelectControl>
            </div>
          </div>
        </div>

        {count > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <House className="mx-auto text-slate-400" size={42} aria-hidden />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Aucun bien trouvé</h3>
            <p className="mt-2 text-sm text-slate-500">
              {chips.length > 0
                ? "Essayez d'élargir ou de modifier vos critères de recherche."
                : isRent
                  ? "Aucun bien à louer n'est disponible pour le moment."
                  : "Aucun bien à vendre n'est disponible pour le moment."}
            </p>
            {chips.length > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}