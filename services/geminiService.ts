import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { EraData, FaceDetectionResult } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateHistoricalImage = async (
  base64Image: string,
  era: EraData,
  faceData: FaceDetectionResult
): Promise<string> => {
  const ai = getAiClient();

  // Clean base64 string
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  // Construct prompt strictly emphasizing identity preservation
  // Calculate detailed group description
  const parts = [];
  if (faceData.maleCount > 0) parts.push(`${faceData.maleCount} male${faceData.maleCount > 1 ? 's' : ''}`);
  if (faceData.femaleCount > 0) parts.push(`${faceData.femaleCount} female${faceData.femaleCount > 1 ? 's' : ''}`);
  let groupDescription = parts.join(' and ');
  if (!groupDescription) groupDescription = "the people";

  // Determine the base prompt style
  let basePromptStyle = era.promptStyle;

  // specialized prompts for single subjects
  if (faceData.totalPeople === 1) {
    if (faceData.maleCount === 1 && era.singleMalePrompt) {
      basePromptStyle = era.singleMalePrompt;
    } else if (faceData.femaleCount === 1 && era.singleFemalePrompt) {
      basePromptStyle = era.singleFemalePrompt;
    }
  }

  // Select random background
  let selectedBackground = "";
  if (era.backgrounds && era.backgrounds.length > 0) {
    const randomIndex = Math.floor(Math.random() * era.backgrounds.length);
    selectedBackground = era.backgrounds[randomIndex];
    console.log(`[GeminiService] Selected Background Index: ${randomIndex}`);
  }

  // Inject into prompt style if placeholder exists (though specialized prompts might not need it, we run it to be safe)
  let finalPromptStyle = basePromptStyle.replace('{{GROUP_DESCRIPTION}}', groupDescription);
  if (selectedBackground) {
    finalPromptStyle = finalPromptStyle.replace('{{BACKGROUND}}', selectedBackground);
  }

  // A strict prompt to guide the model
  const prompt = `
  You are an expert VFX artist.
  
  INPUT: Photo of ${groupDescription}.
  TASK: Change their clothing and style to match the ${era.name} (${era.description}).
  style: ${finalPromptStyle}
  
  REQUIREMENTS:
  - Keep the original face and identity visible and recognizable.
  - Change ONLY clothing, hair, and accessories to being historically accurate to ${era.name}.
  - Place in a ${era.name} environment.
  - Photorealistic, high quality, 9:16 portrait.
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
    // @ts-ignore
    imageConfig: {
      aspectRatio: "9:16"
    },
    safetySettings: safetySettings
  };

  //console.log("Gemini Request Config:", JSON.stringify(requestConfig, null, 2));

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
