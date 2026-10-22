"use client";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "@/services/auth/login";
import axios from "axios";
import { toast } from "sonner";
import { SpinnerCustom } from "@/components/ui/LoadinSpinner";
import Link from "next/link";
type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const result = await login(data);
      toast.success(`Connexion réussie,Bonjour Mr,Mm :${result?.user?.name}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "un erreur en serveur !!!",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen bg-slate-50">
      {/* Image panel */}
      <section className="relative hidden w-1/2 lg:block">
        <Image
          src="/LoginBg.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
        <p className="absolute bottom-10 left-10 right-10 max-w-md text-2xl font-semibold leading-snug text-white">
          Content de vous revoir. Reprenez là où vous vous êtes arrêté.
        </p>
      </section>

      {/* Form panel */}
      <section className="flex w-full items-center justify-center px-6 py-12 sm:px-12 lg:w-1/2">
        <div className="w-full bg-white p-8 sm:p-10">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Connexion
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Entrez vos identifiants pour accéder à votre compte.
            </p>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                autoComplete="email"
                placeholder="votreemail@exemple.com"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder-slate-400 transition focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/15"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-3.5 pr-11 text-slate-900 placeholder-slate-400 transition focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-3 text-slate-400 transition hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label
                htmlFor="remember"
                className="flex cursor-pointer items-center gap-2 text-slate-600"
              >
                <input
                  type="checkbox"
                  id="remember"
                  {...register("remember", {
                    required: "Vous devez cocher cette case.",
                  })}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-600/30 focus:ring-offset-0"
                />
                Se souvenir de moi
              </label>

              <Link
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            {errors?.remember && (
              <p className="mt-1 text-sm text-red-600">
                {errors.remember.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 active:bg-blue-800"
            >
              {loading ? <SpinnerCustom /> : "Se connecter"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Pas encore de compte ?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
