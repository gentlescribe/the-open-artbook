import { useState, type FormEvent } from "react";
import { Instagram, Mail, Send } from "lucide-react";
import { CONTACT_EMAIL } from "./content";

const INSTAGRAM_URL = "https://www.instagram.com/starr.spawn";
const TIKTOK_URL = "https://www.tiktok.com/@starrspawn";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.6c.27 0 .53.04.77.12V9.77a5.68 5.68 0 1 0 4.91 5.63V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

const LINKS = [
  { label: "Instagram", href: INSTAGRAM_URL, Icon: Instagram },
  { label: "TikTok", href: TIKTOK_URL, Icon: TikTokIcon },
  { label: "Email", href: `mailto:${CONTACT_EMAIL}`, Icon: Mail },
];

export function ContactLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="group flex w-36 flex-col items-center gap-3 rounded-lg border border-border bg-card/40 px-6 py-6 transition-colors hover:border-gold"
        >
          <Icon className="h-7 w-7 text-gold transition-transform group-hover:-translate-y-0.5" />
          <span className="font-display text-lg italic">{label}</span>
        </a>
      ))}
    </div>
  );
}

export function LetterForm() {
  const [name, setName] = useState("");
  const [letter, setLetter] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`A letter from ${name || "a reader"}`);
    const body = encodeURIComponent(`${letter}\n\n— ${name}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={submit} className="parchment relative mx-auto w-full max-w-2xl rotate-[-0.4deg] rounded-sm px-[8%] py-10 text-ink shadow-[var(--shadow-paper)]">
      <p className="font-type text-sm text-ink-faded">Dear Starrspawn,</p>
      <textarea
        required
        value={letter}
        onChange={(e) => setLetter(e.target.value)}
        rows={8}
        maxLength={5000}
        placeholder="Write your letter here…"
        className="ruled mt-3 w-full resize-none bg-transparent font-type text-[0.95rem] leading-[1.6em] text-ink placeholder:text-ink-faded/70 focus:outline-none"
      />
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <label className="font-type text-sm text-ink-faded">
          Yours,
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            placeholder="your name"
            className="ml-2 border-b border-ink/30 bg-transparent font-display italic text-ink placeholder:text-ink-faded/60 focus:border-ink focus:outline-none"
          />
        </label>
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 font-serif text-sm tracking-wide text-parchment hover:opacity-85">
          <Send className="h-4 w-4" /> Send letter
        </button>
      </div>
    </form>
  );
}
