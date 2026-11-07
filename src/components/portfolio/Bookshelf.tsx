import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { BOOKS, type ShelfBook } from "./books";

const coverBg = (h: number) =>
  `linear-gradient(135deg, oklch(0.36 0.1 ${h}), oklch(0.2 0.08 ${h}))`;

function Spine({ book, onOpen }: { book: ShelfBook; onOpen: () => void }) {
  const w = `calc(var(--spine-w) * ${book.thick})`;
  const h = `calc(var(--spine-h) * ${book.tall})`;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open book"
      className="shelf-book group relative self-end focus-visible:outline-none"
      style={{ width: w, height: h }}
    >
      <span className="shelf-book-inner absolute inset-0">
        {/* spine */}
        <span
          className="absolute inset-0 flex flex-col items-center justify-between rounded-[3px] py-4 shadow-[var(--shadow-book)] ring-1 ring-gold/20 group-focus-visible:ring-2 group-focus-visible:ring-ring"
          style={{ background: coverBg(book.hue) }}
        >
          <span className="h-px w-3/5 bg-gold/60" />
          <span className="text-sm text-gold">✦</span>
          <span className="h-px w-3/5 bg-gold/40" />
        </span>
        {/* top of pages */}
        <span className="parchment absolute inset-x-[4%] top-0 h-[var(--spine-d)] origin-top -translate-y-full [transform:rotateX(90deg)]" />
      </span>
    </button>
  );
}

function OpenBook({ book, onClose }: { book: ShelfBook; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Open book"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <button type="button" onClick={onClose} aria-label="Close book" className="absolute right-5 top-5 rounded-full border border-border p-2 text-foreground/80 hover:border-gold hover:text-gold">
        <X className="h-5 w-5" />
      </button>
      <div className="book-scene" onClick={(e) => e.stopPropagation()}>
        <div
          className="relative transition-transform duration-1000 ease-[var(--ease-page)]"
          style={{ width: "var(--open-w)", height: "var(--open-h)", transform: open ? "translateX(50%)" : "translateX(0)" }}
        >
          {/* inside right page */}
          <div className="parchment spine-shade-left absolute inset-0 flex flex-col items-center justify-center rounded-r-md p-[10%] text-center shadow-[var(--shadow-book)]">
            <span className="text-xs text-ink-faded">✦</span>
            {book.pdf ? (
              <a
                href={book.pdf}
                download
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 font-serif text-sm tracking-wide text-parchment transition-opacity hover:opacity-85"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            ) : (
              <p className="mt-6 rounded-full border border-ink/30 px-4 py-1.5 font-serif text-sm italic text-ink-faded">PDF coming soon</p>
            )}
          </div>
          {/* cover, hinged on the left */}
          <div
            className="book-leaf absolute inset-0"
            style={{ transform: open ? "rotateY(-180deg)" : "rotateY(0deg)" }}
          >
            <div className="leaf-face absolute inset-0 flex flex-col items-center justify-center rounded-r-md p-[10%] text-center shadow-[var(--shadow-book)]" style={{ background: coverBg(book.hue) }}>
              <div className="absolute inset-[6%] rounded-sm border border-gold/50" />
              <span className="text-lg text-gold">✦</span>
              <p className="mt-3 font-serif text-xs uppercase tracking-[0.35em] text-gold/70">Starrspawn</p>
            </div>
            <div className="leaf-face leaf-back parchment spine-shade-right absolute inset-0 flex items-center justify-center rounded-l-md p-[12%] text-center">
              <p className="font-serif text-[0.65rem] uppercase tracking-[0.45em] text-ink-faded">Ex Libris<br /><span className="mt-2 block font-display text-lg normal-case tracking-normal italic text-ink">Starrspawn</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Bookshelf() {
  const [openId, setOpenId] = useState<string | null>(null);
  const book = BOOKS.find((b) => b.id === openId);
  return (
    <div className="w-full max-w-3xl">
      <div className="shelf-scene relative px-[6%] pt-6">
        <div className="flex items-end justify-center gap-[clamp(0.4rem,1.5vw,1rem)]">
          {BOOKS.map((b) => (
            <Spine key={b.id} book={b} onOpen={() => setOpenId(b.id)} />
          ))}
        </div>
        <div className="shelf-plank" />
      </div>
      <p className="mt-6 text-center font-serif text-xs italic text-muted-foreground">Pick a book off the shelf to open it</p>
      {book && <OpenBook book={book} onClose={() => setOpenId(null)} />}
    </div>
  );
}
