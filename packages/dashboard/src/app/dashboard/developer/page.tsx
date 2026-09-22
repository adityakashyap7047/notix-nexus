"use client";
import { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";

interface TerminalLine {
  type: "input" | "output" | "error" | "success" | "system";
  text: string;
}

interface Endpoint {
  method: string;
  path: string;
  description: string;
  auth: boolean;
}

const mockEndpoints: Endpoint[] = [
  { method: "GET", path: "/api/v1/guilds/:id", description: "Get guild info and settings", auth: true },
  { method: "POST", path: "/api/v1/guilds/:id/config", description: "Update guild configuration", auth: true },
  { method: "GET", path: "/api/v1/guilds/:id/members", description: "List guild members", auth: true },
  { method: "GET", path: "/api/v1/guilds/:id/logs", description: "Get event logs", auth: true },
  { method: "POST", path: "/api/v1/webhooks", description: "Create a new webhook", auth: true },
  { method: "DELETE", path: "/api/v1/webhooks/:id", description: "Delete a webhook", auth: true },
  { method: "GET", path: "/api/v1/bot/status", description: "Get bot status", auth: false },
  { method: "GET", path: "/api/v1/health", description: "Health check endpoint", auth: false },
];

const methodColors: Record<string, string> = {
  GET: "text-neon-green border-neon-green/30 bg-neon-green/10",
  POST: "text-neon-blue border-neon-blue/30 bg-neon-blue/10",
  PUT: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  DELETE: "text-neon-red border-neon-red/30 bg-neon-red/10",
};

const commandHandlers: Record<string, string[]> = {
  "help": [
    "Available commands:",
    "  help          - Show this help message",
    "  server.status - Show server information",
    "  bot.status    - Show bot status and health",
    "  db.status     - Database connection status",
    "  shard.status  - Shard monitoring status",
    "  clear         - Clear terminal output",
    "  version       - Show bot version",
    "  uptime        - Show bot uptime",
  ],
  "server.status": [
    "Server: NOTIX NEXUS Network",
    "Guilds: 1,247",
    "Users: 847,392",
    "Channels: 45,891",
    "Roles: 23,456",
    "Status: ALL SYSTEMS NOMINAL",
  ],
  "bot.status": [
    "NOTIX NEXUS v4.2.0",
    "Node.js: v20.11.0",
    "Discord.js: v14.14.1",
    "Memory: 284MB / 512MB",
    "CPU: 12.3%",
    "Status: ONLINE",
    "Uptime: 72d 14h 23m",
  ],
  "db.status": [
    "Database: PostgreSQL 16.1",
    "Connection: POOLED (max: 20)",
    "Active Connections: 8",
    "Queries/sec: 1,247",
    "Avg Response: 12ms",
    "Status: HEALTHY",
  ],
  "shard.status": [
    "Shard #001: ONLINE  - 31ms",
    "Shard #002: ONLINE  - 44ms",
    "Shard #003: ONLINE  - 28ms",
    "Shard #004: ONLINE  - 35ms",
    "Shard #005: ONLINE  - 52ms",
    "Shard #006: ONLINE  - 39ms",
    "Shard #007: ONLINE  - 22ms",
    "Shard #008: ONLINE  - 41ms",
    "All shards operational.",
  ],
  "version": ["NOTIX NEXUS v4.2.0 (build 20260921)"],
  "uptime": ["72d 14h 23m 47s", "Since: 2026-07-10 00:08:54 UTC"],
};

const requestLog = [
  { time: "14:32:05", method: "GET", path: "/api/v1/bot/status", status: 200, latency: "12ms" },
  { time: "14:31:58", method: "POST", path: "/api/v1/webhooks", status: 201, latency: "45ms" },
  { time: "14:31:52", method: "GET", path: "/api/v1/guilds/123456/members", status: 200, latency: "89ms" },
  { time: "14:31:45", method: "DELETE", path: "/api/v1/webhooks/wh_003", status: 200, latency: "23ms" },
  { time: "14:31:38", method: "GET", path: "/api/v1/guilds/123456/logs", status: 200, latency: "156ms" },
  { time: "14:31:30", method: "POST", path: "/api/v1/guilds/123456/config", status: 200, latency: "34ms" },
  { time: "14:31:22", method: "GET", path: "/api/v1/health", status: 200, latency: "3ms" },
  { time: "14:31:15", method: "GET", path: "/api/v1/bot/status", status: 200, latency: "11ms" },
];

export default function DeveloperPage() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { type: "system", text: "NEXUS DEVELOPER TERMINAL v4.2.0" },
    { type: "system", text: "Type 'help' for available commands." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"terminal" | "docs" | "webhooks" | "logs">("terminal");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [terminalLines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [...terminalLines, { type: "input", text: `nexus@dev:~$ ${cmd}` }];

    if (trimmed === "clear") {
      setTerminalLines([{ type: "system", text: "Terminal cleared." }]);
      return;
    }

    if (commandHandlers[trimmed]) {
      commandHandlers[trimmed].forEach((line) => {
        newLines.push({ type: line.includes("ONLINE") || line.includes("HEALTHY") || line.includes("operational") ? "success" : "output", text: line });
      });
    } else if (trimmed) {
      newLines.push({ type: "error", text: `Command not found: ${trimmed}. Type 'help' for available commands.` });
    }

    newLines.push({ type: "output", text: "" });
    setTerminalLines(newLines);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">DEVELOPER TERMINAL</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">NEXUS CORE INTERFACE // API & SYSTEM ACCESS</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-nexus-surface border border-nexus-border rounded-lg">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-[10px] font-mono text-gray-500">CONNECTED</span>
        </div>
      </div>

      <div className="flex gap-2">
        {(["terminal", "docs", "webhooks", "logs"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={clsx("px-4 py-2 rounded-lg text-xs font-mono border transition-all", activeTab === tab ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan" : "border-nexus-border text-gray-500 hover:text-white hover:bg-nexus-surface")}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "terminal" && (
        <div className="nexus-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-nexus-card border-b border-nexus-border">
            <span className="w-3 h-3 rounded-full bg-neon-red/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-neon-green/80" />
            <span className="ml-2 text-xs font-mono text-gray-500">nexus-developer — bash</span>
          </div>
          <div ref={terminalRef} className="h-96 overflow-y-auto bg-nexus-bg p-4 font-mono text-sm">
            {terminalLines.map((line, i) => (
              <div key={i} className={clsx("whitespace-pre-wrap", line.type === "input" ? "text-neon-cyan" : line.type === "error" ? "text-neon-red" : line.type === "success" ? "text-neon-green" : line.type === "system" ? "text-gray-500" : "text-gray-300")}>
                {line.text}
              </div>
            ))}
            <div className="flex items-center mt-1">
              <span className="text-neon-cyan">nexus@dev:~$ </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white font-mono text-sm caret-neon-cyan"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "docs" && (
        <div className="nexus-card p-6">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">API ENDPOINTS</h3>
          <div className="space-y-2">
            {mockEndpoints.map((ep, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-nexus-bg border border-nexus-border hover:border-neon-cyan/20 transition-colors">
                <span className={clsx("px-2 py-1 rounded text-[10px] font-mono font-bold border", methodColors[ep.method])}>
                  {ep.method}
                </span>
                <code className="text-xs font-mono text-white flex-1">{ep.path}</code>
                <span className="text-xs text-gray-500 hidden md:block">{ep.description}</span>
                {ep.auth && <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-mono">AUTH</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "webhooks" && (
        <div className="nexus-card p-6">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">WEBHOOK ENDPOINTS</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-nexus-bg border border-nexus-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-[10px] font-mono font-bold border text-neon-purple border-neon-purple/30 bg-neon-purple/10">POST</span>
                <code className="text-xs font-mono text-white">/api/v1/webhooks</code>
              </div>
              <p className="text-xs text-gray-500 font-mono">Create a new webhook endpoint. Requires API key authentication.</p>
            </div>
            <div className="p-4 rounded-lg bg-nexus-bg border border-nexus-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-[10px] font-mono font-bold border text-neon-red border-neon-red/30 bg-neon-red/10">DELETE</span>
                <code className="text-xs font-mono text-white">/api/v1/webhooks/:id</code>
              </div>
              <p className="text-xs text-gray-500 font-mono">Remove a webhook by ID. Requires admin permissions.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="nexus-card overflow-hidden">
          <div className="px-4 py-3 border-b border-nexus-border">
            <h3 className="text-sm font-mono text-neon-cyan tracking-wider">REQUEST LOG</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nexus-border">
                  <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">TIME</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">METHOD</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">PATH</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">STATUS</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">LATENCY</th>
                </tr>
              </thead>
              <tbody>
                {requestLog.map((log, i) => (
                  <tr key={i} className="border-b border-nexus-border/50 hover:bg-nexus-surface/50 transition-colors font-mono text-xs">
                    <td className="px-4 py-2 text-gray-500">{log.time}</td>
                    <td className="px-4 py-2"><span className={clsx("px-1.5 py-0.5 rounded border text-[9px] font-bold", methodColors[log.method])}>{log.method}</span></td>
                    <td className="px-4 py-2 text-white">{log.path}</td>
                    <td className="px-4 py-2"><span className={log.status < 300 ? "text-neon-green" : "text-neon-red"}>{log.status}</span></td>
                    <td className="px-4 py-2 text-gray-500">{log.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
