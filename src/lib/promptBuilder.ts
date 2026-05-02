import type { Goal, MannequinGender, OutputType, PostCategory, PostFormat, PromptBuildInput, PromptBuildResult, Tone } from "@/types/content";
import { defaultColorSchemeForCategory, formatColorSchemeForPrompt, getColorScheme } from "./colorSchemes";

const formTerms = [
  "form",
  "correct form",
  "mistake",
  "setup",
  "execution",
  "squat",
  "press",
  "pulldown",
  "row",
  "curl",
  "raise",
  "deadlift",
  "bench",
  "lunge"
];

const nutritionTerms = [
  "protein",
  "creatine",
  "calories",
  "carbs",
  "fats",
  "diet",
  "nutrition",
  "supplement",
  "fat loss",
  "meal"
];

const motivationTerms = [
  "motivation",
  "discipline",
  "consistency",
  "mindset",
  "quit",
  "lazy",
  "excuses",
  "confidence"
];

const categories: PostCategory[] = [
  "Form / Exercise Technique",
  "Nutrition / Supplements",
  "Gym Motivation"
];

export function inferCategory(topic: string): PostCategory {
  const normalized = topic.toLowerCase();

  if (formTerms.some((term) => normalized.includes(term))) {
    return "Form / Exercise Technique";
  }

  if (nutritionTerms.some((term) => normalized.includes(term))) {
    return "Nutrition / Supplements";
  }

  if (motivationTerms.some((term) => normalized.includes(term))) {
    return "Gym Motivation";
  }

  return "Form / Exercise Technique";
}

function normalizeCategory(category: PromptBuildInput["category"], topic: string): PostCategory {
  return category && categories.includes(category) ? category : inferCategory(topic);
}

function categoryDefaults(category: PostCategory): Pick<PromptBuildInput, "slideCount" | "tone" | "goal"> {
  if (category === "Nutrition / Supplements") {
    return { slideCount: 7, tone: "Beginner-friendly", goal: "Educate" };
  }

  if (category === "Gym Motivation") {
    return { slideCount: 5, tone: "Motivational", goal: "Reach" };
  }

  return { slideCount: 7, tone: "Evidence-based", goal: "Save" };
}

function expertRole(category: PostCategory) {
  if (category === "Nutrition / Supplements") {
    return "Act as a top-level sports nutritionist, evidence-based supplement researcher, practical fat-loss coach, viral Instagram strategist, and premium science-editorial designer.";
  }

  if (category === "Gym Motivation") {
    return "Act as a top-level fitness content creator, direct-response copy chief, cinematic art director, viral Instagram strategist, and emotional storytelling editor.";
  }

  return "Act as a top-level strength coach, biomechanics educator, exercise technique analyst, viral Instagram strategist, and premium futuristic infographic designer.";
}

function autoTopicBrief(category: PostCategory) {
  if (category === "Nutrition / Supplements") {
    return "AUTO: Choose the highest-viral-potential LeanLogicLab nutrition/supplement topic yourself. Prioritize an evergreen topic with strong save/share value, such as a misunderstood supplement, simple fat-loss rule, protein mistake, creatine myth, meal-timing misconception, or practical diet principle. Choose one specific topic only, then create the post around it.";
  }

  if (category === "Gym Motivation") {
    return "AUTO: Choose the highest-viral-potential LeanLogicLab gym motivation topic yourself. Prioritize a repost-worthy emotional angle around discipline, consistency, excuses, confidence, comeback energy, standards, or identity change. Choose one specific topic only, then create the post around it.";
  }

  return "AUTO: Choose the highest-viral-potential LeanLogicLab form/exercise-technique topic yourself. Prioritize an evergreen gym movement where people often make visible mistakes, such as lat pulldown, bench press, squat, deadlift, row, curl, lateral raise, shoulder press, lunge, or Romanian deadlift. Choose one specific exercise and correction angle only, then create the post around it.";
}

function topicMode(topic: string, category: PostCategory) {
  if (topic.startsWith("AUTO:")) {
    return `TOPIC SELECTION MODE:
- The user left the topic blank.
- You must choose the strongest topic yourself before writing the post.
- Pick a topic that has the highest realistic viral potential for LeanLogicLab in the "${category}" category.
- Favor topics with strong hook potential, visible contrast, practical usefulness, and save/share behavior.
- Do not ask the user follow-up questions.
- In the final output, replace the AUTO topic with the exact specific topic you selected.`;
  }

  return `TOPIC MODE:
- Use the user's topic exactly as the foundation.
- Improve the hook, angle, and structure, but do not drift into a different topic.`;
}

function normalizeSlideCount(format: PostFormat, slideCount: number, category: PostCategory) {
  if (format === "Single Post") {
    return 1;
  }

  if (!Number.isFinite(slideCount) || slideCount < 2) {
    return categoryDefaults(category).slideCount;
  }

  return Math.min(10, Math.max(2, Math.round(slideCount)));
}

function mannequinAppearance(gender: MannequinGender) {
  if (gender === "Female") {
    return `Female athletic subject lock:
- Use a strong, athletic female fitness mannequin with realistic muscular tone, confident posture, visible shoulder/back/leg definition, and professional gym-athlete proportions.
- Keep the appearance technical, non-sexualized, and performance-focused. This should look like an elite training demonstration, not glamour, fashion, or pin-up styling.
- Keep outfit consistent across slides: a clean black athletic set suitable for technique instruction, such as fitted training shorts and a minimal sports training top.
- Do not exaggerate body features, beauty posing, makeup, hair styling, or fashion-model aesthetics.`;
  }

  return `Male athletic subject lock:
- Use a strong, athletic male fitness mannequin with realistic muscular tone, confident posture, visible shoulder/back/leg definition, and professional gym-athlete proportions.
- Keep the appearance technical, non-sexualized, and performance-focused. This should look like an elite training demonstration, not bodybuilding exaggeration or fashion styling.
- Keep outfit consistent across slides: black athletic shorts and a minimal black training top if needed for clarity.
- Do not exaggerate bodybuilder proportions, beauty posing, or fashion-model aesthetics.`;
}

function visualSystem(category: PostCategory, gender: MannequinGender) {
  if (category === "Form / Exercise Technique") {
    return `Futuristic neon-blue fitness infographic style.
- Default color direction: black, charcoal, deep navy, white, electric blue, cyan glow, and red only for mistakes/wrong form. If a different app color scheme is selected, map its primary/secondary accents into the same futuristic technical system while keeping red reserved for mistakes.
- Use one metallic graphite 3D ${gender.toLowerCase()} mannequin, consistent across slides, following the subject lock below.
- Include movement arrows, curved rep-path arrows, pointer lines to body parts, body-part labels, blue check icons, red X icons, red mistake overlays, setup boxes, cue panels, mistake panels, checklist panels, futuristic slide number badges, a glowing CTA strip, dark gym background, glowing floor ring/platform, and neon UI panels.
- Use only the official LeanLogicLab brand name/handle treatment. Do not invent alternate logos, fake LLL marks, mascots, badges, or extra brand symbols.
- Mood: technical, precise, futuristic, high-performance.
- Do not use black/gold motivation poster styling, plain quote-post layouts, or emotional typography-led layouts.`;
  }

  if (category === "Nutrition / Supplements") {
    return `Premium science-editorial infographic style.
- Color palette: off-black, charcoal, clean white, soft ivory panels, muted teal, mint, subtle cyan, muted gold only as premium accent, red/orange only for myths/warnings/mistakes, and green/mint for practical recommendations.
- Use lab-style cards, macro icons, supplement jar renders, food illustrations, comparison tables, myth-vs-fact boxes, dosage boxes, timeline strips, ingredient breakdowns, simple charts, evidence-level tags like "Strong", "Moderate", or "Limited" when relevant, clean data panels, and practical takeaway boxes.
- Mood: clean, intelligent, trustworthy, modern, educational.
- Avoid excessive neon, bodybuilder-only visuals, dramatic emotional shadows, black/gold quote-post styling, exaggerated supplement claims, and medical fearmongering.`;
  }

  return `Cinematic typography-led emotional style.
- Pick a mood palette based on the topic and tone: discipline/hard truth uses black, charcoal, white, muted gold, warm amber light; comeback/intensity uses black, deep red, white, smoky gray; calm consistency uses charcoal, steel blue, white, soft gray; transformation/future-self uses black, violet, deep blue glow, white, silver; minimal quote/repost uses off-black, white, and one accent color only.
- Use massive stacked headlines, cinematic mannequin or gym silhouette, dark gym shadows, spotlight beams, subtle grain texture, emotional negative space, minimal dividers, and a strong final punchline.
- No technical arrows unless the topic specifically asks for instruction.
- Copy should be short, sharp, memorable, direct, and repost-worthy. Avoid cheesy generic motivation and long paragraphs.`;
}

function consistencyLock(category: PostCategory, gender: MannequinGender) {
  if (category === "Form / Exercise Technique") {
    return `FORM POST CONSISTENCY LOCK:
- Treat the carousel as one unified design system, not separate unrelated images.
- Use the same metallic graphite 3D ${gender.toLowerCase()} mannequin on every slide: same selected gender, same athletic proportions, same head shape, same material, same outfit, same body type, same lighting response, and same camera/render style.
- Only change the mannequin pose when the slide needs to demonstrate setup, movement path, mistakes, or fixes.
- Keep the background environment consistent: same dark gym, same glowing floor ring/platform, same camera angle family, same depth of field, same light direction, and same shadow style.
- Keep static elements consistent on every slide: slide number badge position, @leanlogiclab placement, headline zone, cue panel style, mistake panel style, checklist panel style, arrow thickness, pointer-line thickness, icon style, label typography, margins, CTA strip, and corner radius.
- Use one icon language across the full carousel: correct cues use the success color, mistakes use the warning color, and neutral instructional UI uses the selected primary/secondary accents.
- Do not change the mannequin outfit, add extra characters, add random logos, change typography families, switch layout systems, or invent new decorative UI elements mid-carousel.
- If generating slides one at a time, repeat this consistency lock inside every image prompt and reference the previous slide as the same character/design system.`;
  }

  return `DESIGN CONSISTENCY LOCK:
- Treat the carousel as one unified design system, not separate unrelated images.
- Keep background style, typography, panel shape, icon style, margin system, slide number badge, @leanlogiclab placement, CTA strip, and accent color usage consistent across every slide.
- Do not introduce new logos, random decorative systems, unrelated photo styles, or new color accents mid-carousel.`;
}

function slideStructure(category: PostCategory, format: PostFormat, slideCount: number, topic: string) {
  if (format === "Single Post") {
    return `Single post structure:
- One strong headline.
- One short body insight.
- One CTA.
- One clear visual direction.
- Include @leanlogiclab visibly.`;
  }

  if (category === "Form / Exercise Technique") {
    if (slideCount < 7) {
      return `Use exactly ${slideCount} slides. Compress the default 7-slide form structure intelligently: Cover / hook -> Setup correctly -> Execute like this -> Key cues / target muscle focus -> Common mistakes -> Fixes / coaching reminders -> Final checklist + save/follow CTA. Merge adjacent teaching points without making repetitive slides.`;
    }

    if (slideCount === 7) {
      return "Use exactly 7 slides by default: 1. Cover / hook, 2. Setup correctly, 3. Execute like this, 4. Key cues / target muscle focus, 5. Common mistakes, 6. Fixes / coaching reminders, 7. Final checklist + save/follow CTA.";
    }

    return `Use exactly ${slideCount} slides. Start from the default 7-slide form structure: 1. Cover / hook, 2. Setup correctly, 3. Execute like this, 4. Key cues / target muscle focus, 5. Common mistakes, 6. Fixes / coaching reminders, 7. Final checklist + save/follow CTA. Expand with extra cues, setup details, range of motion, grip/stance details, or advanced tips without repeating slide purposes.`;
  }

  if (category === "Nutrition / Supplements") {
    if (topic.startsWith("AUTO:")) {
      return `Use exactly ${slideCount} slides. First choose the strongest nutrition/supplement topic, then select the best structure for that topic: benefits, myths, mistakes, fat-loss basics, supplement usage, or practical checklist. Keep the final structure tight and non-repetitive.`;
    }

    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes("myth")) {
      return `Use exactly ${slideCount} slides. Structure: Hook -> Myth/fact breakdowns -> What is true -> Practical rule -> Takeaway. Add extra myth/fact or evidence panels only when slide count allows.`;
    }

    if (lowerTopic.includes("mistake")) {
      return `Use exactly ${slideCount} slides. Structure: Hook -> Mistakes -> Fixes -> Checklist -> Takeaway. Each mistake should lead to a practical fix.`;
    }

    if (lowerTopic.includes("fat loss") || lowerTopic.includes("diet")) {
      return `Use exactly ${slideCount} slides. Structure: Hook -> Principles -> Example -> Common mistake -> Practical rule -> Takeaway. Keep claims practical and evidence-aware.`;
    }

    return `Use exactly ${slideCount} slides. Structure: Hook -> What it does -> Benefits -> How to use -> Takeaway. Add dosage, timing, evidence-level, or comparison panels when relevant.`;
  }

  if (slideCount <= 5) {
    return `Use exactly ${slideCount} slides. Structure: Hook -> Reality check -> Reframe -> Action -> Punchline/CTA. Keep every slide punchy and repost-worthy.`;
  }

  if (slideCount <= 8) {
    return `Use exactly ${slideCount} slides. Structure: Hook -> Problem -> Truth -> Reframe -> Action -> Standard -> Punchline -> CTA. Trim or merge stages if needed to match the slide count exactly.`;
  }

  return `Use exactly ${slideCount} slides. Expand the emotional arc with more contrast, standards, and future-self tension, but keep each slide concise and unique.`;
}

function slideCountAdaptation(format: PostFormat, slideCount: number) {
  if (format === "Single Post") {
    return "Because this is a Single Post, make one polished visual with one clear idea and no carousel language.";
  }

  if (slideCount <= 3) {
    return "Because this is a short carousel, compress to the strongest hook and biggest takeaways.";
  }

  if (slideCount <= 5) {
    return "Because this is a concise carousel, use a high-impact structure with no filler.";
  }

  if (slideCount <= 7) {
    return "Because this is a mid-length carousel, build a strong teaching or emotional arc.";
  }

  return "Because this is an expanded carousel, include more examples, nuance, myths, or advanced takeaways without repetition.";
}

function outputInstruction(outputType: OutputType) {
  if (outputType === "Slide copy only") {
    return "Return only slide number, headline, and body copy. Do not include visual directions, captions, hashtags, or strategy.";
  }

  if (outputType === "Design prompt only") {
    return "Return only VISUAL SYSTEM and OPTIONAL AI DESIGN PROMPT. Do not include captions, hashtags, or slide copy.";
  }

  if (outputType === "Caption only") {
    return "Return only FINAL CAPTION. The caption must include a hook line, 2-3 value sentences, a CTA, @leanlogiclab, and the phrase \"Save this\".";
  }

  if (outputType === "Hashtags only") {
    return "Return only HASHTAGS: 15-20 targeted hashtags, no spam.";
  }

  return "Return the full structured output exactly in the requested sections.";
}

function buildPromptBody(input: PromptBuildResult) {
  const selectedScheme = getColorScheme(input.colorScheme);

  return `${expertRole(input.category)}

You are creating premium Instagram content for LeanLogicLab (@leanlogiclab).

Create a ${input.outputType} for the fitness brand LeanLogicLab.

INPUTS:
- Brand: LeanLogicLab
- Handle: @leanlogiclab
- Post category: ${input.category}
- Topic: ${input.topic}
- Format: ${input.format}
- Slide count: ${input.slideCount}
- Tone: ${input.tone}
- Goal: ${input.goal}
- Output type: ${input.outputType}
- Color scheme: ${selectedScheme.name}
- Mannequin gender: ${input.mannequinGender}

GLOBAL BRAND RULES:
- Brand positioning: LeanLogicLab is smart fitness made simple. It turns confusing gym, nutrition, and mindset topics into premium, practical, save-worthy Instagram posts.
- Audience: gym beginners and intermediates who want clear technique, better physique results, practical nutrition, and discipline without hype.
- Voice: Premium, direct, smart, practical, viral-ready but not cringe.
- Prioritize mobile readability.
- Use high contrast, large bold headlines, concise copy, and premium visual consistency.
- @leanlogiclab must appear in every slide and in the final caption.
- Use only the official LeanLogicLab brand name and @leanlogiclab handle. Do not invent alternate logos, fake LLL marks, mascots, badges, or extra brand symbols.
- No generic filler.
- No spammy hashtags.
- Never make repetitive slides. Every slide needs a unique purpose.

${topicMode(input.topic, input.category)}

COLOR SCHEME LOCK:
${formatColorSchemeForPrompt(input.colorScheme)}

MANNEQUIN / SUBJECT LOCK:
${mannequinAppearance(input.mannequinGender)}
- If the category or specific slide does not need a visible mannequin or human subject, keep this as a style constraint only and do not force unnecessary people into the design.

CONSISTENCY RULES:
${consistencyLock(input.category, input.mannequinGender)}

SLIDE COUNT ADAPTATION:
${slideCountAdaptation(input.format, input.slideCount)}

CATEGORY-SPECIFIC VISUAL SYSTEM:
${visualSystem(input.category, input.mannequinGender)}

SLIDE STRUCTURE LOGIC:
${slideStructure(input.category, input.format, input.slideCount, input.topic)}

OUTPUT FILTER:
${outputInstruction(input.outputType)}

FINAL OUTPUT FORMAT:
If the output filter allows the section, return these exact headings:

POST CATEGORY:
TOPIC:
FORMAT:
SLIDE COUNT:
TONE:
GOAL:
COLOR SCHEME:
MANNEQUIN GENDER:

POST STRATEGY:
Write a 2-3 sentence strategy for why this post will work for ${input.goal.toLowerCase()}.

VISUAL SYSTEM:
Describe the final visual system in detail using the category rules above.

SLIDE-BY-SLIDE BREAKDOWN:
For every slide, include:
- Purpose:
- Headline:
- Body Copy:
- Visual Direction:
- Design Elements:

FINAL CAPTION:
Hook line + 2-3 value sentences + CTA + @leanlogiclab + "Save this"

HASHTAGS:
15-20 targeted hashtags, no spam.

OPTIONAL AI DESIGN PROMPT:
A single paragraph ready to use for image generation.

QUALITY BAR:
- Make it feel like a premium creator tool output, not a generic social template.
- Keep copy tight enough to fit on mobile.
- Avoid medical claims, exaggerated supplement claims, and absolute promises.
- For form posts, be technically specific with cues and mistakes.
- For nutrition posts, be practical and evidence-aware.
- For motivation posts, make each line sharp enough to repost.`;
}

export function buildPrompt(input: PromptBuildInput): PromptBuildResult {
  const rawTopic = input.topic.trim();
  const category = normalizeCategory(input.category, rawTopic);
  const topic = rawTopic || autoTopicBrief(category);
  const defaults = categoryDefaults(category);
  const format = input.format || "Carousel";
  const slideCount = normalizeSlideCount(format, input.slideCount || defaults.slideCount, category);
  const tone = input.tone || defaults.tone;
  const goal = input.goal || defaults.goal;
  const outputType = input.outputType || "Full post package";
  const colorScheme = input.colorScheme || defaultColorSchemeForCategory(category);
  const mannequinGender = input.mannequinGender || "Male";

  const normalized: PromptBuildResult = {
    category,
    topic,
    format,
    slideCount,
    tone: tone as Tone,
    goal: goal as Goal,
    outputType: outputType as OutputType,
    colorScheme,
    mannequinGender,
    prompt: ""
  };

  normalized.prompt = buildPromptBody(normalized);
  return normalized;
}
