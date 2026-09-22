import { motion } from 'framer-motion'
import {
  Coins, TrendingUp, ShoppingBag, ArrowUpRight, ArrowDownRight,
  Wallet, Trophy, Store, History
} from 'lucide-react'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'

const leaderboard = [
  { rank: 1, user: 'CryptoKing#0001', balance: 2458900, level: 87, avatar: '👑' },
  { rank: 2, user: 'WealthyBot#7777', balance: 1892300, level: 74, avatar: '💎' },
  { rank: 3, user: 'GoldMiner#4567', balance: 1234500, level: 62, avatar: '⛏️' },
  { rank: 4, user: 'PixelRich#8901', balance: 987600, level: 55, avatar: '🎨' },
  { rank: 5, user: 'TokenHoard#2345', balance: 756800, level: 48, avatar: '🪙' },
  { rank: 6, user: 'CoinMaster#6789', balance: 543200, level: 41, avatar: '💰' },
  { rank: 7, user: 'ByteEarner#1234', balance: 432100, level: 36, avatar: '⚡' },
  { rank: 8, user: 'CashFlow#5678', balance: 321000, level: 29, avatar: '💸' },
]

const shopItems = [
  { name: 'VIP Role', price: 50000, category: 'Roles', stock: 999, icon: '👑' },
  { name: 'Custom Color', price: 10000, category: 'Cosmetic', stock: 999, icon: '🎨' },
  { name: 'Extra Daily', price: 25000, category: 'Boost', stock: 999, icon: '⚡' },
  { name: 'Mystery Box', price: 15000, category: 'Loot', stock: 50, icon: '📦' },
  { name: 'Name Glow', price: 75000, category: 'Cosmetic', stock: 25, icon: '✨' },
  { name: 'Double XP', price: 30000, category: 'Boost', stock: 100, icon: '🔥' },
]

const transactions = [
  { user: 'CryptoKing#0001', action: 'Earned', amount: 5000, source: 'Daily Reward', time: '2m ago' },
  { user: 'WealthyBot#7777', action: 'Spent', amount: -10000, source: 'Custom Color', time: '5m ago' },
  { user: 'GoldMiner#4567', action: 'Earned', amount: 15000, source: 'Gamble Win', time: '8m ago' },
  { user: 'PixelRich#8901', action: 'Spent', amount: -50000, source: 'VIP Role', time: '12m ago' },
  { user: 'TokenHoard#2345', action: 'Earned', amount: 2500, source: 'Work', time: '15m ago' },
  { user: 'CoinMaster#6789', action: 'Earned', amount: 7500, source: 'Heist', time: '18m ago' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Economy() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-3">
          <Coins size={24} className="text-nexus-yellow" />
          ECONOMY SYSTEM
        </h1>
        <p className="text-nexus-muted mt-1 text-sm">Virtual economy management and statistics</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard icon={Wallet} label="Total Currency" value="8.2M" color="yellow" />
        <StatsCard icon={TrendingUp} label="Circulating" value="5.7M" color="green" />
        <StatsCard icon={Store} label="Shop Items" value={shopItems.length} color="purple" />
        <StatsCard icon={History} label="Transactions (24h)" value="1,847" color="cyan" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card glow="yellow">
            <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <Trophy size={18} className="text-nexus-yellow" />
              TOP BALANCES
            </h3>
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className={`flex items-center gap-3 p-3 rounded-lg ${
                  entry.rank <= 3 ? 'bg-nexus-yellow/5' : 'bg-white/5'
                }`}>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                    entry.rank === 1 ? 'bg-nexus-yellow/20 text-nexus-yellow' :
                    entry.rank === 2 ? 'bg-gray-300/20 text-gray-300' :
                    entry.rank === 3 ? 'bg-orange-400/20 text-orange-400' :
                    'bg-white/5 text-nexus-muted'
                  }`}>
                    #{entry.rank}
                  </span>
                  <span className="text-lg">{entry.avatar}</span>
                  <div className="flex-1">
                    <div className="font-mono text-sm text-white">{entry.user}</div>
                    <div className="text-xs text-nexus-muted">Level {entry.level}</div>
                  </div>
                  <span className="font-mono text-sm text-nexus-yellow">
                    {entry.balance.toLocaleString()} 🪙
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card glow="purple">
            <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
              <Store size={18} className="text-nexus-purple" />
              SHOP ITEMS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {shopItems.map((shopItem) => (
                <div key={shopItem.name} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <div className="text-2xl mb-2">{shopItem.icon}</div>
                  <div className="text-sm text-white font-mono">{shopItem.name}</div>
                  <div className="text-xs text-nexus-muted mt-1">{shopItem.category}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-mono text-nexus-yellow">{shopItem.price.toLocaleString()} 🪙</span>
                    <span className="text-xs text-nexus-muted">Stock: {shopItem.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
            <History size={18} className="text-nexus-cyan" />
            RECENT TRANSACTIONS
          </h3>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                {tx.action === 'Earned' ?
                  <ArrowUpRight size={18} className="text-nexus-green" /> :
                  <ArrowDownRight size={18} className="text-nexus-red" />
                }
                <div className="flex-1">
                  <span className="font-mono text-sm text-white">{tx.user}</span>
                  <span className="text-sm text-nexus-muted"> — {tx.source}</span>
                </div>
                <span className={`font-mono text-sm ${tx.amount > 0 ? 'text-nexus-green' : 'text-nexus-red'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} 🪙
                </span>
                <span className="text-xs text-nexus-muted font-mono">{tx.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
