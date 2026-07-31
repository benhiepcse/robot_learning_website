import type { NextConfig } from "next";

const isVercel = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = isVercel
  ? {
      // The primary Sites deployment uses Cloudflare bindings through vinext.
      // Vercel does not provide the `cloudflare:workers` virtual module, so its
      // native Next.js build resolves that import to a safe compatibility shim.
      turbopack: {
        resolveAlias: {
          "cloudflare:workers": "./lib/vercel-cloudflare-workers.ts",
        },
      },
      webpack(config) {
        config.resolve.alias["cloudflare:workers"] =
          new URL("./lib/vercel-cloudflare-workers.ts", import.meta.url).pathname;
        return config;
      },
    }
  : {};

export default nextConfig;
