"use client";

import { Lightbulb, ArrowRight, CheckCircle2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { ATSCoreAnalysis } from "@/types/ats-core";

export function OptimizeTab({ analysis }: { analysis: ATSCoreAnalysis }) {
  const { optimization_plan } = analysis;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      {optimization_plan.priority_actions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Priority Actions ({optimization_plan.priority_actions.length})
            </h4>
          </div>
          <div className="space-y-2">
            {optimization_plan.priority_actions.map((action, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-amber-900 flex-1">{action}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {optimization_plan.rewrite_suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              Rewrite Suggestions ({optimization_plan.rewrite_suggestions.length})
            </h4>
          </div>
          <div className="space-y-3">
            {optimization_plan.rewrite_suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="p-3 bg-red-50 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600">
                      Original
                    </span>
                  </div>
                  <p className="text-xs text-red-800 line-through">{suggestion.original_text}</p>
                </div>
                <div className="p-3 bg-green-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600">
                      Optimized
                    </span>
                    <button
                      onClick={() => handleCopy(suggestion.optimized_text, index)}
                      className="flex items-center gap-1 text-[10px] text-green-700 hover:text-green-900 transition-colors"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-green-800 font-medium">{suggestion.optimized_text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {optimization_plan.priority_actions.length === 0 &&
        optimization_plan.rewrite_suggestions.length === 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-700">Your Resume is Well Optimized!</p>
            <p className="text-xs text-green-600 mt-1">
              No major improvements needed. Consider adding a job description for targeted
              optimization.
            </p>
          </div>
        )}

      <div className="pt-3 border-t border-gray-200">
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h4 className="text-xs font-semibold text-indigo-700 mb-2">
            Bullet Point Formula (C.A.R.)
          </h4>
          <div className="space-y-1 text-[10px] text-indigo-600">
            <p>
              <strong>C</strong>hallenge: What problem did you face?
            </p>
            <p>
              <strong>A</strong>ction: What did you do? (Use strong action verb)
            </p>
            <p>
              <strong>R</strong>esult: What was the measurable outcome? (%, $, time saved)
            </p>
          </div>
          <div className="mt-2 p-2 bg-white rounded text-[10px] text-gray-700">
            <strong>Example:</strong> "Reduced database query latency by 40% by implementing Redis
            caching layer, saving $15K/month in infrastructure costs"
          </div>
        </div>
      </div>
    </div>
  );
}
