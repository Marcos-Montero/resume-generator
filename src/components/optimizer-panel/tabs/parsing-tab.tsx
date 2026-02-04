"use client";

import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { ATSCoreAnalysis } from "@/types/ats-core";

export function ParsingTab({ analysis }: { analysis: ATSCoreAnalysis }) {
  const { parsing_audit } = analysis;

  return (
    <div className="space-y-4">
      <div
        className={`p-3 rounded-lg border ${
          parsing_audit.is_machine_readable
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {parsing_audit.is_machine_readable ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <div>
            <p
              className={`text-sm font-semibold ${
                parsing_audit.is_machine_readable ? "text-green-700" : "text-red-700"
              }`}
            >
              {parsing_audit.is_machine_readable ? "Machine Readable" : "Parsing Issues Detected"}
            </p>
            <p className="text-xs text-gray-600">
              {parsing_audit.is_machine_readable
                ? "ATS can extract text from your resume"
                : "ATS may fail to read parts of your resume"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          Section Detection
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(parsing_audit.section_mapping).map(([key, found]) => (
            <div
              key={key}
              className={`flex items-center gap-2 p-2 rounded border ${
                found ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              {found ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-red-600" />
              )}
              <span className="text-xs text-gray-700 capitalize">
                {key.replace(/_/g, " ").replace(" found", "")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {parsing_audit.parsing_errors.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Parsing Errors ({parsing_audit.parsing_errors.length})
          </h4>
          <div className="space-y-2">
            {parsing_audit.parsing_errors.map((error, index) => (
              <div
                key={index}
                className={`p-2 rounded border ${
                  error.severity === "CRITICAL"
                    ? "bg-red-50 border-red-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  {error.severity === "CRITICAL" ? (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          error.severity === "CRITICAL"
                            ? "bg-red-200 text-red-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {error.severity}
                      </span>
                      <span className="text-[10px] text-gray-500">{error.location}</span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1">{error.issue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {parsing_audit.parsing_errors.length === 0 && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-medium text-green-700">No Parsing Errors</p>
          <p className="text-xs text-green-600">Your resume structure is ATS-compatible</p>
        </div>
      )}
    </div>
  );
}
