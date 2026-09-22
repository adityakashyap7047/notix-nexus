import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Hash, Shield, Database } from 'lucide-react'

const botStats = [
  { icon: Zap, label: "Commands Loaded", value: "47", color: "text-nexus-cyan" },
  { icon: Hash, label: "Categories", value: "9", color: "text-nexus-purple" },
  { icon: Shield, label: "Security Modules", value: "6", color: "text-nexus-green" },
  { icon: Database, label: "MongoDB Collections", value: "10", color: "text-nexus-yellow" },
]

const categories = [
  { name: "Core", icon: "⚡", color: "text-nexus-cyan", commands: ["help", "ping", "stats", "uptime", "botinfo", "avatar", "serverinfo", "userinfo"] },
  { name: "Moderation", icon: "🔨", color: "text-nexus-red", commands: ["ban", "kick", "lock", "nick", "purge", "slowmode", "timeout", "unban", "unlock", "warn", "warnings"] },
  { name: "Security", icon: "🛡️", color: "text-nexus-green", commands: ["lockdown", "securitystatus", "threats", "unlockdown"] },
  { name: "Economy", icon: "💰", color: "text-nexus-yellow", commands: ["balance", "beg", "daily", "deposit", "slots", "withdraw", "work"] },
  { name: "Fun", icon: "🎮", color: "text-nexus-purple", commands: ["8ball", "coinflip", "joke", "rate", "rps"] },
  { name: "Social", icon: "👥", color: "text-nexus-pink", commands: ["goodbye", "profile", "rep", "ship", "welcome", "reactionrole"] },
  { name: "Info", icon: "🔍", color: "text-nexus-blue", commands: ["analytics", "announcement", "customcommand", "event", "kb", "voicestats"] },
  { name: "Utility", icon: "🔧", color: "text-nexus-orange", commands: ["announce", "calculator", "channelinfo", "poll", "remind", "roleinfo", "support"] },
  { name: "Advanced", icon: "🚀", color: "text-nexus-cyan", commands: ["reactionrole", "remind", "snipe", "tickets"] },
];

const features = [
  { name: "Dual-Mode Commands", desc: "Prefix (!) and slash (/) support", icon: "🔄" },
  { name: "MongoDB Storage", desc: "Persistent data with mongoose ODM", icon: "🗄️" },
  { name: "Scam Detection", desc: "5-category pattern matching", icon: "🛡️" },
  { name: "Duplicate Detection", desc: "Cross-user message deduplication", icon: "🔁" },
  { name: "Link Reputation", desc: "Domain risk scoring and blocking", icon: "🔗" },
  { name: "Account Age Gating", desc: "Auto-kick accounts under 7 days", icon: "📅" },
  { name: "Reaction Roles", desc: "Self-assignable roles via reactions", icon: "🎭" },
  { name: "Custom Commands", desc: "Server-specific command creation", icon: "⚙️" },
  { name: "Welcome/Goodbye", desc: "Join/leave messages with auto-role", icon: "👋" },
  { name: "Ticket System", desc: "Support ticket management", icon: "🎫" },
  { name: "Self-Keep-Alive", desc: "Auto-restart for free hosting", icon: "🔄" },
  { name: "Graceful Shutdown", desc: "Clean disconnect on SIGTERM", icon: "🛑" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function CommandCenter() {
  const [typedText, setTypedText] = useState('')
  const fullText = 'NEXUS COMMAND CENTER // ALL SYSTEMS OPERATIONAL'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else { clearInterval(interval) }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="flex flex-col items-center text-center pt-8">
        <h1 className="text-4xl font-bold text-white font-mono tracking-wider mb-3">{typedText}<span className="terminal-cursor" /></h1>
        <p className="text-nexus-muted text-lg font-mono mb-2">An Operating System for Discord Communities</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-nexus-green animate-pulse" />
          <span className="text-xs font-mono text-gray-400">ALL SYSTEMS ONLINE</span>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {botStats.map((stat) => (
          <div key={stat.label} className="nexus-card p-4 text-center">
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item} className="nexus-card p-6">
        <h2 className="text-xl font-bold text-nexus-cyan font-mono mb-4 flex items-center gap-2">
          <span className="text-2xl">📡</span> COMMAND CATEGORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="p-4 rounded-lg bg-nexus-border/30 border border-nexus-border">
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
      </motion.div>

      <motion.div variants={item} className="nexus-card p-6">
        <h2 className="text-xl font-bold text-nexus-purple font-mono mb-4 flex items-center gap-2">
          <span className="text-2xl">✨</span> FEATURES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div key={f.name} className="flex items-start gap-3 p-3 rounded-lg bg-nexus-bg border border-nexus-border hover:border-nexus-cyan/30 transition-all">
              <span className="text-xl">{f.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-white">{f.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="nexus-card p-6">
        <h2 className="text-xl font-bold text-nexus-green font-mono mb-4 flex items-center gap-2">
          <span className="text-2xl">🚀</span> QUICK START
        </h2>
        <div className="space-y-3">
          {[
            "1. Copy .env.example to .env and fill in tokens",
            "2. Run npm run dev to start the bot",
            "3. Dashboard at http://localhost:3000",
            "4. Use /help or !help for all commands",
          ].map((step, i) => (
            <div key={i} className="p-3 rounded-lg bg-nexus-bg font-mono text-sm text-gray-300 border border-nexus-border">
              <span className="text-nexus-cyan">{step.split('.')[0]}.</span> {step.split('. ')[1]}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}