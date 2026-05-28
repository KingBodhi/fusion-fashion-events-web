import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const secretSource = process.env.JWT_SECRET;
if (!secretSource && process.env.NODE_ENV !== "development") {
  throw new Error("JWT_SECRET is required");
}
const JWT_SECRET = new TextEncoder().encode(secretSource ?? "dev-only-jwt-secret-do-not-use-in-prod");

export const JWT_COOKIE = "ffe_admin_session";
export const JWT_MAX_AGE_S = 60 * 60 * 24 * 7;

export type SessionPayload = {
  sub: string;
  role: "OWNER" | "OPERATOR" | "DESIGNER";
  brand_id: string | null;
};

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${JWT_MAX_AGE_S}s`)
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (typeof payload.sub !== "string") return null;
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
