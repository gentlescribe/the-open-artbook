import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Starfield } from "@/components/portfolio/Starfield";
import { BioSection } from "@/components/portfolio/BioSection";
import { ArtBook } from "@/components/portfolio/ArtBook";
import { Bookshelf } from "@/components/portfolio/Bookshelf";
import { ContactLinks, LetterForm } from "@/components/portfolio/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Starrspawn — Writer, Poet & Digital Artist" },
      {
        name: "description",
        content: "Portfolio of Starrspawn (Muyideen Adekunle Alatise), award-winning writer, poet and digital artist — artworks, books and letters.",
      },
      { property: "og:title", content: "Starrspawn — Writer, Poet & Digital Artist" },
      { property: "og:description", content: "Flip through Starrspawn's art book, pull a book off his shelf, or write him a letter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 py-20 lg:gap-12">
      <header className="text-center">
        <p className="font-serif text-xs uppercase tracking-[0.5em] text-muted-foreground">Section {num}</p>
        <h2 className="mt-2 font-display text-4xl italic text-foreground lg:text-6xl">{title}</h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-gold" aria-hidden>
          <span className="h-px w-10 bg-gold/50" />✦<span className="h-px w-10 bg-gold/50" />
        </div>
      </header>
      {children}
    </section>
  );
}

function Index() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Starfield />
      <main className="hide-scrollbar relative z-10 h-dvh overflow-y-scroll overscroll-none">
        <BioSection onNext={() => scrollTo("artbook")} />
        <Section id="artbook" num="II" title="The Artbook">
          <ArtBook />
        </Section>
        <Section id="shelf" num="III" title="The Bookshelf">
          <Bookshelf />
        </Section>
        <Section id="contact" num="IV" title="Find Me">
          <ContactLinks />
          <div className="mt-10 w-full">
            <h3 className="mb-6 text-center font-display text-2xl italic text-foreground/90 lg:text-3xl">Or write me a letter</h3>
            <LetterForm />
          </div>
        </Section>
        <footer className="pb-10 text-center font-serif text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Starrspawn · 2026
        </footer>
      </main>
    </>
  );
}
