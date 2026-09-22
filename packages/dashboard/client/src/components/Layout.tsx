import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Bell, Search, User } from 'lucide-react'
import StatusIndicator from './StatusIndicator'
import ThemeToggle from './ThemeToggle'

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-nexus-bg grid-bg">
      <Sidebar />

      <div className="ml-[256px] transition-all duration-300">
        <header className="sticky top-0 z-30 glass border-b border-nexus-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative max-w-md w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexus-muted" />
                <input
                  type="text"
                  placeholder="Search commands, servers, settings..."
                  className="cyber-input pl-10 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StatusIndicator status="online" size="sm" label="NEXUS ONLINE" />

              <button className="relative p-2 rounded-lg text-nexus-muted hover:text-nexus-cyan hover:bg-nexus-cyan/5 transition-all">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-nexus-red rounded-full" />
              </button>

              <ThemeToggle />

              <div className="flex items-center gap-3 pl-4 border-l border-nexus-border">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-white">Admin</div>
                  <div className="text-xs text-nexus-muted font-mono">root@nexus</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
