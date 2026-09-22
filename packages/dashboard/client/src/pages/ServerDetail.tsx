import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Users, MessageSquare, Hash, Volume2, Settings,
  Shield, Coins, Layers, BarChart3, ToggleLeft, ToggleRight
} from 'lucide-react'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'
import StatusIndicator from '../components/StatusIndicator'

const serverData = {
  '1': { name: 'CyberHQ', icon: '🌐', members: 45230, online: 12450, channels: 87, roles: 42 },
  '2': { name: 'TechNest', icon: '⚡', members: 32100, online: 8900, channels: 56, roles: 28 },
  '3': { name: 'DarkNet Arena', icon: '🛡️', members: 28750, online: 7200, channels: 43, roles: 35 },
}

const tabs = ['Overview', 'Moderation', 'Security', 'Economy', 'Leveling', 'Settings']

const members = [
  { name: 'CyberAdmin', role: 'Owner', status: 'online' as const, messages: 12450 },
  { name: 'ModKnight', role: 'Moderator', status: 'online' as const, messages: 8920 },
  { name: 'PixelQueen', role: 'Admin', status: 'idle' as const, messages: 6780 },
  { name: 'NeonRider', role: 'Member', status: 'online' as const, messages: 4560 },
  { name: 'DataStream', role: 'Moderator', status: 'offline' as const, messages: 3210 },
]

const channels = [
  { name: 'general', type: 'text', messages: 45230, active: true },
  { name: 'announcements', type: 'text', messages: 1240, active: true },
  { name: 'bot-commands', type: 'text', messages: 89200, active: true },
  { name: 'music', type: 'voice', messages: 0, active: true },
  { name: 'gaming', type: 'text', messages: 23400, active: false },
  { name: 'memes', type: 'text', messages: 12800, active: true },
]

const modules = [
  { name: 'Moderation', enabled: true, icon: Shield },
  { name: 'Economy', enabled: true, icon: Coins },
  { name: 'Leveling', enabled: true, icon: Layers },
  { name: 'Tickets', enabled: false, icon: MessageSquare },
  { name: 'Giveaways', enabled: true, icon: BarChart3 },
  { name: 'AI Assistant', enabled: false, icon: Settings },
]

export default function ServerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')

  const server = serverData[id as keyof typeof serverData] || serverData['1']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/servers')}
          className="p-2 rounded-lg glass border border-nexus-border text-nexus-muted hover:text-nexus-cyan hover:border-nexus-cyan/30 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexus-cyan/20 to-nexus-purple/20 flex items-center justify-center text-2xl">
            {server.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-mono tracking-wider">{server.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusIndicator status="online" size="sm" pulse={false} />
              <span className="text-sm text-nexus-muted">Connected • {server.members.toLocaleString()} members</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/30'
                : 'text-nexus-muted hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatsCard icon={Users} label="Members" value={server.members.toLocaleString()} color="cyan" />
            <StatsCard icon={Users} label="Online" value={server.online.toLocaleString()} color="green" />
            <StatsCard icon={Hash} label="Channels" value={server.channels} color="purple" />
            <StatsCard icon={Layers} label="Roles" value={server.roles} color="blue" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-white font-mono mb-4">TOP MEMBERS</h3>
              <div className="space-y-3">
                {members.map((m, i) => (
                  <div key={m.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-xs font-mono text-nexus-muted w-5">#{i + 1}</span>
                    <StatusIndicator status={m.status} size="sm" pulse={false} />
                    <div className="flex-1">
                      <div className="text-sm text-white font-mono">{m.name}</div>
                      <div className="text-xs text-nexus-muted">{m.role}</div>
                    </div>
                    <span className="text-xs font-mono text-nexus-cyan">{m.messages.toLocaleString()} msgs</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-white font-mono mb-4">CHANNELS</h3>
              <div className="space-y-2">
                {channels.map((ch) => (
                  <div key={ch.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    {ch.type === 'text' ? <Hash size={14} className="text-nexus-muted" /> : <Volume2 size={14} className="text-nexus-muted" />}
                    <span className="text-sm text-white font-mono flex-1">{ch.name}</span>
                    <span className="text-xs text-nexus-muted font-mono">{ch.messages.toLocaleString()}</span>
                    <StatusIndicator status={ch.active ? 'online' : 'offline'} size="sm" pulse={false} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === 'Settings' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <h3 className="text-lg font-semibold text-white font-mono mb-4">MODULE CONFIGURATION</h3>
            <div className="space-y-3">
              {modules.map((mod) => (
                <div key={mod.name} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <mod.icon size={18} className="text-nexus-cyan" />
                    <span className="text-sm text-white font-mono">{mod.name}</span>
                  </div>
                  <button className={`cyber-toggle ${mod.enabled ? 'active' : ''}`}>
                    <span className="sr-only">Toggle {mod.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {(activeTab === 'Moderation' || activeTab === 'Security' || activeTab === 'Economy' || activeTab === 'Leveling') && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🚧</div>
              <h3 className="text-lg font-semibold text-white font-mono mb-2">{activeTab.toUpperCase()} MODULE</h3>
              <p className="text-nexus-muted text-sm">Detailed {activeTab.toLowerCase()} controls for this server.</p>
              <button className="cyber-btn mt-4">
                Configure {activeTab}
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
