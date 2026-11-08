import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ARTWORKS, ARTWORKS_VOL2, CONTACT_EMAIL, type Artwork } from "./content";

const FLIP_MS = 1000;

function ArtPage({ art, side, pageNo, onView }: { art: Artwork; side: "front" | "back"; pageNo: number; onView: (a: Artwork) => void }) {
  return (
    <div
      className={`parchment relative flex h-full w-full flex-col px-[9%] pb-[7%] pt-[8%] ${
        side === "front" ? "spine-shade-left" : "spine-shade-right"
      }`}
    >
      <p className="text-center font-serif text-[0.6rem] uppercase tracking-[0.35em] text-ink-faded">
        Plate {art.plate}
      </p>
      <figure className="mt-[6%] flex min-h-0 flex-1 flex-col">
        <button
          type="button"
          aria-label={`View ${art.title} up close`}
          onClick={(e) => {
            e.stopPropagation();
            onView(art);
          }}
          className="group min-h-0 flex-1 cursor-zoom-in overflow-hidden rounded-[2px] bg-parchment-deep p-[4%] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--ink)_15%,transparent)]">
          <img
            src={art.src}
            alt={art.title}
            width={1920}
            height={1920}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
        <figcaption className="mt-[6%] text-center">
          <span className="block font-display text-[clamp(0.7rem,1.1vw,0.95rem)] italic text-ink">
            {art.title}
          </span>
          <span className="mt-0.5 block font-serif text-[0.6rem] leading-tight tracking-wide text-ink-faded">
            {art.medium}
          </span>
        </figcaption>
      </figure>
      <span
        className={`absolute bottom-[3%] font-serif text-[0.55rem] text-ink-faded ${
          side === "front" ? "right-[7%]" : "left-[7%]"
        }`}
      >
        {pageNo}
      </span>
    </div>
  );
}

function Cover({ volume }: { volume: string }) {
  return (
    <div className="velvet-cover relative flex h-full w-full flex-col items-center justify-center rounded-r-md p-[10%] text-center">
      <div className="absolute inset-[6%] rounded-sm border border-gold/50" />
      <div className="absolute inset-[8%] rounded-sm border border-gold/20" />
      <span className="text-lg text-gold">✦</span>
      <h3 className="mt-4 font-display text-[clamp(1.4rem,2.6vw,2.25rem)] italic leading-tight text-gold">
        Sketchbook
      </h3>
      <p className="mt-4 font-serif text-xs tracking-[0.3em] text-gold/70">{volume}</p>
      <span className="absolute inset-y-0 left-0 w-[6%] bg-linear-to-r from-cover-deep to-transparent" />
    </div>
  );
}

function BackCover() {
  return (
    <div className="velvet-cover relative flex h-full w-full flex-col items-center justify-end rounded-l-md p-[12%] text-center">
      <div className="absolute inset-[6%] rounded-sm border border-gold/30" />
      <span className="font-serif text-[0.6rem] uppercase tracking-[0.4em] text-gold/70">
        Starrspawn
      </span>
      <span className="absolute inset-y-0 right-0 w-[6%] bg-linear-to-l from-cover-deep to-transparent" />
    </div>
  );
}

function ExLibris({ artworks }: { artworks: Artwork[] }) {
  return (
    <div className="parchment spine-shade-right relative flex h-full w-full flex-col items-center px-[12%] pb-[8%] pt-[10%] text-center">
      <p className="font-serif text-[0.6rem] uppercase tracking-[0.45em] text-ink-faded">Ex Libris</p>
      <p className="mt-3 font-display text-[clamp(1rem,1.8vw,1.5rem)] italic text-ink">Starrspawn</p>
      <span className="my-3 text-xs text-ink-faded">✦</span>
      <ol
        className="hide-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain font-serif text-[clamp(0.65rem,0.95vw,0.85rem)] text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {artworks.map((a) => (
          <li key={a.plate} className="flex gap-3">
            <span className="text-ink-faded">{a.plate}.</span>
            <span className="italic">{a.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Colophon() {
  return (
    <div className="parchment spine-shade-left relative flex h-full w-full flex-col items-center justify-center p-[12%] text-center">
      <p className="font-display text-[clamp(1.4rem,2.4vw,2rem)] italic text-ink">Fin.</p>
      <span className="my-4 text-xs text-ink-faded">✦</span>
      <p className="font-serif text-[clamp(0.7rem,1vw,0.9rem)] leading-relaxed text-ink-faded">
        Originals &amp; commissions
        <br />
        <a href={`mailto:${CONTACT_EMAIL}`} onClick={(e) => e.stopPropagation()} className="underline-offset-2 hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}

type Leaf = { front: ReactNode; back: ReactNode };

function buildLeaves(artworks: Artwork[], volume: string, onView: (a: Artwork) => void): Leaf[] {
  const artLeaves: Leaf[] = [];
  for (let i = 0; i < artworks.length; i += 2) {
    const front = artworks[i];
    if (!front) continue;
    const back = artworks[i + 1];
    artLeaves.push({
      front: <ArtPage art={front} side="front" pageNo={i + 3} onView={onView} />,
      back: back ? <ArtPage art={back} side="back" pageNo={i + 4} onView={onView} /> : <div className="parchment spine-shade-right h-full w-full" />,
    });
  }
  return [{ front: <Cover volume={volume} />, back: <ExLibris artworks={artworks} /> }, ...artLeaves, { front: <Colophon />, back: <BackCover /> }];
}


export function ArtBook({ artworks, volume }: { artworks: Artwork[]; volume: string }) {
  const [viewing, setViewing] = useState<Artwork | null>(null);
  const LEAVES = useMemo(() => buildLeaves(artworks, volume, setViewing), [artworks, volume]);
  const [current, setCurrent] = useState(0); // number of flipped leaves
  const [flipping, setFlipping] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = LEAVES.length;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const go = (dir: 1 | -1) => {
    const next = current + dir;
    if (next < 0 || next > total) return;
    const leafIndex = dir === 1 ? current : current - 1;
    setFlipping(leafIndex);
    setCurrent(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlipping(null), FLIP_MS);
  };

  // Center the closed book (front or back cover) instead of leaving half the spread empty.
  const shift = current === 0 ? "-25%" : current === total ? "25%" : "0%";
  const label =
    current === 0 ? "Cover" : current === total ? "Back cover" : `Spread ${current} of ${total - 1}`;

  return (
    <div className="flex flex-col items-center gap-3 lg:gap-5">
      <div className="book-scene" style={{ width: "calc(var(--page-w) * 2)", height: "var(--page-h)" }}>
        <div
          className="relative h-full w-full"
          style={{ transform: `translateX(${shift})`, transition: `transform ${FLIP_MS}ms var(--ease-page)` }}
        >
          {LEAVES.map((leaf, i) => {
            const flipped = i < current;
            const z = i === flipping ? 50 : flipped ? i + 1 : total - i;
            return (
              <div
                key={i}
                className="book-leaf absolute left-1/2 top-0 h-full"
                style={{
                  width: "var(--page-w)",
                  zIndex: z,
                  transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                }}
              >
                <div
                  onClick={() => go(1)}
                  className={`leaf-face absolute inset-0 cursor-pointer overflow-hidden rounded-r-md ${i === current ? "shadow-[var(--shadow-paper)]" : ""}`}
                >
                  {leaf.front}
                </div>
                <div
                  onClick={() => go(-1)}
                  className={`leaf-face leaf-back absolute inset-0 cursor-pointer overflow-hidden rounded-l-md ${i === current - 1 ? "shadow-[var(--shadow-paper)]" : ""}`}
                >
                  {leaf.back}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-4 font-serif text-foreground/80">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={current === 0}
          className="flex items-center gap-1 rounded-full border border-border px-4 py-1.5 text-sm tracking-wide transition-colors hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} /> Back
        </button>
        <span className="min-w-[7.5rem] text-center text-xs uppercase tracking-[0.3em] text-muted-foreground" aria-live="polite">
          {label}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={current === total}
          className="flex items-center gap-1 rounded-full border border-border px-4 py-1.5 text-sm tracking-wide transition-colors hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30"
        >
          Next <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
      <p className="font-serif text-xs italic text-muted-foreground">Tap any painting to see it up close</p>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-h-[95dvh] w-[95vw] max-w-5xl border-gold/30 bg-card p-4 sm:p-6">
          {viewing && (
            <>
              <img src={viewing.src} alt={viewing.title} className="max-h-[78dvh] w-full rounded-sm object-contain" />
              <div className="text-center">
                <DialogTitle className="font-display text-2xl italic text-gold">{viewing.title}</DialogTitle>
                <DialogDescription className="font-serif text-sm">Plate {viewing.plate} · {viewing.medium}</DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ClosedBook({ volume, onOpen }: { volume: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open Sketchbook ${volume}`}
      className="shelf-book cursor-pointer"
    >
      <div className="shelf-book-inner velvet-cover relative flex h-44 w-32 flex-col items-center justify-center rounded-md border border-gold/30 p-3 text-center shadow-[var(--shadow-book)] sm:h-56 sm:w-40">
        <div className="absolute inset-[7%] rounded-sm border border-gold/40" />
        <span className="text-sm text-gold">✦</span>
        <span className="mt-2 font-display text-lg italic leading-tight text-gold sm:text-xl">Sketchbook</span>
        <span className="mt-2 font-serif text-[0.55rem] tracking-[0.3em] text-gold/70">{volume}</span>
        <span className="absolute inset-y-0 left-0 w-[8%] rounded-l-md bg-linear-to-r from-cover-deep to-transparent" />
      </div>
    </button>
  );
}

const VOLUMES = [
  { artworks: ARTWORKS, volume: "VOL. I", label: "Volume I" },
  { artworks: ARTWORKS_VOL2, volume: "VOL. II", label: "Volume II" },
];

export function ArtBookShelf() {
  const [open, setOpen] = useState<(typeof VOLUMES)[number] | null>(null);
  return (
    <>
      <div className="shelf-scene flex items-start justify-center gap-10 sm:gap-16">
        {VOLUMES.map((v) => (
          <div key={v.volume} className="flex flex-col items-center">
            <ClosedBook volume={v.volume} onOpen={() => setOpen(v)} />
            <div className="shelf-plank mt-1 w-40 sm:w-52" aria-hidden />
            <p className="mt-3 font-serif text-xs uppercase tracking-[0.4em] text-muted-foreground">{v.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center font-serif text-xs italic text-muted-foreground">
        Pick a volume off the shelf to open it
      </p>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[98dvh] w-[98vw] max-w-7xl overflow-y-auto border-gold/30 bg-background/95 p-4 sm:p-8">
          <DialogTitle className="sr-only">{open ? `Sketchbook ${open.volume}` : "Sketchbook"}</DialogTitle>
          {open && <ArtBook artworks={open.artworks} volume={open.volume} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
