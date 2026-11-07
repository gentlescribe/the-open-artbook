// Books on the shelf. To attach a PDF, put the file in /public/books and set `pdf` to "/books/<file>.pdf".
export type ShelfBook = {
  id: string;
  pdf: string | null;
  /** cover hue (oklch hue angle) */
  hue: number;
  /** relative spine thickness / height */
  thick: number;
  tall: number;
};

export const BOOKS: ShelfBook[] = [
  { id: "book-1", pdf: null, hue: 302, thick: 1, tall: 0.96 },
  { id: "book-2", pdf: null, hue: 25, thick: 1.25, tall: 1 },
  { id: "book-3", pdf: null, hue: 160, thick: 1.1, tall: 0.9 },
  { id: "book-4", pdf: null, hue: 250, thick: 0.85, tall: 0.94 },
];
