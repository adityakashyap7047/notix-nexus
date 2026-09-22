import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Send, Sparkles, Bot, MessageSquare, Zap, Activity } from 'lucide-react'
import Card from '../components/Card'
import StatusIndicator from '../components/StatusIndicator'

const characters = [
  {
    name: 'NOVA',
    role: 'Strategic Advisor',
    color: 'cyan',
    personality: 'Analytical, precise, and forward-thinking. NOVA excels at strategic planning and complex problem solving.',
    tasks: 247,
    accuracy: 98.7,
    status: 'active' as const,
  },
  {
    name: 'VEX',
    role: 'Security Analyst',
    color: 'red',
    personality: 'Vigilant, aggressive against threats. VEX specializes in detecting and neutralizing security risks.',
    tasks: 189,
    accuracy: 99.2,
    status: 'active' as const,
  },
  {
    name: 'ARIA',
    role: 'Community Manager',
    color: 'purple',
    personality: 'Warm, engaging, and empathetic. ARIA manages community interactions and fosters positive environments.',
    tasks: 312,
    accuracy: 97.5,
    status: 'idle' as const,
  },
  {
    name: 'KAI',
    role: 'Data Processor',
    color: 'green',
    personality: 'Efficient, methodical. KAI handles data analysis, statistics, and generates comprehensive reports.',
    tasks: 156,
    accuracy: 98.1,
    status: 'active' as const,
  },
]

const chatMessages = [
  { role: 'user', content: 'Analyze the security status of CyberHQ server.' },
  { role: 'ai', character: 'VEX', content: 'Analyzing CyberHQ security perimeter... Threat level: LOW. Active protections: 7/8. Last incident: 2h ago (spam attempt, auto-blocked). Raid detection: ARMED. Recommendation: Enable IP Logger Protection for enhanced security.' },
  { role: 'user', content: 'Generate a community engagement report.' },
  { role: 'ai', character: 'ARIA', content: 'Generating community report for the last 24h:\n• Messages: 12,450 (+15%)\n• New members: 234 (+8%)\n• Active channels: 18/24\n• Sentiment: 87% positive\n• Top topic: Bot feature requests\nEngagement score: 9.2/10 ⭐' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function AICore() {
  const [selectedChar, setSelectedChar] = useState('NOVA')
  const [input, setInput] = useState('')

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-3">
          <Brain size={24} className="text-nexus-purple" />
          NEXUS AI CORE
        </h1>
        <p className="text-nexus-muted mt-1 text-sm">Advanced AI character system — Select and interact with AI personalities</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <Card
            key={char.name}
            glow={selectedChar === char.name ? (char.color as any) : 'none'}
            onClick={() => setSelectedChar(char.name)}
            className={selectedChar === char.name ? 'ring-1 ring-nexus-cyan/50' : ''}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-2xl font-mono font-bold mb-3 ${
                char.color === 'cyan' ? 'bg-nexus-cyan/20 text-nexus-cyan' :
                char.color === 'red' ? 'bg-nexus-red/20 text-nexus-red' :
                char.color === 'purple' ? 'bg-nexus-purple/20 text-nexus-purple' :
                'bg-nexus-green/20 text-nexus-green'
              }`}>
                {char.name[0]}
              </div>
              <h3 className="font-mono font-bold text-white">{char.name}</h3>
              <p className="text-xs text-nexus-muted mt-1">{char.role}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <StatusIndicator status={char.status} size="sm" />
                <span className="text-xs text-nexus-muted font-mono">{char.tasks} tasks</span>
              </div>
              <div className="mt-2">
                <div className="text-xs text-nexus-muted">Accuracy</div>
                <div className="text-sm font-mono text-nexus-green">{char.accuracy}%</div>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card glow="purple" className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2">
                <MessageSquare size={18} className="text-nexus-purple" />
                AI INTERFACE — {selectedChar}
              </h3>
              <StatusIndicator status="online" size="sm" label="CONNECTED" />
            </div>

            <div className="flex-1 space-y-4 max-h-[400px] overflow-y-auto mb-4 p-4 rounded-lg bg-nexus-bg/50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-nexus-cyan/10 border border-nexus-cyan/20'
                      : 'bg-nexus-purple/10 border border-nexus-purple/20'
                  }`}>
                    {msg.character && (
                      <div className="text-xs font-mono text-nexus-purple mb-1">{msg.character}</div>
                    )}
                    <div className="text-sm text-white whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="cyber-input flex-1"
                placeholder={`Message ${selectedChar}...`}
              />
              <button className="cyber-btn px-6">
                <Send size={16} />
              </button>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card glow="cyan" className="h-full">
            <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-nexus-cyan" />
              CHARACTER INFO
            </h3>
            {characters.filter(c => c.name === selectedChar).map((char) => (
              <div key={char.name} className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  char.color === 'cyan' ? 'bg-nexus-cyan/10 border border-nexus-cyan/20' :
                  char.color === 'red' ? 'bg-nexus-red/10 border border-nexus-red/20' :
                  char.color === 'purple' ? 'bg-nexus-purple/10 border border-nexus-purple/20' :
                  'bg-nexus-green/10 border border-nexus-green/20'
                }`}>
                  <div className="font-mono font-bold text-white text-lg">{char.name}</div>
                  <div className="text-sm text-nexus-muted">{char.role}</div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-nexus-muted mb-2 uppercase">Personality</h4>
                  <p className="text-sm text-nexus-text">{char.personality}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white/5 text-center">
                    <div className="text-lg font-mono font-bold text-white">{char.tasks}</div>
                    <div className="text-xs text-nexus-muted">Tasks Done</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 text-center">
                    <div className="text-lg font-mono font-bold text-nexus-green">{char.accuracy}%</div>
                    <div className="text-xs text-nexus-muted">Accuracy</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-nexus-muted mb-2 uppercase">Capabilities</h4>
                  <div className="space-y-2">
                    {['Natural Language Processing', 'Context Awareness', 'Multi-Server Analysis', 'Real-time Monitoring'].map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-sm">
                        <Zap size={12} className="text-nexus-cyan" />
                        <span className="text-nexus-text">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
