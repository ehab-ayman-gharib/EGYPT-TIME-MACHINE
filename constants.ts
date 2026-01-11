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
    description: "Step into the era of monastic life, intricate textiles, and late antique art (c. 3rd–7th Century AD).",
    previewImage: "./Coptic-Preview.png",
    scenery: [
      {
        // 1. ANCIENT MONASTERY COURTYARD
        prompt: "A wide-angle full-body portrait in an ancient Coptic monastery courtyard. The subject stands on worn limestone pavers surrounded by desert plants and palm trees. Behind them, the rough limestone walls of the monks' cells rise up with small arched windows. The sunlight is bright and harsh, casting deep shadows. Woven palm-leaf baskets sit on the ground. Peaceful and ascetic.",
        maleClothingIds: [
          // Removed "cross stitching" on hood
          "Coptic Monk: A rough-textured wool tunic in natural dark brown, belted with a braided leather cord. He wears a distinct leather hood (qalansuwa) with geometric stitching. Footwear: Woven palm-fiber sandals.",
          "Desert Pilgrim: A travel-worn beige linen tunic covered by a heavy striped wool cloak (Pallium). He carries a wooden staff and a leather water skin. Footwear: Worn leather sandals.",
          "Monastery Abbot: A fine black wool tunic with wide sleeves, worn under a heavy black mantle. He holds a large wooden staff topped with a carved knob. Footwear: Black leather shoes."
        ],
        femaleClothingIds: [
          "Desert Mother: A simple, heavy undyed wool tunic reaching the floor. A dark blue woolen shawl covers her head and shoulders completely, pinned at the side. Footwear: Barefoot.",
          "Pilgrim Woman: A heavy, hooded woolen cloak worn over a simple grey linen tunic. She carries a clay water flask. A linen veil protects her face from the sun. Footwear: Sturdy sandals.",
          "Village Elder: A dark red wool tunic with black woven bands on the cuffs. A patterned woolen shawl is wrapped tightly around the upper body. Footwear: Leather sandals."
        ]
      },
      {
        // 2. HISTORIC STREET IN OLD CAIRO
        prompt: "A full-body environmental portrait in a historic street in Old Cairo (Masr el Adima). The subject stands on cobblestones under ancient stone arches. Iron oil lamps hang from the wood beams above. The narrow alleyway features weathered stone textures. In the background, a wooden door with inlaid geometric patterns is visible. Bustling but focused.",
        maleClothingIds: [
          "Coptic Artisan: A practical, knee-length linen tunic tucked into a leather belt, with woven decorative cuffs. He wears a leather apron and holds a woodworking chisel. Footwear: Sturdy work sandals.",
          "Merchant of Babylon: A fine bleached linen tunic with intricate 'Coptic Weave' roundels (orbiculi) on the shoulders in purple wool depicting vine scrolls. A woven mantle is draped over one shoulder. Footwear: Finely tooled leather shoes.",
          "Fortress Guard: A knee-length heavy wool tunic in dark green with leather reinforcements. A broad leather belt with a bronze buckle. He holds a wooden staff. Footwear: High-laced leather boots."
        ],
        femaleClothingIds: [
          "Weaver of Old Cairo: A practical ankle-length linen dress in natural flax color, with a colorful woven belt. She holds a wooden spindle. A simple linen kerchief ties back her hair. Footwear: Reed sandals.",
          "Merchant's Wife: A vibrant saffron-yellow linen tunic with large woven roundels in green and red geometric designs. A sheer linen veil covers her hair, held by a gold pin. Footwear: Dyed leather shoes.",
          "Market Woman: A layered outfit with a terracotta-colored over-tunic. She carries a woven basket filled with textiles. A linen shawl covers her head. Footwear: Simple leather sandals."
        ]
      },
      {
        // 3. INTERIOR OF ANCIENT STONE CHURCH
        prompt: "A cinematic wide-angle portrait inside an ancient stone church structure. The subject stands in a pool of soft, mysterious golden light filtering through high windows. The background walls are covered in faded frescoes of saints and elaborate floral motifs. The air is thick with incense smoke. Warm candlelight illuminates the subject's face and the worn stone floor.",
        maleClothingIds: [
          "Coptic Deacon: A long, pristine white linen tunic (Dalmatic) reaching the ankles with wide sleeves. A distinct embroidered vertical stripe (Clavus) in dark red runs down the front. Footwear: Leather sandals.",
          "Liturgical Chanter: A floor-length white tunic with very wide sleeves, decorated with two vertical purple stripes. He holds a pair of bronze cymbals. Footwear: Leather sandals.",
          // Removed holding a wooden cross
          "Church Elder: A deep blue wool tunic with gold-thread embroidery on the neckline. He holds a leather-bound prayer book. A heavy wool mantle is draped over his shoulders. Footwear: Soft leather shoes."
        ],
        femaleClothingIds: [
          "Coptic Matron: A layered outfit consisting of a long-sleeved undertunic and a shorter, wide-sleeved overtunic in deep purple wool. Adorned with a heavy necklace of glass beads. Footwear: Leather sandals.",
          "Young Devotee: A white linen tunic adorned with intricate lace-like Coptic weaving of doves and vines on the hem. A sheer veil covers her hair. She holds a beeswax candle. Footwear: Simple sandals.",
          "Widow in Mourning: A simple black wool tunic with no decoration. A black shawl covers her head and shoulders completely. Footwear: Black slippers."
        ]
      },
      {
        // 4. RELIGIOUS COMPLEX (MASR EL-ADIMA)
        prompt: "A full-body portrait in the Religious Complex of Old Cairo. The subject stands in a narrow passage between ancient stone walls. Sunlight filters softly, casting long shadows on the weathered limestone. Behind them are arched entrances and wooden doors with elaborate iron fittings. The atmosphere is sacred and historic.",
        maleClothingIds: [
          "Monastic Scribe: A rough-textured wool tunic in natural beige. He carries a leather scroll case and reed pens tucked into his belt. A heavy woolen cloak is draped over one shoulder. Footwear: Woven sandals.",
          "Visiting Bishop: A fine black wool tunic worn under a heavy embroidered cope (cape) featuring pomegranate designs. He wears a distinct rounded Coptic turban and holds a staff. Footwear: Black leather boots.",
          "Architect of the Complex: A sturdy linen tunic with a leather utility belt holding a plumb line and tools. He holds a rolled parchment plan. Footwear: Sturdy walking sandals."
        ],
        femaleClothingIds: [
          "Noblewoman of Babylon: A voluminous linen tunic-gown dyed in soft indigo, featuring wide tapestry-woven bands (Clavi) on the sleeves depicting floral patterns. Worn with a fine linen veil. Footwear: Embroidered leather slippers.",
          "Pious Woman: A simple unbleached linen tunic. A heavy brown woolen shawl is wrapped around her, covering her hair and body modestly. Footwear: Leather sandals.",
          "Textile Merchant: A tunic featuring vibrant red and green woven patterns of interlacing knots. She wears heavy silver bracelets and a colorful head-wrap. Footwear: Dyed leather sandals."
        ]
      },
      {
        // 5. THE HANGING CHURCH
        // Replaced "ivory Coptic crosses" with "ivory geometric patterns"
        prompt: "A wide-angle portrait inside the Hanging Church structure, elevated above the ground. The subject stands on a marble floor reflecting the warm golden candlelight. Behind them are carved wooden screens (iconostasis) inlaid with intricate ivory geometric patterns and stars. Softly glowing hanging lamps illuminate the ancient icons. Reverent and spiritual.",
        maleClothingIds: [
          // Replaced "gold-embroidered crosses" with "vine scrolls"
          "High Priest: A magnificent white silk-blend tunic with gold-embroidered vine scrolls and monograms. He wears a heavy cope (vestment) and a ceremonial white turban. Footwear: White leather shoes.",
          "Choir Master: A long white linen tunic with broad red vertical stripes. He holds a large manuscript of Coptic hymns written on parchment. Footwear: Leather sandals.",
          "Wealthy Patron: A fine purple tunic with gold-woven roundels on the knees and shoulders depicting lions. A heavy gold signet ring on his hand. Footwear: Gold-trimmed shoes."
        ],
        femaleClothingIds: [
          "Aristocrat of Fustat: A luxurious silk-blend tunic in deep crimson, embroidered with gold thread. A heavy jeweled collar and a pearl-studded headband. Footwear: Gold-embroidered shoes.",
          "Bride of the Church: A pristine white layered tunic with intricate white-on-white weaving of peacock motifs. A sheer veil held by a silver circlet covers her hair. Footwear: White slippers.",
          "Matron with Incense: A dark blue tunic with a golden mantle draped over the head. She holds a silver incense burner. Heavy gold bracelets. Footwear: Fine leather sandals."
        ]
      },
      {
        // 6. MONASTERY OF SAINT SIMON THE TANNER
        // Replaced "Carved crosses" with "Carved niches and symbols"
        prompt: "A monumental full-body portrait at the Monastery of Saint Simon the Tanner site. The subject stands in the open-air sanctuary space carved directly into the massive Mokattam cliff face. Sunlight streams down onto the simple stone surfaces. Carved niches and ancient symbols are visible in the rock walls behind. Humble yet grand scale.",
        maleClothingIds: [
          "Stone Carver: A rough, knee-length wool tunic covered in stone dust. He holds a mallet and chisel. A leather apron protects his clothes. Footwear: Heavy boots.",
          // Replaced holding "wooden cross" with "gnarled staff"
          "Hermit Monk: A tattered, simple brown wool tunic tied with a rope. He has a long beard and holds a gnarled wooden staff. Footwear: Barefoot.",
          "Pilgrim from Upper Egypt: A colorful striped galabiya-style tunic (traditional rural wear). A heavy wool cloak is thrown over the shoulder. Footwear: Leather sandals."
        ],
        femaleClothingIds: [
          "Village Woman: A simple linen dress in a natural earth tone. A large woven basket rests near her feet. A simple headscarf is tied back. Footwear: Reed sandals.",
          // Replaced holding "small wooden cross" with "clay oil lamp"
          "Devoted Pilgrim: A plain grey wool tunic. She kneels or stands humbly, holding a small clay oil lamp. A rough shawl covers her hair. Footwear: Worn sandals.",
          "Healer: A tunic dyed with natural herbs (greenish tint). She carries a leather pouch of medicines. A linen veil protects her from the sun. Footwear: Leather sandals."
        ]
      },
      {
        // 7. CHURCH OF SAINT GEORGE (MAR GIRGIS)
        prompt: "A wide-angle portrait inside the distinctive round structure of the Church of Saint George. The subject stands on the circular floor. Soft daylight enters through small arched windows high above, highlighting the ancient brickwork and worn stone textures. Behind them is a dark wooden screen carved with intricate arabesque patterns. Solemn and silent.",
        maleClothingIds: [
          "Roman-Egyptian Official: A tunic with broad purple shoulder stripes (Clavi). A heavy gold signet ring and a draped white cloak (Pallium) reflecting the Roman influence. Footwear: Leather boots.",
          "Church Warden: A simple dark brown tunic with a large ring of keys hanging from his belt. He holds a lantern. Footwear: Sturdy sandals.",
          "Icon Painter: A linen tunic stained with paint. He holds a wooden palette and brushes. A leather apron covers his lap. Footwear: Simple shoes."
        ],
        femaleClothingIds: [
          "Alexandrian Lady: A crimson tunic with a gold necklace of emeralds and pearls. Her hair is styled in braids with gold pins (Roman style). Footwear: Fine leather slippers.",
          "Iconographer's Daughter: A simple blue linen tunic. She holds a small pot of gold paint and a brush. A linen apron protects her clothes. Footwear: Sandals.",
          "Pious Widow: A heavy black wool tunic and a black veil covering her face and body. She holds a strand of knotted wool prayer beads. Footwear: Black shoes."
        ]
      },
      {
        // 8. SAINT CATHERINE’S MONASTERY
        prompt: "A dramatic full-body portrait at Saint Catherine’s Monastery. The subject stands in a simple courtyard surrounded by thick stone walls and rugged granite mountains. Cypress trees are visible in the background under a vast sky. The light is clear and crisp (high altitude). A feeling of isolation and timelessness.",
        maleClothingIds: [
          "Sinai Monk: A heavy black wool robe (cassock) distinctive to the region, worn with a cylindrical black hat. He has a long beard. Footwear: Heavy mountain boots.",
          "Bedouin Guide: A long white tunic with a heavy goat-hair cloak (bisht) for warmth. A simple cloth wrapped around the head. Footwear: Camel-leather sandals.",
          "Byzantine Pilgrim: A rich velvet tunic with gold embroidery of eagles (traveling noble). A fur-lined cloak for the mountain cold. Footwear: Fur-lined boots."
        ],
        femaleClothingIds: [
          "Byzantine Noblewoman: A heavy brocade tunic with a high collar for warmth. A velvet cloak is draped over her shoulders. A jeweled headdress. Footwear: Leather boots.",
          "Mountain Pilgrim: A thick wool dress in dark grey. A heavy woolen shawl covers her head and wraps around her body against the wind. Footwear: Sturdy boots.",
          // Replaced "cross-stitch" with "geometric embroidery"
          "Local Bedouin Woman: A black dress with intricate geometric embroidery in red on the chest (Sinai style). A black veil covers her head. Footwear: Leather sandals."
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
