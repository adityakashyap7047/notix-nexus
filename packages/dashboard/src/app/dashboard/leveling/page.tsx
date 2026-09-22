"use client";

import { useState } from "react";

interface LevelReward {
  id: number;
  level: number;
  role: string;
}

const initialRewards: LevelReward[] = [
  { id: 1, level: 5, role: "Member" },
  { id: 2, level: 10, role: "Regular" },
  { id: 3, level: 20, role: "Veteran" },
  { id: 4, level: 30, role: "Elite" },
  { id: 5, level: 50, role: "Legend" },
  { id: 6, level: 100, role: "Transcendent" },
];

const top = [
  { rank: 1, user: "NoLifeKing", level: 67, xp: "2.4M", prestige: 3 },
  { rank: 2, user: "XPGod", level: 58, xp: "1.8M", prestige: 2 },
  { rank: 3, user: "Grinder", level: 52, xp: "1.4M", prestige: 1 },
  { rank: 4, user: "ActiveUser", level: 45, xp: "1.1M", prestige: 0 },
  { rank: 5, user: "ChatHero", level: 41, xp: "890K", prestige: 0 },
];

function getRankColor(rank: number) {
  if (rank === 1) return "text-neon-yellow";
  if (rank === 2) return "text-gray-400";
  if (rank === 3) return "text-neon-orange";
  return "text-gray-500";
}

export default function LevelingPage() {
  const [messageXp, setMessageXp] = useState("15");
  const [voiceXpPerMin, setVoiceXpPerMin] = useState("5");
  const [xpCooldown, setXpCooldown] = useState("60");
  const [xpMultiplier, setXpMultiplier] = useState("1.0");
  const [levelUpNotify, setLevelUpNotify] = useState(true);
  const [notifyChannel, setNotifyChannel] = useState("#level-up");
  const [stackRoles, setStackRoles] = useState(false);
  const [rewards, setRewards] = useState(initialRewards);
  const [newLevel, setNewLevel] = useState("");
  const [newRole, setNewRole] = useState("");

  const addReward = () => {
    if (!newLevel || !newRole) return;
    setRewards((prev) => [...prev, { id: Date.now(), level: parseInt(newLevel), role: newRole }].sort((a, b) => a.level - b.level));
    setNewLevel("");
    setNewRole("");
  };

  const removeReward = (id: number) => {
    setRewards((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neon-green font-mono tracking-wider">LEVELING SYSTEM</h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">Experience points and role rewards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XP Configuration */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-green mb-4 tracking-wider">XP CONFIGURATION</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">MESSAGE XP</label>
                <input type="number" value={messageXp} onChange={(e) => setMessageXp(e.target.value)} className="nexus-input" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">VOICE XP/MIN</label>
                <input type="number" value={voiceXpPerMin} onChange={(e) => setVoiceXpPerMin(e.target.value)} className="nexus-input" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">XP COOLDOWN (sec)</label>
                <input type="number" value={xpCooldown} onChange={(e) => setXpCooldown(e.target.value)} className="nexus-input" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">XP MULTIPLIER</label>
                <input type="text" value={xpMultiplier} onChange={(e) => setXpMultiplier(e.target.value)} className="nexus-input" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-nexus-bg rounded-lg border border-nexus-border">
              <div>
                <p className="text-sm text-white">Level-Up Notifications</p>
                <p className="text-[10px] text-gray-500">Send a message when users level up</p>
              </div>
              <button onClick={() => setLevelUpNotify(!levelUpNotify)} className={`toggle ${levelUpNotify ? "active" : ""}`} />
            </div>
            {levelUpNotify && (
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">NOTIFICATION CHANNEL</label>
                <select value={notifyChannel} onChange={(e) => setNotifyChannel(e.target.value)} className="nexus-select">
                  <option value="#level-up">#level-up</option>
                  <option value="#general">#general</option>
                  <option value="#bot-commands">#bot-commands</option>
                  <option value="current">Current Channel</option>
                </select>
              </div>
            )}
            <div className="flex items-center justify-between p-3 bg-nexus-bg rounded-lg border border-nexus-border">
              <div>
                <p className="text-sm text-white">Stack Roles</p>
                <p className="text-[10px] text-gray-500">Keep previous level roles when leveling up</p>
              </div>
              <button onClick={() => setStackRoles(!stackRoles)} className={`toggle ${stackRoles ? "active" : ""}`} />
            </div>
            <button className="nexus-button w-full text-xs font-mono tracking-wider">SAVE SETTINGS</button>
          </div>
        </div>

        {/* Level Rewards */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-green mb-4 tracking-wider">LEVEL REWARDS</h3>
          <div className="space-y-2 max-h-[280px] overflow-y-auto mb-4">
            {rewards.map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-3 bg-nexus-bg rounded-lg border border-nexus-border">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm bg-neon-green/10 text-neon-green border border-neon-green/30 flex-shrink-0">
                  {r.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono text-white">{r.role}</p>
                  <p className="text-xs text-gray-500">Level {r.level}+</p>
                </div>
                <button onClick={() => removeReward(r.id)} className="text-neon-red hover:bg-neon-red/10 rounded p-1 transition-colors flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="number" value={newLevel} onChange={(e) => setNewLevel(e.target.value)} placeholder="Level" className="nexus-input w-20 text-xs" />
            <input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="Role name" className="nexus-input flex-1 text-xs" />
            <button onClick={addReward} className="nexus-button text-xs px-3 flex-shrink-0">ADD</button>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="nexus-card p-5">
        <h3 className="text-sm font-mono text-neon-green mb-4 tracking-wider">TOP LEVELS</h3>
        <div className="space-y-2">
          {top.map((e) => (
            <div key={e.rank} className="flex items-center gap-3 p-3 bg-nexus-bg rounded-lg border border-nexus-border">
              <span className={"text-lg font-mono font-bold w-8 " + getRankColor(e.rank)}>#{e.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-white">{e.user}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-xs text-neon-green">Lvl {e.level}</span>
                  <span className="text-xs text-gray-500">{e.xp} XP</span>
                  {e.prestige > 0 && <span className="text-xs text-neon-purple">P{e.prestige}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
