import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Starfield } from "@/components/portfolio/Starfield";
import { STARRSTREAM_BIO } from "@/components/portfolio/starrstream";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/starrstream")({
  head: () => ({ meta: [
    { title: "The Starrstream — Starrspawn's Creative Universe" },
    { name: "description", content: STARRSTREAM_BIO },
    { property: "og:title", content: "The Starrstream — Starrspawn's Creative Universe" },
    { property: "og:description", content: STARRSTREAM_BIO },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: StarrstreamPage,
});

function StarrstreamPage() {
  return <>
    <Starfield />
    <main className="relative z-10 h-dvh overflow-y-auto px-6 py-8 md:px-12">
      <Button asChild variant="ghost" className="font-serif text-base"><Link to="/"><ArrowLeft />Starrspawn</Link></Button>
      <article className="mx-auto max-w-3xl pb-24 pt-20 md:pt-32">
        <p className="text-center font-serif text-xs uppercase tracking-[0.4em] text-gold">A universe by Starrspawn</p>
        <h1 className="mt-6 text-center font-display text-5xl italic leading-tight md:text-7xl">The Starrstream</h1>
        <p className="mt-12 font-serif text-xl leading-relaxed text-foreground/80 md:text-2xl">{STARRSTREAM_BIO}</p>
        <div className="mt-16 border-t border-gold/25 pt-8">
          <h2 className="font-display text-3xl italic">Inside the universe</h2>
          <p className="mt-5 font-serif text-lg text-muted-foreground">More about the worlds and fictional works of The Starrstream is coming soon.</p>
        </div>
      </article>
    </main>
  </>;
}