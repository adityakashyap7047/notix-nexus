import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootSequence = [
  '> INITIALIZING NEXUS_CORE v3.7.1...',
  '> LOADING QUANTUM ENGINES............',
  '> ESTABLISHING SECURE CONNECTION......',
  '> ACTIVATING AI SUBSYSTEMS...........',
  '> CALIBRATING THREAT DETECTION.......',
  '> SYNCHRONIZING DISCORD GATEWAYS.....',
  '> MOUNTING SECURITY PROTOCOLS........',
  '> NEXUS CORE ONLINE ✓',
]

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [currentLine, setCurrentLine] = useState('')

  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0
    let currentText = ''

    const typeInterval = setInterval(() => {
      if (lineIndex >= bootSequence.length) {
        clearInterval(typeInterval)
        setTimeout(onComplete, 500)
        return
      }

      const line = bootSequence[lineIndex]

      if (charIndex < line.length) {
        currentText += line[charIndex]
        setCurrentLine(currentText)
        charIndex++
        setProgress(((lineIndex * line.length + charIndex) / (bootSequence.length * 30)) * 100)
      } else {
        setLines(prev => [...prev, line])
        setCurrentLine('')
        charIndex = 0
        lineIndex++
        setProgress((lineIndex / bootSequence.length) * 100)
      }
    }, 20)

    return () => clearInterval(typeInterval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-nexus-bg grid-bg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-nexus-cyan/5 via-transparent to-nexus-purple/5" />

      <div className="relative w-full max-w-2xl mx-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass rounded-lg p-8 glow-border overflow-hidden"
        >
          <div className="scan-line" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-nexus-red animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-nexus-yellow animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 rounded-full bg-nexus-green animate-pulse" style={{ animationDelay: '0.4s' }} />
            <span className="terminal-font text-nexus-muted text-xs ml-2">nexus_core@terminal</span>
          </div>

          <div className="terminal-font text-sm space-y-1 min-h-[280px]">
            <div className="text-nexus-cyan neon-text mb-4 text-lg font-bold">
              NOTIX NEXUS // SYSTEM BOOT
            </div>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${i === lines.length - 1 ? 'text-nexus-green' : 'text-nexus-muted'}`}
              >
                {line}
              </motion.div>
            ))}
            {currentLine && (
              <div className="text-nexus-cyan">
                {currentLine}<span className="terminal-cursor" />
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs terminal-font text-nexus-muted mb-2">
              <span>SYSTEM INITIALIZATION</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-nexus-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-nexus-cyan to-nexus-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4 terminal-font text-xs text-nexus-muted"
        >
          NOTIX NEXUS // DIGITAL FORTRESS PROTOCOL
        </motion.div>
      </div>
    </motion.div>
  )
}
