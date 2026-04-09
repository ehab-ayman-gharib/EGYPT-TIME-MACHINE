import { GoogleGenAI } from "@google/genai";
import { EraData, FaceDetectionResult } from '../types';
import { SHARED_PROMPT_INSTRUCTIONS, IDENTITY_PRESERVATION_GUIDE, CAMERA_CONFIG } from '../constants';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

const DASHBOARD_API_URL = "https://ai-photobooth-dashboard.vercel.app/api/projects/ee7c55cd-39d5-481c-84e5-691c1a3f100e/generate";

/**
 * Increments the generated images count on the dashboard
 */
const incrementGeneratedCount = async () => {
  try {
    const response = await fetch(DASHBOARD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      console.warn(`[Dashboard] Failed to increment count: ${response.status} ${response.statusText}`);
    } else {
      console.log('[Dashboard] Successfully incremented generation count');
    }
  } catch (error) {
    console.error('[Dashboard] Error calling increment API:', error);
  }
};

export interface GenerationResult {
  image: string;
  prompt: string;
}

export const generateHistoricalImage = async (
  era: EraData,
  faceData: FaceDetectionResult
): Promise<GenerationResult> => {
  const ai = getAiClient();

  // 1. Calculate Group Description
  let subjectDescription = "";
  let includeCharacter = false;

  const COMPANIONS = [
    {
      name: "QUEEN NEFERTITI",
      description: "the legendary Queen Nefertiti in a tight waist-up portrait, recognizable by her iconic tall, flat-topped blue cap crown, a vibrant and colorful jeweled Wesekh collar, and an elegant white pleated linen bodice. She has sharp regal facial features and traditional Egyptian kohl eye makeup."
    },
    {
      name: "PHARAOH THUTMOSE III",
      description: "the great warrior Pharaoh Thutmose III in a chest-up portrait, wearing the iconic Blue War Crown (Khepresh) with the golden Uraeus cobra and a broad gold chest collar. He has a powerful and majestic presence focusing on his face and torso."
    },
    {
      name: "THE GODDESS ISIS",
      description: "the divine Goddess Isis in a cinematic waist-up portrait, wearing her sacred headdress featuring the sun disk nestled between cow horns and the vulture crown. She is dressed in a magnificent form-fitting bodice adorned with gold beads."
    }
  ];

  if (faceData.totalPeople === 1) {
    if (faceData.childCount > 0) subjectDescription = "a young child";
    else if (faceData.maleCount >= 1) subjectDescription = "a man";
    else if (faceData.femaleCount > 0) subjectDescription = "a woman";
    else subjectDescription = "a person";


  } else {
    const parts = [];
    if (faceData.maleCount > 0) parts.push(`${faceData.maleCount} ${faceData.maleCount > 1 ? 'men' : 'man'}`);
    if (faceData.femaleCount > 0) parts.push(`${faceData.femaleCount} ${faceData.femaleCount > 1 ? 'women' : 'woman'}`);
    if (faceData.childCount > 0) parts.push(`${faceData.childCount} ${faceData.childCount > 1 ? 'children' : 'child'}`);

    if (parts.length === 0) {
      subjectDescription = `a group of ${faceData.totalPeople} people`;
    } else {
      subjectDescription = "a group of " + parts.join(', ').replace(/, ([^,]*)$/, ' and $1');
    }
  }

  // 2. Select Scene using a Shuffled Deck approach to prevent repetition
  let sceneIdx = 0;
  const deckKey = `scenery_deck_${era.id}`;
  let deck: number[] = [];
  
  try {
    const savedDeck = localStorage.getItem(deckKey);
    deck = savedDeck ? JSON.parse(savedDeck) : [];
  } catch (e) {
    deck = [];
  }

  // If deck is empty, replenish and shuffle it
  if (!deck || deck.length === 0) {
    deck = Array.from({ length: era.scenery.length }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(`[Deck] Replenished deck for ${era.id}:`, deck);
  }

  // Pick the next scene index
  sceneIdx = deck.pop() || 0;
  localStorage.setItem(deckKey, JSON.stringify(deck));

  const scene = era.scenery[sceneIdx];
  console.log(`[Prompt Gen] Selected scene #${sceneIdx} from deck for era ${era.id}. Remaining in deck: ${deck.length}`);
  const clothingParts: string[] = [];

  const physicalTraits = ["athletic build", "slight/slender build", "average build", "broad-shouldered", "muscular build"];
  const skinTones = ["warm olive", "bronze", "medium tan", "golden brown"];

  if (faceData.maleCount > 0) {
    for (let i = 0; i < faceData.maleCount; i++) {
      const maleOutfit = scene.maleClothingIds[Math.floor(Math.random() * scene.maleClothingIds.length)];
      clothingParts.push(`Man ${faceData.maleCount > 1 ? (i + 1) : ''}: A unique individual with a ${physicalTraits[Math.floor(Math.random() * physicalTraits.length)]} and ${skinTones[Math.floor(Math.random() * skinTones.length)]} skin, wearing a full-body version of ${maleOutfit}. This person MUST be fully clothed with no bare chest.`);
    }
  }
  if (faceData.femaleCount > 0) {
    for (let i = 0; i < faceData.femaleCount; i++) {
      const femaleOutfit = scene.femaleClothingIds[Math.floor(Math.random() * scene.femaleClothingIds.length)];
      clothingParts.push(`Woman ${faceData.femaleCount > 1 ? (i + 1) : ''}: A unique individual with ${skinTones[Math.floor(Math.random() * skinTones.length)]} skin, wearing a distinct and different variation of ${femaleOutfit}`);
    }
  }
  if (faceData.childCount > 0) {
    for (let i = 0; i < faceData.childCount; i++) {
      clothingParts.push(`Child ${faceData.childCount > 1 ? (i + 1) : ''} wearing a unique historically accurate ${era.name} child attire, different from others in the photo.`);
    }
  }

  const clothingDescription = clothingParts.sort(() => Math.random() - 0.5).join(". ");

  // 3. Construct Unified Prompt
  let prompt = "";
  if (includeCharacter) {
    const companion = COMPANIONS[Math.floor(Math.random() * COMPANIONS.length)];
    prompt = `
    A magnificent cinematic duo full-body environmental portrait set in ${scene.prompt}. 
    The photograph features two individuals in a shared moment, professionally posed in the scene:
    
    1. THE PERSON: A figure of ${era.name} Egypt wearing ${clothingDescription}. 
    2. THE COMPANION: ${companion.description}
    
    COMPOSITION:
    They should be positioned gracefully side-by-side, integrated into the same physical space with cohesive lighting and shadows.
    Absolutely no modern technology, cameras, or mobile phones.
    
    ${IDENTITY_PRESERVATION_GUIDE}
    
    ${CAMERA_CONFIG}
    `;
  } else {
    // Normal Group Photo or No Character
    prompt = `
    ${SHARED_PROMPT_INSTRUCTIONS}
    
    SCENE: A scene featuring ${subjectDescription}.
    LOCATION: ${scene.prompt} during the ${era.name} era.
    CLOTHING: ${clothingDescription}. 
    
    STYLE: Professional cinematic photography, 9:16 portrait.
    
    ${IDENTITY_PRESERVATION_GUIDE}
    
    ${CAMERA_CONFIG}
    `;
  }

  console.log("------------------- GENERATED PROMPT -------------------");
  console.log(prompt);
  console.log("--------------------------------------------------------");

  // Using raw object structure to bypass potential TS mismatches with the SDK
  const safetySettings: any[] = [
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' }
  ];

  const requestConfig: any = {
    temperature: 1,
    // @ts-ignore
    imageConfig: {
      aspectRatio: "9:16"
    },
    safetySettings: safetySettings
  };

  console.log("Gemini Request Config:", JSON.stringify(requestConfig, null, 2));

  try {
    // 4. Send to Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      config: requestConfig,
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    });

    // Extract image from response
    const candidate = response.candidates?.[0];
    if (candidate) {
      if (candidate.finishReason !== 'STOP') {
        console.warn('Gemini Generation Warning: Finish Reason:', candidate.finishReason);
        console.warn('Safety Ratings:', JSON.stringify(candidate.safetyRatings, null, 2));
      }

      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) {
          // Increment dashboard count after successful generation
          incrementGeneratedCount();

          return {
            image: `data:image/jpeg;base64,${part.inlineData.data}`,
            prompt: prompt
          };
        }
      }
    }

    console.error('Gemini No Image Generated. Response:', JSON.stringify(response, null, 2));
    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
