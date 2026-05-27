export const liveConfig = {
  liveInputId: process.env.CF_STREAM_LIVE_INPUT_ID ?? "af6164876a3eeaaa5a564735702650ba",
  customerSubdomain:
    process.env.NEXT_PUBLIC_CF_STREAM_CUSTOMER_SUBDOMAIN ??
    "customer-pgpql92xumpqnyup.cloudflarestream.com",
};

export const simulcastDestinations = [
  {
    id: "youtube",
    name: "YouTube Live",
    handle: "@fusionfashionevents",
    url: "https://www.youtube.com/channel/UCRhjjOiRUFD6_yveJImJAnw/live",
    color: "#ff0033",
  },
  {
    id: "instagram",
    name: "Instagram Live",
    handle: "@fusionfashionevents",
    url: "https://instagram.com/fusionfashionevents",
    color: "#e1306c",
  },
  {
    id: "facebook",
    name: "Facebook Live",
    handle: "/fusionfashionevents",
    url: "https://facebook.com/fusionfashionevents",
    color: "#1877f2",
  },
  {
    id: "tiktok",
    name: "TikTok Live",
    handle: "@fusionfashionevents",
    url: "https://tiktok.com/@fusionfashionevents",
    color: "#25f4ee",
  },
] as const;

export const featuredBrands = [
  {
    slug: "tony-visions",
    name: "Tony Visions",
    tagline: "Designer eyewear by David Woods",
    href: "/brands/tony-visions",
  },
  {
    slug: "fusion-swim-week",
    name: "Fusion Swim Week",
    tagline: "Official 2026 capsule",
    href: "/brands/fusion-swim-week",
  },
  {
    slug: "model-pickleball",
    name: "Model Pickleball",
    tagline: "Court-to-runway crossover",
    href: "/brands/model-pickleball",
  },
] as const;
