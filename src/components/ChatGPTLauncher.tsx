"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";

interface ChatGPTLauncherProps {
  chatUrl: string;
  hasPrompt: boolean;
  onOpen: () => void;
}

export function ChatGPTLauncher({ chatUrl, hasPrompt, onOpen }: ChatGPTLauncherProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-panelSoft/90 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">ChatGPT Launcher</p>
          <h2 className="mt-1 text-lg font-bold text-white">Manual paste workflow</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
            Opens your saved ChatGPT URL and copies the prompt. You paste, send, generate, and download manually.
          </p>
          <p className="mt-2 break-all text-xs text-white/40">{chatUrl || "https://chatgpt.com/"}</p>
        </div>
        <button
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-bold text-ink transition hover:bg-[#e1c06f] disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          disabled={!hasPrompt}
          onClick={onOpen}
        >
          <ExternalLink className="h-4 w-4" />
          Open ChatGPT Chat
        </button>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-ink/60 px-3 py-2 text-xs text-white/40">
        <ShieldCheck className="h-4 w-4 text-blue" />
        No login automation, scraping, Selenium, or Playwright control is used.
      </div>
    </section>
  );
}
