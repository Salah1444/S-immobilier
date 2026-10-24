import { cache } from "react";
import Api from "@/lib/axios";
import { type Agence } from "@/types/agencyTypes";
export const getAgency = cache(async (): Promise<Agence> => {
  try {
    const { data } = await Api.get("/agency");
    return data?.data ?? data; 
  } catch (err) {
    console.error(err); 
    throw err;
  }
});