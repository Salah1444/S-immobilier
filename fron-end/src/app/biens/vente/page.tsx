import type { Metadata } from "next";
import PropertyListingPage from "@/components/propeties/PropertyListingPage";
import { getProperties } from "@/services/properties/properties";



export const metadata: Metadata = {
  title: "Biens à vendre au Maroc | Salah Immobilier",
  description:
    "Villas, maisons et appartements à vendre au Maroc. Parcourez notre sélection et trouvez le bien qui vous correspond.",
};

export default async function VentePage() {
  const properties = await getProperties("vendre");

  return <PropertyListingPage transactionType="vendre" properties={properties} />;
}