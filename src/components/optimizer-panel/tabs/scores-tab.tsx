"use client";

import { ATSCoreAnalysis } from "@/types/ats-core";

const getScoreColor = (score: number) => {
  if (score >= 70) return { bg: "bg-green-500", text: "text-green-700", light: "bg-green-100" };
  if (score >= 40) return { bg: "bg-yellow-500", text: "text-yellow-700", light: "bg-yellow-100" };
  return { bg: "bg-red-500", text: "text-red-700", light: "bg-red-100" };
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  if (score >= 30) return "Poor";
  return "Critical";
};

function ScoreBar({ label, score, description }: { label: string; score: number; description: string }) {
  const colors = getScoreColor(score);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">{label}</span>
        <span className={`text-xs font-bold ${colors.text}`}>{score.toFixed(0)}/100</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.bg} transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-500">{description}</p>
    </div>
  );
}

export function ScoresTab({ analysis }: { analysis: ATSCoreAnalysis }) {
  const { scores } = analysis;
  const globalColors = getScoreColor(scores.global_match_score);

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${globalColors.light} border border-gray-200`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Global ATS Score</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${globalColors.light} ${globalColors.text}`}>
            {getScoreLabel(scores.global_match_score)}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className={`text-4xl font-bold ${globalColors.text}`}>
            {scores.global_match_score.toFixed(0)}
          </span>
          <span className="text-lg text-gray-400 mb-1">/100</span>
        </div>
        <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${globalColors.bg} transition-all duration-700`}
            style={{ width: `${scores.global_match_score}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Score Breakdown</h4>

        <ScoreBar
          label="Parsing Integrity"
          score={scores.parsing_integrity_score}
          description="Can the ATS robot read your resume correctly?"
        />

        <ScoreBar
          label="Keyword Relevance"
          score={scores.keyword_relevance_score}
          description={analysis.keyword_analysis.missing_critical_skills.length > 0 
            ? `Missing ${analysis.keyword_analysis.missing_critical_skills.length} critical skills`
            : "Keyword matching against job description"
          }
        />

        <ScoreBar
          label="Impact & Seniority"
          score={scores.impact_and_seniority_score}
          description={`Metric density: ${analysis.content_quality.metric_density_percentage.toFixed(0)}%`}
        />
      </div>

      <div className="pt-3 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-gray-50 rounded">
            <span className="text-gray-500">Parser Engine</span>
            <p className="font-medium text-gray-700 truncate">{analysis.meta.parser_engine}</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <span className="text-gray-500">Analyzed At</span>
            <p className="font-medium text-gray-700">
              {new Date(analysis.meta.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
