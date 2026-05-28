/**
 * Seed sponsors from the Model Pickleball Tour 2026 as Brand entities.
 *
 * Each sponsor's local PNG logo is uploaded to Vercel Blob and the brand
 * row is created with the resulting URL + the brand's real website.
 * Idempotent: re-runs upsert by slug.
 *
 * Run: source .env.local && npm run db:seed:sponsors
 */
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const prisma = new PrismaClient();

const LOGOS_DIR = "/Users/sirakstudios/topos/fusion-fashion-events/landing-pages/model-pickleball/assets/sponsors";

type SponsorSeed = {
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  logo_file: string;
  website: string;
  instagram?: string;
};

const SPONSORS: SponsorSeed[] = [
  {
    slug: "casamigos",
    name: "Casamigos",
    tagline: "Premium tequila and mezcal. Crafted to drink with friends.",
    bio:
      "Casamigos was born in 2013 from a group of friends — George Clooney, Rande Gerber, and Mike Meldman — who set out to create a tequila smooth enough to drink all day, all night. Featured at Model Pickleball Tour 2026.",
    logo_file: "casamigos.png",
    website: "https://www.casamigos.com",
    instagram: "@casamigos",
  },
  {
    slug: "selkirk",
    name: "Selkirk Sport",
    tagline: "Premium pickleball paddles and gear, made in the USA.",
    bio:
      "Selkirk Sport is a family-owned pickleball brand based in Hayden, Idaho. Selkirk paddles power players from beginners to world champions. Equipment partner of the Model Pickleball Tour 2026.",
    logo_file: "selkirk.png",
    website: "https://www.selkirk.com",
    instagram: "@selkirksport",
  },
  {
    slug: "life-time",
    name: "Life Time",
    tagline: "The Healthy Way of Life Company. Athletic country clubs.",
    bio:
      "Life Time operates more than 175 athletic country clubs across North America, plus a growing pickleball footprint that hosted Model Pickleball stops in 2026.",
    logo_file: "life-time.png",
    website: "https://www.lifetime.life",
    instagram: "@lifetime.life",
  },
  {
    slug: "lifeway",
    name: "Lifeway Foods",
    tagline: "Probiotic kefir. Cultured wellness since 1986.",
    bio:
      "Lifeway is the leading US producer of kefir and other probiotic dairy products. Wellness partner of the Model Pickleball Tour 2026, supplying recovery hydration to players and guests.",
    logo_file: "lifeway.png",
    website: "https://lifewayfoods.com",
    instagram: "@lifewayfoods",
  },
  {
    slug: "sip-and-pickle",
    name: "Sip & Pickle",
    tagline: "Pickleball meets cocktail culture.",
    bio:
      "Sip & Pickle builds social pickleball nights that blend competitive play, music, and a curated cocktail program. Activation partner across Model Pickleball Tour 2026.",
    logo_file: "sip-and-pickle-white.png",
    website: "https://www.sipandpickle.com",
    instagram: "@sipandpickle",
  },
  {
    slug: "calabasas-pickleball-club",
    name: "Calabasas Pickleball Club",
    tagline: "Private courts. Public energy. Calabasas, California.",
    bio:
      "Calabasas Pickleball Club hosts the West Coast stop of the Model Pickleball Tour 2026 — eight pristine courts, full hospitality, and a backdrop the cameras love.",
    logo_file: "calabasas-pickleball-club.png",
    website: "https://www.calabasaspickleballclub.com",
    instagram: "@calabasaspickleballclub",
  },
  {
    slug: "wynwood-marketplace",
    name: "Wynwood Marketplace",
    tagline: "Miami's outdoor culture hub for music, food, and fashion.",
    bio:
      "Wynwood Marketplace is the heart of Miami's arts district — host venue for the Model Pickleball Tour 2026 East Coast stop and a year-round home for fashion, music, and food experiences.",
    logo_file: "wynwood-marketplace.png",
    website: "https://www.wynwoodmarketplace.com",
    instagram: "@wynwoodmarketplace",
  },
];

async function uploadLogo(slug: string, file: string): Promise<string> {
  const buf = await readFile(join(LOGOS_DIR, file));
  const blob = await put(`brands/logo/${slug}-${Date.now()}.png`, buf, {
    access: "public",
    contentType: "image/png",
  });
  return blob.url;
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN required. Source .env.local before running.");
  }

  for (const s of SPONSORS) {
    const existing = await prisma.brand.findUnique({ where: { slug: s.slug } });

    let logoUrl = existing?.logo ?? null;
    if (!logoUrl) {
      console.log(`Uploading logo for ${s.name}...`);
      logoUrl = await uploadLogo(s.slug, s.logo_file);
    }

    await prisma.brand.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        tagline: s.tagline,
        bio: s.bio,
        logo: logoUrl,
        website: s.website,
        instagram: s.instagram ?? null,
      },
      create: {
        slug: s.slug,
        name: s.name,
        tagline: s.tagline,
        bio: s.bio,
        logo: logoUrl,
        website: s.website,
        instagram: s.instagram ?? null,
      },
    });

    console.log(`  ✓ ${s.name}`);
  }

  const total = await prisma.brand.count();
  console.log(`\nDone. ${total} total brands in DB.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
