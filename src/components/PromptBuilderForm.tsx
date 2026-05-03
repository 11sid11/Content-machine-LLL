"use client";

import { Eraser, Shuffle, Wand2 } from "lucide-react";
import type { Goal, MannequinGender, OutputType, PostCategory, PostFormat, PromptBuildInput, Tone } from "@/types/content";
import { colorSchemes, defaultColorSchemeForCategory } from "@/lib/colorSchemes";

const categories: PostCategory[] = [
  "Form / Exercise Technique",
  "Nutrition / Supplements",
  "Gym Motivation"
];

const formats: PostFormat[] = ["Carousel", "Single Post"];

const tones: Tone[] = [
  "Evidence-based",
  "Funny",
  "Direct",
  "Aggressive",
  "Beginner-friendly",
  "Myth-busting",
  "Motivational"
];

const goals: Goal[] = ["Save", "Share", "Reach", "Educate", "Convert", "Mixed"];

const outputTypes: OutputType[] = [
  "Full post package",
  "Slide copy only",
  "Design prompt only",
  "Caption only",
  "Hashtags only"
];

const mannequinGenders: MannequinGender[] = ["Male", "Female"];

function defaultsForCategory(category: PostCategory): Pick<PromptBuildInput, "slideCount" | "tone" | "goal"> {
  if (category === "Nutrition / Supplements") {
    return { slideCount: 7, tone: "Beginner-friendly", goal: "Educate" };
  }

  if (category === "Gym Motivation") {
    return { slideCount: 5, tone: "Motivational", goal: "Reach" };
  }

  return { slideCount: 7, tone: "Evidence-based", goal: "Save" };
}

interface PromptBuilderFormProps {
  value: PromptBuildInput;
  manualSlideCount: number | null;
  hasManualColorScheme: boolean;
  isGenerating: boolean;
  onChange: (value: PromptBuildInput) => void;
  onManualSlideCountChange: (value: number) => void;
  onManualColorSchemeChange: () => void;
  onNewSeed: () => void;
  onGenerate: () => void;
  onClear: () => void;
}

const fieldClass = "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white shadow-inner shadow-black/20 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-white/40";

export function PromptBuilderForm({
  value,
  manualSlideCount,
  hasManualColorScheme,
  isGenerating,
  onChange,
  onManualSlideCountChange,
  onManualColorSchemeChange,
  onNewSeed,
  onGenerate,
  onClear
}: PromptBuilderFormProps) {
  function update<K extends keyof PromptBuildInput>(key: K, nextValue: PromptBuildInput[K]) {
    const updated = { ...value, [key]: nextValue };

    if (key === "category") {
      const defaults = defaultsForCategory(nextValue as PostCategory);
      updated.slideCount = value.format === "Single Post"
        ? 1
        : manualSlideCount !== null
          ? manualSlideCount
          : defaults.slideCount;
      updated.tone = defaults.tone;
      updated.goal = defaults.goal;
      if (!hasManualColorScheme) {
        updated.colorScheme = defaultColorSchemeForCategory(nextValue as PostCategory);
      }
    }

    if (key === "format" && nextValue === "Single Post") {
      updated.slideCount = 1;
    }

    if (key === "format" && nextValue === "Carousel" && updated.slideCount < 2) {
      updated.slideCount = manualSlideCount ?? defaultsForCategory(updated.category || "Form / Exercise Technique").slideCount;
    }

    if (key === "slideCount") {
      onManualSlideCountChange(Number(nextValue));
    }

    if (key === "colorScheme") {
      onManualColorSchemeChange();
    }

    onChange(updated);
  }

  const slideOptions = value.format === "Single Post"
    ? [1]
    : Array.from({ length: 9 }, (_, index) => index + 2);

  return (
    <section className="rounded-lg border border-white/10 bg-panel/90 p-5 shadow-glow">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Prompt Builder</p>
          <h2 className="mt-1 text-xl font-bold text-white">Build the post brief</h2>
        </div>
      </div>

      <div className="grid gap-4">
        <label>
          <span className={labelClass}>Post Category</span>
          <select
            className={fieldClass}
            value={value.category || ""}
            onChange={(event) => update("category", event.target.value as PostCategory)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <label>
          <span className={labelClass}>Topic</span>
          <input
            className={fieldClass}
            value={value.topic}
            onChange={(event) => update("topic", event.target.value)}
            placeholder="Optional: e.g. Lat Pulldown Correct Form, Benefits of Creatine, Discipline Beats Fancy Programs"
          />
          <p className="mt-2 text-xs leading-5 text-white/40">
            Leave blank and the prompt will make ChatGPT choose the highest-potential LeanLogicLab topic for the selected category.
          </p>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Format</span>
            <select
              className={fieldClass}
              value={value.format}
              onChange={(event) => update("format", event.target.value as PostFormat)}
            >
              {formats.map((format) => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </label>

          <label>
            <span className={labelClass}>Slide Count</span>
            <select
              className={fieldClass}
              value={value.slideCount}
              onChange={(event) => update("slideCount", Number(event.target.value))}
              disabled={value.format === "Single Post"}
            >
              {slideOptions.map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Tone</span>
            <select
              className={fieldClass}
              value={value.tone}
              onChange={(event) => update("tone", event.target.value as Tone)}
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
          </label>

          <label>
            <span className={labelClass}>Goal</span>
            <select
              className={fieldClass}
              value={value.goal}
              onChange={(event) => update("goal", event.target.value as Goal)}
            >
              {goals.map((goal) => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </select>
          </label>
        </div>

        <label>
          <span className={labelClass}>Output Type</span>
          <select
            className={fieldClass}
            value={value.outputType}
            onChange={(event) => update("outputType", event.target.value as OutputType)}
          >
            {outputTypes.map((outputType) => (
              <option key={outputType} value={outputType}>{outputType}</option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Mannequin Gender</span>
            <select
              className={fieldClass}
              value={value.mannequinGender}
              onChange={(event) => update("mannequinGender", event.target.value as MannequinGender)}
            >
              {mannequinGenders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender === "Female" ? "Female - athletic" : "Male - athletic"}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-5 text-white/40">
              Used for form mannequins and any fitness subject or silhouette.
            </p>
          </label>

          <label>
            <span className={labelClass}>Color Scheme</span>
            <select
              className={fieldClass}
              value={value.colorScheme}
              onChange={(event) => update("colorScheme", event.target.value as PromptBuildInput["colorScheme"])}
            >
              {colorSchemes.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {scheme.name} - {scheme.categoryHint}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-lg border border-white/10 bg-ink/45 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="min-w-0 flex-1">
              <span className={labelClass}>Variation Seed</span>
              <input
                className={fieldClass}
                value={value.creativeSeed}
                onChange={(event) => update("creativeSeed", event.target.value)}
                placeholder="Auto-generated on each prompt"
                disabled={value.randomizeSeed}
              />
            </label>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue/30 bg-blue/10 px-4 py-2.5 text-sm font-semibold text-blue transition hover:border-blue hover:bg-blue/20"
              type="button"
              onClick={onNewSeed}
            >
              <Shuffle className="h-4 w-4" />
              New Seed
            </button>
          </div>
          <label className="mt-3 flex items-start gap-3 text-sm text-white/60">
            <input
              className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-cyan-400"
              type="checkbox"
              checked={value.randomizeSeed}
              onChange={(event) => update("randomizeSeed", event.target.checked)}
            />
            <span>
              Auto-generate a fresh seed every time. Turn this off to reuse a seed and reproduce the same prompt variation.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-4 py-3 text-sm font-bold text-ink transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
        >
          <Wand2 className="h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate Prompt"}
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-gold/40 hover:text-gold"
          type="button"
          onClick={onClear}
        >
          <Eraser className="h-4 w-4" />
          Clear
        </button>
      </div>
    </section>
  );
}
