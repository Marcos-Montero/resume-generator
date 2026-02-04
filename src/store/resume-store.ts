import { create } from "zustand";
import { ResumeData } from "@/types/resume";
import { CompanyVersion } from "@/types/company-version";
import { generateResumeData } from "@/data/resume-versions";

type ResumeStore = {
  currentVersion: string;
  resumeData: ResumeData;
  
  activeCompanyVersion: CompanyVersion | null;
  showChangeHighlights: boolean;
  
  setVersion: (versionId: string) => void;
  setResumeData: (data: ResumeData) => void;
  updatePersonalDetails: (details: Partial<ResumeData["personalDetails"]>) => void;
  updateSummary: (summary: string) => void;
  resetResumeData: () => void;
  
  setActiveCompanyVersion: (version: CompanyVersion | null) => void;
  setShowChangeHighlights: (show: boolean) => void;
  clearCompanyVersion: () => void;
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  currentVersion: "product-engineer",
  resumeData: generateResumeData("product-engineer"),
  
  activeCompanyVersion: null,
  showChangeHighlights: true,
  
  setVersion: (versionId) => {
    try {
      const newData = generateResumeData(versionId);
      set({ 
        currentVersion: versionId, 
        resumeData: newData,
        activeCompanyVersion: null,
      });
    } catch (error) {
      console.error("Failed to generate resume data for version:", versionId, error);
    }
  },
  
  setResumeData: (data) => set({ resumeData: data }),
  
  updatePersonalDetails: (details) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalDetails: { ...state.resumeData.personalDetails, ...details },
      },
    })),
  
  updateSummary: (summary) =>
    set((state) => ({
      resumeData: { ...state.resumeData, summary },
    })),
  
  resetResumeData: () => {
    const { currentVersion } = get();
    const freshData = generateResumeData(currentVersion);
    set({ 
      resumeData: freshData,
      activeCompanyVersion: null,
    });
  },
  
  setActiveCompanyVersion: (version) => set({ activeCompanyVersion: version }),
  setShowChangeHighlights: (show) => set({ showChangeHighlights: show }),
  clearCompanyVersion: () => set({ activeCompanyVersion: null }),
}));
