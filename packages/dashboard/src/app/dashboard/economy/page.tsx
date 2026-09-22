"use client";

import { useState } from "react";

const leaders = [
  { rank: 1, user: "RichKing#0001", coins: 847293, bank: 200000, level: 42 },
  { rank: 2, user: "CoinMaster#1234", coins: 623847, bank: 150000, level: 38 },
  { rank: 3, user: "WealthyUser#5678", coins: 412938, bank: 100000, level: 35 },
  { rank: 4, user: "GoldDigger#9012", coins: 298471, bank: 80000, level: 31 },
  { rank: 5, user: "CashFlow#3456", coins: 189234, bank: 50000, level: 28 },
];

interface ShopItem {
  id: number;
  name: string;
  price: number;
  description: string;
  type: string;
}

const initialShopItems: ShopItem[] = [
  { id: 1, name: "Custom Role Color", price: 5000, description: "Choose any color for your role", type: "role" },
  { id: 2, name: "VIP Badge", price: 10000, description: "Exclusive VIP badge on profile", type: "badge" },
  { id: 3, name: "XP Boost (2x)", price: 3000, description: "2x XP for 24 hours", type: "boost" },
  { id: 4, name: "Nickname Change", price: 1000, description: "Change your server nickname", type: "perk" },
];

function getRankColor(rank: number) {
  if (rank === 1) return "text-neon-yellow";
  if (rank === 2) return "text-gray-400";
  return "text-neon-orange";
}

export default function EconomyPage() {
  const [currencyName, setCurrencyName] = useState("NexusCoins");
  const [currencySymbol, setCurrencySymbol] = useState("🪙");
  const [startingBalance, setStartingBalance] = useState("100");
  const [dailyReward, setDailyReward] = useState("500");
  const [workMin, setWorkMin] = useState("100");
  const [workMax, setWorkMax] = useState("500");
  const [workCooldown, setWorkCooldown] = useState("3600");
  const [dailyCooldown, setDailyCooldown] = useState("86400");
  const [shopItems, setShopItems] = useState(initialShopItems);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  const addShopItem = () => {
    if (!newItemName || !newItemPrice) return;
    setShopItems((prev) => [
      ...prev,
      { id: Date.now(), name: newItemName, price: parseInt(newItemPrice), description: "Custom item", type: "custom" },
    ]);
    setNewItemName("");
    setNewItemPrice("");
  };

  const removeShopItem = (id: number) => {
    setShopItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neon-yellow font-mono tracking-wider">ECONOMY CENTER</h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">BYTE // Economy Manager</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Coins", value: "12.4M" },
          { label: "Active Users", value: "3,847" },
          { label: "Daily Claims", value: "1,293" },
          { label: "Shop Items", value: String(shopItems.length) },
        ].map((s) => (
          <div key={s.label} className="nexus-card p-4">
            <p className="text-xs text-gray-500 font-mono">{s.label}</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Currency Settings */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-yellow mb-4 tracking-wider">CURRENCY SETTINGS</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">CURRENCY NAME</label>
                <input type="text" value={currencyName} onChange={(e) => setCurrencyName(e.target.value)} className="nexus-input" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">SYMBOL</label>
                <input type="text" value={currencySymbol} onChange={(e) => setCurrencySymbol(e.target.value)} className="nexus-input" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">STARTING BALANCE</label>
              <input type="number" value={startingBalance} onChange={(e) => setStartingBalance(e.target.value)} className="nexus-input" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">DAILY REWARD AMOUNT</label>
              <input type="number" value={dailyReward} onChange={(e) => setDailyReward(e.target.value)} className="nexus-input" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">WORK MIN PAYOUT</label>
                <input type="number" value={workMin} onChange={(e) => setWorkMin(e.target.value)} className="nexus-input" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">WORK MAX PAYOUT</label>
                <input type="number" value={workMax} onChange={(e) => setWorkMax(e.target.value)} className="nexus-input" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">WORK COOLDOWN (sec)</label>
                <input type="number" value={workCooldown} onChange={(e) => setWorkCooldown(e.target.value)} className="nexus-input" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">DAILY COOLDOWN (sec)</label>
                <input type="number" value={dailyCooldown} onChange={(e) => setDailyCooldown(e.target.value)} className="nexus-input" />
              </div>
            </div>
            <button className="nexus-button w-full text-xs font-mono tracking-wider">SAVE SETTINGS</button>
          </div>
        </div>

        {/* Shop Management */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-yellow mb-4 tracking-wider">SHOP ITEMS</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto mb-4">
            {shopItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-nexus-bg rounded-lg border border-nexus-border">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{item.description}</p>
                </div>
                <span className="text-xs font-mono text-neon-yellow flex-shrink-0">{item.price.toLocaleString()} {currencySymbol}</span>
                <button onClick={() => removeShopItem(item.id)} className="text-neon-red hover:bg-neon-red/10 rounded p-1 transition-colors flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Item name" className="nexus-input flex-1 text-xs" />
            <input type="number" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} placeholder="Price" className="nexus-input w-24 text-xs" />
            <button onClick={addShopItem} className="nexus-button text-xs px-3 flex-shrink-0">ADD</button>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="nexus-card p-5">
        <h3 className="text-sm font-mono text-neon-yellow mb-4 tracking-wider">LEADERBOARD</h3>
        <div className="space-y-2">
          {leaders.map((e) => (
            <div key={e.rank} className="flex items-center gap-3 p-3 bg-nexus-bg rounded-lg border border-nexus-border">
              <span className={"text-lg font-mono font-bold w-8 " + getRankColor(e.rank)}>#{e.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-white truncate">{e.user}</p>
                <p className="text-xs text-gray-500">Level {e.level} • Bank: {e.bank.toLocaleString()}</p>
              </div>
              <span className="text-sm font-mono text-neon-yellow flex-shrink-0">{e.coins.toLocaleString()} {currencySymbol}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
