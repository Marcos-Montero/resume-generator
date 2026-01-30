"use client";

import { FileText } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ResumeTemplate } from "@/components/resume-template";
import { PDFDownloadButton } from "@/components/pdf-download-button";
import { useResumeStore } from "@/store/resume-store";
import { RESUME_VERSIONS } from "@/data/resume-versions";

export default function HomePage() {
  const { resumeData, currentVersion, setVersion } = useResumeStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
            <PDFDownloadButton data={resumeData} />
          </div>
          
          {/* Version Navigator */}
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
                <span className="sm:hidden">{version.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          
          {/* Version Info */}
          {currentVersion && (
            <div className="mt-2 text-xs text-gray-600 hidden md:block">
              {RESUME_VERSIONS.find(v => v.id === currentVersion)?.description}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <TransformWrapper
            initialScale={0.6}
            minScale={0.3}
            maxScale={2}
            centerOnInit={true}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
            doubleClick={{ step: 0.5, mode: "toggle" }}
          >
            <TransformComponent 
              wrapperStyle={{ 
                width: "100%", 
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              contentStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%"
              }}
            >
              <div className="p-4">
                <ResumeTemplate data={resumeData} />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </main>
    </div>
  );
}
