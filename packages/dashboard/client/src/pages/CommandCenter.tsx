import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Server, Users, Clock, Shield, Activity, AlertTriangle,
  MessageSquare, Zap, Bot, Cpu, HardDrive, Wifi
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import StatsCard from '../components/StatsCard'
import Card from '../components/Card'
import StatusIndicator from '../components/StatusIndicator'

const activityData = [
  { time: '00:00', messages: 120, commands: 45 },
  { time: '04:00', messages: 80, commands: 20 },
  { time: '08:00', messages: 340, commands: 120 },
  { time: '12:00', messages: 520, commands: 180 },
  { time: '16:00', messages: 680, commands: 240 },
  { time: '20:00', messages: 890, commands: 310 },
  { time: '23:59', messages: 450, commands: 160 },
]

const recentEvents = [
  { id: 1, type: 'join', server: 'CyberHQ', user: 'N3ON_Rider', time: '2m ago', color: 'green' },
  { id: 2, type: 'mod', server: 'TechNest', action: 'Ban', user: 'SpamBot#0001', time: '5m ago', color: 'red' },
  { id: 3, type: 'ticket', server: 'DevZone', action: 'Opened', user: 'CodeMaster', time: '8m ago', color: 'cyan' },
  { id: 4, type: 'level', server: 'CyberHQ', user: 'Pixel_Art', level: 25, time: '12m ago', color: 'purple' },
  { id: 5, type: 'giveaway', server: 'Gaming Hub', action: 'Won', user: 'NightOwl', time: '15m ago', color: 'yellow' },
  { id: 6, type: 'raid', server: 'DarkNet', action: 'Blocked', user: '15 accounts', time: '18m ago', color: 'red' },
  { id: 7, type: 'join', server: 'Anime World', user: 'Sakura_X', time: '22m ago', color: 'green' },
  { id: 8, type: 'command', server: 'CyberHQ', user: 'RootUser', cmd: '/deploy', time: '25m ago', color: 'blue' },
]

const aiCharacters = [
  { name: 'NOVA', role: 'Strategic Advisor', status: 'active' as const, tasks: 247, accuracy: 98.7 },
  { name: 'VEX', role: 'Security Analyst', status: 'active' as const, tasks: 189, accuracy: 99.2 },
  { name: 'ARIA', role: 'Community Manager', status: 'idle' as const, tasks: 312, accuracy: 97.5 },
  { name: 'KAI', role: 'Data Processor', status: 'active' as const, tasks: 156, accuracy: 98.1 },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
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
      } else {
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-wider">
            {typedText}<span className="terminal-cursor" />
          </h1>
          <p className="text-nexus-muted mt-1 text-sm">System Status: <span className="text-nexus-green">ALL SYSTEMS NOMINAL</span></p>
        </div>
        <div className="flex items-center gap-3">
          <StatusIndicator status="online" size="lg" label="CORE" />
          <StatusIndicator status="online" size="lg" label="API" />
          <StatusIndicator status="online" size="lg" label="WS" />
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Server} label="Total Servers" value="1,247" trend={12} color="cyan" />
        <StatsCard icon={Users} label="Total Members" value="847,293" trend={8} color="purple" />
        <StatsCard icon={Clock} label="Uptime" value="99.97%" trend={0.2} color="green" />
        <StatsCard icon={Shield} label="Threat Level" value="LOW" color="green" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card glow="cyan">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white font-mono flex items-center gap-2">
                <Activity size={18} className="text-nexus-cyan" />
                ACTIVITY MONITOR
              </h2>
              <span className="text-xs font-mono text-nexus-muted">LAST 24H</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="gradMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradCommands" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B026FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#B026FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#6B7280" fontSize={11} fontFamily="JetBrains Mono" />
                  <YAxis stroke="#6B7280" fontSize={11} fontFamily="JetBrains Mono" />
                  <Tooltip
                    contentStyle={{
                      background: '#0F1424',
                      border: '1px solid #1A1F35',
                      borderRadius: '8px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="messages" stroke="#00F0FF" fill="url(#gradMessages)" strokeWidth={2} />
                  <Area type="monotone" dataKey="commands" stroke="#B026FF" fill="url(#gradCommands)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card glow="purple" className="h-full">
            <h2 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <Zap size={18} className="text-nexus-purple" />
              AI CHARACTERS
            </h2>
            <div className="space-y-3">
              {aiCharacters.map((char) => (
                <div key={char.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                      char.name === 'NOVA' ? 'bg-nexus-cyan/20 text-nexus-cyan' :
                      char.name === 'VEX' ? 'bg-nexus-red/20 text-nexus-red' :
                      char.name === 'ARIA' ? 'bg-nexus-purple/20 text-nexus-purple' :
                      'bg-nexus-green/20 text-nexus-green'
                    }`}>
                      {char.name[0]}
                    </div>
                    <div>
                      <div className="font-mono text-sm text-white font-semibold">{char.name}</div>
                      <div className="text-xs text-nexus-muted">{char.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusIndicator status={char.status === 'active' ? 'online' : 'idle'} size="sm" />
                    <div className="text-xs text-nexus-muted mt-1">{char.tasks} tasks</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <h2 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-nexus-yellow" />
              RECENT EVENTS
            </h2>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <div className={`w-2 h-2 rounded-full ${
                    event.color === 'green' ? 'bg-nexus-green' :
                    event.color === 'red' ? 'bg-nexus-red' :
                    event.color === 'cyan' ? 'bg-nexus-cyan' :
                    event.color === 'purple' ? 'bg-nexus-purple' :
                    event.color === 'yellow' ? 'bg-nexus-yellow' :
                    'bg-nexus-blue'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">
                      <span className="font-mono text-nexus-cyan">{event.user}</span>
                      {event.action && <span className="text-nexus-muted"> • {event.action}</span>}
                      {event.level && <span className="text-nexus-purple"> • Level {event.level}</span>}
                      {event.cmd && <span className="text-nexus-green"> • {event.cmd}</span>}
                    </div>
                    <div className="text-xs text-nexus-muted">{event.server}</div>
                  </div>
                  <span className="text-xs text-nexus-muted font-mono whitespace-nowrap">{event.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card glow="green">
            <h2 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <Cpu size={18} className="text-nexus-green" />
              SYSTEM STATUS
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Core Engine', status: 'online' as const, icon: Cpu },
                { name: 'API Gateway', status: 'online' as const, icon: Wifi },
                { name: 'WebSocket', status: 'online' as const, icon: Activity },
                { name: 'Database', status: 'online' as const, icon: HardDrive },
                { name: 'AI Engine', status: 'online' as const, icon: Bot },
                { name: 'Moderation', status: 'online' as const, icon: Shield },
                { name: 'Ticket System', status: 'online' as const, icon: MessageSquare },
                { name: 'Economy', status: 'online' as const, icon: Zap },
              ].map((sys) => (
                <div key={sys.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <StatusIndicator status={sys.status} size="sm" pulse={false} />
                  <div>
                    <div className="text-sm text-white font-mono">{sys.name}</div>
                    <div className="text-xs text-nexus-green uppercase">Operational</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
