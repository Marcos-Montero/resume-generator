"use client";

import { ChevronLeft, ChevronRight, Cpu, X, Loader2, Camera } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { useOptimizerStore } from "@/store/optimizer-store";
import { useResumeStore } from "@/store/resume-store";
import { resumeToText } from "@/lib/resume-to-text";
import { ATSAnalysisResponse, VisualAudit } from "@/types/ats-core";
import { JobDescriptionInput } from "./job-description-input";
import { CompanyVersionSection } from "./company-version-section";
import { ScoresTab } from "./tabs/scores-tab";
import { VisualTab } from "./tabs/visual-tab";
import { ParsingTab } from "./tabs/parsing-tab";
import { KeywordsTab } from "./tabs/keywords-tab";
import { QualityTab } from "./tabs/quality-tab";
import { OptimizeTab } from "./tabs/optimize-tab";

const TABS = [
  { id: "scores", label: "Scores" },
  { id: "visual", label: "Visual" },
  { id: "parsing", label: "Parsing" },
  { id: "keywords", label: "Keywords" },
  { id: "quality", label: "Quality" },
  { id: "optimize", label: "Optimize" },
] as const;

export function OptimizerPanel() {
  const resumeRef = useRef<HTMLDivElement | null>(null);
  const { resumeData, activeCompanyVersion } = useResumeStore();
  const {
    isPanelOpen,
    togglePanel,
    resetAll,
    jobDescription,
    analysisLoading,
    analysisError,
    analysisResult,
    setAnalysisLoading,
    setAnalysisError,
    setAnalysisResult,
    visualLoading,
    visualResult,
    setVisualLoading,
    setVisualError,
    setVisualResult,
    activeTab,
    setActiveTab,
  } = useOptimizerStore();

  const captureResumeScreenshot = async (): Promise<string | null> => {
    const resumeElement = document.querySelector('[data-resume-template="true"]');
    if (!resumeElement) {
      console.error("Resume element not found");
      return null;
    }

    try {
      const canvas = await html2canvas(resumeElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Screenshot capture failed:", error);
      return null;
    }
  };

  const runVisualAnalysis = async (screenshotBase64: string) => {
    setVisualLoading(true);
    setVisualError(null);

    try {
      const response = await fetch("/api/ats-core/visual-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ screenshotBase64 }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Visual analysis failed");
      }

      setVisualResult(data.visualAudit as VisualAudit);
    } catch (error) {
      setVisualError(error instanceof Error ? error.message : "Visual analysis failed");
    } finally {
      setVisualLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    setVisualResult(null);

    try {
      const resumeText = resumeToText(resumeData);

      const [analysisResponse, screenshot] = await Promise.all([
        fetch("/api/ats-core/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText,
            jobDescription: jobDescription.trim() || undefined,
          }),
        }),
        captureResumeScreenshot(),
      ]);

      const data: ATSAnalysisResponse = await analysisResponse.json();

      if (!data.success || !data.analysis) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysisResult(data.analysis);
      setActiveTab("scores");

      if (screenshot) {
        runVisualAnalysis(screenshot);
      }
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setAnalysisLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "scores":
        return analysisResult ? <ScoresTab analysis={analysisResult} /> : null;
      case "visual":
        return <VisualTab visualAudit={visualResult} />;
      case "parsing":
        return analysisResult ? <ParsingTab analysis={analysisResult} /> : null;
      case "keywords":
        return analysisResult ? <KeywordsTab analysis={analysisResult} /> : null;
      case "quality":
        return analysisResult ? <QualityTab analysis={analysisResult} /> : null;
      case "optimize":
        return analysisResult ? <OptimizeTab analysis={analysisResult} /> : null;
      default:
        return null;
    }
  };

  const isLoading = analysisLoading || visualLoading;

  return (
    <>
      <button
        onClick={togglePanel}
        className={`fixed top-1/2 -translate-y-1/2 z-30 bg-gradient-to-b from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white p-2 rounded-r-lg shadow-lg transition-all duration-300 ${
          isPanelOpen ? "left-[420px]" : "left-0"
        }`}
        title={isPanelOpen ? "Close ATS Panel" : "Open ATS Panel"}
      >
        {isPanelOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-[420px] bg-gray-50 border-r border-gray-200 shadow-xl z-20 transform transition-transform duration-300 ease-in-out ${
          isPanelOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-white" />
              <div>
                <h2 className="text-lg font-semibold text-white">ATS CORE</h2>
                <p className="text-[10px] text-indigo-200">Enterprise ATS Simulation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetAll}
                className="text-white/80 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={togglePanel}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {activeCompanyVersion && <CompanyVersionSection />}
              
              <JobDescriptionInput />

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-400 disabled:to-purple-400 text-white text-sm font-semibold rounded-lg shadow-md transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {analysisLoading ? "Analyzing Text..." : "Analyzing Visual..."}
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <Camera className="w-4 h-4" />
                    Run Full ATS Analysis
                  </>
                )}
              </button>

              {(visualLoading && !analysisLoading) && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-xs text-blue-700">Running visual layout analysis...</span>
                </div>
              )}

              {analysisError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">Analysis Error</p>
                  <p className="text-xs text-red-600 mt-1">{analysisError}</p>
                </div>
              )}

              {(analysisResult || visualResult) && (
                <div className="space-y-3">
                  <div className="flex gap-0.5 p-1 bg-gray-200 rounded-lg overflow-x-auto">
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-shrink-0 px-2 py-1.5 text-[10px] font-medium rounded-md transition-colors ${
                          activeTab === tab.id
                            ? "bg-white text-indigo-700 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        } ${tab.id === "visual" && visualResult?.layout_risk_level === "HIGH" ? "text-red-600" : ""}`}
                      >
                        {tab.label}
                        {tab.id === "visual" && visualResult && (
                          <span
                            className={`ml-1 w-1.5 h-1.5 rounded-full inline-block ${
                              visualResult.layout_risk_level === "HIGH"
                                ? "bg-red-500"
                                : visualResult.layout_risk_level === "MEDIUM"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    {renderTabContent()}
                  </div>
                </div>
              )}
            </div>
          </div>

          <footer className="px-4 py-2 border-t border-gray-200 bg-gray-100">
            <p className="text-[10px] text-gray-500 text-center">
              Powered by Gemini 2.0 Flash | Text + Visual Analysis
            </p>
          </footer>
        </div>
      </aside>
    </>
  );
}
