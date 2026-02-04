"use client";

import { Mail, Phone, MapPin, Linkedin, Github, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { ATSCoreAnalysis, AutoAppliedChange, ManualChangeRequired } from "@/types/ats-core";

type DiffTextProps = {
  original: string;
  optimized: string;
  showDiff: boolean;
};

function DiffText({ original, optimized, showDiff }: DiffTextProps) {
  if (!showDiff || original === optimized) {
    return <span>{optimized}</span>;
  }

  return (
    <span className="bg-green-100 border-l-2 border-green-500 pl-1">
      {optimized}
    </span>
  );
}

type ManualChangeHighlightProps = {
  text: string;
  hint: string;
  reason: string;
};

function ManualChangeHighlight({ text, hint, reason }: ManualChangeHighlightProps) {
  const hasPlaceholder = text.includes("[USER:") || text.includes("X%") || text.includes("$X");

  if (!hasPlaceholder) {
    return <span>{text}</span>;
  }

  return (
    <span className="relative group">
      <span className="bg-yellow-200 border-b-2 border-yellow-500 px-0.5">
        {text}
      </span>
      <span className="absolute bottom-full left-0 mb-1 hidden group-hover:block z-50 w-64 p-2 bg-yellow-50 border border-yellow-300 rounded shadow-lg text-[9px]">
        <div className="flex items-start gap-1">
          <AlertTriangle className="w-3 h-3 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-800">{hint}</p>
            <p className="text-yellow-700 mt-0.5">{reason}</p>
          </div>
        </div>
      </span>
    </span>
  );
}

export function OptimizedResumePreview({
  originalData,
  analysis,
}: {
  originalData: ResumeData;
  analysis: ATSCoreAnalysis;
}) {
  const { personalDetails, languages, education, memberships } = originalData;
  const { optimized_resume } = analysis;

  if (!optimized_resume?.optimized_data) {
    return (
      <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-lg flex items-center justify-center">
        <div className="text-center p-8">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Optimized preview not available</p>
          <p className="text-sm text-gray-500 mt-2">Run analysis to generate optimized version</p>
        </div>
      </div>
    );
  }

  const { optimized_data, auto_applied_changes, manual_changes_required } = optimized_resume;

  const findAutoChange = (section: string, field: string): AutoAppliedChange | undefined => {
    return auto_applied_changes?.find(
      (c) => c.section === section && c.field === field
    );
  };

  const findManualChange = (section: string, field: string): ManualChangeRequired | undefined => {
    return manual_changes_required?.find(
      (c) => c.section === section && c.field === field
    );
  };

  const getOriginalSummary = () => originalData.summary;
  const getOriginalSkills = () => originalData.skills;
  const getOriginalExperience = () => originalData.experience;

  return (
    <div className="relative">
      <div className="absolute -top-8 left-0 right-0 flex items-center justify-center gap-4 text-[10px]">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-100 border-l-2 border-green-500" />
          <span className="text-gray-600">Auto-applied change</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-yellow-200 border-b-2 border-yellow-500" />
          <span className="text-gray-600">Needs your input</span>
        </div>
      </div>

      <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-lg print:shadow-none overflow-hidden text-[10px] leading-[1.3] border-2 border-green-400">
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2 py-1 bg-green-500 text-white text-[9px] font-bold rounded">
            OPTIMIZED
          </span>
        </div>

        <div className="flex h-full">
          <aside className="w-[62mm] bg-gray-50 px-5 pt-52 pb-8 print:bg-gray-50 flex flex-col gap-6">
            <section className="flex-shrink-0">
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-300 pb-1">
                Personal Details
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{personalDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="break-all">{personalDetails.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{personalDetails.linkedin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{personalDetails.location}</span>
                </div>
                {personalDetails.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span>{personalDetails.github}</span>
                  </div>
                )}
              </div>
            </section>

            <section className="flex-shrink-0">
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-300 pb-1">
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <span className="font-semibold">{lang.name}:</span> {lang.level}
                  </div>
                ))}
              </div>
            </section>

            <section className="flex-shrink-0">
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-300 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.institution}>
                    <div className="font-semibold">{edu.institution}</div>
                    <div className="text-gray-600">{edu.degree}</div>
                    {edu.description && <div className="text-gray-500 text-[9px]">{edu.description}</div>}
                    {edu.year && <div className="text-gray-500 text-[9px]">({edu.year})</div>}
                  </div>
                ))}
              </div>
            </section>

            {memberships.length > 0 && (
              <section className="flex-shrink-0">
                <h2 className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-300 pb-1">
                  Memberships
                </h2>
                <div className="space-y-1">
                  {memberships.map((membership) => (
                    <div key={membership.organization}>
                      {membership.organization}
                      {membership.role && ` – ${membership.role}`}
                      {membership.since && ` (since ${membership.since})`}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          <main className="flex-1 px-6 pt-24 pb-8 flex flex-col gap-5">
            <header className="flex-shrink-0 border-b-2 border-gray-900 pb-3">
              <h1 className="text-[26px] font-bold tracking-tight uppercase leading-none">{personalDetails.fullName}</h1>
              <p className="text-[13px] text-gray-600 mt-1.5">{personalDetails.title}</p>
            </header>

            <section className="flex-shrink-0">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-900 mb-3">Summary</h2>
              <p className="text-gray-700 leading-[1.5]">
                {(() => {
                  const summaryChange = findAutoChange("summary", "text");
                  const manualChange = findManualChange("summary", "text");
                  const optimizedSummary = optimized_data.summary || getOriginalSummary();

                  if (manualChange) {
                    return (
                      <ManualChangeHighlight
                        text={optimizedSummary}
                        hint={manualChange.placeholder_hint}
                        reason={manualChange.reason}
                      />
                    );
                  }

                  return (
                    <DiffText
                      original={getOriginalSummary()}
                      optimized={optimizedSummary}
                      showDiff={!!summaryChange}
                    />
                  );
                })()}
              </p>
            </section>

            <section className="flex-shrink-0">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-900 mb-3">Core Competencies</h2>
              <div className="space-y-1">
                {(optimized_data.skills?.length > 0 ? optimized_data.skills : getOriginalSkills()).map((skill, idx) => {
                  const originalSkill = getOriginalSkills()[idx];
                  const hasChange = originalSkill && 
                    JSON.stringify(skill.items) !== JSON.stringify(originalSkill.items);

                  return (
                    <div key={skill.category} className="leading-[1.4]">
                      <span className="font-semibold">{skill.category}:</span>{" "}
                      <span className={hasChange ? "bg-green-100 border-l-2 border-green-500 pl-1" : "text-gray-700"}>
                        {skill.items.join(", ")}.
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="flex-1">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-900 mb-4">Experience</h2>
              <div className="space-y-5">
                {(optimized_data.experience?.length > 0 ? optimized_data.experience : []).map((exp, expIdx) => {
                  const originalExp = getOriginalExperience()[expIdx];

                  return (
                    <div key={`${exp.company}-${exp.position}`} className="border-l-2 border-gray-300 pl-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[11px] text-gray-900">
                            {exp.company}
                            {originalExp?.industry && <span className="font-normal text-gray-500"> - {originalExp.industry}</span>}
                          </h3>
                          <p className="text-gray-700 mt-0.5">{exp.position}</p>
                        </div>
                        {originalExp && (
                          <div className="text-right text-[9px] text-gray-500 shrink-0 ml-3">
                            <div>{originalExp.duration}</div>
                            <div>{originalExp.location}</div>
                          </div>
                        )}
                      </div>
                      {originalExp && (
                        <p className="text-[8px] text-gray-500 mt-1.5 mb-2 italic">
                          {originalExp.technologies.join(" | ")}
                        </p>
                      )}
                      <ul className="space-y-1.5">
                        {exp.achievements.map((achievement, achIdx) => {
                          const originalAch = originalExp?.achievements[achIdx];
                          const hasChange = originalAch && achievement !== originalAch;
                          const needsManualInput = achievement.includes("[USER:") || 
                            achievement.includes("X%") || 
                            achievement.includes("$X") ||
                            achievement.includes("[provide");

                          const manualChange = manual_changes_required?.find(
                            (c) => c.section === "experience" && c.current_text === achievement
                          );

                          return (
                            <li key={achIdx} className="text-gray-700 flex leading-[1.4]">
                              <span className="mr-1.5">•</span>
                              <span>
                                {needsManualInput || manualChange ? (
                                  <ManualChangeHighlight
                                    text={achievement}
                                    hint={manualChange?.placeholder_hint || "Replace placeholder with actual data"}
                                    reason={manualChange?.reason || "Add specific metrics for better ATS score"}
                                  />
                                ) : hasChange ? (
                                  <DiffText
                                    original={originalAch || ""}
                                    optimized={achievement}
                                    showDiff={true}
                                  />
                                ) : (
                                  achievement
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-gray-700">
            {auto_applied_changes?.length || 0} auto-applied changes
          </span>
          <span className="text-gray-400">|</span>
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-semibold text-gray-700">
            {manual_changes_required?.length || 0} need your input
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Hover over yellow highlighted text to see what information you need to provide.
        </p>
      </div>
    </div>
  );
}
