
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Api from "@/lib/axios";
import { getCsrfCookie } from "@/lib/csrf";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    setMessage("");
    setError("");
    try {
      await getCsrfCookie();

      const response = await Api.post("/forgot-password", {
        email: data.email,
      });

      setMessage(
        response.data.message ||
          "Si cette adresse est enregistrée, un lien sera envoyé."
      );
    } catch (err: any) {
      if (err.response?.status === 422) {
        setError(
          err.response.data.message ||
            "Vérifie l'adresse e-mail saisie."
        );
      } else if (err.response?.status === 429) {
        setError("Patiente avant de demander un nouveau lien.");
      } else {
        setError(
          "Une erreur est survenue. Veuillez réessayer."
        );
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 mt-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Récupération du mot de passe
          </h1>
          <p className="mb-6 mt-5 text-sm text-gray-600">
            Saisis ton adresse e-mail pour réinitialiser ton mot de passe.
          </p>
        </div>

        {message && (
          <div
            role="status"
            className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-gray-600"
            >
              Adresse e-mail
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="exemple@email.com"
              {...register("email", {
                required: "L'adresse e-mail est obligatoire.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Saisis une adresse e-mail valide.",
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:ring-2 focus:ring-cyan-500"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto mb-4 mt-4 block w-32 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 py-2 text-white transition hover:from-cyan-500 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Envoi..." : "Envoyer"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Retour à{" "}
            <Link
              href="/login"
              className="font-medium text-cyan-600 hover:text-cyan-700"
            >
              la connexion
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Salah Immobilier
        </p>
      </div>
    </main>
  );
}
