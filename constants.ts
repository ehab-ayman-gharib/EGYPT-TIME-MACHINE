import { EraData, EraId } from './types';

export const ERAS: EraData[] = [
  {
    id: EraId.OLD_EGYPT,
    name: "Old Kingdom",
    description: "Journey back to the time of Pharaohs and Pyramids (c. 2686–2181 BC).",
    previewImage: "/Old-Egypt-Preview.jpg", // Fallback placeholder
    promptStyle: "A hyper-realistic, high-resolution portrait-oriented photo of {{GROUP_DESCRIPTION}} standing together, wearing ancient Egyptian pharaonic outfits. Each person’s appearance must accurately match their reference photo, fully preserving identity, natural skin tone, ethnic features, gender, age, proportions, and expression. All individuals are fully dressed in regal pharaonic costumes with elegant gold and deep turquoise details and subtle hieroglyphic patterns. Lighting is warm and cinematic with realistic shadows and natural depth of field. The final image should look like a modern professional photoshoot with a strong pharaonic theme. No added accessories, no distortion, and no cartoon style — everything must appear natural, cohesive, and true to the original individuals."
  },
  {
    id: EraId.COPTIC_EGYPT,
    name: "Coptic Era",
    description: "Experience the unique art and spirituality of late antique Egypt (c. 3rd–7th century AD).",
    previewImage: "/Coptic-Preview.jpg",
    promptStyle: "A hyper-realistic, high-resolution portrait-oriented photo of {{GROUP_DESCRIPTION}} standing together, wearing traditional Coptic Egyptian clothing from late antiquity. Each person’s appearance must accurately match their reference photo, fully preserving identity, natural skin tone, ethnic features, gender, age, proportions, and expression. All individuals are dressed in authentic Coptic garments, including woven linen tunics (kolothos) with tapestry-woven decorative clavi and orbiculi, geometric and floral motifs, earthy beige and natural linen tones, and hand-embroidered borders. Optional shawls, mantles, or veils may appear depending on gender and era, but must remain historically accurate to early Christian Egypt. Textures should show real linen weave and natural dyes.Lighting is warm and soft with realistic shadows and natural depth of field, creating the look of a modern professional photoshoot with a strong ancient Coptic Egyptian theme. No added accessories outside historical context, no distortion, and no cartoon style — everything must appear natural, cohesive, and true to the original individuals."
  },
  {
    id: EraId.ISLAMIC_EGYPT,
    name: "Islamic Golden Age",
    description: "Step into the vibrant culture of medieval Cairo (c. 7th–16th century AD).",
    previewImage: "./Islamic-Preview.jpg",
    promptStyle: "A hyper-realistic, high-resolution portrait-oriented photo of {{GROUP_DESCRIPTION}} standing together, wearing traditional clothing from early Islamic Egypt. Each person’s appearance must accurately match their reference photo, fully preserving identity, natural skin tone, ethnic features, gender, age, proportions, and expression.All individuals are dressed in historically accurate garments such as loose-fitting linen or cotton tunics (qamis), decorated wool or silk outer robes, embroidered hems, and woven geometric or vegetal motifs common in early Islamic Egyptian textiles. Clothing may include long-sleeved tunics, layered cloaks, turbans, veils, simple headscarves, or decorative tiraz bands with Kufic-inspired ornamental patterns, depending on gender and social context — all staying authentic to early Islamic Egypt. Colors should reflect natural dyes: soft whites, creams, deep blues, earthy reds, greens, and muted tones.Lighting is warm and cinematic with realistic shadows and natural depth of field, creating the look of a modern professional photoshoot with an early Islamic Egyptian cultural theme. No added accessories outside historical context, no distortion, and no cartoon style — everything must appear natural, cohesive, and true to the original individuals."
  }
];
