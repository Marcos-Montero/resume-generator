"use client";

import {
  Eye,
  Columns,
  Type,
  Image,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { VisualAudit } from "@/types/ats-core";

const getRiskColor = (level: string) => {
  switch (level) {
    case "LOW":
      return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" };
    case "MEDIUM":
      return { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" };
    case "HIGH":
      return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };
  }
};

const getCompatibilityColor = (compat: string) => {
  switch (compat) {
    case "SAFE":
      return { bg: "bg-green-100", text: "text-green-700" };
    case "RISKY":
      return { bg: "bg-red-100", text: "text-red-700" };
    default:
      return { bg: "bg-yellow-100", text: "text-yellow-700" };
  }
};

export function VisualTab({ visualAudit }: { visualAudit: VisualAudit | null }) {
  if (!visualAudit) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-gray-700">Visual Analysis Not Run</p>
        <p className="text-xs text-gray-500 mt-1">
          Click "Run ATS Analysis" to include visual parsing check
        </p>
      </div>
    );
  }

  const riskColors = getRiskColor(visualAudit.layout_risk_level);
  const fontColors = getCompatibilityColor(visualAudit.font_analysis.ats_compatibility);

  return (
    <div className="space-y-4">
      <div className={`p-3 rounded-lg border ${riskColors.bg} ${riskColors.border}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Columns className={`w-4 h-4 ${riskColors.text}`} />
            <span className="text-sm font-semibold text-gray-700">Layout Analysis</span>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${riskColors.bg} ${riskColors.text}`}>
            {visualAudit.layout_risk_level} RISK
          </span>
        </div>
        <p className={`text-sm font-medium ${riskColors.text} capitalize`}>
          {visualAudit.layout_type.replace("-", " ")} Layout
        </p>
        {visualAudit.layout_issues.length > 0 && (
          <div className="mt-2 space-y-1">
            {visualAudit.layout_issues.map((issue, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                <AlertTriangle className="w-3 h-3 text-yellow-600 shrink-0 mt-0.5" />
                <span>{issue}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`p-3 rounded-lg border ${fontColors.bg} border-gray-200`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Type className={`w-4 h-4 ${fontColors.text}`} />
            <span className="text-sm font-semibold text-gray-700">Font Analysis</span>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${fontColors.bg} ${fontColors.text}`}>
            {visualAudit.font_analysis.ats_compatibility}
          </span>
        </div>
        {visualAudit.font_analysis.detected_fonts.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {visualAudit.font_analysis.detected_fonts.map((font, i) => (
              <span key={i} className="px-2 py-0.5 bg-white border border-gray-200 text-xs rounded">
                {font}
              </span>
            ))}
          </div>
        )}
        {visualAudit.font_analysis.recommendations.length > 0 && (
          <div className="space-y-1">
            {visualAudit.font_analysis.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                <ArrowRight className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <Image className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Visual Elements</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {[
            { label: "Graphics", value: visualAudit.visual_elements.has_graphics },
            { label: "Icons", value: visualAudit.visual_elements.has_icons },
            { label: "Progress Bars", value: visualAudit.visual_elements.has_progress_bars },
            { label: "Tables", value: visualAudit.visual_elements.has_tables },
            { label: "Text Boxes", value: visualAudit.visual_elements.has_text_boxes },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 p-1.5 rounded text-xs ${
                item.value ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
              }`}
            >
              {item.value ? (
                <XCircle className="w-3 h-3" />
              ) : (
                <CheckCircle2 className="w-3 h-3" />
              )}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        {visualAudit.visual_elements.issues.length > 0 && (
          <div className="space-y-1 pt-2 border-t border-gray-100">
            {visualAudit.visual_elements.issues.map((issue, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-red-700">
                <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                <span>{issue}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`p-3 rounded-lg border ${
          visualAudit.linearization_test.passes
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Linearization Test</span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded ${
              visualAudit.linearization_test.passes
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {visualAudit.linearization_test.passes ? "PASS" : "FAIL"}
          </span>
        </div>
        <p className="text-xs text-gray-600 mb-2">
          Tests if reading left-to-right, line-by-line produces coherent text
        </p>
        {visualAudit.linearization_test.problem_areas.length > 0 && (
          <div className="space-y-1">
            {visualAudit.linearization_test.problem_areas.map((area, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-red-700">
                <XCircle className="w-3 h-3 shrink-0 mt-0.5" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        )}
        {visualAudit.linearization_test.reading_order_issues.length > 0 && (
          <div className="mt-2 p-2 bg-white rounded border border-red-200">
            <p className="text-[10px] font-semibold text-red-700 mb-1">Reading Order Issues:</p>
            {visualAudit.linearization_test.reading_order_issues.map((issue, i) => (
              <p key={i} className="text-[10px] text-red-600 font-mono">
                {issue}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-xs font-semibold text-blue-700 mb-2">ATS-Safe Fonts</h4>
        <div className="flex flex-wrap gap-1">
          {["Arial", "Calibri", "Helvetica", "Times New Roman", "Georgia", "Verdana"].map((font) => (
            <span key={font} className="px-2 py-0.5 bg-white text-blue-700 text-[10px] rounded border border-blue-200">
              {font}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-blue-600 mt-2">
          These fonts are universally supported by all ATS systems. Calibri and Arial are recommended
          for modern, clean appearance.
        </p>
      </div>
    </div>
  );
}
