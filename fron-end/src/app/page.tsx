import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* ── HERO AVEC VIDÉO ── */}
      <section className="relative min-h-screen overflow-hidden">

        {/* 1. LA VIDÉO — fond fixe */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* 2. OVERLAY — pour lire le texte */}
        <div className="absolute inset-0 bg-black/50" />

        {/* 3. CONTENU par dessus */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:py-40">

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Votre agence immobilière à Agadir
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            Trouvez le bien qui correspond à votre{" "}
            <span className="text-blue-400">projet de vie.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Découvrez notre sélection de villas, appartements et maisons à vendre
            ou à louer à Agadir et dans ses environs.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/biens"
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Explorer nos biens
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Parler à un conseiller
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-4 border-t border-white/20 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-lg font-semibold text-white">Vente</p>
              <p className="mt-1 text-sm text-white/60">Achetez votre prochain bien.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Location longue durée</p>
              <p className="mt-1 text-sm text-white/60">Trouvez votre futur logement.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Location courte durée</p>
              <p className="mt-1 text-sm text-white/60">Préparez votre séjour à Agadir.</p>
            </div>
          </div>

        </div>
      </section>

      <footer className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Salah Immobilier — Agadir, Maroc.
        </div>
      </footer>
    </main>
  );
}