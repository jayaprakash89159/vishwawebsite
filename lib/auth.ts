import { cookies } from "next/headers";
import crypto from "crypto";
import { getUserBySession } from "@/lib/db";

export const SESSION_COOKIE = "vishwa_admin_session";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionToken) {
    return null;
  }

  const user = getUserBySession(sessionToken);
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}
