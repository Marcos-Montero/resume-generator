import { create } from "zustand";
import { ATSCoreAnalysis, VisualAudit } from "@/types/ats-core";

type OptimizerStore = {
  isPanelOpen: boolean;
  togglePanel: () => void;
  setPanel: (open: boolean) => void;

  showOptimizedPreview: boolean;
  setShowOptimizedPreview: (show: boolean) => void;

  jobDescription: string;
  setJobDescription: (text: string) => void;

  analysisLoading: boolean;
  analysisError: string | null;
  analysisResult: ATSCoreAnalysis | null;
  setAnalysisLoading: (loading: boolean) => void;
  setAnalysisError: (error: string | null) => void;
  setAnalysisResult: (result: ATSCoreAnalysis | null) => void;

  visualLoading: boolean;
  visualError: string | null;
  visualResult: VisualAudit | null;
  setVisualLoading: (loading: boolean) => void;
  setVisualError: (error: string | null) => void;
  setVisualResult: (result: VisualAudit | null) => void;

  activeTab: "scores" | "visual" | "parsing" | "keywords" | "quality" | "optimize";
  setActiveTab: (tab: "scores" | "visual" | "parsing" | "keywords" | "quality" | "optimize") => void;

  resetAll: () => void;
};

export const useOptimizerStore = create<OptimizerStore>((set) => ({
  isPanelOpen: false,
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
  setPanel: (open) => set({ isPanelOpen: open }),

  showOptimizedPreview: false,
  setShowOptimizedPreview: (show) => set({ showOptimizedPreview: show }),

  jobDescription: "",
  setJobDescription: (text) => set({ jobDescription: text }),

  analysisLoading: false,
  analysisError: null,
  analysisResult: null,
  setAnalysisLoading: (loading) => set({ analysisLoading: loading }),
  setAnalysisError: (error) => set({ analysisError: error }),
  setAnalysisResult: (result) => set({ analysisResult: result, showOptimizedPreview: result !== null }),

  visualLoading: false,
  visualError: null,
  visualResult: null,
  setVisualLoading: (loading) => set({ visualLoading: loading }),
  setVisualError: (error) => set({ visualError: error }),
  setVisualResult: (result) => set({ visualResult: result }),

  activeTab: "scores",
  setActiveTab: (tab) => set({ activeTab: tab }),

  resetAll: () =>
    set({
      analysisError: null,
      analysisResult: null,
      visualError: null,
      visualResult: null,
      activeTab: "scores",
      showOptimizedPreview: false,
    }),
}));
