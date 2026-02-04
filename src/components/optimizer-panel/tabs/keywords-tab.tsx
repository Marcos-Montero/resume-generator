"use client";

import { CheckCircle2, XCircle, AlertTriangle, Zap } from "lucide-react";
import { ATSCoreAnalysis } from "@/types/ats-core";

export function KeywordsTab({ analysis }: { analysis: ATSCoreAnalysis }) {
  const { keyword_analysis } = analysis;

  const hasJobDescription = analysis.scores.keyword_relevance_score > 0 || 
    keyword_analysis.missing_critical_skills.length > 0 ||
    keyword_analysis.exact_matches.length > 0;

  if (!hasJobDescription) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-gray-700">No Job Description Provided</p>
        <p className="text-xs text-gray-500 mt-1">
          Add a job description to get keyword matching analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {keyword_analysis.exact_matches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Exact Matches ({keyword_analysis.exact_matches.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {keyword_analysis.exact_matches.map((match, index) => (
              <div
                key={index}
                className="group relative px-2 py-1 bg-green-100 border border-green-200 rounded-full"
              >
                <span className="text-xs font-medium text-green-800">{match.keyword}</span>
                <span
                  className={`ml-1 text-[10px] ${
                    match.recency_weight === "High"
                      ? "text-green-600"
                      : match.recency_weight === "Medium"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {match.recency_weight === "High" && "↑"}
                  {match.recency_weight === "Low" && "↓"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {keyword_analysis.missing_critical_skills.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-600" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-red-700">
              Missing Critical Skills ({keyword_analysis.missing_critical_skills.length})
            </h4>
          </div>
          <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[10px] text-red-600 mb-2">
              These skills are required in the job description but missing from your resume.
              Each missing skill reduces your score by ~20%.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {keyword_analysis.missing_critical_skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-red-200 text-red-800 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {keyword_analysis.missing_soft_skills.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
              Missing Soft Skills
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {keyword_analysis.missing_soft_skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {keyword_analysis.keyword_stuffing_detected.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-orange-600" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-700">
              Keyword Stuffing Detected
            </h4>
          </div>
          <div className="p-2 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-[10px] text-orange-600 mb-2">
              These keywords appear too frequently (&gt;3% of document). This may trigger spam filters.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {keyword_analysis.keyword_stuffing_detected.map((term, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-orange-200 text-orange-800 text-xs font-medium rounded-full"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {keyword_analysis.missing_critical_skills.length === 0 &&
        keyword_analysis.exact_matches.length > 0 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-700">Good Keyword Coverage</p>
                <p className="text-xs text-green-600">
                  All critical skills from the job description are present
                </p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
