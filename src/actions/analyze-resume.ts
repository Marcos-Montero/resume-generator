"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { ResumeData, AIScoreResult } from "@/types/resume";

const aiScoreSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("Overall ATS optimization score from 0 to 100"),
  impactImprovements: z
    .array(z.string())
    .describe("Specific, actionable suggestions to improve impact (e.g., 'Add metrics to X experience')"),
  keywordGaps: z.array(z.string()).describe("Important keywords or skills that are missing or underrepresented"),
  strengths: z.array(z.string()).describe("Strong points of the resume that stand out"),
  summary: z.string().describe("Brief overall assessment of the resume's ATS optimization"),
});

function resumeToText(data: ResumeData): string {
  const lines: string[] = [];

  lines.push(`Name: ${data.personalDetails.fullName}`);
  lines.push(`Title: ${data.personalDetails.title}`);
  lines.push(`Location: ${data.personalDetails.location}`);
  lines.push("");
  lines.push("SUMMARY");
  lines.push(data.summary);
  lines.push("");
  lines.push("SKILLS");
  data.skills.forEach((skill) => {
    lines.push(`${skill.category}: ${skill.items.join(", ")}`);
  });
  lines.push("");
  lines.push("EXPERIENCE");
  data.experience.forEach((exp) => {
    lines.push(`${exp.company} - ${exp.position} (${exp.duration})`);
    lines.push(`Technologies: ${exp.technologies.join(", ")}`);
    exp.achievements.forEach((a) => lines.push(`• ${a}`));
    lines.push("");
  });
  lines.push("EDUCATION");
  data.education.forEach((edu) => {
    lines.push(`${edu.institution}: ${edu.degree}`);
  });

  return lines.join("\n");
}

export async function analyzeResume(data: ResumeData): Promise<AIScoreResult> {
  const resumeText = resumeToText(data);

  const systemPrompt = `You are an expert ATS (Applicant Tracking System) resume analyzer and career coach. 
Your job is to evaluate resumes for ATS optimization, keyword relevance, and impact.

Analyze the resume for:
1. **ATS Optimization**: Check for standard formatting, clear sections, keyword usage
2. **Impact Statements**: Evaluate if achievements use metrics, numbers, and quantifiable results
3. **Keyword Relevance**: Check if important industry keywords are present
4. **Professional Presentation**: Assess overall quality and professionalism

Be specific and actionable in your feedback. Reference specific sections or experiences when suggesting improvements.`;

  const userPrompt = `Analyze this resume and provide a detailed ATS optimization assessment:

${resumeText}

Provide:
1. An overall score (0-100) based on ATS optimization
2. Specific impact improvements (be very specific, reference actual content)
3. Keyword gaps (what's missing for senior tech roles)
4. Strengths (what stands out positively)
5. A brief summary of the assessment`;

  try {
    const provider = process.env.OPENAI_API_KEY ? "openai" : "anthropic";

    const model =
      provider === "openai" ? openai("gpt-4o") : anthropic("claude-3-5-sonnet-20241022");

    const { object } = await generateObject({
      model,
      schema: aiScoreSchema,
      system: systemPrompt,
      prompt: userPrompt,
    });

    return object as AIScoreResult;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume. Please check your API configuration.");
  }
}
