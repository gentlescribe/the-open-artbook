import waves from "@/assets/waves.png.asset.json";
import wavesConcept from "@/assets/waves-concept.png.asset.json";
import postCreateClarity from "@/assets/post-create-clarity.png.asset.json";
import blues from "@/assets/blues.webp.asset.json";
import starrgirl from "@/assets/starrgirl.webp.asset.json";
import riot from "@/assets/riot.webp.asset.json";
import aguitt1 from "@/assets/aguitt-concept-1.png.asset.json";
import aguitt2 from "@/assets/aguitt-concept-2.png.asset.json";
import dimitri from "@/assets/dimitri-concept.png.asset.json";
import ezryn1 from "@/assets/ezryn-concept-1.png.asset.json";
import ezryn2 from "@/assets/ezryn-concept-2.png.asset.json";
import hasgur from "@/assets/hasgur-concept.png.asset.json";
import tenteyecle from "@/assets/tenteyecle.png.asset.json";
import sapphire from "@/assets/sapphire.png.asset.json";
import abhorrent from "@/assets/abhorrent.png.asset.json";

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
  { plate: "VII", title: "Aguitt the All-Seeing — Concept Art 1", medium: "Concept art", src: aguitt1.url },
  { plate: "VIII", title: "Aguitt the All-Seeing — Concept Art 2", medium: "Concept art", src: aguitt2.url },
  { plate: "IX", title: "Dimitri — Concept Art", medium: "Concept art", src: dimitri.url },
  { plate: "X", title: "Ezryn — Concept Art 1", medium: "Concept art", src: ezryn1.url },
  { plate: "XI", title: "Ezryn — Concept Art 2", medium: "Concept art", src: ezryn2.url },
  { plate: "XII", title: "Hasgur — Concept Art", medium: "Concept art", src: hasgur.url },
  { plate: "XIII", title: "Tenteyecle", medium: "Digital painting", src: tenteyecle.url },
  { plate: "XIV", title: "Sapphire", medium: "Digital painting", src: sapphire.url },
  { plate: "XV", title: "Abhorrent", medium: "Digital painting", src: abhorrent.url },
];

export type WritingTab = "notes" | "essays" | "lore";

export const WRITING_TABS: { id: WritingTab; label: string }[] = [
  { id: "notes", label: "✦ Notes" },
  { id: "essays", label: "✦ Essays" },
  { id: "lore", label: "✦ Lore" },
];
