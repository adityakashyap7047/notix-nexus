import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Ticket, Clock, CheckCircle, AlertCircle, MessageSquare,
  User, Server, Timer, BarChart3
} from 'lucide-react'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'
import StatusIndicator from '../components/StatusIndicator'

const openTickets = [
  { id: 'T-1247', user: 'CyberUser#1234', server: 'CyberHQ', subject: 'Bot not responding to commands', priority: 'high', time: '15m ago', messages: 4 },
  { id: 'T-1246', user: 'N00bMaster#5678', server: 'TechNest', subject: 'Economy balance incorrect', priority: 'medium', time: '32m ago', messages: 7 },
  { id: 'T-1245', user: 'ProGamer#9012', server: 'Gaming Hub', subject: 'Level role not assigned', priority: 'low', time: '1h ago', messages: 2 },
  { id: 'T-1244', user: 'ArtFan#3456', server: 'Anime World', subject: 'Giveaway entry not counted', priority: 'medium', time: '2h ago', messages: 5 },
]

const pendingTickets = [
  { id: 'T-1240', user: 'DevUser#7890', server: 'DevZone', subject: 'API rate limit issue', priority: 'high', time: '5h ago', waiting: '3h' },
  { id: 'T-1238', user: 'MusicLover#1111', server: 'Music Lounge', subject: 'Song request feature', priority: 'low', time: '8h ago', waiting: '6h' },
]

const closedTickets = [
  { id: 'T-1235', user: 'ModHelper#2222', server: 'CyberHQ', subject: 'False positive ban', resolvedBy: 'ModKnight', time: '1d ago', satisfaction: 5 },
  { id: 'T-1230', user: 'NewUser#3333', server: 'TechNest', subject: 'Setup assistance', resolvedBy: 'NOVA-AI', time: '2d ago', satisfaction: 4 },
  { id: 'T-1225', user: 'CryptoFan#4444', server: 'Crypto Central', subject: 'Economy reset request', resolvedBy: 'CyberAdmin', time: '3d ago', satisfaction: 5 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Tickets() {
  const [activeTab, setActiveTab] = useState('open')

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-3">
          <Ticket size={24} className="text-nexus-cyan" />
          TICKET SYSTEM
        </h1>
        <p className="text-nexus-muted mt-1 text-sm">Manage support tickets across all servers</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard icon={Ticket} label="Open Tickets" value={openTickets.length} color="cyan" />
        <StatsCard icon={Clock} label="Pending" value={pendingTickets.length} color="yellow" />
        <StatsCard icon={CheckCircle} label="Closed (24h)" value="23" color="green" />
        <StatsCard icon={Timer} label="Avg Response" value="8m" color="purple" />
      </motion.div>

      <motion.div variants={item} className="flex gap-2">
        {['open', 'pending', 'closed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all capitalize ${
              activeTab === tab
                ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/30'
                : 'text-nexus-muted hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab} ({tab === 'open' ? openTickets.length : tab === 'pending' ? pendingTickets.length : closedTickets.length})
          </button>
        ))}
      </motion.div>

      {activeTab === 'open' && (
        <motion.div variants={item} className="space-y-3">
          {openTickets.map((ticket) => (
            <Card key={ticket.id} glow="cyan">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-nexus-cyan/10 flex items-center justify-center flex-shrink-0">
                  <Ticket size={20} className="text-nexus-cyan" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-nexus-cyan">{ticket.id}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                      ticket.priority === 'high' ? 'bg-nexus-red/20 text-nexus-red' :
                      ticket.priority === 'medium' ? 'bg-nexus-yellow/20 text-nexus-yellow' :
                      'bg-nexus-green/20 text-nexus-green'
                    }`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-nexus-muted">{ticket.server}</span>
                  </div>
                  <h4 className="text-white font-medium mt-1">{ticket.subject}</h4>
                  <div className="flex items-center gap-4 mt-2 text-xs text-nexus-muted">
                    <span className="flex items-center gap-1"><User size={12} />{ticket.user}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={12} />{ticket.messages} messages</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{ticket.time}</span>
                  </div>
                </div>
                <button className="cyber-btn text-xs py-2 px-4">Reply</button>
              </div>
            </Card>
          ))}
        </motion.div>
      )}

      {activeTab === 'pending' && (
        <motion.div variants={item} className="space-y-3">
          {pendingTickets.map((ticket) => (
            <Card key={ticket.id} glow="yellow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-nexus-yellow/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-nexus-yellow" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-nexus-yellow">{ticket.id}</span>
                    <span className="text-xs text-nexus-muted">{ticket.server}</span>
                    <span className="text-xs text-nexus-red">Waiting {ticket.waiting}</span>
                  </div>
                  <h4 className="text-white font-medium mt-1">{ticket.subject}</h4>
                  <div className="flex items-center gap-4 mt-2 text-xs text-nexus-muted">
                    <span className="flex items-center gap-1"><User size={12} />{ticket.user}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{ticket.time}</span>
                  </div>
                </div>
                <button className="cyber-btn text-xs py-2 px-4">Claim</button>
              </div>
            </Card>
          ))}
        </motion.div>
      )}

      {activeTab === 'closed' && (
        <motion.div variants={item} className="space-y-3">
          {closedTickets.map((ticket) => (
            <Card key={ticket.id}>
              <div className="flex items-center gap-4">
                <CheckCircle size={20} className="text-nexus-green flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-nexus-green">{ticket.id}</span>
                    <span className="text-xs text-nexus-muted">{ticket.server}</span>
                  </div>
                  <h4 className="text-white font-medium mt-1">{ticket.subject}</h4>
                  <div className="text-xs text-nexus-muted mt-1">Resolved by {ticket.resolvedBy}</div>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-sm ${star <= ticket.satisfaction ? 'text-nexus-yellow' : 'text-nexus-muted'}`}>★</span>
                    ))}
                  </div>
                  <div className="text-xs text-nexus-muted mt-1">{ticket.time}</div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
