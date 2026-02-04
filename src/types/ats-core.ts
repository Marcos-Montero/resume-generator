export type SeverityLevel = "CRITICAL" | "WARNING";

export type ParsingError = {
  severity: SeverityLevel;
  issue: string;
  location: string;
};

export type SectionMapping = {
  contact_info_found: boolean;
  work_experience_found: boolean;
  education_found: boolean;
  skills_found: boolean;
};

export type KeywordMatch = {
  keyword: string;
  source: string;
  recency_weight: "High" | "Medium" | "Low";
};

export type RewriteSuggestion = {
  original_text: string;
  optimized_text: string;
};

export type AutoAppliedChange = {
  section: string;
  field: string;
  original: string;
  optimized: string;
  reason: string;
};

export type ManualChangeRequired = {
  section: string;
  field: string;
  current_text: string;
  suggestion: string;
  reason: string;
  placeholder_hint: string;
};

export type OptimizedResume = {
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    position: string;
    achievements: string[];
  }[];
};

export type ATSCoreAnalysis = {
  meta: {
    parser_engine: string;
    timestamp: string;
    document_type: string;
  };
  scores: {
    global_match_score: number;
    parsing_integrity_score: number;
    keyword_relevance_score: number;
    impact_and_seniority_score: number;
  };
  parsing_audit: {
    is_machine_readable: boolean;
    parsing_errors: ParsingError[];
    section_mapping: SectionMapping;
  };
  keyword_analysis: {
    missing_critical_skills: string[];
    missing_soft_skills: string[];
    keyword_stuffing_detected: string[];
    exact_matches: KeywordMatch[];
  };
  content_quality: {
    metric_density_percentage: number;
    action_verb_strength: "Low" | "Medium" | "High";
    career_gaps_detected: boolean;
    formatting_warnings: string[];
  };
  optimization_plan: {
    priority_actions: string[];
    rewrite_suggestions: RewriteSuggestion[];
  };
  optimized_resume: {
    auto_applied_changes: AutoAppliedChange[];
    manual_changes_required: ManualChangeRequired[];
    optimized_data: OptimizedResume;
  };
};

export type VisualAudit = {
  layout_type: "single-column" | "two-column" | "multi-column";
  layout_risk_level: "LOW" | "MEDIUM" | "HIGH";
  layout_issues: string[];
  font_analysis: {
    detected_fonts: string[];
    ats_compatibility: "SAFE" | "RISKY" | "UNKNOWN";
    recommendations: string[];
  };
  visual_elements: {
    has_graphics: boolean;
    has_icons: boolean;
    has_progress_bars: boolean;
    has_tables: boolean;
    has_text_boxes: boolean;
    issues: string[];
  };
  readability: {
    contrast_ok: boolean;
    font_size_ok: boolean;
    line_spacing_ok: boolean;
    issues: string[];
  };
  linearization_test: {
    passes: boolean;
    problem_areas: string[];
    reading_order_issues: string[];
  };
};

export type ATSAnalysisRequest = {
  resumeText: string;
  jobDescription?: string;
  includeVisualAnalysis?: boolean;
  screenshotBase64?: string;
};

export type ATSAnalysisResponse = {
  success: boolean;
  analysis?: ATSCoreAnalysis;
  visualAudit?: VisualAudit;
  error?: string;
};

export type ScoreCategory = {
  label: string;
  score: number;
  maxScore: number;
  color: string;
};
