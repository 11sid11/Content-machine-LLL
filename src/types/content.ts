export type PostCategory =
  | "Form / Exercise Technique"
  | "Nutrition / Supplements"
  | "Gym Motivation";

export type PostFormat = "Carousel" | "Single Post";

export type Tone =
  | "Evidence-based"
  | "Funny"
  | "Direct"
  | "Aggressive"
  | "Beginner-friendly"
  | "Myth-busting"
  | "Motivational";

export type Goal = "Save" | "Share" | "Reach" | "Educate" | "Convert" | "Mixed";

export type OutputType =
  | "Full post package"
  | "Slide copy only"
  | "Design prompt only"
  | "Caption only"
  | "Hashtags only";

export type ColorSchemeId =
  | "neon-blue-form"
  | "cyber-cyan-steel"
  | "graphite-gold"
  | "redline-intensity"
  | "science-mint"
  | "teal-ivory-evidence"
  | "violet-future-self"
  | "steel-blue-calm"
  | "lime-performance"
  | "amber-graphite";

export type MannequinGender = "Male" | "Female";

export interface PromptBuildInput {
  category?: PostCategory | "";
  topic: string;
  format: PostFormat;
  slideCount: number;
  tone: Tone;
  goal: Goal;
  outputType: OutputType;
  colorScheme: ColorSchemeId;
  mannequinGender: MannequinGender;
  creativeSeed: string;
  randomizeSeed: boolean;
}

export interface PromptBuildResult extends PromptBuildInput {
  category: PostCategory;
  prompt: string;
}

export interface Settings {
  chatGptChatUrl: string;
}
