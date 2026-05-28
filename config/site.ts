export const siteConfig = {
  name: "Fusion Fashion Events",
  shortName: "Fusion",
  description:
    "Miami's premier fashion event platform — runway shows, Swim Week, model casting, and designer showcases.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fusionfashionevents.com",
  ogImage: "/og-image.png",
  contact: {
    email: "info@fusionfashionevents.com",
    instagram: "https://instagram.com/fusionfashionevents",
    facebook: "https://facebook.com/fusionfashionevents",
    youtube: "https://www.youtube.com/channel/UCRhjjOiRUFD6_yveJImJAnw",
  },
  nav: [
    { label: "Live", href: "/live" },
    { label: "Brands", href: "/brands" },
    { label: "Events", href: "/events" },
    { label: "Swim Week", href: "/swim-week" },
    { label: "Register", href: "/register" },
    { label: "Gallery", href: "/gallery" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "About", href: "/about" },
    { label: "Press", href: "/press" },
  ],
};
