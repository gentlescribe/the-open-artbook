import { useState, type ReactNode } from "react";
import { WRITING_TABS, type WritingTab } from "./content";

function NotesPaper() {
  return (
    <div className="font-type text-[clamp(0.68rem,0.95vw,0.85rem)] leading-[1.6em] text-ink">
      <p className="text-ink-faded">FIELD NOTES — NOV. 2026</p>
      <div className="ruled mt-2">
        <p>03:12 — Moths again at the studio window. Three of them. One had a smudge of violet on the wing, like it flew through wet paint.</p>
        <p className="mt-[1.6em]">— Try gold ink thinned with gum arabic for the star-dust. Less is more.</p>
        <p className="mt-[1.6em]">— Idea: a lighthouse that only shines for things that are lost on purpose.</p>
      </div>
    </div>
  );
}

function EssaysPaper() {
  return (
    <div className="font-serif text-ink">
      <p className="font-serif text-[0.6rem] uppercase tracking-[0.35em] text-ink-faded">Essay No. 7</p>
      <h3 className="mt-2 font-display text-[clamp(1rem,1.6vw,1.35rem)] italic leading-snug">
        On Painting the Dark Without Losing the Light
      </h3>
      <p className="mt-3 text-[clamp(0.8rem,1.1vw,1rem)] leading-relaxed">
        Every night sky I paint begins as a lie: I lay down black, and then spend hours admitting it
        was never black at all. There is plum in it, and rust, and a blue that only shows up after
        midnight. Darkness, I've learned, is just colour that's waiting to be noticed.
      </p>
    </div>
  );
}

function LorePaper() {
  return (
    <div className="font-serif text-ink">
      <p className="font-serif text-[0.6rem] uppercase tracking-[0.35em] text-ink-faded">
        From the Book of Lanterns
      </p>
      <p className="mt-3 text-[clamp(0.85rem,1.15vw,1.05rem)] italic leading-relaxed">
        <span className="float-left mr-2 font-display text-[3em] not-italic leading-[0.8] text-ink">I</span>
        n the age before clocks, the moon kept a single moth as her messenger. It carried the tides
        folded inside its wings, and wherever it rested, a star was born. The old keepers say if you
        leave a candle by the window, it will still come — late, and a little tired, but kind.
      </p>
    </div>
  );
}

const PAPERS: Record<WritingTab, { node: ReactNode; tilt: string }> = {
  notes: { node: <NotesPaper />, tilt: "-0.8deg" },
  essays: { node: <EssaysPaper />, tilt: "0.6deg" },
  lore: { node: <LorePaper />, tilt: "-0.4deg" },
};

export function WritingFolder() {
  const [active, setActive] = useState<WritingTab>("notes");

  return (
    <div className="relative" style={{ width: "var(--folder-w)", height: "var(--folder-h)" }}>
      {/* Tabs along the top edge */}
      <div role="tablist" aria-label="Writing categories" className="absolute inset-x-0 top-0 z-30 flex h-9 items-end gap-1.5 pl-[6%]">
        {WRITING_TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`rounded-t-lg px-4 font-display text-sm italic text-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                isActive
                  ? "kraft h-9 pb-1 shadow-[0_-3px_8px_-4px_oklch(0_0_0/40%)]"
                  : "h-7 bg-kraft-deep text-ink/70 hover:h-8 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Back panel of the folder */}
      <div className="kraft absolute inset-x-0 bottom-0 top-9 z-0 rounded-b-lg rounded-tr-lg shadow-[var(--shadow-book)]" />

      {/* Papers slide inside the folder */}
      <div className="absolute inset-x-[5%] bottom-0 top-12 z-10 overflow-hidden">
        {WRITING_TABS.map((tab) => {
          const isActive = tab.id === active;
          const paper = PAPERS[tab.id];
          return (
            <article
              key={tab.id}
              role="tabpanel"
              aria-hidden={!isActive}
              className="parchment paper-slide hide-scrollbar absolute inset-0 overflow-y-auto rounded-t-sm px-[8%] pb-[28%] pt-[7%] shadow-[var(--shadow-paper)]"
              style={{
                transform: isActive ? `translateY(0) rotate(${paper.tilt})` : "translateY(105%) rotate(0deg)",
                opacity: isActive ? 1 : 0,
                transitionDelay: isActive ? "0.28s" : "0s",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {paper.node}
            </article>
          );
        })}
      </div>

      {/* Front pocket */}
      <div className="kraft-pocket absolute inset-x-0 bottom-0 z-20 flex h-[20%] items-center justify-between rounded-b-lg px-[7%]">
        <span className="font-serif text-[0.6rem] uppercase tracking-[0.4em] text-ink/70">Writings</span>
        <span className="rounded-sm border border-ink/30 px-2 py-0.5 font-type text-[0.6rem] text-ink/70">Starrspawn — 2026</span>
      </div>
    </div>
  );
}
