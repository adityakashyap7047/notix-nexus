import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import CommandCenter from './pages/CommandCenter'
import Servers from './pages/Servers'
import ServerDetail from './pages/ServerDetail'
import Moderation from './pages/Moderation'
import Security from './pages/Security'
import AICore from './pages/AICore'
import Tickets from './pages/Tickets'
import Economy from './pages/Economy'
import Leveling from './pages/Leveling'
import Analytics from './pages/Analytics'
import Giveaways from './pages/Giveaways'
import Settings from './pages/Settings'
import Developer from './pages/Developer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Layout>
          <Routes>
            <Route path="/" element={<CommandCenter />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/servers/:id" element={<ServerDetail />} />
            <Route path="/moderation" element={<Moderation />} />
            <Route path="/security" element={<Security />} />
            <Route path="/ai" element={<AICore />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/economy" element={<Economy />} />
            <Route path="/leveling" element={<Leveling />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/giveaways" element={<Giveaways />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/developer" element={<Developer />} />
          </Routes>
        </Layout>
      )}
    </>
  )
}
