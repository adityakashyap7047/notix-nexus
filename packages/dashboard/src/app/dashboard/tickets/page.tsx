"use client";

import { useState } from "react";

const initialTickets = [
  { id: "T-4521", user: "PlayerOne#1234", subject: "Ban appeal", status: "open", assigned: "Admin", time: "2h ago", priority: "high" },
  { id: "T-4520", user: "HelpMe#5678", subject: "Role not assigned after verification", status: "open", assigned: "Unassigned", time: "4h ago", priority: "medium" },
  { id: "T-4519", user: "BugReport#9012", subject: "Economy command not working", status: "in-progress", assigned: "DevTeam", time: "6h ago", priority: "medium" },
  { id: "T-4518", user: "Question#3456", subject: "How to use leveling?", status: "closed", assigned: "Support", time: "12h ago", priority: "low" },
  { id: "T-4517", user: "Issue#7890", subject: "Welcome message not sending", status: "closed", assigned: "Admin", time: "1d ago", priority: "high" },
];

function getPriorityClass(p: string) {
  if (p === "high") return "bg-neon-red/20 text-neon-red border-neon-red/30";
  if (p === "medium") return "bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30";
  return "bg-gray-500/20 text-gray-400 border-gray-500/30";
}

function getStatusClass(s: string) {
  if (s === "open") return "bg-neon-green/20 text-neon-green border-neon-green/30";
  if (s === "in-progress") return "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30";
  return "bg-gray-500/20 text-gray-400 border-gray-500/30";
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [category, setCategory] = useState("#support");
  const [supportRole, setSupportRole] = useState("Support Team");
  const [transcriptChannel, setTranscriptChannel] = useState("#transcripts");
  const [maxTickets, setMaxTickets] = useState("3");
  const [autoClose, setAutoClose] = useState("72");
  const [autoCloseEnabled, setAutoCloseEnabled] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const categories = [
    { name: "General Support", description: "General help requests", emoji: "📩" },
    { name: "Ban Appeal", description: "Appeal a moderation action", emoji: "⚖️" },
    { name: "Bug Report", description: "Report bugs or issues", emoji: "🐛" },
    { name: "Suggestion", description: "Suggest new features", emoji: "💡" },
  ];

  const closeTicket = (id: string) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: "closed" } : t)));
  };

  const filteredTickets = filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-purple font-mono tracking-wider">TICKET SYSTEM</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">Support ticket management</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500">OPEN</span>
          <span className="text-sm font-mono text-neon-green font-bold">{tickets.filter((t) => t.status !== "closed").length}</span>
          <span className="text-[10px] font-mono text-gray-600">/</span>
          <span className="text-sm font-mono text-gray-500">{tickets.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-purple mb-4 tracking-wider">CONFIGURATION</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">TICKET CATEGORY</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="nexus-select text-xs">
                <option value="#support">#support</option>
                <option value="#tickets">#tickets</option>
                <option value="#help">#help</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">SUPPORT ROLE</label>
              <input type="text" value={supportRole} onChange={(e) => setSupportRole(e.target.value)} className="nexus-input text-xs" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">TRANSCRIPT CHANNEL</label>
              <select value={transcriptChannel} onChange={(e) => setTranscriptChannel(e.target.value)} className="nexus-select text-xs">
                <option value="#transcripts">#transcripts</option>
                <option value="#ticket-logs">#ticket-logs</option>
                <option value="#mod-logs">#mod-logs</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">MAX TICKETS PER USER</label>
              <input type="number" value={maxTickets} onChange={(e) => setMaxTickets(e.target.value)} className="nexus-input text-xs" />
            </div>
            <div className="flex items-center justify-between p-3 bg-nexus-bg rounded-lg border border-nexus-border">
              <div>
                <p className="text-xs text-white">Auto-Close Inactive</p>
                <p className="text-[10px] text-gray-500">Close after inactivity</p>
              </div>
              <button onClick={() => setAutoCloseEnabled(!autoCloseEnabled)} className={`toggle ${autoCloseEnabled ? "active" : ""}`} />
            </div>
            {autoCloseEnabled && (
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">AUTO-CLOSE AFTER (hours)</label>
                <input type="number" value={autoClose} onChange={(e) => setAutoClose(e.target.value)} className="nexus-input text-xs" />
              </div>
            )}
            <button className="nexus-button w-full text-xs font-mono tracking-wider">SAVE CONFIG</button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Categories */}
          <div className="nexus-card p-5">
            <h3 className="text-sm font-mono text-neon-purple mb-4 tracking-wider">TICKET CATEGORIES</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <div key={cat.name} className="p-3 bg-nexus-bg rounded-lg border border-nexus-border flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">{cat.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-white truncate">{cat.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tickets */}
          <div className="nexus-card p-5">
            <div className="flex items-center gap-2 mb-4">
              {["ALL", "OPEN", "IN-PROGRESS", "CLOSED"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded text-[10px] font-mono border transition-all ${
                    filter === f ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan" : "border-nexus-border text-gray-500"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filteredTickets.map((t) => (
                <div key={t.id} className="p-3 bg-nexus-bg rounded-lg border border-nexus-border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-white">{t.id}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getStatusClass(t.status)}`}>
                      {t.status.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getPriorityClass(t.priority)}`}>
                      {t.priority.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-gray-500 ml-auto">{t.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{t.user} — {t.subject}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-600 font-mono">Assigned: {t.assigned}</span>
                    {t.status !== "closed" && (
                      <button onClick={() => closeTicket(t.id)} className="text-[10px] font-mono text-neon-red hover:underline">
                        CLOSE
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
