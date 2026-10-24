import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { type Agence } from "@/types/agencyTypes";

const card = "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5";

// 06 00 00 00 01 → 212600000001 (indicatif du Maroc)
const whatsappHref = (number: string) => {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("0") ? `212${digits.slice(1)}` : digits}`;
};

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function AgenceDetails({ agency }: { agency: Agence }) {
  const city = (agency.city as { name?: string } | undefined)?.name;
  const address = [agency.address, city].filter(Boolean).join(", ");

  const contacts = [
    { icon: Phone, label: "Téléphone", value: agency.phone, href: `tel:${agency.phone?.replace(/[^\d+]/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: agency.whatsapp, href: whatsappHref(agency.whatsapp ?? "") },
    { icon: Mail, label: "E-mail", value: agency.email, href: `mailto:${agency.email}` },
    { icon: MapPin, label: "Adresse", value: address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` },
  ].filter((c) => c.value);

  const socials = [
    { label: "Facebook", href: agency.facebook_url, icon: <FacebookIcon /> },
    { label: "Instagram", href: agency.instagram_url, icon: <InstagramIcon /> },
  ].filter((s) => s.href);

  return (
    <div className=" z-10 mx-auto  grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_24rem] lg:px-8">
      {/* Colonne principale */}
      <div className="space-y-6 mt-20">
        {agency.description && (
          <section >
            <h2 className="text-xl font-bold text-slate-900">À propos de l&apos;agence</h2>
            <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">{agency.description}</p>
          </section>
        )}

        <section className={card}>
          <h2 className="text-xl font-bold text-slate-900">Nous contacter</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={label === "Adresse" || label === "WhatsApp" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/40"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-500">{label}</span>
                    <span className="block break-words text-sm font-semibold text-slate-900">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Colonne latérale */}
      <aside className="space-y-6">
        {address && (
          <section className={`${card} overflow-hidden p-0`}>
            <iframe
              title="Localisation de l'agence"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address + ", Maroc")}&z=15&output=embed`}
              loading="lazy"
              className="h-64 w-full border-0 bg-slate-100"
            />
            <p className="flex items-start gap-1.5 p-5 text-sm text-slate-600">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {address}
            </p>
          </section>
        )}

        {socials.length > 0 && (
          <section className={card}>
            <h2 className="text-lg font-bold text-slate-900">Suivez-nous</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-blue-600 hover:text-white"
                  >
                    {icon}
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    </div>
  );
}