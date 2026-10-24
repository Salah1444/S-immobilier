import Api from "@/lib/axios";
import type { PropertyCardData } from "@/components/propeties/propertyCard";

export type TransactionType = "vendre" | "louer";

type Envelope = { data?: unknown; properties?: unknown };

// Retrouve le tableau de biens, quelle que soit l'enveloppe de la réponse Laravel :
// [...]  |  { data: [...] }  |  { data: { data: [...] } }  |  { properties: [...] } …
function findList(value: unknown): unknown[] | undefined {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const { data, properties } = value as Envelope;
    return findList(data) ?? findList(properties);
  }
  return undefined;
}

/** À appeler côté serveur (pages Next). Lance une erreur → error.tsx. */
export async function getProperties(
  transactionType: TransactionType
): Promise<PropertyCardData[]> {
  const { data } = await Api.get("/properties", {
    params: { transaction_type: transactionType },
  });

  const list = findList(data);
  if (!list) throw new Error("Format de réponse inattendu pour GET /properties.");

  // Si Laravel ignore le paramètre, on réapplique le filtre ici.
  return (list as PropertyCardData[]).filter(
    (property) => property.transaction_type === transactionType
  );
}