
export interface FormState {
  brandInfo: string;
  contentParams: string;
  currentAssets: string;
}

export interface ContentStrategyOverview {
  monthlyTheme: string;
  keyObjectives: string[];
  contentPillars: { pillar: string; distribution: string }[];
  successMetrics: string[];
}

export interface PlatformStrategy {
  platform: string;
  postingFrequency: string;
  optimalPostingTimes: string;
  contentFocus: string;
  hashtagStrategy: string;
}

export interface CalendarEntry {
  date: string;
  platform: string;
  contentType: string;
  topicTheme: string;
  postCopy: string;
  visualRequirements: string;
  hashtags: string;
  cta: string;
  notes: string;
}

export interface ContentBrief {
    objective: string;
    targetAudience: string;
    keyMessage: string;
    fullCopy: string;
    visualConcept: string;
    engagementStrategy: string;
    successMetrics: string;
}

export interface ContentStrategy {
  contentStrategyOverview: ContentStrategyOverview;
  platformSpecificStrategies: PlatformStrategy[];
  contentCalendar: CalendarEntry[];
  contentBriefs: ContentBrief[];
}
