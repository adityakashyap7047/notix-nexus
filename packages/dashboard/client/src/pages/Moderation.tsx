import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Gavel, Ban, Clock, AlertTriangle, Search, Filter,
  UserX, Shield, MessageSquare, Eye
} from 'lucide-react'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'
import StatusIndicator from '../components/StatusIndicator'

const warnings = [
  { id: 1, user: 'SpamBot#1234', reason: 'Automated spam messages', moderator: 'ModKnight', date: '2h ago', server: 'CyberHQ' },
  { id: 2, user: 'ToxicUser#5678', reason: 'Harassment of members', moderator: 'CyberAdmin', date: '5h ago', server: 'TechNest' },
  { id: 3, user: 'RuleBreaker#9012', reason: 'NSFW content in general', moderator: 'PixelQueen', date: '1d ago', server: 'Gaming Hub' },
  { id: 4, user: 'MiniMod#3456', reason: 'Impersonating staff', moderator: 'ModKnight', date: '2d ago', server: 'CyberHQ' },
]

const bans = [
  { id: 1, user: 'RaidBot#0001', reason: 'Coordinated raid attack', moderator: 'VEX-AI', date: '1h ago', server: 'CyberHQ' },
  { id: 2, user: 'Spammer#7777', reason: 'Mass DM spam', moderator: 'ModKnight', date: '3h ago', server: 'TechNest' },
  { id: 3, user: 'AltiAccount#1111', reason: 'Ban evasion', moderator: 'CyberAdmin', date: '1d ago', server: 'DarkNet Arena' },
  { id: 4, user: 'NFSender#9999', reason: 'NSFW content distribution', moderator: 'VEX-AI', date: '3d ago', server: 'Gaming Hub' },
  { id: 5, user: 'BotFarm#2222', reason: 'Automated account farming', moderator: 'ModKnight', date: '5d ago', server: 'Anime World' },
]

const timeouts = [
  { id: 1, user: 'FloodUser#4321', reason: 'Channel flooding', duration: '1h', expires: '45m left', moderator: 'ModKnight' },
  { id: 2, user: 'ArgueBot#8765', reason: 'Excessive arguing', duration: '30m', expires: '12m left', moderator: 'PixelQueen' },
  { id: 3, user: 'CapsAbuse#2345', reason: 'Excessive caps usage', duration: '15m', expires: '8m left', moderator: 'CyberAdmin' },
]

const modLog = [
  { action: 'Ban', user: 'RaidBot#0001', moderator: 'VEX-AI', server: 'CyberHQ', time: '1h ago', auto: true },
  { action: 'Warn', user: 'SpamBot#1234', moderator: 'ModKnight', server: 'CyberHQ', time: '2h ago', auto: false },
  { action: 'Timeout', user: 'FloodUser#4321', moderator: 'ModKnight', server: 'TechNest', time: '3h ago', auto: false },
  { action: 'Ban', user: 'Spammer#7777', moderator: 'ModKnight', server: 'TechNest', time: '3h ago', auto: false },
  { action: 'Kick', user: 'RuleBreaker#9012', moderator: 'PixelQueen', server: 'Gaming Hub', time: '5h ago', auto: false },
  { action: 'Unban', user: 'Reformed#1111', moderator: 'CyberAdmin', server: 'CyberHQ', time: '8h ago', auto: false },
  { action: 'Warn', user: 'MiniMod#3456', moderator: 'ModKnight', server: 'CyberHQ', time: '2d ago', auto: false },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Moderation() {
  const [activeTab, setActiveTab] = useState('warnings')

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white font-mono tracking-wider">MODERATION CENTER</h1>
        <p className="text-nexus-muted mt-1 text-sm">Manage server moderation across all connected servers</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard icon={AlertTriangle} label="Warnings" value={warnings.length} color="yellow" />
        <StatsCard icon={Ban} label="Active Bans" value={bans.length} color="red" />
        <StatsCard icon={Clock} label="Timeouts" value={timeouts.length} color="orange" />
        <StatsCard icon={Shield} label="Mod Actions (24h)" value="47" color="cyan" />
      </motion.div>

      <motion.div variants={item} className="flex gap-2">
        {['warnings', 'bans', 'timeouts', 'log'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all capitalize ${
              activeTab === tab
                ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/30'
                : 'text-nexus-muted hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {activeTab === 'warnings' && (
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2">
                <AlertTriangle size={18} className="text-nexus-yellow" />
                WARNINGS
              </h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexus-muted" />
                <input className="cyber-input pl-9 py-2 text-sm w-64" placeholder="Search warnings..." />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nexus-border">
                    <th className="text-left py-3 px-4 text-xs font-mono text-nexus-muted uppercase">User</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-nexus-muted uppercase">Reason</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-nexus-muted uppercase">Moderator</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-nexus-muted uppercase">Server</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-nexus-muted uppercase">Time</th>
                    <th className="text-right py-3 px-4 text-xs font-mono text-nexus-muted uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {warnings.map((w) => (
                    <tr key={w.id} className="border-b border-nexus-border/50 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm text-white">{w.user}</td>
                      <td className="py-3 px-4 text-sm text-nexus-muted">{w.reason}</td>
                      <td className="py-3 px-4 font-mono text-sm text-nexus-cyan">{w.moderator}</td>
                      <td className="py-3 px-4 text-sm text-nexus-muted">{w.server}</td>
                      <td className="py-3 px-4 text-xs text-nexus-muted font-mono">{w.date}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-nexus-red hover:text-nexus-red/80 text-xs font-mono">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'bans' && (
        <motion.div variants={item}>
          <Card>
            <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <Ban size={18} className="text-nexus-red" />
              BAN LIST
            </h3>
            <div className="space-y-2">
              {bans.map((b) => (
                <div key={b.id} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <UserX size={18} className="text-nexus-red flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-mono text-sm text-white">{b.user}</div>
                    <div className="text-xs text-nexus-muted">{b.reason}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-nexus-muted font-mono">{b.moderator}</div>
                    <div className="text-xs text-nexus-muted">{b.server}</div>
                  </div>
                  <div className="text-xs text-nexus-muted font-mono">{b.date}</div>
                  <button className="cyber-btn text-xs py-1 px-3">Unban</button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'timeouts' && (
        <motion.div variants={item}>
          <Card>
            <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <Clock size={18} className="text-nexus-orange" />
              ACTIVE TIMEOUTS
            </h3>
            <div className="space-y-2">
              {timeouts.map((t) => (
                <div key={t.id} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                  <Clock size={18} className="text-nexus-orange flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-mono text-sm text-white">{t.user}</div>
                    <div className="text-xs text-nexus-muted">{t.reason}</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-sm font-mono text-nexus-yellow">{t.duration}</div>
                    <div className="text-xs text-nexus-muted">{t.expires}</div>
                  </div>
                  <button className="cyber-btn text-xs py-1 px-3">Remove</button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'log' && (
        <motion.div variants={item}>
          <Card>
            <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <Eye size={18} className="text-nexus-cyan" />
              MODERATION LOG
            </h3>
            <div className="space-y-2">
              {modLog.map((log, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                  <span className={`px-2 py-1 rounded text-xs font-mono font-semibold ${
                    log.action === 'Ban' ? 'bg-nexus-red/20 text-nexus-red' :
                    log.action === 'Warn' ? 'bg-nexus-yellow/20 text-nexus-yellow' :
                    log.action === 'Timeout' ? 'bg-nexus-orange/20 text-nexus-orange' :
                    log.action === 'Kick' ? 'bg-nexus-purple/20 text-nexus-purple' :
                    'bg-nexus-green/20 text-nexus-green'
                  }`}>
                    {log.action}
                  </span>
                  <span className="font-mono text-sm text-white">{log.user}</span>
                  <span className="text-sm text-nexus-muted">by</span>
                  <span className="font-mono text-sm text-nexus-cyan">{log.moderator}</span>
                  <span className="text-sm text-nexus-muted">in</span>
                  <span className="text-sm text-nexus-muted">{log.server}</span>
                  {log.auto && (
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-nexus-purple/20 text-nexus-purple">AUTO</span>
                  )}
                  <span className="ml-auto text-xs text-nexus-muted font-mono">{log.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
