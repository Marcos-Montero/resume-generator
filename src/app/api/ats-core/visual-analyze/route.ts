import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { VisualAudit } from "@/types/ats-core";
import { VISUAL_ANALYSIS_SYSTEM_PROMPT, buildVisualAnalysisPrompt } from "@/lib/visual-analysis-prompt";

const GEMINI_MODEL = "gemini-2.0-flash";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { screenshotBase64 } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    if (!screenshotBase64) {
      return NextResponse.json(
        { success: false, error: "Screenshot is required for visual analysis" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: VISUAL_ANALYSIS_SYSTEM_PROMPT,
    });

    const base64Data = screenshotBase64.replace(/^data:image\/\w+;base64,/, "");

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/png",
                data: base64Data,
              },
            },
            { text: buildVisualAnalysisPrompt() },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
    });

    const response = result.response;
    const text = response.text();

    let visualAudit: VisualAudit;
    try {
      const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      visualAudit = JSON.parse(cleanedText);
    } catch {
      console.error("Failed to parse visual analysis response:", text);
      return NextResponse.json(
        { success: false, error: "Failed to parse visual analysis response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      visualAudit,
    });
  } catch (error) {
    console.error("Visual analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: `Visual analysis failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
