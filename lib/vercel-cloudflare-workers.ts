/**
 * Compatibility shim for native Next.js builds on Vercel.
 *
 * D1 and R2 are available in the primary Cloudflare/Sites deployment only.
 * Keeping an empty binding object lets the public learning interface run on
 * Vercel while collaboration APIs report that their backing services are
 * unavailable instead of breaking the entire build.
 */
export const env: Record<string, never> = {};
