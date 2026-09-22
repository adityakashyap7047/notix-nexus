import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: 'cyan' | 'purple' | 'green' | 'red' | 'none'
  hover?: boolean
  onClick?: () => void
}

const glowClasses = {
  cyan: 'glow-border',
  purple: 'glow-border-purple',
  green: 'glow-border-green',
  red: 'glow-border-red',
  none: 'border border-nexus-border',
}

export default function Card({ children, className, glow = 'none', hover = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={clsx(
        'glass rounded-lg p-6 transition-all duration-300',
        glowClasses[glow],
        hover && 'glass-hover cursor-pointer',
        onClick && 'active:scale-[0.98]',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
