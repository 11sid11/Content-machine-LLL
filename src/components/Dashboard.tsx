"use client";

import { useCallback, useEffect, useState } from "react";
import type { PromptBuildInput, Settings } from "@/types/content";
import { buildPrompt } from "@/lib/promptBuilder";
import { AppHeader } from "./AppHeader";
import { ChatGPTLauncher } from "./ChatGPTLauncher";
import { GeneratedPromptPanel } from "./GeneratedPromptPanel";
import { PromptBuilderForm } from "./PromptBuilderForm";
import { SettingsPanel } from "./SettingsPanel";
import { ToastMessage, ToastViewport } from "./ToastViewport";

const initialPromptState: PromptBuildInput = {
  category: "Form / Exercise Technique",
  topic: "",
  format: "Carousel",
  slideCount: 7,
  tone: "Evidence-based",
  goal: "Save",
  outputType: "Full post package",
  colorScheme: "neon-blue-form",
  mannequinGender: "Male",
  creativeSeed: "",
  randomizeSeed: true
};

const defaultSettings: Settings = {
  chatGptChatUrl: "https://chatgpt.com/"
};

const settingsStorageKey = "leanlogiclab-content-machine-settings";

function normalizeSettings(input: Partial<Settings> | null): Settings {
  return {
    chatGptChatUrl: input?.chatGptChatUrl || defaultSettings.chatGptChatUrl
  };
}

function createCreativeSeed() {
  const prefix = Date.now().toString(36);

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const values = new Uint32Array(2);
    crypto.getRandomValues(values);
    return `${prefix}-${values[0].toString(36)}-${values[1].toString(36)}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function Dashboard() {
  const [form, setForm] = useState<PromptBuildInput>(initialPromptState);
  const [prompt, setPrompt] = useState("");
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [manualSlideCount, setManualSlideCount] = useState<number | null>(null);
  const [hasManualColorScheme, setHasManualColorScheme] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingsSaving, setIsSettingsSaving] = useState(false);

  const toast = useCallback((message: string, tone: ToastMessage["tone"] = "info") => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3600);
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(settingsStorageKey);
      setSettings(normalizeSettings(raw ? JSON.parse(raw) as Partial<Settings> : null));
    } catch {
      toast("Could not read saved browser settings. Using defaults.", "error");
    }
  }, [toast]);

  async function copyText(value: string, successMessage: string) {
    if (!value) {
      toast("Nothing to copy yet.", "error");
      return;
    }

    await navigator.clipboard.writeText(value);
    toast(successMessage, "success");
  }

  async function handleGeneratePrompt() {
    setIsGenerating(true);
    try {
      const creativeSeed = form.randomizeSeed || !form.creativeSeed.trim()
        ? createCreativeSeed()
        : form.creativeSeed.trim();
      const result = buildPrompt({ ...form, creativeSeed });

      setForm({
        category: result.category,
        topic: form.topic.trim() ? result.topic : "",
        format: result.format,
        slideCount: result.slideCount,
        tone: result.tone,
        goal: result.goal,
        outputType: result.outputType,
        colorScheme: result.colorScheme,
        mannequinGender: result.mannequinGender,
        creativeSeed: result.creativeSeed,
        randomizeSeed: result.randomizeSeed
      });
      setPrompt(result.prompt);
      toast(`Prompt generated with seed ${result.creativeSeed}.`, "success");
    } catch (error) {
      toast((error as Error).message, "error");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleOpenChatGPT() {
    if (!prompt) {
      toast("Generate a prompt first.", "error");
      return;
    }

    const opened = window.open(settings.chatGptChatUrl || "https://chatgpt.com/", "_blank", "noopener,noreferrer");

    try {
      await navigator.clipboard.writeText(prompt);
      toast("Prompt copied. Paste it into ChatGPT.", "success");
    } catch {
      toast("ChatGPT opened. Copy the prompt from the panel if clipboard access is blocked.", "info");
    }

    if (!opened) {
      toast("Popup blocked. Allow popups for localhost or use Copy Prompt.", "error");
    }
  }

  async function handleSaveSettings() {
    setIsSettingsSaving(true);
    try {
      const saved = normalizeSettings(settings);
      window.localStorage.setItem(settingsStorageKey, JSON.stringify(saved));
      setSettings(saved);
      toast("Settings saved in this browser.", "success");
    } catch (error) {
      toast((error as Error).message, "error");
    } finally {
      setIsSettingsSaving(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <ToastViewport toasts={toasts} />
      <AppHeader />

      <div className="grid gap-6 xl:grid-cols-[460px_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <PromptBuilderForm
            value={form}
            manualSlideCount={manualSlideCount}
            hasManualColorScheme={hasManualColorScheme}
            isGenerating={isGenerating}
            onChange={setForm}
            onManualSlideCountChange={setManualSlideCount}
            onManualColorSchemeChange={() => setHasManualColorScheme(true)}
            onNewSeed={() => {
              const seed = createCreativeSeed();
              setForm((current) => ({ ...current, creativeSeed: seed }));
              toast(`New seed: ${seed}`, "info");
            }}
            onGenerate={handleGeneratePrompt}
            onClear={() => {
              setForm(initialPromptState);
              setPrompt("");
              setManualSlideCount(null);
              setHasManualColorScheme(false);
              toast("Prompt builder cleared.", "info");
            }}
          />
          <ChatGPTLauncher
            chatUrl={settings.chatGptChatUrl || "https://chatgpt.com/"}
            hasPrompt={Boolean(prompt)}
            onOpen={handleOpenChatGPT}
          />
          <SettingsPanel
            settings={settings}
            isSaving={isSettingsSaving}
            onChange={setSettings}
            onSave={handleSaveSettings}
          />
        </div>

        <GeneratedPromptPanel prompt={prompt} onCopy={() => copyText(prompt, "Prompt copied.")} />
      </div>
    </main>
  );
}
