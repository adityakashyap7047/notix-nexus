import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { clsx } from 'clsx'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: number
  color?: 'cyan' | 'purple' | 'green' | 'red' | 'yellow' | 'blue'
  className?: string
}

const colorClasses = {
  cyan: 'text-nexus-cyan bg-nexus-cyan/10',
  purple: 'text-nexus-purple bg-nexus-purple/10',
  green: 'text-nexus-green bg-nexus-green/10',
  red: 'text-nexus-red bg-nexus-red/10',
  yellow: 'text-nexus-yellow bg-nexus-yellow/10',
  blue: 'text-nexus-blue bg-nexus-blue/10',
}

const glowClasses = {
  cyan: 'glow-border',
  purple: 'glow-border-purple',
  green: 'glow-border-green',
  red: 'glow-border-red',
  yellow: 'border border-nexus-yellow/20',
  blue: 'border border-nexus-blue/20',
}

export default function StatsCard({ icon: Icon, label, value, trend, color = 'cyan', className }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={clsx(
        'glass rounded-lg p-5 transition-all duration-300',
        glowClasses[color],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className={clsx('p-2.5 rounded-lg', colorClasses[color])}>
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <div className={clsx(
            'flex items-center gap-1 text-xs font-mono',
            trend >= 0 ? 'text-nexus-green' : 'text-nexus-red'
          )}>
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold font-mono text-white">{value}</div>
        <div className="text-sm text-nexus-muted mt-1 uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  )
}
