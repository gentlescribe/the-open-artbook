import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { STARRSTREAM_BIO } from "./starrstream";

const Globe = lazy(() => import("./StarrstreamGlobe"));

export function StarrstreamSection() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "200px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="starrstream" className="relative flex flex-col items-center px-4 pb-20 pt-20 text-center lg:pt-28">
      <header>
        <p className="font-serif text-xs uppercase tracking-[0.5em] text-muted-foreground">Section IV</p>
        <h2 className="mt-2 font-display text-4xl italic text-foreground lg:text-6xl">The Starrstream</h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-gold" aria-hidden>
          <span className="h-px w-10 bg-gold/50" />✦<span className="h-px w-10 bg-gold/50" />
        </div>
      </header>
      <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-foreground/75 md:text-2xl">{STARRSTREAM_BIO}</p>
      <div ref={host} data-scene-ready={ready || undefined} className="starrstream-globe relative mt-16 w-full max-w-5xl cursor-grab active:cursor-grabbing" role="button" tabIndex={0} aria-label="Explore The Starrstream globe" onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOpen(true); } }}>
        {visible && <Suspense fallback={<div className="flex h-full items-center justify-center text-gold"><Globe2 className="h-10 w-10 animate-pulse" /></div>}><Globe onSelect={() => setOpen(true)} onReady={() => setReady(true)} /></Suspense>}
      </div>
      <Button variant="link" onClick={() => setOpen(true)} className="mt-4 font-serif text-lg">The Starrstream <ArrowUpRight /></Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm rounded-md text-center">
          <DialogTitle className="font-display text-3xl italic">The Starrstream</DialogTitle>
          <DialogDescription className="font-serif text-lg">A universe by Starrspawn.</DialogDescription>
          <Button asChild className="mt-3"><Link to="/starrstream">Enter The Starrstream <ArrowUpRight /></Link></Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}