import type { Metadata } from "next";
import { getAgency } from "@/services/agency/getAgency";
import AgenceHero from "@/components/agence/AgenceHero";
import AgenceHistoire from "@/components/agence/AgenceHistoire";
import AgenceSidebar from "@/components/agence/AgenceSidebar";
import AgenceCTA from "@/components/agence/AgenceCta";


export async function generateMetadata(): Promise<Metadata> {
  const agency = await getAgency();
  return {
    title: `À propos | ${agency.agency_name}`,
    description: agency.description?.slice(0, 160),
  };
}

export default async function AgencePage() {
  const agency = await getAgency();

  return (
    <main className="bg-white">
      <AgenceHero agency={agency} />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:px-8 lg:py-16">
        <AgenceHistoire agency={agency} />
        <AgenceSidebar agency={agency} />
      </div>

      <AgenceCTA agency={agency} />
    </main>
  );
}