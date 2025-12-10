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
  let subjectDescription = "the person";
  if (faceData.totalPeople > 1) {
    subjectDescription = "the people";
  }

  // A very strict prompt structure to guide the model to act as an advanced style transfer
  // rather than generating a new random person.
  const prompt = `
  You are an expert VFX artist specializing in historical reconstruction.
  
  INPUT IMAGE: containing ${subjectDescription}.
  TARGET ERA: ${era.name}
  STYLE GUIDANCE: ${era.promptStyle}
  
  MANDATORY REQUIREMENTS:
  1. IDENTITY LOCK: The generated image MUST feature the exact same face(s) as the input image. Keep facial features, eye shape, nose shape, and mouth shape identical.
  2. POSE LOCK: Keep the exact same head pose, angle, and expression as the input.
  3. TRANSFORMATION: Only change the clothing, accessories, and hairstyle to match the ${era.name}.
  4. ENVIRONMENT: Place them in a realistic, depth-of-field background appropriate for the era.
  5. ASPECT RATIO: The output image MUST be in vertical 9:16 aspect ratio (Portrait).
  
  Output a high-resolution, photorealistic image.
  `;

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

export const editGeneratedImage = async (
  base64Image: string,
  editInstruction: string
): Promise<string> => {
  const ai = getAiClient();
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          { text: `Edit this image: ${editInstruction}. Maintain the exact facial identity and pose.` }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No edited image returned");
  } catch (error) {
    console.error("Gemini Edit Error:", error);
    throw error;
  }
};