"use client";
import { clsx } from "clsx";

export default function Terminal({ title, lines, prompt = ">" }: {
  title: string; lines: string[]; prompt?: string;
}) {
  return (
    <div className="rounded-xl bg-nexus-surface border border-nexus-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-nexus-card border-b border-nexus-border">
        <span className="w-3 h-3 rounded-full bg-neon-red/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-neon-green/80" />
        <span className="ml-2 text-xs font-mono text-gray-500">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-neon-cyan">{prompt}</span>
            <span className={clsx(
              line.includes("READY") || line.includes("PASSED") || line.includes("OPERATIONAL") ? "text-neon-green" :
              line.includes("ERROR") ? "text-neon-red" : "text-gray-400"
            )}>{line}</span>
          </div>
        ))}
        <div className="flex gap-2">
          <span className="text-neon-cyan">{prompt}</span>
          <span className="w-2 h-4 bg-neon-cyan animate-terminal-blink" />
        </div>
      </div>
    </div>
  );
}
