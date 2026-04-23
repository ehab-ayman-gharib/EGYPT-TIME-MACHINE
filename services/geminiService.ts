import { GoogleGenAI } from "@google/genai";
import { EraData, FaceDetectionResult } from '../types';
import { SHARED_PROMPT_INSTRUCTIONS, IDENTITY_PRESERVATION_GUIDE } from '../constants';

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
  _unusedImage: string,
  era: EraData,
  faceData: FaceDetectionResult
): Promise<GenerationResult> => {
  const ai = getAiClient();

  // 1. Calculate Group Description
  let subjectDescription = "";
  
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

  // 2. Select Scene and Clothing
  let sceneIdx = faceData.selectedSceneryIdx ?? 0;
  
  // If no specific selection, use random but avoid repetition
  if (faceData.selectedSceneryIdx === undefined) {
    const lastScenesKey = 'extra_last_scenes';
    const lastScenes = JSON.parse(localStorage.getItem(lastScenesKey) || '{}');
    const lastIdx = lastScenes[era.id];

    if (era.scenery.length > 1) {
      for (let i = 0; i < 10; i++) {
        sceneIdx = Math.floor(Math.random() * era.scenery.length);
        if (sceneIdx !== lastIdx) break;
      }
    } else {
      sceneIdx = 0;
    }

    lastScenes[era.id] = sceneIdx;
    localStorage.setItem(lastScenesKey, JSON.stringify(lastScenes));
  }

  const scene = era.scenery[sceneIdx];
  
  const getUniqueClothing = (count: number, clothingOptions: string[], singularLabel: string) => {
    if (!clothingOptions || clothingOptions.length === 0) return `the ${singularLabel} wearing era-appropriate attire`;
    if (count === 1) {
      return `the ${singularLabel} wearing ${clothingOptions[Math.floor(Math.random() * clothingOptions.length)]}`;
    }

    let shuffledOptions = [...clothingOptions].sort(() => Math.random() - 0.5);
    let resultParts = [];

    for (let i = 0; i < count; i++) {
      if (i > 0 && i % clothingOptions.length === 0) {
        shuffledOptions = [...clothingOptions].sort(() => Math.random() - 0.5);
      }
      const option = shuffledOptions[i % clothingOptions.length];
      const labelText = `${singularLabel.charAt(0).toUpperCase() + singularLabel.slice(1)} ${i + 1}`;
      resultParts.push(`${labelText} wearing ${option}`);
    }
    return resultParts.join("; ");
  };

  const clothingParts: string[] = [];
  if (faceData.maleCount > 0) clothingParts.push(getUniqueClothing(faceData.maleCount, scene.maleClothingIds, 'man'));
  if (faceData.femaleCount > 0) clothingParts.push(getUniqueClothing(faceData.femaleCount, scene.femaleClothingIds, 'woman'));
  if (faceData.childCount > 0) {
    if (faceData.childCount === 1) {
      clothingParts.push(`the child wearing historically accurate ${era.name} child attire`);
    } else {
      let childParts = [];
      for (let i = 0; i < faceData.childCount; i++) {
        childParts.push(`Child ${i + 1} wearing historically accurate ${era.name} child attire`);
      }
      clothingParts.push(childParts.join("; "));
    }
  }

  const clothingDescription = clothingParts.join("\n    ");

  // 3. Construct Unified Prompt
  const prompt = `
    ${SHARED_PROMPT_INSTRUCTIONS}
    
    SCENE: ${scene.prompt} during the ${era.name} era.
    SUBJECTS: ${subjectDescription}.
    CLOTHING: ${clothingDescription}. 
    
    STYLE: Professional cinematic photography, 9:16 portrait, high resolution.
    
    ${IDENTITY_PRESERVATION_GUIDE}
    `;

  console.log("------------------- GENERATED PROMPT -------------------");
  console.log(prompt);
  console.log("--------------------------------------------------------");

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

  try {
    // 4. Send to Gemini (Text-to-Image)
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

    const candidate = response.candidates?.[0];
    if (candidate) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) {
          incrementGeneratedCount();
          return {
            image: `data:image/jpeg;base64,${part.inlineData.data}`,
            prompt: prompt
          };
        }
      }
    }

    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
