import type { ColorSchemeId, PostCategory } from "@/types/content";

export interface ColorScheme {
  id: ColorSchemeId;
  name: string;
  categoryHint: "Form" | "Nutrition" | "Motivation" | "Universal";
  description: string;
  colors: {
    background: string;
    surface: string;
    panel: string;
    text: string;
    primary: string;
    secondary: string;
    warning: string;
    success: string;
  };
}

export const colorSchemes: ColorScheme[] = [
  {
    id: "neon-blue-form",
    name: "Neon Blue Form",
    categoryHint: "Form",
    description: "Futuristic form-correction look with electric blue/cyan accents and red reserved only for mistakes.",
    colors: {
      background: "#050609",
      surface: "#111827",
      panel: "#0B1120",
      text: "#F8FAFC",
      primary: "#29A8FF",
      secondary: "#6EE7FF",
      warning: "#FF3B3B",
      success: "#38D996"
    }
  },
  {
    id: "cyber-cyan-steel",
    name: "Cyber Cyan Steel",
    categoryHint: "Form",
    description: "Cool steel and cyan system for technical coaching posts with precise diagram energy.",
    colors: {
      background: "#060A0F",
      surface: "#141A22",
      panel: "#1F2933",
      text: "#F9FAFB",
      primary: "#00D4FF",
      secondary: "#7DD3FC",
      warning: "#F43F5E",
      success: "#22C55E"
    }
  },
  {
    id: "graphite-gold",
    name: "Graphite Gold",
    categoryHint: "Motivation",
    description: "Premium discipline palette with graphite foundations and restrained muted gold highlights.",
    colors: {
      background: "#050505",
      surface: "#171717",
      panel: "#262626",
      text: "#FAFAF9",
      primary: "#C9A45C",
      secondary: "#F0D58C",
      warning: "#D94A38",
      success: "#A3E635"
    }
  },
  {
    id: "redline-intensity",
    name: "Redline Intensity",
    categoryHint: "Motivation",
    description: "Aggressive comeback palette with black, smoky gray, deep red, and clean white contrast.",
    colors: {
      background: "#050506",
      surface: "#16181D",
      panel: "#24262D",
      text: "#FFFFFF",
      primary: "#E11D48",
      secondary: "#FF6B6B",
      warning: "#FB923C",
      success: "#22C55E"
    }
  },
  {
    id: "science-mint",
    name: "Science Mint",
    categoryHint: "Nutrition",
    description: "Clean evidence-led nutrition look with mint recommendations, ivory panels, and calm dark contrast.",
    colors: {
      background: "#07100E",
      surface: "#101817",
      panel: "#F3EFE3",
      text: "#F8FAFC",
      primary: "#2DD4BF",
      secondary: "#A7F3D0",
      warning: "#F97316",
      success: "#34D399"
    }
  },
  {
    id: "teal-ivory-evidence",
    name: "Teal Ivory Evidence",
    categoryHint: "Nutrition",
    description: "Science-editorial palette for supplement and diet posts with teal data accents and ivory cards.",
    colors: {
      background: "#080F12",
      surface: "#132025",
      panel: "#FFF7E8",
      text: "#F8FAFC",
      primary: "#14B8A6",
      secondary: "#8BD3DD",
      warning: "#EA580C",
      success: "#65A30D"
    }
  },
  {
    id: "violet-future-self",
    name: "Violet Future Self",
    categoryHint: "Motivation",
    description: "Transformation palette with black, deep violet, blue glow, silver, and sharp white typography.",
    colors: {
      background: "#070711",
      surface: "#111027",
      panel: "#1E1B4B",
      text: "#F8FAFC",
      primary: "#8B5CF6",
      secondary: "#38BDF8",
      warning: "#F43F5E",
      success: "#A7F3D0"
    }
  },
  {
    id: "steel-blue-calm",
    name: "Steel Blue Calm",
    categoryHint: "Motivation",
    description: "Calm consistency palette using charcoal, steel blue, soft gray, and clean white hierarchy.",
    colors: {
      background: "#080B10",
      surface: "#151A21",
      panel: "#27313D",
      text: "#F8FAFC",
      primary: "#60A5FA",
      secondary: "#CBD5E1",
      warning: "#F59E0B",
      success: "#4ADE80"
    }
  },
  {
    id: "lime-performance",
    name: "Lime Performance",
    categoryHint: "Universal",
    description: "High-energy dark athletic palette with neon lime for action states and cyan for secondary data.",
    colors: {
      background: "#050806",
      surface: "#121A14",
      panel: "#1C261E",
      text: "#F8FAFC",
      primary: "#A3FF12",
      secondary: "#00E5FF",
      warning: "#EF4444",
      success: "#22C55E"
    }
  },
  {
    id: "amber-graphite",
    name: "Amber Graphite",
    categoryHint: "Universal",
    description: "Warm premium dark palette for practical coaching posts with amber CTAs and graphite panels.",
    colors: {
      background: "#070605",
      surface: "#191714",
      panel: "#29241C",
      text: "#FFF7ED",
      primary: "#F59E0B",
      secondary: "#FCD34D",
      warning: "#DC2626",
      success: "#84CC16"
    }
  }
];

export function getColorScheme(id?: ColorSchemeId) {
  return colorSchemes.find((scheme) => scheme.id === id) || colorSchemes[0];
}

export function defaultColorSchemeForCategory(category: PostCategory): ColorSchemeId {
  if (category === "Nutrition / Supplements") {
    return "science-mint";
  }

  if (category === "Gym Motivation") {
    return "graphite-gold";
  }

  return "neon-blue-form";
}

export function formatColorSchemeForPrompt(id: ColorSchemeId) {
  const scheme = getColorScheme(id);

  return `${scheme.name}: ${scheme.description}
- Background: ${scheme.colors.background}
- Surface: ${scheme.colors.surface}
- Panel/card: ${scheme.colors.panel}
- Main text: ${scheme.colors.text}
- Primary accent: ${scheme.colors.primary}
- Secondary accent/glow: ${scheme.colors.secondary}
- Warning/mistake color: ${scheme.colors.warning}
- Success/correct color: ${scheme.colors.success}
- Use this exact palette on every slide. Do not invent extra accent colors or shift hue/saturation between slides.`;
}
