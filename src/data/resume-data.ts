import { ResumeData } from "@/types/resume";

export const initialResumeData: ResumeData = {
  personalDetails: {
    fullName: "Marcos Montero",
    title: "Senior Product Engineer (AI, Web & Mobile)",
    phone: "+34 696013104",
    email: "marcos.mon.rod@gmail.com",
    linkedin: "/in/-marcos-montero",
    location: "Madrid, Spain",
    github: "/Marcos-Montero",
  },
  summary:
    "Product-minded Senior Software Engineer with 8+ years of experience architecting scalable platforms. Expert in bridging the gap between modern Full Stack development (Next.js, React Native) and Data Engineering (PostgreSQL, Supabase). Currently focused on building AI-native applications, leveraging Python and Vector Databases to integrate LLMs into production workflows. Proven track record of shipping 0→1 products that generate tangible revenue (€1.5M+ ARR impact).",
  languages: [
    { name: "English", level: "C1" },
    { name: "Spanish", level: "C2" },
    { name: "Euskera", level: "B1" },
  ],
  education: [
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
  ],
  memberships: [
    {
      organization: "Mensa International",
      role: "Member",
      since: "2024",
    },
  ],
  interests: [
    {
      title: "Mensa International",
      description: "Member & active collaborator",
    },
    {
      title: "Active Project",
      description: "Currently developing AI-powered tools using the Vercel AI SDK",
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "Python", "JavaScript", "SQL", "HTML/CSS"],
    },
    {
      category: "Core Stack",
      items: ["Next.js (App Router)", "React", "React Native (Expo)", "Node.js", "Tailwind CSS"],
    },
    {
      category: "Data & AI",
      items: [
        "PostgreSQL",
        "Supabase (Auth, DB, Vector)",
        "RAG (Retrieval-Augmented Generation)",
        "OpenAI API",
        "Vercel AI SDK",
        "Pandas",
      ],
    },
    {
      category: "Engineering",
      items: [
        "CI/CD (GitHub Actions)",
        "Docker",
        "TDD (Jest/Cypress)",
        "System Design",
        "REST & GraphQL APIs",
      ],
    },
  ],
  experience: [
    {
      company: "Independent Consultant",
      position: "Senior Product Engineer (Freelance / Consultant)",
      duration: "Oct 2025 – Present",
      location: "Remote",
      technologies: [
        "Python (LangGraph & Claude API)",
        "Node.js",
        "Supabase (Vector DB & Auth)",
        "Next.js",
        "React Native (Expo)",
        "TypeScript",
        "Tailwind CSS",
      ],
      achievements: [
        "Mobile & AI Development: Designed and shipped a mobile game on Google Play using Expo (React Native) and Supabase, implementing real-time data sync and user authentication.",
        "RAG Implementation: Developing custom AI agents for business clients using Python and Supabase Vector, enabling automated document retrieval and customer support interactions.",
        "Web Architecture: Architecting high-performance web applications with Next.js and TypeScript, optimizing for SEO and Core Web Vitals.",
      ],
    },
    {
      company: "Enso coliving",
      industry: "Real Estate",
      position: "Founding Tech Lead & Product Architect",
      duration: "2.7y / Apr 2023 - Oct 2025",
      location: "Madrid",
      technologies: [
        "Next.js (App Router)",
        "Node.js (Serverless Functions)",
        "PostgreSQL",
        "Python (Data Automation)",
        "React",
        "Tailwind CSS",
        "Stripe API",
        "Docker",
      ],
      achievements: [
        "System Architecture: Rebuilt the company's entire digital ecosystem (0→1) using Next.js and PostgreSQL, moving from low-code to a scalable proprietary stack handling €1.5M+ in annual transactions.",
        "Automated Revenue: Architected the 'Self-Serve Booking Engine' with Stripe integration, generating €30k/weekly in automated revenue and eliminating manual sales friction.",
        "Intelligent Workflows: Engineered an algorithmic tenant qualification system that analyzed user data points to automate approvals, reducing manual operations by 90%.",
        "Data Engineering: Designed complex SQL schemas and Row Level Security (RLS) policies to secure sensitive financial data and optimize query performance.",
      ],
    },
    {
      company: "Mindera",
      industry: "Consultancy",
      position: "Senior Software Engineer & Tech Lead (Web & Mobile)",
      duration: "2y / Apr 2021 - Apr 2023",
      location: "UK & US (Remote)",
      technologies: [
        "TypeScript",
        "React",
        "React Native",
        "Node.js (BFF Middleware)",
        "GraphQL",
        "Jest (TDD)",
        "Cypress",
        "CI/CD (GitHub Actions)",
        "AWS (S3/Lambda)",
      ],
      achievements: [
        "Legacy Migration: Led the strategic migration of legacy monoliths to modern React architectures, reducing feature delivery cycles by 40%.",
        "Mobile Parity: Drove the adoption of React Native for key product features, ensuring seamless code sharing between web and mobile platforms.",
        "Quality Engineering: Enforced Test-Driven Development (TDD) and CI/CD pipelines, resulting in a 60% reduction in critical production bugs.",
        "Design Systems: Architected a multi-brand Design System that standardized UI components across 3 global products.",
      ],
    },
    {
      company: "Nomoko",
      industry: "Digital Twin for Real Estate",
      position: "Lead Frontend Engineer (Data Visualization)",
      duration: "1.3y / Jan 2020 - Apr 2021",
      location: "Switzerland (Remote from Madrid)",
      technologies: [
        "JavaScript (ES6+)",
        "React",
        "Redux",
        "WebGL/Three.js",
        "Python (Geospatial Data Scripts)",
        "Mapbox GL",
        "REST APIs",
      ],
      achievements: [
        'Complex Data Viz: Engineered high-performance interfaces for 3D spatial data ("Digital Twins") in the browser, handling massive datasets with 60fps rendering.',
        "Modular Architecture: Built a component-based architecture that allowed rapid prototyping of new data products for the Real Estate sector.",
      ],
    },
    {
      company: "Cesce",
      industry: "Fintech",
      position: "Senior Frontend Engineer (Fintech)",
      duration: "2.3y / Sep 2017 - Jan 2020",
      location: "Madrid",
      technologies: [
        "JavaScript",
        "React",
        "HTML5/SCSS",
        "Java (Legacy Integration)",
        "PL/SQL (Oracle)",
        "Jenkins",
        "SonarQube",
      ],
      achievements: [
        "Fast-Track Promotion: Promoted from Junior to Senior within 12 months due to ownership of critical risk assessment modules.",
        "Fintech Reliability: Developed regulatory-compliant interfaces for financial risk analysis used by 20k+ B2B customers, ensuring 100% data accuracy.",
      ],
    },
  ],
  projects: [],
};
