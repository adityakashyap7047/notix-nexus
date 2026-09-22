"use client";

import { useState } from "react";

const stats = [
  { label: "Warnings", value: "247" },
  { label: "Timeouts", value: "89" },
  { label: "Kicks", value: "34" },
  { label: "Bans", value: "12" },
];

const initialAutomod = [
  { name: "Anti-Spam", enabled: true, action: "Delete + Warn", description: "Detect repeated messages" },
  { name: "Anti-Flood", enabled: true, action: "Timeout", description: "Rate limit messages per channel" },
  { name: "Anti-Link", enabled: true, action: "Delete", description: "Remove unauthorized links" },
  { name: "Anti-Invite", enabled: true, action: "Delete + Warn", description: "Block Discord invite links" },
  { name: "Bad Word Filter", enabled: true, action: "Delete + Warn", description: "Filter profanity and slurs" },
  { name: "All Caps Filter", enabled: false, action: "Delete", description: "Remove excessive caps messages" },
  { name: "Emoji Spam", enabled: false, action: "Delete", description: "Limit excessive emoji usage" },
];

const cases = [
  { id: "CASE-4821", user: "SpamBot#0001", type: "BAN", reason: "Automated spam", time: "2h ago" },
  { id: "CASE-4820", user: "ToxicUser#1234", type: "TIMEOUT", reason: "Toxic behavior in #general", time: "4h ago" },
  { id: "CASE-4819", user: "RuleBreaker#5678", type: "WARN", reason: "NSFW content in general channel", time: "6h ago" },
  { id: "CASE-4818", user: "Spammer#9999", type: "KICK", reason: "Mass DM spam", time: "8h ago" },
  { id: "CASE-4817", user: "RaidBot#0002", type: "BAN", reason: "Raid participant", time: "12h ago" },
];

function getTypeDot(type: string) {
  if (type === "BAN") return "bg-neon-red";
  if (type === "TIMEOUT") return "bg-neon-yellow";
  if (type === "KICK") return "bg-neon-orange";
  return "bg-neon-cyan";
}

function getTypeClass(type: string) {
  if (type === "BAN") return "bg-neon-red/20 text-neon-red border-neon-red/30";
  if (type === "TIMEOUT") return "bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30";
  if (type === "KICK") return "bg-neon-orange/20 text-neon-orange border-neon-orange/30";
  return "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30";
}

export default function ModerationPage() {
  const [automod, setAutomod] = useState(initialAutomod);
  const [badWords, setBadWords] = useState("damn, crap, stupid, idiot");
  const [warnThreshold, setWarnThreshold] = useState("3");
  const [warnAction, setWarnAction] = useState("timeout");
  const [searchFilter, setSearchFilter] = useState("");
  const [caseTypeFilter, setCaseTypeFilter] = useState("ALL");

  const toggleAutomod = (index: number) => {
    setAutomod((prev) =>
      prev.map((r, i) => (i === index ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const changeAction = (index: number, action: string) => {
    setAutomod((prev) =>
      prev.map((r, i) => (i === index ? { ...r, action } : r))
    );
  };

  const filteredCases = cases.filter((c) => {
    const matchesType = caseTypeFilter === "ALL" || c.type === caseTypeFilter;
    const matchesSearch = !searchFilter || c.user.toLowerCase().includes(searchFilter.toLowerCase()) || c.reason.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neon-orange font-mono tracking-wider">MODERATION CENTER</h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">RUNE // Moderation Enforcer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="nexus-card p-4">
            <p className="text-xs text-gray-500 font-mono">{s.label}</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AutoMod Rules */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-orange mb-4 tracking-wider">AUTOMOD RULES</h3>
          <div className="space-y-2">
            {automod.map((r, i) => (
              <div key={r.name} className="p-3 bg-nexus-bg rounded-lg border border-nexus-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleAutomod(i)} className={`toggle ${r.enabled ? "active" : ""}`} />
                    <div>
                      <span className="text-sm text-white block">{r.name}</span>
                      <span className="text-[10px] text-gray-500">{r.description}</span>
                    </div>
                  </div>
                </div>
                {r.enabled && (
                  <div className="mt-2 pt-2 border-t border-nexus-border">
                    <label className="text-[10px] text-gray-500 font-mono block mb-1">ACTION</label>
                    <select
                      value={r.action}
                      onChange={(e) => changeAction(i, e.target.value)}
                      className="nexus-select text-xs"
                    >
                      <option value="Delete">Delete</option>
                      <option value="Delete + Warn">Delete + Warn</option>
                      <option value="Timeout">Timeout</option>
                      <option value="Kick">Kick</option>
                      <option value="Ban">Ban</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="space-y-6">
          <div className="nexus-card p-5">
            <h3 className="text-sm font-mono text-neon-orange mb-4 tracking-wider">BAD WORD FILTER</h3>
            <textarea
              value={badWords}
              onChange={(e) => setBadWords(e.target.value)}
              className="nexus-textarea text-xs"
              placeholder="Enter words separated by commas..."
            />
            <p className="text-[10px] text-gray-500 font-mono mt-2">Comma-separated list • {badWords.split(",").length} words</p>
          </div>

          <div className="nexus-card p-5">
            <h3 className="text-sm font-mono text-neon-orange mb-4 tracking-wider">WARNING THRESHOLDS</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">WARNINGS BEFORE ACTION</label>
                <input type="number" value={warnThreshold} onChange={(e) => setWarnThreshold(e.target.value)} className="nexus-input" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">ACTION ON THRESHOLD</label>
                <select value={warnAction} onChange={(e) => setWarnAction(e.target.value)} className="nexus-select">
                  <option value="timeout">Timeout (1h)</option>
                  <option value="kick">Kick</option>
                  <option value="ban">Ban</option>
                </select>
              </div>
              <button className="nexus-button w-full text-xs font-mono tracking-wider">SAVE SETTINGS</button>
            </div>
          </div>
        </div>
      </div>

      {/* Case Log */}
      <div className="nexus-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-mono text-neon-orange tracking-wider">CASE LOG</h3>
          <span className="text-[10px] font-mono text-gray-500">{filteredCases.length} CASES</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {["ALL", "BAN", "KICK", "TIMEOUT", "WARN"].map((type) => (
            <button
              key={type}
              onClick={() => setCaseTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                caseTypeFilter === type
                  ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan"
                  : "border-nexus-border text-gray-500 hover:text-white hover:bg-nexus-surface"
              }`}
            >
              {type}
            </button>
          ))}
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="nexus-input text-xs flex-1 min-w-[200px]"
            placeholder="Search cases..."
          />
        </div>
        <div className="space-y-2">
          {filteredCases.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-3 bg-nexus-bg rounded-lg border border-nexus-border">
              <div className={"w-2 h-2 rounded-full flex-shrink-0 " + getTypeDot(c.type)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white">{c.id}</span>
                  <span className={"text-[10px] font-mono px-1.5 py-0.5 rounded border " + getTypeClass(c.type)}>
                    {c.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{c.user} — {c.reason}</p>
              </div>
              <span className="text-[10px] text-gray-500 font-mono flex-shrink-0">{c.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
