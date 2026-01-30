/**
 * RESUME TRUTH - The Real Story
 * 
 * This file contains Marcos's actual career history with real dates and details.
 * It serves as the single source of truth from which all resume versions are derived.
 * 
 * NEVER publish this file. It's for internal reference only.
 */

export interface TruthExperience {
  company: string;
  role: string;
  realDates: { start: string; end: string };
  resumeDates?: { start: string; end: string }; // inflated version
  location: string;
  type: 'tech' | 'non-tech' | 'hybrid';
  highlights: string[];
  technologies?: string[];
  teamSize?: number;
  reportedTeamSize?: number; // if inflated
  notes?: string;
}

export interface TruthEducation {
  institution: string;
  degree: string;
  realDates: { start: string; end: string };
  notes?: string;
}

export const TRUTH = {
  personal: {
    fullName: "Marcos Montero",
    phone: "+34 696013104",
    email: "marcos.mon.rod@gmail.com",
    linkedin: "/in/-marcos-montero",
    github: "/Marcos-Montero",
    location: "Madrid, Spain",
    birthYear: 1995, // ~30 in 2025
    origin: "San Sebastián, moved to Madrid at 18",
    wife: "Dasha (met when she was AWS Sales)",
    babyDue: "2026-09-03",
  },

  identity: {
    mensa: true,
    mensaSince: "late 2024",
    creativityPercentile: 99.9,
    superpower: "0→1 product building with high creativity + technical execution",
    weakness: "Terrible at selling himself",
    realCodingStart: "2019-2020 (during Área Suena)",
    realProfessionalStart: "October 2021 (Cesce)",
    yearsRealExperience: 3.5, // Oct 2021 - Jan 2026
    yearsClaimedExperience: 8,
  },

  languages: [
    { name: "Spanish", level: "Native (C2)" },
    { name: "English", level: "Professional (C1)" },
    { name: "Euskera", level: "Conversational (B1)" },
  ],

  education: [
    {
      institution: "Complutense University of Madrid",
      degree: "Bachelor's Degree in Philosophy",
      realDates: { start: "2013", end: "2017" },
      notes: "Completed. Didn't know what to do after.",
    },
    {
      institution: "SAE University",
      degree: "Sound Engineering",
      realDates: { start: "Jan 2018", end: "~2020" },
      notes: "2 years. First time someone called him 'gifted' (a direct professor).",
    },
    {
      institution: "Boot.dev",
      degree: "Computer Science & Backend Engineering",
      realDates: { start: "self-paced", end: "ongoing" },
      notes: "Go, Docker, Algorithms - self-study",
    },
    {
      institution: "Frontend Masters",
      degree: "Advanced React, Next.js, System Architecture",
      realDates: { start: "self-paced", end: "ongoing" },
      notes: "Various paths completed",
    },
  ] as TruthEducation[],

  experience: [
    {
      company: "Área Suena",
      role: "Sound Engineer / Technician",
      realDates: { start: "May 2019", end: "Aug 2021" },
      location: "Villalba, Madrid",
      type: "hybrid",
      highlights: [
        "One-man company selling sound equipment to Madrid cinemas",
        "Installed Avid S6 consoles and professional sound systems",
        "Started learning to code during downtime",
        "Fixed/maintained company OpenCart website (PHP/CSS)",
        "Discovered React through YouTube, realized tech potential",
        "Tried to move to Audio Técnica Madrid (met Gabriel) - no position",
      ],
      technologies: ["PHP", "CSS", "OpenCart", "HTML"],
      notes: "This is where coding started. Not listed on resume. Met Dasha during this period.",
    },
    {
      company: "Cesce",
      role: "Frontend Developer",
      realDates: { start: "Oct 2021", end: "Mar 2022" },
      resumeDates: { start: "Sep 2017", end: "Jan 2020" },
      location: "Madrid",
      type: "tech",
      highlights: [
        "First professional dev job",
        "Entered claiming 2 years experience from Área Suena",
        "Quickly outperformed peers at same 'level'",
        "Developed regulatory-compliant interfaces for financial risk analysis",
        "Used by 20k+ B2B customers",
        "Left after 6 months to find better opportunities",
      ],
      technologies: ["JavaScript", "React", "HTML5/SCSS", "Java (legacy)", "PL/SQL (Oracle)"],
      notes: "MASSIVELY INFLATED on resume. Real: 6 months. Resume shows: 2.3 years.",
    },
    {
      company: "Nomoko",
      role: "Senior Frontend Engineer",
      realDates: { start: "Apr 2022", end: "Mar 2023" },
      resumeDates: { start: "Jan 2020", end: "Apr 2021" },
      location: "Switzerland (Remote from Madrid)",
      type: "tech",
      highlights: [
        "Digital Twin for Real Estate startup",
        "Engineered high-performance 3D spatial data visualization",
        "Handled massive datasets with 60fps rendering",
        "Built component-based architecture for rapid prototyping",
        "Left because startup was falling apart",
      ],
      technologies: ["JavaScript (ES6+)", "React", "Redux", "WebGL/Three.js", "Python (Geospatial)", "Mapbox GL"],
      notes: "Dates shifted back on resume. Real: 1 year.",
    },
    {
      company: "Mindera",
      role: "Senior Frontend Engineer / Frontend Architect",
      realDates: { start: "Apr 2023", end: "Aug 2024" },
      resumeDates: { start: "Apr 2021", end: "Apr 2023" },
      location: "UK & US clients (Remote)",
      type: "tech",
      highlights: [
        "Consultancy work for international clients",
        "Led migration of legacy monoliths to modern React",
        "Drove React Native adoption for mobile features",
        "Enforced TDD and CI/CD pipelines - 60% reduction in production bugs",
        "Architected multi-brand Design System across 3 global products",
        "Had lots of spare time - started Enso work in parallel",
        "Last 4 months (Apr-Aug 2024): worked both Mindera AND Enso",
      ],
      technologies: ["TypeScript", "React", "React Native", "Node.js", "GraphQL", "Jest", "Cypress", "AWS"],
      notes: "Dates shifted back 2 years on resume. Real: 1y 4m. Overlap with Enso.",
    },
    {
      company: "Enso Coliving",
      role: "Founding Tech Lead / CTO",
      realDates: { start: "Apr 2024", end: "Sep 2025" },
      resumeDates: { start: "Apr 2023", end: "Oct 2025" },
      location: "Madrid",
      type: "tech",
      teamSize: 2,
      reportedTeamSize: 4,
      highlights: [
        "Built entire tech stack from zero for coliving real estate company",
        "Consolidated scattered data (Notion, Monday, Airtable) → PostgreSQL/Supabase",
        "Created vector databases for internal AI tools",
        "Built payment gateway with Stripe",
        "Built Idealista-style property website with map",
        "Built coliver matchmaking/qualification system",
        "€30k/month revenue first month after launch",
        "Taught Luis to code from zero - he's now CTO (Jan 2026)",
        "Taught Oliver (CEO's brother) in 8-week crash course - went from sales to dev",
        "Left because challenge was complete - no more software to build",
      ],
      technologies: [
        "Next.js (App Router)", "TypeScript", "React", "Node.js",
        "PostgreSQL", "Supabase (Auth, DB, Vector)", "Python",
        "Stripe API", "Docker", "Tailwind CSS"
      ],
      notes: "Backdated by 1 year on resume. Team was 2 devs, says 4. CEO Josemi and CTO Luis are friends - strong references.",
    },
  ] as TruthExperience[],

  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS", "Go (learning)"],
    frontend: ["React", "Next.js (App Router)", "React Native (Expo)", "Tailwind CSS", "Three.js/WebGL"],
    backend: ["Node.js", "PostgreSQL", "Supabase", "REST APIs", "GraphQL"],
    data: ["PostgreSQL", "Supabase Vector", "Data consolidation/migration", "Pandas"],
    ai: ["RAG", "OpenAI API", "Vercel AI SDK", "LangGraph", "Claude API", "Vector databases"],
    devops: ["Docker", "CI/CD (GitHub Actions)", "AWS (S3/Lambda)"],
    practices: ["TDD (Jest/Cypress)", "System Design", "Agile", "Code review"],
  },

  strengths: [
    "0→1 product building",
    "Rapid learning - consistently outperforms peers with 'more experience'",
    "Data architecture and consolidation",
    "Mentoring - taught 2 people to code from zero successfully",
    "Technical strategy and system design",
    "High creativity (99.9 percentile)",
    "Leadership without ego",
  ],

  jobSearch: {
    salaryFloor: 70000, // EUR gross annual
    location: "Madrid (cannot relocate)",
    remote: "Preferred but flexible",
    urgency: "HIGH - baby due September 2026",
    openTo: ["IC", "Lead", "Manager", "CTO", "Startup", "Corporate", "Consultancy"],
    currentStrategy: "Cold applications only (not working)",
    neededStrategy: "Referrals and network",
    referralAttempts: [
      { company: "Affirm", result: "No success" }
    ],
  },

  references: {
    available: [
      { name: "Luis", role: "CTO at Enso (Jan 2026)", relationship: "Taught him to code, friend" },
      { name: "Josemi", role: "CEO at Enso", relationship: "Friend, worked closely" },
    ],
  },
};

export default TRUTH;
