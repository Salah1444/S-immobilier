export default function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
      <span className="h-px w-6 bg-blue-600" aria-hidden />
      {children}
    </p>
  );
}