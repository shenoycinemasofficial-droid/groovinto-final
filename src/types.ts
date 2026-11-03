export interface ProjectItem {
  id: string;
  title: string;
  category: 'narrative' | 'ai-assisted' | 'traditional' | 'episodic' | 'social' | 'meta-ugc' | 'social-media' | 'commercial' | 'brand-doc' | 'shorts' | string;
  categoryLabel: string;
  tagline: string;
  description: string;
  aspectRatio: '16:9' | '9:16' | '2.39:1';
  pipeline: {
    liveRatio: number; // e.g., 40%
    aiRatio: number; // e.g., 60%
    cameraGear?: string[];
    aiToolchain?: string[];
  };
  duration: string;
  year: string;
  coverImage: string;
  youtubeUrl?: string;
  youtubeId?: string;
  isShort?: boolean;
  client?: string;
  videoPlaceholderUrl?: string;
  breakdown: {
    storyChallenge: string;
    hybridSolution: string;
    deliverables: string[];
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  tagline: string;
  deliverables: string[];
  pipelineTags: string[];
  idealFor: string;
  iconName: string;
}

export interface CoursePricing {
  originalPrice: number;
  offerPrice: number;
  currency: string;
  currencySymbol: string;
  discountPercentage: number;
  savings: number;
  priceNote?: string;
  limitedSeats?: string;
}

export interface CourseItem {
  id: string;
  title: string;
  category: 'ai-video' | 'mind-training';
  subtitle: string;
  tagline: string;
  duration: string;
  level: string;
  format: string;
  summary: string;
  pricing: CoursePricing;
  curriculum: {
    module: string;
    topics: string[];
  }[];
  outcomes: string[];
  toolsOrMethods: string[];
  idealFor: string;
  badge: string;
}

export interface HowWeWorkStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
}

export interface ProjectInquiry {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  preferredApproach: 'hybrid' | 'live-shoot' | 'ai-assisted' | 'undecided';
  storySummary: string;
}

export type { BlogPost, BlogCategory, BlogBacklink } from './data/blogData';
