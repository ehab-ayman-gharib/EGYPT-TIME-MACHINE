import { EraData, EraId } from './types';

export const SHARED_PROMPT_INSTRUCTIONS = `A hyper-realistic, high-resolution portrait-oriented photo. Every person in the image MUST be a COMPLETELY UNIQUE INDIVIDUAL with a distinct facial structure, unique facial features, a different height, a different weight/build, and a different expression. 

MANDATORY: Generate ONLY the exact number of people described in the SCENE section below. Do NOT add any extra people, bystanders, pedestrians, tourists, or background figures of any kind. The background MUST be completely empty of any additional people.

ALL FACES MUST BE PERFECTLY WELL-LIT AND COMPLETELY SHADOW-FREE, especially under any headwear or crowns. Facial features must be razor-sharp and perfectly visible. 

ABSOLUTELY NO SHIRTLESS PEOPLE. Every person MUST be wearing a full upper-body garment (tunic, shirt, or dress). 

SKIN TONES: Use only fair olive, warm ivory, light honey, and warm wheatish skin tones. ABSOLUTELY NO black skin, deep dark skin, or sub-saharan ethnic features. Faces should reflect authentic light-to-medium Middle Eastern and Mediterranean appearance.

ABSOLUTELY NO DUPLICATES. NO IDENTITY THEFT. NO CLONES. If I see two people who look even slightly similar, the image is a total failure. 

CLOTHING VARIETY IS MANDATORY: Even if individuals wear similar types of historical attire, their outfits MUST have different colors, different embroidery patterns, and different accessories. ABSOLUTELY NO UNIFORMS. No one should look like a copy-paste of another person. The final image should look like a diverse group of unique individuals at a modern professional photoshoot.`;





export const CAMERA_CONFIG = `CAMERA: Shot on 35mm lens, f/1.8, 8k resolution. Professional studio lighting with front-facing fill light to eliminate all shadows caused by headwear. The lighting must be perfectly balanced so that every part of every face is clearly visible, with NO dark areas under hat brims or caps. Full-body environmental portrait composition. Eye-level perspective. Even, bright professional studio-style lighting with soft shadows. ALL FACES MUST BE PERFECTLY LIT with NO shadows over the eyes or facial profiles. Facial features must be extremely clear, sharp, and high-contrast for perfect identification. The camera should capture the individuals from head to toe including their footwear, set within a spacious view of the environment.`;



export const IDENTITY_PRESERVATION_GUIDE = `REQUIREMENTS:
- AUTHENTIC LOOK: Middle Eastern / Mediterranean / Arab / North African ethnic and facial features.
- SKIN TONES: Fair olive, warm ivory, light honey, and warm wheatish only. ABSOLUTELY NO black or dark skin tones.
- DIVERSITY: Every person MUST have a different height, weight, and face shape.
- CLEAR FACES: Faces must be COMPLETELY SHADOW-FREE with sharp, well-defined features. NO harsh lighting or dark shadows allowed on any face.
- FULLY CLOTHED: NO shirtless people. Everyone wears full tunics or dresses.
- NO UNIFORMS: Outfits must vary significantly in color and detail for each person. Even if the garment type is the same, the execution must be unique for each individual.
- NO FACIAL HAIR: Glass-smooth clean-shaven faces ONLY, no beards, mustaches, or stubble.
- UNIQUE INDIVIDUALS: Every person must have a unique face and distinct facial structure.
- EXACT COUNT: Generate ONLY the number of people requested. No extra figures or background bystanders allowed.
- ABSOLUTELY NO DUPLICATES: No identical faces, no twins, and no lookalikes allowed in the same image.
- Photorealistic, high quality, 9:16 portrait.`;


/**
 * MALE_WARDROBE_STYLES:
 * Casual modern menswear utilizing high-quality Egyptian cotton and linen.
 */
export const MALE_WARDROBE_STYLES = [
  "a crisp white Egyptian cotton t-shirt paired with perfectly fitted indigo denim jeans and clean white sneakers, worn with a minimalist navy blue baseball cap.",
  "a casual navy blue premium cotton crew-neck sweater worn over charcoal tailored chinos for a modern, simple look, paired with a stylish grey textured flat cap.",
  "a smart-casual textured grey blazer layered over a plain black luxury cotton t-shirt and charcoal trousers, topped with a matching grey linen baseball cap.",
  "a relaxed olive green linen button-down shirt, worn unbuttoned over a white tee with classic blue jeans and a trendy olive green bucket hat.",
  "a modern navy blue polo shirt made of fine Egyptian cotton, paired with beige linen trousers and a sophisticated natural straw panama hat.",
  "a tailored light blue Egyptian linen button-down shirt tucked into charcoal grey dress slacks, paired with a matching linen baseball cap.",
  "a refined sand-colored lightweight cotton cardigan over a crisp white t-shirt and slim olive chinos, topped with a stylish natural straw fedora.",
  "a high-end black pique cotton polo shirt paired with tapered indigo jeans and white leather sneakers, worn with a matching black baseball cap.",
  "a relaxed-fit light grey linen suit worn with a simple white crew-neck tee and a minimalist navy blue cap.",
  "a modern tan-colored safari-style linen shirt with pocket details, paired with dark denim and a dark brown flat cap."
];

/**
 * FEMALE_WARDROBE_STYLES:
 * Simple, elegant feminine attire focused on clean lines and premium fabrics.
 */
export const FEMALE_WARDROBE_STYLES = [
  "a simple and elegant long-sleeved silk-blend blouse in a soft lilac tone, paired with light-coloured tailored cotton trousers, topped with a matching modern baseball cap. MANDATORY: All hair MUST be completely tucked inside the cap with zero hair visible. Keep the neck completely bare.",
  "a modern, minimalist solid-colored Egyptian linen knee-length dress in a soft coral tone, paired with a wide-brim natural straw sun hat. MANDATORY: The neck must be bare; all hair must be pulled back tightly and hidden underneath the hat.",
  "a stylish white linen tunic with V-neckline and subtle embroidery, paired with slim-fit dark navy trousers and a chic navy blue bucket hat. MANDATORY: The hat must be pulled down with every strand of hair tucked inside. No fabric on the neck.",
  "a casual yet chic terracotta-colored cotton jumpsuit with a cinched waist and short sleeves, worn with a trendy neutral-toned flat cap. MANDATORY: All hair must be hidden entirely inside the flat cap; the neck and collarbone must be visible.",
  "a refined emerald green silk shirt with an open collar tucked into high-waisted beige linen pants, completed with a sophisticated patterned silk head scarf. MANDATORY: The scarf must be wrapped around the head only, like a headband or turban, leaving the ears and neck completely exposed.",
  "a sleek navy blue short-sleeved premium cotton boiler-suit with a wide belt. MANDATORY: All hair must be tucked into a matching navy blue baseball cap; the neck must be clear.",
  "a fluid burgundy silk blouse with a modern open collar, tucked into high-waisted cream trousers. MANDATORY: Topped with a stylish burgundy velvet flat cap with every strand of hair tucked inside. Bare neck.",
  "a modern white linen shirt-dress with rolled-up sleeves and a clean V-neck. MANDATORY: Paired with a large natural straw sun hat worn low, hair tucked inside, neck completely exposed.",
  "a modern pastel blue textured cotton polo-style tunic paired with white slim-fit pants. MANDATORY: All hair must be bunched up and hidden inside a matching pastel blue bucket hat; bare neck.",
  "a simple knee-length charcoal grey ribbed cotton-knit dress with elbow-length sleeves. MANDATORY: Completed with a sophisticated silk turban-style head wrap that covers the scalp only, leaving the neck and jawline bare."
];

export const ERAS: EraData[] = [
  {
    id: EraId.OLD_EGYPT,
    name: "Old Kingdom",
    description: "Journey back to the time of Pharaohs, majestic architecture, and sacred art (c. 2686–2181 BC).",
    previewImage: "./Old-Egypt-Preview.png",
    scenery: [
      {
        name: "Philae Temple Quay",
        prompt: "A wide-angle full-body environmental portrait on the stone quay of the Philae Temple. The individuals stand centrally, allowing a view of the surroundings. To their side rests a magnificent gilded Royal Bark (ritual boat) on a sledge. The background features towering temple Pylons covered in distinct Egyptian reliefs and the wide blue Nile. Bright, expansive, and regal.",
maleClothingIds: [
  "Pharaoh's River Ceremony Regalia: A full white linen tunic with long sleeves. A massive gold Wesekh collar. Holds the Heqa crook. Mandatory Headwear: The blue-and-gold striped Nemes headdress fully covering all hair.",
  "High Priest of Amun: A full long-sleeved white linen tunic with a broad white linen sash. A heavy gold pectoral necklace. Mandatory Headwear: A tall white Hedjet crown fully covering all hair.",
  "Royal Herald: A full white linen tunic with a broad gold sash. Mandatory Headwear: The red Deshret crown of Lower Egypt fully covering all hair.",
],
femaleClothingIds: [
  "Hathor Incarnation: A form-fitting ankle-length red and orange diamond-patterned sheath dress with long sleeves. A massive gold Wesekh collar. Mandatory Headwear: Large curved cow horns with a huge bright red sun disk in the center, resting on a long black wig.",
  "Royal Matriarch: A long white and black layered linen dress with a wide gold belt and gold armbands. Mandatory Headwear: A simple thick gold headband with a Uraeus cobra at the brow.",
  "High Priestess of Isis: A fitted white linen dress with complex gold embroidery at the neckline. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) fully covering the head.",
],
      },
      {
        name: "Great Sphinx & Obelisks",
        prompt: "A wide-angle full-body environmental portrait at the base of the Great Sphinx of Giza. Two massive red granite obelisks flank the individuals. In the background, the Great Pyramid of Khufu rises majestically against a clear blue Egyptian sky. Cinematic morning desert lighting with soft, long shadows.",
maleClothingIds: [
  "Pharaoh's Victory Regalia: A full white linen tunic. A massive gold Wesekh collar. Holds a gold Khopesh. Mandatory Headwear: The tall gold and blue Pschent double crown fully covering all hair.",
  "High Priest: A full white linen tunic with a leopard skin drape across one shoulder. Mandatory Headwear: A tall white Hedjet crown fully covering all hair.",
  "Noble Vizier: A long linen gown with a wide gold sash. Mandatory Headwear: The blue-and-gold striped Nemes headdress fully covering all hair.",
],
femaleClothingIds: [
  "Royal Matriarch: A long ankle-length stiff pleated white linen Kalasiris gown with long sleeves fully covering the arms, decorated with gold thread embroidery along all seams. A broad multi-row Wesekh collar inlaid with lapis lazuli, carnelian, and gold covering the shoulders and upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and gemstone earrings. Heavy gold bracelets on both wrists. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Palace Noblewoman: A long ankle-length fitted dress of very fine pleated white linen with long sleeves fully covering the arms. A wide multi-row beaded Wesekh collar of gold, turquoise, and lapis lazuli covering the upper chest and shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and turquoise earrings. Gold wrist cuffs. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Queen's Attendant: A long ankle-length tight-fitting white linen dress with long sleeves fully covering the arms. A vibrant gold-and-lapis patterned sash across the torso. A heavy multi-row gold pectoral necklace inlaid with carnelian and turquoise covering the upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
],
      },
      {
        name: "Karnak Hypostyle Hall",
        prompt: "A wide-angle full-body environmental portrait deep within the Great Hypostyle Hall of Karnak. The individuals are dwarfed by massive papyrus-capital columns covered in vibrant, deeply carved hieroglyphics. Golden afternoon sunlight filters through the high clerestory windows, creating atmospheric dust motes and a sense of sacred awe.",
maleClothingIds: [
  "Pharaoh's Temple Regalia: A full white linen tunic. A massive gold Wesekh collar. Mandatory Headwear: The tall white Hedjet crown fully covering all hair.",
  "High Priest: A floor-length pleated linen robe with a wide gold sash. Mandatory Headwear: The red Deshret crown of Lower Egypt fully covering all hair.",
  "Royal Sculptor: A simple white linen tunic with a leather belt. Mandatory Headwear: The blue-and-gold striped Nemes headdress fully covering all hair.",
],
femaleClothingIds: [
  "God's Wife of Amun: A long ankle-length white linen Kalasiris dress with long sleeves fully covering the arms. A heavy multi-row Wesekh collar inlaid with turquoise, carnelian, and gold covering the shoulders and upper chest. A wide gold sash at the waist. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and gemstone earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Royal Daughter: A long ankle-length form-fitting white linen dress with long sleeves fully covering the arms and fine gold thread embroidery along the neckline and hem. A wide multi-row Wesekh collar inlaid with gold, turquoise, and lapis lazuli covering the upper chest and shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling turquoise and gold earrings. Gold bracelets. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Temple Songstress: A long ankle-length white linen tunic dress with long sleeves fully covering the arms. A heavy multi-row gold collar inlaid with lapis lazuli and carnelian covering the upper chest. A pleated linen shawl layered over the shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and gemstone earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
],
      },
      {
        name: "Royal Palace Terrace",
        prompt: "A wide-angle full-body environmental portrait on a magnificent white limestone terrace overlooking the lush Nile Delta. Intricate lotus-shaped columns support a brightly painted sky-blue ceiling. In the hazy distance, the white-walled city of Memphis and the Step Pyramid of Djoser are visible under a scorching sun.",
maleClothingIds: [
  "Pharaoh's Court Regalia: A sheer fine white linen long tunic. Mandatory Headwear: The Pschent double crown fully covering all hair.",
  "Palace Vizier: A long starched linen gown with a gold pectoral. Mandatory Headwear: A tall white Hedjet crown fully covering all hair.",
  "Royal Scribe: A simple linen tunic with a wide woven sash. Mandatory Headwear: The blue-and-gold striped Nemes headdress fully covering all hair.",
],

femaleClothingIds: [
  "Queen on the Terrace: A long ankle-length fitted white linen dress with long sleeves fully covering the arms, woven with shimmering gold thread throughout the fabric. A massive multi-row Wesekh collar inlaid with lapis lazuli, carnelian, and turquoise covering the shoulders and upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Massive long dangling gold and gemstone earrings. Gold wrist cuffs. Fine gold leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Royal Harpist: A long ankle-length fine pleated white linen dress with long sleeves fully covering the arms. A wide gold sash tied at the waist. A heavy multi-row Wesekh collar inlaid with gold and lapis lazuli covering the upper chest and shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold hoop and gemstone earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Palace Noblewoman: A long ankle-length high-necked fine white linen dress with long sleeves fully covering the arms, decorated with elegant gold thread embroidery along the neckline and cuffs. A heavy multi-row necklace of red carnelian, lapis lazuli, and gold covering the upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and carnelian earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
],
      },
      {
        name: "Luxor Temple Courtyard",
         prompt: "A wide-angle full-body environmental portrait in the sun-drenched courtyard of Amenhotep III at Luxor Temple. A rhythmic double row of papyrus-bud columns creates a monumental background. Colossal standing statues of the Pharaoh in white crowns stand guard between columns. Bright, open, and regal.",
maleClothingIds: [
  "Pharaoh's Processional Regalia: A full white linen tunic. Mandatory Headwear: The tall blue leather Khepresh war crown fully covering all hair.",
  "Temple Guardian: A long starched linen tunic with a wide leather belt. Mandatory Headwear: A tall white Hedjet crown fully covering all hair.",
  "Royal Herald: A simple linen tunic with a gold-threaded sash. Mandatory Headwear: The blue-and-gold striped Nemes headdress fully covering all hair.",
],

femaleClothingIds: [
  "Queen in Procession: A long ankle-length heavy white linen Kalasiris gown with long sleeves fully covering the arms, elaborately pleated from chest to hem. A wide gold beaded sash across the torso. A massive multi-row Wesekh collar inlaid with lapis lazuli and turquoise covering the shoulders and upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and gemstone earrings. Fine gold leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Temple Noblewoman: A long ankle-length structural pleated white linen gown with long sleeves fully covering the arms. A wide gold sash at the waist. A multi-row gold Wesekh collar inlaid with turquoise covering the upper chest and shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and turquoise earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Sacred Singer: A long ankle-length heavy pleated white linen gown with long sleeves fully covering the arms. A large multi-row gold pectoral necklace inlaid with carnelian and lapis lazuli covering the upper chest. A pleated linen shawl draped over the shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and lapis lazuli earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
],

      },
      {
        name: "Valley of the Kings Tomb",
        prompt: "A wide-angle full-body environmental portrait inside a vibrantly painted royal burial chamber. The walls are covered from floor to ceiling with colorful Book of the Dead scenes and starry astronomical ceilings. A massive stone sarcophagus is partially visible in the shadows. Soft, warm flickering torchlight illuminates the intimate space.",
maleClothingIds: [
  "Pharaoh's Funerary Regalia: A full white linen tunic. A massive gold Wesekh collar. Mandatory Headwear: The Atef funerary crown fully covering all hair.",
  "High Priest: A full white linen tunic with a sacred sash. Mandatory Headwear: The tall white Hedjet crown fully covering all hair.",
  "Vizier: A majestic linen gown. Mandatory Headwear: The blue-and-gold striped Nemes headdress fully covering all hair.",
],
femaleClothingIds: [
  "Royal Mourner Queen: A long ankle-length fitted white linen dress with long sleeves fully covering the arms. A multi-row gold Wesekh collar inlaid with lapis lazuli covering the shoulders and upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and lapis lazuli earrings. Fine gold sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Princess in the Tomb: A long ankle-length pleated white linen dress with long sleeves fully covering the arms. A narrow gold belt at the waist. A massive multi-row gold pectoral necklace inlaid with carnelian and lapis lazuli covering the upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and carnelian earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Noblewoman: A long ankle-length form-fitting white linen dress with long sleeves fully covering the arms, layered with a fine pleated linen shawl with heavy gold trim over the shoulders. A multi-row gold Wesekh collar inlaid with turquoise and carnelian covering the upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and gemstone earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
],
      },
      {
        name: "Hatshepsut Mortuary Temple",
         prompt: "A wide-angle full-body environmental portrait on the upper terrace of the Mortuary Temple of Hatshepsut. The individuals stand before a long colonnade of Osiride pillars. Behind them, the sheer vertical limestone cliffs of Deir el-Bahari rise into a deep blue sky. Expansive, airy, and monumental.",
maleClothingIds: [
  "Hatshepsut Pharaoh Regalia: A full white linen tunic fully covering the chest and torso. A massive gold Wesekh collar inlaid with turquoise and lapis lazuli sitting on top of the tunic. A stiff white linen Shendyt kilt with a triangular apron and gold central belt panel. Heavy gold armbands and wrist cuffs. Holds the gold Heqa crook and Nekhekh flail. Mandatory Headwear: The red Deshret crown of Lower Egypt fully covering all hair with NO hair visible whatsoever — a flat red cap with a high back and a distinctive tall spiral coil at the front — with a gold Uraeus cobra rearing at the brow.",
  "High Priest of Amun: A full white linen tunic fully covering the chest and torso with a broad white linen sash draped precisely over one shoulder. A heavy gold pectoral necklace sitting on top of the tunic and gold wrist cuffs. A wide decorated gold belt at the waist. Mandatory Headwear: The red Deshret crown of Lower Egypt fully covering all hair with NO hair visible whatsoever, with a gold Uraeus cobra rearing at the brow.",
  "Royal Fan Bearer: A full white linen tunic fully covering the chest and torso with a broad gold sash across the chest. A gold Wesekh collar sitting on top of the tunic. A decorated gold belt at the waist. Holds a tall ceremonial Ostrich Feather Flabellum. Mandatory Headwear: The red Deshret crown of Lower Egypt fully covering all hair with NO hair visible whatsoever, with a gold Uraeus cobra rearing at the brow.",
],
femaleClothingIds: [
  "Great Queen of Deir el-Bahari: A long ankle-length structural white linen Kalasiris gown with long sleeves fully covering the arms. A wide gold belt at the waist. A massive multi-row Wesekh collar inlaid with turquoise and lapis lazuli covering the shoulders and upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and turquoise earrings. Fine gold leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Hatshepsut's Noblewoman: A long ankle-length heavy starched white linen gown with long sleeves fully covering the arms. A wide multi-row turquoise and gold Wesekh collar covering the upper chest and shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and gemstone earrings. Gold bracelets. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "High Priestess of Hathor: A long ankle-length heavy-weave white linen gown with long sleeves fully covering the arms. A structural gold sash across the torso. A multi-row gold pectoral necklace inlaid with turquoise and carnelian covering the upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and carnelian earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
],

      },
      {
        name: "Abu Simbel Temples",
         prompt: "A wide-angle full-body environmental portrait directly in front of the Great Temple of Ramesses II at Abu Simbel. The individuals stand between the feet of the four colossal seated statues of the Pharaoh carved into the mountain. The entrance to the inner sanctuary is visible behind them. Powerful, ancient, and breathtaking.",
maleClothingIds: [
  "Ramesses II Battle Regalia: A full white linen tunic fully covering the chest and torso. A massive gold Wesekh collar inlaid with lapis lazuli and carnelian sitting on top of the tunic. A stiff white linen Shendyt kilt with multiple fabric layers, intricate pleating, and a triangular apron piece extending from the front of the gold belt panel. Heavy gold armbands and wrist cuffs. Holds a gold Khopesh sickle-sword. Mandatory Headwear: The tall blue leather Khepresh war crown fully covering all hair with NO hair visible whatsoever, studded with small circular gold lozenges across its entire surface and a gold Uraeus cobra rearing at the brow.",
  "High Priest of Amun: A full white linen tunic fully covering the chest and torso with a broad white linen sash draped precisely over one shoulder. A heavy gold pectoral necklace sitting on top of the tunic and gold wrist cuffs. A wide decorated gold belt at the waist. Mandatory Headwear: The tall blue leather Khepresh war crown fully covering all hair with NO hair visible whatsoever, with a gold Uraeus cobra rearing at the brow.",
  "Royal Fan Bearer: A full white linen tunic fully covering the chest and torso with a broad gold sash across the chest. A gold Wesekh collar sitting on top of the tunic. A decorated gold belt at the waist. Holds a tall ceremonial Ostrich Feather Flabellum. Mandatory Headwear: The tall blue leather Khepresh war crown fully covering all hair with NO hair visible whatsoever, with a gold Uraeus cobra rearing at the brow.",
],
femaleClothingIds: [
  "Temple Queen of Nefertari: A long ankle-length structural white linen Kalasiris gown with long sleeves fully covering the arms, elaborately pleated. A wide multi-row Wesekh collar inlaid with lapis lazuli and carnelian covering the shoulders and upper chest. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and lapis lazuli earrings. Fine gold leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow — identical to Nefertiti's iconic crown.",
  "Noblewoman of the South: A long ankle-length sturdy heavy starched white linen Kalasiris gown with long sleeves fully covering the arms. A wide gold sash at the waist. A multi-row gold Wesekh collar inlaid with turquoise covering the upper chest and shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and turquoise earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
  "Royal Princess of Abu Simbel: A long ankle-length structural white linen gown with long sleeves fully covering the arms, layered with a golden beaded overlay across the torso. A multi-row gold Wesekh collar inlaid with turquoise and carnelian covering the upper chest and shoulders. On the right upper arm over the sleeve: a gold serpent armband coiling three times around the arm with a raised serpent head at the top. On the left wrist over the sleeve: a wide gold cuff bracelet engraved with hieroglyphic inscriptions. Long dangling gold and carnelian earrings. Fine leather sandals. Mandatory Headwear: The tall flat-topped blue cylindrical crown (Khepresh) with absolutely NO hair visible whatsoever — not a single strand — fully covering the entire head, encircled at the base by a wide gold band inlaid with alternating red, blue, and green gemstone panels, with a multicolored gold Uraeus cobra rearing at the brow.",
],
      }
    ],
    stamps: [
      "./Stamps/Old-Egyptian/1.png",
      "./Stamps/Old-Egyptian/2.png",
      "./Stamps/Old-Egyptian/3.png"
    ],
    frames: [
      "./Frames/Old-Egyptian/1.png"
    ]
  },
  {
    id: EraId.COPTIC_EGYPT,
    name: "Coptic Egypt",
    description: "Step into the era of monastic life, intricate textiles, and native Egyptian art (c. 3rd–7th Century AD).",
    previewImage: "./Coptic-Preview.png",
    scenery: [
      {
        name: "Church of St. George",
        prompt: "A wide-angle full-body environmental portrait in front of the Church of St. George (Deir Mar Girgis). Vibrant volumetric light highlights their authentic Coptic features. The background features the iconic circular rotunda with alternating layers of red Roman brick and limestone, ornate Coptic crosses, and Byzantine-style icons visible through arched windows. High-resolution vibrant colors.",
maleClothingIds: [
  "Coptic Worshipper's Tunic: A long unbleached linen tunic with broad dark purple wool clavi stripes running from shoulders to hem. Tapestry-woven orbiculi roundels with interlace motifs on the lower tunic. A thin woven linen belt at the waist. Mandatory Headwear: A plain white linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held in place by a gold and black geometric zigzag crown headband.",
  "Coptic Parish Elder's Tunic: A long undyed linen tunic with wide dark red wool clavi stripes and square tabulae embellishments on each shoulder. A simple leather belt at the waist. Mandatory Headwear: A natural linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by a gold and black geometric zigzag crown headband.",
  "Coptic Deacon's Tunic: A long ivory linen tunic with narrow dark blue clavi stripes and small tapestry-woven medallions near the hem. A braided wool sash at the waist. Mandatory Headwear: A white linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
  "Coptic Musician's Garb: A long saffron-tinted linen tunic with vibrant red clavi stripes and elaborate floral tapestry roundels near the cuffs. A wide leather sash at the waist. Mandatory Headwear: A saffron linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
  "Coptic Monk's Simple Habit: A long coarse undyed wool tunic with a single narrow black clavi stripe on each shoulder. A simple rope belt at the waist. Mandatory Headwear: A plain undyed linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Scholar's Tunic: A long fine ivory linen tunic with dark blue clavi stripes and delicate tapestry-woven medallions on the shoulders. A thin linen sash at the waist. Mandatory Headwear: A white linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
],
femaleClothingIds: [
  "Coptic Noblewoman's Tunic: A long ankle-length linen tunic in natural flax color with wide tapestry-woven clavi stripes in deep purple wool running from shoulders to hem. Square tabulae embellishments on each shoulder woven with Coptic cross and geometric diamond patterns in red and gold wool. Wide sleeves with tapestry-woven cuffs. A narrow woven linen sash at the waist. Closed leather shoes. Mandatory Headwear: A fine ivory linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Merchant's Wife Tunic: A long ankle-length wool tunic in deep terracotta red with narrow dark blue clavi stripes and orbiculi roundels near the hem woven with geometric interlace patterns. Very wide sleeves embroidered along the seams with chevron and diamond motifs. A braided wool sash at the waist.  Closed leather shoes. Mandatory Headwear: A terracotta-colored linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Laywoman's Robe: A long ankle-length undyed linen T-shaped robe with straight seams and very wide sleeves, embroidered along the shoulder seams and around the neck opening with geometric Coptic cross motifs in red wool thread. A simple leather belt at the waist.  Closed leather shoes. Mandatory Headwear: A plain white linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Artisan's Dress: A long forest-green wool tunic with diagonal clavi stripes in yellow and black wool. Embroidered circular motifs on the chest showing stylized doves. A woven flax belt. Mandatory Headwear: A green linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Nun's Habit: A long ankle-length coarse dark brown wool tunic with a single narrow black clavi stripe on each shoulder. A knotted rope cord at the waist. Closed leather shoes. Mandatory Headwear: A dark brown wool veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple plain gold circlet headband.",
  "Coptic Noble's Daughter: A long ankle-length fine silk tunic in deep violet with silver embroidery along the neckline and cuffs. A thin silk sash at the waist. Closed leather shoes. Mandatory Headwear: A fine ivory linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
],

      },
      {
        name: "The Hanging Church",
        prompt: "A wide-angle full-body environmental portrait at the Hanging Church (Al-Muallaqa). Cinematic volumetric lighting casts a warm glow on their authentic Coptic features. The background shows the ornate wooden Loggia, intricate Khajesta (lattice) screens, and ancient biblical murals. Flickering lamps create a rich atmospheric environment.",
maleClothingIds: [
  "Coptic Liturgical Tunic: A long fine linen tunic in natural flax color with broad purple wool clavi stripes and tapestry-woven tabulae on the shoulders. A thin braided linen belt at the waist. Mandatory Headwear: A white linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by a gold and black geometric zigzag crown headband.",
  "Byzantine-Coptic Noble's Tunic: A long deep ivory linen tunic with wide clavi stripes in dark blue wool and orbiculi roundels on the lower hem. A narrow leather belt at the waist. Mandatory Headwear: A fine undyed linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
  "Coptic Cantor's Robe: A long natural linen tunic with dark wool clavi stripes and square tabulae on each shoulder with monochrome interlace knot patterns. A simple woven wool sash at the waist. Mandatory Headwear: A plain linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by a gold and black geometric zigzag crown headband.",
  "Coptic Scribe: A long off-white linen tunic with narrow blue clavi and a small ink-pot holder attached to the leather belt. Mandatory Headwear: A simple white linen veil.",
],
femaleClothingIds: [
  "Coptic Deaconess Tunic: A long ankle-length deep ivory linen tunic with broad tapestry-woven clavi stripes in dark blue wool featuring geometric interlace and cross motifs. Wide sleeves with tapestry-woven bands at the cuffs. Orbiculi roundels near the hem with abstract interlace cross patterns. A braided linen sash at the waist. Closed leather shoes. Mandatory Headwear: A white linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Elder Woman's Robe: A long ankle-length dark blue wool T-shaped robe with very wide sleeves, embroidered along all seams and shoulders with red and gold geometric diamond lattice and abstract zigzag patterns. A wide woven wool sash at the waist.  Closed leather shoes. Mandatory Headwear: A dark blue wool veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Widow's Tunic: A long ankle-length undyed rough linen tunic with narrow dark wool clavi stripes and simple geometric orbiculi roundels near the hem. Very wide plain sleeves. A plain rope cord tied at the waist.  Closed leather shoes. Mandatory Headwear: A plain undyed linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Noble's Daughter: A fine silk tunic in deep violet with silver embroidery. Mandatory Headwear: A silver circlet over an ivory veil.",
],
      },
      {
        name: "Cave Church of St. Simon",
        prompt: "A wide-angle full-body environmental portrait at the Cave Church of St. Simon. The person is front-facing with authentic features, looking directly at the camera. The background features the massive natural cave walls covered in colossal, detailed modern rock carvings of Coptic saints and biblical scenes, with simple wooden pews and religious inscriptions in the background.",
maleClothingIds: [
  "Coptic Pilgrim's Tunic: A long coarse undyed rough linen tunic with narrow dark brown wool clavi stripes and simple orbiculi roundels near the hem. A knotted rope cord at the waist. Mandatory Headwear: A rough undyed linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
  "Penitent's Tunic: A long plain dark brown wool tunic with a single narrow clavi stripe on each shoulder in black wool. A rough rope belt at the waist. Mandatory Headwear: A coarse dark brown linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by a gold and black geometric zigzag crown headband.",
  "Desert Worshipper's Tunic: A long worn natural linen tunic with faded red-brown clavi stripes and barely visible tapestry-woven interlace motifs near the hem. A weathered leather cord at the waist. Mandatory Headwear: A dusty undyed linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
],
femaleClothingIds: [
  "Coptic Pilgrim Woman's Tunic: A long ankle-length coarse undyed linen T-shaped robe with very wide sleeves and narrow dark brown wool clavi stripes. Simple geometric embroidery along the neck opening and shoulder seams in abstract zigzag patterns. A knotted rope cord at the waist. Closed leather shoes. Mandatory Headwear: A rough undyed linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple worn gold circlet headband.",
  "Coptic Penitent's Robe: A long ankle-length dark brown wool tunic, plain and undecorated except for a single narrow clavi stripe on each shoulder and a small hand-stitched geometric Coptic cross near the collar. A simple rope belt at the waist. Closed leather shoes. Mandatory Headwear: A coarse dark brown linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Worshipper's Tunic: A long ankle-length worn natural linen tunic with faded red-brown clavi stripes and barely visible tapestry-woven geometric orbiculi motifs near the hem. Wide sleeves with simple abstract embroidery along the seams. A weathered leather belt at the waist.  Closed leather shoes. Mandatory Headwear: A dusty undyed linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
],


      },
      {
        name: "The Coptic Museum",
        prompt: "A wide-angle full-body environmental portrait in the historic courtyard of the Coptic Museum. Volumetric sunlight highlights the person's authentic native features. The background features magnificent Mashrabiya wooden screens, carved stone fountains, and ancient Coptic crosses set into the walls in vibrant detail.",
maleClothingIds: [
  "Coptic Nobleman's Tunic: A long fine linen tunic in natural flax with elaborate polychrome tapestry-woven clavi stripes featuring vine scrolls and Christian symbols. Wide square tabulae on each shoulder with figural medallions. A wide decorated leather belt at the waist. Mandatory Headwear: A light ivory linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by an ornate gold and black geometric zigzag crown headband.",
  "Coptic Artisan's Tunic: A long sturdy linen tunic with vivid red and dark blue clavi stripes and orbiculi roundels at the hem woven with interlace and floral motifs. A braided wool belt at the waist. Mandatory Headwear: A natural linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
  "Coptic Scholar's Tunic: A long pale ivory linen tunic with dark monochrome clavi stripes and delicate tabulae on the shoulders with abstract geometric and cross patterns. A thin linen sash at the waist. Mandatory Headwear: A white linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by a gold and black geometric zigzag crown headband.",
],
femaleClothingIds: [
  "Coptic Aristocrat's Tunic: A long ankle-length fine linen tunic in natural flax with elaborate polychrome tapestry-woven clavi stripes featuring abstract geometric interlace, stepped cross patterns, and repeating diamond motifs in vivid red, blue, and gold wool. Wide sleeves with richly decorated tapestry cuffs. Square tabulae on each shoulder with abstract cross medallions. A wide decorated leather belt at the waist. A gold Coptic cross necklace hanging at the chest. Closed leather shoes. Mandatory Headwear: A fine ivory linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by an ornate gold circlet headband.",
  "Coptic Artisan Woman's Robe: A long ankle-length sturdy linen T-shaped robe with vivid red and dark blue clavi stripes and orbiculi roundels at the hem woven with abstract interlace and repeating geometric floral rosette motifs. Very wide sleeves embroidered along the seams with chevron patterns. A braided wool belt at the waist. Closed leather shoes. Mandatory Headwear: A natural linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Coptic Scholar Woman's Tunic: A long ankle-length pale ivory linen tunic with dark monochrome clavi stripes and delicate tabulae on the shoulders woven with abstract stepped cross and interlace geometric patterns. Wide sleeves with narrow tapestry-woven cuffs. A thin linen sash at the waist. Closed leather shoes. Mandatory Headwear: A white linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
],

      },
      {
        name: "Ancient Monastery Complex",
        prompt: "A wide-angle full-body environmental portrait with a remote Desert Monastery in the background. Majestic volumetric lighting illuminates the authentic Coptic features. The background shows fortified mud-brick walls, ancient towers, and white-domed cells nestled against the rugged desert mountains under a golden sky.",
maleClothingIds: [
  "Coptic Desert Monk's Habit: A long coarse dark brown wool tunic reaching the ankles with a single narrow black clavi stripe on each shoulder and a small woven cross near the collar. A knotted rope cord at the waist. Mandatory Headwear: A dark brown linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
  "Hermit's Tunic: A very coarse patched undyed rough linen tunic, entirely plain with no decoration. A simple rough rope belt at the waist. Mandatory Headwear: A weathered undyed linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by a worn gold and black geometric zigzag crown headband.",
  "Novice Monk's Tunic: A long plain undyed linen tunic with a single narrow dark wool clavi stripe on each shoulder. A thin leather cord at the waist. Mandatory Headwear: A plain white linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
],
femaleClothingIds: [
  "Coptic Desert Nun's Habit: A long ankle-length coarse dark brown wool tunic reaching the ground with a single narrow black clavi stripe on each shoulder and a small geometric woven Coptic cross near the collar. Very wide plain sleeves. A knotted rope cord at the waist. Closed leather shoes. Mandatory Headwear: A dark brown wool veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple plain gold circlet headband.",
  "Coptic Hermit Woman's Robe: A very coarse patched undyed rough linen T-shaped robe, entirely plain with no decoration except a faint geometric cross outline stitched near the collar. A rough rope belt at the waist. A simple wooden Coptic cross necklace hanging at the chest. Closed leather shoes. Mandatory Headwear: A weathered undyed linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a worn simple gold circlet headband.",
  "Coptic Monastery Visitor's Tunic: A long ankle-length plain undyed linen tunic with a single narrow dark wool clavi stripe on each shoulder and simple abstract geometric embroidery around the neck opening. Wide plain sleeves. A thin leather cord at the waist. Closed leather shoes. Mandatory Headwear: A plain white linen veil that MUST completely and fully cover every strand of hair with absolutely no hair visible whatsoever, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
],
      },
      {
        name: "Saint Catherine’s Monastery",
        prompt: "A wide-angle full-body environmental portrait at Saint Catherine’s Monastery. The person has authentic features, looking directly at the camera. The background shows the massive 6th-century fortress walls, the burning bush courtyard, and the towering granite peaks of Mount Sinai under a vibrant sky. Rich environmental focus.",
maleClothingIds: [
  "Sinai Monastery Robe: A long heavy undyed wool tunic with broad dark clavi stripes on each shoulder and tapestry-woven orbiculi roundels near the hem. A thick leather belt at the waist. Mandatory Headwear: A dark grey linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by a gold and black geometric zigzag crown headband.",
  "Byzantine Pilgrim's Tunic: A long deep navy blue wool tunic with gold-yellow clavi stripes and square tabulae on the shoulders with cross and geometric motifs. A woven wool sash at the waist. Mandatory Headwear: A navy linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a gold and black geometric zigzag crown headband.",
  "Desert Traveler's Tunic: A long dusty off-white linen tunic with narrow brown clavi stripes and simple orbiculi roundels at the hem. A worn leather belt at the waist. Mandatory Headwear: A loose off-white linen veil covering the top of the head only, with the fabric falling straight down the back like a cape, completely clear of the face, ears, and neck, secured by a gold and black geometric zigzag crown headband.",
],
femaleClothingIds: [
  "Sinai Pilgrim Woman's Robe: A long ankle-length heavy undyed wool T-shaped robe with broad dark clavi stripes on each shoulder and tapestry-woven orbiculi roundels near the hem with abstract monochrome interlace and stepped cross patterns. Very wide sleeves with geometric embroidery along the seams. A thick leather belt at the waist. Closed leather shoes. Mandatory Headwear: A dark grey linen veil fully covering all hair, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Byzantine Coptic Noblewoman's Tunic: A long ankle-length deep navy blue wool tunic with gold-yellow clavi stripes and square tabulae on the shoulders woven with abstract Coptic cross and repeating geometric diamond motifs. Wide sleeves with tapestry-woven cuffs. A woven wool sash at the waist. Closed leather shoes. Mandatory Headwear: A navy linen veil fully covering all hair, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
  "Desert Traveler Woman's Tunic: A long ankle-length dusty off-white linen tunic with narrow brown clavi stripes and simple geometric orbiculi roundels at the hem. Very wide plain sleeves with abstract zigzag embroidery along the shoulder seams. A worn leather belt at the waist. Closed leather shoes. Mandatory Headwear: A loose off-white linen veil fully covering all hair, falling straight down the back like a cape, completely clear of the face, ears, and neck, held by a simple gold circlet headband.",
],
      }
    ],
    stamps: [
      "./Stamps/Coptic/1.png",
      "./Stamps/Coptic/2.png",
      "./Stamps/Coptic/3.png"
    ],
    frames: [
      "./Frames/Coptic/1.png"
    ]
  },
  {
    id: EraId.ISLAMIC_EGYPT,
    name: "Islamic Golden Age",
    description: "Step into the vibrant culture of medieval Cairo (c. 7th–16th century AD).",
    previewImage: "./Islamic-Preview.png",
    scenery: [
      {
        name: "Mosque of Amr ibn al-As",
        prompt: "A wide-angle full-body environmental portrait in the open sahn of the Mosque of Amr ibn al-As. The person has authentic Medieval Arab features, looking directly at the camera. The background features a forest of ancient marble columns, pointed arches with stucco friezes, and a glimpse of the wooden minbar. Sunlight filters through the geometric rooftop. Rich, era-appropriate architecture.",
       maleClothingIds: [
  "Abbasid Scholar: A long ankle-length fine white Egyptian linen qamis (shirt-tunic) with wide sleeves, worn under a long ruby silk outer robe (Jubba) with gold Tiraz band embroidered with Kufic calligraphy along the right sleeve. A wide leather belt cinched at the waist. Leather pointed shoes. Mandatory Headwear: A tall cylindrical white taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large white linen Imama turban wound neatly around the base of the cap, completely hiding all hair.",
  "Abbasid Merchant: A long ankle-length natural flax-colored Egyptian linen qamis with wide sleeves, worn under a deep indigo-blue cotton outer robe (Rida) with a horizontal Tiraz band of gold embroidery at the sleeve cuffs. A thick woven fabric sash at the waist. Leather shoes. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large cream-colored linen turban wound firmly around the base, completely hiding all hair.",
  "Abbasid Dignitary: A long ankle-length fine white linen qamis with wide sleeves, worn under a heavy black silk outer robe (Qaba) with a wide gold Tiraz band of Kufic calligraphy embroidered along the right sleeve. A wide gold-threaded fabric sash at the waist. Leather pointed shoes. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large black silk turban wound elaborately around the base, completely hiding all hair.",
  "Fatimid Explorer: A long sand-colored linen qamis with narrow sleeves, worn under a dark leather vest with golden geometric buttons. A broad fabric sash with complex interlace patterns. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair, wrapped with a sand-colored silk turban, completely hiding all hair.",
],

femaleClothingIds: [
  "Abbasid Noblewoman: A long ankle-length spacious white Egyptian Dabiqi linen thawb with wide boxy sleeves, embroidered along the sleeve cuffs and neckline with gold Kufic calligraphy Tiraz bands. Worn under a long flowing black silk outer wrap (Izar) draped elegantly over the shoulders. A gold embroidered waist sash (Wasat). Gold chain necklace with a pendant teardrop ruby. Gold drop earrings with pearl inlay. Gold bangles stacked on both wrists. Leather pointed shoes. Mandatory Headwear: A soft black silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Fatimid Merchant's Wife: A long ankle-length loose deep indigo-blue cotton thawb with wide sleeves, embroidered along the neckline and cuffs with gold geometric Tiraz bands. Worn under a large enveloping cream-colored linen outer mantle (Melaya) draped over the shoulders. A wide woven silk sash at the waist. Gold filigree necklace with turquoise pendants. Gold hoop earrings with turquoise inlay. Gold bangles on both wrists. Leather shoes. Mandatory Headwear: A soft cream linen hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Abbasid Scholar's Wife: A long ankle-length fine white silk thawb with wide sleeves and a round neck opening, with gold thread embroidery along all seams and a gold Tiraz band of Kufic calligraphy at the sleeve cuffs. Worn under a long deep saffron-yellow silk outer robe (Rida) draped over the shoulders. A wide gold-threaded silk sash at the waist. Pearl and gold collar necklace. Long dangling gold and pearl earrings. Pearl and gold bangles on both wrists. Fine leather pointed shoes. Mandatory Headwear: A soft white silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Fatimid Poetess: A long flowing emerald-green silk thawb with tight sleeves, featuring gold brocade panels at the shoulders. A narrow gold belt at the waist and long pearl earrings. Mandatory Headwear: A soft emerald-green silk hijab veil fully covering all hair with NO hair visible whatsoever, loosely draped around the head.",
],

      },
      {
        name: "Cairo Citadel Battlements",
        prompt: "A wide-angle full-body environmental portrait on the limestone battlements of the Cairo Citadel. Cinematic volumetric lighting highlights the authentic features. The background shows the formidable Saladin walls, the silver domes and slender minarets of the mosque, and a wide view of the vibrant medieval city. Professional cinematic pose.",
     maleClothingIds: [
  "Mamluk Commander: A long ankle-length fine white linen qamis with wide sleeves, worn under a heavy deep crimson silk brocade Qaba coat with gold geometric pattern weave and wide sleeves. A wide decorated metallic belt at the waist. Leather boots. Mandatory Headwear: A tall red cylindrical Kalawta cap fully covering all hair with NO hair visible whatsoever, wrapped with a thick white linen turban wound in large, elaborate folds around the base of the cap, completely hiding all hair.",
  "Mamluk Official: A long ankle-length white cotton qamis with wide sleeves, worn under a heavy olive-green wool outer mantle (Aba) with wide sleeves and a horizontal gold embroidered Tiraz band at the cuffs. A wide leather belt at the waist. Leather shoes. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large white linen turban wound in neat overlapping folds completely hiding all hair.",
  "Ottoman Court Dignitary: A long ankle-length fine white linen qamis, worn under a long floor-length Ottoman kaftan in deep garnet silk brocade with tulip and geometric motifs, wide hanging sleeves revealing the white qamis underneath. A wide sash of gold-threaded silk at the waist. Leather pointed shoes. Mandatory Headwear: A tall elongated cylindrical Ottoman kavuk cap fully covering all hair with NO hair visible whatsoever, wrapped with a large white silk turban wound in the Ottoman court style completely hiding all hair.",
],
femaleClothingIds: [
  "Mamluk Aristocrat: A long ankle-length heavy emerald green silk brocade Qaba coat with narrow sleeves embroidered along the cuffs with pearls and rubies set into gold thread work. A wide gold-threaded silk sash at the waist. A heavy gold collar necklace inlaid with emeralds and rubies. Long dangling gold and ruby drop earrings. Gold filigree bangles stacked on both wrists. Fine leather pointed shoes. Mandatory Headwear: A soft emerald green silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Cairene Noblewoman: A long ankle-length structural crimson velvet Qaba coat with narrow sleeves embroidered with gold thread geometric patterns and pearl embellishments along the cuffs. A wide decorated gold sash at the waist. A multi-strand gold and carnelian bead necklace. Long dangling gold and carnelian earrings. Gold cuff bracelets engraved with geometric patterns on both wrists. Fine leather shoes. Mandatory Headwear: A soft deep crimson silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Ottoman Cairene Lady: A long ankle-length deep navy blue Ottoman silk entari with wide sleeves embroidered with gold tulip and geometric motifs along the cuffs and hem. Worn under a long floor-length sleeveless deep burgundy silk kaftan with gold brocade panels. A wide gold-threaded sash at the waist. A gold filigree collar necklace inlaid with sapphires. Long dangling gold and sapphire earrings. Gold bangles on both wrists. Fine leather shoes. Mandatory Headwear: A soft deep burgundy silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
],
      },
      {
        name: "Sultan Hassan Mosque",
        prompt: "A wide-angle full-body environmental portrait in the massive courtyard of the Sultan Hassan Mosque-Madrassa. The person has authentic features, looking directly at the camera. The background features a towering stone iwan, colorful marble inlays, and ornate glass lamps (mishkats) hanging from long chains. Highly detailed Mamluk historical environment.",
     maleClothingIds: [
  "Mamluk Sultan's Vizier: A long ankle-length fine white Egyptian linen qamis, worn under a magnificent heavy emerald green silk brocade Qaba coat with wide sleeves and an elaborate gold Tiraz band of Kufic calligraphy embroidered along the right sleeve cuff. A wide gold-threaded silk sash at the waist. Fine leather pointed shoes. Mandatory Headwear: A tall red cylindrical Kalawta cap fully covering all hair with NO hair visible whatsoever, wrapped with a very large white silk turban wound in grand ceremonial Mamluk folds around the base of the cap, completely hiding all hair.",
  "Mamluk Qadi (Judge): A long ankle-length fine white linen qamis with wide sleeves, worn under a heavy black wool Farajiyya outer robe with wide sleeves. A wide woven wool sash at the waist. Leather shoes. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large black wool turban wound in the scholarly Qadi style completely hiding all hair — as depicted in the Maqamat Al-Hariri manuscripts.",
  "Mamluk Scholar: A long ankle-length white linen qamis with wide sleeves, worn under a heavy cream-colored cotton outer robe (Farajiyya) with a wide gold Tiraz embroidered band along the sleeve cuffs. A wide leather belt at the waist. Leather pointed shoes. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large white linen turban wound in neat scholarly folds completely hiding all hair.",
],
femaleClothingIds: [
  "Mamluk Sultan's Wife: A long ankle-length magnificent heavy deep royal blue silk brocade Qaba coat with narrow sleeves densely embroidered along the cuffs with pearls, emeralds, and gold thread Kufic calligraphy Tiraz bands. A wide gold-threaded silk sash at the waist. A magnificent multi-strand gold collar necklace inlaid with emeralds and lapis lazuli. Long dangling gold and emerald drop earrings. Gold filigree bangles stacked on both wrists. Fine leather pointed shoes. Mandatory Headwear: A soft royal blue silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Mamluk Court Lady: A long ankle-length heavy deep purple velvet Qaba coat with narrow sleeves embroidered with gold thread geometric and floral patterns along the cuffs and hem. A wide woven gold sash at the waist. A gold necklace with large teardrop amethyst and pearl pendants. Long dangling gold and amethyst earrings. Gold cuff bracelets inlaid with amethysts on both wrists. Fine leather shoes. Mandatory Headwear: A soft deep purple silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Mamluk Scholar's Wife: A long ankle-length fine ivory white Egyptian linen thawb with wide boxy sleeves embroidered along the cuffs and neckline with gold Tiraz bands of Kufic calligraphy. Worn under a long deep forest green silk outer Qaba coat with narrow sleeves. A wide woven silk sash at the waist. A gold chain necklace with pearl and turquoise pendants. Long dangling gold and turquoise earrings. Gold bangles on both wrists. Fine leather shoes. Mandatory Headwear: A soft forest green silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
],

      },
      {
        name: "Ibn Tulun Mosque",
        prompt: "A close-up chest-up portrait at the Ibn Tulun Mosque. The individuals feature authentic appearances, looking directly at the camera. The background features the unique pointed arches with delicate stucco calligraphic carvings and the iconic spiral minaret standing tall against the sky. Deep, rich environmental detail.",
     maleClothingIds: [
  "Fatimid Nobleman: A long ankle-length fine white Egyptian Dabiqi linen qamis with wide sleeves and a vertical round collar, worn under a deep saffron-yellow silk outer robe (Rida) with elaborate woven geometric patterns and a gold Tiraz band of Kufic calligraphy along the right sleeve. A wide fabric sash at the waist. Leather pointed shoes. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large white linen Imama turban wound in neat round folds completely hiding all hair.",
  "Fatimid Merchant: A long ankle-length natural flax-colored Egyptian linen qamis with wide sleeves, worn under a deep cobalt-blue cotton outer robe with a wide horizontal Tiraz gold embroidery band at the sleeve cuffs. A thick woven sash at the waist. Leather shoes. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large cream linen turban wound firmly and neatly completely hiding all hair.",
  "Abbasid Court Official: A long ankle-length fine white linen qamis with wide sleeves, worn under a heavy black silk Qaba coat with wide sleeves and a prominent gold Tiraz band of Kufic calligraphy embroidered along the right sleeve — the black robes of the Abbasid official class. A wide gold-threaded fabric sash at the waist. Leather pointed shoes. Mandatory Headwear: A tall cylindrical taqiyya cap fully covering all hair with NO hair visible whatsoever, wrapped with a large black silk turban wound in the official Abbasid court style completely hiding all hair.",
],
femaleClothingIds: [
  "Fatimid Caliph's Lady: A long ankle-length magnificent fine white Egyptian Dabiqi silk thawb with wide boxy sleeves, densely embroidered with gold thread geometric star and arabesque patterns, with gold Tiraz bands of Kufic calligraphy along the sleeve cuffs. A wide gold-threaded silk Wasat sash at the waist. A magnificent multi-strand gold collar necklace inlaid with rubies and pearls. Long dangling gold and ruby earrings. Gold filigree bangles densely stacked on both wrists. Fine leather pointed shoes. Mandatory Headwear: A soft white silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Fatimid Noblewoman: A long ankle-length loose deep saffron-yellow silk thawb with wide sleeves embroidered along the neckline and cuffs with gold geometric Tiraz bands and arabesque patterns. Worn under a long flowing deep burgundy silk outer Rida wrap draped over the shoulders. A wide woven silk sash at the waist. A gold filigree necklace with carnelian and pearl pendants. Long dangling gold and carnelian earrings. Gold bangles stacked on both wrists. Fine leather shoes. Mandatory Headwear: A soft deep burgundy silk hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
  "Abbasid Merchant's Wife: A long ankle-length natural flax-colored Egyptian linen thawb with wide boxy sleeves embroidered along the cuffs with a gold Kufic calligraphy Tiraz band. Worn under a long deep cobalt-blue cotton outer wrap (Izar) draped elegantly over the shoulders. A wide woven linen sash at the waist. A gold chain necklace with turquoise and lapis lazuli pendants. Long dangling gold and lapis lazuli earrings. Gold bangles on both wrists. Fine leather shoes. Mandatory Headwear: A soft cobalt-blue linen hijab veil fully covering all hair with NO hair visible whatsoever — not a single strand — loosely draped around the head and falling in soft folds around the neck, completely clear of the face.",
],
      }
    ],
    stamps: [
      "./Stamps/Islamic/1.png",
      "./Stamps/Islamic/2.png",
      "./Stamps/Islamic/3.png",
      "./Stamps/Islamic/4.png"
    ],
    frames: [
      "./Frames/Islamic/1.png"
    ]
  },
  {
    id: EraId.MODERN_EGYPT,
    name: "Modern Egypt",
    description: "Experience the vibrant energy and leisure of contemporary Egypt.",
    previewImage: "./Modern-Preview.png",
    scenery: [
      {
        name: "Nile River Felucca",
        prompt: "A traditional wooden Felucca boat sailing silently on the Nile River at the peak of golden hour. The water is like liquid gold, rippling gently against the hull. In the background, the modern Cairo skyline, the iconic Cairo Tower, and the Grand Hyatt hotel are bathed in a warm orange glow. The white canvas sail of the boat catches the setting sun, creating a majestic and peaceful atmosphere. The boat environment is private and clear of any background people.",
        maleClothingIds: MALE_WARDROBE_STYLES,
        femaleClothingIds: FEMALE_WARDROBE_STYLES
      },
      {
        name: "Luxor Hot Air Balloon",
        prompt: "Inside a colorful hot air balloon basket floating high above the West Bank of Luxor at a misty sunrise. The golden light hits the rugged limestone mountains of the Valley of the Kings. Below, a patchwork of vibrant green sugarcane fields is dotted with ancient ruins and small villages. A soft morning haze hangs over the landscape, and other balloons are visible as tiny dots in the distance. The interior of the basket is private and clear of any extra people.",
        maleClothingIds: MALE_WARDROBE_STYLES,
        femaleClothingIds: FEMALE_WARDROBE_STYLES
      },
      {
        name: "Khan El Khalili Bazaar",
        prompt: "Deep within the heart of a quiet Khan El Khalili bazaar. The background features a breathtaking array of hundreds of glowing brass lanterns and ornate lamps reflecting off ancient stone walls. Narrow cobblestone alleys are lined with colorful spice mounds, intricate silver jewelry, and antique artifacts. The soft steam from a nearby tea stall and the warm, inviting glow of El Fishawi cafe create an incredibly rich atmosphere. The entire market setting is empty of any other people or pedestrians.",
        maleClothingIds: MALE_WARDROBE_STYLES,
        femaleClothingIds: FEMALE_WARDROBE_STYLES
      },
      {
        name: "Grand Egyptian Museum",
        prompt: "Inside the magnificent Grand Egyptian Museum (GEM) at the grand atrium. The background features the colossal granite statue of Ramesses II standing in the sun-drenched space, with the modern architectural triangulated glass facade and the Great Pyramids visible in the distance through the window. The space is vast, clean, and futuristic. The museum environment is entirely empty of other tourists or background figures.",
        maleClothingIds: MALE_WARDROBE_STYLES,
        femaleClothingIds: FEMALE_WARDROBE_STYLES
      }
    ],
    stamps: [
      "./Stamps/Modern-Egypt/1.png"
    ],
    frames: [
      "./Frames/Modern-Egypt/1.png",
      "./Frames/Modern-Egypt/2.png"
    ]
  }
];