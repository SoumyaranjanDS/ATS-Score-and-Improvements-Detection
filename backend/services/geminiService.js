import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const parseResumeWithAI = async (resumeText) => {
  const prompt = `
You are a highly analytical ATS (Applicant Tracking System) and expert technical recruiter.
Your goal is to evaluate the provided resume and output a realistic ATS score and improvement plan.

Do NOT try to make the candidate feel good. Be brutally honest, objective, and conservative.

EVALUATION CRITERIA FOR ATS SCORE (0-100):
To calculate the ATS Score, objectively grade the resume on the following 4 dimensions:

1. Parseability & Formatting (25 points)
   - Are standard headings used (e.g., Experience, Education, Skills)?
   - Is the contact information (Email, Phone, LinkedIn/GitHub) clearly identifiable?
   - Deduct points for complex formatting, missing standard sections, or confusing layouts.

2. Impact & Quantifiable Metrics (30 points)
   - Do the bullet points use the STAR method (Situation, Task, Action, Result)?
   - Are there concrete, quantifiable metrics (e.g., "reduced latency by 20%", "managed team of 5")?
   - Deduct heavily for vague statements or simply listing responsibilities without outcomes.

3. Keyword Optimization & Context (25 points)
   - Are relevant technical and soft skills clearly present?
   - Are these skills contextualized within the experience section, rather than just dumped in a list?
   - Deduct points if skills are listed without any proof of application in the experience section.

4. Structure, Clarity & Professionalism (20 points)
   - Is the experience in reverse-chronological order?
   - Is the writing concise, professional, and free of typos?
   - Deduct points for meaningless buzzwords, fluff, or irrelevant information.

SCORING INTERPRETATION:
90-100: Exceptional. Highly optimized for ATS, strong metrics, clear impact.
80-89: Strong. Good formatting and metrics, minor optimizations needed.
70-79: Average. Missing some metrics or keyword context, formatting might need tweaks.
50-69: Weak. Lacks quantifiable impact, poor formatting, or relies on generic buzzwords.
0-49: Very Poor. Likely to be rejected by an ATS due to severe formatting or content issues.

IMPORTANT INSTRUCTIONS FOR IMPROVEMENTS:
- Do NOT output generic advice like "Improve your resume" or "Add more metrics".
- Quote the specific weak bullet point or section from the resume, and explain exactly why it fails ATS checks.
- Provide a clear, actionable example of how to rewrite it.
- If a project sounds like a generic tutorial, point it out.
- Do not fabricate facts. Recommend solutions that the candidate can truthfully implement.

RESUME TEXT TO EVALUATE:
${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: Type.OBJECT,

        properties: {
          atsScore: {
            type: Type.NUMBER,
          },

          summary: {
            type: Type.STRING,
          },

          improvements: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                problem: {
                  type: Type.STRING,
                },

                solution: {
                  type: Type.STRING,
                },
              },

              required: ["problem", "solution"],
            },
          },
        },

        required: ["atsScore", "summary", "improvements"],
      },
    },
  });
  return JSON.parse(response.text);
};
