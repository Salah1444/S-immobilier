"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

export type Slide = { id: number; src: string; alt: string };

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

/**
 * Slider de photos : image principale (flèches, clavier, swipe, compteur)
 * + 3 miniatures qui affichent les prochaines photos. Un clic sur une
 * miniature l'ouvre dans le slider.
 */
export default function PropertyGallery({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  if (count === 0) return null;

  const go = (i: number) => setIndex(((i % count) + count) % count);

  // Les prochaines photos après celle affichée (en boucle)
  const thumbs = Array.from({ length: Math.min(3, count - 1) }, (_, k) => (index + k + 1) % count);
  const extra = count - 4;

  return (
    <section
      aria-label="Photos du bien"
      className={`grid h-[17rem] gap-2 sm:h-[26rem] ${thumbs.length > 0 ? "sm:grid-cols-[3fr_1fr]" : ""}`}
    >
      {/* ---------- Slider ---------- */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Diaporama"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(index - 1);
          if (e.key === "ArrowRight") go(index + 1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }}
        className={`relative overflow-hidden rounded-xl bg-slate-200 ${focusRing}`}
      >
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} sur ${count}`}
              aria-hidden={i !== index}
              className="relative h-full w-full shrink-0 basis-full"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                unoptimized
                priority={i === 0}
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <span
          className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-md bg-slate-900/70 px-2.5 py-1 text-sm font-medium text-white"
          aria-live="polite"
        >
          <Images className="size-4" aria-hidden />
          {index + 1} / {count}
        </span>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Photo précédente"
              className={`absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white ${focusRing}`}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Photo suivante"
              className={`absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white ${focusRing}`}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        )}
      </div>

      {/* ---------- Miniatures ---------- */}
      {thumbs.length > 0 && (
        <div
          className="hidden gap-2 sm:grid"
          style={{ gridTemplateRows: `repeat(${thumbs.length}, minmax(0, 1fr))` }}
        >
          {thumbs.map((i, pos) => {
            const s = slides[i];
            const isLast = pos === thumbs.length - 1 && extra > 0;
            const cls = `relative overflow-hidden rounded-xl bg-slate-200 ${focusRing}`;
            const content = (
              <>
                <Image src={s.src} alt={s.alt} fill unoptimized sizes="12rem" className="object-cover" />
                {isLast && (
                  <span className="absolute inset-0 flex items-center justify-center bg-slate-900/55 text-2xl font-semibold text-white">
                    +{extra}
                  </span>
                )}
              </>
            );

            return isLast ? (
              <a key={s.id} href="#galerie" className={cls} aria-label={`Voir toutes les photos (${count})`}>
                {content}
              </a>
            ) : (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                className={cls}
                aria-label={`Afficher la photo ${i + 1}`}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}