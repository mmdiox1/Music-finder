
import { GoogleGenAI, Type } from "@google/genai";
import { SongResult, SearchFormData } from "../types";

const API_KEY = process.env.API_KEY || '';

export const findSong = async (formData: SearchFormData): Promise<SongResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    Identify the song based on the following details:
    - Lyrics snippet: "${formData.lyrics}"
    - Artist name (if provided): "${formData.artist || 'Unknown'}"
    - Expected Language: "${formData.language}"

    Tasks:
    1. Search for the most accurate song match.
    2. Provide a legitimate direct download link (MP3) if available on public music hosting sites. 
    3. Provide Spotify and YouTube links.
    4. Do not hallucinate URLs. If a specific link is not found, leave it empty.
    5. Evaluate your confidence level (0-100).
    6. Include a brief summary of the song.

    Return the result in Persian for the summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            songTitle: { type: Type.STRING },
            artistName: { type: Type.STRING },
            language: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            downloadUrl: { type: Type.STRING },
            spotifyUrl: { type: Type.STRING },
            youtubeUrl: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["songTitle", "artistName", "confidence", "language"]
        }
      }
    });

    const resultText = response.text;
    const parsed: SongResult = JSON.parse(resultText);
    
    // Extract search grounding sources if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      parsed.sources = groundingChunks
        .map((chunk: any) => chunk.web?.uri)
        .filter((uri: string | undefined): uri is string => !!uri);
    }

    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("متأسفانه خطایی در یافتن آهنگ رخ داد. لطفاً دوباره تلاش کنید.");
  }
};
