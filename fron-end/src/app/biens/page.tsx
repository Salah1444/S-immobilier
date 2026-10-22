
"use client";

import { useEffect, useState } from "react";
import Api from "@/lib/axios";
import PropertyCard, {
  type PropertyCardData,
} from "@/components/propeties/propertyCard";
import PropertyFormSkeleton from "@/components/propeties/CardSkeleton";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchProperties() {
      try {
        const response = await Api.get("/properties");
        const payload = response.data;

        const items = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.data?.data)
              ? payload.data.data
              : [];

        if (!cancelled) {
          setProperties(items);
        }
      } catch {
        if (!cancelled) {
          setError("Impossible de charger les biens immobiliers.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProperties();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600">
            Salah Immobilier
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Nos biens immobiliers
          </h1>
          <p className="mt-3 text-slate-500">
            Découvrez nos appartements et villas à vendre ou à louer.
          </p>
        </div>

        {loading ? (
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
           {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <PropertyFormSkeleton  />
          </div>
        ))}
          </div>
        ) : error ? (
          <p role="alert" className="py-12 text-center text-red-600">
            {error}
          </p>
        ) : properties.length === 0 ? (
          <p className="py-12 text-center text-slate-500">
            Aucun bien immobilier disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
