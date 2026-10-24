import {
  Handshake,
  House,
  MapPin,
  ShieldCheck,
  Star,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Images à placer dans /public/agence/ (le dégradé bleu sert de repli si absentes). */
export const IMAGES = {
  hero: "/agency/hero.png",
  story: "/agency/histoire.jpg",
  cta: "/agence/cta.jpg",
};

export const HERO_TEXT =
  "Spécialisée dans la vente et la location de biens immobiliers, notre agence vous accompagne dans la réalisation de vos projets avec professionnalisme, transparence et proximité.";

// ⚠️ Chiffres de la maquette : remplacez-les par vos vrais chiffres.
export const STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: House, value: "500+", label: "Biens disponibles" },
  { icon: Users, value: "200+", label: "Clients satisfaits" },
  { icon: Handshake, value: "5 ans", label: "D'expérience" },
  { icon: MapPin, value: "4", label: "Villes au Maroc" },
];

export const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: "Confiance", text: "Une relation transparente et durable avec nos clients." },
  { icon: Users, title: "Proximité", text: "Une équipe à votre écoute, à chaque étape." },
  { icon: Star, title: "Professionnalisme", text: "Une expertise reconnue du marché immobilier." },
  { icon: Target, title: "Engagement", text: "Votre satisfaction est notre priorité." },
];

export type TeamMember = { name: string; role: string; photo: string };

/**
 * Équipe : la section n'apparaît que si la liste n'est pas vide. Exemple :
 * { name: "Prénom Nom", role: "Directeur général", photo: "/agence/equipe-1.jpg" },
 */
export const TEAM: TeamMember[] = [];