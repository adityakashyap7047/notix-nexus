"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session, router]);

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col items-center text-center pt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-neon-cyan font-mono tracking-wider mb-3">
          NOTIXNEX
        </h1>
        <p className="text-lg text-gray-400 font-mono mb-2">An Operating System for Discord Communities</p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs font-mono text-gray-400">ALL SYSTEMS ONLINE</span>
          </div>
          {session ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-colors"
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={() => signIn("discord")}
              className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg text-sm font-bold transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Login with Discord
            </button>
          )}
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
