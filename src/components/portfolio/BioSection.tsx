import { ChevronDown } from "lucide-react";
import bioVideo from "@/assets/videos/bio-background.mp4.asset.json";

export function BioSection({ onNext }: { onNext: () => void }) {
  return (
    <section
      id="bio"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-8 text-center md:py-16"
    >
      <video
        src={bioVideo.url}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background/40" aria-hidden />
      <p className="animate-rise font-serif text-xs uppercase tracking-[0.5em] text-muted-foreground md:text-sm">
        Portfolio · Volume I
      </p>

      <h1
        className="animate-rise mt-4 font-display text-5xl font-normal leading-none tracking-tight text-foreground sm:text-6xl md:mt-6 md:text-8xl lg:text-9xl"
        style={{ animationDelay: "0.15s" }}
      >
        Starr<span className="italic">spawn</span>
      </h1>

      <div
        className="animate-rise mt-8 flex items-center gap-4 text-gold"
        style={{ animationDelay: "0.3s" }}
        aria-hidden
      >
        <span className="h-px w-12 bg-gold/50 md:w-20" />
        <span className="text-sm">✦</span>
        <span className="h-px w-12 bg-gold/50 md:w-20" />
      </div>

      <h2
        className="animate-rise mt-6 font-display text-xl italic text-foreground/90 md:text-2xl"
        style={{ animationDelay: "0.4s" }}
      >
        Writer, poet &amp; digital artist
      </h2>

      <p
        className="animate-rise mt-5 max-w-2xl font-serif text-base leading-relaxed text-foreground/70 md:mt-6 md:text-xl"
        style={{ animationDelay: "0.55s" }}
      >
        Muyideen Adekunle Alatise, aka Starrspawn, is a multidisciplinary artist — a writer, poet
        and digital artist/painter. He is a 2025 Silver Award and 2026 Gold Award recipient of the
        Royal Commonwealth Essay Competition (senior category), and his works have been featured
        in Kiitan Creative Magazine.
      </p>

      <button
        type="button"
        onClick={onNext}
        aria-label="Scroll to the artbook"
        className="animate-soft-bounce absolute bottom-8 flex flex-col items-center gap-1 rounded-full p-2 text-foreground/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span className="font-serif text-[0.65rem] uppercase tracking-[0.4em]">Artbook</span>
        <ChevronDown className="h-6 w-6" strokeWidth={1.25} />
      </button>
    </section>
  );
}
