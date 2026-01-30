import { create } from "zustand";
import { ResumeData, AIScoreResult } from "@/types/resume";
import { generateResumeData, RESUME_VERSIONS } from "@/data/resume-versions";

type ResumeStore = {
  currentVersion: string;
  resumeData: ResumeData;
  aiScore: AIScoreResult | null;
  isAnalyzing: boolean;
  
  // Version management
  setVersion: (versionId: string) => void;
  
  // Data management
  setResumeData: (data: ResumeData) => void;
  updatePersonalDetails: (details: Partial<ResumeData["personalDetails"]>) => void;
  updateSummary: (summary: string) => void;
  
  // AI analysis
  setAIScore: (score: AIScoreResult | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  
  // Reset
  resetResumeData: () => void;
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  currentVersion: "product-engineer", // Default to product engineer version
  resumeData: generateResumeData("product-engineer"),
  aiScore: null,
  isAnalyzing: false,
  
  setVersion: (versionId) => {
    try {
      const newData = generateResumeData(versionId);
      set({ 
        currentVersion: versionId, 
        resumeData: newData,
        aiScore: null // Clear AI score when switching versions
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
  
  setAIScore: (score) => set({ aiScore: score }),
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  
  resetResumeData: () => {
    const { currentVersion } = get();
    const freshData = generateResumeData(currentVersion);
    set({ 
      resumeData: freshData, 
      aiScore: null 
    });
  },
}));
