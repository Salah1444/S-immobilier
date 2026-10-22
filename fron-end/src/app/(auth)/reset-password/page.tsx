
"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import Api from "@/lib/axios";
import { getCsrfCookie } from "@/lib/csrf";

type ResetPasswordForm = {
  password: string;
  password_confirmation: string;
};

function ResetPasswordFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>();

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordForm) => {
    setError("");
    setSuccess("");

    if (!token || !email) {
      setError(
        "Le lien de réinitialisation est incomplet. Demande un nouveau lien."
      );
      return;
    }

    try {
      await getCsrfCookie();

      const response = await Api.post("/reset-password", {
        token,
        email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      setSuccess(
        response.data.message ||
          "Ton mot de passe a été modifié avec succès."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)
          .flat()
          .find((value) => typeof value === "string");

        setError(
          typeof firstError === "string"
            ? firstError
            : "Vérifie les informations saisies."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Le lien est invalide ou a expiré. Demande un nouveau lien."
        );
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 mt-6 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
            <LockKeyhole size={28} />
          </div>

          <h1 className="text-2xl font-semibold text-gray-700">
            Nouveau mot de passe
          </h1>

          <p className="mb-6 mt-4 text-sm text-gray-600">
            Choisis un nouveau mot de passe sécurisé pour ton compte.
          </p>
        </div>

        {!token || !email ? (
          <div role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            Le lien est incomplet ou invalide. Demande un nouveau lien de réinitialisation.
            <Link
              href="/forgot-password"
              className="mt-3 block font-medium text-cyan-700 hover:underline"
            >
              Demander un nouveau lien
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div role="status" className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
                <p className="mt-1">Redirection vers la connexion...</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm text-gray-600">
                  Nouveau mot de passe
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Au moins 8 caractères"
                    {...register("password", {
                      required: "Le mot de passe est obligatoire.",
                      minLength: {
                        value: 8,
                        message: "Le mot de passe doit contenir au moins 8 caractères.",
                      },
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password_confirmation" className="mb-2 block text-sm text-gray-600">
                  Confirmer le mot de passe
                </label>

                <div className="relative">
                  <input
                    id="password_confirmation"
                    type={showConfirmation ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirme ton mot de passe"
                    {...register("password_confirmation", {
                      required: "La confirmation est obligatoire.",
                      validate: (value) =>
                        value === password || "Les mots de passe ne correspondent pas.",
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmation(!showConfirmation)}
                    aria-label={showConfirmation ? "Masquer la confirmation" : "Afficher la confirmation"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password_confirmation && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !!success}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 py-3 font-semibold text-white transition hover:from-cyan-500 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
              </button>
            </form>
          </>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Retour à{" "}
          <Link href="/login" className="font-medium text-cyan-600 hover:text-cyan-700">
            la connexion
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Salah Immobilier
        </p>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
          <p className="text-sm text-gray-600">Chargement...</p>
        </main>
      }
    >
      <ResetPasswordFormContent />
    </Suspense>
  );
}
