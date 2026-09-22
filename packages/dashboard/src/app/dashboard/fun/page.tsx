"use client";

import { useState } from "react";

interface FunCommand {
  name: string;
  description: string;
  category: string;
  usage: number;
  enabled: boolean;
  cooldown: number;
}

const initialCommands: FunCommand[] = [
  { name: "/8ball", description: "Ask the magic 8-ball a question", category: "Fun", usage: 4521, enabled: true, cooldown: 5 },
  { name: "/coinflip", description: "Flip a coin — heads or tails", category: "Fun", usage: 3847, enabled: true, cooldown: 3 },
  { name: "/rps", description: "Play rock, paper, scissors", category: "Fun", usage: 2913, enabled: true, cooldown: 5 },
  { name: "/slots", description: "Try your luck at slot machine", category: "Games", usage: 2456, enabled: true, cooldown: 30 },
  { name: "/roll", description: "Roll dice (supports NdN format)", category: "Fun", usage: 1923, enabled: true, cooldown: 3 },
  { name: "/meme", description: "Get a random meme from Reddit", category: "Social", usage: 3241, enabled: true, cooldown: 10 },
  { name: "/joke", description: "Hear a random joke", category: "Fun", usage: 1456, enabled: true, cooldown: 5 },
  { name: "/fact", description: "Get a random fun fact", category: "Fun", usage: 892, enabled: true, cooldown: 5 },
  { name: "/hug", description: "Hug a friend", category: "Social", usage: 2341, enabled: true, cooldown: 3 },
  { name: "/pat", description: "Pat someone on the head", category: "Social", usage: 1829, enabled: true, cooldown: 3 },
  { name: "/trivia", description: "Answer trivia questions", category: "Games", usage: 1234, enabled: true, cooldown: 15 },
  { name: "/rate", description: "Rate something out of 10", category: "Fun", usage: 987, enabled: false, cooldown: 5 },
];

export default function FunPage() {
  const [commands, setCommands] = useState(initialCommands);
  const [filter, setFilter] = useState("All");
  const [restrictedChannels, setRestrictedChannels] = useState<string[]>(["#serious", "#rules"]);

  const toggleCommand = (index: number) => {
    setCommands((prev) =>
      prev.map((c, i) => (i === index ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const updateCooldown = (index: number, value: number) => {
    setCommands((prev) =>
      prev.map((c, i) => (i === index ? { ...c, cooldown: value } : c))
    );
  };

  const categories = ["All", ...new Set(initialCommands.map((c) => c.category))];
  const filtered = filter === "All" ? commands : commands.filter((c) => c.category === filter);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-pink font-mono tracking-wider">FUN & SOCIAL</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">PIXEL // Entertainment Module</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500">ENABLED</span>
          <span className="text-sm font-mono text-neon-green font-bold">{commands.filter((c) => c.enabled).length}</span>
          <span className="text-[10px] font-mono text-gray-600">/</span>
          <span className="text-sm font-mono text-gray-500">{commands.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Commands", value: String(commands.length) },
          { label: "Total Uses", value: commands.reduce((a, c) => a + c.usage, 0).toLocaleString() },
          { label: "Active", value: String(commands.filter((c) => c.enabled).length) },
          { label: "Restricted Channels", value: String(restrictedChannels.length) },
        ].map((s) => (
          <div key={s.label} className="nexus-card p-4">
            <p className="text-xs text-gray-500 font-mono">{s.label}</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              filter === cat
                ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan"
                : "border-nexus-border text-gray-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((cmd, i) => {
          const realIndex = commands.findIndex((c) => c.name === cmd.name);
          return (
            <div
              key={cmd.name}
              className={`nexus-card p-4 transition-all ${cmd.enabled ? "" : "opacity-60"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-neon-cyan">{cmd.name}</span>
                  <span className="text-[10px] font-mono text-gray-500 px-1.5 py-0.5 rounded bg-nexus-bg border border-nexus-border">
                    {cmd.category}
                  </span>
                </div>
                <button onClick={() => toggleCommand(realIndex)} className={`toggle ${cmd.enabled ? "active" : ""}`} />
              </div>
              <p className="text-[11px] text-gray-400 mb-3">{cmd.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-mono">Cooldown:</span>
                  <input
                    type="number"
                    value={cmd.cooldown}
                    onChange={(e) => updateCooldown(realIndex, parseInt(e.target.value) || 0)}
                    className="nexus-input w-16 text-[10px] py-1 px-2"
                    min={0}
                  />
                  <span className="text-[10px] text-gray-600">sec</span>
                </div>
                <span className="text-xs font-mono text-gray-500">{cmd.usage.toLocaleString()} uses</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restricted Channels */}
      <div className="nexus-card p-5">
        <h3 className="text-sm font-mono text-neon-pink mb-4 tracking-wider">RESTRICTED CHANNELS</h3>
        <p className="text-[10px] text-gray-500 mb-3">Fun commands are disabled in these channels</p>
        <div className="flex flex-wrap gap-2">
          {restrictedChannels.map((ch) => (
            <div key={ch} className="flex items-center gap-2 px-3 py-1.5 bg-nexus-bg rounded-lg border border-nexus-border">
              <span className="text-xs font-mono text-white">{ch}</span>
              <button
                onClick={() => setRestrictedChannels((prev) => prev.filter((c) => c !== ch))}
                className="text-gray-500 hover:text-neon-red transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          <select
            className="nexus-select text-xs w-auto py-1.5 px-3"
            onChange={(e) => {
              if (e.target.value && !restrictedChannels.includes(e.target.value)) {
                setRestrictedChannels((prev) => [...prev, e.target.value]);
              }
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>Add channel...</option>
            <option value="#announcements">#announcements</option>
            <option value="#rules">#rules</option>
            <option value="#help">#help</option>
            <option value="#voice-text">#voice-text</option>
          </select>
        </div>
      </div>
    </div>
  );
}
