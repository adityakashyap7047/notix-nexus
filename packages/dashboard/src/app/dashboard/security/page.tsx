"use client";

import { useState } from "react";

const initialShields = [
  { name: "Anti-Raid", description: "Detect and block mass-join raids", enabled: true, threats: 12 },
  { name: "Anti-Spam", description: "Filter repeated messages and flooding", enabled: true, threats: 47 },
  { name: "Anti-Link", description: "Block suspicious and phishing links", enabled: true, threats: 23 },
  { name: "Anti-Invite", description: "Remove Discord invite links", enabled: true, threats: 31 },
  { name: "Anti-Scam", description: "5-category pattern matching detection", enabled: true, threats: 8 },
  { name: "Account Age Gate", description: "Auto-kick accounts under age threshold", enabled: true, threats: 5 },
];

const stats = [
  { label: "Threat Level", value: "NOMINAL", color: "text-neon-green" },
  { label: "Threats (24h)", value: "126", color: "text-neon-yellow" },
  { label: "Lockdown", value: "INACTIVE", color: "text-neon-green" },
  { label: "Protected Channels", value: "47", color: "text-neon-cyan" },
];

const threats = [
  { type: "JOIN_BURST", severity: "HIGH", details: "8 joins in 30s from similar IPs", time: "45m ago", action: "Auto-locked invites for 5m" },
  { type: "SCAM_LINK", severity: "CRITICAL", details: "Phishing link detected: disc0rd-nitro.com", time: "2h ago", action: "Message deleted, user warned" },
  { type: "SPAM", severity: "MEDIUM", details: "Repeated messages in #general (12 in 10s)", time: "3h ago", action: "User timed out 10m" },
  { type: "INVITE_LINK", severity: "LOW", details: "Discord invite posted in #chat", time: "5h ago", action: "Message deleted" },
];

function getSeverityClass(severity: string) {
  if (severity === "CRITICAL") return "bg-neon-red/20 text-neon-red border-neon-red/30";
  if (severity === "HIGH") return "bg-neon-orange/20 text-neon-orange border-neon-orange/30";
  if (severity === "MEDIUM") return "bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30";
  return "bg-gray-500/20 text-gray-400 border-gray-500/30";
}

export default function SecurityPage() {
  const [shields, setShields] = useState(initialShields);
  const [lockdown, setLockdown] = useState(false);
  const [joinBurstLimit, setJoinBurstLimit] = useState("8");
  const [joinBurstWindow, setJoinBurstWindow] = useState("30");
  const [messageRateLimit, setMessageRateLimit] = useState("10");
  const [accountAgeThreshold, setAccountAgeThreshold] = useState("7");
  const [showLockdownConfirm, setShowLockdownConfirm] = useState(false);

  const toggleShield = (index: number) => {
    setShields((prev) =>
      prev.map((s, i) => (i === index ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-red font-mono tracking-wider">NEXUS SECURITY CORE</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">VEX // Security Intelligence</p>
        </div>
        <button
          onClick={() => setShowLockdownConfirm(true)}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
            lockdown
              ? "bg-neon-red/20 border-neon-red text-neon-red animate-pulse"
              : "border-neon-red/30 text-neon-red hover:bg-neon-red/10"
          }`}
        >
          {lockdown ? "🔒 LOCKDOWN ACTIVE" : "🔓 ACTIVATE LOCKDOWN"}
        </button>
      </div>

      {/* Lockdown confirmation modal */}
      {showLockdownConfirm && (
        <div className="nexus-overlay" onClick={() => setShowLockdownConfirm(false)}>
          <div className="nexus-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-neon-red font-mono mb-3">
              {lockdown ? "DISABLE LOCKDOWN?" : "⚠️ ACTIVATE LOCKDOWN?"}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {lockdown
                ? "This will re-enable all server invites and unlock channels."
                : "This will lock all channels and disable server invites. Only admins can send messages."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setLockdown(!lockdown);
                  setShowLockdownConfirm(false);
                }}
                className={lockdown ? "nexus-button flex-1" : "nexus-button-danger flex-1"}
              >
                {lockdown ? "DISABLE" : "CONFIRM LOCKDOWN"}
              </button>
              <button
                onClick={() => setShowLockdownConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-nexus-border text-gray-400 text-sm font-mono hover:bg-nexus-surface transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Threat status banner */}
      <div className="terminal scan-line">
        <div className="pt-8 pb-4 text-center">
          <div className={`text-4xl font-mono font-bold ${lockdown ? "text-neon-red" : "text-neon-green"}`}>
            {lockdown ? "LOCKDOWN ACTIVE" : "OPERATIONAL"}
          </div>
          <p className="text-sm text-gray-500 font-mono mt-2">
            THREAT LEVEL: {lockdown ? "ELEVATED" : "NOMINAL"} • {shields.filter((s) => s.enabled).length}/{shields.length} SHIELDS ACTIVE
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="nexus-card p-4">
            <p className="text-xs text-gray-500 font-mono">{s.label}</p>
            <p className={"text-xl font-bold font-mono mt-1 " + s.color}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shield Modules */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-red mb-4 tracking-wider">SHIELD MODULES</h3>
          <div className="space-y-2">
            {shields.map((m, i) => (
              <div key={m.name} className="flex items-center justify-between p-3 bg-nexus-bg rounded-lg border border-nexus-border">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${m.enabled ? "bg-neon-green" : "bg-gray-600"}`} />
                  <div className="min-w-0">
                    <span className="text-sm font-mono text-white block truncate">{m.name}</span>
                    <span className="text-[10px] text-gray-500 block truncate">{m.description}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-mono text-neon-cyan">{m.threats} blocked</span>
                  <button onClick={() => toggleShield(i)} className={`toggle ${m.enabled ? "active" : ""}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-red mb-4 tracking-wider">THRESHOLDS</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">JOIN BURST LIMIT (joins)</label>
              <input type="number" value={joinBurstLimit} onChange={(e) => setJoinBurstLimit(e.target.value)} className="nexus-input" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">BURST WINDOW (seconds)</label>
              <input type="number" value={joinBurstWindow} onChange={(e) => setJoinBurstWindow(e.target.value)} className="nexus-input" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">MESSAGE RATE LIMIT (per 10s)</label>
              <input type="number" value={messageRateLimit} onChange={(e) => setMessageRateLimit(e.target.value)} className="nexus-input" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">MIN ACCOUNT AGE (days)</label>
              <input type="number" value={accountAgeThreshold} onChange={(e) => setAccountAgeThreshold(e.target.value)} className="nexus-input" />
            </div>
            <button className="nexus-button w-full text-xs font-mono tracking-wider">SAVE THRESHOLDS</button>
          </div>
        </div>
      </div>

      {/* Recent Threats */}
      <div className="nexus-card p-5">
        <h3 className="text-sm font-mono text-neon-red mb-4 tracking-wider">RECENT THREATS</h3>
        <div className="space-y-2">
          {threats.map((t, i) => (
            <div key={i} className="p-3 bg-nexus-bg rounded-lg border border-nexus-border">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getSeverityClass(t.severity)}`}>
                  {t.severity}
                </span>
                <span className="text-xs font-mono text-white">{t.type}</span>
                <span className="text-[10px] text-gray-500 ml-auto">{t.time}</span>
              </div>
              <p className="text-xs text-gray-400">{t.details}</p>
              <p className="text-[10px] text-neon-cyan mt-1 font-mono">Action: {t.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
