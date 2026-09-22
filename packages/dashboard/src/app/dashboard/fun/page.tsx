"use client";

const funCommands = [
  { name: "8ball", desc: "Magic 8-Ball answers", emoji: "🎱" },
  { name: "joke", desc: "Random jokes", emoji: "😂" },
  { name: "rps", desc: "Rock Paper Scissors", emoji: "🎮" },
  { name: "rate", desc: "Rate anything 0-10", emoji: "⭐" },
  { name: "coinflip", desc: "Flip a coin", emoji: "🪙" },
  { name: "slots", desc: "Slot machine", emoji: "🎰" },
];

const socialCommands = [
  { name: "profile", desc: "View user profile", emoji: "👤" },
  { name: "rep", desc: "Give reputation points", emoji: "⭐" },
  { name: "ship", desc: "Ship two users", emoji: "💕" },
  { name: "balance", desc: "Check coin balance", emoji: "💰" },
  { name: "daily", desc: "Daily reward", emoji: "📅" },
  { name: "work", desc: "Work for coins", emoji: "💼" },
];

const economyCommands = [
  { name: "beg", desc: "Beg for coins", emoji: "🤲" },
  { name: "deposit", desc: "Deposit to bank", emoji: "🏦" },
  { name: "withdraw", desc: "Withdraw from bank", emoji: "🏧" },
  { name: "slots", desc: "Play slots", emoji: "🎰" },
];

export default function FunSocialPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neon-cyan font-mono">Fun & Social</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="nexus-card p-4">
          <h3 className="text-sm font-bold text-neon-yellow mb-4 font-mono">🎮 FUN COMMANDS</h3>
          <div className="space-y-2">
            {funCommands.map((cmd) => (
              <div key={cmd.name} className="flex items-center gap-3 p-3 rounded-lg bg-nexus-bg border border-nexus-border">
                <span className="text-xl">{cmd.emoji}</span>
                <div>
                  <div className="text-sm font-bold text-white">!{cmd.name}</div>
                  <div className="text-xs text-gray-400">{cmd.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="nexus-card p-4">
          <h3 className="text-sm font-bold text-neon-pink mb-4 font-mono">👤 SOCIAL COMMANDS</h3>
          <div className="space-y-2">
            {socialCommands.map((cmd) => (
              <div key={cmd.name} className="flex items-center gap-3 p-3 rounded-lg bg-nexus-bg border border-nexus-border">
                <span className="text-xl">{cmd.emoji}</span>
                <div>
                  <div className="text-sm font-bold text-white">!{cmd.name}</div>
                  <div className="text-xs text-gray-400">{cmd.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="nexus-card p-4">
          <h3 className="text-sm font-bold text-neon-green mb-4 font-mono">💰 ECONOMY COMMANDS</h3>
          <div className="space-y-2">
            {economyCommands.map((cmd) => (
              <div key={cmd.name} className="flex items-center gap-3 p-3 rounded-lg bg-nexus-bg border border-nexus-border">
                <span className="text-xl">{cmd.emoji}</span>
                <div>
                  <div className="text-sm font-bold text-white">!{cmd.name}</div>
                  <div className="text-xs text-gray-400">{cmd.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="nexus-card p-4">
          <h3 className="text-sm font-bold text-neon-purple mb-4 font-mono">📊 LEADERBOARD</h3>
          <div className="space-y-2">
            {["1. PlayerOne - 5000 XP", "2. PlayerTwo - 4200 XP", "3. PlayerThree - 3800 XP", "4. PlayerFour - 3100 XP", "5. PlayerFive - 2700 XP"].map((entry, i) => (
              <div key={i} className="p-2 rounded bg-nexus-bg text-sm text-gray-300">{entry}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
