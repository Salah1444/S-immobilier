
import Api from "@/lib/axios";
import { getCsrfCookie } from "@/lib/csrf";
import {
  type LoginRequest,
  type LoginResponse,
} from "@/types/loginTypes";

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  await getCsrfCookie();

  const response = await Api.post<LoginResponse>("/login", data);

  return response.data;
}
