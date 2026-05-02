import { CheckCircle2, Info, XCircle } from "lucide-react";

export interface ToastMessage {
  id: string;
  tone: "success" | "error" | "info";
  message: string;
}

export function ToastViewport({ toasts }: { toasts: ToastMessage[] }) {
  return (
    <div className="fixed right-4 top-4 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = toast.tone === "success" ? CheckCircle2 : toast.tone === "error" ? XCircle : Info;
        const toneClass = toast.tone === "success"
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
          : toast.tone === "error"
            ? "border-red-400/30 bg-red-400/10 text-red-100"
            : "border-blue/30 bg-blue/10 text-blue";

        return (
          <div key={toast.id} className={`flex items-start gap-3 rounded-lg border px-4 py-3 shadow-glow backdrop-blur ${toneClass}`}>
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-sm leading-5">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
}
