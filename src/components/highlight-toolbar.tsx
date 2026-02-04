"use client";

import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useResumeStore } from "@/store/resume-store";

export function HighlightToolbar() {
  const { activeCompanyVersion, showChangeHighlights, setShowChangeHighlights } = useResumeStore();

  if (!activeCompanyVersion) return null;

  const hasChanges = activeCompanyVersion.changes && activeCompanyVersion.changes.length > 0;

  return (
    <div className="fixed top-20 right-4 z-30 flex flex-col gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 px-2 py-1 bg-purple-50 rounded text-xs text-purple-700 font-medium">
        <Sparkles className="w-3 h-3" />
        v{activeCompanyVersion.version}
      </div>
      
      {hasChanges && (
        <button
          onClick={() => setShowChangeHighlights(!showChangeHighlights)}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            showChangeHighlights
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
          }`}
          title={showChangeHighlights ? "Hide change highlights" : "Show change highlights"}
        >
          {showChangeHighlights ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Highlights On</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Highlights Off</span>
            </>
          )}
        </button>
      )}

      <div className="text-[10px] text-gray-500 px-1 max-w-[140px]">
        {activeCompanyVersion.changes?.length || 0} changes
      </div>
    </div>
  );
}
