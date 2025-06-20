import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getCareerRoadmapDeclaration = {
  name: "get_career_roadmap",
  description:
    "Provides a complete career roadmap including qualifications, exams, institutions, skills, courses, and future scope.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      career: {
        type: Type.STRING,
        description:
          "The name of the career (e.g., 'Software Engineer', 'Data Scientist').",
      },
      qualifications: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Degrees or certifications required.",
      },
      entranceExams: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Relevant entrance exams.",
      },
      institutions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Top colleges or universities.",
      },
      skills: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Key technical and soft skills.",
      },
      courses: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            platform: { type: Type.STRING },
            link: { type: Type.STRING },
          },
          required: ["name", "platform", "link"],
        },
        description: "Recommended courses with links.",
      },
      futureScope: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Future opportunities in the field.",
      },
    },
    required: ["career", "qualifications", "entranceExams" , "institutions" , "skills", "courses" , "futureScope" ,],
  },
};

export const callAI = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a career guidance expert. Always respond by calling the function "get_career_roadmap" with structured JSON data. Do not return plain text answers. Strictly follow the schema of the function declaration And remember do not provide any example links always provide working links strictly.
User prompt: ${prompt}`,
            },
          ],
        },
      ],
      config: {
        systemInstruction : "",
        tools: [
          {
            functionDeclarations: [getCareerRoadmapDeclaration],
          },
        ],
        toolChoice: {
          functionCall: {
            name: "get_career_roadmap",
          },
        },
      },
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0];
      return res.status(200).json({
        success: true,
        functionName: functionCall.name,
        roadmap: functionCall.args,
      });
    }

    return res.status(200).json({
      success: true,
      result: response.text,
    });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return res.status(500).json({
      success: false,
      message: "AI generation failed",
      error: error.message,
    });
  }
};
