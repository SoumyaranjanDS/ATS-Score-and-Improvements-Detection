import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const parseResumeWithAI = async (resumeText) => {
  const prompt = `
You are an expert ATS resume parser.

Analyze the resume text provided below and extract the information into the
exact JSON structure requested.

IMPORTANT RULES:

1. Do not invent information.
2. If information is missing, use an empty string or empty array.
3. Extract skills explicitly mentioned in the resume.
4. Keep experience descriptions factual.
5. Do not evaluate the candidate yet.
6. Do not calculate an ATS score yet.
7. Return only structured resume information.

RESUME TEXT:

${resumeText}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: Type.OBJECT,

        properties: {
          personalInfo: {
            type: Type.OBJECT,

            properties: {
              name: {
                type: Type.STRING,
              },

              email: {
                type: Type.STRING,
              },

              phone: {
                type: Type.STRING,
              },

              location: {
                type: Type.STRING,
              },

              linkedin: {
                type: Type.STRING,
              },

              github: {
                type: Type.STRING,
              },
            },

            required: [
              "name",
              "email",
              "phone",
              "location",
              "linkedin",
              "github",
            ],
          },

          summary: {
            type: Type.STRING,
          },

          skills: {
            type: Type.ARRAY,

            items: {
              type: Type.STRING,
            },
          },

          experience: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                company: {
                  type: Type.STRING,
                },

                role: {
                  type: Type.STRING,
                },

                duration: {
                  type: Type.STRING,
                },

                description: {
                  type: Type.STRING,
                },
              },

              required: ["company", "role", "duration", "description"],
            },
          },

          education: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                institution: {
                  type: Type.STRING,
                },

                degree: {
                  type: Type.STRING,
                },

                field: {
                  type: Type.STRING,
                },

                duration: {
                  type: Type.STRING,
                },
              },

              required: ["institution", "degree", "field", "duration"],
            },
          },

          projects: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                name: {
                  type: Type.STRING,
                },

                description: {
                  type: Type.STRING,
                },

                technologies: {
                  type: Type.ARRAY,

                  items: {
                    type: Type.STRING,
                  },
                },
              },

              required: ["name", "description", "technologies"],
            },
          },

          certifications: {
            type: Type.ARRAY,

            items: {
              type: Type.STRING,
            },
          },
        },

        required: [
          "personalInfo",
          "summary",
          "skills",
          "experience",
          "education",
          "projects",
          "certifications",
        ],
      },
    },
  });
  return JSON.parse(response.text);
};
