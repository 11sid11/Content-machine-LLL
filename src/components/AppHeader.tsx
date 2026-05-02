import { Activity, Sparkles } from "lucide-react";

export function AppHeader() {
  return (
    <header className="flex flex-col gap-5 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          <Sparkles className="h-3.5 w-3.5" />
          Local-first creator workflow
        </div>
        <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
          LeanLogicLab Content Machine
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60 sm:text-base">
          Prompt generation + manual ChatGPT workflow for @leanlogiclab
        </p>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-blue/25 bg-blue/10 px-4 py-3 text-sm text-blue">
        <Activity className="h-4 w-4" />
        No OpenAI API. No ChatGPT automation.
      </div>
    </header>
  );
}
