"use client";

import { Briefcase, Info } from "lucide-react";
import { useOptimizerStore } from "@/store/optimizer-store";

export function JobDescriptionInput() {
  const { jobDescription, setJobDescription } = useOptimizerStore();

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Briefcase className="w-4 h-4" />
        Job Description
        <span className="text-xs text-gray-400 font-normal">(optional)</span>
      </label>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here for keyword matching analysis..."
        className="w-full h-28 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white"
      />
      <div className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
        <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-[10px] text-blue-700">
          <strong>With JD:</strong> Full analysis including keyword matching, missing skills, and job-specific optimization.
          <br />
          <strong>Without JD:</strong> General ATS audit focusing on format, structure, and content quality.
        </p>
      </div>
      {jobDescription && (
        <p className="text-[10px] text-gray-500">
          {jobDescription.length} characters | ~{Math.ceil(jobDescription.split(/\s+/).length)} words
        </p>
      )}
    </div>
  );
}
