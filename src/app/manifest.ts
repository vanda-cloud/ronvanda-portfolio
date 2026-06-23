import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ron Vanda — Full-Stack Engineer",
    short_name: "Ron Vanda",
    description:
      "Portfolio of Ron Vanda — full-stack engineer across Flutter, Next.js, ASP.NET, Docker, AWS, and DevSecOps.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c10",
    theme_color: "#818cf8",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/icon-72.png",            sizes: "72x72",   type: "image/png" },
      { src: "/icons/icon-96.png",            sizes: "96x96",   type: "image/png" },
      { src: "/icons/icon-128.png",           sizes: "128x128", type: "image/png" },
      { src: "/icons/icon-144.png",           sizes: "144x144", type: "image/png" },
      { src: "/icons/icon-192.png",           sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-384.png",           sizes: "384x384", type: "image/png" },
      { src: "/icons/icon-512.png",           sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-192-maskable.png",  sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-512-maskable.png",  sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
