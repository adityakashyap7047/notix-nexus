"use client";

const botStats = [
  { label: "Commands Loaded", value: "47", color: "text-neon-cyan" },
  { label: "Security Modules", value: "6", color: "text-neon-green" },
  { label: "MongoDB Collections", value: "10", color: "text-neon-purple" },
  { label: "Uptime", value: "99.9%", color: "text-neon-yellow" },
];

const features = [
  { name: "Dual-Mode Commands", desc: "Both prefix (!) and slash (/) commands" },
  { name: "MongoDB Storage", desc: "Persistent data with mongoose ODM" },
  { name: "Scam Detection", desc: "5-category pattern matching with confidence scoring" },
  { name: "Duplicate Detection", desc: "Cross-user message deduplication" },
  { name: "Link Reputation", desc: "Domain risk scoring and blocking" },
  { name: "Account Age Gating", desc: "Auto-kick new accounts under 7 days" },
  { name: "Reaction Roles", desc: "Self-assignable roles via emoji reactions" },
  { name: "Custom Commands", desc: "Server-specific command creation" },
  { name: "Welcome/Goodbye", desc: "Join/leave messages with auto-role" },
  { name: "Self-Keep-Alive", desc: "Auto-restart for free hosting" },
  { name: "Graceful Shutdown", desc: "Clean disconnect on SIGTERM/SIGINT" },
  { name: "Memory Monitoring", desc: "Auto-GC when heap exceeds 800MB" },
];

export default function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono">NOTIXNEX Overview</h1>
          <p className="text-gray-400 text-sm mt-1">System status and feature overview</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {botStats.map((stat) => (
          <div key={stat.label} className="nexus-card p-4 text-center">
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="nexus-card p-4">
        <h3 className="text-sm font-bold text-neon-cyan mb-4 font-mono">FEATURES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div key={f.name} className="p-3 rounded-lg bg-nexus-bg border border-nexus-border">
              <h4 className="text-sm font-bold text-white">{f.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="nexus-card p-4">
        <h3 className="text-sm font-bold text-neon-purple mb-3 font-mono">QUICK SETUP</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 rounded bg-nexus-bg font-mono text-gray-300">
            1. Copy <code className="text-neon-cyan">.env.example</code> to <code className="text-neon-cyan">.env</code> and fill in tokens
          </div>
          <div className="p-2 rounded bg-nexus-bg font-mono text-gray-300">
            2. Run <code className="text-neon-cyan">npm run deploy</code> to register slash commands
          </div>
          <div className="p-2 rounded bg-nexus-bg font-mono text-gray-300">
            3. Run <code className="text-neon-cyan">npm run dev</code> to start the bot
          </div>
          <div className="p-2 rounded bg-nexus-bg font-mono text-gray-300">
            4. Dashboard at <code className="text-neon-cyan">http://localhost:3000</code>
          </div>
        </div>
      </div>
    </div>
  );
}
