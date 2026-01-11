import { EraData, EraId } from './types';

export const SHARED_PROMPT_INSTRUCTIONS = `A hyper-realistic, high-resolution portrait-oriented photo. Each person’s appearance must accurately match the source photo, fully preserving identity, natural skin tone, ethnic features, gender, age, facial structure, and expression. The final image should look like a modern professional photoshoot with an authentic historical theme. Everything must appear natural, cohesive, and true to the original individuals. No cartoon style, no distortion.`;

export const IDENTITY_PRESERVATION_GUIDE = `REQUIREMENTS:
- KEEP the original faces and identity visible and recognizable. Do NOT alter features.
- Change ONLY clothing, hair, and accessories to be historically accurate.
- Photorealistic, high quality, 9:16 portrait.
- Lighting must be cinematic, volumetric, and natural, casting realistic shadows on the clothing layers.`;

export const ERAS: EraData[] = [
  {
    id: EraId.OLD_EGYPT,
    name: "Old Kingdom",
    description: "Journey back to the time of Pharaohs, majestic architecture, and sacred art (c. 2686–2181 BC).",
    previewImage: "./Old-Egypt-Preview.png",
    scenery: [
      {
        // Reference: Philae Royal Quay
        // Fix: Wide-angle, Royal Bark.
        prompt: "A wide-angle full-body environmental portrait on the stone quay of the Philae Temple. The subject stands centrally, allowing a view of the surroundings. To their side rests a magnificent gilded Royal Bark (ritual boat) on a sledge. The background features towering temple Pylons covered in distinct Egyptian reliefs and the wide blue Nile. Bright, expansive, and regal.",
        maleClothingIds: [
          "Pharaoh's Regalia: A bare chest adorned with a massive gold Wesekh collar (lapis/turquoise), heavy gold armbands, and a stiff pleated white Shendyt kilt with a gold central belt panel. Headwear: The striped Nemes headdress with Uraeus (cobra). Footwear: Intricate gold leather royal sandals.",
          "High Priest of Amun: A pristine white starched linen kilt. Worn with a ceremonial leopard-skin sash (gold-clawed) draped precisely over one shoulder. Gold wrist cuffs and a heavy gold pectoral necklace. Shaved head. Footwear: Fine leather sandals.",
          "Royal Fan Bearer: A bare torso with a stiff white linen kilt and a broad sash across the chest. He holds a tall ceremonial Ostrich Feather Fan (Flabellum) standard. Wears a gold collar. Footwear: Sturdy leather sandals."
        ],
        femaleClothingIds: [
          "Great Royal Wife: A tight-fitting, ankle-length white linen Kalasiris (sheath). Worn with the elaborate gold Vulture Headdress and a massive gold Usekh collar. Footwear: Gold sandals.",
          "Royal Princess: A sheath dress of the finest white linen, adorned with a wide collar of gold and turquoise faience. Worn with a heavy Black Tripartite Wig fused with gold rings. Footwear: Beaded leather sandals.",
          "High Priestess: A tight-fitting pleated linen sheath dress with a heavy gold sash. She wears a solid gold circlet featuring a lotus motif and a heavy jeweled collar. Footwear: Fine leather sandals."
        ]
      },
      {
        // Reference: Great Sphinx Procession
        // Fix: Wide-angle, Egyptian Obelisks.
        prompt: "A majestic wide-angle full-body portrait with the Great Sphinx of Giza filling the background. The subject stands on a wide paved processional path lined with small alabaster sphinxes. The Sphinx texture is sharp limestone. In the foreground, tall gold-capped obelisks frame the shot. Harsh desert sunlight glints off heavy gold jewelry. Monumental scale.",
        maleClothingIds: [
          "Warrior Pharaoh: A ceremonial Golden Corselet (armor made of gold scales) worn over a tunic. Broad gold armbands, a patterned leather battle belt with gold lions, and the Blue War Crown (Khepresh). Footwear: High-strapped leather battle sandals.",
          "Royal Overseer of Works: A fine pleated linen cape covering the shoulders, worn over a starched triangular kilt. A heavy gold chain of office with a large scarab pendant. Shoulder-length black formal wig with a gold Uraeus circlet. Footwear: Sturdy leather sandals.",
          "Royal Treasurer: A distinct high-waisted linen garment reaching the ankles, with a stiff triangular front panel. Carrying a gold seal and a papyrus scroll. Heavy gold armlets. Footwear: Fine leather sandals."
        ],
        femaleClothingIds: [
          "Royal Matriarch: A stiff pleated linen gown in cream with distinct gold thread embroidery on the hem and sleeves. A broad gold Wesekh collar and a gold Modius (crown base) topped with tall plumes. Footwear: Gold sandals.",
          "Palace Noblewoman: A fitted sheath dress made of very fine pleated linen. Worn with a heavy gold headband featuring a central Uraeus cobra and heavy gold hoop earrings. Footwear: Fine leather sandals.",
          "Queen's Attendant: A tight-fitting white sheath dress with a vibrant gold-and-lapis patterned sash, a heavy gold pectoral necklace, and a long heavy black wig with gold tubes. Footwear: Embellished leather sandals."
        ]
      },
      {
        // Reference: Karnak Hypostyle Hall
        // Fix: Wide-angle, Gold Offering Tables.
        prompt: "A cinematic wide-angle full-body portrait inside the Hypostyle Hall of Karnak Temple. The subject is small relative to the towering columns covered in painted hieroglyphs. They stand next to massive solid gold offering tables reflecting the light. In the background, electrum-plated (gold/silver mix) temple doors shine. The air is filled with incense smoke.",
        maleClothingIds: [
          "Ceremonial Pharaoh: A long, sheer pleated linen robe worn over a gold-patterned Shendyt kilt. Adorned with a massive gold collar, gold bracelets, and the Double Crown (Pschent). Footwear: Royal gold sandals.",
          "High Priest of Karnak: A starched white linen tunic with stiff pleated sleeves. A massive gold pectoral necklace featuring the winged Isis. Shaved head. Footwear: Fine leather sandals.",
          "Royal Architect: A bare torso with a white linen kilt, carrying a gold cubit rod (measuring tool) and a scroll. Wearing a simple gold amulet necklace. Footwear: Leather sandals."
        ],
        femaleClothingIds: [
          "God's Wife of Amun: A fitted linen sheath covered by a fine pleated overlay. Worn with a heavy gold collar featuring the Eye of Horus and a tall plumed gold headdress. Footwear: Gold sandals.",
          "Royal Daughter: A delicate form-fitting dress of fine linen with a sash of gold woven fabric. A side-lock wig (youthful royal style) made of gold and lapis, and heavy gold bracelets. Footwear: Jeweled sandals.",
          "Temple Songstress of Amun: A fitted sheath dress of fine white linen, worn with a heavy gold collar and a gold circlet with real lotus flowers inserted. Footwear: Fine sandals."
        ]
      },
      {
        // Reference: Palace Terrace
        // Fix: Wide-angle, Lion Throne, Lotus Columns.
        prompt: "A wide-angle full-body portrait on the Grand Riverside Terrace of the Royal Palace. The subject stands centrally on the polished marble floor. To the side is a magnificent Golden Lion Throne and tall golden candelabras. In the background, painted Lotus Columns support the roof, and the Nile flows in the distance. The scene is open and airy.",
        maleClothingIds: [
          "Palace Pharaoh: A distinctive Golden Pleated Shoulder Cape worn over a bare chest, paired with a long fine linen kilt with a stiff gold front panel. A heavy gold Wesekh collar. Footwear: Gold sandals with upturned toes.",
          "Royal Courtier: A fine linen tunic with wide pleated sleeves, adorned with a wide beaded collar in lapis and gold. Short formal curled wig with a gold headband. Footwear: Fine leather sandals.",
          "Crown Prince: A bare torso with a white kilt featuring a thick gold-patterned border, a distinct gold side-lock wig, and a broad collar of turquoise and carnelian. Footwear: Leather sandals."
        ],
        femaleClothingIds: [
          "Queen on the Terrace: A fitted linen sheath gown woven with shimmering gold thread. A heavy wig adorned with a gold circlet and a ceremonial scent cone. Massive gold earrings. Footwear: Gold-leafed sandals.",
          "Royal Harpist: A fine pleated linen dress over a sheath, with a wide gold sash. Gold hoop earrings and a complex braided wig with gold tubes. Footwear: Beaded sandals.",
          "Royal Nurse/Matron: A high-necked fine linen dress with gold embroidery on the chest, a heavy red carnelian and gold necklace, and a Tripartite black wig. Footwear: Simple leather sandals."
        ]
      },
      {
        // Reference: Luxor Temple
        // Fix: Wide-angle, Golden Statues.
        prompt: "A dramatic wide-angle full-body portrait at Luxor Temple. The subject stands in the center of the vast forecourt. Behind them loom the colossal golden-granite statues of the Pharaoh. Priests carry a golden processional bark in the distance. Iron braziers burn brightly, illuminating the carved hieroglyphs on the walls.",
        maleClothingIds: [
          "Processional Pharaoh: A gold-embroidered linen tunic covered by a massive royal gold collar. Heavy gold wrist gauntlets, a gold-patterned kilt, and the striped Nemes headdress. Footwear: Heavy royal sandals.",
          "High Priest in Procession: A clean shaven head, a full-length white linen robe draped across the body with a gold sash, and a gold pectoral necklace. Footwear: Reed sandals.",
          "Temple Standard Bearer: A bare torso with a stiff white linen kilt. Carrying a tall pole topped with a gold image of the Jackal (Wepwawet). Heavy gold armbands. Footwear: Sturdy leather sandals."
        ],
        femaleClothingIds: [
          "Queen in Procession: A fitted white sheath gown overlaid with a detailed sash of gold beads. A Vulture headdress and heavy gold arm cuffs. Footwear: Gold sandals.",
          "Noble Attendant: A simple, elegant fitted white dress with a wide gold patterned belt, carrying a gold sistrum (ritual rattle). Footwear: Leather sandals.",
          "Temple Singer of Luxor: A tight-fitting linen sheath dress with a heavy gold Menat necklace (ritual counterpoise), a long flowing wig with gold strands, and gold bracelets. Footwear: Beaded sandals."
        ]
      },
      {
        // Reference: Tomb Treasure Chamber
        // Fix: Wide-angle, Gold Treasures.
        prompt: "A wide-angle full-body portrait inside a newly opened Royal Tomb. The walls are covered in vibrant paintings and gold leaf. The subject stands amidst a hoard of treasures: golden shrines, dismantled gold chariots, and life-size gold guardian statues. The floor is covered in gold artifacts. The ultimate discovery scene.",
        maleClothingIds: [
          "Pharaoh in the Tomb: A semi-sheer pleated linen robe worn over a white kilt with a gold apron. Heavy gold collar, gold armbands, and the Blue Crown (Khepresh). Footwear: Gold sandals.",
          "Royal Tomb Architect: A durable white linen tunic with a stiffened front, a leather belt holding gold tools, gold signet rings, and a formal wig. Footwear: Leather sandals.",
          "High Priest of Anubis: A black linen robe (ceremonial for funerary rites) worn with a gold jackal mask pushed up on the head, and heavy gold amulets. Footwear: Black leather sandals."
        ],
        femaleClothingIds: [
          "Royal Mourner Queen: A fitted white linen sheath dress, a gold diadem with mourning ribbons, and a fine linen veil draped over the hair. Footwear: Gold sandals.",
          "Princess in the Tomb: A pleated linen gown with a narrow gold belt, a gold headband with a lotus, and a massive gold pectoral necklace featuring winged goddesses. Footwear: Fine leather sandals.",
          "Noblewoman of the Necropolis: A form-fitting white dress worn with a fine pleated linen shawl with heavy gold trim draped over the shoulders. Footwear: Sturdy walking sandals."
        ]
      },
      {
        // Reference: Hatshepsut Terrace
        // Fix: Wide-angle, Sphinxes, Polish.
        prompt: "A symmetrical wide-angle full-body portrait at the Temple of Hatshepsut. The subject stands centrally on the wide stone terrace. Flanking them are gold-and-lapis sphinx statues. The background features the rhythmic rows of square columns stretching far back against the limestone cliff. Majestic, pristine, and rich.",
        maleClothingIds: [
          "Regal Builder Pharaoh: A fine pleated linen tunic worn under a massive broad collar of gold and lapis lazuli. Double-pleated Shendyt kilt, and the white Hedjet crown with a gold Uraeus. Footwear: Royal sandals.",
          "Noble Overseer: A white linen robe draped toga-style over a tunic, a heavy gold scribe's pendant, gold rings, and a short formal wig. Footwear: Leather sandals.",
          "Royal Scribe of the Temple: A knee-length starched linen tunic, a gold stylus tucked behind the ear, and heavy gold amulets. Footwear: Reed sandals."
        ],
        femaleClothingIds: [
          "The Great Queen (Hatshepsut Style): A fitted pleated Kalasiris with a gold sash, the Nemes headdress (masculine style) or Vulture Crown, and heavy gold jewelry including arm cuffs. Footwear: Gold sandals.",
          "Court Lady: A tight-fitting white linen sheath dress with a heavy beaded collar in gold and turquoise, a gold lotus-flower headpiece, and gold bracelets. Footwear: Leather sandals.",
          "High Priestess of Hathor: A leopard-skin sash worn over a fitted linen dress, a gold uraeus headband, and a gold sistrum (rattle) held in hand. Footwear: Beaded sandals."
        ]
      },
      {
        // Reference: Abu Simbel
        // Fix: Wide-angle, Painted Statues, No "Regional" outfit.
        prompt: "A powerful low-angle wide shot at Abu Simbel. The subject is small compared to the massive stone legs of the Ramses II statue behind them. The statue base has details painted in gold and color. The red sandstone glows in the sun. The composition emphasizes the monumental scale of the temple facade.",
        maleClothingIds: [
          "Warrior Pharaoh: A Golden Corselet armor worn over a tunic. Gold armguards, a broad collar, a kilt with a gold-studded belt, and the Blue War Crown (Khepresh). Footwear: Battle sandals with gold greaves.",
          "Royal Vizier of the South: A distinct high-waisted white linen garment reaching the ankles, suspended by a neck strap. Heavy gold armlets and a gold belt. Footwear: Fine leather sandals.",
          "Royal Cup Bearer: A bare torso with a stiff white linen kilt. Carrying a golden vessel. Heavy gold collar and wrist cuffs. Footwear: Leather sandals."
        ],
        femaleClothingIds: [
          "Temple Queen (Nefertari Style): A fitted white dress with heavy gold borders, a tall gold-feathered headdress, and a heavy gold collar. Footwear: Gold sandals.",
          "Noble Traveler: A sturdy pleated linen dress with a wide gold protective sash, a heavy wig for sun protection, and large gold hoop earrings. Footwear: Leather sandals.",
          "Princess of the Two Lands: A fitted white linen sheath dress adorned with a golden beaded net (diamond pattern) over the fabric. Worn with ivory and gold jewelry. Footwear: Beaded sandals."
        ]
      }
    ],
    stamps: [
      "./Stamps/Old-Egyptian/1.png",
      "./Stamps/Old-Egyptian/2.png",
      "./Stamps/Old-Egyptian/3.png"
    ]
  },
  {
    id: EraId.COPTIC_EGYPT,
    name: "Coptic Egypt",
    description: "Step into the era of monastic life, intricate textiles, and native Egyptian art (c. 3rd–7th Century AD).",
    previewImage: "./Coptic-Preview.png",
    scenery: [
      {
        // 1. DEIR MAR GIRGIS (Church of St. George)
        // Focus: The unique ROUND structure on the ROMAN TOWER base. Red brick & stone texture.
        prompt: "A wide-angle landscape photograph capturing the full circular form of the Church of St. George (Mar Girgis) in Old Cairo. The subject stands on the ground level pavement. The church is visibly built upon the massive, ancient stone foundations of a round Roman fortress tower. The upper structure is a mix of weathered red brick and intricate stone patterning, capped by a dome. The entrance is integrated into the curve. The atmosphere is ancient and imposing.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic reaching the knees. It features distinct vertical woven bands in red and beige running down the front. Belted with a leather cord. Footwear: Woven sandals.",
          "Merchant's Tunic: A fine linen tunic in natural flax color. It has broad vertical stripes (Clavi) in purple wool running from shoulder to hem. Footwear: Leather shoes.",
          "Monk's Habit: A rough, dark brown wool tunic tied with a rope belt. He wears a leather hood. Footwear: Woven palm-fiber sandals."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen tunic reaching the ankles. It features a square-shaped embroidered neckline in dark red geometric patterns. Her hair is braided. Footwear: Reed sandals.",
          "Decorated Tunic: A vibrant saffron-yellow tunic. It features a heavy woven collar in black and red wool. She wears silver bracelets. Footwear: Dyed leather shoes.",
          "Simple Tunic: A sturdy linen tunic dyed in a faded terracotta color. It features woven roundels (circles) on the knees in green wool. Footwear: Sturdy sandals."
        ]
      },
      {
        // 2. THE HANGING CHURCH (Al-Muallaqa)
        // Focus: Built OVER the gatehouse, ancient facade texture.
        prompt: "A wide-angle landscape photograph in the forecourt of the Hanging Church. The subject stands on the flagstones. Behind them, the facade of the church rises, built directly over the ancient Roman gatehouse of Babylon Fortress (the 'hanging' effect). The facade features twin bell towers, dark wooden lattice screens, and ancient Coptic inscriptions weathered into the stone. Palm trees frame the historic structure.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic reaching the knees. It features distinct vertical woven bands in red and beige running down the front. Belted with a leather cord. Footwear: Woven sandals.",
          "Merchant's Tunic: A fine linen tunic in natural flax color. It has broad vertical stripes (Clavi) in purple wool running from shoulder to hem. Footwear: Leather shoes.",
          "Monk's Habit: A rough, dark brown wool tunic tied with a rope belt. He wears a leather hood. Footwear: Woven palm-fiber sandals."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen tunic reaching the ankles. It features a square-shaped embroidered neckline in dark red geometric patterns. Her hair is braided. Footwear: Reed sandals.",
          "Decorated Tunic: A vibrant saffron-yellow tunic. It features a heavy woven collar in black and red wool. She wears silver bracelets. Footwear: Dyed leather shoes.",
          "Simple Tunic: A sturdy linen tunic dyed in a faded terracotta color. It features woven roundels (circles) on the knees in green wool. Footwear: Sturdy sandals."
        ]
      },
      {
        // 3. DEIR SAM3AN KHARAZ (St. Simon the Tanner Cave Church)
        // Focus: Massive cave mouth, carvings inside rock, amphitheater scale.
        prompt: "An ultra-wide landscape photograph inside the massive open-air Cave Church of St. Simon in Mokattam. The subject stands on the rock floor. The entire enormous natural cave mouth frames the scene. Inside, huge reliefs of Coptic saints and biblical scenes are carved directly into the sheer cliff walls. Tiers of stone seating curve around the natural amphitheater. The scale is overwhelming and rugged.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic reaching the knees. It features distinct vertical woven bands in red and beige running down the front. Belted with a leather cord. Footwear: Woven sandals.",
          "Merchant's Tunic: A fine linen tunic in natural flax color. It has broad vertical stripes (Clavi) in purple wool running from shoulder to hem. Footwear: Leather shoes.",
          "Monk's Habit: A rough, dark brown wool tunic tied with a rope belt. He wears a leather hood. Footwear: Woven palm-fiber sandals."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen tunic reaching the ankles. It features a square-shaped embroidered neckline in dark red geometric patterns. Her hair is braided. Footwear: Reed sandals.",
          "Decorated Tunic: A vibrant saffron-yellow tunic. It features a heavy woven collar in black and red wool. She wears silver bracelets. Footwear: Dyed leather shoes.",
          "Simple Tunic: A sturdy linen tunic dyed in a faded terracotta color. It features woven roundels (circles) on the knees in green wool. Footwear: Sturdy sandals."
        ]
      },
      {
        // 4. RELIGIOUS COMPLEX ALLEYS (Old Cairo)
        // Focus: Narrow, deep, textured stone walls, ancient feeling.
        prompt: "A wide-angle environmental photograph within the deep, narrow alleyways of the Old Cairo Religious Complex. The subject stands between towering, rough-hewn ancient limestone walls that show centuries of wear. Stone arches connect the walls overhead. Wooden doors with heavy iron studs and faded carved Coptic geometric symbols are set into the walls. The light is diffused, creating a deep, ancient atmosphere.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic reaching the knees. It features distinct vertical woven bands in red and beige running down the front. Belted with a leather cord. Footwear: Woven sandals.",
          "Merchant's Tunic: A fine linen tunic in natural flax color. It has broad vertical stripes (Clavi) in purple wool running from shoulder to hem. Footwear: Leather shoes.",
          "Monk's Habit: A rough, dark brown wool tunic tied with a rope belt. He wears a leather hood. Footwear: Woven palm-fiber sandals."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen tunic reaching the ankles. It features a square-shaped embroidered neckline in dark red geometric patterns. Her hair is braided. Footwear: Reed sandals.",
          "Decorated Tunic: A vibrant saffron-yellow tunic. It features a heavy woven collar in black and red wool. She wears silver bracelets. Footwear: Dyed leather shoes.",
          "Simple Tunic: A sturdy linen tunic dyed in a faded terracotta color. It features woven roundels (circles) on the knees in green wool. Footwear: Sturdy sandals."
        ]
      },
      {
        // 5. THE COPTIC MUSEUM (Garden/Facade)
        // Focus: Mix of stone, wood mashrabiya, peaceful historic courtyard.
        prompt: "A wide-angle landscape photograph in the historic garden courtyard of the Coptic Museum. The subject stands on stone pavers. The main facade is a detailed mix of weathered limestone arches, intricate dark wooden Mashrabiya balconies, and inlaid stone patterns with Coptic motifs. Ancient stone columns and a dry fountain are in the foreground. It feels like a preserved ancient estate.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic reaching the knees. It features distinct vertical woven bands in red and beige running down the front. Belted with a leather cord. Footwear: Woven sandals.",
          "Merchant's Tunic: A fine linen tunic in natural flax color. It has broad vertical stripes (Clavi) in purple wool running from shoulder to hem. Footwear: Leather shoes.",
          "Monk's Habit: A rough, dark brown wool tunic tied with a rope belt. He wears a leather hood. Footwear: Woven palm-fiber sandals."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen tunic reaching the ankles. It features a square-shaped embroidered neckline in dark red geometric patterns. Her hair is braided. Footwear: Reed sandals.",
          "Decorated Tunic: A vibrant saffron-yellow tunic. It features a heavy woven collar in black and red wool. She wears silver bracelets. Footwear: Dyed leather shoes.",
          "Simple Tunic: A sturdy linen tunic dyed in a faded terracotta color. It features woven roundels (circles) on the knees in green wool. Footwear: Sturdy sandals."
        ]
      },
      {
        // 6. SAINT CATHERINE’S MONASTERY (Sinai)
        // Focus: High fortress walls, granite mountains, isolation.
        prompt: "A wide-angle landscape photograph outside the massive fortress walls of Saint Catherine’s Monastery in Sinai. The subject stands on the rugged desert ground. The granite walls are incredibly thick and high. Behind them, jagged, dark red granite mountains rise steeply against the sky. A few cypress trees are visible inside the walls. The scene is isolated, rugged, and ancient.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic reaching the knees. It features distinct vertical woven bands in red and beige running down the front. Belted with a leather cord. Footwear: Woven sandals.",
          "Merchant's Tunic: A fine linen tunic in natural flax color. It has broad vertical stripes (Clavi) in purple wool running from shoulder to hem. Footwear: Leather shoes.",
          "Monk's Habit: A rough, dark brown wool tunic tied with a rope belt. He wears a leather hood. Footwear: Woven palm-fiber sandals."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen tunic reaching the ankles. It features a square-shaped embroidered neckline in dark red geometric patterns. Her hair is braided. Footwear: Reed sandals.",
          "Decorated Tunic: A vibrant saffron-yellow tunic. It features a heavy woven collar in black and red wool. She wears silver bracelets. Footwear: Dyed leather shoes.",
          "Simple Tunic: A sturdy linen tunic dyed in a faded terracotta color. It features woven roundels (circles) on the knees in green wool. Footwear: Sturdy sandals."
        ]
      }
    ],
    stamps: [
      "./Stamps/Coptic/1.png",
      "./Stamps/Coptic/2.png",
      "./Stamps/Coptic/3.png"
    ]
  },
  {
    id: EraId.ISLAMIC_EGYPT,
    name: "Islamic Golden Age",
    description: "Step into the vibrant culture of medieval Cairo (c. 7th–16th century AD).",
    previewImage: "./Islamic-Preview.png",
    scenery: [
      {
        prompt: "A medium-shot environmental portrait of the subject standing in the vast, sunlit open courtyard of the Mosque of Amr ibn al-As. The background is crisp and highly detailed, showing the endless rows of ancient stone columns and the clear blue Egyptian sky above. The scene is bright and airy, capturing the scale of the architecture while keeping the subject well-lit and central. Photorealistic, 8k resolution, no blur.",
        // Era: Early Islamic / Rashidun (Fustat Era: Pure Linen, Simple, Utilitarian)
        maleClothingIds: [
          "Egyptian Scribe: A knee-length unbleached linen Robe (Qamis) with a simple leather belt, worn with a soft white turban wrapped loosely around a skullcap (avoiding tight wrapping).",
          "Early Scholar: A voluminous earth-toned wool outer-mantle styled with a 'Taylasan' (a large scarf draped over the head and shoulders), distinct from the later tight turbans.",
          "Merchant's outfit: A beige cotton robe with wide sleeves, a leather belt carrying a travel pouch, and a sandstone-colored fabric wrapped loosely around the head."
        ],
        femaleClothingIds: [
          "Early Cairo style: A voluminous, unbleached linen outer-wrap (Izar) draped loosely over a rust-colored under-gown, with a simple cream headscarf tied loosely to frame the face.",
          "Natural Dye outfit: A loose indigo-blue outer-robe worn over a lighter blue under-dress, with a simple linen veil draped over the hair and shoulders (no straight tunic lines).",
          "Modest earth-tone attire: A sleeveless wool over-garment in clay-brown worn over a long-sleeved beige dress, with a large, textured shawl pinned at the shoulder."
        ]
      },
      {
        prompt: "A majestic portrait taken on the high stone battlements of the Citadel of Saladin. The subject stands with the golden limestone walls behind them. The background reveals a sharp, panoramic view of medieval Cairo's skyline, with distinct minarets and domes visible in the distance (not blurred). The lighting is warm golden-hour sun, emphasizing the texture of the stone and the subject's attire. Epic scale, sharp focus throughout.",
        // Era: Ayyubid (Saladin's Era: Wool, Layering, Practical Governance)
        maleClothingIds: [
          "Master Builder's attire: A practical knee-length wool robe in olive green with a leather belt holding rolled parchments, worn with loose trousers and a simple head-wrap.",
          "Dignitary's attire: A long striped wool cloak (Aba) in brown and cream worn over a lighter robe, with a neatly wound white turban that sits high on the head.",
          "Striped Cotton Robe: A blue and white striped kaftan worn open over a white under-robe, fastened with a wide white fabric sash (not silk) and a clean white turban."
        ],
        femaleClothingIds: [
          "Ayyubid Noblewoman: A heavy sapphire-blue wool coat (Jubba) worn open over a silver-grey silk under-gown, paired with a white wimple wrapped tightly around the chin and a blue veil draped over the head.",
          "Richly colored outfit: A deep maroon open-front coat worn over a mustard-yellow flowing dress, with a white linen coif covering the hair and ears, and a maroon veil flowing down the back.",
          "Layered linen outfit: A loose, moss-green outer robe worn over a rust-colored under-gown, with a cream veil covering the hair and neck, focusing on matte, natural textures."
        ]
      },
      {
        prompt: "A portrait standing in the center of the colossal open-air courtyard of the Sultan Hassan Mosque. Behind the subject rises the towering stone arch of the main Iwan and the domed ablution fountain. The details of the muqarnas (stalactite carvings) and the sheer height of the walls are sharp and distinct. Bright natural sunlight floods the space, creating a grand, monumental atmosphere. Detailed architecture, clear blue sky.",
        // Era: Mamluk (Rich Fabrics, Distinct Egyptian Mamluk Headwear, No Ottoman/Turkic/Shi'a features)
        maleClothingIds: [
          "Mamluk Notable: A heavy red velvet coat (Qaba) with gold-thread geometric embroidery, worn over a silk robe with a large, elaborate ceremonial turban.",
          "Sunni Al-Azhar Scholar: A pristine white outer-robe (Farajiyya) with voluminous wide sleeves, worn over a pale grey under-robe. The turban is white, neatly wrapped, with a visible 'tail' hanging down the back.",
          "Court Official: A stiff brocade coat in turquoise and gold geometric patterns, with a high collar and a tall, structured hat wrapped in white cloth."
        ],
        femaleClothingIds: [
          "Mamluk Aristocrat: An emerald green damask outer-coat with wide elbow-length sleeves revealing a fitted gold under-sleeve, worn with a jeweled headband and a sheer silk veil trailing behind.",
          "Heavy crimson velvet coat worn open to reveal a gold-embroidered under-gown, with a structured headdress supporting a long silk veil (no face covering).",
          "Festive attire: A heavy, open-front dark purple velvet coat (Qaba) with wide sleeves, worn OVER a silver-grey silk under-gown, featuring geometric gold embroidery, with a white wimple and separate sheer veil."
        ]
      },
      {
        prompt: "A wide-angle portrait in the vast open courtyard of the Ibn Tulun Mosque. The subject is framed against the iconic spiral minaret in the background, which is fully in focus. The repeating geometric arches of the surrounding arcade create a strong sense of perspective. The scene is bathed in bright afternoon light, highlighting the stucco carvings and the red brick texture. Serene, geometric, highly detailed background.",
        // Era: Tulunid (The "Golden Age" of Textiles: Saffron, Indigo, Tiraz borders)
        maleClothingIds: [
          "Wealthy Scribe: A long, flowing Deep Saffron (orange-yellow) linen robe with embroidered text bands (Tiraz) on the upper arms, worn with a simple round turban.",
          "Cairo Merchant: A loose, rich indigo-blue robe reaching the ankles with wide sleeves, belted at the waist with a patterned woven sash, and a soft white head-wrap.",
          "Layered robes in cream and pale blue linen, featuring a draped shoulder mantle and a neat turban, reflecting the style of a wealthy intellectual."
        ],
        femaleClothingIds: [
          "Fine silk gown in unbleached white with embroidered text bands (Tiraz) on the sleeves, worn with a woven sash and a fine sheer veil pinned to the hair.",
          "Soft pastel-layered robes: A dusty pink outer-robe worn over a sage green under-layer, loose fitting with wide sleeves, paired with a simple headband and light scarf.",
          "Patterned Over-Robe: A rich garment featuring woven geometric motifs (Islamic style), worn over a long flowing dress, with a draped shawl covering the head and chest."
        ]
      }
    ],
    stamps: [
      "./Stamps/Islamic/1.png",
      "./Stamps/Islamic/2.png",
      "./Stamps/Islamic/3.png",
      "./Stamps/Islamic/4.png"
    ]
  },
  {
    id: EraId.MODERN_EGYPT,
    name: "Modern Egypt",
    description: "Experience the vibrant energy and leisure of contemporary Egypt.",
    previewImage: "./Modern-Preview.png",
    scenery: [
      {
        prompt: "a traditional Felucca boat sailing on the Nile River at golden hour, with the Cairo skyline and Cairo Tower visible in the distance. The water ripples gently, and the white sail catches the warm light.",
        maleClothingIds: ["stylish casual polo shirt and chinos, modern tourist summer wear."],
        femaleClothingIds: ["fashionable summer dress and sun hat, modern chic travel outfit."]
      },
      {
        prompt: "underwater in the Red Sea, surrounded by vibrant coral reefs and colorful tropical fish. The water is crystal clear and turquoise, with sunlight refracting through the surface.",
        maleClothingIds: ["modern rash guard and swim shorts, professional snorkeling gear."],
        femaleClothingIds: ["stylish wetsuit or rash guard, modern diving aesthetic."]
      },
      {
        prompt: "a colorful hot air balloon basket high above Luxor at sunrise, with a breathtaking view of the Valley of the Kings and lush green fields below.",
        maleClothingIds: ["modern outdoor jacket and casual trousers, sunrise travel gear."],
        femaleClothingIds: ["fashionable layered city-chic travel outfit with a light scarf."]
      }
    ],
    stamps: [
      "./Stamps/Modern-Egypt/1.png"
    ]
  }
];
