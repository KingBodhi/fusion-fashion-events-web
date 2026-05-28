"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { JWT_COOKIE, JWT_MAX_AGE_S, signSessionToken, verifyPassword } from "@/lib/auth";

export type LoginState = { error?: string } | null;

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return { error: "Invalid credentials." };
  }

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { last_login_at: new Date() },
  });

  const token = await signSessionToken({
    sub: user.id,
    role: user.role,
    brand_id: user.brand_id,
  });

  (await cookies()).set(JWT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: JWT_MAX_AGE_S,
  });

  redirect("/admin");
}

export async function logoutAction() {
  (await cookies()).delete(JWT_COOKIE);
  redirect("/admin/login");
}
