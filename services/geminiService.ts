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

const DASHBOARD_API_URL = "https://ai-photobooth-dashboard.vercel.app/api/projects/4c783cca-eb11-4242-bde6-c9d683b0144b/generate";

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

export const generateHistoricalImage = async (
  base64Image: string,
  era: EraData,
  faceData: FaceDetectionResult
): Promise<string> => {
  const ai = getAiClient();
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  // 1. Calculate Group Description
  let subjectDescription = "";
  if (faceData.totalPeople === 1) {
    if (faceData.childCount > 0) subjectDescription = "a young child";
    else if (faceData.maleCount > 1 || faceData.maleCount === 1) subjectDescription = "a man";
    else if (faceData.femaleCount > 0) subjectDescription = "a woman";
    else subjectDescription = "a person"; // Fallback
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
  const sceneIdx = Math.floor(Math.random() * era.scenery.length);
  const scene = era.scenery[sceneIdx];
  console.log(`[Prompt Gen] Selected scene #${sceneIdx} for era ${era.id}`);
  const clothingParts: string[] = [];

  if (faceData.maleCount > 0) {
    clothingParts.push(`the ${faceData.maleCount > 1 ? 'men' : 'man'} wearing ${scene.maleClothingIds[Math.floor(Math.random() * scene.maleClothingIds.length)]}`);
  }
  if (faceData.femaleCount > 0) {
    clothingParts.push(`the ${faceData.femaleCount > 1 ? 'women' : 'woman'} wearing ${scene.femaleClothingIds[Math.floor(Math.random() * scene.femaleClothingIds.length)]}`);
  }
  if (faceData.childCount > 0) {
    // If we have children, they can wear items from either list, or simplified versions
    // For now, let's pick from gender lists or just a general historical child description
    clothingParts.push(`the ${faceData.childCount > 1 ? 'children' : 'child'} wearing historically accurate ${era.name} child attire`);
  }

  const clothingDescription = clothingParts.join(", ");

  // 3. Construct Unified Prompt
  const prompt = `
  ${SHARED_PROMPT_INSTRUCTIONS}
  
  INPUT: A photo of ${subjectDescription}.
  TASK: Place them in ${scene.prompt} during the ${era.name} era.
  CLOTHING: ${clothingDescription}.
  
  ${IDENTITY_PRESERVATION_GUIDE}
  `;

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
    temperature: 1, // @ts-ignore
    imageConfig: {
      aspectRatio: "9:16"
    },
    safetySettings: safetySettings
  };

  console.log("Gemini Request Config:", JSON.stringify(requestConfig, null, 2));

  try {
    // Using gemini-2.5-flash-image for transformation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      config: requestConfig,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      }
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

          return `data:image/jpeg;base64,${part.inlineData.data}`;
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
