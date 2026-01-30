export type PersonalDetails = {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  location: string;
  github?: string;
  website?: string;
};

export type Language = {
  name: string;
  level: string;
};

export type Education = {
  institution: string;
  degree: string;
  field?: string;
  year?: string;
  description?: string;
};

export type Membership = {
  organization: string;
  role?: string;
  since?: string;
};

export type Interest = {
  title: string;
  description?: string;
};

export type Skill = {
  category: string;
  items: string[];
};

export type Experience = {
  company: string;
  industry?: string;
  position: string;
  duration: string;
  location: string;
  technologies: string[];
  achievements: string[];
};

export type Project = {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  highlights?: string[];
};

export type ResumeData = {
  personalDetails: PersonalDetails;
  summary: string;
  languages: Language[];
  education: Education[];
  memberships: Membership[];
  interests: Interest[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
};

// AI types removed
