"use client";

import { Save, Settings as SettingsIcon } from "lucide-react";
import type { Settings } from "@/types/content";

interface SettingsPanelProps {
  settings: Settings;
  isSaving: boolean;
  onChange: (settings: Settings) => void;
  onSave: () => void;
}

const fieldClass = "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-white/40";

export function SettingsPanel({ settings, isSaving, onChange, onSave }: SettingsPanelProps) {
  const currentSettings = settings;

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    onChange({ ...currentSettings, [key]: value });
  }

  return (
    <section className="rounded-lg border border-white/10 bg-panel/90 p-5 shadow-glow">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Settings</p>
          <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-white">
            <SettingsIcon className="h-5 w-5 text-blue" />
            Browser settings
          </h2>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-[#e1c06f] disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={onSave}
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="grid gap-4">
        <label>
          <span className={labelClass}>ChatGPT Chat URL</span>
          <input
            className={fieldClass}
            value={settings.chatGptChatUrl}
            onChange={(event) => update("chatGptChatUrl", event.target.value)}
            placeholder="https://chatgpt.com/"
          />
        </label>
        <div className="rounded-lg border border-white/10 bg-ink/60 p-4">
          <p className="text-sm font-bold text-white">Local-only workflow</p>
          <p className="mt-1 text-sm leading-6 text-white/50">
            Static hosting saves this URL in your browser only. Image downloads, file naming, and final storage stay fully manual.
          </p>
        </div>
      </div>
    </section>
  );
}
