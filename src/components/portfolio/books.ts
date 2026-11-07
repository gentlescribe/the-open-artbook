// Books on the shelf. To attach a PDF, put the file in /public/books and set `pdf` to "/books/<file>.pdf".
export type ShelfBook = {
  id: string;
  title: string;
  kind: string;
  blurb: string;
  pdf: string | null;
  /** cover hue (oklch hue angle) */
  hue: number;
  /** relative spine thickness / height */
  thick: number;
  tall: number;
};

export const BOOKS: ShelfBook[] = [
  { id: "notes", title: "Field Notes", kind: "Notes", blurb: "Late-night studio notes, sketches in words, and small ideas caught before they fly off.", pdf: null, hue: 302, thick: 1, tall: 0.96 },
  { id: "essays", title: "Collected Essays", kind: "Essays", blurb: "Essays, including award-winning work from the Royal Commonwealth Essay Competition.", pdf: null, hue: 25, thick: 1.25, tall: 1 },
  { id: "lore", title: "The Book of Lanterns", kind: "Lore", blurb: "Myths and lore from a world where the moon keeps a moth as her messenger.", pdf: null, hue: 160, thick: 1.1, tall: 0.9 },
  { id: "poems", title: "Starlit Poems", kind: "Poetry", blurb: "A gathering of poems written under violet skies.", pdf: null, hue: 250, thick: 0.85, tall: 0.94 },
];
