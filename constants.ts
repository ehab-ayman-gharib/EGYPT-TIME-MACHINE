import { EraData, EraId } from './types';

export const ERAS: EraData[] = [
  {
    id: EraId.OLD_EGYPT,
    name: "Old Kingdom",
    description: "Journey back to the time of Pharaohs and Pyramids (c. 2686–2181 BC).",
    previewImage: "https://picsum.photos/id/106/400/600", // Fallback placeholder
    promptStyle: "ancient egyptian artistic style, pharaonic era, gold jewelry, white linen garments, hieroglyphics background, sandstone textures, majestic lighting, realistic historical rendering"
  },
  {
    id: EraId.COPTIC_EGYPT,
    name: "Coptic Era",
    description: "Experience the unique art and spirituality of late antique Egypt (c. 3rd–7th century AD).",
    previewImage: "/Coptic-Preview.jpg",
    promptStyle: "coptic art style, late antiquity egypt, intricate woven textiles, tunic robes, large expressive eyes, halo effects, monastery fresco background, warm earth tones, fresco texture"
  },
  {
    id: EraId.ISLAMIC_EGYPT,
    name: "Islamic Golden Age",
    description: "Step into the vibrant culture of medieval Cairo (c. 7th–16th century AD).",
    previewImage: "https://picsum.photos/id/305/400/600",
    promptStyle: "islamic golden age egypt style, medieval cairo, intricate geometric patterns, arabesque designs, vibrant silks, turbans and hijabs, mashrabiya background, lantern lighting, oil painting style"
  }
];
