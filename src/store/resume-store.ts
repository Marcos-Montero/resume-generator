import { create } from "zustand";
import { ResumeData } from "@/types/resume";
import { generateResumeData, RESUME_VERSIONS } from "@/data/resume-versions";

type ResumeStore = {
  currentVersion: string;
  resumeData: ResumeData;
  
  // Version management
  setVersion: (versionId: string) => void;
  
  // Data management
  setResumeData: (data: ResumeData) => void;
  updatePersonalDetails: (details: Partial<ResumeData["personalDetails"]>) => void;
  updateSummary: (summary: string) => void;
  
  // Reset
  resetResumeData: () => void;
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  currentVersion: "product-engineer", // Default to product engineer version
  resumeData: generateResumeData("product-engineer"),
  
  setVersion: (versionId) => {
    try {
      const newData = generateResumeData(versionId);
      set({ 
        currentVersion: versionId, 
        resumeData: newData
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
      resumeData: freshData
    });
  },
}));
