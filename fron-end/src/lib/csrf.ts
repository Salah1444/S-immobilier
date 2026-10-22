import axios from "axios";

const csrfApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

export async function getCsrfCookie(): Promise<void> {
  await csrfApi.get("/sanctum/csrf-cookie");
  
}