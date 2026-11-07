// External hosts do not serve Lovable's /__l5e asset endpoint.
// Keep the original pointers intact and resolve their paths against the
// project's public asset-serving origin, independently of the page's host.
const ASSET_ORIGIN = "https://35d2df70-4247-40b0-9966-4eea49097419.lovableproject.com";

export function assetUrl(asset: { url: string }): string {
  return asset.url.startsWith("/__l5e/assets-v1/")
    ? new URL(asset.url, ASSET_ORIGIN).href
    : asset.url;
}