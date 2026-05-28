import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD before running seed."
    );
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin ${email} already exists. Skipping.`);
    return;
  }

  const user = await prisma.adminUser.create({
    data: {
      email,
      password_hash: await hash(password, 10),
      role: "OWNER",
      display_name: process.env.ADMIN_BOOTSTRAP_NAME ?? null,
    },
  });

  console.log(`Created OWNER admin user: ${user.email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
