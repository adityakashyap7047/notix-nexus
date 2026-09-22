"use client";

import { useState } from "react";

interface AICharacter {
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
}

const initialCharacters: AICharacter[] = [
  { name: "NEXUS", role: "COMMAND CENTER", description: "Central intelligence and system management", icon: "🧠", color: "neon-cyan", enabled: true },
  { name: "VEX", role: "SECURITY CORE", description: "Threat analysis and protection systems", icon: "🛡️", color: "neon-red", enabled: true },
  { name: "RUNE", role: "MOD ENFORCER", description: "Moderation policy enforcement", icon: "⚔️", color: "neon-orange", enabled: true },
  { name: "BYTE", role: "ECONOMY MANAGER", description: "Virtual economy and currency systems", icon: "💰", color: "neon-yellow", enabled: true },
  { name: "PIXEL", role: "ENTERTAINMENT", description: "Games, memes, and fun interactions", icon: "🎮", color: "neon-pink", enabled: true },
  { name: "NOVA", role: "ASSISTANT", description: "General knowledge and helpful responses", icon: "✨", color: "neon-purple", enabled: true },
  { name: "CIPHER", role: "DEVELOPER", description: "Code analysis and technical help", icon: "💻", color: "neon-green", enabled: false },
  { name: "ORACLE", role: "ANALYTICS", description: "Data analysis and insights", icon: "📊", color: "neon-blue", enabled: false },
];

export default function AIPage() {
  const [characters, setCharacters] = useState(initialCharacters);
  const [selectedChar, setSelectedChar] = useState<string>("NEXUS");
  const [aiChannel, setAiChannel] = useState("#ai-chat");
  const [temperature, setTemperature] = useState("0.7");
  const [maxTokens, setMaxTokens] = useState("512");
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful Discord bot assistant named NEXUS.");

  const toggleCharacter = (name: string) => {
    setCharacters((prev) =>
      prev.map((c) => (c.name === name ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const selected = characters.find((c) => c.name === selectedChar);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">AI NEURAL CENTER</h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">NEXUS // Multi-AI Character System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active AIs", value: String(characters.filter((c) => c.enabled).length) },
          { label: "Conversations", value: "14,293" },
          { label: "Messages Today", value: "2,847" },
          { label: "Avg Response", value: "1.2s" },
        ].map((s) => (
          <div key={s.label} className="nexus-card p-4">
            <p className="text-xs text-gray-500 font-mono">{s.label}</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Character Grid */}
      <div className="nexus-card p-5">
        <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">AI CHARACTERS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {characters.map((char) => (
            <div
              key={char.name}
              onClick={() => setSelectedChar(char.name)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedChar === char.name
                  ? `bg-${char.color}/10 border-${char.color}/30`
                  : "bg-nexus-bg border-nexus-border hover:border-nexus-border/80"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{char.icon}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleCharacter(char.name); }}
                  className={`toggle ${char.enabled ? "active" : ""}`}
                />
              </div>
              <h4 className="text-sm font-bold text-white font-mono">{char.name}</h4>
              <p className="text-[10px] text-neon-cyan font-mono mb-1">{char.role}</p>
              <p className="text-[10px] text-gray-500">{char.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Character Preview */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">
            CHARACTER PREVIEW — {selected?.name}
          </h3>
          <div className="p-4 bg-nexus-bg rounded-lg border border-nexus-border mb-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{selected?.icon}</span>
              <div>
                <p className="text-sm font-bold text-white font-mono">{selected?.name}</p>
                <p className="text-xs text-neon-cyan font-mono">{selected?.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">{selected?.description}</p>
          </div>
          <div className="terminal">
            <div className="flex gap-2 mb-3">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-mono">
                <span className="text-neon-cyan">user@nexus</span>:~$ chat {selected?.name?.toLowerCase()}
              </p>
              <p className="text-xs text-neon-green font-mono">
                [{selected?.name}] Hello! I&apos;m {selected?.name}, your {selected?.role?.toLowerCase()}. How can I help?
              </p>
              <p className="text-xs text-gray-500 font-mono">
                <span className="text-neon-cyan animate-terminal-blink">_</span>
              </p>
            </div>
          </div>
        </div>

        {/* AI Configuration */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">AI CONFIGURATION</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">AI CHANNEL</label>
              <select value={aiChannel} onChange={(e) => setAiChannel(e.target.value)} className="nexus-select text-xs">
                <option value="#ai-chat">#ai-chat</option>
                <option value="#general">#general</option>
                <option value="#bot-commands">#bot-commands</option>
                <option value="all">All Channels (Mention Only)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">TEMPERATURE</label>
                <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="nexus-input text-xs" />
                <p className="text-[10px] text-gray-600 mt-1">0.0 = precise, 1.0 = creative</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">MAX TOKENS</label>
                <input type="number" value={maxTokens} onChange={(e) => setMaxTokens(e.target.value)} className="nexus-input text-xs" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">SYSTEM PROMPT</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="nexus-textarea text-xs"
                rows={4}
              />
            </div>
            <button className="nexus-button w-full text-xs font-mono tracking-wider">SAVE CONFIG</button>
          </div>
        </div>
      </div>
    </div>
  );
}
