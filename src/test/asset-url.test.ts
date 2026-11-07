import { describe, expect, it } from "vitest";
import { assetUrl } from "@/lib/asset-url";
import { ARTWORKS } from "@/components/portfolio/content";
import video from "@/assets/videos/bio-background.mp4.asset.json";

describe("Portable portfolio media", () => {
  it("resolves all 15 artworks independently of the hosting domain", () => {
    expect(ARTWORKS).toHaveLength(15);
    for (const art of ARTWORKS) {
      const url = new URL(art.src);
      expect(url.origin).toBe("https://35d2df70-4247-40b0-9966-4eea49097419.lovableproject.com");
      expect(url.pathname).toMatch(/^\/__l5e\/assets-v1\/[\w-]+\/.+\.(png|webp)$/);
    }
  });

  it("resolves the background video to the public media host", () => {
    expect(assetUrl(video)).toBe(
      "https://35d2df70-4247-40b0-9966-4eea49097419.lovableproject.com/__l5e/assets-v1/e1d957dd-3a26-4a7b-bc43-a0181084de8e/bio-background.mp4",
    );
  });

  it("preserves ordinary local and absolute URLs", () => {
    expect(assetUrl({ url: "/books/example.pdf" })).toBe("/books/example.pdf");
    expect(assetUrl({ url: "https://example.com/painting.webp" })).toBe("https://example.com/painting.webp");
  });
});