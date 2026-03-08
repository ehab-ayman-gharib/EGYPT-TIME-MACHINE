import { EraData, EraId } from './types';

export const SHARED_PROMPT_INSTRUCTIONS = `A high-resolution, cinematic close-up chest-up portrait. The framing is a tight chest-up shot showing the face and shoulders clearly with vibrant colors and rich detail, set against a majestic historical environment. The person must be front-facing, looking directly at the camera with a perfectly symmetrical pose. Authentic native features (Ancient Egyptian, Coptic, or Medieval Arab/Egyptian). Clean-shaven face (no beard, no mustache). All subjects MUST wear era-appropriate headwear that COMPLETELY COVERS ALL HAIR AND SCALP (NO HAIR VISIBLE). Subjects MUST wear structured long-sleeved clothing that covers the chest, shoulders, and arms completely using heavy historical fabrics. Cinematic volumetric lighting, golden hour atmosphere, and realistic shadows. DO NOT SHOW LEGS, FEET, OR SHOES.`;

export const IDENTITY_PRESERVATION_GUIDE = `REQUIREMENTS:
- Cinematic high-resolution, close-up chest-up portrait.
- FRONT-FACING: Looking directly at the camera, symmetrical front-view.
- AUTHENTIC LOOK: Native ethnic and facial features, structural/heavy fabrics.
- NO BARE SKIN: All subjects must wear structured long-sleeved tunics or heavy robes covering chest, shoulders, and arms completely.
- MASCULINE STRUCTURE: Male subjects must wear stiffened linen, military-style tunics, or heavy kaftans, no sheer/loose fabrics.
- CLEAN-SHAVEN: NO beard, NO mustache, NO facial hair.
- MANDATORY HEADWEAR: Every person must wear era-relevant headwear, turbans, or veils COMPLETELY COVERING THE HAIR (NO HAIR VISIBLE).
- Sharp facial details, vibrant natural skin tones, crystal clear quality.
- 9:16 portrait orientation.
- Lighting: Cinematic volumetric lighting, realistic soft shadows, golden hour glow.`;

export const ERAS: EraData[] = [
  {
    id: EraId.OLD_EGYPT,
    name: "Old Kingdom",
    description: "Journey back to the time of Pharaohs, majestic architecture, and sacred art (c. 2686–2181 BC).",
    previewImage: "./Old-Egypt-Preview.png",
    scenery: [
      {
        // 1. PHILAE TEMPLE QUAY
        prompt: "A majestic front-facing chest-up portrait on the stone quay of the Philae Temple. Boundless cinematic volumetric lighting highlight the person's authentic Ancient Egyptian features. The background features massive granite temple Pylons covered in intricate deep-carved hieroglyphs, with the blue Nile's gentle ripples and traditional reed boats (feluccas) visible in the distance under a golden morning sun. Vibrant colors and rich historical detail.",
        maleClothingIds: [
          "Pharaoh's Regalia: A structural, heavy starched white long-sleeved linen tunic with a wide gold belt and a massive gold Wesekh collar. Mandatory Headwear: The striped Nemes headdress completely covering all hair.",
          "High Priest: A thick heavy-weave long-sleeved white linen garment secured by a wide starched fabric sash. Mandatory Headwear: A close-fitting linen skullcap fully hiding the hair.",
          "Royal Scribe: A structural long-sleeved white linen tunic with a wide thick fabric belt. Mandatory Headwear: A stiff linen head-wrap covering all hair."
        ],
        femaleClothingIds: [
          "Great Royal Wife: A structural white linen Kalasiris with long sleeves and a massive gold Usekh collar. Mandatory Headwear: The gold Vulture Headdress covering the entire head and hiding all hair.",
          "Royal Princess: A heavy pleated linen gown with long sleeves and a wide turquoise collar. Mandatory Headwear: A braided wig-style head covering that completely hides all natural hair.",
          "High Priestess: A structural pleated linen bodice with long sleeves and a heavy gold sash. Mandatory Headwear: A solid gold circlet worn over a heavy blue head covering that fully hides all hair."
        ]
      },
      {
        // 2. GREAT SPHINX & OBELISKS
        prompt: "A majestic close-up chest-up portrait with the Great Sphinx of Giza looming in the background. The person looks directly at the camera with authentic features. The background captures the massive limestone texture of the Sphinx, its regal face and the paws clearly visible, set against the towering Great Pyramids and a soft desert heat haze. Focused frontal composition with rich archaeological detail.",
        maleClothingIds: [
          "Warrior Pharaoh: A structural heavy linen tunic under a gold-scale leather corslet with long sleeves. Mandatory Headwear: The Blue War Crown (Khepresh) fully covering the head.",
          "Royal Overseer: A stiff, heavy-fabric long-sleeved white linen tunic with a thick fabric sash. Mandatory Headwear: A gold Uraeus band over a tight linen head-wrap hiding all hair.",
          "Royal Treasurer: A structural long-sleeved white linen garment with a broad, thick leather belt. Mandatory Headwear: A simple linen head covering fully hiding the hair."
        ],
        femaleClothingIds: [
          "Royal Matriarch: A stiff pleated linen gown bodice with distinct gold thread embroidery. A broad gold Wesekh collar and a gold Modius (crown base) topped with tall plumes worn over a head-wrap that hides all hair.",
          "Palace Noblewoman: A fitted dress made of very fine pleated linen. Mandatory Headwear: A heavy gold headband featuring a central Uraeus cobra worn OVER a tight linen headcloth covering all hair completely.",
          "Queen's Attendant: A tight-fitting white bodice with a vibrant gold-and-lapis patterned sash and a heavy gold pectoral necklace. Mandatory Headwear: A full linen head covering hiding all hair."
        ]
      },
      {
        // 3. KARNAK HYPOSTYLE HALL
        prompt: "A symmetrical front-facing close-up chest-up portrait inside the Great Hypostyle Hall of Karnak. The person looks directly at the camera with authentic features. In the background, the colossal papyrus-shaped columns are covered in vibrant traces of original pigment and deep-cut ritual reliefs. Atmospheric shafts of sunlight pierce the high-placed stone grilles. Authentic temple photography style.",
        maleClothingIds: [
          "Ceremonial Pharaoh: A structural, starched white long-sleeved linen tunic with a massive gold collar. Mandatory Headwear: The Double Crown (Pschent) covering all hair.",
          "High Priest of Karnak: A heavy-weave starched white linen tunic with a thick sash. Mandatory Headwear: A stiff linen head-covering hiding all hair.",
          "Royal Architect: A structural long-sleeved heavy linen shirt with a wide thick fabric belt. Mandatory Headwear: A simple linen headpiece covering all hair."
        ],
        femaleClothingIds: [
          "God's Wife of Amun: A long-sleeved white linen bodice with a heavy gold collar and a tall plumed headdress covering all hair.",
          "Royal Daughter: A long-sleeved form-fitting white linen dress. Mandatory Headwear: A heavy white linen head-wrap fully hiding the hair, adorned with gold bracelets.",
          "Temple Songstress: A long-sleeved white tunic with a heavy gold collar. Mandatory Headwear: A gold circlet worn over a heavy linen veil covering all hair."
        ]
      },
      {
        // 4. ROYAL PALACE TERRACE
        prompt: "A front-facing close-up chest-up portrait on the Royal Palace Terrace. The person is looking directly at the camera with sharp facial details. The background shows magnificent Lotus Columns painted in vibrant blues and reds, with a rich view of the royal gardens and the shimmering Nile flowing past in the background. Balanced, rich documentary style.",
        maleClothingIds: [
          "Palace Pharaoh: A fine white linen tunic with a distinctive Golden Pleated Shoulder Cape and a heavy gold Wesekh collar. Mandatory Headwear: A royal crown fully covering the hair.",
          "Royal Courtier: A fine white linen tunic with wide pleated sleeves, adorned with a wide beaded collar in lapis and gold. Mandatory Headwear: A gold headband worn over a linen head-wrap hiding all hair.",
          "Crown Prince: A fine white linen tunic with a broad gold collar. Mandatory Headwear: A distinct gold side-lock ornament or band worn over a full linen head covering."
        ],
        femaleClothingIds: [
          "Queen on the Terrace: A fitted linen bodice woven with shimmering gold thread. Mandatory Headwear: A gold circlet worn over a heavy blue veil covering all hair. Massive gold earrings.",
          "Royal Harpist: A fine pleated linen top with a wide gold sash. Mandatory Headwear: A heavy linen headscarf fully hiding the hair, gold hoop earrings and gold hair tubes ornaments.",
          "Palace Noblewoman: A high-necked fine linen bodice with elegant gold embroidery. Mandatory Headwear: A structured head covering hiding all hair, with a heavy necklace of red carnelian and gold."
        ]
      },
      {
        // 5. LUXOR TEMPLE COURTYARD
        prompt: "A dramatic front-facing chest-up portrait in the sun-drenched courtyard of Luxor Temple. Cinematic volumetric lighting illuminates the person's authentic features. Behind them are the colossal seated statues of Ramses II and the towering obelisk, with walls decorated in detailed processional reliefs. High-resolution cinematic shot with vibrant gold and stone colors.",
        maleClothingIds: [
          "Processional Pharaoh: A structural heavy starched white tunic with a massive gold-and-lapis collar. Mandatory Headwear: The striped Nemes headdress covering all hair.",
          "Luxor High Priest: A heavy-weave starched linen tunic with a wide starched sash. Mandatory Headwear: A close-fitting head-covering fully hiding the hair.",
          "Pharaoh's Standard Bearer: A structural white linen tunic with a wide leather belt. Mandatory Headwear: A high linen head-wrap."
        ],
        femaleClothingIds: [
          "Queen in Procession: A heavy long-sleeved white linen gown with a wide gold beaded sash. Mandatory Headwear: A gold Vulture headdress covering all hair.",
          "Temple Noblewoman: A structural pleated linen gown with long sleeves and a wide gold sash. Mandatory Headwear: A full linen head covering.",
          "Sacred Singer: A heavy pleated linen gown with a large gold pectoral necklace. Mandatory Headwear: A gold circlet worn over a full hair-covering veil."
        ]
      },
      {
        // 6. VALLEY OF THE KINGS TOMB
        prompt: "A majestic front-facing close-up chest-up portrait inside a Royal Tomb in the Valley of the Kings. Cinematic volumetric candlelight illuminates the authentic features. The background is a stunning display of vibrant wall paintings of deities and astronomical charts on the ceiling, with gold leaf artifacts and stone sarcophagi shimmering in the light.",
        maleClothingIds: [
          "Pharaoh in the Tomb: A heavy structural starched white long-sleeved tunic with a wide gold belt. Mandatory Headwear: The Blue Crown (Khepresh) fully covering the head.",
          "Royal Tomb Architect: A durable heavy starched linen tunic under a wide leather belt. Mandatory Headwear: A simple linen head wrap hiding all hair.",
          "High Priest: A structured heavy white linen tunic with a broad sash. Mandatory Headwear: A stiff linen skullcap hiding all hair."
        ],
        femaleClothingIds: [
          "Royal Mourner Queen: A fitted white linen bodice. Mandatory Headwear: A gold diadem with mourning ribbons and a fine linen veil.",
          "Princess in the Tomb: A pleated linen top with a narrow gold belt and a massive gold pectoral necklace. Mandatory Headwear: A gold headband with a lotus.",
          "Noblewoman: A form-fitting white top worn with a fine pleated linen shawl with heavy gold trim. Mandatory Headwear: A decorated head scarf."
        ]
      },
      {
        // 7. TEMPLE OF HATSHEPSUT TERRACE
        prompt: "A symmetrical front-facing chest-up portrait at the Mortuary Temple of Hatshepsut. The person looks directly at the camera with sharp features. The background features the rhythmic, majestic rows of square pillars and Osiride statues, set against the stark, multi-colored limestone cliffs of Deir el-Bahari. Deep, rich archaeological focus.",
        maleClothingIds: [
          "Regal Builder: A long-sleeved pleated white linen tunic under a massive gold collar. Mandatory Headwear: The white Hedjet crown.",
          "Noble Overseer: A long-sleeved white linen robe with a silver scribe's pendant. Mandatory Headwear: A starched linen headpiece.",
          "Royal Scribe: A long-sleeved starched white tunic. Mandatory Headwear: A tight-fitting head scarf."
        ],
        femaleClothingIds: [
          "Great Queen of Deir el-Bahari: A structural long-sleeved white linen gown with a wide gold belt. Mandatory Headwear: The striped Nemes or a Vulture Crown covering all hair.",
          "Hatshepsut's Noblewoman: A heavy starched linen gown with long sleeves and a wide turquoise collar. Mandatory Headwear: A structured head covering hiding all hair.",
          "High Priestess of Hathor: A heavy-weave gown with a structural gold sash. Mandatory Headwear: A gold uraeus headband worn over a tight linen head-wrap covering all hair."
        ]
      },
      {
        // 8. ABU SIMBEL
        prompt: "A powerful front-facing close-up chest-up portrait at Abu Simbel. The person looks directly at the camera in front of the colossal rock-cut statues. The red sandstone architecture is intricately detailed with sacred inscriptions, with the bright Egyptian sun casting sharp shadows across the temple facade. High detail documentary style.",
        maleClothingIds: [
          "Warrior Pharaoh: A gold corslet worn OVER a white long-sleeved tunic. Mandatory Headwear: The Blue War Crown (Khepresh).",
          "Royal Vizier: A long-sleeved white linen tunic with an official shoulder wrap. Mandatory Headwear: A structured official headpiece.",
          "Royal Cup Bearer: A long-sleeved white linen tunic with a heavy gold collar. Mandatory Headwear: A linen headcloth."
        ],
        femaleClothingIds: [
          "Temple Queen of Nefertari: A structural long-sleeved pleated gown with a tall plumed headdress covering all hair. Wide gold collar.",
          "Noblewoman of the South: A sturdy heavy starched linen gown with a wide gold sash. Mandatory Headwear: A protective head scarf covering all hair.",
          "Royal Princess of Abu Simbel: A structural long-sleeved white gown with a golden beaded overlay. Mandatory Headwear: A gold circlet worn over a tight linen head-wrap hiding all hair."
        ]
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
        // 1. DEIR MAR GIRGIS (Church of St. George)
        prompt: "A cinematic close-up chest-up portrait in front of the Church of St. George (Deir Mar Girgis). Vibrant volumetric light highlights the person's authentic Coptic features. The background features the iconic circular rotunda with alternating layers of red Roman brick and limestone, ornate Coptic crosses, and Byzantine-style icons visible through arched windows. High-resolution vibrant colors.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic top. Mandatory Headwear: A thick woolen hood (qalansuwa) or heavy knit cap covering all hair.",
          "Merchant's Tunic: A fine linen tunic top in natural flax color. It has broad vertical stripes (Clavi) in purple wool. Mandatory Headwear: A starched linen head-wrap.",
          "Monk's Habit: A rough, dark brown wool tunic top. Mandatory Headwear: A leather hood (qalansuwa) stitched with crosses."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen bodice with a square-shaped embroidered neckline. Mandatory Headwear: A heavy linen veil COMPLETELY covering all hair.",
          "Decorated Tunic: A vibrant saffron-yellow top with a heavy woven collar in black and red wool. Mandatory Headwear: A decorative woven headscarf fully hiding the hair.",
          "Simple Tunic: A sturdy linen top in a terracotta color. Mandatory Headwear: A plain linen head covering pinned under the chin, hiding all hair."
        ]
      },
      {
        // 2. THE HANGING CHURCH (Al-Muallaqa)
        prompt: "A majestic close-up chest-up portrait at the Hanging Church (Al-Muallaqa). Cinematic volumetric lighting casts a warm glow on the authentic Coptic features. The background shows the ornate wooden Loggia, intricate Khajesta (lattice) screens, and ancient biblical murals. Flickering lamps create a rich atmospheric environment.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic top. Mandatory Headwear: A thick woolen hood (qalansuwa) or heavy knit cap.",
          "Merchant's Tunic: A fine linen tunic top in natural flax color. It has broad vertical stripes (Clavi) in purple wool.",
          "Monk's Habit: A rough, dark brown wool tunic top. Mandatory Headwear: A leather hood."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen bodice. Mandatory Headwear: A heavy linen veil hiding all hair.",
          "Decorated Tunic: A vibrant saffron-yellow top with a heavy woven collar. Mandatory Headwear: A decorative woven headscarf fully covering the hair.",
          "Simple Tunic: A sturdy linen top in a terracotta color. Mandatory Headwear: A simple head covering hiding all hair."
        ]
      },
      {
        // 3. DEIR SAM3AN KHARAZ (St. Simon the Tanner)
        prompt: "A close-up chest-up portrait at the Cave Church of St. Simon. The person is front-facing with authentic features, looking directly at the camera. The background features the massive natural cave walls covered in colossal, detailed modern rock carvings of Coptic saints and biblical scenes, with simple wooden pews and religious inscriptions in the background.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, dark green wool tunic top with woven bands. Mandatory Headwear: A thick woolen hood.",
          "Merchant's Tunic: A fine linen tunic top with purple clavi stripes. Mandatory Headwear: A starched linen wrap.",
          "Monk's Habit: A rough, dark brown wool tunic top. Mandatory Headwear: A stitched leather hood."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural unbleached linen bodice. Mandatory Headwear: A heavy linen shawl covering the head.",
          "Decorated Tunic: A saffron top with a heavy woven collar. Mandatory Headwear: A decorative woven hood.",
          "Simple Tunic: A terracotta linen top. Mandatory Headwear: A plain linen head covering."
        ]
      },
      {
        // 4. THE COPTIC MUSEUM
        prompt: "A cinematic close-up chest-up portrait in the historic courtyard of the Coptic Museum. Volumetric sunlight highlights the person's authentic native features. The background features magnificent Mashrabiya wooden screens, carved stone fountains, and ancient Coptic crosses set into the walls in vibrant detail.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy, thick structural green wool tunic with defined shoulders. Mandatory Headwear: A thick woolen hood (qalansuwa).",
          "Merchant's Tunic: A heavy-fabric structural linen tunic with purple clavi stripes. Mandatory Headwear: A tight cap.",
          "Monk's Habit: A structured heavy dark brown wool tunic. Mandatory Headwear: A leather hood."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural linen bodice. Mandatory Headwear: A heavy linen veil.",
          "Decorated Tunic: A saffron top. Mandatory Headwear: A decorative hood.",
          "Simple Tunic: A terracotta top. Mandatory Headwear: A plain head covering."
        ]
      },
      {
        // 5. ANCIENT MONASTERY COMPLEX (Like St. Paul/Anthony)
        prompt: "A cinematic close-up chest-up portrait with a remote Desert Monastery in the background. Majestic volumetric lighting illuminates the authentic Coptic features. The background shows fortified mud-brick walls, ancient towers, and white-domed cells nestled against the rugged desert mountains under a golden sky.",
        maleClothingIds: [
          "Coptic Wool Tunic: A heavy structural wool tunic with defined shoulders and long sleeves. Mandatory Headwear: A thick hood.",
          "Merchant's Tunic: A structural heavy linen tunic. Mandatory Headwear: A head-wrap.",
          "Monk's Habit: A structured heavy wool habit. Mandatory Headwear: A stitched leather hood."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural linen bodice. Mandatory Headwear: A heavy veil.",
          "Decorated Tunic: A saffron top. Mandatory Headwear: A woven headscarf.",
          "Simple Tunic: A terracotta top. Mandatory Headwear: A linen head covering."
        ]
      },
      {
        // 6. SAINT CATHERINE’S MONASTERY
        prompt: "A dramatic close-up chest-up portrait at Saint Catherine’s Monastery. The person has authentic features, looking directly at the camera. The background shows the massive 6th-century fortress walls, the burning bush courtyard, and the towering granite peaks of Mount Sinai under a vibrant sky. Rich environmental focus.",
        maleClothingIds: [
          "Coptic Tunic: A heavy structural green wool tunic with defined shoulders. Mandatory Headwear: A thick hood.",
          "Merchant's Tunic: A structural long-sleeved heavy linen tunic. Mandatory Headwear: A starched head-wrap.",
          "Monk's Habit: A structured heavy wool tunic. Mandatory Headwear: A stitched leather hood."
        ],
        femaleClothingIds: [
          "Square-Neck Tunic: A natural linen bodice. Mandatory Headwear: A heavy veil.",
          "Decorated Tunic: A saffron top. Mandatory Headwear: A woven hood.",
          "Simple Tunic: A terracotta top. Mandatory Headwear: A linen head covering."
        ]
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
        prompt: "A close-up chest-up portrait in the open sahn of the Mosque of Amr ibn al-As. The person has authentic Medieval Arab features, looking directly at the camera. The background features a forest of ancient marble columns, pointed arches with stucco friezes, and a glimpse of the wooden minbar. Sunlight filters through the geometric rooftop. Rich, era-appropriate architecture.",
        maleClothingIds: [
          "Egyptian Scribe: A structural heavy cotton kaftan with a wide leather belt. Mandatory Headwear: A large white turban wrapped securely over a skullcap, hiding all hair.",
          "Early Scholar: A heavy wool outer-mantle over a structural long-sleeved tunic. Mandatory Headwear: A tall structured scholar's hat fully covering the hair.",
          "Merchant: A structural beige heavy cotton garment with a thick fabric belt. Mandatory Headwear: A thick fabric desert turban fully hiding the hair."
        ],
        femaleClothingIds: [
          "Early Cairo style: A linen outer-wrap (Izar) draped over a bodice. Mandatory Headwear: A heavy cream headscarf or Al-Amira veil COMPLETELY hiding all hair.",
          "Natural Dye outfit: A loose indigo-blue outer-robe top. Mandatory Headwear: A layered linen veil fully covering the hair.",
          "Modest attire: A wool over-garment top. Mandatory Headwear: A textured shawl pinned securely, hiding all hair."
        ]
      },
      {
        prompt: "A majestic close-up chest-up portrait on the limestone battlements of the Cairo Citadel. Cinematic volumetric lighting highlights the authentic features. The background shows the formidable Saladin walls, the silver domes and slender minarets of the mosque, and a wide view of the vibrant medieval city. Professional cinematic pose.",
        maleClothingIds: [
          "Master Builder: A structured heavy wool kaftan in olive green with a thick leather belt. Mandatory Headwear: A simple head-wrap fully hiding the hair.",
          "Dignitary: A thick structural striped wool cloak (Aba) over a heavy tunic. Mandatory Headwear: A neatly wound large white turban hiding all hair.",
          "Striped Robe: A structured heavy cotton striped kaftan with a wide fabric sash. Mandatory Headwear: A clean white turban fully covering the hair."
        ],
        femaleClothingIds: [
          "Noblewoman: A heavy sapphire-blue wool coat (Jubba) top. Mandatory Headwear: A white wimple and a blue veil fully covering all hair.",
          "Richly colored outfit: A deep maroon coat top. Mandatory Headwear: A white linen coif covering the hair completely.",
          "Layered linen outfit: A loose, moss-green outer robe top. Mandatory Headwear: A cream veil hiding all hair."
        ]
      },
      {
        prompt: "A close-up chest-up portrait in the massive courtyard of the Sultan Hassan Mosque-Madrassa. The person has authentic features, looking directly at the camera. The background features a towering stone iwan, colorful marble inlays, and ornate glass lamps (mishkats) hanging from long chains. Highly detailed Mamluk historical environment.",
        maleClothingIds: [
          "Mamluk Notable: A heavy structural velvet coat (Qaba) with a wide metallic belt. Mandatory Headwear: A large, elaborate ceremonial turban hiding all hair.",
          "Scholar: A structural heavy cotton outer-robe (Farajiyya) with a sash. Mandatory Headwear: A white, neatly wrapped large turban hiding all hair.",
          "Court Official: A structured heavy brocade coat secured by a thick leather belt. Mandatory Headwear: A tall, structured hat fully covering the hair."
        ],
        femaleClothingIds: [
          "Mamluk Aristocrat: A heavy emerald green damask coat (Qaba) with long sleeves and a wide sash. Mandatory Headwear: A thick linen veil fully covering the hair.",
          "Cairene Noblewoman: A structural crimson velvet coat with gold embroidery. Mandatory Headwear: A structured headdress with a long thick veil hiding all hair.",
          "Festive Mamluk style: A heavy dark purple velvet coat with long sleeves. Mandatory Headwear: A white wimple and a thick shawl covering all hair."
        ]
      },
      {
        prompt: "A close-up chest-up portrait at the Ibn Tulun Mosque. The person has authentic features, looking directly at the camera. The background features the unique pointed arches with delicate stucco calligraphic carvings and the iconic spiral minaret standing tall against the sky. Deep, rich environmental detail.",
        maleClothingIds: [
          "Wealthy Scribe: A structural deep saffron heavy linen garment with a wide fabric belt. Mandatory Headwear: A simple round turban fully hiding the hair.",
          "Cairo Merchant: A structured heavy indigo-blue cotton garment with a thick sash. Mandatory Headwear: A soft white head-wrap covering all hair.",
          "Intellectual: Structured layered garments in heavy cream and pale blue fabric with a sash. Mandatory Headwear: A neat large turban hiding all hair."
        ],
        femaleClothingIds: [
          "Silk Gown: A white silk gown top. Mandatory Headwear: A fine thick veil pinned to the head fully hiding all hair.",
          "Pastel robes: A dusty pink outer-robe top. Mandatory Headwear: A simple head-wrap and thick scarf covering all hair.",
          "Patterned Over-Robe: A rich garment top. Mandatory Headwear: A draped shawl covering the hair completely."
        ]
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
        prompt: "A close-up chest-up portrait of a clean-shaven person (no beard) looking directly at the camera on a traditional boat. Authentic Modern Egyptian features. Background features a detailed view of the water and skyline. Symmetrical front view.",
        maleClothingIds: ["clean-shaven, wearing a stylish modern fedora or sun hat covering all hair, casual polo shirt."],
        femaleClothingIds: ["wearing a fashionable wide-brimmed sun hat fully hiding the hair, stylish summer top."]
      },

      {
        prompt: "A close-up chest-up portrait of a clean-shaven person (no beard) looking directly at the camera in a hot air balloon. Authentic native features. Background shows the detailed landscape below in rich focus. focused documentation style.",
        maleClothingIds: ["clean-shaven, wearing a modern beanie or knit hat covering all hair, outdoor jacket."],
        femaleClothingIds: ["wearing a fashionable beret or beanie hat fully hiding the hair, stylish travel top."]
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