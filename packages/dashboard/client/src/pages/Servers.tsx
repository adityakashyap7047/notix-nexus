import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Server, Users, MessageSquare, Shield, Settings, MoreVertical } from 'lucide-react'
import Card from '../components/Card'
import StatusIndicator from '../components/StatusIndicator'

const servers = [
  { id: '1', name: 'CyberHQ', icon: '🌐', members: 45230, messages: 1289340, status: 'online' as const, health: 98, modules: ['moderation', 'economy', 'leveling'] },
  { id: '2', name: 'TechNest', icon: '⚡', members: 32100, messages: 892100, status: 'online' as const, health: 95, modules: ['moderation', 'tickets', 'ai'] },
  { id: '3', name: 'DarkNet Arena', icon: '🛡️', members: 28750, messages: 756200, status: 'online' as const, health: 92, modules: ['security', 'moderation'] },
  { id: '4', name: 'Gaming Hub', icon: '🎮', members: 67800, messages: 2341000, status: 'online' as const, health: 97, modules: ['giveaways', 'leveling', 'economy'] },
  { id: '5', name: 'Anime World', icon: '🌸', members: 51200, messages: 1567000, status: 'online' as const, health: 99, modules: ['moderation', 'leveling', 'tickets'] },
  { id: '6', name: 'DevZone', icon: '💻', members: 18900, messages: 445600, status: 'warning' as const, health: 78, modules: ['moderation', 'ai'] },
  { id: '7', name: 'Music Lounge', icon: '🎵', members: 34500, messages: 892100, status: 'online' as const, health: 96, modules: ['moderation', 'leveling'] },
  { id: '8', name: 'Crypto Central', icon: '₿', members: 22100, messages: 567800, status: 'online' as const, health: 94, modules: ['moderation', 'economy'] },
  { id: '9', name: 'Art Gallery', icon: '🎨', members: 15600, messages: 334200, status: 'online' as const, health: 100, modules: ['moderation', 'giveaways'] },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Servers() {
  const navigate = useNavigate()

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">SERVERS</h1>
          <p className="text-nexus-muted mt-1 text-sm">Managing {servers.length} connected servers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-mono text-white">{servers.reduce((a, s) => a + s.members, 0).toLocaleString()}</div>
            <div className="text-xs text-nexus-muted">Total Members</div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => (
          <Card
            key={server.id}
            glow={server.health > 95 ? 'green' : server.health > 80 ? 'cyan' : 'red'}
            onClick={() => navigate(`/servers/${server.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexus-cyan/20 to-nexus-purple/20 flex items-center justify-center text-2xl">
                  {server.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{server.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusIndicator status={server.status} size="sm" pulse={false} />
                    <span className="text-xs text-nexus-muted font-mono">{server.health}% health</span>
                  </div>
                </div>
              </div>
              <button className="p-1.5 rounded-lg text-nexus-muted hover:text-white hover:bg-white/10 transition-all">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm text-nexus-muted">
                <Users size={14} />
                <span className="font-mono">{server.members.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-nexus-muted">
                <MessageSquare size={14} />
                <span className="font-mono">{server.messages.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {server.modules.map((mod) => (
                <span key={mod} className="px-2 py-0.5 text-xs font-mono rounded bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20">
                  {mod}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-nexus-muted">Health</span>
                <span className="font-mono text-white">{server.health}%</span>
              </div>
              <div className="h-1.5 bg-nexus-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    server.health > 95 ? 'bg-nexus-green' : server.health > 80 ? 'bg-nexus-yellow' : 'bg-nexus-red'
                  }`}
                  style={{ width: `${server.health}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
}
