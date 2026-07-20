import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

/**
 * Every non-internal IPv4 address this machine currently has.
 *
 * Next.js blocks cross-origin dev requests by default, which silently stops
 * the JavaScript bundle from loading on any other device — the page renders
 * but nothing interactive works, and scroll-reveal sections stay blank.
 *
 * Hardcoding the LAN IP works until DHCP hands out a different one, which is
 * exactly what happened here (192.168.1.226 → 192.168.0.151). Reading the
 * interfaces at startup means it just keeps working after a router reboot or
 * a move to a different network.
 *
 * Development only — allowedDevOrigins has no effect on a production build.
 */
function localAddresses(): string[] {
  return Object.values(networkInterfaces())
    .flat()
    .filter((iface) => iface && iface.family === "IPv4" && !iface.internal)
    .map((iface) => iface!.address);
}

const nextConfig: NextConfig = {
  // Only relevant to `next dev`; skip the interface lookup entirely in
  // production builds (Vercel etc.) so nothing runs that doesn't need to.
  ...(process.env.NODE_ENV === "development"
    ? { allowedDevOrigins: localAddresses() }
    : {}),
};

export default nextConfig;
