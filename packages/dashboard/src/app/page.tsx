"use client";

const botStats = [
  { label: "Commands Loaded", value: "47", color: "text-neon-cyan" },
  { label: "Categories", value: "9", color: "text-neon-purple" },
  { label: "Security Modules", value: "6", color: "text-neon-green" },
  { label: "MongoDB Collections", value: "10", color: "text-neon-yellow" },
];

const categories = [
  {
    name: "Core",
    icon: "⚡",
    color: "text-neon-cyan",
    borderColor: "border-neon-cyan/20",
    bgColor: "bg-neon-cyan/5",
    commands: ["help", "ping", "stats", "uptime", "botinfo", "avatar", "serverinfo", "userinfo"],
  },
  {
    name: "Moderation",
    icon: "🔨",
    color: "text-neon-red",
    borderColor: "border-neon-red/20",
    bgColor: "bg-neon-red/5",
    commands: ["ban", "kick", "lock", "nick", "purge", "slowmode", "timeout", "unban", "unlock", "warn", "warnings"],
  },
  {
    name: "Security",
    icon: "🛡️",
    color: "text-neon-green",
    borderColor: "border-neon-green/20",
    bgColor: "bg-neon-green/5",
    commands: ["lockdown", "securitystatus", "threats", "unlockdown"],
  },
  {
    name: "Economy",
    icon: "💰",
    color: "text-neon-yellow",
    borderColor: "border-neon-yellow/20",
    bgColor: "bg-neon-yellow/5",
    commands: ["balance", "beg", "daily", "deposit", "slots", "withdraw", "work"],
  },
  {
    name: "Fun",
    icon: "🎮",
    color: "text-neon-purple",
    borderColor: "border-neon-purple/20",
    bgColor: "bg-neon-purple/5",
    commands: ["8ball", "coinflip", "joke", "rate", "rps"],
  },
  {
    name: "Social",
    icon: "👥",
    color: "text-neon-pink",
    borderColor: "border-neon-pink/20",
    bgColor: "bg-neon-pink/5",
    commands: ["goodbye", "profile", "rep", "ship", "welcome", "reactionrole"],
  },
  {
    name: "Info",
    icon: "🔍",
    color: "text-neon-blue",
    borderColor: "border-neon-blue/20",
    bgColor: "bg-neon-blue/5",
    commands: ["analytics", "announcement", "customcommand", "event", "kb", "voicestats"],
  },
  {
    name: "Utility",
    icon: "🔧",
    color: "text-neon-orange",
    borderColor: "border-neon-orange/20",
    bgColor: "bg-neon-orange/5",
    commands: ["announce", "calculator", "channelinfo", "poll", "remind", "roleinfo", "support"],
  },
  {
    name: "Advanced",
    icon: "🚀",
    color: "text-neon-cyan",
    borderColor: "border-neon-cyan/20",
    bgColor: "bg-neon-cyan/5",
    commands: ["reactionrole", "remind", "snipe", "tickets"],
  },
];

const features = [
  { name: "Dual-Mode Commands", desc: "Prefix (!) and slash (/) support", icon: "🔄" },
  { name: "MongoDB Storage", desc: "Persistent data with mongoose ODM", icon: "🗄️" },
  { name: "Scam Detection", desc: "5-category pattern matching with confidence scoring", icon: "🛡️" },
  { name: "Duplicate Detection", desc: "Cross-user message deduplication", icon: "🔁" },
  { name: "Link Reputation", desc: "Domain risk scoring and blocking", icon: "🔗" },
  { name: "Account Age Gating", desc: "Auto-kick new accounts under 7 days", icon: "📅" },
  { name: "Reaction Roles", desc: "Self-assignable roles via emoji reactions", icon: "🎭" },
  { name: "Custom Commands", desc: "Server-specific command creation", icon: "⚙️" },
  { name: "Welcome/Goodbye", desc: "Join/leave messages with auto-role", icon: "👋" },
  { name: "Ticket System", desc: "Support ticket creation and management", icon: "🎫" },
  { name: "Self-Keep-Alive", desc: "Auto-restart for free hosting", icon: "🔄" },
  { name: "Graceful Shutdown", desc: "Clean disconnect on SIGTERM/SIGINT", icon: "🛑" },
];

export default function Home() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col items-center text-center pt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-neon-cyan font-mono tracking-wider mb-3">
          NOTIXNEX
        </h1>
        <p className="text-lg text-gray-400 font-mono mb-2">An Operating System for Discord Communities</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-mono text-gray-400">ALL SYSTEMS ONLINE</span>
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

      <div className="nexus-card p-6">
        <h2 className="text-xl font-bold text-neon-cyan font-mono mb-4 flex items-center gap-2">
          <span className="text-2xl">📡</span> COMMAND CATEGORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className={`p-4 rounded-lg border ${cat.borderColor} ${cat.bgColor}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className={`text-lg font-bold font-mono ${cat.color}`}>{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.commands.map((cmd) => (
                  <code key={cmd} className="px-2 py-0.5 rounded text-xs font-mono bg-nexus-bg text-gray-300 border border-nexus-border">
                    !{cmd}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="nexus-card p-6">
        <h2 className="text-xl font-bold text-neon-purple font-mono mb-4 flex items-center gap-2">
          <span className="text-2xl">✨</span> FEATURES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div key={f.name} className="flex items-start gap-3 p-3 rounded-lg bg-nexus-bg border border-nexus-border hover:border-neon-cyan/30 transition-all">
              <span className="text-xl">{f.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-white">{f.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="nexus-card p-6">
        <h2 className="text-xl font-bold text-neon-green font-mono mb-4 flex items-center gap-2">
          <span className="text-2xl">🚀</span> QUICK START
        </h2>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-nexus-bg font-mono text-sm text-gray-300 border border-nexus-border">
            <span className="text-neon-cyan">1.</span> Copy <code className="text-neon-cyan">.env.example</code> to <code className="text-neon-cyan">.env</code> and fill in tokens
          </div>
          <div className="p-3 rounded-lg bg-nexus-bg font-mono text-sm text-gray-300 border border-nexus-border">
            <span className="text-neon-cyan">2.</span> Run <code className="text-neon-cyan">npm run dev</code> to start the bot
          </div>
          <div className="p-3 rounded-lg bg-nexus-bg font-mono text-sm text-gray-300 border border-nexus-border">
            <span className="text-neon-cyan">3.</span> Dashboard at <code className="text-neon-cyan">http://localhost:3000</code>
          </div>
          <div className="p-3 rounded-lg bg-nexus-bg font-mono text-sm text-gray-300 border border-nexus-border">
            <span className="text-neon-cyan">4.</span> Use <code className="text-neon-cyan">/help</code> or <code className="text-neon-cyan">!help</code> for all commands
          </div>
        </div>
      </div>
    </div>
  );
}
