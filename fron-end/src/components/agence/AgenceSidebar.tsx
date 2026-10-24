import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { type Agence } from "@/types/agencyTypes";
import Eyebrow from "./Eyebrow";
import { STATS, TEAM } from "./content";

const panel = "rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-900/5";

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

export default function AgenceSidebar({ agency }: { agency: Agence }) {
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
    <aside className="space-y-6">
      {/* Chiffres clés */}
      <section className={panel} aria-labelledby="stats-title">
        <h2 id="stats-title" className="text-lg font-bold text-blue-950">
          Nos chiffres clés
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3">
          {STATS.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-900/5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Icon className="size-6" aria-hidden />
              </span>
              <span>
                <span className="block text-xl font-bold leading-tight text-blue-950">{value}</span>
                <span className="block text-xs text-slate-500">{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Équipe (uniquement si TEAM n'est pas vide) */}
      {TEAM.length > 0 && (
        <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-900/5" aria-labelledby="team-title">
          <Eyebrow>Notre équipe</Eyebrow>
          <h2 id="team-title" className="mt-3 text-lg font-bold text-blue-950">
            Des experts à votre service
          </h2>
          <ul className="mt-4 grid grid-cols-3 gap-3">
            {TEAM.map((member) => (
              <li key={member.name}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-200">
                  <Image src={member.photo} alt={member.name} fill sizes="9rem" className="object-cover" />
                </div>
                <p className="mt-2 text-sm font-semibold leading-tight text-blue-950">{member.name}</p>
                <p className="text-xs text-slate-500">{member.role}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Coordonnées */}
      <section id="contact" className="scroll-mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/5" aria-labelledby="contact-title">
        <div className="p-5">
          <h2 id="contact-title" className="text-lg font-bold text-blue-950">
            Nos coordonnées
          </h2>
          <ul className="mt-4 space-y-3">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={label === "Adresse" || label === "WhatsApp" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-500">{label}</span>
                    <span className="block break-words text-sm font-semibold text-blue-950">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-600 hover:text-white"
                  >
                    {icon}
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {address && (
          <iframe
            title="Localisation de l'agence"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address + ", Maroc")}&z=15&output=embed`}
            loading="lazy"
            className="h-48 w-full border-0 bg-slate-100"
          />
        )}
      </section>
    </aside>
  );
}