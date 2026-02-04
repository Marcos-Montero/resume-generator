import { ResumeData } from "./resume";

export type ChangeDetail = {
  section: string;
  field: string;
  description: string;
  originalValue?: string;
  newValue?: string;
};

export type CompanyVersion = {
  id: string;
  companyId: string;
  companyName: string;
  jobTitle: string;
  jobDescription?: string;
  notes?: string;
  baseVersionId: string;
  resumeData: ResumeData;
  createdAt: string;
  updatedAt: string;
  version: number;
  llmPromptUsed?: string;
  changeSummary?: string;
  changes?: ChangeDetail[];
};

export type CompanyVersionHistory = {
  companyId: string;
  companyName: string;
  versions: CompanyVersion[];
  currentVersionId: string;
  createdAt: string;
  updatedAt: string;
};

export type CompanyVersionMeta = {
  id: string;
  companyId: string;
  companyName: string;
  jobTitle: string;
  currentVersionId: string;
  versionCount: number;
  updatedAt: string;
};

export type CreateCompanyVersionRequest = {
  companyName: string;
  jobTitle: string;
  jobDescription?: string;
  notes?: string;
  baseVersionId: string;
  baseResumeData: ResumeData;
};

export type UpdateCompanyVersionRequest = {
  companyId: string;
  versionId: string;
  jobTitle?: string;
  jobDescription?: string;
  notes?: string;
  resumeData?: ResumeData;
  llmPrompt?: string;
};

export type GenerateVersionRequest = {
  companyId: string;
  currentVersionId: string;
  llmPrompt: string;
  currentResumeData: ResumeData;
  jobDescription?: string;
};
