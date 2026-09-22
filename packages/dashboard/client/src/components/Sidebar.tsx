import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import {
  LayoutDashboard, Server, Shield, Brain, Ticket, Coins,
  BarChart3, Gift, Settings, Code2, Gavel, Layers,
  ChevronLeft, ChevronRight, Zap
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', label: 'Command Center', icon: LayoutDashboard },
  { path: '/servers', label: 'Servers', icon: Server },
  { path: '/moderation', label: 'Moderation', icon: Gavel },
  { path: '/security', label: 'Security', icon: Shield },
  { path: '/ai', label: 'AI Core', icon: Brain },
  { path: '/tickets', label: 'Tickets', icon: Ticket },
  { path: '/economy', label: 'Economy', icon: Coins },
  { path: '/leveling', label: 'Leveling', icon: Layers },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/giveaways', label: 'Giveaways', icon: Gift },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/developer', label: 'Developer', icon: Code2 },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      className="fixed left-0 top-0 h-screen glass border-r border-nexus-border z-40 flex flex-col"
    >
      <div className="p-4 border-b border-nexus-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-nexus-cyan to-nexus-purple flex items-center justify-center flex-shrink-0">
            <Zap size={20} className="text-white" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="font-bold text-sm tracking-wider text-white">NOTIX</div>
              <div className="text-[10px] font-mono text-nexus-cyan tracking-widest">NEXUS</div>
            </motion.div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-gradient-to-r from-nexus-cyan/10 to-nexus-purple/10 text-nexus-cyan border border-nexus-cyan/20'
                  : 'text-nexus-muted hover:text-white hover:bg-white/5'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={20}
                  className={clsx(
                    'flex-shrink-0 transition-colors',
                    isActive ? 'text-nexus-cyan' : 'text-nexus-muted group-hover:text-white'
                  )}
                />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-nexus-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-nexus-muted hover:text-nexus-cyan hover:bg-nexus-cyan/5 transition-all duration-200"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  )
}
