import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark(!dark)}
      className="relative w-10 h-10 rounded-lg glass border border-nexus-border flex items-center justify-center text-nexus-muted hover:text-nexus-cyan hover:border-nexus-cyan/30 transition-all duration-300"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  )
}
