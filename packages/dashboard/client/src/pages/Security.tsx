import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, AlertTriangle, Lock, Unlock, Radar, Eye, ShieldCheck,
  ShieldAlert, Zap, Activity, Clock, UserX
} from 'lucide-react'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'
import StatusIndicator from '../components/StatusIndicator'

const protections = [
  { name: 'Anti-Raid', status: true, level: 'MAX', blocked: 1247 },
  { name: 'Anti-Spam', status: true, level: 'HIGH', blocked: 8934 },
  { name: 'Anti-Nuke', status: true, level: 'MAX', blocked: 23 },
  { name: 'Anti-Link', status: true, level: 'MEDIUM', blocked: 4567 },
  { name: 'Anti-Alt', status: true, level: 'HIGH', blocked: 892 },
  { name: 'Anti-Discord Invite', status: true, level: 'MAX', blocked: 3421 },
  { name: 'IP Logger Protection', status: false, level: 'OFF', blocked: 0 },
  { name: 'Mass Mention Guard', status: true, level: 'HIGH', blocked: 1567 },
]

const securityEvents = [
  { id: 1, type: 'raid', severity: 'critical', message: 'Raid attempt detected — 15 accounts', server: 'CyberHQ', time: '2m ago', action: 'BLOCKED' },
  { id: 2, type: 'spam', severity: 'high', message: 'Mass spam in #general', server: 'TechNest', time: '8m ago', action: 'AUTO-MOD' },
  { id: 3, type: 'nuke', severity: 'critical', message: 'Channel deletion attempt', server: 'DarkNet Arena', time: '15m ago', action: 'PREVENTED' },
  { id: 4, type: 'alt', severity: 'medium', message: 'Suspicious alt account detected', server: 'Gaming Hub', time: '22m ago', action: 'FLAGGED' },
  { id: 5, type: 'link', severity: 'low', message: 'Phishing link blocked', server: 'Anime World', time: '35m ago', action: 'BLOCKED' },
  { id: 6, type: 'mention', severity: 'high', message: 'Mass mention in #chat', server: 'CyberHQ', time: '42m ago', action: 'AUTO-MOD' },
  { id: 7, type: 'raid', severity: 'critical', message: 'Coordinated join attack', server: 'Music Lounge', time: '1h ago', action: 'BLOCKED' },
]

const threatLevel = 23

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Security() {
  const [gaugeRotation, setGaugeRotation] = useState(0)

  useEffect(() => {
    setGaugeRotation((threatLevel / 100) * 270 - 135)
  }, [])

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-3">
          <Shield size={24} className="text-nexus-cyan" />
          NEXUS SECURITY CORE
        </h1>
        <p className="text-nexus-muted mt-1 text-sm">Advanced threat detection and protection system</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard icon={ShieldCheck} label="Threat Level" value={`${threatLevel}%`} color="green" />
        <StatsCard icon={Zap} label="Threats Blocked (24h)" value="14,291" trend={-12} color="cyan" />
        <StatsCard icon={Lock} label="Lockdowns Active" value="0" color="green" />
        <StatsCard icon={Eye} label="Monitored Servers" value="12" color="purple" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <Card glow="green" className="flex flex-col items-center justify-center py-8">
            <h3 className="text-lg font-semibold text-white font-mono mb-6">THREAT GAUGE</h3>
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="85" fill="none" stroke="#1A1F35" strokeWidth="12" />
                <circle
                  cx="100" cy="100" r="85"
                  fill="none"
                  stroke="url(#threatGradient)"
                  strokeWidth="12"
                  strokeDasharray={`${(threatLevel / 100) * 534} 534`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="threatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00FF88" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FF003C" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold font-mono text-nexus-green">{threatLevel}%</span>
                <span className="text-xs text-nexus-muted font-mono mt-1">SECURE</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6 text-xs font-mono">
              <span className="text-nexus-green">● LOW</span>
              <span className="text-nexus-yellow">● MED</span>
              <span className="text-nexus-orange">● HIGH</span>
              <span className="text-nexus-red">● CRIT</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <ShieldAlert size={18} className="text-nexus-cyan" />
              ACTIVE PROTECTIONS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {protections.map((p) => (
                <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <StatusIndicator status={p.status ? 'online' : 'offline'} size="sm" pulse={p.status} />
                    <div>
                      <div className="text-sm text-white font-mono">{p.name}</div>
                      <div className="text-xs text-nexus-muted">Level: {p.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-nexus-cyan">{p.blocked.toLocaleString()}</div>
                    <div className="text-xs text-nexus-muted">blocked</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2">
              <Radar size={18} className="text-nexus-purple" />
              SECURITY EVENTS TIMELINE
            </h3>
            <div className="flex gap-2">
              <button className="cyber-btn text-xs py-1 px-3">Lockdown All</button>
              <button className="cyber-btn text-xs py-1 px-3 border-nexus-red/30 text-nexus-red">Emergency Lock</button>
            </div>
          </div>
          <div className="space-y-2">
            {securityEvents.map((event) => (
              <div key={event.id} className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${
                event.severity === 'critical' ? 'bg-nexus-red/5 border-nexus-red' :
                event.severity === 'high' ? 'bg-nexus-orange/5 border-nexus-orange' :
                event.severity === 'medium' ? 'bg-nexus-yellow/5 border-nexus-yellow' :
                'bg-nexus-cyan/5 border-nexus-cyan'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  event.type === 'raid' ? 'bg-nexus-red/20' :
                  event.type === 'spam' ? 'bg-nexus-yellow/20' :
                  event.type === 'nuke' ? 'bg-nexus-red/20' :
                  'bg-nexus-cyan/20'
                }`}>
                  {event.type === 'raid' ? <Users size={16} className="text-nexus-red" /> :
                   event.type === 'spam' ? <MessageSquare size={16} className="text-nexus-yellow" /> :
                   event.type === 'nuke' ? <AlertTriangle size={16} className="text-nexus-red" /> :
                   <Eye size={16} className="text-nexus-cyan" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">{event.message}</div>
                  <div className="text-xs text-nexus-muted">{event.server}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-mono font-semibold ${
                  event.action === 'BLOCKED' || event.action === 'PREVENTED' ? 'bg-nexus-green/20 text-nexus-green' :
                  event.action === 'AUTO-MOD' ? 'bg-nexus-yellow/20 text-nexus-yellow' :
                  'bg-nexus-orange/20 text-nexus-orange'
                }`}>
                  {event.action}
                </span>
                <span className="text-xs text-nexus-muted font-mono">{event.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card glow="red">
          <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
            <Lock size={18} className="text-nexus-red" />
            LOCKDOWN CONTROLS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Chat Lock', 'Join Lock', 'Full Lockdown'].map((lock) => (
              <div key={lock} className="p-4 rounded-lg bg-white/5 text-center">
                <div className="text-sm text-white font-mono mb-3">{lock}</div>
                <button className="w-full py-2 rounded-lg bg-nexus-red/10 border border-nexus-red/30 text-nexus-red font-mono text-sm hover:bg-nexus-red/20 transition-all">
                  <Unlock size={14} className="inline mr-2" />
                  Activate
                </button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
