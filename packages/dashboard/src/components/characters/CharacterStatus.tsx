"use client";

import { clsx } from "clsx";

const characters = [
  { name: "NOVA", role: "Main AI", color: "#00F5FF", status: "active", emoji: "🔮" },
  { name: "VEX", role: "Security", color: "#FF3B5C", status: "active", emoji: "🛡️" },
  { name: "ARIA", role: "Community", color: "#8B5CF6", status: "idle", emoji: "💬" },
  { name: "KAI", role: "Developer", color: "#3B82F6", status: "active", emoji: "⚡" },
  { name: "BYTE", role: "Economy", color: "#FFD700", status: "idle", emoji: "💰" },
  { name: "RUNE", role: "Moderation", color: "#FF8C42", status: "active", emoji: "⚔️" },
  { name: "NEXUS", role: "Infrastructure", color: "#00FF9C", status: "active", emoji: "🌐" },
  { name: "PIXEL", role: "Gaming", color: "#FF69B4", status: "idle", emoji: "🎮" },
];

export default function CharacterStatus() {
  return (
    <div className="space-y-2">
      {characters.map((char) => (
        <div
          key={char.name}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-nexus-bg transition-colors cursor-pointer"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ backgroundColor: `${char.color}20`, border: `1px solid ${char.color}40` }}
          >
            {char.emoji}
          </div>
          <div className="flex-1">
            <p className="text-xs font-mono font-bold" style={{ color: char.color }}>
              {char.name}
            </p>
            <p className="text-[10px] text-gray-500">{char.role}</p>
          </div>
          <div
            className={clsx(
              "w-2 h-2 rounded-full",
              char.status === "active" ? "bg-neon-green" : "bg-gray-500"
            )}
          />
        </div>
      ))}
    </div>
  );
}
