"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { CircleAlert, CircleCheck, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import Api from "@/lib/axios"; // adaptez le chemin vers votre instance axios

/* ----------------------------- Types ----------------------------- */

type Preference = "phone" | "email" | "whatsapp";

type Values = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  contact_preference: Preference;
};

type Errors = Partial<Record<keyof Values, string>>;

const SUBJECTS = [
  "Demande de visite",
  "Demande d'informations",
  "Négocier le prix",
  "Autre",
];

const PREFERENCES: { value: Preference; label: string; icon: typeof Phone }[] = [
  { value: "phone", label: "Téléphone", icon: Phone },
  { value: "email", label: "E-mail", icon: Mail },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
];

const INITIAL: Values = {
  name: "",
  email: "",
  phone: "",
  subject: SUBJECTS[0],
  message: "",
  contact_preference: "phone",
};

/* ----------------------------- Validation ----------------------------- */

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Saisissez votre nom complet.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Saisissez une adresse e-mail valide.";
  if (v.phone && !/^[0-9+\s().-]{8,20}$/.test(v.phone.trim())) e.phone = "Numéro de téléphone invalide.";
  if (!v.phone && v.contact_preference !== "email") {
    e.phone = "Indiquez un numéro pour être contacté par téléphone ou WhatsApp.";
  }
  if (v.message.trim().length < 10) e.message = "Votre message doit faire au moins 10 caractères.";
  return e;
}

/* ----------------------------- UI ----------------------------- */

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 aria-[invalid=true]:border-red-500";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {optional && <span className="font-normal text-slate-400"> (facultatif)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/* ----------------------------- Component ----------------------------- */

export default function InquiryForm({
  propertyId,
  propertyTitle,
}: {
  propertyId: number;
  propertyTitle?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const aria = (key: keyof Values) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `inquiry-${key}-error` : undefined,
  });
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("loading");
    setFormError(null);

    try {
      // Cookie CSRF de Laravel Sanctum (ignoré si votre API n'en a pas besoin)
      await Api.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`).catch(() => {});

      await Api.post("/inquiries", {
        property_id: propertyId,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        subject: values.subject,
        message: values.message.trim(),
        contact_preference: values.contact_preference,
      });

      setStatus("success");
      router.refresh(); // met à jour la liste des demandes si elle est affichée
    } catch (err) {
      setStatus("idle");
      if (isAxiosError(err) && err.response?.status === 422) {
        // Erreurs de validation Laravel : { message, errors: { champ: [..] } }
        const fieldErrors = (err.response.data?.errors ?? {}) as Record<string, string[]>;
        const mapped: Errors = {};
        for (const [field, messages] of Object.entries(fieldErrors)) {
          mapped[field as keyof Values] = messages[0];
        }
        setErrors(mapped);
        setFormError("Certains champs sont invalides. Corrigez-les puis réessayez.");
      } else {
        setFormError("Impossible d'envoyer votre demande pour le moment. Réessayez dans un instant.");
      }
    }
  }

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setFormError(null);
    setStatus("idle");
  };

  /* ---------- Succès ---------- */
  if (status === "success") {
    return (
      <section
        id="contact"
        className="scroll-mt-6 rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/5"
        role="status"
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CircleCheck className="size-6" aria-hidden />
        </span>
        <h2 className="mt-4 text-lg font-bold text-slate-900">Demande envoyée</h2>
        <p className="mt-2 text-sm text-slate-600">
          Merci {values.name.split(" ")[0]}. Nous vous recontactons très bientôt.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Envoyer une autre demande
        </button>
      </section>
    );
  }

  /* ---------- Formulaire ---------- */
  return (
    <section
      id="contact"
      aria-labelledby="inquiry-title"
      className="scroll-mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5"
    >
      <h2 id="inquiry-title" className="text-lg font-bold text-slate-900">
        Demander une visite
      </h2>
      {propertyTitle && <p className="mt-1 text-sm text-slate-500">{propertyTitle}</p>}

      <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
        <Field id="inquiry-name" label="Nom complet" error={errors.name}>
          <input
            id="inquiry-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass}
            placeholder="Mohamed Amrani"
            {...aria("name")}
          />
        </Field>

        <Field id="inquiry-email" label="E-mail" error={errors.email}>
          <input
            id="inquiry-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClass}
            placeholder="vous@exemple.com"
            {...aria("email")}
          />
        </Field>

        <Field
          id="inquiry-phone"
          label="Téléphone"
          optional={values.contact_preference === "email"}
          error={errors.phone}
        >
          <input
            id="inquiry-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputClass}
            placeholder="06 00 00 00 01"
            {...aria("phone")}
          />
        </Field>

        <Field id="inquiry-subject" label="Sujet" error={errors.subject}>
          <select
            id="inquiry-subject"
            value={values.subject}
            onChange={(e) => set("subject", e.target.value)}
            className={inputClass}
            {...aria("subject")}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field id="inquiry-message" label="Message" error={errors.message}>
          <textarea
            id="inquiry-message"
            rows={4}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${inputClass} resize-y`}
            placeholder="Bonjour, je souhaite visiter ce bien…"
            {...aria("message")}
          />
        </Field>

        <fieldset>
          <legend className="text-sm font-medium text-slate-700">Comment vous contacter ?</legend>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {PREFERENCES.map(({ value, label, icon: Icon }) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="contact_preference"
                  value={value}
                  checked={values.contact_preference === value}
                  onChange={() => set("contact_preference", value)}
                  className="peer sr-only"
                />
                <span className="flex flex-col items-center gap-1 rounded-lg border border-slate-300 px-2 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600/40">
                  <Icon className="size-4" aria-hidden />
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {formError && (
          <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {status === "loading" && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {status === "loading" ? "Envoi en cours…" : "Envoyer la demande"}
        </button>
      </form>
    </section>
  );
}