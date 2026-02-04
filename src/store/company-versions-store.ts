import { create } from "zustand";
import { CompanyVersionMeta, CompanyVersionHistory, CompanyVersion } from "@/types/company-version";
import { ResumeData } from "@/types/resume";

type CompanyVersionsStore = {
  companies: CompanyVersionMeta[];
  selectedCompanyId: string | null;
  selectedHistory: CompanyVersionHistory | null;
  isLoading: boolean;
  error: string | null;

  isModalOpen: boolean;
  modalMode: "create" | "edit" | "history";
  setModalOpen: (open: boolean, mode?: "create" | "edit" | "history") => void;

  isGenerating: boolean;
  generationError: string | null;

  fetchCompanies: () => Promise<void>;
  fetchCompanyHistory: (companyId: string) => Promise<void>;
  selectCompany: (companyId: string | null) => void;
  
  createCompanyVersion: (
    companyName: string,
    jobTitle: string,
    baseResumeData: ResumeData,
    baseVersionId: string,
    jobDescription?: string,
    userInstructions?: string
  ) => Promise<{ resumeData: ResumeData; version: CompanyVersion } | null>;

  generateNewVersion: (
    companyId: string,
    currentResumeData: ResumeData,
    userInstructions: string,
    jobTitle?: string,
    jobDescription?: string
  ) => Promise<{ resumeData: ResumeData; version: CompanyVersion } | null>;

  switchVersion: (companyId: string, versionId: string) => Promise<void>;
  deleteCompany: (companyId: string) => Promise<void>;
  updateCompanyMeta: (companyId: string, updates: { companyName?: string; jobTitle?: string; notes?: string }) => Promise<void>;
};

export const useCompanyVersionsStore = create<CompanyVersionsStore>((set, get) => ({
  companies: [],
  selectedCompanyId: null,
  selectedHistory: null,
  isLoading: false,
  error: null,

  isModalOpen: false,
  modalMode: "create",
  setModalOpen: (open, mode = "create") => set({ isModalOpen: open, modalMode: mode }),

  isGenerating: false,
  generationError: null,

  fetchCompanies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/company-versions");
      const data = await response.json();
      if (data.success) {
        set({ companies: data.companies });
      } else {
        set({ error: data.error });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to fetch companies" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCompanyHistory: async (companyId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/company-versions/${companyId}`);
      const data = await response.json();
      if (data.success) {
        set({ selectedHistory: data.history, selectedCompanyId: companyId });
      } else {
        set({ error: data.error });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to fetch company history" });
    } finally {
      set({ isLoading: false });
    }
  },

  selectCompany: (companyId) => {
    if (companyId) {
      get().fetchCompanyHistory(companyId);
    } else {
      set({ selectedCompanyId: null, selectedHistory: null });
    }
  },

  createCompanyVersion: async (companyName, jobTitle, baseResumeData, baseVersionId, jobDescription, userInstructions) => {
    set({ isGenerating: true, generationError: null });
    try {
      const response = await fetch("/api/company-versions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isNewCompany: true,
          companyName,
          jobTitle,
          jobDescription,
          userInstructions,
          currentResumeData: baseResumeData,
          baseVersionId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        await get().fetchCompanies();
        return { resumeData: data.resumeData, version: data.version };
      } else {
        set({ generationError: data.error });
        return null;
      }
    } catch (error) {
      set({ generationError: error instanceof Error ? error.message : "Failed to create version" });
      return null;
    } finally {
      set({ isGenerating: false });
    }
  },

  generateNewVersion: async (companyId, currentResumeData, userInstructions, jobTitle, jobDescription) => {
    set({ isGenerating: true, generationError: null });
    try {
      const response = await fetch("/api/company-versions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isNewCompany: false,
          companyId,
          jobTitle,
          jobDescription,
          userInstructions,
          currentResumeData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        await get().fetchCompanyHistory(companyId);
        await get().fetchCompanies();
        return { resumeData: data.resumeData, version: data.version };
      } else {
        set({ generationError: data.error });
        return null;
      }
    } catch (error) {
      set({ generationError: error instanceof Error ? error.message : "Failed to generate version" });
      return null;
    } finally {
      set({ isGenerating: false });
    }
  },

  switchVersion: async (companyId, versionId) => {
    try {
      const response = await fetch(`/api/company-versions/${companyId}/switch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionId }),
      });

      const data = await response.json();
      if (data.success) {
        set({ selectedHistory: data.history });
        await get().fetchCompanies();
      }
    } catch (error) {
      console.error("Failed to switch version:", error);
    }
  },

  deleteCompany: async (companyId) => {
    try {
      const response = await fetch(`/api/company-versions/${companyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        set({ selectedCompanyId: null, selectedHistory: null });
        await get().fetchCompanies();
      }
    } catch (error) {
      console.error("Failed to delete company:", error);
    }
  },

  updateCompanyMeta: async (companyId, updates) => {
    try {
      const response = await fetch(`/api/company-versions/${companyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      if (data.success) {
        set({ selectedHistory: data.history });
        await get().fetchCompanies();
      }
    } catch (error) {
      console.error("Failed to update company:", error);
    }
  },
}));
