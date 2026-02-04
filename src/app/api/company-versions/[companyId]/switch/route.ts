import { NextRequest, NextResponse } from "next/server";
import { switchToVersion, getCompanyHistory } from "@/lib/company-versions-storage";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const body = await request.json();
    
    if (!body.versionId) {
      return NextResponse.json(
        { success: false, error: "Version ID is required" },
        { status: 400 }
      );
    }
    
    const success = await switchToVersion(companyId, body.versionId);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to switch version" },
        { status: 500 }
      );
    }
    
    const history = await getCompanyHistory(companyId);
    
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error switching version:", error);
    return NextResponse.json(
      { success: false, error: "Failed to switch version" },
      { status: 500 }
    );
  }
}
