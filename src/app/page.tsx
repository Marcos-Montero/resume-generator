"use client";

import { FileText, ArrowLeftRight, X } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ResumeTemplate } from "@/components/resume-template";
import { PDFDownloadButton } from "@/components/pdf-download-button";
import { OptimizerPanel } from "@/components/optimizer-panel";
import { OptimizedResumePreview } from "@/components/optimized-resume-preview";
import { CompanyDropdown, CompanyModal } from "@/components/company-versions";
import { HighlightToolbar } from "@/components/highlight-toolbar";
import { useResumeStore } from "@/store/resume-store";
import { useOptimizerStore } from "@/store/optimizer-store";
import { RESUME_VERSIONS } from "@/data/resume-versions";

export default function HomePage() {
  const { resumeData, currentVersion, setVersion, activeCompanyVersion, showChangeHighlights } = useResumeStore();
  const { analysisResult, showOptimizedPreview, setShowOptimizedPreview } = useOptimizerStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <OptimizerPanel />
      <CompanyModal />
      <HighlightToolbar />
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-2 md:px-4 py-2 md:py-3">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <div className="flex items-center gap-2 md:gap-3">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                <span className="hidden sm:inline">Resume Generator</span>
                <span className="sm:hidden">Resume</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <CompanyDropdown />
              {analysisResult && (
                <button
                  onClick={() => setShowOptimizedPreview(!showOptimizedPreview)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    showOptimizedPreview
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {showOptimizedPreview ? (
                    <>
                      <X className="w-3.5 h-3.5" />
                      Hide Comparison
                    </>
                  ) : (
                    <>
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      Show Optimized
                    </>
                  )}
                </button>
              )}
              <PDFDownloadButton data={resumeData} />
            </div>
          </div>

          <div className="flex flex-wrap gap-1 md:gap-2">
            {RESUME_VERSIONS.map((version) => (
              <button
                key={version.id}
                onClick={() => setVersion(version.id)}
                className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm rounded-md transition-colors ${
                  currentVersion === version.id
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
                title={version.description}
              >
                <span className="hidden sm:inline">{version.name}</span>
                <span className="sm:hidden">{version.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {currentVersion && (
            <div className="mt-2 text-xs text-gray-600 hidden md:block">
              {RESUME_VERSIONS.find((v) => v.id === currentVersion)?.description}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {showOptimizedPreview && analysisResult ? (
          <div className="flex-1 overflow-auto bg-gray-200 p-2">
            <div className="flex gap-2 justify-center items-start min-h-full">
              <div className="flex flex-col items-center">
                <div className="mb-1 px-2 py-0.5 bg-gray-600 text-white text-[10px] font-semibold rounded">
                  ORIGINAL
                </div>
                <div className="transform scale-[0.48] origin-top -mt-4">
                  <ResumeTemplate data={resumeData} />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-1 px-2 py-0.5 bg-green-600 text-white text-[10px] font-semibold rounded">
                  OPTIMIZED
                </div>
                <div className="transform scale-[0.48] origin-top -mt-4">
                  <OptimizedResumePreview originalData={resumeData} analysis={analysisResult} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <TransformWrapper
              initialScale={0.6}
              minScale={0.3}
              maxScale={2}
              centerOnInit={true}
              centerZoomedOut={true}
              limitToBounds={false}
              wheel={{ step: 0.1 }}
              pinch={{ step: 5 }}
              doubleClick={{ step: 0.5, mode: "toggle" }}
              panning={{
                velocityDisabled: true,
                lockAxisX: false,
                lockAxisY: false,
              }}
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
                contentStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div className="p-4">
                  <ResumeTemplate 
                    data={resumeData}
                    showBorder={!!activeCompanyVersion}
                    changes={activeCompanyVersion?.changes}
                    showHighlights={showChangeHighlights && !!activeCompanyVersion}
                  />
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>
        )}
      </main>
    </div>
  );
}
