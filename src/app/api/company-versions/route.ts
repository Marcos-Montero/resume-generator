import { NextRequest, NextResponse } from "next/server";
import { getAllCompanyMetas, createCompanyVersion } from "@/lib/company-versions-storage";
import { CreateCompanyVersionRequest } from "@/types/company-version";

export async function GET() {
  try {
    const metas = await getAllCompanyMetas();
    return NextResponse.json({ success: true, companies: metas });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateCompanyVersionRequest = await request.json();
    
    if (!body.companyName || !body.jobTitle || !body.baseResumeData) {
      return NextResponse.json(
        { success: false, error: "Company name, job title, and resume data are required" },
        { status: 400 }
      );
    }
    
    const version = await createCompanyVersion(
      body.companyName,
      body.jobTitle,
      body.baseResumeData,
      body.baseVersionId,
      body.jobDescription,
      body.notes
    );
    
    return NextResponse.json({ success: true, version });
  } catch (error) {
    console.error("Error creating company version:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create company version" },
      { status: 500 }
    );
  }
}
