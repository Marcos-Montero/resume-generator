"use client";

import { TrendingUp, AlertTriangle, CheckCircle2, Calendar, BarChart3 } from "lucide-react";
import { ATSCoreAnalysis } from "@/types/ats-core";

export function QualityTab({ analysis }: { analysis: ATSCoreAnalysis }) {
  const { content_quality } = analysis;

  const getMetricDensityColor = (density: number) => {
    if (density >= 40) return { color: "text-green-700", bg: "bg-green-100", bar: "bg-green-500" };
    if (density >= 20) return { color: "text-yellow-700", bg: "bg-yellow-100", bar: "bg-yellow-500" };
    return { color: "text-red-700", bg: "bg-red-100", bar: "bg-red-500" };
  };

  const getVerbStrengthColor = (strength: string) => {
    switch (strength) {
      case "High":
        return { color: "text-green-700", bg: "bg-green-100" };
      case "Medium":
        return { color: "text-yellow-700", bg: "bg-yellow-100" };
      default:
        return { color: "text-red-700", bg: "bg-red-100" };
    }
  };

  const densityColors = getMetricDensityColor(content_quality.metric_density_percentage);
  const verbColors = getVerbStrengthColor(content_quality.action_verb_strength);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className={`p-3 rounded-lg ${densityColors.bg} border border-gray-200`}>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className={`w-4 h-4 ${densityColors.color}`} />
            <span className="text-xs font-semibold text-gray-700">Metric Density</span>
          </div>
          <div className={`text-2xl font-bold ${densityColors.color}`}>
            {content_quality.metric_density_percentage.toFixed(0)}%
          </div>
          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${densityColors.bar}`}
              style={{ width: `${Math.min(100, content_quality.metric_density_percentage)}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-600 mt-1">Target: &gt;40%</p>
        </div>

        <div className={`p-3 rounded-lg ${verbColors.bg} border border-gray-200`}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className={`w-4 h-4 ${verbColors.color}`} />
            <span className="text-xs font-semibold text-gray-700">Action Verbs</span>
          </div>
          <div className={`text-2xl font-bold ${verbColors.color}`}>
            {content_quality.action_verb_strength}
          </div>
          <p className="text-[10px] text-gray-600 mt-3">
            {content_quality.action_verb_strength === "High"
              ? "Strong action verbs used"
              : content_quality.action_verb_strength === "Medium"
              ? "Some weak verbs detected"
              : "Needs stronger verbs"}
          </p>
        </div>
      </div>

      <div
        className={`p-3 rounded-lg border ${
          content_quality.career_gaps_detected
            ? "bg-yellow-50 border-yellow-200"
            : "bg-green-50 border-green-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {content_quality.career_gaps_detected ? (
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          ) : (
            <Calendar className="w-5 h-5 text-green-600" />
          )}
          <div>
            <p
              className={`text-sm font-semibold ${
                content_quality.career_gaps_detected ? "text-yellow-700" : "text-green-700"
              }`}
            >
              {content_quality.career_gaps_detected ? "Career Gaps Detected" : "No Career Gaps"}
            </p>
            <p className="text-xs text-gray-600">
              {content_quality.career_gaps_detected
                ? "Gaps >6 months found between positions"
                : "Continuous employment history"}
            </p>
          </div>
        </div>
      </div>

      {content_quality.formatting_warnings.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
              Formatting Warnings ({content_quality.formatting_warnings.length})
            </h4>
          </div>
          <div className="space-y-1.5">
            {content_quality.formatting_warnings.map((warning, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded"
              >
                <span className="text-yellow-600 text-xs">•</span>
                <span className="text-xs text-yellow-800">{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {content_quality.formatting_warnings.length === 0 && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-700">Clean Formatting</p>
              <p className="text-xs text-green-600">No formatting issues detected</p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-500 mb-2">Recency Scoring Rules</h4>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 bg-gray-50 rounded">
            <span className="text-green-600 font-medium">0-2 years: x1.5</span>
            <p className="text-gray-500">Current role skills weighted highest</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <span className="text-blue-600 font-medium">2-5 years: x1.0</span>
            <p className="text-gray-500">Recent experience baseline</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <span className="text-yellow-600 font-medium">5-10 years: x0.5</span>
            <p className="text-gray-500">Legacy skills half-weighted</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <span className="text-gray-500 font-medium">&gt;10 years: x0.1</span>
            <p className="text-gray-500">Ancient skills nearly irrelevant</p>
          </div>
        </div>
      </div>
    </div>
  );
}
