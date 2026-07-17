import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, THEME_COLOR } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "ASKHAN",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: THEME_COLOR,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/Logos/ASKHAN_LOGO.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Logos/ASKHAN_LOGO.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
