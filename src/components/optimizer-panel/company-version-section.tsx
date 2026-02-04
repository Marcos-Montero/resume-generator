"use client";

import { useState } from "react";
import { Building2, Clock, ChevronDown, ChevronUp, Sparkles, Loader2, Check, FileText } from "lucide-react";
import { useResumeStore } from "@/store/resume-store";
import { useCompanyVersionsStore } from "@/store/company-versions-store";

export function CompanyVersionSection() {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [userInstructions, setUserInstructions] = useState("");
  
  const { activeCompanyVersion, setResumeData, setActiveCompanyVersion } = useResumeStore();
  const { 
    selectedHistory,
    isGenerating,
    generationError,
    generateNewVersion,
    switchVersion,
    fetchCompanyHistory,
  } = useCompanyVersionsStore();

  if (!activeCompanyVersion) return null;

  const handleGenerateNewVersion = async () => {
    if (!userInstructions.trim()) return;

    const result = await generateNewVersion(
      activeCompanyVersion.companyId,
      activeCompanyVersion.resumeData,
      userInstructions,
      activeCompanyVersion.jobTitle,
      activeCompanyVersion.jobDescription
    );

    if (result) {
      setResumeData(result.resumeData);
      setActiveCompanyVersion(result.version);
      setUserInstructions("");
    }
  };

  const handleSwitchVersion = async (versionId: string) => {
    if (!selectedHistory) {
      await fetchCompanyHistory(activeCompanyVersion.companyId);
    }
    
    const history = useCompanyVersionsStore.getState().selectedHistory;
    if (!history) return;

    const version = history.versions.find((v) => v.id === versionId);
    if (version) {
      await switchVersion(activeCompanyVersion.companyId, versionId);
      setResumeData(version.resumeData);
      setActiveCompanyVersion(version);
    }
  };

  const loadHistoryIfNeeded = async () => {
    if (!selectedHistory || selectedHistory.companyId !== activeCompanyVersion.companyId) {
      await fetchCompanyHistory(activeCompanyVersion.companyId);
    }
    setIsHistoryExpanded(!isHistoryExpanded);
  };

  const versions = selectedHistory?.versions || [activeCompanyVersion];

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-white" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">
              {activeCompanyVersion.companyName}
            </h3>
            <p className="text-[10px] text-purple-200 truncate">
              {activeCompanyVersion.jobTitle}
            </p>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-white/20 text-white rounded">
            v{activeCompanyVersion.version}
          </span>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {activeCompanyVersion.changeSummary && (
          <div className="p-2 bg-white border border-purple-100 rounded">
            <div className="flex items-start gap-2">
              <FileText className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-medium text-purple-700 mb-0.5">Changes in this version:</p>
                <p className="text-[11px] text-gray-700">{activeCompanyVersion.changeSummary}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={loadHistoryIfNeeded}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 rounded hover:bg-purple-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Version History
          </div>
          {isHistoryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isHistoryExpanded && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {versions
              .slice()
              .sort((a, b) => b.version - a.version)
              .map((version) => (
                <div
                  key={version.id}
                  onClick={() => handleSwitchVersion(version.id)}
                  className={`p-2 border rounded cursor-pointer transition-colors ${
                    version.id === activeCompanyVersion.id
                      ? "border-purple-400 bg-purple-100"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-900">v{version.version}</span>
                      {version.id === activeCompanyVersion.id && (
                        <Check className="w-3 h-3 text-purple-600" />
                      )}
                    </div>
                    <span className="text-[9px] text-gray-400">
                      {new Date(version.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {version.changeSummary && (
                    <p className="text-[10px] text-gray-600 mt-1 line-clamp-2">
                      {version.changeSummary}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}

        <div className="pt-2 border-t border-purple-200">
          <label className="text-[10px] font-medium text-purple-700 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Modify with AI
          </label>
          <textarea
            value={userInstructions}
            onChange={(e) => setUserInstructions(e.target.value)}
            placeholder="Describe what changes you want..."
            className="w-full h-16 px-2 py-1.5 text-xs border border-purple-200 rounded resize-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleGenerateNewVersion}
            disabled={isGenerating || !userInstructions.trim()}
            className="w-full mt-2 flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white text-xs font-medium rounded transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Generate New Version
              </>
            )}
          </button>
          {generationError && (
            <p className="text-[10px] text-red-600 mt-1">{generationError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
