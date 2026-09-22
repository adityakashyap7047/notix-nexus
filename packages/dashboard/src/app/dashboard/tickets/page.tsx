"use client";

import Sidebar from "../../../components/layout/Sidebar";

const ticketStats = [
  { label: "Open", value: "12", color: "text-cyan-400" },
  { label: "Pending", value: "8", color: "text-yellow-400" },
  { label: "Closed Today", value: "23", color: "text-green-400" },
];

const tickets = [
  { id: "#4821", user: "User#0001", category: "Technical", priority: "high", status: "open", time: "12m ago" },
  { id: "#4820", user: "User#1234", category: "Support", priority: "medium", status: "pending", time: "28m ago" },
];

export default function TicketsPage() {
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-purple-400 font-mono tracking-wider">TICKET CENTER</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">Support ticket management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ticketStats.map((s) => (
              <div key={s.label} className="nexus-card p-4">
                <p className="text-xs text-gray-500 font-mono">{s.label}</p>
                <p className={"text-2xl font-bold font-mono mt-1 " + s.color}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="nexus-card p-4">
            <h3 className="text-sm font-mono text-purple-400 mb-4 tracking-wider">ACTIVE TICKETS</h3>
            <div className="space-y-3">
              {tickets.map((t) => (
                <div key={t.id} className="flex items-center gap-4 p-4 bg-[#080B12] rounded-lg">
                  <span className="text-sm font-mono text-cyan-400">{t.id}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{t.user}</p>
                    <p className="text-xs text-gray-500">{t.category}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-green-400/20 text-green-400">
                    {t.status.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
