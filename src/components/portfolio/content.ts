import { assetUrl } from "@/lib/asset-url";
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
import characterStudyCoat from "@/assets/character-study-coat.png.asset.json";
import portraitInBlack from "@/assets/portrait-in-black.png.asset.json";
import blueLaugh from "@/assets/blue-laugh.png.asset.json";
import hollowOne from "@/assets/hollow-one.png.asset.json";
import maskedTraveler from "@/assets/masked-traveler.png.asset.json";
import violetPortrait from "@/assets/violet-portrait.png.asset.json";
import greenEyedElf from "@/assets/green-eyed-elf.png.asset.json";
import manyEyedBeast from "@/assets/many-eyed-beast.png.asset.json";

export const CONTACT_EMAIL = "starrspawn08@gmail.com";

export type Artwork = {
  plate: string;
  title: string;
  medium: string;
  src: string;
};

// Plates are laid out two per leaf (front + back) in the art book, in this order.
export const ARTWORKS: Artwork[] = [
  { plate: "I", title: "Waves", medium: "Digital painting", src: assetUrl(waves) },
  { plate: "II", title: "Waves (concept)", medium: "Digital painting", src: assetUrl(wavesConcept) },
  { plate: "III", title: "Post Create Clarity", medium: "Digital painting", src: assetUrl(postCreateClarity) },
  { plate: "IV", title: "Blues", medium: "Digital painting", src: assetUrl(blues) },
  { plate: "V", title: "Starrgirl", medium: "Digital painting", src: assetUrl(starrgirl) },
  { plate: "VI", title: "Riot", medium: "Digital painting", src: assetUrl(riot) },
  { plate: "VII", title: "Aguitt the All-Seeing — Concept Art 1", medium: "Concept art", src: assetUrl(aguitt1) },
  { plate: "VIII", title: "Aguitt the All-Seeing — Concept Art 2", medium: "Concept art", src: assetUrl(aguitt2) },
  { plate: "IX", title: "Dimitri — Concept Art", medium: "Concept art", src: assetUrl(dimitri) },
  { plate: "X", title: "Ezryn — Concept Art 1", medium: "Concept art", src: assetUrl(ezryn1) },
  { plate: "XI", title: "Ezryn — Concept Art 2", medium: "Concept art", src: assetUrl(ezryn2) },
  { plate: "XII", title: "Hasgur — Concept Art", medium: "Concept art", src: assetUrl(hasgur) },
  { plate: "XIII", title: "Tenteyecle", medium: "Digital painting", src: assetUrl(tenteyecle) },
  { plate: "XIV", title: "Sapphire", medium: "Digital painting", src: assetUrl(abhorrent) },
  { plate: "XV", title: "Abhorrent", medium: "Digital painting", src: assetUrl(sapphire) },
];

// Second volume of the art book, shelved next to the first.
export const ARTWORKS_VOL2: Artwork[] = [
  { plate: "I", title: "Sketch #1", medium: "Digital sketch", src: assetUrl(characterStudyCoat) },
  { plate: "II", title: "Sketch #2", medium: "Digital painting", src: assetUrl(portraitInBlack) },
  { plate: "III", title: "Sketch #3", medium: "Digital painting", src: assetUrl(blueLaugh) },
  { plate: "IV", title: "Sketch #4", medium: "Digital painting", src: assetUrl(hollowOne) },
  { plate: "V", title: "Sketch #5", medium: "Digital painting", src: assetUrl(maskedTraveler) },
  { plate: "VI", title: "Sketch #6", medium: "Digital painting", src: assetUrl(violetPortrait) },
  { plate: "VII", title: "Sketch #7", medium: "Digital painting", src: assetUrl(greenEyedElf) },
  { plate: "VIII", title: "Sketch #8", medium: "Pencil sketch", src: assetUrl(manyEyedBeast) },
];

export type WritingTab = "notes" | "essays" | "lore";

export const WRITING_TABS: { id: WritingTab; label: string }[] = [
  { id: "notes", label: "✦ Notes" },
  { id: "essays", label: "✦ Essays" },
  { id: "lore", label: "✦ Lore" },
];
