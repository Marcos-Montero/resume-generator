"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Building2, Briefcase, FileText, Sparkles, History, Clock, Check } from "lucide-react";
import { useCompanyVersionsStore } from "@/store/company-versions-store";
import { useResumeStore } from "@/store/resume-store";

export function CompanyModal() {
  const {
    isModalOpen,
    modalMode,
    setModalOpen,
    selectedHistory,
    isGenerating,
    generationError,
    createCompanyVersion,
    generateNewVersion,
    switchVersion,
    updateCompanyMeta,
  } = useCompanyVersionsStore();

  const { resumeData, currentVersion, setResumeData, setActiveCompanyVersion } = useResumeStore();

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [userInstructions, setUserInstructions] = useState("");

  useEffect(() => {
    if (isModalOpen && modalMode === "edit" && selectedHistory) {
      const currentVer = selectedHistory.versions.find(
        (v) => v.id === selectedHistory.currentVersionId
      );
      if (currentVer) {
        setCompanyName(selectedHistory.companyName);
        setJobTitle(currentVer.jobTitle);
        setJobDescription(currentVer.jobDescription || "");
      }
    } else if (modalMode === "create") {
      setCompanyName("");
      setJobTitle("");
      setJobDescription("");
      setUserInstructions("");
    }
  }, [isModalOpen, modalMode, selectedHistory]);

  const handleCreate = async () => {
    const result = await createCompanyVersion(
      companyName,
      jobTitle,
      resumeData,
      currentVersion,
      jobDescription,
      userInstructions
    );

    if (result) {
      setResumeData(result.resumeData);
      setActiveCompanyVersion(result.version);
      setModalOpen(false);
    }
  };

  const handleGenerateNewVersion = async () => {
    if (!selectedHistory) return;

    const currentVer = selectedHistory.versions.find(
      (v) => v.id === selectedHistory.currentVersionId
    );
    if (!currentVer) return;

    const result = await generateNewVersion(
      selectedHistory.companyId,
      currentVer.resumeData,
      userInstructions,
      jobTitle || currentVer.jobTitle,
      jobDescription || currentVer.jobDescription
    );

    if (result) {
      setResumeData(result.resumeData);
      setActiveCompanyVersion(result.version);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedHistory) return;

    await updateCompanyMeta(selectedHistory.companyId, {
      companyName,
      jobTitle,
    });
    setModalOpen(false);
  };

  const handleLoadVersion = (versionId: string) => {
    if (!selectedHistory) return;
    
    const version = selectedHistory.versions.find((v) => v.id === versionId);
    if (version) {
      setResumeData(version.resumeData);
      setActiveCompanyVersion(version);
      switchVersion(selectedHistory.companyId, versionId);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="flex items-center gap-2">
            {modalMode === "history" ? (
              <History className="w-5 h-5 text-white" />
            ) : modalMode === "edit" ? (
              <Building2 className="w-5 h-5 text-white" />
            ) : (
              <Sparkles className="w-5 h-5 text-white" />
            )}
            <h2 className="text-lg font-semibold text-white">
              {modalMode === "create" && "Create Company CV"}
              {modalMode === "edit" && "Edit Company CV"}
              {modalMode === "history" && "Version History"}
            </h2>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {modalMode === "history" && selectedHistory && (
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-semibold text-purple-900">{selectedHistory.companyName}</p>
                <p className="text-sm text-purple-700">
                  {selectedHistory.versions.length} version(s)
                </p>
              </div>

              <div className="space-y-2">
                {selectedHistory.versions
                  .slice()
                  .sort((a, b) => b.version - a.version)
                  .map((version) => (
                    <div
                      key={version.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        version.id === selectedHistory.currentVersionId
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() => handleLoadVersion(version.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            v{version.version}
                          </span>
                          {version.id === selectedHistory.currentVersionId && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-purple-600 text-white rounded">
                              Current
                            </span>
                          )}
                        </div>
                        <Check
                          className={`w-4 h-4 ${
                            version.id === selectedHistory.currentVersionId
                              ? "text-purple-600"
                              : "text-transparent"
                          }`}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{version.jobTitle}</p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                        <Clock className="w-3 h-3" />
                        {new Date(version.createdAt).toLocaleDateString()}
                      </div>
                      {version.changeSummary && (
                        <p className="text-[10px] text-gray-600 mt-1.5 line-clamp-2">
                          {version.changeSummary}
                        </p>
                      )}
                    </div>
                  ))}
              </div>

              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Generate New Version</h4>
                <textarea
                  value={userInstructions}
                  onChange={(e) => setUserInstructions(e.target.value)}
                  placeholder="Describe what changes you want to make..."
                  className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none"
                />
                <button
                  onClick={handleGenerateNewVersion}
                  disabled={isGenerating || !userInstructions.trim()}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white text-sm font-medium rounded-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate New Version
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {(modalMode === "create" || modalMode === "edit") && (
            <>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Building2 className="w-4 h-4" />
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Google, Microsoft, Startup Inc."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Briefcase className="w-4 h-4" />
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FileText className="w-4 h-4" />
                  Job Description
                  <span className="text-xs text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here for better tailoring..."
                  className="w-full h-28 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none"
                />
              </div>

              {modalMode === "create" && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Sparkles className="w-4 h-4" />
                    Additional Instructions
                    <span className="text-xs text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={userInstructions}
                    onChange={(e) => setUserInstructions(e.target.value)}
                    placeholder="e.g., Emphasize my leadership experience, focus on cloud technologies..."
                    className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none"
                  />
                </div>
              )}

              {generationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{generationError}</p>
                </div>
              )}
            </>
          )}
        </div>

        <footer className="px-5 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            
            {modalMode === "create" && (
              <button
                onClick={handleCreate}
                disabled={isGenerating || !companyName.trim() || !jobTitle.trim()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 rounded-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate CV
                  </>
                )}
              </button>
            )}
            
            {modalMode === "edit" && (
              <button
                onClick={handleSaveEdit}
                disabled={!companyName.trim() || !jobTitle.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 rounded-lg"
              >
                Save Changes
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
