import { clsx } from 'clsx'

type StatusType = 'online' | 'offline' | 'warning' | 'danger' | 'idle'

interface StatusIndicatorProps {
  status: StatusType
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  label?: string
}

const statusColors: Record<StatusType, string> = {
  online: 'bg-nexus-green',
  offline: 'bg-nexus-muted',
  warning: 'bg-nexus-yellow',
  danger: 'bg-nexus-red',
  idle: 'bg-nexus-orange',
}

const statusGlow: Record<StatusType, string> = {
  online: 'shadow-glow-green',
  offline: '',
  warning: 'shadow-[0_0_10px_rgba(255,215,0,0.4)]',
  danger: 'shadow-glow-red',
  idle: 'shadow-[0_0_10px_rgba(255,107,0,0.4)]',
}

const sizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
}

export default function StatusIndicator({ status, size = 'md', pulse = true, label }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={clsx(
          'rounded-full',
          statusColors[status],
          sizes[size],
          pulse && status !== 'offline' && 'animate-pulse'
        )} />
        {status !== 'offline' && pulse && (
          <div className={clsx(
            'absolute inset-0 rounded-full animate-ping',
            statusColors[status],
            'opacity-50'
          )} />
        )}
      </div>
      {label && (
        <span className="text-sm text-nexus-muted font-mono uppercase tracking-wider">{label}</span>
      )}
    </div>
  )
}
