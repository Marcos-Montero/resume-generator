import { ResumeData } from "@/types/resume";

export function resumeToText(data: ResumeData): string {
  const lines: string[] = [];
  
  lines.push("=== RESUME ===\n");
  
  lines.push("--- PERSONAL DETAILS ---");
  lines.push(`Name: ${data.personalDetails.fullName}`);
  lines.push(`Title: ${data.personalDetails.title}`);
  lines.push(`Phone: ${data.personalDetails.phone}`);
  lines.push(`Email: ${data.personalDetails.email}`);
  lines.push(`LinkedIn: ${data.personalDetails.linkedin}`);
  lines.push(`Location: ${data.personalDetails.location}`);
  if (data.personalDetails.github) {
    lines.push(`GitHub: ${data.personalDetails.github}`);
  }
  if (data.personalDetails.website) {
    lines.push(`Website: ${data.personalDetails.website}`);
  }
  lines.push("");
  
  lines.push("--- PROFESSIONAL SUMMARY ---");
  lines.push(data.summary);
  lines.push("");
  
  lines.push("--- SKILLS ---");
  data.skills.forEach((skill) => {
    lines.push(`${skill.category}: ${skill.items.join(", ")}`);
  });
  lines.push("");
  
  lines.push("--- WORK EXPERIENCE ---");
  data.experience.forEach((exp) => {
    lines.push(`\n${exp.company}${exp.industry ? ` (${exp.industry})` : ""}`);
    lines.push(`Position: ${exp.position}`);
    lines.push(`Duration: ${exp.duration}`);
    lines.push(`Location: ${exp.location}`);
    lines.push(`Technologies: ${exp.technologies.join(", ")}`);
    lines.push("Key Achievements:");
    exp.achievements.forEach((achievement) => {
      lines.push(`  - ${achievement}`);
    });
  });
  lines.push("");
  
  lines.push("--- EDUCATION ---");
  data.education.forEach((edu) => {
    lines.push(`${edu.institution}`);
    lines.push(`Degree: ${edu.degree}`);
    if (edu.description) {
      lines.push(`Description: ${edu.description}`);
    }
    if (edu.year) {
      lines.push(`Year: ${edu.year}`);
    }
    lines.push("");
  });
  
  lines.push("--- LANGUAGES ---");
  data.languages.forEach((lang) => {
    lines.push(`${lang.name}: ${lang.level}`);
  });
  lines.push("");
  
  if (data.memberships.length > 0) {
    lines.push("--- MEMBERSHIPS ---");
    data.memberships.forEach((membership) => {
      lines.push(`${membership.organization}${membership.role ? ` - ${membership.role}` : ""}${membership.since ? ` (since ${membership.since})` : ""}`);
    });
    lines.push("");
  }
  
  if (data.projects.length > 0) {
    lines.push("--- PROJECTS ---");
    data.projects.forEach((project) => {
      lines.push(`\n${project.name}`);
      lines.push(`Description: ${project.description}`);
      lines.push(`Technologies: ${project.technologies.join(", ")}`);
      if (project.url) {
        lines.push(`URL: ${project.url}`);
      }
      if (project.highlights && project.highlights.length > 0) {
        lines.push("Highlights:");
        project.highlights.forEach((highlight) => {
          lines.push(`  - ${highlight}`);
        });
      }
    });
    lines.push("");
  }
  
  return lines.join("\n");
}
