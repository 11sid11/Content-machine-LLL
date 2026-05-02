"use client";

import { Clipboard, FileText } from "lucide-react";

interface GeneratedPromptPanelProps {
  prompt: string;
  onCopy: () => void;
}

export function GeneratedPromptPanel({ prompt, onCopy }: GeneratedPromptPanelProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-panel/90 p-5 shadow-glow">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Generated Prompt</p>
          <h2 className="mt-1 text-xl font-bold text-white">Ready to paste into ChatGPT</h2>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-blue/30 bg-blue/10 px-3 py-2 text-sm font-semibold text-blue transition hover:border-blue hover:bg-blue/20"
          type="button"
          onClick={onCopy}
          disabled={!prompt}
        >
          <Clipboard className="h-4 w-4" />
          Copy Prompt
        </button>
      </div>
      <div className="min-h-[360px] rounded-lg border border-white/10 bg-ink/75">
        {prompt ? (
          <pre className="premium-scrollbar max-h-[520px] overflow-auto whitespace-pre-wrap p-4 text-sm leading-6 text-white/80">
            {prompt}
          </pre>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 px-6 text-center text-white/40">
            <FileText className="h-9 w-9 text-gold/70" />
            <p className="text-sm leading-6">
              Generate a prompt to see the category-specific LeanLogicLab output instructions here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
