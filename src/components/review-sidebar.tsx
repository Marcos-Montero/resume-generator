"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Target,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useResumeStore } from "@/store/resume-store";
import { analyzeResume } from "@/actions/analyze-resume";

function ScoreCircle({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="64" cy="64" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke={getStrokeColor(score)}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
    </div>
  );
}

function CollapsibleSection({
  title,
  icon: Icon,
  items,
  iconColor,
}: {
  title: string;
  icon: typeof TrendingUp;
  items: string[];
  iconColor: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span className="font-medium text-sm">{title}</span>
          <span className="text-xs text-gray-500">({items.length})</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      {isOpen && (
        <ul className="p-3 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ReviewSidebar() {
  const { resumeData, aiScore, isAnalyzing, setAIScore, setIsAnalyzing } = useResumeStore();
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeResume(resumeData);
      setAIScore(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze resume");
      setAIScore(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          AI Resume Review
        </h2>
        <p className="text-sm text-gray-500 mt-1">Get AI-powered feedback on your resume</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!aiScore && !isAnalyzing && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Ready to analyze</h3>
            <p className="text-sm text-gray-500 mb-4">
              Click below to get AI-powered feedback on your resume's ATS optimization.
            </p>
            <button
              onClick={handleAnalyze}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              Analyze Resume
            </button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Analyzing your resume...</p>
            <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Analysis Failed</span>
            </div>
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={handleAnalyze}
              className="mt-3 text-sm text-red-700 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {aiScore && !isAnalyzing && (
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-gray-200">
              <ScoreCircle score={aiScore.overallScore} />
              <p className="text-sm text-gray-500 mt-2">ATS Optimization Score</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">{aiScore.summary}</p>
            </div>

            <CollapsibleSection
              title="Impact Improvements"
              icon={TrendingUp}
              items={aiScore.impactImprovements}
              iconColor="text-orange-500"
            />

            <CollapsibleSection
              title="Keyword Gaps"
              icon={AlertCircle}
              items={aiScore.keywordGaps}
              iconColor="text-red-500"
            />

            <CollapsibleSection
              title="Strengths"
              icon={CheckCircle2}
              items={aiScore.strengths}
              iconColor="text-green-500"
            />

            <button
              onClick={handleAnalyze}
              className="w-full mt-4 border border-purple-200 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Re-analyze
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
