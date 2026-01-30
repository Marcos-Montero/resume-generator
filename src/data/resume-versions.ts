import { ResumeData } from "@/types/resume";
import TRUTH from "./resume-truth";

export type ResumeVersion = {
  id: string;
  name: string;
  description: string;
  targetRole: string;
  emphasis: "technical" | "leadership" | "product" | "fullstack" | "management";
};

export const RESUME_VERSIONS: ResumeVersion[] = [
  {
    id: "truth",
    name: "Truth Version",
    description: "Complete real history (private, for reference only)",
    targetRole: "Reference",
    emphasis: "technical",
  },
  {
    id: "senior-fullstack",
    name: "Senior Fullstack Engineer",
    description: "Technical IC role with full-stack expertise",
    targetRole: "Senior Engineer",
    emphasis: "fullstack",
  },
  {
    id: "product-engineer", 
    name: "Senior Product Engineer",
    description: "Product-minded engineer with AI/data focus",
    targetRole: "Product Engineer",
    emphasis: "product",
  },
  {
    id: "tech-lead",
    name: "Tech Lead",
    description: "Technical leadership with small team experience",
    targetRole: "Tech Lead / Staff Engineer",
    emphasis: "leadership",
  },
  {
    id: "engineering-manager",
    name: "Engineering Manager",
    description: "People management and team building focus",
    targetRole: "Engineering Manager",
    emphasis: "management",
  },
  {
    id: "head-of-engineering",
    name: "Head of Engineering",
    description: "Strategic tech leadership for smaller companies",
    targetRole: "Head of Engineering / VP Eng",
    emphasis: "leadership",
  },
];

// Transform truth data into resume format based on version
export function generateResumeData(versionId: string): ResumeData {
  const version = RESUME_VERSIONS.find(v => v.id === versionId);
  if (!version) {
    throw new Error(`Version ${versionId} not found`);
  }

  const baseData: ResumeData = {
    personalDetails: {
      fullName: TRUTH.personal.fullName,
      phone: TRUTH.personal.phone,
      email: TRUTH.personal.email,
      linkedin: TRUTH.personal.linkedin,
      github: TRUTH.personal.github,
      location: TRUTH.personal.location,
      title: getTitleForVersion(version),
    },
    summary: getSummaryForVersion(version),
    languages: TRUTH.languages.map(lang => ({
      name: lang.name,
      level: lang.level,
    })),
    education: getEducationForVersion(version),
    memberships: [
      {
        organization: "Mensa International",
        role: "Member",
        since: "2024",
      }
    ],
    interests: getInterestsForVersion(version),
    skills: getSkillsForVersion(version),
    experience: getExperienceForVersion(version),
    projects: [], // TODO: Add projects if needed
  };

  return baseData;
}

function getTitleForVersion(version: ResumeVersion): string {
  switch (version.id) {
    case "truth":
      return "The Real Story";
    case "senior-fullstack":
      return "Senior Fullstack Engineer";
    case "product-engineer":
      return "Senior Product Engineer (AI & Data)";
    case "tech-lead":
      return "Tech Lead & Staff Engineer";
    case "engineering-manager":
      return "Engineering Manager";
    case "head-of-engineering":
      return "Head of Engineering";
    default:
      return "Senior Software Engineer";
  }
}

function getSummaryForVersion(version: ResumeVersion): string {
  const baseExperience = version.id === "truth" ? "5+ years real" : "8+ years";
  
  switch (version.emphasis) {
    case "technical":
      return `${baseExperience} of experience building scalable web applications with React, Next.js, and Node.js. Expert in modern JavaScript/TypeScript, with strong backend skills in PostgreSQL and Python. Passionate about clean code, system design, and delivering high-performance solutions.`;
    
    case "fullstack":
      return `Versatile Senior Fullstack Engineer with ${baseExperience} of experience architecting end-to-end solutions. Expert in React/Next.js frontend development and Node.js/PostgreSQL backend systems. Strong focus on data architecture, API design, and building scalable platforms that handle real user traffic and revenue.`;
    
    case "product":
      return `Product-minded Senior Engineer with ${baseExperience} of experience bridging technical execution with business impact. Expert in full-stack development (React, Next.js, Node.js) and data engineering (PostgreSQL, Python). Currently focused on AI integration and building data-driven products that generate measurable revenue growth.`;
    
    case "leadership":
      return `Technical leader with ${baseExperience} of experience building products from scratch and growing engineering teams. Proven track record of architecting scalable systems, mentoring developers, and driving technical strategy. Expert in modern web technologies with strong focus on 0→1 product development and team building.`;
    
    case "management":
      return `Engineering leader with ${baseExperience} of experience building high-performing teams and delivering complex technical products. Skilled in people management, technical mentoring, and strategic planning. Strong background in full-stack development with proven ability to grow junior engineers into confident contributors.`;
      
    default:
      return `${baseExperience} of experience in software development with expertise in React, Node.js, and modern web technologies.`;
  }
}

function getEducationForVersion(version: ResumeVersion): ResumeData["education"] {
  const base = [
    {
      institution: "Boot.dev",
      degree: "Computer Science & Backend Engineering",
      description: "Go, Docker, Algorithms",
    },
    {
      institution: "Frontend Masters",
      degree: "Advanced React, Next.js, & System Architecture paths",
    },
    {
      institution: "Complutense University of Madrid", 
      degree: "Bachelor's Degree in Philosophy",
      year: "2017",
    },
  ];

  if (version.id === "truth") {
    // Add SAE for truth version
    base.splice(2, 0, {
      institution: "SAE University",
      degree: "Sound Engineering",
      description: "2 years, Jan 2018-2020",
    });
  }

  return base;
}

function getInterestsForVersion(version: ResumeVersion): ResumeData["interests"] {
  const base = [
    {
      title: "Mensa International", 
      description: "Member & active collaborator",
    },
  ];

  if (version.emphasis === "product" || version.emphasis === "technical") {
    base.push({
      title: "AI & Data Products",
      description: "Currently developing AI-powered tools using modern LLM APIs and vector databases",
    });
  }

  // Add Technical Specialties section (backend heavy positioning)
  if (version.id !== "truth") {
    base.push({
      title: "Technical Specialties",
      description: "PostgreSQL Database Design & Optimization • Python Data Processing & ETL Pipelines • Docker Containerization & CI/CD • System Integration & API Design • Team Leadership & Code Review Processes • React/Next.js Frontend Architecture",
    });
  }

  return base;
}

function getSkillsForVersion(version: ResumeVersion): ResumeData["skills"] {
  const skills = TRUTH.skills;
  
  // Condensed skills for A4 format
  const condensedSkills = [
    {
      category: "Core Stack",
      items: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Python"]
    }
  ];

  // Add specialized skills based on version (more concise)
  switch (version.emphasis) {
    case "product":
      condensedSkills.push({
        category: "Data & AI",
        items: ["Supabase", "Vector DBs", "OpenAI API", "RAG", "Data Migration"]
      });
      break;
    
    case "leadership":
    case "management":
      condensedSkills.push({
        category: "Leadership & Architecture",
        items: ["Team Building", "System Design", "CI/CD", "Docker", "Mentoring"]
      });
      break;
      
    case "fullstack":
      condensedSkills.push({
        category: "Fullstack & Mobile",
        items: ["React Native", "Tailwind", "REST APIs", "GraphQL", "AWS"]
      });
      break;
      
    default:
      condensedSkills.push({
        category: "Development",
        items: ["React Native", "TDD/Jest", "Docker", "CI/CD", "AWS"]
      });
  }

  return condensedSkills;
}

function getExperienceForVersion(version: ResumeVersion): ResumeData["experience"] {
  const truthExp = TRUTH.experience;
  
  // For truth version, show real dates and details (reverse chronological order)
  if (version.id === "truth") {
    return truthExp.slice().reverse().map(exp => ({
      company: exp.company,
      industry: exp.type === "tech" ? undefined : "Real Estate",
      position: exp.role,
      duration: `${exp.realDates.start} – ${exp.realDates.end}`,
      location: exp.location,
      technologies: exp.technologies || [],
      achievements: exp.highlights.slice(0, 3), // Limit to 3 for truth version
    }));
  }

  // For other versions, use inflated dates and include all tech experiences
  const relevantExperiences = truthExp.filter(exp => exp.type === "tech").reverse();
  
  return relevantExperiences.map((exp, index) => {
    const resumeDates = exp.resumeDates || exp.realDates;
    const achievements = getAchievementsByRecency(exp, version, index);
    const techLimit = getTechLimitByRecency(index);
    
    return {
      company: exp.company,
      industry: exp.company === "Enso Coliving" ? "Real Estate" : undefined,
      position: exp.role,
      duration: `${resumeDates.start} – ${resumeDates.end}`,
      location: exp.location,
      technologies: exp.technologies?.slice(0, techLimit) || [],
      achievements,
    };
  });
}

// Helper to get achievements based on recency (more recent = more detail)
function getAchievementsByRecency(exp: any, version: ResumeVersion, index: number): string[] {
  // Achievement limits based on position (0 = most recent) - DOUBLED
  const achievementLimits = [6, 4, 4, 2]; // Enso(6), Mindera(4), Nomoko(4), Cesce(2)
  const maxAchievements = achievementLimits[index] || 2;
  
  // Pre-selected key achievements for each company
  const keyAchievements: Record<string, Record<string, string[]>> = {
    "Enso Coliving": {
      leadership: [
        "Built entire tech stack from zero using Next.js 14, TypeScript, and PostgreSQL with Prisma ORM, generating €30k/month automated revenue",
        "Led team of 4 developers, mentoring 2 from zero coding experience to production-ready using modern Git workflows and code review processes",
        "Architected data consolidation system migrating from Notion/Airtable APIs to PostgreSQL with custom ETL pipelines and Supabase real-time subscriptions",
        "Designed and implemented Row Level Security policies and database triggers for sensitive financial data compliance",
        "Drove technical strategy implementing Docker containerization and GitHub Actions CI/CD for automated testing and deployment",
        "Established development workflows using ESLint, Prettier, Husky pre-commit hooks, and comprehensive Jest/Cypress testing suites"
      ],
      product: [
        "Architected data consolidation system with custom APIs integrating Notion, Airtable, and Monday.com into unified PostgreSQL database with real-time sync", 
        "Built algorithmic tenant qualification system using Python pandas for data analysis and machine learning scoring models, reducing manual operations 90%",
        "Created vector databases using pgvector extension for semantic search and AI-powered property recommendations with OpenAI embeddings",
        "Engineered Self-Serve Booking Engine with Stripe webhook integration, automated invoicing, and dynamic pricing algorithms for €30k/month revenue",
        "Built Idealista-style property website with Mapbox GL integration, advanced filtering, and responsive design using Tailwind CSS",
        "Designed intelligent matchmaking system analyzing user compatibility through JSON schema validation and recommendation algorithms"
      ],
      technical: [
        "Built entire tech stack from zero using Next.js 14 with App Router, TypeScript, Tailwind CSS, and PostgreSQL with Supabase Edge Functions",
        "Created vector databases using pgvector and implemented RAG (Retrieval-Augmented Generation) for AI tools with OpenAI GPT-4 integration",
        "Generated €30k/month revenue implementing Stripe payment processing, webhook handling, and automated recurring billing systems",
        "Implemented complex SQL schemas with foreign key constraints, indexes, and stored procedures for optimal query performance and data integrity",
        "Built real-time data synchronization using Supabase realtime subscriptions, WebSocket connections, and optimistic UI updates",
        "Architected serverless functions using Vercel Edge Runtime and Supabase Edge Functions for high-volume transaction processing and background jobs"
      ]
    },
    "Mindera": {
      leadership: [
        "Led migration from legacy jQuery monoliths to modern React 18 with TypeScript, implementing micro-frontend architecture and reducing delivery cycles 40%",
        "Architected multi-brand Design System using Storybook, styled-components, and design tokens across 3 global products serving 500k+ users",
        "Drove React Native adoption with Expo for iOS/Android development, implementing shared business logic and 90% code reuse between platforms",
        "Mentored junior developers establishing TDD practices with Jest, React Testing Library, and comprehensive E2E testing using Playwright"
      ],
      technical: [
        "Built scalable React applications with Redux Toolkit, React Query for server state management, and optimized bundle splitting for UK/US enterprise clients",
        "Implemented comprehensive CI/CD pipelines using GitHub Actions, Docker multi-stage builds, and automated deployment to AWS ECS with blue-green strategy",
        "Developed high-performance frontend architectures using Webpack 5 module federation, lazy loading, and service workers for offline-first PWA functionality",
        "Integrated GraphQL APIs using Apollo Client, implemented caching strategies, optimistic updates, and real-time subscriptions for enhanced UX"
      ]
    },
    "Nomoko": {
      technical: [
        "Engineered high-performance 3D data visualization with 60fps rendering",
        "Built component architecture for rapid Real Estate product prototyping",
        "Implemented WebGL/Three.js solutions for complex geospatial data rendering",
        "Optimized massive dataset handling and real-time visualization performance"
      ]
    },
    "Cesce": {
      technical: [
        "Developed regulatory-compliant interfaces for financial risk analysis",
        "Built production systems serving 20k+ B2B customers with 100% uptime"
      ]
    }
  };

  const companyKey = exp.company;
  const emphasisKey = version.emphasis === "management" ? "leadership" : 
                      version.emphasis === "fullstack" ? "technical" : 
                      version.emphasis;
  
  const selectedAchievements = keyAchievements[companyKey]?.[emphasisKey] || 
                              keyAchievements[companyKey]?.["technical"] ||
                              exp.highlights.slice(0, maxAchievements);
  
  return selectedAchievements.slice(0, maxAchievements);
}

// Helper to limit technologies by recency
function getTechLimitByRecency(index: number): number {
  const techLimits = [8, 6, 4, 3]; // Most recent gets more technologies
  return techLimits[index] || 3;
}