import waves from "@/assets/waves.png.asset.json";
import wavesConcept from "@/assets/waves-concept.png.asset.json";
import postCreateClarity from "@/assets/post-create-clarity.png.asset.json";
import blues from "@/assets/blues.webp.asset.json";
import starrgirl from "@/assets/starrgirl.webp.asset.json";
import riot from "@/assets/riot.webp.asset.json";

export const CONTACT_EMAIL = "starrspawn08@gmail.com";

export type Artwork = {
  plate: string;
  title: string;
  medium: string;
  src: string;
};

// Plates are laid out two per leaf (front + back) in the art book, in this order.
export const ARTWORKS: Artwork[] = [
  { plate: "I", title: "Waves", medium: "Digital painting", src: waves.url },
  { plate: "II", title: "Waves (concept)", medium: "Digital painting", src: wavesConcept.url },
  { plate: "III", title: "Post Create Clarity", medium: "Digital painting", src: postCreateClarity.url },
  { plate: "IV", title: "Blues", medium: "Digital painting", src: blues.url },
  { plate: "V", title: "Starrgirl", medium: "Digital painting", src: starrgirl.url },
  { plate: "VI", title: "Riot", medium: "Digital painting", src: riot.url },
];

export type WritingTab = "notes" | "essays" | "lore";

export const WRITING_TABS: { id: WritingTab; label: string }[] = [
  { id: "notes", label: "✦ Notes" },
  { id: "essays", label: "✦ Essays" },
  { id: "lore", label: "✦ Lore" },
];
