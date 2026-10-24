import type { Metadata } from "next";
import PropertyListingPage from "@/components/propeties/PropertyListingPage";
import { getProperties } from "@/services/properties/properties";



export const metadata: Metadata = {
  title: "Biens à louer au Maroc | Salah Immobilier",
  description:
    "Appartements, villas et maisons à louer au Maroc, pour une location courte ou longue durée.",
};

export default async function LocationPage() {
  const properties = await getProperties("louer");

  return <PropertyListingPage transactionType="louer" properties={properties} />;
}