import { NextRequest, NextResponse } from "next/server";
import {
  getCompanyHistory,
  updateCompanyMeta,
  deleteCompany,
  addVersionToCompany,
} from "@/lib/company-versions-storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const history = await getCompanyHistory(companyId);
    
    if (!history) {
      return NextResponse.json(
        { success: false, error: "Company not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch company" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const body = await request.json();
    
    const history = await updateCompanyMeta(companyId, {
      companyName: body.companyName,
      jobTitle: body.jobTitle,
      notes: body.notes,
    });
    
    if (!history) {
      return NextResponse.json(
        { success: false, error: "Company not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update company" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const success = await deleteCompany(companyId);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to delete company" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete company" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const body = await request.json();
    
    if (!body.resumeData) {
      return NextResponse.json(
        { success: false, error: "Resume data is required" },
        { status: 400 }
      );
    }
    
    const version = await addVersionToCompany(
      companyId,
      body.resumeData,
      body.jobTitle,
      body.jobDescription,
      body.notes,
      body.llmPromptUsed
    );
    
    if (!version) {
      return NextResponse.json(
        { success: false, error: "Company not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, version });
  } catch (error) {
    console.error("Error adding version:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add version" },
      { status: 500 }
    );
  }
}
