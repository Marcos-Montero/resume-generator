"use client";

import { FileText } from "lucide-react";
import { ResumeTemplate } from "@/components/resume-template";
import { PDFDownloadButton } from "@/components/pdf-download-button";
import { useResumeStore } from "@/store/resume-store";
import { RESUME_VERSIONS } from "@/data/resume-versions";

export default function HomePage() {
  const { resumeData, currentVersion, setVersion } = useResumeStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-gray-900" />
              <h1 className="text-xl font-semibold text-gray-900">Resume Generator</h1>
            </div>
            <PDFDownloadButton data={resumeData} />
          </div>
          
          {/* Version Navigator */}
          <div className="flex flex-wrap gap-2">
            {RESUME_VERSIONS.map((version) => (
              <button
                key={version.id}
                onClick={() => setVersion(version.id)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  currentVersion === version.id
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
                title={version.description}
              >
                {version.name}
              </button>
            ))}
          </div>
          
          {/* Version Info */}
          {currentVersion && (
            <div className="mt-2 text-xs text-gray-600">
              {RESUME_VERSIONS.find(v => v.id === currentVersion)?.description}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-6 flex justify-center">
          <div className="shrink-0">
            <ResumeTemplate data={resumeData} />
          </div>
        </div>
      </main>
    </div>
  );
}
