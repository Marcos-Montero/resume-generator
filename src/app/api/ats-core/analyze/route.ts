import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ATSAnalysisRequest, ATSAnalysisResponse, ATSCoreAnalysis } from "@/types/ats-core";
import { ATS_CORE_SYSTEM_PROMPT, buildAnalysisPrompt } from "@/lib/ats-core-prompt";

const GEMINI_MODEL = "gemini-2.0-flash";

export async function POST(request: NextRequest) {
  try {
    const body: ATSAnalysisRequest = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "GEMINI_API_KEY not configured. Add it to your .env.local file.",
        } as ATSAnalysisResponse,
        { status: 500 }
      );
    }

    if (!body.resumeText || !body.resumeText.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume text is required",
        } as ATSAnalysisResponse,
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: ATS_CORE_SYSTEM_PROMPT,
    });

    const userPrompt = buildAnalysisPrompt(body.resumeText, body.jobDescription);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.1,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const response = result.response;
    const text = response.text();

    let analysis: ATSCoreAnalysis;
    try {
      const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysis = JSON.parse(cleanedText);
    } catch {
      console.error("Failed to parse Gemini response:", text);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to parse ATS analysis response. The AI returned invalid JSON.",
        } as ATSAnalysisResponse,
        { status: 500 }
      );
    }

    analysis.meta.timestamp = new Date().toISOString();

    return NextResponse.json({
      success: true,
      analysis,
    } as ATSAnalysisResponse);
  } catch (error) {
    console.error("ATS Core analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        success: false,
        error: `Analysis failed: ${errorMessage}`,
      } as ATSAnalysisResponse,
      { status: 500 }
    );
  }
}
