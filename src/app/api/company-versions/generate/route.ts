import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CV_GENERATION_SYSTEM_PROMPT, buildCVGenerationPrompt, buildModificationPrompt } from "@/lib/cv-generation-prompt";
import { ResumeData } from "@/types/resume";
import { ChangeDetail } from "@/types/company-version";
import { addVersionToCompany, createCompanyVersion } from "@/lib/company-versions-storage";

const GEMINI_MODEL = "gemini-2.0-flash";

type GenerationResponse = {
  resumeData: ResumeData;
  changeSummary?: string;
  changes?: ChangeDetail[];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyId,
      companyName,
      jobTitle,
      jobDescription,
      userInstructions,
      currentResumeData,
      baseVersionId,
      isNewCompany,
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    if (!currentResumeData) {
      return NextResponse.json(
        { success: false, error: "Resume data is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: CV_GENERATION_SYSTEM_PROMPT,
    });

    const resumeJson = JSON.stringify(currentResumeData, null, 2);
    
    let userPrompt: string;
    if (isNewCompany) {
      if (!companyName || !jobTitle) {
        return NextResponse.json(
          { success: false, error: "Company name and job title are required for new company" },
          { status: 400 }
        );
      }
      userPrompt = buildCVGenerationPrompt(
        resumeJson,
        companyName,
        jobTitle,
        jobDescription,
        userInstructions
      );
    } else {
      if (!userInstructions) {
        return NextResponse.json(
          { success: false, error: "Instructions are required for modifications" },
          { status: 400 }
        );
      }
      userPrompt = buildModificationPrompt(resumeJson, userInstructions, jobDescription);
    }

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.3,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const response = result.response;
    const text = response.text();

    let parsed: GenerationResponse;
    try {
      const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleanedText);
    } catch {
      console.error("Failed to parse generated resume:", text);
      return NextResponse.json(
        { success: false, error: "Failed to parse generated resume" },
        { status: 500 }
      );
    }

    const generatedResume = parsed.resumeData;
    const changeSummary = parsed.changeSummary || "CV tailored for the position";
    const changes = parsed.changes || [];

    let version;
    if (isNewCompany) {
      version = await createCompanyVersion(
        companyName,
        jobTitle,
        generatedResume,
        baseVersionId || "custom",
        jobDescription,
        userInstructions,
        userPrompt,
        changeSummary,
        changes
      );
    } else if (companyId) {
      version = await addVersionToCompany(
        companyId,
        generatedResume,
        jobTitle,
        jobDescription,
        undefined,
        userPrompt,
        changeSummary,
        changes
      );
    }

    return NextResponse.json({
      success: true,
      resumeData: generatedResume,
      changeSummary,
      changes,
      version,
    });
  } catch (error) {
    console.error("CV generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: `Generation failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
