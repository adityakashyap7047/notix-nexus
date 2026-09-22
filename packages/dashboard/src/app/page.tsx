"use client";

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
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono">NOTIXNEX Command Center</h1>
          <p className="text-gray-400 text-sm mt-1">An Operating System for Discord Communities</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-mono text-gray-400">ALL SYSTEMS ONLINE</span>
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
