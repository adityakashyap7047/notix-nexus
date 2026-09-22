"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const features = [
  { name: "Security Core", icon: "🛡️", desc: "Anti-raid, scam detection, account checks", status: "active" },
  { name: "Moderation Suite", icon: "🔨", desc: "Warn, mute, kick, ban, purge", status: "active" },
  { name: "Economy System", icon: "💰", desc: "Work, daily, slots, deposit, withdraw", status: "active" },
  { name: "Leveling & XP", icon: "📊", desc: "XP gain, levels, leaderboards", status: "active" },
  { name: "Fun Commands", icon: "🎮", desc: "8ball, jokes, RPS, coinflip, rate", status: "active" },
  { name: "Social Features", icon: "👤", desc: "Profiles, rep, ship, marriage", status: "active" },
  { name: "Auto-Moderation", icon: "🤖", desc: "Spam, links, invites, scam, bad words", status: "active" },
  { name: "Reaction Roles", icon: "🎭", desc: "Self-assignable roles via reactions", status: "active" },
  { name: "Custom Commands", icon: "⚡", desc: "Create your own bot commands", status: "active" },
  { name: "Welcome/Goodbye", icon: "👋", desc: "Join/leave messages with auto-role", status: "active" },
  { name: "Tickets", icon: "🎫", desc: "Support ticket system", status: "active" },
  { name: "Reminders", icon: "⏰", desc: "Set and manage reminders", status: "active" },
];

export default function CommandCenter() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session, router]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono">NOTIXNEX Command Center</h1>
          <p className="text-gray-400 text-sm mt-1">An Operating System for Discord Communities</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs font-mono text-gray-400">ALL SYSTEMS ONLINE</span>
          </div>
          {session ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-colors"
            >
              Dashboard
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div key={feature.name} className="nexus-card p-4">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{feature.icon}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neon-green/10 text-neon-green border border-neon-green/20">
                {feature.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{feature.name}</h3>
            <p className="text-xs text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="nexus-card p-4">
          <h3 className="text-sm font-bold text-neon-cyan mb-3 font-mono">COMMAND STATS</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-nexus-bg">
              <div className="text-2xl font-bold text-neon-cyan">47</div>
              <div className="text-xs text-gray-400">Total Commands</div>
            </div>
            <div className="p-3 rounded-lg bg-nexus-bg">
              <div className="text-2xl font-bold text-neon-green">9</div>
              <div className="text-xs text-gray-400">Categories</div>
            </div>
            <div className="p-3 rounded-lg bg-nexus-bg">
              <div className="text-2xl font-bold text-neon-purple">MongoDB</div>
              <div className="text-xs text-gray-400">Database</div>
            </div>
            <div className="p-3 rounded-lg bg-nexus-bg">
              <div className="text-2xl font-bold text-neon-yellow">v2.0</div>
              <div className="text-xs text-gray-400">Version</div>
            </div>
          </div>
        </div>

        <div className="nexus-card p-4">
          <h3 className="text-sm font-bold text-neon-purple mb-3 font-mono">SECURITY MODULES</h3>
          <div className="space-y-3">
            {["Anti-Raid", "Anti-Scam", "Anti-Spam", "Anti-Link", "Anti-Invite", "Account Checks"].map((module) => (
              <div key={module} className="flex items-center justify-between p-2 rounded bg-nexus-bg">
                <span className="text-sm text-gray-300">{module}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neon-green/10 text-neon-green border border-neon-green/20">
                  ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
