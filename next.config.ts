import type { NextConfig } from "next";

/**
 * Deux modes de build :
 *  - Par défaut (sandbox / Vercel) : `standalone`.
 *  - PAGES_EXPORT=1 : export statique pour GitHub Pages.
 *    Le site est servi depuis https://ivandjeapro-gif.github.io/Weeding/
 *    d'où le basePath /Weeding.
 */
const isPagesExport = process.env.PAGES_EXPORT === "1";

const nextConfig: NextConfig = isPagesExport
  ? {
      output: "export",
      basePath: "/Weeding",
      assetPrefix: "/Weeding",
      trailingSlash: true,
      images: { unoptimized: true },
      // Dossier de build isolé pour ne jamais entrer en conflit avec le serveur dev
      distDir: ".next-pages",
      typescript: {
        ignoreBuildErrors: true,
      },
      reactStrictMode: false,
    }
  : {
      output: "standalone",
      typescript: {
        ignoreBuildErrors: true,
      },
      reactStrictMode: false,
    };

export default nextConfig;
