import { prisma } from "@/lib/prisma";

export type LivePinnedProduct = {
  pin_id: string;
  look_number: number | null;
  pinned_at: string;
  product: {
    id: string;
    name: string;
    sku: string;
    price_cents: number;
    currency: string;
    status: string;
    inventory: number | null;
    image_urls: string[];
    external_url: string | null;
    brand: { id: string; name: string; slug: string };
  };
};

export type LiveShow = {
  id: string;
  title: string;
  subtitle: string | null;
  status: string;
  starts_at: string;
  live_input_id: string;
  segments: {
    id: string;
    order: number;
    starts_at: string;
    duration_s: number;
    brand: { id: string; name: string; slug: string };
  }[];
} | null;

export type LiveState = {
  show: LiveShow;
  pinned: LivePinnedProduct[];
  next_show: { title: string; starts_at: string } | null;
};

export async function getActiveShow() {
  return prisma.show.findFirst({
    where: { status: "LIVE" },
    orderBy: { starts_at: "desc" },
  });
}

export async function getLiveState(): Promise<LiveState> {
  const [show, nextShow] = await Promise.all([
    prisma.show.findFirst({
      where: { status: "LIVE" },
      orderBy: { starts_at: "desc" },
      include: {
        segments: {
          orderBy: { order: "asc" },
          include: { brand: true },
        },
      },
    }),
    prisma.show.findFirst({
      where: { status: "SCHEDULED", starts_at: { gte: new Date() } },
      orderBy: { starts_at: "asc" },
    }),
  ]);

  const pinned = show
    ? await prisma.pinnedProduct.findMany({
        where: { show_id: show.id, unpinned_at: null },
        orderBy: { pinned_at: "desc" },
        include: {
          product: { include: { brand: true } },
        },
      })
    : [];

  return {
    show: show
      ? {
          id: show.id,
          title: show.title,
          subtitle: show.subtitle,
          status: show.status,
          starts_at: show.starts_at.toISOString(),
          live_input_id: show.live_input_id,
          segments: show.segments.map((s) => ({
            id: s.id,
            order: s.order,
            starts_at: s.starts_at.toISOString(),
            duration_s: s.duration_s,
            brand: { id: s.brand.id, name: s.brand.name, slug: s.brand.slug },
          })),
        }
      : null,
    pinned: pinned.map((p) => ({
      pin_id: p.id,
      look_number: p.look_number,
      pinned_at: p.pinned_at.toISOString(),
      product: {
        id: p.product.id,
        name: p.product.name,
        sku: p.product.sku,
        price_cents: p.product.price_cents,
        currency: p.product.currency,
        status: p.product.status,
        inventory: p.product.inventory,
        image_urls: p.product.image_urls,
        external_url: p.product.external_url,
        brand: {
          id: p.product.brand.id,
          name: p.product.brand.name,
          slug: p.product.brand.slug,
        },
      },
    })),
    next_show: nextShow
      ? { title: nextShow.title, starts_at: nextShow.starts_at.toISOString() }
      : null,
  };
}

export function liveStateVersion(state: LiveState): string {
  const showKey = state.show ? `${state.show.id}:${state.show.status}` : "off";
  const pins = state.pinned
    .map((p) => `${p.pin_id}:${p.product.status}:${p.product.inventory ?? "*"}`)
    .join(",");
  return `${showKey}|${pins}`;
}
