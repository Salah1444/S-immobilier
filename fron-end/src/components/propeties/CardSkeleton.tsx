
import { Skeleton } from "@/components/ui/skeleton";

export default  function PropertyFormSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border bg-white p-6 shadow-sm space-y-6">
      {/* En-tête */}
      

      {/* Image du bien */}
      <Skeleton className="h-48 w-full rounded-lg" />

      {/* Champs du formulaire */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-28" />
            
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24 rounded-md" />
        
      </div>
    </div>
  );
}
