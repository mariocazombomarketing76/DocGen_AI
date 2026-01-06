import { GoogleGenAI } from "@google/genai";
import { DocumentType } from '../types';

const getPrompt = (documentType: DocumentType, description: string): string => {
  const basePrompt = `Aja como um especialista em redação de documentos de negócios. Sua tarefa é gerar um documento profissional e bem estruturado em português do Brasil.
  O documento deve ser formatado em Markdown para clareza e legibilidade.

  Tipo de Documento: ${documentType}
  Descrição da Necessidade/Negócio: "${description}"

  Por favor, gere o documento completo com base nessas informações. Certifique-se de incluir seções relevantes, linguagem apropriada e um formato lógico.`;

  return basePrompt;
};

export const generateDocument = async (documentType: DocumentType, description: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = getPrompt(documentType, description);

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });
    
    if (response.text) {
        return response.text;
    } else {
        throw new Error("A API não retornou texto. A resposta pode ter sido bloqueada.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Falha ao comunicar com a API do Gemini. Verifique o console para mais detalhes.");
  }
};
