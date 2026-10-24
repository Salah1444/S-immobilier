"use client"
import { useGetAgency } from "@/hooks/agency/useGetAgence";
import Link from "next/link";
function Navbar() {
  const {agency,isLoading} = useGetAgency();
  console.log(agency);
  return (
    <div>
      <header className="border-b  border-slate-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {!isLoading &&<Link href="/" className="text-xl font-bold tracking-tight">
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/agence/${agency?.logo_path}`} alt="Logo de l'agence" className="w-full h-20"  />
          </Link>}

          <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <Link href="/biens">Nos biens</Link>
            <Link href="/biens/vente">Vente</Link>
            <Link href="/biens/location">Location</Link>
            <Link href="/agence">Notre agence</Link>
          </div>
          <Link
            href="/contact"
            className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Nous contacter
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
