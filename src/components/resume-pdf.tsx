"use client";

import { Document, Page, Text, View, StyleSheet, Font, Svg, Path } from "@react-pdf/renderer";
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
    paddingTop: 115,
    paddingBottom: 15,
  },
  main: {
    width: "70%",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#6b7280",
    marginBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d5db",
    paddingBottom: 2,
  },
  section: {
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 8,
  },
  header: {
    marginBottom: 10,
  },
  mainSectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
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
  contactIconContainer: {
    width: 14,
    height: 14,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  contactText: {
    fontSize: 9,
    flex: 1,
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
    marginBottom: 10,
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
    marginBottom: 6,
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
    marginBottom: 5,
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
  interestBullet: {
    flexDirection: "row",
    marginBottom: 2,
  },
  interestBulletText: {
    flex: 1,
    fontSize: 8,
    color: "#4b5563",
    lineHeight: 1.3,
  },
});

function PhoneIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
      />
    </Svg>
  );
}

function MailIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
      />
      <Path d="M22 6l-10 7L2 6" stroke="#6b7280" strokeWidth="2" fill="none" />
    </Svg>
  );
}

function LinkedInIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
      />
      <Path d="M2 9h4v12H2z" stroke="#6b7280" strokeWidth="2" fill="none" />
      <Path d="M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" stroke="#6b7280" strokeWidth="2" fill="none" />
    </Svg>
  );
}

function MapPinIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
      />
      <Path d="M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" stroke="#6b7280" strokeWidth="2" fill="none" />
    </Svg>
  );
}

function GithubIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
      />
    </Svg>
  );
}

export function ResumePDF({ data }: { data: ResumeData }) {
  const { personalDetails, summary, languages, education, memberships, interests, skills, experience } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <View style={styles.contactRow}>
              <View style={styles.contactIconContainer}>
                <PhoneIcon />
              </View>
              <Text style={styles.contactText}>{personalDetails.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <View style={styles.contactIconContainer}>
                <MailIcon />
              </View>
              <Text style={styles.contactText}>{personalDetails.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <View style={styles.contactIconContainer}>
                <LinkedInIcon />
              </View>
              <Text style={styles.contactText}>{personalDetails.linkedin}</Text>
            </View>
            <View style={styles.contactRow}>
              <View style={styles.contactIconContainer}>
                <MapPinIcon />
              </View>
              <Text style={styles.contactText}>{personalDetails.location}</Text>
            </View>
            {personalDetails.github && (
              <View style={styles.contactRow}>
                <View style={styles.contactIconContainer}>
                  <GithubIcon />
                </View>
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
                  {interest.description && (
                    interest.title === "Technical Specialties" ? (
                      interest.description.split(" • ").map((item, idx) => (
                        <View key={idx} style={styles.interestBullet}>
                          <Text style={{ fontSize: 8, marginRight: 4 }}>•</Text>
                          <Text style={styles.interestBulletText}>{item}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.interestDesc}>{interest.description}</Text>
                    )
                  )}
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
