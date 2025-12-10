import { GoogleGenAI } from "@google/genai";
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

  // Inject into prompt style if placeholder exists
  const finalPromptStyle = era.promptStyle.replace('{{GROUP_DESCRIPTION}}', groupDescription);

  // A very strict prompt structure to guide the model to act as an advanced style transfer
  // rather than generating a new random person.
  const prompt = `
  You are an expert VFX artist specializing in historical reconstruction.
  
  INPUT IMAGE: containing ${groupDescription}.
  TARGET ERA: ${era.name}
  STYLE GUIDANCE: ${finalPromptStyle}
  
  MANDATORY REQUIREMENTS:
  1. IDENTITY LOCK: The generated image MUST feature the exact same face(s) as the input image. Keep facial features, eye shape, nose shape, and mouth shape identical.
  2. POSE LOCK: Keep the exact same head pose, angle, and expression as the input.
  3. TRANSFORMATION: Only change the clothing, accessories, and hairstyle to match the ${era.name}.
  4. ENVIRONMENT: Place them in a realistic, depth-of-field background appropriate for the era.
  5. ASPECT RATIO: The output image MUST be in vertical 9:16 aspect ratio (Portrait).
  
  Output a high-resolution, photorealistic image.
  `;

  console.log("------------------- GENERATED PROMPT -------------------");
  console.log(prompt);
  console.log("--------------------------------------------------------");

  try {
    // Using gemini-2.5-flash-image for transformation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',

      config: {
        // @ts-ignore - imageConfig is supported by this model but missing in SDK types
        imageConfig: {
          aspectRatio: "9:16"
        }
      },
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
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
