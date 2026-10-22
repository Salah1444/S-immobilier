import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import Api from "@/lib/axios"; // adaptez le chemin vers votre instance axios
import PropertyDetails, { type Property } from "@/components/propeties/PropertyDetails";


// cache() évite d'appeler l'API deux fois (generateMetadata + page).
const getProperty = cache(async (id: string): Promise<Property> => {
  try {
    const { data } = await Api.get<Property>(`/properties/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) notFound();
    throw error; 
  }
});

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  return {
    title: property.title,
    description: property.description ?? undefined,
  };
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = await getProperty(id);

  return <PropertyDetails property={property} showInquiries={true} />;
}