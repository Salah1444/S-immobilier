import Link from "next/link";
function Navbar() {
  return (
    <div>
      <header className="border-b border-slate-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Salah <span className="text-blue-700">Immobilier</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <Link href="/biens">Nos biens</Link>
            <Link href="/vente">Vente</Link>
            <Link href="/location">Location</Link>
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
