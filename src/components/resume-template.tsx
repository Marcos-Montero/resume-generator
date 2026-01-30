"use client";

import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { ResumeData } from "@/types/resume";

export function ResumeTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, languages, education, memberships, interests, skills, experience } = data;

  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-lg print:shadow-none overflow-hidden text-[10px] leading-[1.3]">
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

          {interests.length > 0 && (
            <section className="flex-shrink-0">
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-300 pb-1">
                Interests
              </h2>
              <div className="space-y-2">
                {interests.map((interest) => (
                  <div key={interest.title}>
                    <div className="font-semibold">{interest.title}</div>
                    {interest.description && (
                      <>
                        {interest.title === "Technical Specialties" ? (
                          <div className="space-y-1">
                            {interest.description.split(" • ").map((item, idx) => (
                              <div key={idx} className="text-gray-700 text-[9px]">• {item}</div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-600 text-[9px]">{interest.description}</div>
                        )}
                      </>
                    )}
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
            <p className="text-gray-700 leading-[1.5]">{summary}</p>
          </section>

          <section className="flex-shrink-0">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-900 mb-3">Core Competencies</h2>
            <div className="space-y-1">
              {skills.map((skill) => (
                <div key={skill.category} className="leading-[1.4]">
                  <span className="font-semibold">{skill.category}:</span>{" "}
                  <span className="text-gray-700">{skill.items.join(", ")}.</span>
                </div>
              ))}
            </div>
          </section>

          <section className="flex-1">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-900 mb-4">Experience</h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={`${exp.company}-${exp.position}`} className="border-l-2 border-gray-300 pl-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[11px] text-gray-900">
                        {exp.company}
                        {exp.industry && <span className="font-normal text-gray-500"> - {exp.industry}</span>}
                      </h3>
                      <p className="text-gray-700 mt-0.5">{exp.position}</p>
                    </div>
                    <div className="text-right text-[9px] text-gray-500 shrink-0 ml-3">
                      <div>{exp.duration}</div>
                      <div>{exp.location}</div>
                    </div>
                  </div>
                  <p className="text-[8px] text-gray-500 mt-1.5 mb-2 italic">{exp.technologies.join(" | ")}</p>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-700 flex leading-[1.4]">
                        <span className="mr-1.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
