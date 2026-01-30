"use client";

import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@4.5.0/files/inter-latin-400-normal.woff", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@4.5.0/files/inter-latin-700-normal.woff", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 9,
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  main: {
    width: "70%",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#6b7280",
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d5db",
    paddingBottom: 3,
  },
  section: {
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 10,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#111827",
    paddingBottom: 10,
    marginBottom: 14,
  },
  mainSectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#374151",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  contactIcon: {
    width: 12,
    marginRight: 6,
    fontSize: 8,
    color: "#6b7280",
  },
  contactText: {
    fontSize: 9,
  },
  skillCategory: {
    marginBottom: 3,
  },
  skillLabel: {
    fontWeight: "bold",
    fontSize: 9,
  },
  skillItems: {
    fontSize: 9,
    color: "#374151",
  },
  expContainer: {
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: "#d1d5db",
    paddingLeft: 10,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  expCompany: {
    fontWeight: "bold",
    fontSize: 10,
  },
  expIndustry: {
    fontWeight: "normal",
    color: "#6b7280",
  },
  expPosition: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 2,
  },
  expMeta: {
    textAlign: "right",
    fontSize: 8,
    color: "#6b7280",
  },
  expTech: {
    fontSize: 7,
    color: "#6b7280",
    fontStyle: "italic",
    marginBottom: 5,
    lineHeight: 1.3,
  },
  achievement: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    width: 8,
    fontSize: 9,
  },
  achievementText: {
    flex: 1,
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.35,
  },
  eduItem: {
    marginBottom: 8,
  },
  eduInstitution: {
    fontWeight: "bold",
    fontSize: 9,
  },
  eduDegree: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.3,
  },
  eduDescription: {
    fontSize: 8,
    color: "#6b7280",
  },
  langItem: {
    marginBottom: 3,
  },
  langName: {
    fontWeight: "bold",
    fontSize: 9,
  },
  langLevel: {
    fontSize: 9,
  },
  membershipItem: {
    fontSize: 9,
    marginBottom: 3,
    lineHeight: 1.3,
  },
  interestItem: {
    marginBottom: 6,
  },
  interestTitle: {
    fontWeight: "bold",
    fontSize: 9,
  },
  interestDesc: {
    fontSize: 8,
    color: "#4b5563",
    lineHeight: 1.3,
  },
});

export function ResumePDF({ data }: { data: ResumeData }) {
  const { personalDetails, summary, languages, education, memberships, interests, skills, experience } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactIcon}>☎</Text>
              <Text style={styles.contactText}>{personalDetails.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactIcon}>✉</Text>
              <Text style={styles.contactText}>{personalDetails.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactIcon}>in</Text>
              <Text style={styles.contactText}>{personalDetails.linkedin}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactIcon}>📍</Text>
              <Text style={styles.contactText}>{personalDetails.location}</Text>
            </View>
            {personalDetails.github && (
              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>⌨</Text>
                <Text style={styles.contactText}>{personalDetails.github}</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang) => (
              <View key={lang.name} style={styles.langItem}>
                <Text>
                  <Text style={styles.langName}>{lang.name}: </Text>
                  <Text style={styles.langLevel}>{lang.level}</Text>
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.institution} style={styles.eduItem}>
                <Text style={styles.eduInstitution}>{edu.institution}</Text>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                {edu.description && <Text style={styles.eduDescription}>{edu.description}</Text>}
                {edu.year && <Text style={styles.eduDescription}>({edu.year})</Text>}
              </View>
            ))}
          </View>

          {memberships.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Memberships</Text>
              {memberships.map((m) => (
                <Text key={m.organization} style={styles.membershipItem}>
                  {m.organization}
                  {m.role && ` – ${m.role}`}
                  {m.since && ` (since ${m.since})`}
                </Text>
              ))}
            </View>
          )}

          {interests.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interests</Text>
              {interests.map((interest) => (
                <View key={interest.title} style={styles.interestItem}>
                  <Text style={styles.interestTitle}>{interest.title}</Text>
                  {interest.description && <Text style={styles.interestDesc}>{interest.description}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={styles.name}>{personalDetails.fullName}</Text>
            <Text style={styles.title}>{personalDetails.title}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.mainSectionTitle}>Summary</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.mainSectionTitle}>Core Competencies</Text>
            {skills.map((skill) => (
              <View key={skill.category} style={styles.skillCategory}>
                <Text>
                  <Text style={styles.skillLabel}>{skill.category}: </Text>
                  <Text style={styles.skillItems}>{skill.items.join(", ")}.</Text>
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.mainSectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={`${exp.company}-${exp.position}`} style={styles.expContainer}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.expCompany}>
                      {exp.company}
                      {exp.industry && <Text style={styles.expIndustry}> - {exp.industry}</Text>}
                    </Text>
                    <Text style={styles.expPosition}>{exp.position}</Text>
                  </View>
                  <View>
                    <Text style={styles.expMeta}>{exp.duration}</Text>
                    <Text style={styles.expMeta}>{exp.location}</Text>
                  </View>
                </View>
                <Text style={styles.expTech}>{exp.technologies.join(" | ")}</Text>
                {exp.achievements.map((achievement, idx) => (
                  <View key={idx} style={styles.achievement}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.achievementText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
