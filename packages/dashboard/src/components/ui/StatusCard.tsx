"use client";

import { clsx } from "clsx";

interface StatusCardProps {
  label: string;
  value: string;
  change: string;
  status: "online" | "warning" | "error" | "offline";
  icon: string;
}

export default function StatusCard({ label, value, change, status, icon }: StatusCardProps) {
  return (
    <div className="rounded-xl bg-nexus-surface border border-nexus-border p-4 group cursor-pointer neon-border">
      <div className="flex items-start justify-between mb-3">
        <span className="text-lg">{icon}</span>
        <div
          className={clsx(
            "w-2 h-2 rounded-full",
            status === "online" && "bg-neon-green",
            status === "warning" && "bg-yellow-500",
            status === "error" && "bg-neon-red",
            status === "offline" && "bg-gray-500"
          )}
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-500 font-mono tracking-wider">{label}</p>
        <p className="text-xl font-bold text-white font-mono">{value}</p>
        <p className="text-xs text-neon-green font-mono">{change}</p>
      </div>
    </div>
  );
}
