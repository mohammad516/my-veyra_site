import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "veyra_admin";

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "veyra-admin-2026";
}

// Token is a hash of the password so the raw password is never stored in the cookie
export function adminToken(): string {
  return createHash("sha256").update(`veyra-admin:${getAdminPassword()}`).digest("hex");
}

export function verifyPassword(password: string): boolean {
  return password === getAdminPassword();
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminToken();
}
