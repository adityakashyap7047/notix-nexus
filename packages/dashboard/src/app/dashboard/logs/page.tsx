"use client";
import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";

type EventType = "USER_JOIN" | "MESSAGE" | "MODERATION" | "SECURITY" | "TICKET" | "SYSTEM" | "LEVEL_UP" | "ECONOMY";

interface LogEntry {
  id: string;
  timestamp: string;
  type: EventType;
  user: string;
  details: string;
  severity: "info" | "warn" | "error" | "critical";
}

const eventColors: Record<EventType, string> = {
  USER_JOIN: "bg-neon-green/10 text-neon-green border-neon-green/20",
  MESSAGE: "bg-neon-blue/10 text-neon-blue border-neon-blue/20",
  MODERATION: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  SECURITY: "bg-neon-red/10 text-neon-red border-neon-red/20",
  TICKET: "bg-neon-purple/10 text-neon-purple border-neon-purple/20",
  SYSTEM: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
  LEVEL_UP: "bg-neon-green/10 text-neon-green border-neon-green/20",
  ECONOMY: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

const severityColors: Record<string, string> = {
  info: "text-gray-400",
  warn: "text-yellow-500",
  error: "text-neon-red",
  critical: "text-neon-red font-bold",
};

const initialLogs: LogEntry[] = [
  { id: "1", timestamp: "14:32:05.123", type: "USER_JOIN", user: "CyberNinja#7742", details: "Joined the server", severity: "info" },
  { id: "2", timestamp: "14:32:02.891", type: "MODERATION", user: "AdminBot", details: "Warned ToxicUser#1234 for SPAM in #general", severity: "warn" },
  { id: "3", timestamp: "14:31:58.445", type: "SECURITY", user: "SYSTEM", details: "Rate limit triggered by suspicious IP 192.168.x.x", severity: "critical" },
  { id: "4", timestamp: "14:31:55.112", type: "MESSAGE", user: "DevMaster#9901", details: "Deleted message containing phishing link in #dev", severity: "warn" },
  { id: "5", timestamp: "14:31:50.667", type: "TICKET", user: "SupportBot", details: "Ticket #4521 opened by PlayerOne#3333", severity: "info" },
  { id: "6", timestamp: "14:31:45.223", type: "SYSTEM", user: "NEXUS_CORE", details: "Database backup completed successfully", severity: "info" },
  { id: "7", timestamp: "14:31:40.556", type: "LEVEL_UP", user: "NightHawk#8876", details: "Reached Level 42 in XP system", severity: "info" },
  { id: "8", timestamp: "14:31:35.901", type: "ECONOMY", user: "CryptoKing#5567", details: "Withdrew 5000 coins from bank", severity: "info" },
];

const streamLogs: LogEntry[] = [
  { id: "s1", timestamp: "14:32:10.001", type: "SECURITY", user: "SYSTEM", details: "New login detected from unknown device", severity: "warn" },
  { id: "s2", timestamp: "14:32:12.334", type: "USER_JOIN", user: "NovaStar#4421", details: "Joined the server via invite link", severity: "info" },
  { id: "s3", timestamp: "14:32:14.892", type: "MODERATION", user: "AdminBot", details: "Banned ExploitBot#0001 for automated spam", severity: "error" },
  { id: "s4", timestamp: "14:32:17.123", type: "MESSAGE", user: "RandomUser#6789", details: "Contains profanity filter match in #chat", severity: "warn" },
  { id: "s5", timestamp: "14:32:19.445", type: "SYSTEM", user: "NEXUS_CORE", details: "Shard #3 reconnected after gateway timeout", severity: "info" },
  { id: "s6", timestamp: "14:32:22.001", type: "TICKET", user: "SupportBot", details: "Ticket #4522 escalated to high priority", severity: "warn" },
];

const eventTypes: EventType[] = ["USER_JOIN", "MESSAGE", "MODERATION", "SECURITY", "TICKET", "SYSTEM", "LEVEL_UP", "ECONOMY"];

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [activeFilter, setActiveFilter] = useState<EventType | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [isStreaming, setIsStreaming] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);
  const streamIndex = useRef(0);

  useEffect(() => {
    if (!autoScroll) return;
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, autoScroll]);

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      if (streamIndex.current < streamLogs.length) {
        setLogs((prev) => [streamLogs[streamIndex.current], ...prev].slice(0, 200));
        streamIndex.current++;
      } else {
        streamIndex.current = 0;
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  const filteredLogs = logs.filter((log) => {
    const matchesFilter = activeFilter === "ALL" || log.type === activeFilter;
    const matchesSearch = !search || log.user.toLowerCase().includes(search.toLowerCase()) || log.details.toLowerCase().includes(search.toLowerCase()) || log.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">EVENT LOGS</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">REAL-TIME EVENT STREAM // {filteredLogs.length} ENTRIES</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsStreaming(!isStreaming)} className={clsx("nexus-button text-xs", !isStreaming && "opacity-50")}>
            {isStreaming ? "STREAMING ●" : "PAUSED"}
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-nexus-surface border border-nexus-border rounded-lg">
            <div className={clsx("w-2 h-2 rounded-full", isStreaming ? "bg-neon-green animate-pulse" : "bg-gray-500")} />
            <span className="text-[10px] font-mono text-gray-500">{isStreaming ? "LIVE" : "OFFLINE"}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveFilter("ALL")} className={clsx("px-3 py-1.5 rounded-lg text-xs font-mono border transition-all", activeFilter === "ALL" ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan" : "border-nexus-border text-gray-500 hover:text-white hover:bg-nexus-surface")}>
          ALL
        </button>
        {eventTypes.map((type) => (
          <button key={type} onClick={() => setActiveFilter(type)} className={clsx("px-3 py-1.5 rounded-lg text-xs font-mono border transition-all", activeFilter === type ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan" : "border-nexus-border text-gray-500 hover:text-white hover:bg-nexus-surface")}>
            {type}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2 text-sm font-mono text-white focus:border-neon-cyan focus:outline-none"
          placeholder="SEARCH LOGS..."
        />
        <button onClick={() => setAutoScroll(!autoScroll)} className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono transition-all", autoScroll ? "border-neon-green/30 text-neon-green bg-neon-green/5" : "border-nexus-border text-gray-500")}>
          <div className={clsx("w-2 h-2 rounded-full", autoScroll ? "bg-neon-green" : "bg-gray-500")} />
          AUTO-SCROLL
        </button>
      </div>

      <div className="nexus-card overflow-hidden">
        <div className="px-4 py-3 border-b border-nexus-border flex items-center justify-between">
          <h3 className="text-sm font-mono text-neon-cyan tracking-wider">LOG STREAM</h3>
          <span className="text-[10px] font-mono text-gray-500">TERMINAL OUTPUT</span>
        </div>
        <div className="bg-nexus-bg p-1 overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto space-y-0.5 p-3 font-mono text-xs">
            {filteredLogs.length === 0 && (
              <div className="text-center py-12 text-gray-500">NO MATCHING LOG ENTRIES</div>
            )}
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 py-1.5 px-2 rounded hover:bg-nexus-surface/30 transition-colors border-l-2 border-transparent hover:border-neon-cyan/30">
                <span className="text-gray-600 whitespace-nowrap">{log.timestamp}</span>
                <span className={clsx("px-1.5 py-0.5 rounded text-[9px] border whitespace-nowrap", eventColors[log.type])}>
                  {log.type}
                </span>
                <span className={clsx("w-2 h-2 rounded-full mt-1 flex-shrink-0", severityColors[log.severity] === "text-gray-400" ? "bg-gray-500" : severityColors[log.severity].includes("red") ? "bg-neon-red" : "bg-yellow-500")} />
                <span className="text-gray-300 min-w-[120px]">{log.user}</span>
                <span className="text-gray-500 flex-1 truncate">{log.details}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {eventTypes.slice(0, 4).map((type) => {
          const count = logs.filter((l) => l.type === type).length;
          return (
            <div key={type} className="nexus-card p-3 text-center">
              <p className="text-[10px] font-mono text-gray-500">{type}</p>
              <p className="text-lg font-bold font-mono text-white mt-1">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
